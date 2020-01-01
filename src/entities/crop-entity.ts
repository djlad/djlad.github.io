import { Entity } from '../engine/entity/entity';
import { GameEvent } from '../engine/events/event-manager';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';

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
        let cf:ComponentFactory = createComponentFactory();
        return new CropEntity(cf);
    }
}