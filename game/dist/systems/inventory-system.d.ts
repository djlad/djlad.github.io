import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";
import { SystemArgs } from "../engine/system/system-args";
export declare class InventorySystem extends EntitySystem {
    constructor(game: Game);
    static create(game: Game): InventorySystem;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
}
