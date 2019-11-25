import { Component } from "../../engine/component/component";

export class InventoryItem {
    constructor(){}
    itemNumber:number = 0;
    itemName:string = "no name";
    itemDescription:string = "no description";
}


export class InventoryComponent extends Component {
    constructor(){
        super("inventory");
    }
    inventory:InventoryItem[] = [];
    update(){}
    static create():InventoryComponent{
        return new InventoryComponent();
    }
}