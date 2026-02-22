define(["require", "exports", "../engine/system/system"], function (require, exports, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventorySystem = void 0;
    class InventorySystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
        }
        static create(game) {
            return new InventorySystem(game);
        }
        shouldApply(entity) {
            return entity.getComponent("inventory") != null && entity.getComponent("position") != null;
        }
        apply(args) {
            const entity = args.entity;
            let inventory = entity.getComponent("inventory", true);
            let entityPosition = entity.getComponent("position", true);
            if (inventory.inventoryItemEntities.length == 0) {
                for (let i = 0; i < 10; i++) {
                    inventory
                        .inventoryItemEntities
                        .push(this.game.addEntity("inventoryItem"));
                }
            }
            let itemSlots = inventory.getItems();
            for (let i = 0; i < inventory.inventoryItemEntities.length; i++) {
                let inventoryItem;
                let itemPosition;
                inventoryItem = inventory.inventoryItemEntities[i];
                itemPosition = inventoryItem.getComponent("position");
                if (itemPosition == null) {
                    console.log("Warning: inventory item lost position component");
                    continue;
                }
                itemPosition.x = entityPosition.x - 4 * 100 - 50 + i * 100 + entityPosition.vx;
                itemPosition.y = entityPosition.y + 350 + entityPosition.vy;
                itemPosition.x -= entityPosition.vx;
                itemPosition.y -= entityPosition.vy;
                let text = inventoryItem.getComponent("text");
                if (itemSlots[i].itemQuantity != 0) {
                    text.setText(itemSlots[i].itemQuantity.toString());
                }
            }
        }
        applyEvents(entity) {
        }
    }
    exports.InventorySystem = InventorySystem;
});
//# sourceMappingURL=inventory-system.js.map