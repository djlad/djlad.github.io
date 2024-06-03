define(["require", "exports", "../engine/system/system", "../entities/first-entity", "../entities/projectile-entity", "../engine/events/game-event", "../engine/events/EventType"], function (require, exports, system_1, first_entity_1, projectile_entity_1, game_event_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollisionSystem = void 0;
    class CollisionSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
            this.movingEntities = {};
            this.colliding = {};
            this.numCollisions = 0;
        }
        distance(e1, e2) {
            var p1 = e1.getComponent("position");
            var p2 = e2.getComponent("position");
            var dx = p2.x - p1.x;
            var dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        checkCol(e1, e2) {
            var distance = this.distance(e1, e2);
            var p1 = e1.getComponent("position");
            var mask = ((p1.width) + (p1.height)) / 4;
            var collision = distance < mask;
            return collision;
        }
        hashCollision(e1, e2) {
            if (e1.id > e2.id) {
                [e1, e2] = [e2, e1];
            }
            return e1.id.toString() + ":" + e2.id.toString();
        }
        addCollision(e1, e2) {
            var hash;
            hash = this.hashCollision(e1, e2);
            if (!(hash in this.colliding)) {
                this.colliding[hash] = [e1, e2];
                this.numCollisions++;
            }
        }
        removeCollision(e1, e2) {
            var hash = this.hashCollision(e1, e2);
            if (hash in this.colliding) {
                delete this.colliding[hash];
                this.numCollisions--;
            }
        }
        emitCollision(e1, e2) {
            e1.emit(game_event_1.GameEvent.create(EventType_1.EventType.collision, e2));
            e2.emit(game_event_1.GameEvent.create(EventType_1.EventType.collision, e1));
        }
        removeMovingEntity(id) {
            delete this.movingEntities[id];
        }
        apply(args) {
            const entity = args.entity;
            if (entity instanceof first_entity_1.FirstEntity) {
                var collidingEntities;
                for (var key in this.colliding) {
                    collidingEntities = this.colliding[key];
                    collision = this.checkCol(collidingEntities[0], collidingEntities[1]);
                    if (collision && !collidingEntities[0].destroyed && !collidingEntities[1].destroyed) {
                        this.emitCollision(collidingEntities[0], collidingEntities[1]);
                    }
                    else {
                        this.removeCollision(collidingEntities[0], collidingEntities[1]);
                    }
                }
                for (let id in this.movingEntities) {
                    if (this.movingEntities[id].destroyed) {
                        this.removeMovingEntity(parseInt(id));
                    }
                }
            }
            var position = entity.getComponent("position");
            var collision;
            var entityTarget;
            for (let id in this.movingEntities) {
                entityTarget = this.movingEntities[id];
                collision = this.checkCol(entity, entityTarget);
                if (collision) {
                    this.addCollision(entity, entityTarget);
                }
            }
            if (position.moved) {
                this.movingEntities[entity.id] = entity;
            }
            else {
                this.removeMovingEntity(entity.id);
            }
            if (entity instanceof projectile_entity_1.ProjectileEntity) {
                let position = entity.getComponent("position");
            }
        }
        ;
        applyEvents(entity) {
        }
        static create(game) {
            return new CollisionSystem(game);
        }
    }
    exports.CollisionSystem = CollisionSystem;
});
//# sourceMappingURL=collision-system.js.map