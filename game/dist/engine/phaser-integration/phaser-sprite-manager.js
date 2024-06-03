define(["require", "exports", "../renderers/sprite-animation", "./phaser-game", "../../metadata"], function (require, exports, sprite_animation_1, phaser_game_1, metadata_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserSpriteManager = void 0;
    class PhaserSpriteManager {
        constructor(spriteDir = "../sprites/") {
            this.spriteNameToPath = {};
            this.phaserGame = phaser_game_1.PhaserGame.createSingleton();
            this.spriteDir = spriteDir;
        }
        onLoad(callback) {
            throw new Error("Method not implemented.");
        }
        path(fileName) {
            return this.spriteDir + fileName;
        }
        loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
            this.phaserGame.mainScene.addPreloader(() => {
                const path = this.path(fileName);
                const width = metadata_1.metadata[path.replace("../", "")].width;
                const height = metadata_1.metadata[path.replace("../", "")].height;
                const frameWidth = width / widthImgs;
                const frameHeight = height / heightImgs;
                this.phaserGame.mainScene.load.spritesheet(spriteName, path, {
                    frameWidth: frameWidth,
                    frameHeight: frameHeight
                });
            });
        }
        loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
        }
        loadSpriteOverlapping(spriteName, fileName) {
        }
        addAnimation(spriteName, animationName, spriteNumbers, delay = 1) {
            this.phaserGame.mainScene.addCreator(() => {
                const anims = this.phaserGame.mainScene.anims;
                anims.create({
                    key: animationName,
                    frames: anims.generateFrameNumbers(spriteName, {
                        frames: spriteNumbers
                    }),
                    frameRate: Math.floor(30 / delay),
                    repeat: -1
                });
            });
        }
        getAnimation(animationName) {
            return sprite_animation_1.SpriteAnimation.create(animationName, "", [], 0);
        }
        getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
            return new ImageData(0, 0);
        }
        static create() {
            return new PhaserSpriteManager();
        }
        static singeltonCreate() {
            if (PhaserSpriteManager.spriteManager != null)
                return PhaserSpriteManager.spriteManager;
            PhaserSpriteManager.spriteManager = new PhaserSpriteManager();
            return PhaserSpriteManager.spriteManager;
        }
    }
    exports.PhaserSpriteManager = PhaserSpriteManager;
    PhaserSpriteManager.spriteManager = null;
});
//# sourceMappingURL=phaser-sprite-manager.js.map