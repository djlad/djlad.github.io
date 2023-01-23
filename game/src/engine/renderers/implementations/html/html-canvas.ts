export class HtmlCanvas
{
    constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    private static canvas: HtmlCanvas = null;
    public static createSingleton()
    {
        if (canvas != null) return HtmlCanvas.canvas;
        var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
        if (canvas === null){
            canvas = document.createElement("canvas");
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.margin = "0";
        canvas.style.padding = "0";
        canvas.style.overflow = "hidden";
        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        HtmlCanvas.canvas = new HtmlCanvas(canvas);
        return HtmlCanvas.canvas;
    }
}