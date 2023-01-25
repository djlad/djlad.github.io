import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightSystem } from '../systems/neural-fight-system';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';

export class DeerEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        animation.setSprite("deer");
        
        position.width = 110;
        position.height = 110;
        return entity;
    }
}