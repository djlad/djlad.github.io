import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { SystemArgs } from '../engine/system/system-args';
export declare class CropSystem extends EntitySystem {
    constructor(game: Game);
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
    static create(game: Game): EntitySystem;
    private handleCollision;
    private handleEvent;
}
