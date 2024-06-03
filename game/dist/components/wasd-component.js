define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WasdComponent = void 0;
    class WasdComponent extends component_1.Component {
        constructor() {
            super("wasd");
            this.speed = 5;
            this.sprite = "grey";
            this.walkSprite = "greyWalk";
        }
        update() {
        }
        static create() {
            return new WasdComponent();
        }
    }
    exports.WasdComponent = WasdComponent;
});
//# sourceMappingURL=wasd-component.js.map