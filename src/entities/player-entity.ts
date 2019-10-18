import { Entity } from '../engine/entity/entity';
import { GameEvent } from '../engine/events/event-manager';
import { PositionComponent } from '../components/position-component';
import { WasdComponent } from '../components/wasd-component';
import { AnimationComponent } from '../components/animation-component';
import { ComponentFactory } from '../engine/component/component-factory';

export class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        var wasd:WasdComponent = <WasdComponent>this.addComponent("wasd");
        
        var sprite:string = "grey";
        var walkSprite:string = "greyWalk";
        
        animation.setSprite(sprite)
        wasd.sprite = sprite;
        wasd.walkSprite = walkSprite;
        position.width = 70;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():PlayerEntity{
        var entity = new PlayerEntity(ComponentFactory.create());
        return entity;
    }
}