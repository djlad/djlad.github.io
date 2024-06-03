define(["require", "exports", "./sprite-id"], function (require, exports, sprite_id_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tile = void 0;
    class Tile {
        constructor() {
            this.spriteIds = [];
        }
        static create(spriteName, spriteNumber, tileX, tileY) {
            let tile = new Tile();
            tile.spriteIds.push(sprite_id_1.SpriteId.create(spriteName, spriteNumber));
            tile.tileX = tileX;
            tile.tileY = tileY;
            return tile;
        }
    }
    exports.Tile = Tile;
});
//# sourceMappingURL=tile.js.map