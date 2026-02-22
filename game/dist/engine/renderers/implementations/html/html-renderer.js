define(["require", "exports", "../../sprite-manager", "./html-canvas"], function (require, exports, sprite_manager_1, html_canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlRenderer = void 0;
    class HtmlRenderer {
        constructor(context, spriteManager) {
            this.canvas = context.canvas;
            this.ctx = context.ctx;
            this.spriteManager = spriteManager;
            this.offset = [0, 0];
            this.ctx.font = "30px Arial";
        }
        getOffset() {
            return this.offset;
        }
        setOffset(offset) {
            if (offset.length > 2) {
                console.log("warning incorrect number of offsets");
                return;
            }
            this.offset[0] = offset[0] - this.canvas.width / 2;
            this.offset[1] = offset[1] - this.canvas.height / 2;
        }
        cbox() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        spriteFilter(filter, x, y, width, height, spriteNumber, options) {
            let flip = options.flip;
            x = x - width / 2;
            y = y - height;
            if (options.applyOffsets) {
                x -= this.offset[0];
                y -= this.offset[1];
            }
            let flipTranslation = 2 * (x + width / 2);
            if (flip) {
                this.ctx.translate(flipTranslation, 0);
                this.ctx.scale(-1, 1);
            }
            if (options.rotate) {
                this.ctx.rotate(options.rotate);
            }
            let canvas = document.createElement("canvas");
            canvas.width = filter.width;
            canvas.height = filter.height;
            let context = canvas.getContext("2d");
            context.putImageData(filter, 0, 0);
            this.ctx.drawImage(canvas, 0, 0, filter.width, filter.height, x, y, width, height);
            if (options.rotate) {
                this.ctx.rotate(-options.rotate);
            }
            if (flip) {
                this.ctx.scale(-1, 1);
                this.ctx.translate(-flipTranslation, 0);
            }
        }
        sprite(spriteName, x, y, width, height, spriteNumber, options) {
            let flip = options.flip;
            let sprite = this.spriteManager.getSprite(spriteName);
            let fc = sprite.frameCoords(spriteNumber);
            x = x - width / 2;
            y = y - height;
            if (options.applyOffsets) {
                x -= this.offset[0];
                y -= this.offset[1];
            }
            let flipTranslation = 2 * (x + width / 2);
            if (flip) {
                this.ctx.translate(flipTranslation, 0);
                this.ctx.scale(-1, 1);
            }
            if (options.rotate) {
                this.ctx.rotate(options.rotate);
            }
            if (x + width > -100 && x < this.canvas.width && y + height > -100 && (y - height) < this.canvas.height) {
                sprite.drawImage(spriteNumber, x, y, width, height);
            }
            if (options.rotate) {
                this.ctx.rotate(-options.rotate);
            }
            if (flip) {
                this.ctx.scale(-1, 1);
                this.ctx.translate(-flipTranslation, 0);
            }
        }
        text(text, x, y, size = 10) {
            x -= this.offset[0];
            y -= this.offset[1];
            this.ctx.fillText(text, x, y);
        }
        circle(x, y, r) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#690055";
            this.ctx.globalAlpha = .6;
            this.ctx.arc(x - this.offset[0], y - this.offset[1], r * 2, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.fillStyle = "black";
            this.ctx.globalAlpha = 1;
            this.ctx.arc(x - this.offset[0], y - this.offset[1], r * 1, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
        line(x1, y1, x2, y2) {
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
        static create() {
            let canvas = html_canvas_1.HtmlCanvas.createSingleton();
            var spriteManager = sprite_manager_1.SpriteManager.singeltonCreate();
            return new HtmlRenderer(canvas, spriteManager);
        }
    }
    exports.HtmlRenderer = HtmlRenderer;
});
//# sourceMappingURL=html-renderer.js.map