import { PositionComponent } from "../engine/component/components/position/position-component";
import { Entity } from "../engine/entity/entity";
import { AnimationComponent } from "../engine/component/components/animation/animation-component";
import { EntityRegistration } from "../engine/entity/entity-registration";
import { GameDependencies } from "../engine/dependencies/game-dependencies";

export class UIPanelEntity implements EntityRegistration{
    create(gameDependcies: GameDependencies, entity: Entity){
        let animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        position.applyOffsets = false;
        animation.setSprite("woodpanelsunken");
        return entity;
    }
}