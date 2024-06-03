define(["require", "exports", "./sprite-animation", "./implementations/html/html-rect-sprite", "./implementations/html/html-sprite"], function (require, exports, sprite_animation_1, html_rect_sprite_1, html_sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteManager = void 0;
    class SpriteManager {
        constructor(spriteDir = "../sprites/") {
            this.sprites = {};
            this.animations = {};
            this.RGBs = {};
        }
        onLoad(callback) {
        }
        createSprite(fileName, widthImgs, heightImgs, offsetx, offsety) {
            return html_rect_sprite_1.HtmlRectSprite.create(fileName, widthImgs, heightImgs, offsetx, offsety);
        }
        addSprite(spriteName, sprite) {
            this.sprites[spriteName] = sprite;
        }
        getSprite(spriteName) {
            if (!(spriteName in this.sprites)) {
                throw "sprite " + spriteName + " does not exist";
            }
            return this.sprites[spriteName];
        }
        loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
            var sprite = this.createSprite(fileName, widthImgs, heightImgs, offsetx, offsety);
            this.addSprite(spriteName, sprite);
        }
        loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
            const sprite = html_rect_sprite_1.HtmlRectSprite.createWithDimensions(fileName, frameWidth, frameHeight, offsetx, offsety);
            this.addSprite(spriteName, sprite);
        }
        loadSpriteOverlapping(spriteName, fileName) {
            let sprite = html_sprite_1.HtmlSprite.create(fileName);
        }
        addAnimation(spriteName, animationName, spriteNumbers, delay = 1) {
            var sa = sprite_animation_1.SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
            if (!(spriteName in this.sprites)) {
                throw "error adding animation "
                    + animationName
                    + ". spriteName "
                    + spriteName
                    + "doesn't exist. sprites must be added through addSprite method first";
            }
            this.animations[animationName] = sa;
        }
        getAnimation(animationName) {
            if (animationName in this.animations) {
                return this.animations[animationName];
            }
            else {
                return null;
            }
        }
        getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
            let key = animationName + spriteNumber;
            if (key in this.RGBs)
                return this.RGBs[key];
            let animation = this.animations[animationName];
            let name = animation.spriteName;
            let sprite = this.sprites[name];
            if (!sprite.loaded) {
                return sprite.getRGBs(width, height, spriteNumber);
            }
            this.RGBs[key] = sprite.getRGBs(width, height, spriteNumber);
            return this.RGBs[key];
        }
        static create() {
            return new SpriteManager();
        }
        static singeltonCreate() {
            if (SpriteManager.spriteManager != null)
                return SpriteManager.spriteManager;
            SpriteManager.spriteManager = new SpriteManager();
            return SpriteManager.spriteManager;
        }
    }
    exports.SpriteManager = SpriteManager;
    SpriteManager.spriteManager = null;
});
//# sourceMappingURL=sprite-manager.js.map