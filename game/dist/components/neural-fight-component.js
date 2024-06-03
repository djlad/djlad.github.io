define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NeuralFightComponent = void 0;
    class NeuralFightComponent extends component_1.Component {
        constructor() {
            super("neural");
        }
        update() { }
        static create() {
            return new NeuralFightComponent();
        }
    }
    exports.NeuralFightComponent = NeuralFightComponent;
});
//# sourceMappingURL=neural-fight-component.js.map