define(["require", "exports", "../engine/component/component", "../engine/renderers/sprite-manager"], function (require, exports, component_1, sprite_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationComponent2 = void 0;
    class AnimationComponent2 extends component_1.Component {
        constructor(animationName, delay, spriteManager) {
            super("animation");
            this.frameNum = 0;
            this.spriteNum = 0;
            this.isFiltered = false;
            this.delay = delay;
            this.currentDelay = delay;
            this.spriteManager = spriteManager;
            this.setSprite(animationName);
            this.animationName = animationName;
        }
        getSpriteNumber() {
            var frameNum = this.frameNum;
            var spriteNum = this.spriteNumbers[frameNum];
            return spriteNum;
        }
        getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
            if (animationName != null)
                return this.spriteManager.getRGBs(animationName, spriteNumber, width, height);
            return this.spriteManager.getRGBs(this.animationName, this.getSpriteNumber(), width, height);
        }
        setFilter(pixelData) {
            this.filter = pixelData;
            this.isFiltered = true;
        }
        setSprite(animationName) {
            if (animationName == this.animationName) {
                return;
            }
            this.animationName = animationName;
            var animation = this.spriteManager.getAnimation(animationName);
            if (animation == null) {
                console.log(`no animation found: ${animationName}`);
                return;
            }
            this.spriteNumbers = animation.spriteNumbers;
            this.spriteName = animation.spriteName;
            this.delay = animation.delay;
            this.frameNum = 0;
        }
        setSpriteNumber(spriteName, spriteNumber) {
            this.spriteNumbers = [spriteNumber];
            this.spriteName = spriteName;
            this.delay = 100;
            this.frameNum = 0;
        }
        update(entity, args) {
            const framesPassed = args.fullFramePassed;
            if (framesPassed == 0)
                return;
            if (this.currentDelay == 0) {
                this.frameNum += framesPassed;
                this.frameNum %= this.spriteNumbers.length;
                this.spriteNum = this.getSpriteNumber();
                this.currentDelay = this.delay;
            }
            else {
                this.currentDelay--;
            }
        }
        static create() {
            var spriteManager = sprite_manager_1.SpriteManager.singeltonCreate();
            var ac = new AnimationComponent2("blond", 2, spriteManager);
            return ac;
        }
    }
    exports.AnimationComponent2 = AnimationComponent2;
});
//# sourceMappingURL=animation-component.js.map