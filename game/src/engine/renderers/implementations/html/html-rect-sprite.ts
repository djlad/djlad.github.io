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
    getRGBs(width:number, height:number, spriteNumber: number): ImageData{
        let fc = this.frameCoords(spriteNumber);
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        if (width == null || height == null)
        {
            canvas.width = this.frameWidth;
            canvas.height = this.frameHeight;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(this.sprite, fc[0], fc[1], this.frameWidth,
                          this.frameHeight, 0, 0, canvas.width, canvas.height);
        let pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
        return pixelData;
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
    frameWidth:number=1;
    frameHeight:number=1;
    sprite:HTMLImageElement;
    canvas: HtmlCanvas;
    loaded: boolean = false;

    private setFrameDimensions(sprite:HtmlRectSprite){
        return function(){
            sprite.frameWidth = sprite.sprite.width/sprite.widthImgs;
            sprite.frameHeight = sprite.sprite.height/sprite.heightImgs;
            sprite.loaded = true;
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