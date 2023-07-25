import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { EventManager } from '../engine/events/event-manager';
import { SystemArgs } from '../engine/system/system-args';
export declare class WasdSystem extends EntitySystem {
    constructor(game: Game);
    private move;
    private stop;
    private touchStart;
    static create(game: Game): WasdSystem;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity, eventManager: EventManager): void;
    private updateDashing;
    private dash;
}
