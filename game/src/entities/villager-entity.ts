import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { AnimationComponent } from '../components/animation-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightSystem } from '../systems/neural-fight-system';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';

export class VillagerEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        var fight:FightComponent = <FightComponent>this.addComponent("fight");
        var health:HealthComponent = <HealthComponent>this.addComponent("health");
        var neural:NeuralFightComponent = <NeuralFightComponent>this.addComponent("neural");
        
        position.width = 70;
        /*animation.setSprite("brownpuffgirl");
        
        position.height = 32;
        let multiplier = 2.5;
        position.height *= multiplier * 1.1;
        position.width *= multiplier;*/
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():VillagerEntity{
        let cf:ComponentFactory = createComponentFactory();
        var entity = new VillagerEntity(cf);
        return entity;
    }
}