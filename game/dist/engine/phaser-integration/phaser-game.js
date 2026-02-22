var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "phaser", "./main-scene"], function (require, exports, Phaser, main_scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserGame = void 0;
    Phaser = __importStar(Phaser);
    class PhaserGame {
        constructor() {
            this.mainScene = new main_scene_1.MainScene();
            this.config = {
                type: Phaser.WEBGL,
                width: window.innerWidth,
                height: window.innerHeight,
                scene: main_scene_1.MainScene,
                fps: {
                    target: 60,
                    forceSetTimeOut: true
                },
                physics: {
                    default: "arcade",
                    arcade: {},
                    matter: {
                        gravity: false,
                        debug: {
                            showBody: true,
                            showStaticBody: true
                        }
                    },
                }
            };
        }
        start() {
            this.game = new Phaser.Game(this.config);
            this.mainScene.addCreator((scene) => {
                console.log("creator for canvas");
                const canvas = this.game.canvas;
                canvas.style.margin = "0";
                canvas.style.padding = "0";
                canvas.style.overflow = "hidden";
                canvas.style.position = "fixed";
                canvas.style.top = "0px";
                canvas.style.left = "0px";
            });
            this.game.scene.add("mainReal", this.mainScene);
            this.game.scene.switch("main", "mainReal");
        }
        setUpdater(updater) {
            this.mainScene.setUpdater(updater);
        }
        static createSingleton() {
            if (PhaserGame.phaserGame == null) {
                PhaserGame.phaserGame = new PhaserGame();
            }
            return PhaserGame.phaserGame;
        }
    }
    exports.PhaserGame = PhaserGame;
    PhaserGame.phaserGame = null;
});
//# sourceMappingURL=phaser-game.js.map