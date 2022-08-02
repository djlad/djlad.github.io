import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
import { WasdComponent } from '../components/wasd-component';
import { AnimationComponent } from '../components/animation-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { InventoryComponent } from '../components/inventory-component/inventory-component';
import { PlaceItemComponent } from '../components/place-item/place-item-component';
import { GameEvent } from '../engine/events/game-event';
import { CropHarvesterComponent } from '../components/crop-harvester-component';

export class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        var wasd:WasdComponent = <WasdComponent>this.addComponent("wasd");
        var inventory:InventoryComponent = <InventoryComponent>this.addComponent("inventory");
        let placeItem:PlaceItemComponent = <PlaceItemComponent>this.addComponent("placeItem");
        let cropHarvester:CropHarvesterComponent;
        cropHarvester = <CropHarvesterComponent>this.addComponent("cropHarvester");
        
        // var sprite:string = "grey";
        // var walkSprite:string = "greyWalk";
        var sprite:string = "blond";
        var walkSprite:string = "blondWalk";
        
        animation.setSprite(sprite)
        wasd.sprite = sprite;
        wasd.walkSprite = walkSprite;
        position.width = 70;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():PlayerEntity{
        let cf:ComponentFactory = createComponentFactory();
        var entity = new PlayerEntity(cf);
        return entity;
    }
}