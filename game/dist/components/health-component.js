define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HealthComponent = void 0;
    class HealthComponent extends component_1.Component {
        constructor() {
            super("health");
            this.health = 100;
        }
        update() { }
        static create() {
            return new HealthComponent();
        }
    }
    exports.HealthComponent = HealthComponent;
});
//# sourceMappingURL=health-component.js.map