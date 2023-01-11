import { Component } from '../engine/component/component';
import { SpriteManager } from '../engine/renderers/sprite-manager';
import { SpriteAnimation } from '../engine/renderers/sprite-animation';
import { Entity } from '../engine/entity/entity';
import { EntityUpdateArgs } from '../engine/entity/entity-update-args';
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
    filter: ImageData;
    isFiltered:boolean = false;

    getSpriteNumber(){
        var frameNum = this.frameNum;
        var spriteNum = this.spriteNumbers[frameNum];
        return spriteNum;
    }

    getRGBs(animationName:string=null, spriteNumber:number = 0, width:number=null, height:number=null,):ImageData{
        if (animationName != null) return this.spriteManager.getRGBs(animationName, spriteNumber, width, height);
        return this.spriteManager.getRGBs(this.animationName, this.getSpriteNumber(), width, height);
    }
    
    setFilter(pixelData: ImageData) {
        this.filter = pixelData;
        this.isFiltered = true;
    }

    setSprite(animationName:string){
        if(animationName == this.animationName){
            return;
        }

        this.animationName = animationName;
        var animation:SpriteAnimation = this.spriteManager.getAnimation(animationName);
        if(animation == null){
            console.log(`no animation found: ${animationName}`);
            return;
        }
        this.spriteNumbers = animation.spriteNumbers;
        this.spriteName = animation.spriteName;
        this.delay = animation.delay;
        this.frameNum = 0;
    }

    setSpriteNumber(spriteName:string, spriteNumber:number){
        this.spriteNumbers = [spriteNumber];
        this.spriteName = spriteName;
        this.delay = 100;
        this.frameNum = 0
    }

    update(entity:Entity, args:EntityUpdateArgs):void{
        const framesPassed = args.fullFramePassed;
        if (framesPassed == 0)return;
        if(this.currentDelay == 0){
            this.frameNum += framesPassed;
            this.frameNum %= this.spriteNumbers.length;
            this.spriteNum = this.getSpriteNumber();
            this.currentDelay = this.delay;
        } else {
            this.currentDelay--;
        }
    }

    static create():AnimationComponent{
        var spriteManager:SpriteManager = SpriteManager.singeltonCreate();
        // var spriteManager:SpriteManager = createSpriteManager();
        var ac:AnimationComponent = new AnimationComponent("blond", 2, spriteManager);
        return ac;
    }
}