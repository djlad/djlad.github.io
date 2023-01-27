import { Entity } from "../engine/entity/entity";
import { TextComponent } from "../components/text-component/text-component";
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