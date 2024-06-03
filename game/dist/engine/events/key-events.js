define(["require", "exports", "./EventType"], function (require, exports, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keyEvents = exports.KeyEvents = void 0;
    class KeyEvents {
        constructor(downKey, upKey, keyCode) {
            this.downKey = downKey;
            this.upKey = upKey;
            this.keyCode = keyCode;
        }
        static create(controlEvent, controlReleaseEvent, controlKeyNumber) {
            return new KeyEvents(controlEvent, controlReleaseEvent, controlKeyNumber);
        }
    }
    exports.KeyEvents = KeyEvents;
    function getKeyEvents() {
        let results = [];
        results.push(KeyEvents.create(EventType_1.EventType.wDown, EventType_1.EventType.wUp, 87));
        results.push(KeyEvents.create(EventType_1.EventType.aDown, EventType_1.EventType.aUp, 65));
        results.push(KeyEvents.create(EventType_1.EventType.sDown, EventType_1.EventType.sUp, 83));
        results.push(KeyEvents.create(EventType_1.EventType.dDown, EventType_1.EventType.dUp, 68));
        results.push(KeyEvents.create(EventType_1.EventType.spaceDown, EventType_1.EventType.spaceUp, 32));
        results.push(KeyEvents.create(EventType_1.EventType.pDown, EventType_1.EventType.pUp, 80));
        results.push(KeyEvents.create(EventType_1.EventType.iDown, EventType_1.EventType.iUp, 73));
        results.push(KeyEvents.create(EventType_1.EventType.fDown, EventType_1.EventType.fUp, 70));
        results.push(KeyEvents.create(EventType_1.EventType.jDown, EventType_1.EventType.jUp, 74));
        results.push(KeyEvents.create(EventType_1.EventType.kDown, EventType_1.EventType.kUp, 75));
        results.push(KeyEvents.create(EventType_1.EventType.lDown, EventType_1.EventType.lUp, 76));
        results.push(KeyEvents.create(EventType_1.EventType.semicolonDown, EventType_1.EventType.semicolonDown, 186));
        results.push(KeyEvents.create(EventType_1.EventType.tildDown, EventType_1.EventType.tildUp, 192));
        return results;
    }
    exports.keyEvents = getKeyEvents();
});
//# sourceMappingURL=key-events.js.map