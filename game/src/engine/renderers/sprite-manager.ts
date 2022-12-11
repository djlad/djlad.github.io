import { SpriteAnimation } from "./sprite-animation";
import { HtmlRectSprite } from "./implementations/html/html-rect-sprite";
import { HtmlSprite } from "./implementations/html/html-sprite";

export class SpriteManager {
    constructor(spriteDir:string="../sprites/"){}
    sprites:{ [key: string]: Sprite} = {};//sprite name to sprite
    animations:{ [key: string]: SpriteAnimation} = {};//animation name to animation
    RGBs: {[key:string]: ImageData}= {};
    
    createSprite(fileName:string, widthImgs:number, heightImgs:number):HtmlRectSprite{
        return new HtmlRectSprite(fileName, widthImgs, heightImgs);
    }

    addSprite(spriteName:string, sprite:Sprite){
        this.sprites[spriteName] = sprite;
    }
    getSprite(spriteName:string):Sprite{
        if(! (spriteName in this.sprites)){
            throw "sprite "+spriteName+" does not exist";
        }
        return this.sprites[spriteName];
    }

    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number){
        var sprite = this.createSprite(fileName, widthImgs, heightImgs);
        this.addSprite(spriteName, sprite);
    }

    loadSpriteOverlapping(spriteName:string, fileName:string){
        let sprite = HtmlSprite.create(fileName);
    }

    addAnimation(spriteName:string, animationName:string, spriteNumbers:Array<number>, delay=1){
        var sa:SpriteAnimation = SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
        if (!(spriteName in this.sprites)){
            throw "error adding animation "
            + animationName 
            + ". spriteName "
            + spriteName
            + "doesn't exist. sprites must be added through addSprite method first";
        }
        this.animations[animationName] = sa;
    }

    getAnimation(animationName:string):SpriteAnimation{
        if(animationName in this.animations){
            return this.animations[animationName];
        } else {
            return null;
        }
    }

    getRGBs(animationName:string, spriteNumber:number): ImageData{
        let key = animationName + spriteNumber;
        if (key in this.RGBs) return this.RGBs[key];
        let animation = this.animations[animationName];
        let name = animation.spriteName;
        let sprite = this.sprites[name];
        this.RGBs[key] = sprite.getRGBs(spriteNumber);
        return this.RGBs[key];
    }

    static create():SpriteManager{
        return new SpriteManager();
    }
    private static spriteManager:SpriteManager = null;
    static singeltonCreate():SpriteManager{
        if (SpriteManager.spriteManager != null) return SpriteManager.spriteManager;
        SpriteManager.spriteManager = new SpriteManager();
        return SpriteManager.spriteManager;
    }
}