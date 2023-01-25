import { PositionComponent } from "../../engine/component/components/position/position-component";
import { GameDependencies } from "../../engine/dependencies/game-dependencies";
import { Entity } from "../../engine/entity/entity";
import { EntityRegistration } from "../../engine/entity/entity-registration";

export class ParticlesEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        let position = <PositionComponent>entity.addComponent("position");
        position.width = 10;
        entity.addComponent("particles");
        return entity;
    }
}