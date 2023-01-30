import { GameDependencies } from "../dependencies/game-dependencies";
import { Entity } from "./entity";

export interface EntityRegistration {
    create(gameDependencies:GameDependencies, entity:Entity):Entity
}