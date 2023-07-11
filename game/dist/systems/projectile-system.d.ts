import { EntitySystem } from '../engine/system/system';
import { Game } from '../engine/game';
import { Entity } from '../engine/entity/entity';
import { SystemArgs } from '../engine/system/system-args';
export declare class ProjectileSystem extends EntitySystem {
    constructor(game: Game);
    apply(args: SystemArgs): void;
    fireProjectile(entity: Entity, vx?: number, vy?: number): void;
    applyEvents(entity: Entity): void;
    static create(game: Game): ProjectileSystem;
}
