define(["require", "exports", "../engine/system/system", "../engine/events/EventType"], function (require, exports, system_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PositionSystem = void 0;
    class PositionSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        static create(game) {
            return new PositionSystem(game);
        }
        apply(args) {
        }
        applyEvents(entity) {
            var position = entity.getComponent("position");
            if (position === null)
                return;
            var events = entity.targetedEvents;
            var event;
            for (var i = 0; i < events.length; i++) {
                event = events[i];
                switch (event.eventName) {
                    case EventType_1.EventType.changeVelocity:
                        if ("vx" in event.eventData) {
                            position.vx = event.eventData.vx;
                        }
                        if ("vy" in event.eventData) {
                            position.vy = event.eventData.vy;
                        }
                        break;
                }
            }
        }
    }
    exports.PositionSystem = PositionSystem;
});
//# sourceMappingURL=position-system.js.map