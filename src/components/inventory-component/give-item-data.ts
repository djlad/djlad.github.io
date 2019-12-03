export class GiveItemData{
    constructor(itemName:string, quantity:number){
        this.itemName=itemName;
        this.quantity = quantity;
    }
    itemName:string;
    quantity:number;
}