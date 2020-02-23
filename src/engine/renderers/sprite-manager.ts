import { SpriteAnimation } from "./sprite-animation";
import { HtmlSprite } from "./implementations/html/html-sprite";

export class SpriteManager {
    constructor(spriteDir:string="../sprites/"){}
    sprites:{ [key: string]: Sprite} = {};
    animations:{ [key: string]: SpriteAnimation} = {};
    
    createSprite(fileName:string, widthImgs:number, heightImgs:number):HtmlSprite{
        return new HtmlSprite(fileName, widthImgs, heightImgs);
    }

    addSprite(spriteName:string, sprite:HtmlSprite){
        this.sprites[spriteName] = sprite;
    }
    getSprite(spriteName:string):Sprite{
        if(! (spriteName in this.sprites)){
            throw "sprite "+spriteName+" does not exist";
        }
        return this.sprites[spriteName];
    }

    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number){
        // if (spriteName=="nothing" && !this.logged){
        //     console.log(this.sprites);
        //     this.logged = true;
        // }
        var sprite = this.createSprite(fileName, widthImgs, heightImgs);
        this.addSprite(spriteName, sprite);
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

    static create():SpriteManager{
        return new SpriteManager();
    }
}