import { Sprite } from "../../sprite";
export declare class HtmlSprite implements Sprite {
    constructor(fileName: string);
    loaded: boolean;
    getRGBs(spriteNumber: number): ImageData;
    spriteDir: string;
    sprite: HTMLImageElement;
    ctx: CanvasRenderingContext2D;
    frameCoordsCalculated: number[][];
    drawImage(spriteNumber: number, x: number, y: number, width: number, height: number): void;
    private setFrameDimensions;
    findFrames(averagedPixelData: number[], width: number, height: number): number[][];
    frameCoords(spriteNum: number): number[];
    static create(fileName: string): HtmlSprite;
}
