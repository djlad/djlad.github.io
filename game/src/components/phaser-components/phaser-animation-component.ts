import { Game } from "../../engine/game";
import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import { EntityUpdateArgs } from "../../engine/entity/entity-update-args";
import { SpriteAnimation } from "../../engine/renderers/sprite-animation";
import { SpriteManager } from "../../engine/renderers/sprite-manager";
import { PhaserSpriteManager } from "../../engine/phaser-integration/phaser-sprite-manager";
import { ISpriteLoader } from "../../engine/renderers/isprite-loader";
import { PhaserGame } from "../../engine/phaser-integration/phaser-game";

export class PhaserAnimationComponent extends Component {
    phaserGame: PhaserGame;
    animationName: string;
    animationNameUpdated: boolean = false;
    fakeImageData: ImageData = new ImageData(1,1);
    constructor(animationName:string, delay:number, spriteManager:ISpriteLoader){
        console.log("added phaser anim component");
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