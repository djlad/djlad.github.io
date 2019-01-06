import { Component } from './component';


export class PositionComponent extends Component{
    constructor(){
        super("position");
    }
    x:number=0;
    y:number=0;
    vx:number=0;
    vy:number=0;
    width:number=100;
    height:number=100;
    faceRight:boolean=true;

    update():void{
        this.x += this.vx;
        this.y += this.vy;
    }

    static create():PositionComponent{
        return new PositionComponent();
    }
}