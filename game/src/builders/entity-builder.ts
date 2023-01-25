import { PlayerEntity } from "../entities/player-entity";
import { VillagerEntity } from "../entities/villager-entity";
import { CropEntity } from "../entities/crop-entity";
import { FirstEntity } from "../entities/first-entity";
import { ProjectileEntity } from "../entities/projectile-entity";
import { Game } from "../engine/game";
import { InventoryItemEntity } from "../entities/inventory-item-entity";
import { ParticleEntity } from "../entities/particles/particle-entity";
import { ParticlesEntity } from "../entities/particles/particles-entity";
import { ClickableEntity } from "../entities/clickable-entity";
import { DeerEntity } from "../entities/deer-entity";
import { UIPanelEntity } from "../entities/ui-panel-entity";


export function buildEntities(game:Game):void{
    game.registerEntity("player", new PlayerEntity());
    game.registerEntity("villager", new VillagerEntity());
    game.registerEntity("crop", new CropEntity());
    game.registerEntity("first", new FirstEntity());
    game.registerEntity("projectile", new ProjectileEntity());
    game.registerEntity("inventoryItem", new InventoryItemEntity());
    game.registerEntity("particle", new ParticleEntity());
    game.registerEntity("particles", new ParticlesEntity());
    game.registerEntity("click", new ClickableEntity());
    game.registerEntity("deer", new DeerEntity());
    game.registerEntity("uipanel", new UIPanelEntity());
}