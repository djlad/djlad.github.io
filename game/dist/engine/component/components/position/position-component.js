define(["require", "exports", "../../component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PositionComponent = void 0;
    class PositionComponent extends component_1.Component {
        constructor() {
            super("position");
            this._vx = 0;
            this._vy = 0;
            this._rotate = 0;
            this.x = 0;
            this.y = 0;
            this.h = 0;
            this.width = 100;
            this.height = 100;
            this.faceRight = true;
            this.faceX = 0;
            this.faceY = 0;
            this.moved = false;
            this.applyOffsets = true;
            this.pivotX = .5;
            this.pivotY = 1;
            this.anchorX = .5;
            this.anchorY = 1;
        }
        get vx() {
            return this._vx;
        }
        set vx(vx) {
            this._vx = vx;
            if (vx == 0) {
                if (this.faceY !== 0) {
                    this.faceX = vx;
                }
            }
            else {
                this.faceX = vx;
                if (this.faceY !== 0 && this.vy == 0) {
                    this.faceY = 0;
                }
            }
        }
        get vy() {
            return this._vy;
        }
        set vy(vy) {
            this._vy = vy;
            if (vy == 0) {
                if (this.faceX !== 0) {
                    this.faceY = vy;
                }
            }
            else {
                this.faceY = vy;
                if (this.faceX !== 0 && this.vx == 0) {
                    this.faceX = 0;
                }
            }
        }
        get rotate() {
            return this._rotate;
        }
        set rotate(radiansToRotate) {
            this._rotate = radiansToRotate % (2 * Math.PI);
        }
        update(entity, args) {
            const delta = args.delta;
            this.x += this.vx * delta;
            this.y += this.vy * delta;
            this.moved = !(this.vx == 0 && this.vy == 0);
        }
        static create() {
            return new PositionComponent();
        }
    }
    exports.PositionComponent = PositionComponent;
});
//# sourceMappingURL=position-component.js.map