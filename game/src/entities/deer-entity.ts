import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
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