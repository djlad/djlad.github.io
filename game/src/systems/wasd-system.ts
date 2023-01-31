import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { WasdComponent } from '../components/wasd-component';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { Game } from '../engine/game';
import { InventoryComponent } from '../components/inventory-component/inventory-component';
import { EventManager } from '../engine/events/event-manager';
import { GameEvent } from '../engine/events/game-event';
import { EventType } from '../engine/events/EventType';
import { PlaceItemRequest } from '../components/place-item/place-item-request';
import { PlaceItemComponent } from '../components/place-item/place-item-component';
import { CropHarvesterComponent } from '../components/crop-harvester-component';
import { CropComponent } from '../components/crop-component';
import { Component } from '../engine/component/component';
import { TransitionComponent } from '../components/transitions/transition-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { WeaponComponent } from '../components/weapon-component';
import { SystemArgs } from '../engine/system/system-args';
import { GenericPositionComponent } from '../engine/pixi-integration/pixi-components/generic-position-component';

export class WasdSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
        game.eventManager.addListener(EventType.touchStart, (e)=>{
            this.move = true;
            this.touchStart.x = e.eventData.x;
            this.touchStart.y = e.eventData.y
        });
        game.eventManager.addListener(EventType.touchEnd, ()=>{
            this.move = false;
            this.stop = true;
        });
    }
    private move:boolean = false;
    private stop:boolean = false;
    private touchStart:{x:number,y:number} = {x:0,y:0};
    static create(game:Game):WasdSystem{
        var wasd:WasdSystem = new WasdSystem(game);
        //eventManager.addListener(EventType.wDown, function(){console.log("w down")});
        return wasd;
    }

    apply(args:SystemArgs){
        const entity = args.entity;
        const position = <GenericPositionComponent>entity.getComponent("position", true);
        const wasd = <WasdComponent>entity.getComponent("wasd", true);
        if (position == null) return;
        if (wasd == null) return;
        if (this.move){
            if (this.touchStart.x > window.innerWidth/2)position.vx = 10;
            else position.vx = -10;
            if (this.touchStart.y > window.innerHeight/2)position.vy = 10;
            else position.vy = -10;
        }
        if (this.stop){
            position.vx = 0;
            position.vy = 0;
            this.stop = false;
        }
    }

    applyEvents(entity:Entity, eventManager:EventManager){
        var events:GameEvent[] = eventManager.events;
        var event:GameEvent;
        var wasdComponent:WasdComponent= <WasdComponent>entity.getComponent("wasd", true);
        if (wasdComponent == null)return;
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var animation:AnimationComponent = <AnimationComponent>entity.getComponent("animation");
        var transition:TransitionComponent = <TransitionComponent>entity.getComponent("transition");
        
        var speed:number = wasdComponent.speed;
        var sprite:string = wasdComponent.sprite;
        var walkSprite:string = wasdComponent.walkSprite;
        if (events.length > 0){
            //console.log(events)
        }
        for (var i=0;i<events.length;i++){
            event = events[i];
            //console.log(event)
            // console.log(event.eventName);
            switch(event.eventName){
                case EventType.wDown:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(walkSprite);
                    position.vy = -speed;
                break;
                case EventType.wUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.aDown:
                    if (wasdComponent.dashing)break;
                    position.faceRight = false;
                    animation.setSprite(walkSprite);
                    position.vx = -speed;
                break;
                case EventType.aUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.sDown:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(walkSprite);
                    position.vy = speed;
                break;
                case EventType.sUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.dDown:
                    if (wasdComponent.dashing)break;
                    position.faceRight = true;
                    animation.setSprite(walkSprite);
                    position.vx = speed;
                break;
                case EventType.dUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.spaceUp:
                    this.dash(wasdComponent, position, animation, transition);
                break;
                case EventType.spaceUp:
                    // position = <PositionComponent>entity.getComponent("position");
                    // let placeItem:PlaceItemComponent;
                    // placeItem = <PlaceItemComponent>entity.getComponent("placeItem");
                    // placeItem.placeItem("crop", [0, 0], (entity:Entity)=>{
                    //     let crop:CropComponent = <CropComponent>entity.getComponent("crop");
                    //     crop.setCrop("onion")
                    // });
                break;
                case EventType.fUp:
                    let cropHarvester:CropHarvesterComponent;
                    cropHarvester = <CropHarvesterComponent>entity.getComponent("cropHarvester", true);
                    cropHarvester.startHarvest();
                break;
                case EventType.pUp:
                    //console.log("p up")
                    console.log(this.game);
                    const weapon = <WeaponComponent>entity.getComponent("weapon");
                    if (weapon.rotationSpeed == 0){
                        weapon.spin();
                    } else {
                        weapon.sheatheBack();
                    }
                break;
                case EventType.iUp:
                    let inventory:InventoryComponent;
                    inventory = <InventoryComponent>entity.getComponent("inventory", true);
                    inventory.inventoryToString();
                break;
                case EventType.jUp:
                    var ge:GameEvent = GameEvent.create(EventType.fireProjectile);
                    entity.emit(ge);
                break;
            }
        }
        this.updateDashing(entity, wasdComponent, position, animation, transition);
    }
    private updateDashing(entity: Entity, wasdComponent: WasdComponent, position: PositionComponent, animation: AnimationComponent, transition: TransitionComponent){
        if (!wasdComponent.dashing)return;
        if (wasdComponent.dashingTime == Math.floor(wasdComponent.maxDashingTime/2)){
            transition.start(wasdComponent.dashSprite, wasdComponent.dashSpriteNumber, false);
        }
        if (wasdComponent.dashingTime == 0){
            wasdComponent.dashing = false;
            position.vx = 0;
            position.vy = 0;
            position.h = 0;
            return;
        }
        wasdComponent.dashingTime -= 1; 
        position.vx = Math.sign(position.faceX) * wasdComponent.dashSpeed;
        position.vy = Math.sign(position.faceY) * wasdComponent.dashSpeed;
    }
    private dash(wasdComponent:WasdComponent, position:PositionComponent, animation:AnimationComponent, transition:TransitionComponent){
        if(wasdComponent.dashing)return;
        wasdComponent.startDashing();
        wasdComponent.dashWidth = position.width;
        wasdComponent.dashHeight = position.height;
        wasdComponent.dashSprite = animation.animationName;
        wasdComponent.dashSpriteNumber = animation.getSpriteNumber();
        transition.start(null, 32);
    }
}