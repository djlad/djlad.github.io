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
            switch(event.eventName){
                case EventType.wDown:
                    animation.setSprite(walkSprite);
                    position.vy = -speed;
                break;
                case EventType.wUp:
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.aDown:
                    position.faceRight = false;
                    animation.setSprite(walkSprite);
                    position.vx = -speed;
                break;
                case EventType.aUp:
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.sDown:
                    animation.setSprite(walkSprite);
                    position.vy = speed;
                break;
                case EventType.sUp:
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.dDown:
                    position.faceRight = true;
                    animation.setSprite(walkSprite);
                    position.vx = speed;
                break;
                case EventType.dUp:
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
                case EventType.fUp:
                    let cropHarvester:CropHarvesterComponent;
                    try{
                        cropHarvester = <CropHarvesterComponent>entity.getComponent("cropHarvester");
                    } catch {return}
                    cropHarvester.startHarvest();
                break;
                case EventType.pUp:
                    //console.log("p up")
                    console.log(this.game);
                break;
                case EventType.iUp:
                    let inventory:InventoryComponent;
                    inventory = <InventoryComponent>entity.getComponent("inventory", true);
                    inventory.inventoryToString();
                break;
            }
        }
    }
}