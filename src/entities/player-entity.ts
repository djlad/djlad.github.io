import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';

export class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        this.addComponent("animation");
        this.addComponent("position");
        this.addComponent("wasd");
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():PlayerEntity{
        var entity = new PlayerEntity(ComponentFactory.create());
        return entity;
    }
}