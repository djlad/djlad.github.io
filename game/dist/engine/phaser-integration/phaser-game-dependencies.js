define(["require", "exports", "../dependencies/game-dependencies"], function (require, exports, game_dependencies_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserGameDependencies = void 0;
    class PhaserGameDependencies extends game_dependencies_1.GameDependencies {
        constructor() {
            super(...arguments);
            this.phaserGame = null;
        }
    }
    exports.PhaserGameDependencies = PhaserGameDependencies;
});
//# sourceMappingURL=phaser-game-dependencies.js.map