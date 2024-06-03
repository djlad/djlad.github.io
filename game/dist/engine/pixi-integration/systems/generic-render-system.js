define(["require", "exports", "../../events/EventType", "../../system/system", "../pixi-game"], function (require, exports, EventType_1, system_1, pixi_game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericRenderSystem = void 0;
    class GenericRenderSystem extends system_1.EntitySystem {
        constructor(game, entityId) {
            super(game);
            this.oncePerLoop = (args) => {
                const first = args.entity;
                const tiles = first.getComponent("tile");
                this.pixieGame.renderTiles(tiles, this.cameras);
            };
            const deps = this.game.gameDependencies;
            deps.checkDependency(deps.engineCreator);
            this.creator = deps.engineCreator;
            deps.checkDependency(deps.cameras);
            this.cameras = deps.cameras;
            game.eventManager.addListener(EventType_1.EventType.entityMoved, (event) => {
                const newX = event.eventData.x;
                const newY = event.eventData.y;
                const entityId = event.eventData.entityId;
                const sprite = this.creator.createEngineSprite(entityId.toString());
                sprite.x = this.cameras.transformX(newX);
                sprite.y = this.cameras.transformY(newY);
            });
            this.pixieGame = pixi_game_1.PixiGame.createSingleton(game.gameDependencies);
        }
        apply(args) {
        }
        ;
        applyEvents(entity, eventManager) {
        }
        static create(game, entityId) {
            return new GenericRenderSystem(game, entityId);
        }
        ;
    }
    exports.GenericRenderSystem = GenericRenderSystem;
});
//# sourceMappingURL=generic-render-system.js.map