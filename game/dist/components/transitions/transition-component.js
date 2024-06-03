define(["require", "exports", "../../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransitionComponent = void 0;
    class TransitionComponent extends component_1.Component {
        constructor() {
            super("transition");
            this.time = 0;
            this.reference = null;
            this.current = null;
            this.targetAnimationName = "fireball";
            this.targetSpriteNumber = 0;
            this.running = false;
            this.speed = 15;
        }
        update(entity) {
            if (!this.running)
                return;
            let animation = entity.getComponent("animation", true);
            if (animation == null)
                return;
            this.reference = animation.getRGBs();
            this.target = animation.getRGBs(this.targetAnimationName, this.targetSpriteNumber, this.reference.width, this.reference.height);
            if (this.targetAnimationName == null) {
                let newTarget = new ImageData(this.reference.width, this.reference.height);
                for (let i = 0; i < this.target.data.length; i++) {
                    newTarget.data[i] = 0;
                }
                this.target = newTarget;
            }
            if (this.current == null) {
                if (this.reference.data.length == 4 || this.target.data.length == 4)
                    return;
                this.current = new ImageData(this.reference.width, this.reference.height);
                for (let i = 0; i < this.reference.data.length; i++) {
                    this.current.data[i] = this.reference.data[i];
                }
            }
            let noChanges = true;
            for (let i = 0; i < this.reference.data.length; i++) {
                let target = this.target.data[i];
                if (this.current.data[i] < target) {
                    this.current.data[i] += this.speed;
                }
                else if (this.current.data[i] > target) {
                    this.current.data[i] -= this.speed;
                }
                let distance = Math.abs(this.current.data[i] - target);
                if (distance < this.speed) {
                    this.current.data[i] = target;
                }
                else {
                    noChanges = false;
                }
            }
            animation.setFilter(this.current);
            if (noChanges) {
                animation.isFiltered = false;
                this.running = false;
            }
        }
        start(targetAnimationName = "fireball", targetSpriteNumber, resetCurrent = true) {
            this.running = true;
            this.time = 300;
            this.targetAnimationName = targetAnimationName;
            if (resetCurrent)
                this.current = null;
            this.targetSpriteNumber = targetSpriteNumber;
        }
        static create() {
            return new TransitionComponent();
        }
    }
    exports.TransitionComponent = TransitionComponent;
});
//# sourceMappingURL=transition-component.js.map