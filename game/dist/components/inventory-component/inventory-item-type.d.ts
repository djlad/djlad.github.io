export declare class InventoryItemType {
    constructor(itemName: string, itemDescription: string, itemSpriteName: string);
    static largestItemId: number;
    itemId: number;
    itemName: string;
    itemDescription: string;
    itemSpriteName: string;
    static create(itemName: string, itemSpriteName: string, itemDescription: string): InventoryItemType;
}
