import { PositionComponent } from "../engine/component/components/position/position-component";
import { Entity } from "../engine/entity/entity";
import { EntityRegistration } from "../engine/entity/entity-registration";
import { GameDependencies } from "../engine/dependencies/game-dependencies";

export class LinesEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        return entity;
    }
}