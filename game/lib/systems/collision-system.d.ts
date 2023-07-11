import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { SystemArgs } from '../engine/system/system-args';
export declare class CollisionSystem extends EntitySystem {
    constructor(game: Game);
    movingEntities: {
        [key: number]: Entity;
    };
    colliding: {
        [key: string]: Entity[];
    };
    numCollisions: number;
    private distance;
    private checkCol;
    private hashCollision;
    private addCollision;
    private removeCollision;
    private emitCollision;
    private removeMovingEntity;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity): void;
    static create(game: Game): CollisionSystem;
}
