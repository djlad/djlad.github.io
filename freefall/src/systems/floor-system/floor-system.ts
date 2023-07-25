import { Entity, EntitySystem, EventManager, EventType, Game, GenericAnimationComponent, GenericPositionComponent, SystemArgs } from "aiwar";
import { startGame } from "../../game";
import { FloorChallenge } from "./floor-challenge";
import { randomEnum } from "./randomenum";

export class FloorSystem extends EntitySystem {
    timer = 0;
    timeBetweenFloors = 45;
    floorsMade = 0;
    floorLevel = 0; // increase when floor is made or when a barrier is placed
    maxSpeed = -5;
    floors:Entity[] = [];
    floorWidth: number = 64*2;
    currentChallenge: FloorChallenge = FloorChallenge.randomSteps;
    // currentChallengeFunc: ()=>FloorChallenge = this.randomFloorChallengeGen();
    currentChallengeFunc: ()=>FloorChallenge = this.closeBarriersChallenge();
    speed: number = 0;
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
        this.speed = -5 - .4*this.floorLevel;
        this.speed = Math.abs(this.speed) > Math.abs(this.maxSpeed) ? this.maxSpeed : this.speed;
        this.timeBetweenFloors = Math.abs(this.floorWidth*2.5/this.speed);
        let newChallenge = this.currentChallengeFunc();
        if (newChallenge === FloorChallenge.challengeDone){
            this.timer = 0;
            this.currentChallenge = randomEnum(FloorChallenge);
            while(this.currentChallenge === FloorChallenge.challengeDone){
                this.currentChallenge = randomEnum(FloorChallenge);
            }
            console.log("next challenge", FloorChallenge[this.currentChallenge]);
            switch(this.currentChallenge){
                case FloorChallenge.custom:
                    this.currentChallengeFunc = this.customChallenge();
                case FloorChallenge.randomSteps:
                    this.currentChallengeFunc = this.randomFloorChallengeGen();
                    break;
                case FloorChallenge.closeBarriers:
                    this.currentChallengeFunc = this.closeBarriersChallenge();
                    break;
                default:
                    this.currentChallengeFunc = ()=>FloorChallenge.challengeDone;
                    break;
            }
        }
        this.floors.forEach(floor=>{
            (<GenericPositionComponent>floor.getComponent("position")).vy = this.speed;
        })
        this.checkLost();
    }
    checkJumpable(x:number){

    }
    customChallenge(){
        return ()=>{
            return FloorChallenge.custom;
        }
    }
    closeBarriersChallenge(){
        let floorsMade: number = 0;
        return (): FloorChallenge => {
        if (floorsMade > 3) return FloorChallenge.challengeDone;
            if (this.timer % this.timeBetweenFloors !== 0) return FloorChallenge.closeBarriers;
            this.placeBarrier(this.speed, 2);
            floorsMade++;
            return FloorChallenge.closeBarriers;
        }
    }
    randomFloorChallengeGen(){
        let floorsMade: number = 0;
        return (): FloorChallenge => {
            if (floorsMade > 3) return FloorChallenge.challengeDone;
            if (this.timer % this.timeBetweenFloors !== 0) return FloorChallenge.randomSteps;
            const height = window.innerHeight;
            const x = window.innerWidth * Math.random();
            this.placeFloor(x, height+this.floorWidth, this.speed);
            floorsMade++;
            return FloorChallenge.randomSteps;
        }
    }
    checkLost(){
        const py = (<GenericPositionComponent>this.game.getById(1).getComponent("position")).y;
        if (py < 0 || py > window.innerHeight){
            this.floorsMade = 0;
            this.floorLevel = 0;
            // this.timeBetweenFloors = 45;
            this.timer = 0;
            startGame(this.game);
        }
    }
    placeBarrier(vy:number, holeSize:number = 2){
        const numFloors = Math.floor(window.innerWidth/this.floorWidth) + 1;
        const floorToSkip = Math.floor(Math.random()*(numFloors-holeSize+1));
        Array.from(Array(numFloors).keys()).forEach(i=>{
            if (i >= floorToSkip &&  i - floorToSkip < holeSize)return;
            this.placeFloor(i*this.floorWidth + this.floorWidth/2, window.innerHeight+this.floorWidth, vy);
        });
        this.floorLevel += 1;
        return floorToSkip;
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