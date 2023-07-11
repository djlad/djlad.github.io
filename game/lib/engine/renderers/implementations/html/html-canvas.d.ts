export declare class HtmlCanvas {
    constructor(canvas: HTMLCanvasElement);
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    private static canvas;
    static createSingleton(): HtmlCanvas;
}
