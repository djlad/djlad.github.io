var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PixiSpriteManager = void 0;
    class PixiSpriteManager {
        constructor(pixiGame) {
            this.pixiGame = pixiGame;
        }
        onLoad(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.pixiGame.finishLoading();
                if (callback == null)
                    return;
                callback();
            });
        }
        loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx, offsety) {
            this.pixiGame.loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx, offsety);
        }
        loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx, offsety) {
        }
        loadSpriteOverlapping(spriteName, fileName) {
        }
        addAnimation(spriteName, animationName, spriteNumbers, delay) {
            this.pixiGame.addAnimation(spriteName, animationName, spriteNumbers, delay);
        }
        static create(gameDependencies) {
            gameDependencies.checkDependency(gameDependencies.pixiGame);
            return new PixiSpriteManager(gameDependencies.pixiGame);
        }
        ;
    }
    exports.PixiSpriteManager = PixiSpriteManager;
});
//# sourceMappingURL=pixi-sprite-manager.js.map