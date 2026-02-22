define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Swipe = void 0;
    class Swipe {
        get rotate() {
            return this._rotate;
        }
        set rotate(value) {
            this._rotate = ((value % this.twopi) + this.twopi) % this.twopi;
        }
        constructor(rotate, offsetX, offsetY, rotateSpeed, speed = 0, longWay = false, swipeToSpeed = 0) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.rotateSpeed = rotateSpeed;
            this.speed = speed;
            this.longWay = longWay;
            this.swipeToSpeed = swipeToSpeed;
            this._rotate = 0;
            this.twopi = Math.PI * 2;
            this.rotate = rotate;
        }
        flip() {
            this.rotate = this.flipRotate(this.rotate);
            this.offsetX *= -1;
            this.rotateSpeed *= -1;
            this.swipeToSpeed *= -1;
        }
        flipRotate(rotate) {
            return Math.PI * .5 - rotate;
        }
    }
    exports.Swipe = Swipe;
});
//# sourceMappingURL=swipe.js.map