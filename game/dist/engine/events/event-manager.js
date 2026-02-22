define(["require", "exports", "./game-event", "./EventType", "./key-events"], function (require, exports, game_event_1, EventType_1, key_events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventManager = void 0;
    class EventManager {
        constructor() {
            this.keys = Array(1000);
            this.keysReleased = Array(1000);
            this.events = [];
            this.callbacks = {};
            this.touch = {};
            this.keys = this.createKeyListener();
        }
        createKeyListener() {
            var keys = Array(1000);
            window.addEventListener("keydown", function (e) {
                keys[e.keyCode] = true;
            });
            window.addEventListener("keyup", function (e) {
                keys[e.keyCode] = false;
            });
            let canvas = document.getElementById("canvas");
            window.addEventListener("mouseup", (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                console.log("x: " + x + " y: " + y);
                this.emit(EventType_1.EventType.mouseUp, { x, y });
            });
            window.addEventListener("touchstart", (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                this.emit(EventType_1.EventType.touchStart, {
                    x: x,
                    y: y
                });
            });
            window.addEventListener("touchend", (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.changedTouches[0].clientX - rect.left;
                const y = e.changedTouches[0].clientY - rect.top;
                this.emit(EventType_1.EventType.touchEnd, {
                    x: x,
                    y: y
                });
            });
            window.addEventListener("touchmove", (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                this.emit(EventType_1.EventType.touchMove, {
                    x: x,
                    y: y
                });
            });
            return keys;
        }
        update() {
            for (var i = 0; i < key_events_1.keyEvents.length; i++) {
                let keyEvent = key_events_1.keyEvents[i];
                if (this.keys[keyEvent.keyCode]) {
                    this.emit(keyEvent.downKey);
                    this.keysReleased[keyEvent.keyCode] = true;
                }
                else {
                    if (this.keysReleased[keyEvent.keyCode]) {
                        this.emit(keyEvent.upKey);
                        this.keysReleased[keyEvent.keyCode] = false;
                    }
                }
            }
        }
        emit(eventName, eventData = {}) {
            var ge = new game_event_1.GameEvent(eventName, eventData);
            this.events.push(ge);
        }
        fireCallbacks() {
            var events;
            var callbacks;
            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i];
                if (!(event.eventName in this.callbacks))
                    continue;
                callbacks = this.callbacks[event.eventName];
                callbacks.forEach((callback) => {
                    callback(event);
                });
            }
            this.events = [];
        }
        addListener(eventName, callback) {
            if (!(eventName in this.callbacks)) {
                this.callbacks[eventName] = [];
            }
            this.callbacks[eventName].push(callback);
        }
        createEvent(eventName) {
            if (eventName in this.events)
                return;
            this.events = [];
            this.callbacks[eventName] = [];
        }
        static create() {
            var em = new EventManager();
            em.createEvent(EventType_1.EventType.wDown);
            em.createEvent(EventType_1.EventType.aDown);
            em.createEvent(EventType_1.EventType.sDown);
            em.createEvent(EventType_1.EventType.dDown);
            return em;
        }
    }
    exports.EventManager = EventManager;
});
//# sourceMappingURL=event-manager.js.map