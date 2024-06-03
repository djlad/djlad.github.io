define(["require", "exports", "./EventType"], function (require, exports, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameEvent = void 0;
    class GameEvent {
        constructor(eventName, eventData, componentTarget = null) {
            this.eventName = eventName;
            this.eventData = eventData;
            this.eventDescription = EventType_1.EventType[eventName];
        }
        static create(eventName, eventData = null) {
            var ge = new GameEvent(eventName, eventData);
            return ge;
        }
    }
    exports.GameEvent = GameEvent;
});
//# sourceMappingURL=game-event.js.map