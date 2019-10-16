export abstract class Component {
    constructor(componentName:string){
        this.componentName = componentName;
    }
    componentName:string;
    abstract update():void;
    static create(){
        throw "Component must implement static create function";
    };
}