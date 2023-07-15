import { Entity, EntitySystem, EventManager, EventType, Game, GenericAnimationComponent, GenericPositionComponent, SystemArgs } from "aiwar";
import { startGame } from "../game";

export class FloorSystem extends EntitySystem {
    timer = 0;
    timeBetweenFloors = 45;
    floorsMade = 0;
    maxSpeed = -5;
    floors:Entity[] = [];
    floorWidth: number = 64*2;
    apply(args: SystemArgs): void {
        const entity = args.entity;
        const ac = <GenericAnimationComponent>entity.getComponent("animation", true);
        if (ac == null) return;
        if (ac.spriteName !== "jungleGreyTile") return;
        entity.targetedEvents.forEach(event=>{
            if (event.eventName === EventType.collision){
                ac.setSprite("jungleBrownTile");
            }
        });
    }
    applyEvents(entity: Entity, eventManager: EventManager): void {
        if (entity.targetedEvents.length === 0) return;
    }
    oncePerLoop = (args: SystemArgs) => {
        this.timer++;
        if (this.timer < this.timeBetweenFloors)return;
        this.timer = 0;
        const height = window.innerHeight;
        let speed = -5 - .4*this.floorsMade
        speed = Math.abs(speed) > Math.abs(this.maxSpeed) ? this.maxSpeed : speed;
        this.timeBetweenFloors = Math.abs(this.floorWidth*2.5/speed);
        if (this.floorsMade % 10 === 0){
            this.placeBarrier(speed);
        } else {
            const x = window.innerWidth * Math.random();
            this.placeFloor(x, height+this.floorWidth, speed);
        }
        this.floors.forEach(floor=>{
            (<GenericPositionComponent>floor.getComponent("position")).vy = speed;
        })
        const py = (<GenericPositionComponent>this.game.getById(1).getComponent("position")).y;
        if (py < 0 || py > window.innerHeight){
            this.floorsMade = 0;
            // this.timeBetweenFloors = 45;
            this.timer = 0;
            startGame(this.game);
        }
    }
    checkJumpable(x:number){

    }
    placeBarrier(vy:number){
        const numFloors = Math.floor(window.innerWidth/this.floorWidth) + 1;
        const floorToSkip = Math.floor(Math.random()*numFloors);
        const newFloorsMade = this.floorsMade + 1;
        Array.from(Array(numFloors).keys()).forEach(i=>{
            if (Math.abs(floorToSkip - i) < 2)return;
            this.placeFloor(i*this.floorWidth + this.floorWidth/2, window.innerHeight+this.floorWidth, vy);
        });
        this.floorsMade = newFloorsMade;
    }
    placeFloor(x: number, y: number, vy:number = -1){
        const floor = this.game.addEntity("floor");
        const pos = <GenericPositionComponent>floor.getComponent("position");
        pos.x = x;
        pos.y = y;
        pos.vy = vy;
        this.floors.push(floor);
        this.floorsMade++;
        return floor;
    }
    static create(game:Game){
        return new FloorSystem(game);
    }
}