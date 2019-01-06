import { Component } from './component';
import { HtmlSpriteManager, SpriteAnimation } from '../sprite-manager';

export class AnimationComponent extends Component {
    constructor(animationName:string, delay:number, spriteManager:HtmlSpriteManager){
        super("animation");
        this.animationName = animationName;
        this.delay = delay;
        this.currentDelay = delay;
        this.spriteManager = spriteManager;
        this.setSprite(animationName);
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
        //console.log(spriteNum)
        return spriteNum;
    }

    setSprite(animationName:string){
        this.animationName = animationName;
        var animation:SpriteAnimation = this.spriteManager.getAnimation(animationName);
        this.spriteNumbers = animation.spriteNumbers;
        this.spriteName = animation.spriteName;
        this.delay = animation.delay;
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
        var ac:AnimationComponent = new AnimationComponent("blondWalk", 2, spriteManager);
        return ac;
    }
}