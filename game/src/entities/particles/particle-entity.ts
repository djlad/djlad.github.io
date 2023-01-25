import { createComponentFactory } from "../../builders/build-components";
import { PositionComponent } from "../../engine/component/components/position/position-component";
import { ComponentFactory } from "../../engine/component/component-factory";
import { Entity } from "../../engine/entity/entity";
import { GameEvent } from "../../engine/events/game-event";
import { EntityRegistration } from "../../engine/entity/entity-registration";
import { GameDependencies } from "../../engine/dependencies/game-dependencies";

export class ParticleEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        let position = entity.addComponent("position");
        entity.addComponent("primitive");
        return entity;
    }
}