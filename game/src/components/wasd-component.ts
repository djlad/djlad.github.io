import { Component } from "../engine/component/component";

export class WasdComponent extends Component {
    constructor(){
        super("wasd");
    }
    speed:number=5;
    sprite:string="grey";
    walkSprite:string="greyWalk";
    update(){
    }
    static create(){
        return new WasdComponent();
    }
}