define(["require", "exports", "../component/component-factory", "../entity/entity-factory", "../events/event-manager", "./phaser-cameras", "./phaser-game", "./phaser-game-dependencies", "./phaser-sprite-manager", "../renderers/implementations/html/html-renderer"], function (require, exports, component_factory_1, entity_factory_1, event_manager_1, phaser_cameras_1, phaser_game_1, phaser_game_dependencies_1, phaser_sprite_manager_1, html_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildPhaserDependencies = void 0;
    function buildPhaserDependencies() {
        const deps = new phaser_game_dependencies_1.PhaserGameDependencies();
        deps.phaserGame = phaser_game_1.PhaserGame.createSingleton();
        deps.cameras = phaser_cameras_1.PhaserCameras.create(deps);
        deps.renderer = html_renderer_1.HtmlRenderer.create();
        deps.spriteManager = phaser_sprite_manager_1.PhaserSpriteManager.create();
        deps.eventManager = event_manager_1.EventManager.create();
        deps.componentFactory = component_factory_1.ComponentFactory.create(deps);
        deps.entityFactory = entity_factory_1.EntityFactory.create(deps);
        return deps;
    }
    exports.buildPhaserDependencies = buildPhaserDependencies;
});
//# sourceMappingURL=phaser-dependency-builder.js.map