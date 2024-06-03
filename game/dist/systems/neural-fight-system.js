define(["require", "exports", "../engine/system/system"], function (require, exports, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NeuralFightSystem = void 0;
    class NeuralFightSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        static create(game) {
            return new NeuralFightSystem(game);
        }
        shouldApply(entity) {
            return entity.getComponent("neural", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            var neural = entity.getComponent("neural", true);
            if (neural == null) {
                return;
            }
        }
        applyEvents(entity) {
            var events = entity.targetedEvents;
            var event;
            for (var i = 0; i < events.length; i++) {
                event = events[i];
            }
        }
    }
    exports.NeuralFightSystem = NeuralFightSystem;
});
//# sourceMappingURL=neural-fight-system.js.map