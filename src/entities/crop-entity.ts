import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';

export class CropEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        this.addComponent("animation");
        this.addComponent("position");
        this.addComponent("crop");
        var animation:AnimationComponent = <AnimationComponent>this.getComponent("animation");
        var position:PositionComponent = <PositionComponent>this.getComponent("position");
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }
    
    static create(){
        return new CropEntity(ComponentFactory.create());
    }
}