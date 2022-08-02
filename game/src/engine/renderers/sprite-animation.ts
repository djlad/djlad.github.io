export class SpriteAnimation{
    constructor(animationName:string, spriteName:string, spriteNumbers:number[], delay:number){
        this.spriteNumbers = spriteNumbers;
        this.animationName = animationName;
        this.spriteName = spriteName;
        this.delay = delay;
    }
    spriteNumbers:number[];
    animationName:string;
    spriteName:string;
    delay:number;

    static create(animationName:string, spriteName:string, spriteNumbers:number[], delay:number=1){
        var sa:SpriteAnimation = new SpriteAnimation(
            animationName,
            spriteName,
            spriteNumbers,
            delay
        );
        return sa;
    }
}