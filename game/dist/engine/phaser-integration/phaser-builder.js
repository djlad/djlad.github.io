define(["require", "exports", "../game", "./phaser-components/phaser-animation-component", "./phaser-components/phaser-position-component", "./phaser-dependency-builder", "./phaser-game", "./phaser-systems/phaser-render-system"], function (require, exports, game_1, phaser_animation_component_1, phaser_position_component_1, phaser_dependency_builder_1, phaser_game_1, phaser_render_system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createPhaserGame = void 0;
    function buildPhaserComponents(game) {
        console.log("building phaser game components");
        game.registerComponent(phaser_animation_component_1.PhaserAnimationComponent);
        game.registerComponent(phaser_position_component_1.PhaserPositionComponent);
    }
    function createPhaserGame(game = null) {
        if (game == null) {
            const deps = (0, phaser_dependency_builder_1.buildPhaserDependencies)();
            game = game_1.Game.createCustom(deps);
        }
        const phaserGame = phaser_game_1.PhaserGame.createSingleton();
        phaserGame.mainScene.addCreator((scene) => {
            phaserGame.setUpdater((delta) => {
                game.step(delta);
            });
        });
        buildPhaserComponents(game);
        game.addSystem(phaser_render_system_1.PhaserRenderSystem.create(game));
        game.addStarter(() => { phaserGame.start(); });
        return game;
    }
    exports.createPhaserGame = createPhaserGame;
});
//# sourceMappingURL=phaser-builder.js.map