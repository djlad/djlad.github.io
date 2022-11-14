import { PlayerEntity } from "../entities/player-entity";
import { VillagerEntity } from "../entities/villager-entity";
import { CropEntity } from "../entities/crop-entity";
import { FirstEntity } from "../entities/first-entity";
import { ProjectileEntity } from "../entities/projectile-entity";
import { Game } from "../engine/game";
import { InventoryItemEntity } from "../entities/inventory-item-entity";
import { ParticleEntity } from "../entities/particles/particle-entity";
import { ParticlesEntity } from "../entities/particles/particles-entity";


export function buildEntities(game:Game):void{
    game.registerEntity("player", PlayerEntity);
    game.registerEntity("villager", VillagerEntity);
    game.registerEntity("crop", CropEntity);
    game.registerEntity("first", FirstEntity);
    game.registerEntity("projectile", ProjectileEntity);
    game.registerEntity("inventoryItem", InventoryItemEntity);
    game.registerEntity("particle", ParticleEntity);
    game.registerEntity("particles", ParticlesEntity);
}