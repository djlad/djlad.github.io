define(["require", "exports", "./pixi-engine-sprite"], function (require, exports, pixi_engine_sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PixieEngineCreator = void 0;
    class PixieEngineCreator {
        constructor(gameDependencies) {
            this.idToEngineSprite = {};
            this.gameDependencies = gameDependencies;
        }
        createEngineSprite(entityId) {
            if (entityId in this.idToEngineSprite)
                return this.idToEngineSprite[entityId];
            const entity = pixi_engine_sprite_1.PixieEngineSprite.create(this.gameDependencies);
            this.idToEngineSprite[entityId] = entity;
            return entity;
        }
        static create(gameDependencies) {
            return new PixieEngineCreator(gameDependencies);
        }
    }
    exports.PixieEngineCreator = PixieEngineCreator;
});
//# sourceMappingURL=pixie-engine-creator.js.map