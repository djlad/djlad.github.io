import { Entity } from '../engine/entity/entity';
import { GameDependencies } from '../engine/dependencies/game-dependencies';
import { EntityRegistration } from '../engine/entity/entity-registration';
export declare class PlayerEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity;
}
