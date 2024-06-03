define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrimitiveComponent = void 0;
    class PrimitiveComponent extends component_1.Component {
        update(entity) {
        }
        static create() {
            return new PrimitiveComponent("primitive");
        }
    }
    exports.PrimitiveComponent = PrimitiveComponent;
});
//# sourceMappingURL=primitive-component.js.map