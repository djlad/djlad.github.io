define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CropEntity = void 0;
    class CropEntity {
        create(gameDependencies, entity) {
            var position = entity.addComponent("position");
            position.width = 100;
            position.height = 100;
            let animation = entity.addComponent("animation");
            let crop = entity.addComponent("crop");
            if (crop.growthSprites.length > 0) {
                animation.setSprite(crop.growthSprites[0]);
            }
            return entity;
        }
    }
    exports.CropEntity = CropEntity;
});
//# sourceMappingURL=crop-entity.js.map