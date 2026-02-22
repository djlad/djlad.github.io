define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticleComponent = void 0;
    class ParticleComponent extends component_1.Component {
        constructor() {
            super("particles");
            this.particles = [];
            this.targetParticles = 10;
            this.time = 0;
            this.maxSpeed = 50;
            this.paths = [
                (center, position, time) => {
                    let f = () => 40 * Math.sin(.2 * time / 2);
                    let f2 = () => 40 * Math.cos(.2 * time / 2);
                    position.h = -2 + center.h - 2 * center.width / 3 + f();
                    position.x = center.x - f2();
                    position.y = center.y + 1;
                }
            ];
        }
        addParticle(particle) {
            this.particles.push(particle);
        }
        update(entity) {
            for (let i = 0; i < this.particles.length; i++) {
                let particle = this.particles[i];
                let path = this.paths[i % this.paths.length];
                let center = entity.getComponent("position");
                let particlePosition = particle.getComponent("position");
                path(center, particlePosition, -(this.time + i * 10));
            }
        }
        static create() {
            return new ParticleComponent();
        }
    }
    exports.ParticleComponent = ParticleComponent;
});
//# sourceMappingURL=particle-componet.js.map