define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.blue = void 0;
    function villager(game, x, y) {
        var villager = game.addEntity("villager");
        var component = villager.getComponent("position");
        component.x = x;
        component.y = y;
        component.vx = 0;
        return villager;
    }
    function blue(game, x, y) {
        const blue = villager(game, x, y);
        let ac = blue.getComponent("animation");
        ac.setSprite("bluecloak");
        return blue;
    }
    exports.blue = blue;
});
//# sourceMappingURL=character-builder.js.map