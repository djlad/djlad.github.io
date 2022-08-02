import { Entity } from './entity';
import { ComponentFactory } from '../component/component-factory';

export class EntityFactory {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
    }
    entityTypes:{[key:string]:any}={};
    componentFactory:ComponentFactory;

    registerEntity(componentName:string, EntityClass:any){
        if (EntityClass.prototype instanceof Entity){
            this.entityTypes[componentName] = EntityClass;
        } else {
            console.log("EntityClass must extend class Entity");
        }
    }

    registerComponent(componentClass:any){
        this.componentFactory.registerComponent(componentClass);
    }

    create(entityName:string){
        let entityClass = this.entityTypes[entityName];
        return this.entityTypes[entityName].create();
    }

    static create():EntityFactory{
        let componentFactory:ComponentFactory = ComponentFactory.create();
        let ef:EntityFactory = new EntityFactory(componentFactory);
        return ef;
    }
}