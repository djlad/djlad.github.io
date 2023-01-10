import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";

export class ClickableComponent extends Component{
    constructor(){
        super("click");
    }
    update(entity: Entity): void {}
    private callback:(()=>void)[] = [];
    addListener(callback:()=>void) {
        this.callback.push(callback);
    }
    click(){
        this.callback.forEach((callback)=>{
            callback();
        });
    }
    
    static create():ClickableComponent{
        return new ClickableComponent();
    };
}