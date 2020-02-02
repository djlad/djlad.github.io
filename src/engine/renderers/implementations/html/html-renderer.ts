import { SpriteManager} from "../../sprite-manager";
import { HtmlSprite } from "./html-sprite";
import { Renderer } from "../../render";
import { createSpriteManager } from "../../../../render/sprite-manager";
import { RenderOptions } from "../../render-options";

export class HtmlRenderer implements Renderer {
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    public spriteManager:SpriteManager;
    constructor(context:HTMLCanvasElement, spriteManager:SpriteManager){
        this.canvas = context;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.spriteManager = spriteManager;
    }

    cbox(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        //this.ctx.fillStyle = "#00ffff";
        //this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, options:RenderOptions){
        let flip:boolean = options.flip;
        let sprite:HtmlSprite = <HtmlSprite>this.spriteManager.getSprite(spriteName);
        let spriteImg = sprite.sprite;
        let fc = sprite.frameCoords(spriteNumber);

        if(flip){
            this.ctx.translate(2*x, 0);
            this.ctx.scale(-1,1);
        }
        if(options.rotate){
            this.ctx.rotate(options.rotate);
        }
        
        this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth,
                           sprite.frameHeight, x-width/2, y-height, width, height);

        if(options.rotate){
            this.ctx.rotate(-options.rotate);
        }
        if (flip){
            this.ctx.scale(-1,1);
            this.ctx.translate(-2*x,0);
        }
    }

    static create():HtmlRenderer{
        var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = 1000;
        canvas.height = 760;
        var spriteManager:SpriteManager = SpriteManager.create();
        //var spriteManager:SpriteManager = createSpriteManager();
        return new HtmlRenderer(canvas, spriteManager);
    }
}