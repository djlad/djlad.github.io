import { Sprite } from "../../sprite";
import { HtmlCanvas } from "./html-canvas";
export declare class HtmlRectSprite implements Sprite {
    constructor(spriteImg: HTMLImageElement, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number, frameWidth?: number, frameHeight?: number);
    getRGBs(width: number, height: number, spriteNumber: number): ImageData;
    drawImage(spriteNumber: number, x: number, y: number, width: number, height: number): void;
    ctx: CanvasRenderingContext2D;
    static spriteDir: string;
    widthImgs: number;
    heightImgs: number;
    frameWidth: number;
    frameHeight: number;
    sprite: HTMLImageElement;
    canvas: HtmlCanvas;
    loaded: boolean;
    offsetx: number;
    offsety: number;
    private setFrameDimensions;
    frameCoords(spriteNum: number): number[];
    static create(fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): HtmlRectSprite;
    static createWithDimensions(fileName: string, frameWidth: number, frameHeight: number, offsetx?: number, offsety?: number): HtmlRectSprite;
}
