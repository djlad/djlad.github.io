import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityRegistration } from "../engine/entity/entity-registration";
export declare class WeaponEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity;
}
