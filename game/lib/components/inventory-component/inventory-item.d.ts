import { InventoryItemType } from "./inventory-item-type";
export declare class InventoryItem {
    constructor();
    itemQuantity: number;
    itemName: string;
    itemDescription: string;
    itemSlot: number;
    static create(itemType: InventoryItemType): InventoryItem;
}
