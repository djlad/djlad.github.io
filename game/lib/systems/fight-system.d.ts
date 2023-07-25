import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { SystemArgs } from '../engine/system/system-args';
export declare class FightSystem extends EntitySystem {
    constructor(game: Game);
    get_entity_direction(origin: Entity, destination: Entity): {
        dx: number;
        dy: number;
    };
    hypotenuse(e1: Entity, e2: Entity): number;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
    static create(game: Game): EntitySystem;
}
