define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinesEntity = void 0;
    class LinesEntity {
        create(gameDependencies, entity) {
            var position = entity.addComponent("position");
            return entity;
        }
    }
    exports.LinesEntity = LinesEntity;
});
//# sourceMappingURL=lines-entity.js.map