define(["require", "exports", "../engine/system/system", "../engine/renderers/render-options"], function (require, exports, system_1, render_options_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RenderSystem = void 0;
    class RenderSystem extends system_1.EntitySystem {
        constructor(renderer, game) {
            super(game);
            this.renderer = renderer;
            this.camera = game.gameDependencies.cameras;
        }
        static create(game) {
            let hr = game.renderer;
            return new RenderSystem(hr, game);
        }
        apply(args) {
            const entity = args.entity;
            if (entity.id == 0) {
                this.centerCameraOn(this.camera.center);
                this.renderer.cbox();
                this.renderTileSet(entity);
            }
            this.renderAnimationComponent(entity);
            this.renderText(entity);
            this.renderPrimitive(entity);
        }
        renderTileSet(entity) {
            let tileComp = entity.getComponent("tile");
            let tiles = tileComp.tiles;
            let options = new render_options_1.RenderOptions();
            options.flip = false;
            options.rotate = 0;
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles[i];
                let x = this.tileCoordToReal(tileComp.tileWidth, tile.tileX);
                let y = this.tileCoordToReal(tileComp.tileWidth, tile.tileY);
                tile.spriteIds.forEach((spriteId) => {
                    this.renderer.sprite(spriteId.spriteName, x, y, tileComp.tileWidth, tileComp.tileWidth + 1, spriteId.spriteNumber, options);
                });
            }
        }
        tileCoordToReal(tileWidth, coord) {
            return coord * tileWidth;
        }
        renderText(entity) {
            let p = entity.getComponent("position", true);
            let text = entity.getComponent("text", true);
            if (p == null || text == null)
                return;
            for (let i = 0; i < text.textPlacements.length; i++) {
                let tp = text.textPlacements[i];
                this.renderer.text(tp.textValue, p.x, p.y, 10);
            }
        }
        renderAnimationComponent(entity) {
            var a = entity.getComponent("animation", true);
            var p = entity.getComponent("position", true);
            if (a == null || p == null)
                return;
            var r = this.renderer;
            let options = new render_options_1.RenderOptions();
            options.flip = !p.faceRight;
            options.rotate = p.rotate;
            options.applyOffsets = p.applyOffsets;
            if (a.isFiltered) {
                r.spriteFilter(a.filter, Math.round(p.x), Math.round(p.y + p.h), p.width, p.height, a.getSpriteNumber(), options);
                return;
            }
            r.sprite(a.spriteName, Math.round(p.x), Math.round(p.y + p.h), p.width, p.height, a.getSpriteNumber(), options);
        }
        renderPrimitive(entity) {
            var primitive = entity.getComponent("primitive", true);
            var position = entity.getComponent("position", true);
            if (primitive == null || position == null)
                return;
            this.renderer.circle(Math.round(position.x), Math.round(position.y + position.h), 4);
        }
        centerCameraOn(position) {
            this.renderer.setOffset([position.x + position.vx, position.y + position.vy]);
        }
        applyEvents() { }
    }
    exports.RenderSystem = RenderSystem;
});
//# sourceMappingURL=render-system.js.map