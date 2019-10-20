import { Entity } from '../engine/entity/entity';
import { GameEvent } from '../engine/events/event-manager';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightSystem } from '../systems/neural-fight-system';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../components/component-factory';

export class VillagerEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        var fight:FightComponent = <FightComponent>this.addComponent("fight");
        var health:HealthComponent = <HealthComponent>this.addComponent("health");
        var neural:NeuralFightComponent = <NeuralFightComponent>this.addComponent("neural");
        
        position.width = 70;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():VillagerEntity{
        let cf:ComponentFactory = createComponentFactory();
        var entity = new VillagerEntity(cf);
        return entity;
    }
}