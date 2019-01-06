import { HtmlSpriteManager } from './sprite-manager';

interface Renderer {
}

export class HtmlRenderer implements Renderer {
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    spriteManager:HtmlSpriteManager;
    constructor(context:HTMLCanvasElement, spriteManager:HtmlSpriteManager){
        this.canvas = context;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.spriteManager = spriteManager;
    }

    cbox(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number){
        var sprite = this.spriteManager.getSprite(spriteName);
        var spriteImg = sprite.sprite;
        var fc = sprite.frameCoords(spriteNumber);
        this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth, sprite.frameHeight, x, y, width, height);
    }

    static create():HtmlRenderer{
        return createHtmlRenderer();
    }
}

function createHtmlRenderer():HtmlRenderer{
    var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    var hsm:HtmlSpriteManager = HtmlSpriteManager.create();
    return new HtmlRenderer(canvas, hsm);
}

var hrf = createHtmlRenderer();