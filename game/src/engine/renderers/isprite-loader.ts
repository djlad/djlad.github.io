export interface ISpriteLoader {
    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number, offsetx?:number, offsety?:number):void;
    loadSpriteWithDimensions(spriteName:string, fileName:string, frameWidth:number, frameHeight:number, offsetx:number, offsety:number):void;
    loadSpriteOverlapping(spriteName:string, fileName:string):void;
    addAnimation(spriteName:string, animationName:string, spriteNumbers:Array<number>, delay?:number):void;
}