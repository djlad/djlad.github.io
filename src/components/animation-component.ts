import { Component } from '../engine/component/component';
import { SpriteManager } from '../engine/renderers/sprite-manager';
import { SpriteAnimation } from '../engine/renderers/sprite-animation';
import { createSpriteManager } from '../render/sprite-manager';

export class AnimationComponent extends Component {
    constructor(animationName:string, delay:number, spriteManager:SpriteManager){
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
    spriteManager:SpriteManager;
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
        //var spriteManager:SpriteManager = SpriteManager.create();
        var spriteManager:SpriteManager = createSpriteManager();
        var ac:AnimationComponent = new AnimationComponent("blond", 2, spriteManager);
        return ac;
    }
}