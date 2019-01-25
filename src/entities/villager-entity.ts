import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';

export class VillagerEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position = <PositionComponent>this.addComponent("position");
        position.width = 70;
        //animation.setSprite("fireball");
        //animation.setSprite("");
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():VillagerEntity{
        var entity = new VillagerEntity(ComponentFactory.create());
        return entity;
    }
}