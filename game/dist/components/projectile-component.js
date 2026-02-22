define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectileComponent = void 0;
    class ProjectileComponent extends component_1.Component {
        constructor() {
            super("projectile");
            this.lifeSpan = 90;
        }
        update() {
        }
        static create() {
            return new ProjectileComponent();
        }
    }
    exports.ProjectileComponent = ProjectileComponent;
});
//# sourceMappingURL=projectile-component.js.map