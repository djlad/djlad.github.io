import { SpriteManager} from "../../sprite-manager";
import { HtmlRectSprite } from "./html-rect-sprite";
import { Renderer } from "../../render";
import { RenderOptions } from "../../render-options";
import { SpriteAnimation } from "../../sprite-animation";
import { HtmlCanvas } from "./html-canvas";

export class HtmlRenderer implements Renderer {
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    public readonly offset:number[];
    public spriteManager:SpriteManager;
    constructor(context:HtmlCanvas, spriteManager:SpriteManager){
        this.canvas = context.canvas;
        this.ctx = context.ctx;
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
        // this.ctx.fillStyle = "#00ffff";
        // this.ctx.fillStyle = "#7CFC00";
        // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
    
    spriteFilter(filter: ImageData, x: number, y: number, width: number, height: number, spriteNumber: number, options: RenderOptions): void {
        let flip:boolean = options.flip;
        // let sprite:Sprite = <Sprite>this.spriteManager.getSprite(spriteName);
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

        let canvas = document.createElement("canvas");
        canvas.width = filter.width;
        canvas.height = filter.height;
        let context = canvas.getContext("2d");
        context.putImageData(filter, 0, 0);
        this.ctx.drawImage(canvas, 0, 0, filter.width, filter.height, x, y , width, height);

        if(options.rotate){
            this.ctx.rotate(-options.rotate);
        }
        if (flip){
            this.ctx.scale(-1,1);
            this.ctx.translate(-flipTranslation,0);
        }
    }

    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, options:RenderOptions):void{
        let flip:boolean = options.flip;
        let sprite:Sprite = <Sprite>this.spriteManager.getSprite(spriteName);
        let fc = sprite.frameCoords(spriteNumber);
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
        if (x > -100 && x < this.canvas.width && y > -100 && y<this.canvas.height)
        {
            sprite.drawImage(spriteNumber, x, y, width, height);
        }

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

    line(x1: number, y1: number, x2: number, y2: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    static create():HtmlRenderer{
        let canvas = HtmlCanvas.createSingleton();
        var spriteManager:SpriteManager = SpriteManager.singeltonCreate();
        //var spriteManager:SpriteManager = createSpriteManager();
        return new HtmlRenderer(canvas, spriteManager);
    }
}