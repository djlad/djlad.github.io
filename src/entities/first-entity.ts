import { Entity } from '../engine/entity/entity';
import { GameEvent } from '../engine/events/event-manager';
import { PositionComponent } from '../components/position-component';
import { ComponentFactory } from '../engine/component/component-factory';

export class FirstEntity extends Entity{
    /**
     * this is an empty entity that will always be the first 
     * entity in the game.entities array. if a system wants to know if it is being applied 
     * to the first entity it can check if it is this entity.
     */
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        position.y = 9999999;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():FirstEntity{
        var entity = new FirstEntity(ComponentFactory.create());
        return entity;
    }
}