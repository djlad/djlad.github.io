import { ComponentFactory } from '../component/component-factory';
import { Component } from '../component/component';
import { GameEvent } from '../events/game-event';
import { EntityUpdateArgs } from './entity-update-args';

export abstract class Entity {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
        Entity.id++
        this.id = Entity.id;
    }
    static id:number=-1;
    id:number=-1;
    components:Component[] = [];
    componentNameToComponent:{[key:string]:Component} = {};
    componentFactory:ComponentFactory;
    targetedEvents:GameEvent[] = [];
    delayedEvents:GameEvent[] = [];
    destroyed:boolean = false;

    addComponent(componentName:string):Component{
        var component:Component = this.componentFactory.createComponent(componentName);
        this.componentNameToComponent[component.componentName] = component;
        this.components.push(component);
        return component;
    }

    getComponent(componentName:string, allowUndefined:boolean=false):Component{
        return this.componentNameToComponent[componentName];
    }

    emit(event:GameEvent, delayed=false){
        if(delayed){
            this.delayedEvents.push(event);
        } else {
            this.targetedEvents.push(event);
        }
    }

    update(args:EntityUpdateArgs){
        for(var i:number=0;i<this.components.length;i++){
            this.components[i].update(this, args);
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