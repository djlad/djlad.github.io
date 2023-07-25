import { GameDependencies } from "../dependencies/game-dependencies";
import { Entity } from "../entity/entity";
import { EntityUpdateArgs } from "../entity/entity-update-args";
import { Game } from "../game";
export declare abstract class Component {
    constructor(componentName: string);
    componentName: string;
    abstract update(entity: Entity, args: EntityUpdateArgs): void;
    static create(game: GameDependencies, entityId: string): void;
    static createWithGame(game: Game, entityId: string): void;
}
