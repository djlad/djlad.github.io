define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticleEntity = void 0;
    class ParticleEntity {
        create(gameDependencies, entity) {
            let position = entity.addComponent("position");
            entity.addComponent("primitive");
            return entity;
        }
    }
    exports.ParticleEntity = ParticleEntity;
});
//# sourceMappingURL=particle-entity.js.map