define(["require", "exports", "./inventory-item-type"], function (require, exports, inventory_item_type_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryItemRegistry = void 0;
    class InventoryItemRegistry {
        constructor() {
            this.itemTypes = {};
        }
        registerItemType(itemName, itemSpriteName, description) {
            let newItemType;
            newItemType = new inventory_item_type_1.InventoryItemType(itemName, description, itemSpriteName);
            if (itemName in this.itemTypes) {
                throw "error: item type: " + itemName + " already exists";
            }
            this.itemTypes[itemName] = newItemType;
        }
        static singletonCreate() {
            if (this.singletonRegistry)
                return this.singletonRegistry;
            let itemRegistry = new InventoryItemRegistry();
            this.singletonRegistry = itemRegistry;
            this.singletonRegistry.populateItems();
            return this.singletonRegistry;
        }
        populateItems() {
            this.registerItemType("wheat", "wheat2", "its a wheat");
            this.registerItemType("onion", "onion5", "its an onion");
            this.registerItemType("corn", "corn2", "its corn");
            this.registerItemType("pumpkin", "pumpkin2", "its a pumpkin");
            this.registerItemType("turnip", "turnip2", "its a turnip");
            this.registerItemType("nothing", "nothing", "nothing");
        }
    }
    exports.InventoryItemRegistry = InventoryItemRegistry;
});
//# sourceMappingURL=item-registry.js.map