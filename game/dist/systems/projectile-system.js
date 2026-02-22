define(["require", "exports", "../engine/system/system", "../entities/projectile-entity", "../engine/events/game-event", "../engine/events/EventType", "../entities/particles/particles-entity"], function (require, exports, system_1, projectile_entity_1, game_event_1, EventType_1, particles_entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectileSystem = void 0;
    class ProjectileSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        shouldApply(entity) {
            return entity.getComponent("projectile", true) != null && entity.getComponent("position", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            var position = entity.getComponent("position", true);
            var projectileComponent = entity.getComponent("projectile", true);
            projectileComponent.lifeSpan--;
            if (projectileComponent.lifeSpan == 0) {
                this.game.destroy(entity);
            }
        }
        fireProjectile(entity, vx = null, vy = null) {
            let projectile = this.game.addEntity("projectile");
            let projectileComponent = projectile.getComponent("projectile");
            let projPosition = projectile.getComponent("position");
            var position = entity.getComponent("position");
            projectileComponent.shooterId = entity.id;
            projPosition.x = position.x;
            projPosition.y = position.y;
            if (vx !== null && vy !== null) {
                projPosition.vx = vx;
                projPosition.vy = vy;
            }
            else {
                projPosition.vx = position.faceX;
                projPosition.vy = position.faceY;
            }
            projPosition.faceRight = position.faceRight;
        }
        applyEvents(entity) {
            var events = entity.targetedEvents;
            var event;
            for (var i = 0; i < events.length; i++) {
                event = events[i];
                switch (event.eventName) {
                    case EventType_1.EventType.fireProjectile:
                        if (event.eventData !== null) {
                            this.fireProjectile(entity, event.eventData.vx, event.eventData.vy);
                        }
                        else {
                            this.fireProjectile(entity);
                        }
                        break;
                    case EventType_1.EventType.collision:
                        var isProj = entity instanceof projectile_entity_1.ProjectileEntity;
                        if (!isProj)
                            break;
                        var projectile = entity.getComponent("projectile");
                        var isShooter = projectile.shooterId === event.eventData.id;
                        var isSelf = entity.id === event.eventData.id;
                        var isProjectile = event.eventData instanceof projectile_entity_1.ProjectileEntity;
                        var collidedId = event.eventData.id;
                        var collided = this.game.getById(collidedId);
                        var hitParticle = event.eventData instanceof particles_entity_1.ParticlesEntity;
                        if (!isShooter && !isSelf && !isProjectile && !hitParticle) {
                            var ge = game_event_1.GameEvent.create(EventType_1.EventType.inflictDamage);
                            collided.emit(ge, true);
                            this.game.destroy(entity);
                        }
                        break;
                }
            }
        }
        static create(game) {
            return new ProjectileSystem(game);
        }
    }
    exports.ProjectileSystem = ProjectileSystem;
});
//# sourceMappingURL=projectile-system.js.map