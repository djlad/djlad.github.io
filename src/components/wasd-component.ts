import { Component } from "../engine/component/component";

export class WasdComponent extends Component {
    constructor(){
        super("wasd");
    }
    speed:number=4;
    sprite:string="grey";
    walkSprite:string="greyWalk";
    update(){}
    static create(){
        return new WasdComponent();
    }
}