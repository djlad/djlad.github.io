import { Component } from "../engine/component/component";

export class InventoryItem {
    itemNumber:number = 0;
    constructor(){
    }
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