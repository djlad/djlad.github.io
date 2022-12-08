interface Sprite {
    drawImage(spriteNumber:number, x: number, y: number, width: number, height: number): void;
    frameCoords(spriteNumber:number):number[]
}