define(["require", "exports", "../engine/system/system", "../engine/entity/entity", "../engine/events/EventType"], function (require, exports, system_1, entity_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CropSystem = void 0;
    class CropSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        shouldApply(entity) {
            return entity.getComponent("crop", true) != null && entity.getComponent("animation", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            var a = entity.getComponent("animation", true);
            var c = entity.getComponent("crop", true);
            if (c.timeSinceGrowth == 0 || c.timeSinceGrowth == 1) {
                a.setSprite(c.growthSprites[c.growthStage]);
            }
        }
        ;
        applyEvents(entity) {
            var c = entity.getComponent("crop", true);
            if (c == null)
                return;
            var event;
            for (var i = 0; i < entity.targetedEvents.length; i++) {
                event = entity.targetedEvents[i];
                this.handleEvent(event, entity);
            }
        }
        ;
        static create(game) {
            return new CropSystem(game);
        }
        ;
        handleCollision(event, entity) {
            if (!(event.eventData instanceof entity_1.Entity)) {
                return;
            }
            let collidedEntity = event.eventData;
            let cropHarvester;
            try {
                cropHarvester = collidedEntity.getComponent("cropHarvester");
            }
            catch (_a) {
                return;
            }
            if (!cropHarvester.harvesting) {
                return;
            }
            let crop = entity.getComponent("crop");
            let playerInventory;
            playerInventory = collidedEntity.getComponent("inventory");
            if (crop.isGrown()) {
                playerInventory.addItem(crop.cropName, 1);
            }
            this.game.destroy(entity);
        }
        handleEvent(event, entity) {
            switch (event.eventName) {
                case EventType_1.EventType.collision:
                    this.handleCollision(event, entity);
                    break;
            }
        }
    }
    exports.CropSystem = CropSystem;
});
//# sourceMappingURL=crop-system.js.map