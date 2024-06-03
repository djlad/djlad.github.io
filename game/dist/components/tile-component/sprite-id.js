define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteId = void 0;
    class SpriteId {
        static create(spriteName, spriteNumber) {
            const spriteId = new SpriteId();
            spriteId.spriteName = spriteName;
            spriteId.spriteNumber = spriteNumber;
            return spriteId;
        }
    }
    exports.SpriteId = SpriteId;
});
//# sourceMappingURL=sprite-id.js.map