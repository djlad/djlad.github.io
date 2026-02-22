define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UIPanelEntity = void 0;
    class UIPanelEntity {
        create(gameDependcies, entity) {
            let animation = entity.addComponent("animation");
            var position = entity.addComponent("position");
            position.applyOffsets = false;
            animation.setSprite("woodpanelsunken");
            return entity;
        }
    }
    exports.UIPanelEntity = UIPanelEntity;
});
//# sourceMappingURL=ui-panel-entity.js.map