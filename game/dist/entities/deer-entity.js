define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeerEntity = void 0;
    class DeerEntity {
        create(gameDependencies, entity) {
            var animation = entity.addComponent("animation");
            var position = entity.addComponent("position");
            animation.setSprite("deer");
            position.width = 110;
            position.height = 110;
            return entity;
        }
    }
    exports.DeerEntity = DeerEntity;
});
//# sourceMappingURL=deer-entity.js.map