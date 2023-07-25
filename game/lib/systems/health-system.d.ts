import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { GameEvent } from '../engine/events/game-event';
import { SystemArgs } from '../engine/system/system-args';
export declare class HealthSystem extends EntitySystem {
    constructor(game: Game);
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
    handleDamage(entity: Entity, event: GameEvent): void;
    static create(game: Game): HealthSystem;
}
