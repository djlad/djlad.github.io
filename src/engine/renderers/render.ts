export interface Renderer {
    cbox():void;
    sprite(spriteName:string, x:number, y:number, width:number, height:number, spriteNumber:number):void;
}