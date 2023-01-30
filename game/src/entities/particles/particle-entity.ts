import { Entity } from "../../engine/entity/entity";
import { EntityRegistration } from "../../engine/entity/entity-registration";
import { GameDependencies } from "../../engine/dependencies/game-dependencies";

export class ParticleEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        let position = entity.addComponent("position");
        entity.addComponent("primitive");
        return entity;
    }
}