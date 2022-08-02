export class HtmlSprite implements Sprite {
    constructor(fileName:string, widthImgs:number, heightImgs:number){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        this.sprite = spriteImg;
        this.widthImgs = widthImgs;
        this.heightImgs = heightImgs;
        spriteImg.onload = this.setFrameDimensions(this);
    }
    spriteDir:string = "../sprites/";
    widthImgs:number;
    heightImgs:number;
    frameWidth:number;
    frameHeight:number;
    sprite:HTMLImageElement;

    private setFrameDimensions(sprite:HtmlSprite){
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