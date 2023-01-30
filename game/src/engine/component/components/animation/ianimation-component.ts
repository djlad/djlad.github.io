export interface IAnimationComponent {
    spriteName:string;
    getSpriteNumber():void;
    getRGBs(animationName?:string, spriteNumber?:number, width?:number, height?:number):ImageData
    setFilter(pixelData: ImageData):void;
    setSprite(animationName:string):void;
    setSpriteNumber(spriteName:string, spriteNumber:number):void;
}