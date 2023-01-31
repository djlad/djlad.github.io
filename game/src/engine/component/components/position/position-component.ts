import { Component } from "../../component";
import { Entity } from "../../../entity/entity";
import { EntityUpdateArgs } from "../../../entity/entity-update-args";
import { IPositionComponent } from "./iposition-component";


export class PositionComponent extends Component implements IPositionComponent {
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
    private _rotate:number=0;
    get rotate():number{
        return this._rotate;
    }
    set rotate(radiansToRotate:number){
        this._rotate = radiansToRotate%(2*Math.PI);
    }
    x:number=0;
    y:number=0;
    h: number=0;
    width:number=100;
    height:number=100;
    faceRight:boolean=true;
    faceX:number=0;
    faceY:number=0;
    moved:boolean=false;
    applyOffsets:boolean=true;



    update(entity:Entity, args:EntityUpdateArgs):void{
        const delta = args.delta;
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        this.moved = !(this.vx == 0 && this.vy == 0);
    }

    static create():PositionComponent{
        return new PositionComponent();
    }
    pivotX:number = .5;
    pivotY:number = 1;
    anchorX:number = .5;
    anchorY:number = 1;
}