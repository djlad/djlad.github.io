define(["require", "exports", "../engine/system/system", "../engine/events/EventType"], function (require, exports, system_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HealthSystem = void 0;
    class HealthSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        apply(args) {
        }
        shouldApply(entity) {
            return entity.getComponent("health", true) != null;
        }
        applyEvents(entity) {
            var events = entity.targetedEvents;
            var event;
            for (var i = 0; i < events.length; i++) {
                event = events[i];
                switch (event.eventName) {
                    case EventType_1.EventType.inflictDamage:
                        this.handleDamage(entity, event);
                        break;
                }
            }
            entity.targetedEvents = [];
        }
        handleDamage(entity, event) {
            if (event.eventData === null) {
                event.eventData = { damage: 50 };
            }
            var health = entity.getComponent("health", true);
            health.health -= event.eventData.damage;
            if (health.health < 0) {
                this.game.destroy(entity);
            }
        }
        static create(game) {
            return new HealthSystem(game);
        }
    }
    exports.HealthSystem = HealthSystem;
});
//# sourceMappingURL=health-system.js.map