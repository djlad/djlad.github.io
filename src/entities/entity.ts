import { ComponentFactory } from '../components/component-factory';
import { Component } from '../components/component';

export class Entity {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
    }
    components:Component[] = [];
    componentFactory:ComponentFactory;

    addComponent(componentName:string){
        var component:Component = this.componentFactory.createComponent(componentName);
        this.components.push(component);
    }

    getComponent(componentName:string, allowUndefined:boolean=false):Component{
        var component:Component = undefined;
        for(var i:number=0;i<this.components.length;i++){
            if (this.components[i].componentName == componentName){
                return this.components[i];
            }
        }
        if(!allowUndefined)throw "entity has no component " + componentName;
        return component;
    }

    update(){
        for(var i:number=0;i<this.components.length;i++){
            this.components[i].update();
        }
    }

    static create():Entity{
        var cf:ComponentFactory = ComponentFactory.create();
        var entity:Entity = new Entity(cf);
        return entity;
    }
}

class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        this.addComponent("animation");
        this.addComponent("position");
    }
    static create():PlayerEntity{
        var entity = new PlayerEntity(ComponentFactory.create());
        return entity;
    }
}

export class EntityFactory {
    constructor(){}
    entityTypes:{[key:string]:any}={};
    registerComponent(componentName:string, EntityClass:any){
        if (EntityClass.prototype instanceof Entity){
            this.entityTypes[componentName] = EntityClass;
        } else {
            console.log("EntityClass must extend class Entity");
        }
    }

    create(entityName:string){
        return this.entityTypes[entityName].create();
    }

    static create():EntityFactory{
        return createEntityFactory();
    }
}

function createEntityFactory():EntityFactory{
    var ef = new EntityFactory();
    ef.registerComponent("player", PlayerEntity);
    return ef;
}
