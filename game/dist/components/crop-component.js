define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CropComponent = void 0;
    class CropComponent extends component_1.Component {
        constructor() {
            super("crop");
            this.timeSinceGrowth = 0;
            this.growthLengths = [5, 5, 5];
            this.growthStage = 0;
            this.cropName = "turnip";
            this.setCrop(this.cropName);
        }
        setSprites(sprites) {
            this.growthSprites = sprites;
            this.growthStage = 0;
        }
        isGrown() {
            return this.growthStage == this.growthSprites.length - 1;
        }
        setCrop(cropName) {
            var cropLength = 300;
            this.growthLengths = [cropLength, cropLength, cropLength];
            switch (cropName) {
                case "turnip":
                    this.growthSprites = ["turnip0", "turnip1", "turnip2"];
                    this.growthLengths = [cropLength, cropLength, cropLength];
                    break;
                case "corn":
                    this.growthSprites = ["corn0", "corn1", "corn2"];
                    this.growthLengths = [cropLength, cropLength, cropLength];
                    break;
                case "wheat":
                    this.growthSprites = ["wheat0", "wheat1", "wheat2"];
                    this.growthLengths = [cropLength, cropLength, cropLength];
                    break;
                case "pumpkin":
                    this.growthSprites = ["pumpkin0", "pumpkin1", "pumpkin2"];
                    this.growthLengths = [cropLength, cropLength, cropLength];
                    break;
                case "onion":
                    this.growthSprites = ["onion0", "onion1", "onion2", "onion3", "onion4", "onion5"];
                    this.growthLengths = [cropLength, cropLength, cropLength, cropLength, cropLength, cropLength];
                    break;
                case "tomato":
                    this.growthSprites = ["tomato0", "tomato1", "tomato2", "tomato3"];
                    this.growthLengths = [cropLength, cropLength, cropLength, cropLength];
                    break;
            }
            this.growthStage = 0;
            this.cropName = cropName;
        }
        update() {
            if (this.isGrown()) {
                return;
            }
            this.timeSinceGrowth++;
            var gs = this.growthStage;
            var gl = this.growthLengths[gs];
            if (this.timeSinceGrowth > gl) {
                this.growthStage = (this.growthStage + 1) % this.growthLengths.length;
                this.timeSinceGrowth = 0;
            }
        }
        ;
        static create() {
            return new CropComponent();
        }
        ;
    }
    exports.CropComponent = CropComponent;
});
//# sourceMappingURL=crop-component.js.map