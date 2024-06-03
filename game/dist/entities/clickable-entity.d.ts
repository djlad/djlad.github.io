import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { EntityRegistration } from "../engine/entity/entity-registration";
export declare class ClickableEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity;
    handleEvents(events: {
        [key: string]: GameEvent;
    }): void;
}
