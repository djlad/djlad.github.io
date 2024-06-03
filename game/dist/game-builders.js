define(["require", "exports", "./builders/entity-builder", "./builders/sprite-builder", "./systems/click-system", "./systems/collision-system", "./systems/crop-system", "./systems/health-system", "./systems/inventory-system", "./systems/map-builder-system", "./systems/neural-fight-system", "./systems/particle-system", "./systems/place-item-system", "./systems/position-system", "./systems/projectile-system", "./systems/wasd-system", "./engine/game", "./components/clickable-component", "./components/crop-component", "./components/fight-component", "./components/health-component", "./components/inventory-component/inventory-component", "./components/neural-fight-component", "./components/particle-componet", "./engine/component/components/position/position-component", "./components/primitive-component", "./components/projectile-component", "./components/tile-component/tile-component", "./components/transitions/transition-component", "./components/wasd-component", "./engine/component/components/animation/animation-component", "./components/place-item/place-item-component", "./components/crop-harvester-component", "./components/text-component/text-component", "./systems/render-system", "./engine/pixi-integration/pixi-builder", "./components/weapon-component/weapon-component", "./components/dash-component", "./systems/dash-system"], function (require, exports, entity_builder_1, sprite_builder_1, click_system_1, collision_system_1, crop_system_1, health_system_1, inventory_system_1, map_builder_system_1, neural_fight_system_1, particle_system_1, place_item_system_1, position_system_1, projectile_system_1, wasd_system_1, game_1, clickable_component_1, crop_component_1, fight_component_1, health_component_1, inventory_component_1, neural_fight_component_1, particle_componet_1, position_component_1, primitive_component_1, projectile_component_1, tile_component_1, transition_component_1, wasd_component_1, animation_component_1, place_item_component_1, crop_harvester_component_1, text_component_1, render_system_1, pixi_builder_1, weapon_component_1, dash_component_1, dash_system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGame = exports.createPixiGame = void 0;
    function sharedComponents(game) {
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
        game.registerComponent(dash_component_1.DashComponent);
    }
    function sharedSystems(game) {
        game.addSystem(wasd_system_1.WasdSystem.create(game));
        game.addSystem(crop_system_1.CropSystem.create(game));
        game.addSystem(collision_system_1.CollisionSystem.create(game));
        game.addSystem(projectile_system_1.ProjectileSystem.create(game));
        game.addSystem(health_system_1.HealthSystem.create(game));
        game.addSystem(neural_fight_system_1.NeuralFightSystem.create(game));
        game.addSystem(place_item_system_1.PlaceItemSystem.create(game));
        game.addSystem(inventory_system_1.InventorySystem.create(game));
        game.addSystem(particle_system_1.ParticleSystem.create(game));
        game.addSystem(map_builder_system_1.MapBuilderSystem.create(game));
        game.addSystem(click_system_1.ClickSystem.create(game));
        game.addSystem(dash_system_1.DashSystem.create(game));
    }
    function buildComponents(game) {
        console.log("building game components");
        game.registerComponent(animation_component_1.AnimationComponent);
        game.registerComponent(position_component_1.PositionComponent);
        sharedComponents(game);
    }
    function createPixiGame() {
        console.log("creating pixi game");
        const game = (0, pixi_builder_1.pixiGameBuilder)();
        sharedSystems(game);
        (0, sprite_builder_1.buildSprites)(game);
        (0, entity_builder_1.buildEntities)(game);
        sharedComponents(game);
        return game;
    }
    exports.createPixiGame = createPixiGame;
    function createGame(game = null) {
        if (game == null) {
            game = game_1.Game.create();
        }
        game.addSystem(position_system_1.PositionSystem.create(game));
        game.addSystem(render_system_1.RenderSystem.create(game));
        sharedSystems(game);
        (0, sprite_builder_1.buildSprites)(game);
        (0, entity_builder_1.buildEntities)(game);
        buildComponents(game);
        return game;
    }
    exports.createGame = createGame;
});
//# sourceMappingURL=game-builders.js.map