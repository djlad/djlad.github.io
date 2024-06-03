import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { SystemArgs } from "../engine/system/system-args";
export declare class DashSystem extends EntitySystem {
    constructor(game: Game);
    applyEvents(entity: Entity, eventManager: EventManager): void;
    shouldApply(entity: Entity): boolean;
    apply(args: SystemArgs): void;
    static create(game: Game): DashSystem;
}
