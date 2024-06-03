define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryItem = void 0;
    class InventoryItem {
        constructor() {
            this.itemQuantity = 0;
            this.itemName = "no name";
            this.itemDescription = "no description";
            this.itemSlot = -1;
        }
        static create(itemType) {
            let item = new InventoryItem();
            item.itemName = itemType.itemName;
            item.itemDescription = itemType.itemDescription;
            return item;
        }
    }
    exports.InventoryItem = InventoryItem;
});
//# sourceMappingURL=inventory-item.js.map