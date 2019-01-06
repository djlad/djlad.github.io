import { Component, AnimationComponent } from "component";
import { PositionComponent } from './component';

export class ComponentFactory {
    constructor(){
    }
    componentTypes:{[key:string]:any}={};
    registerComponent(ComponentClass:any){
        var obj = ComponentClass.create()
        if (ComponentClass.prototype instanceof Component){
            this.componentTypes[obj.componentName] = ComponentClass;
        } else {
            console.log("component " + obj.componentName + "must extend class Component to be registered");
        }
    }

    createComponent(componentName:string){
        if (!(componentName in this.componentTypes)){
            throw "component "+componentName+" not registered in componentFactory testing";
        }
        return this.componentTypes[componentName].create();
    }

    static create():ComponentFactory{
        var cf:ComponentFactory = new ComponentFactory();
        cf.registerComponent(AnimationComponent);
        cf.registerComponent(PositionComponent);
        return cf;
    }
}