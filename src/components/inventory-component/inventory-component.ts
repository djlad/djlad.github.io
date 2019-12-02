import { Component } from "../../engine/component/component";
import { InventoryItem } from "./inventory-item";
import { InventoryItemRegistry } from "./item-registry";

export class InventoryComponent extends Component {
    constructor(itemRegistry:InventoryItemRegistry){
        super("inventory");
        this.itemRegistry = itemRegistry;
    }
    inventory:InventoryItem[] = [];
    itemRegistry:InventoryItemRegistry;

    registerItemType(itemName:string, itemSpriteName:string, description:string){
        this.itemRegistry.registerItemType(itemName, itemSpriteName, description);
    }
    addItem(itemName:string){

    }
    update(){}
    static create():InventoryComponent{
        let inventory:InventoryComponent;
        inventory = new InventoryComponent(InventoryItemRegistry.singletonCreate());
        return inventory;
    }
}