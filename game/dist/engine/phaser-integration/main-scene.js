define(["require", "exports", "phaser"], function (require, exports, phaser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainScene = void 0;
    class MainScene extends phaser_1.Scene {
        constructor() {
            super({ key: "main" });
            this.updater = () => { };
            this.creators = [];
            this.loaders = [];
        }
        setUpdater(updateFunction) {
            this.updater = updateFunction;
        }
        addCreator(creator) {
            this.creators.push(creator);
        }
        addPreloader(loader) {
            this.loaders.push(loader);
        }
        preload() {
            console.log("loading " + this.loaders.length);
            this.loaders.forEach((loader) => {
                loader(this);
            });
        }
        create() {
            console.log(`creating main scene with ${this.creators.length} creators`);
            this.creators.forEach((creator) => { creator(this); });
        }
        update(time, delta) {
            this.updater(delta);
        }
    }
    exports.MainScene = MainScene;
});
//# sourceMappingURL=main-scene.js.map