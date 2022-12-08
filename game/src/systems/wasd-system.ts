import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { WasdComponent } from '../components/wasd-component';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
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

export class WasdSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
    static create(game:Game):WasdSystem{
        var wasd:WasdSystem = new WasdSystem(game);
        //eventManager.addListener(EventType.wDown, function(){console.log("w down")});
        return wasd;
    }

    apply(){}

    applyEvents(entity:Entity, eventManager:EventManager){
        var events:GameEvent[] = eventManager.events;
        var event:GameEvent;
        var wasdComponent:WasdComponent= <WasdComponent>entity.getComponent("wasd", true);
        if (wasdComponent == null)return;
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var animation:AnimationComponent = <AnimationComponent>entity.getComponent("animation");
        
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
                    var ge:GameEvent = GameEvent.create(EventType.fireProjectile);
                    entity.emit(ge);
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
                /*case EventType.fUp:
                    let cropHarvester:CropHarvesterComponent;
                    try{
                        cropHarvester = <CropHarvesterComponent>entity.getComponent("cropHarvester");
                    } catch {return}
                    cropHarvester.startHarvest();
                break;*/
                case EventType.pUp:
                    //console.log("p up")
                    console.log(this.game);
                break;
                case EventType.iUp:
                    let inventory:InventoryComponent;
                    inventory = <InventoryComponent>entity.getComponent("inventory", true);
                    inventory.inventoryToString();
                break;
                case EventType.fUp:
                    if(wasdComponent.dashing)break;
                    wasdComponent.startDashing();
                    wasdComponent.dashWidth = position.width;
                    wasdComponent.dashHeight = position.height;
                    // position.width /= 2;
                    // position.height /= 2;
                    wasdComponent.dashSprite = animation.animationName;
                    animation.setSprite('fireball');
                    // position.h = position.h - (wasdComponent.dashHeight - position.height)/2
                break;
            }
        }
        this.updateDashing(entity, wasdComponent, position, animation);
    }
    private updateDashing(entity: Entity, wasdComponent: WasdComponent, position: PositionComponent, animation: AnimationComponent){
        if (!wasdComponent.dashing)return;
        if (wasdComponent.dashingTime == 0){
            wasdComponent.dashing = false;
            position.vx = 0;
            position.vy = 0;
            position.h = 0;
            // position.width = wasdComponent.dashWidth;
            // position.height = wasdComponent.dashHeight;
            animation.setSprite(wasdComponent.dashSprite);
            return;
        }
        wasdComponent.dashingTime -= 1; 
        position.vx = Math.sign(position.faceX) * wasdComponent.dashSpeed;
        position.vy = Math.sign(position.faceY) * wasdComponent.dashSpeed;
    }
}