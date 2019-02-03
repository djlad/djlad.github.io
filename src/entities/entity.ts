import { ComponentFactory } from '../components/component-factory';
import { Component } from '../components/component';
import { GameEvent } from '../events/event-manager';

export abstract class Entity {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
        Entity.id++
        this.id = Entity.id;
    }
    static id:number=-1;
    id:number=-1;
    components:Component[] = [];
    componentFactory:ComponentFactory;
    targetedEvents:GameEvent[] = [];
    delayedEvents:GameEvent[] = [];
    destroyed:boolean = false;

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
        
        if(!allowUndefined){
            console.log(this)
            throw "entity has no component " + componentName;
        }
        return component;
    }

    emit(event:GameEvent, delayed=false){
        if(delayed){
            this.delayedEvents.push(event);
        } else {
            this.targetedEvents.push(event);
        }
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