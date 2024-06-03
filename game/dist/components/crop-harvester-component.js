define(["require", "exports", "../engine/component/component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CropHarvesterComponent = void 0;
    class CropHarvesterComponent extends component_1.Component {
        constructor() {
            super(...arguments);
            this.harvesting = false;
            this.harvestTime = 0;
            this.timeItTakesToHarvest = 10;
        }
        startHarvest() {
            this.harvesting = true;
            this.harvestTime = this.timeItTakesToHarvest;
        }
        update(entity) {
            if (this.harvestTime > 0) {
                this.harvestTime -= 1;
            }
            else {
                this.harvesting = false;
            }
        }
        static create() {
            return new CropHarvesterComponent("cropHarvester");
        }
    }
    exports.CropHarvesterComponent = CropHarvesterComponent;
});
//# sourceMappingURL=crop-harvester-component.js.map