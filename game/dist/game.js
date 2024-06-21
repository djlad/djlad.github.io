var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./game-builders", "./characters/character-builder", "./logger"], function (require, exports, game_builders_1, character_builder_1, logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            let game = (0, game_builders_1.createPixiGame)();
            yield game.gameDependencies.spriteManager.onLoad(() => {
                game.addEntity("first");
                const player = makePlayer();
                const playerPosition = player.getComponent("position");
                const playerSword = player.getComponent("weapon");
                setTimeout(() => playerSword.holdWeapon(), 100);
                game.gameDependencies.cameras.setMainCamera(playerPosition);
                const john = (0, character_builder_1.blue)(game, 100, 100);
                let sword = game.addEntity("weapon");
                const pos = sword.getComponent("position");
                pos.x = 100;
                pos.y = 300;
                setInterval(() => {
                    pos.rotate += .1;
                }, 1000 / 30);
                var deer = game.addEntity("deer");
                let deerPos = deer.getComponent("position");
                let deerAC = deer.getComponent("animation");
                deerPos.x = 500;
                deerPos.y = 100;
                let particle = game.addEntity("particles");
                let particleC = particle.getComponent("particles");
                particleC.targetParticles = 4;
                let pPos = particle.getComponent("position");
                pPos.x = 150;
                pPos.y = 400;
                const tileWidth = 64;
                placeField(tileWidth * 5, tileWidth * 5, "wheat", tileWidth, 6);
                placeField(tileWidth * 12, tileWidth * 5, "corn", tileWidth);
                placeField(tileWidth * 5, tileWidth * 12, "turnip", tileWidth);
                placeField(tileWidth * 12, tileWidth * 12, "onion", tileWidth);
                function placeField(x, y, cropName, d = 64, width = 5) {
                    var crop;
                    var cc;
                    for (var i = 0; i < width; i++) {
                        for (var i2 = 0; i2 < width; i2++) {
                            crop = addCrop(x + i * d, y + i2 * d);
                            cc = crop.getComponent("crop");
                            cc.setCrop(cropName);
                        }
                    }
                }
                function addCrop(x, y) {
                    var crop = game.addEntity("crop");
                    var component = crop.getComponent("position");
                    component.x = x;
                    component.y = y;
                    return crop;
                }
                function makePlayer() {
                    var player = game.addEntity("player");
                    var pc = player.getComponent("position");
                    var ac = player.getComponent("animation");
                    pc.x = 0;
                    pc.y = 0;
                    return player;
                }
                game.start();
                window.game = game;
                return game;
            });
        });
    }
    if (typeof window !== 'undefined') {
        (0, logger_1.overrideLogger)();
        const game = startGame().catch((e) => {
            console.error(e.stack);
        });
    }
});
//# sourceMappingURL=game.js.map