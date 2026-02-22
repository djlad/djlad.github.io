define(["require", "exports", "../engine/system/system"], function (require, exports, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticleSystem = void 0;
    class ParticleSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        static create(game) {
            return new ParticleSystem(game);
        }
        addParticles(center, centerPosition) {
            if (center.particles.length >= center.targetParticles)
                return;
            while (center.particles.length < center.targetParticles) {
                center.particles.push(this.game.addEntity("particle"));
                let position = center.particles[center.particles.length - 1].getComponent("position");
                position.x = centerPosition.x - Math.random() * 30;
                position.y = centerPosition.y - Math.random() * 30;
            }
        }
        updateParticles(entity) {
            let particles = entity.getComponent("particles", true);
            let position = entity.getComponent("position", true);
            particles.time = (particles.time + 1) % 1000;
            for (let i = 0; i < particles.particles.length; i++) {
                let particle = particles.particles[i];
                let method = particles.paths[i];
                let particlePosition = particle.getComponent("primitive");
            }
        }
        shouldApply(entity) {
            return entity.getComponent("particles", true) != null && entity.getComponent("position", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            let particles = entity.getComponent("particles", true);
            let position = entity.getComponent("position", true);
            if (position == null || particles == null)
                return;
            this.addParticles(particles, position);
            this.updateParticles(entity);
        }
        applyEvents(entity, eventManager) {
        }
    }
    exports.ParticleSystem = ParticleSystem;
});
//# sourceMappingURL=particle-system.js.map