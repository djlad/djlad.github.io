define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickableEntity = void 0;
    class ClickableEntity {
        create(gameDependencies, entity) {
            var position = entity.addComponent("position");
            let animation = entity.addComponent("animation");
            entity.addComponent("click");
            return entity;
        }
        handleEvents(events) {
        }
    }
    exports.ClickableEntity = ClickableEntity;
});
//# sourceMappingURL=clickable-entity.js.map