define(["require", "exports", "../component/component-factory", "../dependencies/generic-cameras", "../entity/entity-factory", "../events/event-manager", "../game", "./pixi-components/generic-animation-component", "./pixi-components/generic-position-component", "./pixi-dependencies", "./pixi-game", "./pixi-sprite-manager", "./sprite-dependency/pixie-engine-creator", "./generic-render", "./systems/generic-render-system"], function (require, exports, component_factory_1, generic_cameras_1, entity_factory_1, event_manager_1, game_1, generic_animation_component_1, generic_position_component_1, pixi_dependencies_1, pixi_game_1, pixi_sprite_manager_1, pixie_engine_creator_1, generic_render_1, generic_render_system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pixiGameBuilder = void 0;
    function pixiGameBuilder(metadata = null) {
        const deps = new pixi_dependencies_1.PixiDependencies();
        deps.imgMetaData = metadata;
        deps.pixiGame = pixi_game_1.PixiGame.createSingleton(deps);
        deps.spriteManager = pixi_sprite_manager_1.PixiSpriteManager.create(deps);
        deps.renderer = generic_render_1.GenericRenderer.create();
        deps.cameras = generic_cameras_1.GenericCameras.create();
        deps.engineCreator = pixie_engine_creator_1.PixieEngineCreator.create(deps);
        deps.eventManager = event_manager_1.EventManager.create();
        deps.componentFactory = component_factory_1.ComponentFactory.create(deps);
        deps.entityFactory = entity_factory_1.EntityFactory.create(deps);
        const game = game_1.Game.createCustom(deps);
        game.registerComponent(generic_position_component_1.GenericPositionComponent);
        game.registerComponent(generic_animation_component_1.GenericAnimationComponent);
        game.addSystem(generic_render_system_1.GenericRenderSystem.create(game));
        game.addStarter(() => {
            setTimeout(() => deps.pixiGame.start(), 5000);
        });
        game.addStarter(() => {
            deps.pixiGame.app.ticker.add((delta) => {
                game.step(delta * 15);
            });
        });
        return game;
    }
    exports.pixiGameBuilder = pixiGameBuilder;
});
//# sourceMappingURL=pixi-builder.js.map