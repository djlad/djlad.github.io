import { Entity } from "../entity/entity";

export abstract class Component {
    constructor(componentName:string){
        this.componentName = componentName;
    }
    componentName:string;
    abstract update(entity:Entity):void;
    static create(){
        throw "Component must implement static create function";
    };
}