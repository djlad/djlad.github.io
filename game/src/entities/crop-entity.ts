import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';
import { CropComponent } from '../components/crop-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';

export class CropEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        let animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        let crop:CropComponent = <CropComponent>this.addComponent("crop");
        if(crop.growthSprites.length > 0) {
            animation.setSprite(crop.growthSprites[0]);
        }
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }
    
    static create(){
        let cf:ComponentFactory = createComponentFactory();
        return new CropEntity(cf);
    }
}