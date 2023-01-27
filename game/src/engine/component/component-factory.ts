import { GameDependencies } from "../dependencies/game-dependencies";
import { Component } from "./component";

export class ComponentFactory {
    static dependencies: GameDependencies;
    constructor(gameDependencies:GameDependencies){
        this.gameDependencies = gameDependencies;
    }
    gameDependencies:GameDependencies;
    componentTypes:{[key:string]:any}={};
    registerComponent(ComponentClass:any){
        if (!(ComponentClass.prototype instanceof Component)){
            console.log("component " + obj.componentName + " must extend class Component to be registered");
        }
        if (ComponentClass.componentName != null){
            this.componentTypes[ComponentClass.componentName] = ComponentClass;
            return;
        }
        var obj = ComponentClass.create(this.gameDependencies);
        this.componentTypes[obj.componentName] = ComponentClass;
    }

    createComponent(componentName:string){
        if (!(componentName in this.componentTypes)){
            throw "component "+componentName+" not registered in componentFactory";
        }
        return this.componentTypes[componentName].create(this.gameDependencies);
    }

    static create(gameDependencies:GameDependencies):ComponentFactory{
        this.dependencies = gameDependencies;
        var cf:ComponentFactory = new ComponentFactory(gameDependencies);
        return cf;
    }
}