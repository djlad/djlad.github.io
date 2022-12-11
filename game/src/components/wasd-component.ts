import { Component } from "../engine/component/component";

export class WasdComponent extends Component {
    constructor(){
        super("wasd");
    }
    speed:number=5;
    dashSpeed: number = 15;
    dashingTime: number = 0;
    maxDashingTime: number = 20;
    dashing: boolean = false;
    dashWidth: number = 0;
    dashHeight: number = 0;
    dashSprite: string = "";
    dashSpriteNumber: number = 0;
    sprite:string="grey";
    walkSprite:string="greyWalk";
    startDashing(){
        this.dashing = true;
        this.dashingTime = this.maxDashingTime;
    }
    update(){
    }
    static create(){
        return new WasdComponent();
    }
}