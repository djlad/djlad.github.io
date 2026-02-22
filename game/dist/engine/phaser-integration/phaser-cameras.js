define(["require", "exports", "./phaser-components/phaser-position-component"], function (require, exports, phaser_position_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserCameras = void 0;
    class PhaserCameras {
        constructor(phaserGame) {
            this.phaserGame = phaserGame;
        }
        setMainCamera(position) {
            if (!(position instanceof phaser_position_component_1.PhaserPositionComponent)) {
                console.error("Couldn't center camera. Position component must be PhaserPositionComponent");
            }
            this.center = position;
            const phaserPosition = position;
            this.phaserGame.mainScene.addCreator(() => {
                const playerPhaserObj = phaserPosition.phaserObject;
                this.phaserGame.mainScene.cameras.main.startFollow(playerPhaserObj);
            });
        }
        static create(gameDependencies) {
            gameDependencies.checkDependency(gameDependencies.phaserGame);
            const pc = new PhaserCameras(gameDependencies.phaserGame);
            return pc;
        }
    }
    exports.PhaserCameras = PhaserCameras;
});
//# sourceMappingURL=phaser-cameras.js.map