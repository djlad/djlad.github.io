define(["require", "exports", "../../renderers/render-options", "../../system/system"], function (require, exports, render_options_1, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserRenderSystem = void 0;
    class PhaserRenderSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        static create(game) {
            return new PhaserRenderSystem(game);
        }
        apply(args) {
            this.setPhaserAnimations(args.entity);
        }
        renderTileSet(entity) {
        }
        tileCoordToReal(tileWidth, coord) {
            return coord * tileWidth;
        }
        renderText(entity) {
        }
        setPhaserAnimations(entity) {
            var a = entity.getComponent("animation", true);
            var p = entity.getComponent("position", true);
            if (a == null || p == null)
                return;
            if (!a.animationNameUpdated)
                return;
            a.animationNameUpdated = false;
            let options = new render_options_1.RenderOptions();
            if ((p === null || p === void 0 ? void 0 : p.phaserObject) == null)
                return;
            p.phaserObject.anims.play(a.animationName);
            p.phaserObject.displayWidth = p.width;
            p.phaserObject.displayHeight = p.height;
        }
        renderPrimitive(entity) {
        }
        centerCameraOn(entity) {
        }
        applyEvents() { }
    }
    exports.PhaserRenderSystem = PhaserRenderSystem;
});
//# sourceMappingURL=phaser-render-system.js.map