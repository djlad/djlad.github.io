define(["require", "exports", "../engine/component/components/position/position-component", "../components/wasd-component", "../components/crop-component", "../components/projectile-component", "../components/fight-component", "../components/health-component", "../components/neural-fight-component", "../components/inventory-component/inventory-component", "../components/place-item/place-item-component", "../components/crop-harvester-component", "../components/text-component/text-component", "../components/particle-componet", "../components/primitive-component", "../components/transitions/transition-component", "../components/tile-component/tile-component", "../components/clickable-component", "../engine/component/components/animation/animation-component", "../components/weapon-component/weapon-component"], function (require, exports, position_component_1, wasd_component_1, crop_component_1, projectile_component_1, fight_component_1, health_component_1, neural_fight_component_1, inventory_component_1, place_item_component_1, crop_harvester_component_1, text_component_1, particle_componet_1, primitive_component_1, transition_component_1, tile_component_1, clickable_component_1, animation_component_1, weapon_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildComponents = void 0;
    function buildComponents(game) {
        game.registerComponent(animation_component_1.AnimationComponent);
        game.registerComponent(position_component_1.PositionComponent);
        game.registerComponent(wasd_component_1.WasdComponent);
        game.registerComponent(crop_component_1.CropComponent);
        game.registerComponent(projectile_component_1.ProjectileComponent);
        game.registerComponent(fight_component_1.FightComponent);
        game.registerComponent(health_component_1.HealthComponent);
        game.registerComponent(neural_fight_component_1.NeuralFightComponent);
        game.registerComponent(inventory_component_1.InventoryComponent);
        game.registerComponent(particle_componet_1.ParticleComponent);
        game.registerComponent(primitive_component_1.PrimitiveComponent);
        game.registerComponent(transition_component_1.TransitionComponent);
        game.registerComponent(tile_component_1.TileComponent);
        game.registerComponent(clickable_component_1.ClickableComponent);
        game.registerComponent(place_item_component_1.PlaceItemComponent);
        game.registerComponent(crop_harvester_component_1.CropHarvesterComponent);
        game.registerComponent(text_component_1.TextComponent);
        game.registerComponent(weapon_component_1.WeaponComponent);
    }
    exports.buildComponents = buildComponents;
});
//# sourceMappingURL=build-components.js.map