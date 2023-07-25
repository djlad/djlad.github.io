import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { SystemArgs } from '../engine/system/system-args';
export declare class NeuralFightSystem extends EntitySystem {
    constructor(game: Game);
    static create(game: Game): NeuralFightSystem;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
}
