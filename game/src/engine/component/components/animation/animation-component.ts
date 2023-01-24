import { Entity } from "../../../entity/entity";
import { EntityUpdateArgs } from "../../../entity/entity-update-args";
import { SpriteAnimation } from "../../../renderers/sprite-animation";
import { SpriteManager } from "../../../renderers/sprite-manager";
import { Component } from "../../component";
import { IAnimationComponent } from "./ianimation-component";

export class AnimationComponent extends Component implements IAnimationComponent {
    constructor(animationName:string, delay:number, spriteManager:SpriteManager){
        super("animation");
        this.delay = delay;
        this.currentDelay = delay;
        this.spriteManager = spriteManager;
        this.setSprite(animationName);
        this.animationName = animationName;
    }
    private spriteNumbers:number[];
    public animationName:string;
    public spriteName:string;
    private delay:number;
    private frameNum:number=0;
    private spriteNum:number=0;
    private spriteManager:SpriteManager;
    private currentDelay:number;
    private filter: ImageData;
    private isFiltered:boolean = false;

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