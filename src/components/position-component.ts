import { Component } from "../engine/component/component";


export class PositionComponent extends Component {
    constructor(){
        super("position");
    }
    private _vx:number=0;
    get vx():number{
        return this._vx;
    }
    set vx(vx:number){
        this._vx = vx;
        if(vx == 0){
            if(this.faceY !== 0){
                this.faceX = vx;
            }
        } else {
            this.faceX = vx;
            if(this.faceY !== 0 && this.vy == 0){
                this.faceY = 0;
            }
        }
    }
    private _vy:number=0;
    get vy():number{
        return this._vy;
    }
    set vy(vy:number){
        this._vy = vy;
        if(vy == 0){
            if(this.faceX !== 0){
                this.faceY = vy;
            }
        } else {
            this.faceY = vy;
            if(this.faceX !== 0 && this.vx == 0){
                this.faceX = 0;
            }
        }
    }
    x:number=0;
    y:number=0;
    width:number=100;
    height:number=100;
    faceRight:boolean=true;
    faceX:number=0;
    faceY:number=0;
    moved:boolean=false;



    update():void{
        this.x += this.vx;
        this.y += this.vy;
        this.moved = !(this.vx == 0 && this.vy == 0);
    }

    static create():PositionComponent{
        return new PositionComponent();
    }
}