define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlCanvas = void 0;
    class HtmlCanvas {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
        }
        static createSingleton() {
            if (canvas != null)
                return HtmlCanvas.canvas;
            var canvas = document.getElementById("canvas");
            if (canvas === null) {
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
    exports.HtmlCanvas = HtmlCanvas;
    HtmlCanvas.canvas = null;
});
//# sourceMappingURL=html-canvas.js.map