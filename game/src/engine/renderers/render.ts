import { SpriteManager } from "./sprite-manager";
import { RenderOptions } from "./render-options";

export interface Renderer {
    cbox():void;
    setOffset(offset:number[]):void;
    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, options:RenderOptions):void;
    text(text:string, x:number, y:number, size:number):void;
    circle(x:number, y:number, r: number):void;
    line(x1:number, y1:number, x2:number, y2:number): void;
    spriteManager:SpriteManager;
}