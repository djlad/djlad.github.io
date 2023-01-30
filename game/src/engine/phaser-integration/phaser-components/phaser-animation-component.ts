import { Component } from "../../component/component";
import { IAnimationComponent } from "../../component/components/animation/ianimation-component";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { ISpriteLoader } from "../../renderers/isprite-loader";
import { PhaserGame } from "../phaser-game";
import { PhaserSpriteManager } from "../phaser-sprite-manager";

export class PhaserAnimationComponent extends Component implements IAnimationComponent{
    animationName: string;
    spriteName: string;
    animationNameUpdated: boolean = false;
    private phaserGame: PhaserGame;
    fakeImageData: ImageData = new ImageData(1,1);
    constructor(animationName:string, delay:number, spriteManager:ISpriteLoader){
        super("animation");
        this.phaserGame = PhaserGame.createSingleton();
    }

    getSpriteNumber(){
    }

    getRGBs(animationName:string=null, spriteNumber:number = 0, width:number=null, height:number=null,):ImageData{
        return this.fakeImageData;
    }
    
    setFilter(pixelData: ImageData) {
    }

    setSprite(animationName:string){
        // console.log(`${animationName} updated to`);
        if(animationName == this.animationName) return;
        this.animationName = animationName;
        this.animationNameUpdated = true;
    }

    setSpriteNumber(spriteName:string, spriteNumber:number){
    }

    update(entity:Entity, args:EntityUpdateArgs):void{
    }

    static create():PhaserAnimationComponent{
        var spriteManager:ISpriteLoader = PhaserSpriteManager.singeltonCreate();
        // var spriteManager:SpriteManager = createSpriteManager();
        var ac:PhaserAnimationComponent = new PhaserAnimationComponent("blond", 2, spriteManager);
        return ac;
    }
}