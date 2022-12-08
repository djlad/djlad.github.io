import { HtmlCanvas } from "./html-canvas";

export class HtmlRectSprite implements Sprite {
    constructor(fileName:string, widthImgs:number, heightImgs:number){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        this.sprite = spriteImg;
        this.widthImgs = widthImgs;
        this.heightImgs = heightImgs;
        spriteImg.onload = this.setFrameDimensions(this);
        this.canvas = HtmlCanvas.createSingleton();
        this.ctx = HtmlCanvas.createSingleton().ctx;
    }
    drawImage(spriteNumber: number, x: number, y: number, width: number, height: number): void {
        let fc = this.frameCoords(spriteNumber);
        this.ctx.drawImage(this.sprite, fc[0], fc[1], this.frameWidth,
                          this.frameHeight, x, y, width, height);
    }
    ctx: CanvasRenderingContext2D;
    spriteDir:string = "../sprites/";
    widthImgs:number;
    heightImgs:number;
    frameWidth:number;
    frameHeight:number;
    sprite:HTMLImageElement;
    canvas: HtmlCanvas;

    private setFrameDimensions(sprite:HtmlRectSprite){
        return function(){
            sprite.frameWidth = sprite.sprite.width/sprite.widthImgs;
            sprite.frameHeight = sprite.sprite.height/sprite.heightImgs;
        }
    }

    public frameCoords(spriteNum:number){
        var frameWidth:number = this.sprite.width/this.widthImgs;
        var frameHeight:number = this.sprite.height/this.heightImgs;
        var framex:number = spriteNum%this.widthImgs * frameWidth;
        var framey:number = Math.floor(spriteNum/this.widthImgs) * frameHeight;
        return [framex, framey];
    }

}