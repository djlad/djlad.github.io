import { Entity } from './entity';
import { ComponentFactory } from '../component/component-factory';
import { Component } from '../component/component';
import { GameDependencies } from '../dependencies/game-dependencies';
import { EntityRegistration } from './entity-registration';

export class EntityFactory {
    constructor(gameDependencies:GameDependencies){
        gameDependencies.checkDependency(gameDependencies.componentFactory);
        this.componentFactory = gameDependencies.componentFactory;
        this.dependencies = gameDependencies;
    }
    dependencies: GameDependencies;
    entityTypes:{[key:string]:EntityRegistration}={};
    componentFactory:ComponentFactory;

    registerEntity(componentName:string, EntityClass:EntityRegistration){
        this.entityTypes[componentName] = EntityClass;
    }

    registerComponent(componentClass:any){
        this.componentFactory.registerComponent(componentClass);
    }

    create(entityName:string){
        let entityClass = this.entityTypes[entityName];
        const entity = Entity.create(this.dependencies);
        return this.entityTypes[entityName].create(this.dependencies, entity);
    }

    static create(gameDependencies:GameDependencies):EntityFactory{
        let ef:EntityFactory = new EntityFactory(gameDependencies);
        return ef;
    }
}