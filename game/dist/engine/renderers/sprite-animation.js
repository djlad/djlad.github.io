define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteAnimation = void 0;
    class SpriteAnimation {
        constructor(animationName, spriteName, spriteNumbers, delay) {
            this.spriteNumbers = spriteNumbers;
            this.animationName = animationName;
            this.spriteName = spriteName;
            this.delay = delay;
        }
        static create(animationName, spriteName, spriteNumbers, delay = 1) {
            var sa = new SpriteAnimation(animationName, spriteName, spriteNumbers, delay);
            return sa;
        }
    }
    exports.SpriteAnimation = SpriteAnimation;
});
//# sourceMappingURL=sprite-animation.js.map