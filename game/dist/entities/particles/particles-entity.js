define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesEntity = void 0;
    class ParticlesEntity {
        create(gameDependencies, entity) {
            let position = entity.addComponent("position");
            position.width = 10;
            entity.addComponent("particles");
            return entity;
        }
    }
    exports.ParticlesEntity = ParticlesEntity;
});
//# sourceMappingURL=particles-entity.js.map