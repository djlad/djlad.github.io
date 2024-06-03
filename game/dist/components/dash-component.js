define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DashComponent = void 0;
    class DashComponent extends component_1.Component {
        constructor(gameDependencies) {
            super("dash");
            this.maxDashingTime = 20;
            this.dashTime = 0;
            this.dashing = false;
            this.dashSpeed = 20;
        }
        startDashing() {
            this.dashing = true;
            this.dashTime = this.maxDashingTime;
        }
        update(entity, args) {
        }
        static create(gameDependencies) {
            return new DashComponent(gameDependencies);
        }
    }
    exports.DashComponent = DashComponent;
});
//# sourceMappingURL=dash-component.js.map