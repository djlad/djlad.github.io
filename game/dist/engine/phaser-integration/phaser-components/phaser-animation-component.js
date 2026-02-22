define(["require", "exports", "../../component/component", "../phaser-game", "../phaser-sprite-manager"], function (require, exports, component_1, phaser_game_1, phaser_sprite_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserAnimationComponent = void 0;
    class PhaserAnimationComponent extends component_1.Component {
        constructor(animationName, delay, spriteManager) {
            super("animation");
            this.animationNameUpdated = false;
            this.fakeImageData = new ImageData(1, 1);
            this.phaserGame = phaser_game_1.PhaserGame.createSingleton();
        }
        getSpriteNumber() {
        }
        getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
            return this.fakeImageData;
        }
        setFilter(pixelData) {
        }
        setSprite(animationName) {
            if (animationName == this.animationName)
                return;
            this.animationName = animationName;
            this.animationNameUpdated = true;
        }
        setSpriteNumber(spriteName, spriteNumber) {
        }
        update(entity, args) {
        }
        static create() {
            var spriteManager = phaser_sprite_manager_1.PhaserSpriteManager.singeltonCreate();
            var ac = new PhaserAnimationComponent("blond", 2, spriteManager);
            return ac;
        }
    }
    exports.PhaserAnimationComponent = PhaserAnimationComponent;
});
//# sourceMappingURL=phaser-animation-component.js.map