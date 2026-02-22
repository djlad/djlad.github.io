define(["require", "exports", "./component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ComponentFactory = void 0;
    class ComponentFactory {
        constructor(gameDependencies) {
            this.componentTypes = {};
            this.gameDependencies = gameDependencies;
        }
        registerComponent(ComponentClass) {
            if (!(ComponentClass.prototype instanceof component_1.Component)) {
                console.log("component " + obj.componentName + " must extend class Component to be registered");
            }
            if (ComponentClass.componentName != null) {
                this.componentTypes[ComponentClass.componentName] = ComponentClass;
                return;
            }
            var obj = ComponentClass.create(this.gameDependencies, null);
            this.componentTypes[obj.componentName] = ComponentClass;
        }
        createComponent(componentName, entityId) {
            if (!(componentName in this.componentTypes)) {
                throw "component " + componentName + " not registered in componentFactory";
            }
            return this.componentTypes[componentName].create(this.gameDependencies, entityId);
        }
        static create(gameDependencies) {
            this.dependencies = gameDependencies;
            var cf = new ComponentFactory(gameDependencies);
            return cf;
        }
    }
    exports.ComponentFactory = ComponentFactory;
});
//# sourceMappingURL=component-factory.js.map