interface Sprite {
    loaded: boolean;
    drawImage(spriteNumber:number, x: number, y: number, width: number, height: number): void;
    frameCoords(spriteNumber:number):number[];
    getRGBs(width:number, height:number, spriteNumber:number):ImageData;
}