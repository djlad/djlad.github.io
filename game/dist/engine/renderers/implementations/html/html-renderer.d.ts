import { SpriteManager } from "../../sprite-manager";
import { Renderer } from "../../render";
import { RenderOptions } from "../../render-options";
import { HtmlCanvas } from "./html-canvas";
export declare class HtmlRenderer implements Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly offset: number[];
    spriteManager: SpriteManager;
    constructor(context: HtmlCanvas, spriteManager: SpriteManager);
    getOffset(): number[];
    setOffset(offset: number[]): void;
    cbox(): void;
    spriteFilter(filter: ImageData, x: number, y: number, width: number, height: number, spriteNumber: number, options: RenderOptions): void;
    sprite(spriteName: string, x: number, y: number, width: number, height: number, spriteNumber: number, options: RenderOptions): void;
    text(text: string, x: number, y: number, size?: number): void;
    circle(x: number, y: number, r: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    static create(): HtmlRenderer;
}
