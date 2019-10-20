import { HtmlSpriteManager } from './sprite-manager';

export interface Renderer {
    cbox():void;
    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number):void;
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
        //this.ctx.fillStyle = "#00ffff";
        //this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, flip:boolean=false){
        var sprite = this.spriteManager.getSprite(spriteName);
        var spriteImg = sprite.sprite;
        var fc = sprite.frameCoords(spriteNumber);

        if(flip){
            this.ctx.translate(2*x, 0);
            this.ctx.scale(-1,1);
        }
        
        this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth,
                           sprite.frameHeight, x-width/2, y-height, width, height);

        if (flip){
            this.ctx.scale(-1,1);
            this.ctx.translate(-2*x,0);
        }
    }

    static create():HtmlRenderer{
        return createHtmlRenderer();
    }
}

function createHtmlRenderer():HtmlRenderer{
    var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.width = 1400;
    canvas.height = 780;
    var hsm:HtmlSpriteManager = HtmlSpriteManager.create();
    return new HtmlRenderer(canvas, hsm);
}

var hrf = createHtmlRenderer();