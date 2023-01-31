import { Component } from "../../component/component";
import { IPositionComponent } from "../../component/components/position/iposition-component";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { PhaserGame } from "../phaser-game";


export class PhaserPositionComponent extends Component implements IPositionComponent{
    private phaserGame: PhaserGame;
    // public phaserObject: Phaser.Physics.Matter.Sprite
    public phaserObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    constructor(phaser:PhaserGame){
        super("position");
        this.phaserGame = phaser;
        this.phaserGame.mainScene.addCreator((scene)=>{
            this.phaserObject = scene.physics.add.sprite(this.x, this.y, "victorian", 72);
            this.phaserObject.displayWidth = this.width;
            this.phaserObject.displayHeight = this.height;
        });
    }
    private speedMultiplier:number=50;
    private _vx:number=0;
    get vx():number{
        return this._vx;
    }
    set vx(vx:number){
        if (this.phaserObject?.body?.velocity != null && this.phaserObject.body.velocity.x != vx){
            this.phaserObject.setFlipX(!this.faceRight)
            this.phaserObject.setVelocityX(vx*this.speedMultiplier);
        }
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
        if (this.phaserObject?.body?.velocity != null && this.phaserObject.body.velocity.y != vy){
            this.phaserObject.setVelocityY(vy*this.speedMultiplier);
        }
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

    static create():PhaserPositionComponent{
        return new PhaserPositionComponent(PhaserGame.createSingleton());
    }
    pivotX:number = .5;
    pivotY:number = 1;
    anchorX:number = .5;
    anchorY:number = 1;
}