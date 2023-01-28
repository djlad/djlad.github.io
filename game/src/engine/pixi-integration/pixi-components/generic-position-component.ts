import { Component } from "../../component/component";
import { IPositionComponent } from "../../component/components/position/iposition-component";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { GenericCameras } from "../../dependencies/generic-cameras";
import { ICameras } from "../../dependencies/icameras";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { EventType } from "../../events/EventType";
import { EventManager } from "../../events/event-manager";
import { Game } from "../../game";
import { IEngineSprite } from "../sprite-dependency/iengine-sprite";


export class GenericPositionComponent extends Component implements IPositionComponent{
    // public phaserObject: Phaser.Physics.Matter.Sprite
    public engineSprite: IEngineSprite;
    public static componentName="position";
    events: EventManager;
    entityId: string;
    constructor(game:GameDependencies, entityId:string){
        super("position");
        this.engineSprite = game.engineCreator.createEngineSprite(entityId);
        this.engineSprite.setSprite("greyWalk");
        this.engineSprite.width = this.width;
        this.engineSprite.height = this.height;
        game.checkDependency(game.eventManager);
        this.events = game.eventManager;
        this.entityId = entityId;
    }
    private speedMultiplier:number=50;
    private _vx:number=0;
    get vx():number{
        return this._vx;
    }
    set vx(vx:number){
        this.engineSprite.faceRight = this.faceRight;
        this.engineSprite.vx = vx*this.speedMultiplier;
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
        this.engineSprite.vy = vy;
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
    get x():number{
        return this._x;
    }
    get y():number{
        return this._y;
    }
    set x(newX:number){
        this._x = newX;
        this.events.emit(EventType.entityMoved, {
            entityId: this.entityId,
            x: this._x,
            y: this._y
        });
    }
    set y(newY:number){
        this._y = newY;
        this.events.emit(EventType.entityMoved, {
            entityId: this.entityId,
            x: this._x,
            y: this._y
        });
    }
    _x:number=0;
    _y:number=0;
    h: number=0;
    width:number=100;
    height:number=100;
    flip:boolean = false;
    faceRight:boolean = true;
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

    static create(game:GameDependencies, entityId:string):GenericPositionComponent{
        return new GenericPositionComponent(game, entityId);
    }
}