define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickableComponent = void 0;
    class ClickableComponent extends component_1.Component {
        constructor() {
            super("click");
            this.callback = [];
        }
        update(entity) { }
        addListener(callback) {
            this.callback.push(callback);
        }
        click() {
            this.callback.forEach((callback) => {
                callback();
            });
        }
        static create() {
            return new ClickableComponent();
        }
        ;
    }
    exports.ClickableComponent = ClickableComponent;
});
//# sourceMappingURL=clickable-component.js.map