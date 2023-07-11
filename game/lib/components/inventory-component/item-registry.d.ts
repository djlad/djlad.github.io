import { InventoryItemType } from "./inventory-item-type";
export declare class InventoryItemRegistry {
    constructor();
    itemTypes: {
        [key: string]: InventoryItemType;
    };
    registerItemType(itemName: string, itemSpriteName: string, description: string): void;
    private static singletonRegistry;
    static singletonCreate(): InventoryItemRegistry;
    private populateItems;
}
