define(["require", "exports", "./html-canvas"], function (require, exports, html_canvas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlSprite = void 0;
    class HtmlSprite {
        constructor(fileName) {
            this.spriteDir = "../sprites/";
            this.frameCoordsCalculated = [];
            var spriteImg = new Image();
            spriteImg.src = this.spriteDir + fileName;
            this.sprite = spriteImg;
            spriteImg.onload = this.setFrameDimensions(this);
            this.ctx = html_canvas_1.HtmlCanvas.createSingleton().ctx;
        }
        getRGBs(spriteNumber) {
            throw new Error("Method not implemented.");
        }
        drawImage(spriteNumber, x, y, width, height) {
            let fc = this.frameCoords(spriteNumber);
        }
        setFrameDimensions(sprite) {
            return function () {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = sprite.sprite.width;
                canvas.height = sprite.sprite.height;
                context.drawImage(sprite.sprite, 0, 0);
                let pixelData = context.getImageData(0, 0, sprite.sprite.width, sprite.sprite.height);
                let averages = [];
                for (let i = 0; i < pixelData.data.length; i += 4) {
                    let average = (pixelData.data[i] + pixelData.data[i + 1] + pixelData.data[i + 2] + pixelData.data[i + 3]) / 3;
                    averages.push(average);
                }
                let frames = sprite.findFrames(averages, pixelData.width, pixelData.height);
                frames.forEach(f => {
                    f.sort();
                    let highestY = Math.floor(f[0] / pixelData.width);
                    let lowestY = Math.floor(f[f.length - 1] / pixelData.width);
                    let height = lowestY - highestY;
                });
            };
        }
        findFrames(averagedPixelData, width, height) {
            let stack = [];
            let claimed = new Set();
            let results = [];
            for (let i = 0; i < averagedPixelData.length; i++) {
                if (claimed.has(i))
                    continue;
                let average = averagedPixelData[i];
                if (average <= 0)
                    continue;
                stack.push(i);
                let nextResult = [i];
                while (stack.length > 0) {
                    if (stack.length > 60000)
                        break;
                    let pixelIndex = stack.pop();
                    let average = averagedPixelData[pixelIndex];
                    if (pixelIndex >= averagedPixelData.length)
                        continue;
                    if (pixelIndex < 0)
                        continue;
                    if (average <= 0)
                        continue;
                    if (claimed.has(pixelIndex))
                        continue;
                    claimed.add(pixelIndex);
                    nextResult.push(pixelIndex);
                    stack.push(pixelIndex + 1);
                    stack.push(pixelIndex - 1);
                    stack.push(pixelIndex + width);
                    stack.push(pixelIndex - width);
                }
                results.push(nextResult);
            }
            return results;
        }
        frameCoords(spriteNum) {
            return this.frameCoordsCalculated[spriteNum];
        }
        static create(fileName) {
            return new HtmlSprite(fileName);
        }
    }
    exports.HtmlSprite = HtmlSprite;
});
//# sourceMappingURL=html-sprite.js.map