import { InventoryItemType } from "./inventory-item-type";

export class InventoryItem {
    constructor(){}
    itemQuantity:number = 0;
    itemName:string = "no name";
    itemDescription:string = "no description";

    static create(itemType:InventoryItemType):InventoryItem{
        let item = new InventoryItem();
        item.itemName = itemType.itemName;
        item.itemDescription = itemType.itemDescription;
        return item;
    }
}