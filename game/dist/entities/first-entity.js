define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirstEntity = void 0;
    class FirstEntity {
        create(gameDependencies, entity) {
            var position = entity.addComponent("position");
            position.y = -9999999;
            var tiles = entity.addComponent("tile");
            return entity;
        }
    }
    exports.FirstEntity = FirstEntity;
});
//# sourceMappingURL=first-entity.js.map