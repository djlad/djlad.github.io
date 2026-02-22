define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = void 0;
    class Entity {
        constructor(componentFactory) {
            this.id = -1;
            this.components = [];
            this.componentNameToComponent = {};
            this.componentToComponent = new Map();
            this.applicableSystems = [];
            this.targetedEvents = [];
            this.delayedEvents = [];
            this.destroyed = false;
            this.componentFactory = componentFactory;
            Entity.id++;
            this.id = Entity.id;
        }
        addApplicableSystem(system) {
            this.applicableSystems.push(system);
        }
        applySystems(args) {
            for (var i = 0; i < this.applicableSystems.length; i++) {
                this.applicableSystems[i].apply(args);
            }
        }
        addComponent(componentName) {
            var component = this.componentFactory.createComponent(componentName, this.id);
            this.componentNameToComponent[component.componentName] = component;
            this.componentToComponent.set(component.constructor, component);
            this.components.push(component);
            return component;
        }
        getComponent(componentName, allowUndefined = false) {
            return this.componentNameToComponent[componentName];
        }
        getComponentT(componentClass) {
            return this.componentToComponent.get(componentClass);
        }
        emit(event, delayed = false) {
            if (delayed) {
                this.delayedEvents.push(event);
            }
            else {
                this.targetedEvents.push(event);
            }
        }
        update(args) {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].update(this, args);
            }
        }
        handleEvents(events) { }
        ;
        static create(gameDependcies) {
            gameDependcies.checkDependency(gameDependcies.componentFactory);
            const cf = gameDependcies.componentFactory;
            return new Entity(cf);
        }
    }
    exports.Entity = Entity;
    Entity.id = -1;
});
//# sourceMappingURL=entity.js.map