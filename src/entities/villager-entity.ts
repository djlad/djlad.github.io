import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';

export class VillagerEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        var fight:FightComponent = <FightComponent>this.addComponent("fight");
        var health:HealthComponent = <HealthComponent>this.addComponent("health");
        
        position.width = 70;
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }

    static create():VillagerEntity{
        var entity = new VillagerEntity(ComponentFactory.create());
        return entity;
    }
}