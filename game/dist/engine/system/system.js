define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EntitySystem = void 0;
    class EntitySystem {
        constructor(game) {
            this.oncePerLoop = null;
            this.game = game;
        }
        apply(args) {
            throw "an entity system did not implement apply method.";
        }
        ;
        applyEvents(entity, eventManager) {
            throw "an entity did not implement apply Events";
        }
        shouldApply(entity) {
            return true;
        }
    }
    exports.EntitySystem = EntitySystem;
});
//# sourceMappingURL=system.js.map