import { createComponentFactory } from "../builders/build-components";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";
import { AnimationComponent } from "../engine/component/components/animation/animation-component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { EntityRegistration } from "../engine/entity/entity-registration";

export class ClickableEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        let animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        entity.addComponent("click");
        return entity;
    }
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
}