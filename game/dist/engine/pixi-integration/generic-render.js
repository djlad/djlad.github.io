define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericRenderer = void 0;
    class GenericRenderer {
        constructor() { }
        spriteFilter(filter, x, y, width, height, spriteNumber, options) {
        }
        cbox() {
        }
        getOffset() {
            return [0, 0];
        }
        setOffset(offset) {
        }
        sprite(spriteName, x, y, width, height, spriteNumber, options) {
        }
        text(text, x, y, size) {
        }
        circle(x, y, r) {
        }
        line(x1, y1, x2, y2) {
        }
        static create() {
            return new GenericRenderer();
        }
    }
    exports.GenericRenderer = GenericRenderer;
});
//# sourceMappingURL=generic-render.js.map