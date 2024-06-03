define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FightComponent = void 0;
    class FightComponent extends component_1.Component {
        constructor() {
            super("fight");
            this.attack = false;
            this.maxSpeed = 5;
            this.range = 300;
            this.reloadTime = 30;
            this.reloadTimer = 30;
        }
        attackTarget() {
        }
        canFire() {
            return this.reloadTime === this.reloadTimer;
        }
        update() {
            if (this.reloadTimer <= this.reloadTime) {
                this.reloadTimer--;
            }
            if (this.reloadTimer <= 0) {
                this.reloadTimer = this.reloadTime;
            }
        }
        static create() {
            return new FightComponent();
        }
    }
    exports.FightComponent = FightComponent;
});
//# sourceMappingURL=fight-component.js.map