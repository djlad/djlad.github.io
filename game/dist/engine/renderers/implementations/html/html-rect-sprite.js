define(["require", "exports", "./html-canvas"], function (require, exports, html_canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlRectSprite = void 0;
    class HtmlRectSprite {
        constructor(spriteImg, widthImgs, heightImgs, offsetx = 0, offsety = 0, frameWidth = 0, frameHeight = 0) {
            this.frameWidth = 1;
            this.frameHeight = 1;
            this.loaded = false;
            this.sprite = spriteImg;
            this.widthImgs = widthImgs;
            this.heightImgs = heightImgs;
            this.offsetx = offsetx;
            this.offsety = offsety;
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this.canvas = html_canvas_1.HtmlCanvas.createSingleton();
            this.ctx = html_canvas_1.HtmlCanvas.createSingleton().ctx;
        }
        getRGBs(width, height, spriteNumber) {
            let fc = this.frameCoords(spriteNumber);
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            if (width == null || height == null) {
                canvas.width = this.frameWidth;
                canvas.height = this.frameHeight;
            }
            else {
                canvas.width = width;
                canvas.height = height;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this.sprite, fc[0], fc[1], this.frameWidth, this.frameHeight, 0, 0, canvas.width, canvas.height);
            let pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
            return pixelData;
        }
        drawImage(spriteNumber, x, y, width, height) {
            let fc = this.frameCoords(spriteNumber);
            this.ctx.drawImage(this.sprite, fc[0], fc[1], this.frameWidth, this.frameHeight, x, y, width, height);
        }
        setFrameDimensions(sprite) {
            return function () {
                sprite.frameWidth = sprite.sprite.width / sprite.widthImgs;
                sprite.frameHeight = sprite.sprite.height / sprite.heightImgs;
                sprite.loaded = true;
            };
        }
        frameCoords(spriteNum) {
            var frameWidth = this.frameWidth;
            var frameHeight = this.frameHeight;
            const widthImgs = Math.floor(this.sprite.width / frameWidth);
            var framex = spriteNum % widthImgs * frameWidth;
            var framey = Math.floor(spriteNum / widthImgs) * frameHeight;
            framex += this.offsetx;
            framey += this.offsety;
            return [framex, framey];
        }
        static create(fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
            var spriteImg = new Image();
            spriteImg.src = this.spriteDir + fileName;
            const newSprite = new HtmlRectSprite(spriteImg, widthImgs, heightImgs, offsetx, offsety);
            spriteImg.onload = newSprite.setFrameDimensions(newSprite);
            return newSprite;
        }
        static createWithDimensions(fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
            var spriteImg = new Image();
            spriteImg.src = this.spriteDir + fileName;
            const newSprite = new HtmlRectSprite(spriteImg, 0, 0, offsetx, offsety, frameWidth, frameHeight);
            return newSprite;
        }
    }
    exports.HtmlRectSprite = HtmlRectSprite;
    HtmlRectSprite.spriteDir = "../sprites/";
});
//# sourceMappingURL=html-rect-sprite.js.map