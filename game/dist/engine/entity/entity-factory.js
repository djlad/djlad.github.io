define(["require", "exports", "./entity"], function (require, exports, entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EntityFactory = void 0;
    class EntityFactory {
        constructor(gameDependencies) {
            this.entityTypes = {};
            gameDependencies.checkDependency(gameDependencies.componentFactory);
            this.componentFactory = gameDependencies.componentFactory;
            this.dependencies = gameDependencies;
        }
        registerEntity(componentName, EntityClass) {
            this.entityTypes[componentName] = EntityClass;
        }
        registerComponent(componentClass) {
            this.componentFactory.registerComponent(componentClass);
        }
        create(entityName) {
            let entityClass = this.entityTypes[entityName];
            const entity = entity_1.Entity.create(this.dependencies);
            return this.entityTypes[entityName].create(this.dependencies, entity);
        }
        static create(gameDependencies) {
            let ef = new EntityFactory(gameDependencies);
            return ef;
        }
    }
    exports.EntityFactory = EntityFactory;
});
//# sourceMappingURL=entity-factory.js.map