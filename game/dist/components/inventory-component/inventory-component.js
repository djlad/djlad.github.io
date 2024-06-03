define(["require", "exports", "../../engine/component/component", "./inventory-item", "./item-registry"], function (require, exports, component_1, inventory_item_1, item_registry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryComponent = void 0;
    class InventoryComponent extends component_1.Component {
        constructor(itemRegistry) {
            super("inventory");
            this.inventory = {};
            this.itemSlots = [];
            this.selectedItemSlot = 0;
            this.inventoryItemEntities = [];
            this.itemRegistry = itemRegistry;
            this.itemSlots = new Array(10);
            for (let i = 0; i < this.itemSlots.length; i++) {
                let itemType = this.itemRegistry.itemTypes["nothing"];
                this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
            }
        }
        hashInventoryToString() {
            let inventoryString = "Inventory:";
            for (let i = 0; i < this.itemSlots.length; i++) {
                let item;
                item = this.itemSlots[i];
                inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;
            }
            inventoryString += "\n<---------->";
            console.log(inventoryString);
        }
        inventoryToString() {
            let inventoryString = "Inventory:";
            for (let i = 0; i < this.itemSlots.length; i++) {
                let item;
                item = this.itemSlots[i];
                inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;
            }
            inventoryString += "\n<---------->";
            console.log(inventoryString);
        }
        selectItemSlot(itemSlotNumber) {
            this.selectedItemSlot = itemSlotNumber % this.itemSlots.length;
        }
        getSelectedItem() {
            return this.itemSlots[this.selectedItemSlot];
        }
        addItemToHashTable(itemName, quantity = 1) {
            if (!(itemName in this.itemRegistry.itemTypes)) {
                console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
                return false;
            }
            let itemType = this.itemRegistry.itemTypes[itemName];
            if (!(itemName in this.inventory)) {
                this.inventory[itemName] = inventory_item_1.InventoryItem.create(itemType);
            }
            this.inventory[itemName].itemQuantity += quantity;
            return true;
        }
        getItems() {
            return this.itemSlots;
        }
        addItem(itemName, quantity = 1) {
            if (!(itemName in this.itemRegistry.itemTypes)) {
                console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
                return false;
            }
            for (let i = 0; i < this.itemSlots.length; i++) {
                let itemSlot = this.itemSlots[i];
                if (itemSlot.itemName == itemName) {
                    itemSlot.itemQuantity += quantity;
                    return true;
                }
            }
            for (let i = 0; i < this.itemSlots.length; i++) {
                let itemSlot = this.itemSlots[i];
                if (itemSlot.itemName == "nothing") {
                    let itemType = this.itemRegistry.itemTypes[itemName];
                    this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
                    this.itemSlots[i].itemQuantity = 1;
                    return;
                }
            }
            return true;
        }
        update(entity) {
            for (let i = 0; i < this.inventoryItemEntities.length; i++) {
                let inventoryItemEntity = this.inventoryItemEntities[i];
                let spriteComponent;
                spriteComponent = inventoryItemEntity.getComponent("animation");
                let item = this.itemSlots[i];
                let itemType = this.itemRegistry.itemTypes[item.itemName];
                spriteComponent.setSprite(itemType.itemSpriteName);
            }
        }
        handleEvents(event) {
        }
        static create() {
            let inventory;
            inventory = new InventoryComponent(item_registry_1.InventoryItemRegistry.singletonCreate());
            return inventory;
        }
    }
    exports.InventoryComponent = InventoryComponent;
});
//# sourceMappingURL=inventory-component.js.map