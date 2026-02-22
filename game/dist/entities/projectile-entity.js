define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectileEntity = void 0;
    class ProjectileEntity {
        create(gameDependencies, entity) {
            var animation = entity.addComponent("animation");
            var position = entity.addComponent("position");
            entity.addComponent("projectile");
            animation.setSprite("fireball");
            return entity;
        }
    }
    exports.ProjectileEntity = ProjectileEntity;
});
//# sourceMappingURL=projectile-entity.js.map