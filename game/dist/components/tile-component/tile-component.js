define(["require", "exports", "../../engine/component/component", "./tile"], function (require, exports, component_1, tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TileComponent = void 0;
    class TileComponent extends component_1.Component {
        constructor() {
            super("tile");
            this.tileWidth = 64;
            this.tiles = [];
            this.tilesByCoords = {};
            this.tileSpriteNames = ["grass", "soil"];
        }
        update(entity) {
        }
        addTile(tile) {
            this.tiles.push(tile);
            const yToTile = this.tilesByCoords[tile.tileX];
            if (yToTile == null) {
                this.tilesByCoords[tile.tileX] = {};
            }
            this.tilesByCoords[tile.tileX][tile.tileY] = tile;
        }
        static create() {
            let tc = new TileComponent();
            let spriteName = "grass";
            let mapWidth = 200;
            let centerOffset = mapWidth / 2 - 5;
            let xlow = 4;
            let xhigh = xlow + 6;
            let ylow = 3;
            let yhigh = ylow + 6;
            for (let i = 0; i < mapWidth * mapWidth; i++) {
                let x = i % mapWidth - centerOffset;
                let y = Math.floor(i / mapWidth) - centerOffset;
                if (x >= xlow && x <= xhigh && y >= ylow && y <= yhigh) {
                    if (x == xlow && y == ylow)
                        tc.addTile(tile_1.Tile.create("soil", 6, x, y));
                    else if (x == xhigh && y == ylow)
                        tc.addTile(tile_1.Tile.create("soil", 8, x, y));
                    else if (x == xlow && y == yhigh)
                        tc.addTile(tile_1.Tile.create("soil", 12, x, y));
                    else if (x == xhigh && y == yhigh)
                        tc.addTile(tile_1.Tile.create("soil", 14, x, y));
                    else if (x == xlow)
                        tc.addTile(tile_1.Tile.create("soil", 9, x, y));
                    else if (x == xhigh)
                        tc.addTile(tile_1.Tile.create("soil", 11, x, y));
                    else if (y == ylow)
                        tc.addTile(tile_1.Tile.create("soil", 7, x, y));
                    else if (y == yhigh)
                        tc.addTile(tile_1.Tile.create("soil", 13, x, y));
                    else
                        tc.addTile(tile_1.Tile.create("soil", 10, x, y));
                    continue;
                }
                tc.addTile(tile_1.Tile.create(spriteName, 14 + Math.ceil(Math.random() * 3), x, y));
            }
            return tc;
        }
        createBuilder() {
            let tileSetSpriteNames = ["grass", "soil"];
        }
        removeTiles() {
            this.tiles = [];
            this.tilesByCoords = {};
        }
        coordToTile(x, y) {
            let tileX = Math.floor((x + .5 * this.tileWidth) / this.tileWidth);
            let tileY = Math.ceil(y / this.tileWidth);
            const yToTile = this.tilesByCoords[tileX];
            if (yToTile == null)
                return [];
            const tile = yToTile[tileY];
            if (tile == null) {
                return [];
            }
            return [tile];
        }
        tileCoordToReal(coord) {
            return coord * this.tileWidth;
        }
    }
    exports.TileComponent = TileComponent;
});
//# sourceMappingURL=tile-component.js.map