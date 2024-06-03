define(["require", "exports", "../entities/player-entity", "../entities/villager-entity", "../entities/crop-entity", "../entities/first-entity", "../entities/projectile-entity", "../entities/inventory-item-entity", "../entities/particles/particle-entity", "../entities/particles/particles-entity", "../entities/clickable-entity", "../entities/deer-entity", "../entities/ui-panel-entity", "../entities/weapon-entity"], function (require, exports, player_entity_1, villager_entity_1, crop_entity_1, first_entity_1, projectile_entity_1, inventory_item_entity_1, particle_entity_1, particles_entity_1, clickable_entity_1, deer_entity_1, ui_panel_entity_1, weapon_entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildEntities = void 0;
    function buildEntities(game) {
        game.registerEntity("player", new player_entity_1.PlayerEntity());
        game.registerEntity("villager", new villager_entity_1.VillagerEntity());
        game.registerEntity("crop", new crop_entity_1.CropEntity());
        game.registerEntity("first", new first_entity_1.FirstEntity());
        game.registerEntity("projectile", new projectile_entity_1.ProjectileEntity());
        game.registerEntity("inventoryItem", new inventory_item_entity_1.InventoryItemEntity());
        game.registerEntity("particle", new particle_entity_1.ParticleEntity());
        game.registerEntity("particles", new particles_entity_1.ParticlesEntity());
        game.registerEntity("click", new clickable_entity_1.ClickableEntity());
        game.registerEntity("deer", new deer_entity_1.DeerEntity());
        game.registerEntity("uipanel", new ui_panel_entity_1.UIPanelEntity());
        game.registerEntity("weapon", new weapon_entity_1.WeaponEntity());
    }
    exports.buildEntities = buildEntities;
});
//# sourceMappingURL=entity-builder.js.map