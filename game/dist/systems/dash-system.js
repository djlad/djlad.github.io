define(["require", "exports", "../engine/system/system"], function (require, exports, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DashSystem = void 0;
    class DashSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        applyEvents(entity, eventManager) {
        }
        shouldApply(entity) {
            return entity.getComponent("dash", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            const dash = entity.getComponent("dash");
            const dashing = dash.dashing;
            const dashingTime = dash.dashTime;
            const position = entity.getComponent("position");
            const animation = entity.getComponent("animation");
            if (!dashing)
                return;
            if (dashingTime <= 0) {
                dash.dashing = false;
                position.vx = 0;
                position.vy = 0;
                position.h = 0;
                return;
            }
            dash.dashTime -= 1;
            position.vx = Math.sign(position.faceX) * dash.dashSpeed;
            position.vy = Math.sign(position.faceY) * dash.dashSpeed;
        }
        static create(game) {
            var dash = new DashSystem(game);
            return dash;
        }
    }
    exports.DashSystem = DashSystem;
});
//# sourceMappingURL=dash-system.js.map