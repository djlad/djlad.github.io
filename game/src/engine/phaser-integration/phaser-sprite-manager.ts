import { HtmlRectSprite } from "../renderers/implementations/html/html-rect-sprite";
import { HtmlSprite } from "../renderers/implementations/html/html-sprite";
import { ISpriteLoader } from "../renderers/isprite-loader";
import { Sprite } from "../renderers/sprite";
import { SpriteAnimation } from "../renderers/sprite-animation";
import { PhaserGame } from "./phaser-game";
import { metadata } from "../../metadata";

export class PhaserSpriteManager implements ISpriteLoader{
    constructor(spriteDir:string="../sprites/"){
        this.phaserGame = PhaserGame.createSingleton();
        this.spriteDir = spriteDir;
    }
    onLoad(callback?: () => void): void {
        throw new Error("Method not implemented.");
    }
    private spriteDir: string;
    private phaserGame: PhaserGame;
    private spriteNameToPath:{[index:string]: string} = {};
    private path(fileName:string){
        return this.spriteDir + fileName;
    }
    
    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number, offsetx:number=0, offsety:number=0){
        this.phaserGame.mainScene.addPreloader(()=>{
            const path: string = this.path(fileName)
            const width:number = metadata[path.replace("../", "")].width;
            const height:number = metadata[path.replace("../", "")].height;
            const frameWidth = width/widthImgs;
            const frameHeight = height/heightImgs;
            this.phaserGame.mainScene.load.spritesheet(spriteName, path, {
                frameWidth:frameWidth,
                frameHeight:frameHeight
            });
            // this.spriteNameToPath[spriteName] = path;
        });
    }

    loadSpriteWithDimensions(spriteName:string, fileName:string, frameWidth:number, frameHeight:number, offsetx:number=0, offsety:number=0){
    }

    loadSpriteOverlapping(spriteName:string, fileName:string){
    }

    addAnimation(spriteName:string, animationName:string, spriteNumbers:Array<number>, delay=1){
        this.phaserGame.mainScene.addCreator(()=>{
            const anims = this.phaserGame.mainScene.anims;
            anims.create(
                {
                    key:animationName,
                    frames: anims.generateFrameNumbers(spriteName, {
                        frames: spriteNumbers                    
                    }),
                    frameRate: Math.floor(30 / delay),
                    repeat:-1 
                }
            )
        });
    }

    getAnimation(animationName:string):SpriteAnimation{
        // to remove
        return SpriteAnimation.create(animationName, "", [], 0);
    }

    getRGBs(animationName:string=null, spriteNumber:number = 0, width:number=null, height:number=null):ImageData{
        return new ImageData(0, 0);
    }

    static create():PhaserSpriteManager{
        return new PhaserSpriteManager();
    }
    private static spriteManager:PhaserSpriteManager = null;
    static singeltonCreate():PhaserSpriteManager{
        if (PhaserSpriteManager.spriteManager != null) return PhaserSpriteManager.spriteManager;
        PhaserSpriteManager.spriteManager = new PhaserSpriteManager();
        return PhaserSpriteManager.spriteManager;
    }
}