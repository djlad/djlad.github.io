import { EntityFactory } from "../engine/entity/entity-factory";
import { PlayerEntity } from "./player-entity";
import { VillagerEntity } from "./villager-entity";
import { CropEntity } from "./crop-entity";
import { FirstEntity } from "./first-entity";
import { ProjectileEntity } from "./projectile-entity";
import { Game } from "../engine/game";


export function populateEntityFactory(game:Game):void{
    game.registerEntity("player", PlayerEntity);
    game.registerEntity("villager", VillagerEntity);
    game.registerEntity("crop", CropEntity);
    game.registerEntity("first", FirstEntity);
    game.registerEntity("projectile", ProjectileEntity);
}