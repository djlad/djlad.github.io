define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryItemType = void 0;
    class InventoryItemType {
        constructor(itemName, itemDescription, itemSpriteName) {
            this.itemId = -1;
            this.itemName = "no name";
            this.itemDescription = "no description";
            InventoryItemType.largestItemId += 1;
            this.itemId = InventoryItemType.largestItemId;
            this.itemName = itemName;
            this.itemDescription = itemDescription;
            this.itemSpriteName = itemSpriteName;
        }
        static create(itemName, itemSpriteName, itemDescription) {
            let newItemType;
            newItemType = new InventoryItemType(itemName, itemDescription, itemSpriteName);
            return newItemType;
        }
    }
    exports.InventoryItemType = InventoryItemType;
    InventoryItemType.largestItemId = -1;
});
//# sourceMappingURL=inventory-item-type.js.map