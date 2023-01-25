import { createComponentFactory } from "../builders/build-components";
import { CropComponent } from "../components/crop-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";
import { CropEntity } from "./crop-entity";
import { EntityRegistration } from "../engine/entity/entity-registration";
import { GameDependencies } from "../engine/dependencies/game-dependencies";

export class LinesEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        return entity;
    }
}