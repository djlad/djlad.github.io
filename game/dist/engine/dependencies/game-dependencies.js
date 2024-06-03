define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameDependencies = void 0;
    class GameDependencies {
        constructor() {
            this.engineCreator = null;
            this.imgMetaData = null;
            this.componentFactory = null;
            this.entityFactory = null;
            this.renderer = null;
            this.eventManager = null;
            this.spriteManager = null;
            this.cameras = null;
        }
        checkDependency(gameDependency) {
            if (gameDependency == null) {
                console.error(`Dependency was requested but it was null`);
            }
        }
    }
    exports.GameDependencies = GameDependencies;
});
//# sourceMappingURL=game-dependencies.js.map