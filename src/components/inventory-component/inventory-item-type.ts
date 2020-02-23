export class InventoryItemType {
    constructor(itemName:string, itemDescription:string, itemSpriteName:string){
        InventoryItemType.largestItemId += 1;
        this.itemId = InventoryItemType.largestItemId;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemSpriteName = itemSpriteName;
    }
    static largestItemId:number = -1;
    itemId:number = -1;
    itemName:string = "no name";
    itemDescription:string = "no description";
    itemSpriteName:string;

    static create(itemName:string, itemSpriteName:string, itemDescription:string)
    :InventoryItemType{
        let newItemType:InventoryItemType;
        newItemType = new InventoryItemType(itemName, itemDescription, itemSpriteName);
        return newItemType;
    }
}