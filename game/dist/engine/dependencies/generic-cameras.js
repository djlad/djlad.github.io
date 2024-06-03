define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericCameras = void 0;
    class GenericCameras {
        constructor() {
            this.halfWindowWidth = window.innerWidth / 2;
            this.halfWindowHeight = window.innerHeight / 2;
        }
        getOffsetX() {
            var _a, _b;
            return ((_b = (_a = this.center) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0) - this.halfWindowWidth;
        }
        getOffsetY() {
            var _a, _b;
            return ((_b = (_a = this.center) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0) - this.halfWindowHeight;
        }
        transformX(x) {
            return x - this.getOffsetX();
        }
        transformY(y) {
            return y - this.getOffsetY();
        }
        untransformX(x) {
            var _a, _b;
            return x + (((_b = (_a = this.center) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0) - this.halfWindowWidth);
        }
        untransformY(y) {
            var _a, _b;
            return y + (((_b = (_a = this.center) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0) - this.halfWindowHeight);
        }
        setMainCamera(positionComponent) {
            this.center = positionComponent;
        }
        static create() {
            return new GenericCameras();
        }
    }
    exports.GenericCameras = GenericCameras;
});
//# sourceMappingURL=generic-cameras.js.map