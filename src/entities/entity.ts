import { ComponentFactory } from '../components/component-factory';
import { Component } from '../components/component';
import { GameEvent } from '../events/event-manager';

export abstract class Entity {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
    }
    components:Component[] = [];
    componentFactory:ComponentFactory;

    addComponent(componentName:string):Component{
        var component:Component = this.componentFactory.createComponent(componentName);
        this.components.push(component);
        return component;
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

    abstract handleEvents(events:{[key:string]:GameEvent}):void;
    

    static create():Entity{
        //var cf:ComponentFactory = ComponentFactory.create();
        //var entity:Entity = new this(cf);
        //return entity;
        return null;
    }
}




/*
export class PlayerEntity extends Entity{
    constructor(componentFactory:ComponentFactory){
        super(componentFactory);
        this.addComponent("animation");
        this.addComponent("position");
    }
    static create():PlayerEntity{
        var entity = new PlayerEntity(ComponentFactory.create());
        return entity;
    }
}*/