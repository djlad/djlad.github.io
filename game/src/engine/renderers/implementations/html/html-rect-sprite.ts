import { HtmlCanvas } from "./html-canvas";

export class HtmlRectSprite implements Sprite {
    constructor(spriteImg:HTMLImageElement, widthImgs:number, heightImgs:number, offsetx:number=0, offsety:number=0, frameWidth:number=0, frameHeight:number=0){
        this.sprite = spriteImg;
        this.widthImgs = widthImgs;
        this.heightImgs = heightImgs;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
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
    static spriteDir:string = "../sprites/";
    widthImgs:number;
    heightImgs:number;
    frameWidth:number=1;
    frameHeight:number=1;
    sprite:HTMLImageElement;
    canvas: HtmlCanvas;
    loaded: boolean = false;
    offsetx: number;
    offsety: number;

    private setFrameDimensions(sprite:HtmlRectSprite){
        return function(){
            sprite.frameWidth = sprite.sprite.width/sprite.widthImgs;
            sprite.frameHeight = sprite.sprite.height/sprite.heightImgs;
            sprite.loaded = true;
        }
    }

    public frameCoords(spriteNum:number){
        // var frameWidth:number = this.sprite.width/this.widthImgs;
        // var frameHeight:number = this.sprite.height/this.heightImgs;
        var frameWidth:number = this.frameWidth;
        var frameHeight:number = this.frameHeight;
        const widthImgs = Math.floor(this.sprite.width/frameWidth);
        var framex:number = spriteNum%widthImgs * frameWidth;
        var framey:number = Math.floor(spriteNum/widthImgs) * frameHeight;
        framex += this.offsetx;
        framey += this.offsety;
        return [framex, framey];
    }

    public static create(fileName:string, widthImgs:number, heightImgs:number, offsetx:number=0, offsety:number=0){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        const newSprite = new HtmlRectSprite(spriteImg, widthImgs, heightImgs, offsetx, offsety);
        spriteImg.onload = newSprite.setFrameDimensions(newSprite);
        return newSprite;
    }

    public static createWithDimensions(fileName:string, frameWidth:number, frameHeight:number, offsetx:number=0, offsety:number=0){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        const newSprite = new HtmlRectSprite(spriteImg, 0, 0, offsetx, offsety, frameWidth, frameHeight);
        return newSprite;
    }
}