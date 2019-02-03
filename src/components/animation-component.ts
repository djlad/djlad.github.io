import { Component } from './component';
import { HtmlSpriteManager, SpriteAnimation } from '../sprite-manager';

export class AnimationComponent extends Component {
    constructor(animationName:string, delay:number, spriteManager:HtmlSpriteManager){
        super("animation");
        this.delay = delay;
        this.currentDelay = delay;
        this.spriteManager = spriteManager;
        this.setSprite(animationName);
        this.animationName = animationName;
    }
    spriteNumbers:number[];
    animationName:string;
    spriteName:string;
    delay:number;
    frameNum:number=0;
    spriteNum:number=0;
    spriteManager:HtmlSpriteManager;
    currentDelay:number;

    getSpriteNumber(){
        var frameNum = this.frameNum;
        var spriteNum = this.spriteNumbers[frameNum];
        return spriteNum;
    }

    setSprite(animationName:string){
        if(animationName == this.animationName){
            return;
        }

        this.animationName = animationName;
        var animation:SpriteAnimation = this.spriteManager.getAnimation(animationName);
        this.spriteNumbers = animation.spriteNumbers;
        this.spriteName = animation.spriteName;
        this.delay = animation.delay;
        this.frameNum = 0;
    }

    update():void{
        if(this.currentDelay == 0){
            this.frameNum++;
            this.frameNum %= this.spriteNumbers.length;
            this.spriteNum = this.getSpriteNumber();
            this.currentDelay = this.delay;
        } else {
            this.currentDelay--;
        }
    }

    static create():AnimationComponent{
        var spriteManager:HtmlSpriteManager = HtmlSpriteManager.create();
        var ac:AnimationComponent = new AnimationComponent("blond", 2, spriteManager);
        return ac;
    }
}