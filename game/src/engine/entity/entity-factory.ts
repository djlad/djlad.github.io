import { Entity } from './entity';
import { ComponentFactory } from '../component/component-factory';
import { Component } from '../component/component';
import { GameDependencies } from '../dependencies/game-dependencies';

export class EntityFactory {
    constructor(gameDependencies:GameDependencies){
        gameDependencies.checkDependency(gameDependencies.componentFactory);
        this.componentFactory = gameDependencies.componentFactory;
        this.dependencies = gameDependencies;
    }
    dependencies: GameDependencies;
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
        return this.entityTypes[entityName].create(this.dependencies);
    }

    static create(gameDependencies:GameDependencies):EntityFactory{
        let ef:EntityFactory = new EntityFactory(gameDependencies);
        return ef;
    }
}