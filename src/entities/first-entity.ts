import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';
import { PositionComponent } from '../components/position-component';

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