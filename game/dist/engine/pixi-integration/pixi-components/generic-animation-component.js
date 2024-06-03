define(["require", "exports", "../../component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericAnimationComponent = void 0;
    class GenericAnimationComponent extends component_1.Component {
        constructor(game, entityId) {
            super("animation");
            game.checkDependency(game.engineCreator);
            this.engineSprite = game.engineCreator.createEngineSprite(entityId.toString());
        }
        update(entity, args) {
        }
        getSpriteNumber() {
        }
        getRGBs(animationName, spriteNumber, width, height) {
            return GenericAnimationComponent.fakeImageData;
        }
        setFilter(pixelData) {
        }
        setSprite(animationName) {
            if (animationName == this.spriteName)
                return;
            this.spriteName = animationName;
            this.engineSprite.setSprite(animationName);
        }
        setSpriteNumber(spriteName, spriteNumber) {
        }
        static create(game, entityId) {
            return new GenericAnimationComponent(game, entityId);
        }
    }
    exports.GenericAnimationComponent = GenericAnimationComponent;
    GenericAnimationComponent.fakeImageData = new ImageData(1, 1);
    GenericAnimationComponent.componentName = "animation";
});
//# sourceMappingURL=generic-animation-component.js.map