export class InventoryItemType {
    constructor(itemNumber:number, itemName:string, itemDescription:string){
        this.itemNumber = itemNumber;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
    }
    itemNumber:number = 0;
    itemName:string = "no name";
    itemDescription:string = "no description";
    itemSpriteName:string;

    static create(itemNumber:number, itemName:string, itemDescription:string)
    :InventoryItemType{
        let newItemType:InventoryItemType;
        newItemType = new InventoryItemType(itemNumber, itemName, itemDescription);
        return newItemType;
    }
}