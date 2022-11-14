import { SpriteManager} from "../../sprite-manager";
import { HtmlSprite } from "./html-sprite";
import { Renderer } from "../../render";
import { createSpriteManager } from "../../../../render/sprite-manager";
import { RenderOptions } from "../../render-options";

export class HtmlRenderer implements Renderer {
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    offset:number[];
    public spriteManager:SpriteManager;
    constructor(context:HTMLCanvasElement, spriteManager:SpriteManager){
        this.canvas = context;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
        this.spriteManager = spriteManager;
        this.offset = [0, 0];
        this.ctx.font = "30px Arial";
    }
    
    setOffset(offset:number[]){
        if(offset.length>2){
            console.log("warning incorrect number of offsets");
            return;
        }
        this.offset[0] = offset[0] - this.canvas.width/2;
        this.offset[1] = offset[1] - this.canvas.height/2;
    }

    cbox(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        //this.ctx.fillStyle = "#00ffff";
        //this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, options:RenderOptions):void{
        let flip:boolean = options.flip;
        let sprite:HtmlSprite = <HtmlSprite>this.spriteManager.getSprite(spriteName);
        let spriteImg = sprite.sprite;
        let fc = sprite.frameCoords(spriteNumber);
        // flip = false;
        x = x - width/2;//draw at middle of sprite
        x -= this.offset[0]; //offset all drawings to the left
        y = y - height;//draw at bottom of sprite
        y -= this.offset[1];
        let flipTranslation:number = 2*(x+width/2);
        if(flip){
            this.ctx.translate(flipTranslation, 0);
            this.ctx.scale(-1,1);
        }
        if(options.rotate){
            this.ctx.rotate(options.rotate);
        }
        this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth,
                           sprite.frameHeight, x, y, width, height);

        if(options.rotate){
            this.ctx.rotate(-options.rotate);
        }
        if (flip){
            this.ctx.scale(-1,1);
            this.ctx.translate(-flipTranslation,0);
        }
    }

    text(text:string, x:number, y:number, size:number=10):void{
        x -= this.offset[0]; //offset all drawings to the left
        y -= this.offset[1];
        this.ctx.fillText(text, x, y);
    }

    circle(x: number, y: number, r: number): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#690055";
        // this.ctx.fillStyle = "black";
        this.ctx.globalAlpha = .6;
        this.ctx.arc(x - this.offset[0], y - this.offset[1], r*2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        // this.ctx.fillStyle = "#690055";
        this.ctx.globalAlpha = 1;
        this.ctx.arc(x - this.offset[0], y - this.offset[1], r*1, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        // this.ctx.stroke();
    }

    static create():HtmlRenderer{
        var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.margin = "0";
        canvas.style.padding = "0";
        canvas.style.overflow = "hidden";
        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        var spriteManager:SpriteManager = SpriteManager.create();
        //var spriteManager:SpriteManager = createSpriteManager();
        return new HtmlRenderer(canvas, spriteManager);
    }
}