import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';

export class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        this.addComponent("animation");
        this.addComponent("position");
    }
    static create():PlayerEntity{
        var entity = new PlayerEntity(ComponentFactory.create());
        return entity;
    }
}