import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightSystem } from '../systems/neural-fight-system';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';

export class DeerEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        animation.setSprite("deer");
        
        position.width = 110;
        position.height = 110;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():DeerEntity{
        let cf:ComponentFactory = createComponentFactory();
        var entity = new DeerEntity(cf);
        return entity;
    }
}