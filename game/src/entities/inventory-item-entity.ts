import { Entity } from "../engine/entity/entity";
import { ComponentFactory } from "../engine/component/component-factory";
import { GameEvent } from "../engine/events/game-event";
import { createComponentFactory } from "../builders/build-components";
import { TextComponent } from "../components/text-component/text-component";
import { EntityUpdateArgs } from "../engine/entity/entity-update-args";
import { EntityRegistration } from "../engine/entity/entity-registration";
import { GameDependencies } from "../engine/dependencies/game-dependencies";

export class InventoryItemEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        entity.addComponent("position");
        entity.addComponent("animation");
        let text:TextComponent = <TextComponent>entity.addComponent("text");
        text.addTextPlacement("", 0, 0);
        return entity;
    }
}