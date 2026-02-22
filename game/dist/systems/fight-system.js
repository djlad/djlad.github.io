define(["require", "exports", "../engine/system/system", "../engine/events/game-event", "../engine/events/EventType"], function (require, exports, system_1, game_event_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FightSystem = void 0;
    class FightSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        get_entity_direction(origin, destination) {
            var position1 = origin.getComponent("position");
            var position2 = destination.getComponent("position");
            var dx = position2.x - position1.x;
            var dy = position2.y - position1.y;
            var hypotenuse = Math.sqrt(dx * dx + dy * dy);
            dx /= hypotenuse;
            dy /= hypotenuse;
            return {
                dx: dx,
                dy: dy
            };
        }
        hypotenuse(e1, e2) {
            var position1 = e1.getComponent("position");
            var position2 = e2.getComponent("position");
            var dx = position2.x - position1.x;
            var dy = position2.y - position1.y;
            var hypotenuse = Math.sqrt(dx * dx + dy * dy);
            return hypotenuse;
        }
        apply(args) {
            const entity = args.entity;
            var fight = entity.getComponent("fight", true);
            if (fight == null)
                return;
            var position = entity.getComponent("position");
            if (!fight.attack)
                return;
            var hypotenuse = this.hypotenuse(entity, fight.target);
            var direction = this.get_entity_direction(entity, fight.target);
            if (hypotenuse > fight.range) {
                direction.dx *= fight.maxSpeed;
                direction.dy *= fight.maxSpeed;
                position.vx = direction.dx;
                position.vy = direction.dy;
            }
            else {
                position.vx = 0;
                position.vy = 0;
                if (fight.canFire()) {
                    entity.emit(game_event_1.GameEvent.create(EventType_1.EventType.fireProjectile, { vx: direction.dx * 10, vy: direction.dy * 10 }));
                    fight.reloadTimer--;
                }
            }
        }
        ;
        applyEvents(entity) {
        }
        static create(game) {
            return new FightSystem(game);
        }
        ;
    }
    exports.FightSystem = FightSystem;
});
//# sourceMappingURL=fight-system.js.map