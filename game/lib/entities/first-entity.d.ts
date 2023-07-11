import { Entity } from '../engine/entity/entity';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';
export declare class FirstEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity;
}
