import { ComponentFactory } from '../component/component-factory';
import { Component } from '../component/component';
import { GameEvent } from '../events/game-event';
import { EntityUpdateArgs } from './entity-update-args';
import { GameDependencies } from '../dependencies/game-dependencies';
import { EntitySystem } from '../system/system';
import { Game } from '../game';
import { SystemArgs } from '../system/system-args';

/**
 * {@link Entity#applicableSystems} is added by {@link Game#addEntity}
 */
export class Entity {
    constructor(componentFactory:ComponentFactory){
        this.componentFactory = componentFactory;
        Entity.id++
        this.id = Entity.id;
    }
    static id:number=-1;
    id:number=-1;
    private components:Component[] = [];
    private componentNameToComponent:{[key:string]:Component} = {};
    private componentFactory:ComponentFactory;
    private applicableSystems:EntitySystem[] = [];//see above doc
    targetedEvents:GameEvent[] = [];
    delayedEvents:GameEvent[] = [];
    destroyed:boolean = false;
    addApplicableSystem(system:EntitySystem){
        this.applicableSystems.push(system);
    }
    applySystems(args: SystemArgs){
        for(var i:number=0;i<this.applicableSystems.length;i++){
            this.applicableSystems[i].apply(args);
        }
    }
    addComponent(componentName:string):Component{
        var component:Component = this.componentFactory.createComponent(componentName, this.id);
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

    handleEvents(events:{[key:string]:GameEvent}):void {};
    public static create(gameDependcies:GameDependencies){
        gameDependcies.checkDependency(gameDependcies.componentFactory);
        const cf = gameDependcies.componentFactory;
        return new Entity(cf);
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