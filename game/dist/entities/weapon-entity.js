define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WeaponEntity = void 0;
    class WeaponEntity {
        create(gameDependencies, entity) {
            const pos = entity.addComponent("position");
            const anim = entity.addComponent("animation");
            anim.setSprite("arrowsword");
            pos.width = 32;
            pos.height = 32;
            pos.width *= 2;
            pos.height *= 2;
            pos.pivotX = 1;
            pos.pivotY = 1;
            pos.anchorX = 1;
            pos.anchorY = 1;
            return entity;
        }
    }
    exports.WeaponEntity = WeaponEntity;
});
//# sourceMappingURL=weapon-entity.js.map