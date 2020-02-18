import { SpriteManager } from "./sprite-manager";
import { RenderOptions } from "./render-options";

export interface Renderer {
    cbox():void;
    setOffset(offset:number[]):void;
    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number, options:RenderOptions):void;
    spriteManager:SpriteManager;
}