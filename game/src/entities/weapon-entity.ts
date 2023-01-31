import { AnimationComponent } from "../components/animation-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityRegistration } from "../engine/entity/entity-registration";
import { GenericPositionComponent } from "../engine/pixi-integration/pixi-components/generic-position-component";

export class WeaponEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        const pos = <GenericPositionComponent>entity.addComponent("position");
        const anim = <AnimationComponent>entity.addComponent("animation");
        anim.setSprite("arrowsword");
        pos.width = 32;
        pos.height = 32;
        pos.width *= 2;
        pos.height *= 2;
        pos.pivotX = 1;
        pos.pivotY = 1;
        pos.anchorX = 1;
        pos.anchorY = 1;
        return entity;
    }
}