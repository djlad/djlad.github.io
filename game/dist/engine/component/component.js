define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(componentName) {
            this.componentName = componentName;
        }
        static create(game, entityId) {
            throw "Component must implement static create function";
        }
        ;
        static createWithGame(game, entityId) {
        }
    }
    exports.Component = Component;
});
//# sourceMappingURL=component.js.map