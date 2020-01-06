import { InventoryItemType } from "./inventory-item-type";


export class InventoryItemRegistry {
    constructor(){}
    itemTypes:{[key:string]:InventoryItemType}={};
    registerItemType(itemName:string, itemSpriteName:string, description:string){
        let newItemType:InventoryItemType;
        newItemType = new InventoryItemType(itemName, itemSpriteName, description);
        if (itemName in this.itemTypes){
            throw "error: item type: " + itemSpriteName+ " already exists";
        }
        this.itemTypes[itemName] = newItemType;
    }

    private static singletonRegistry:InventoryItemRegistry;

    static singletonCreate():InventoryItemRegistry{
        if(this.singletonRegistry)return this.singletonRegistry;
        let itemRegistry:InventoryItemRegistry = new InventoryItemRegistry();
        this.singletonRegistry = itemRegistry;
        this.singletonRegistry.populateItems();
        return this.singletonRegistry;
    }

    private populateItems():void{
        this.registerItemType("wheat", "wheat2", "its a wheat");
        this.registerItemType("onion", "onion5", "its an onion");
        this.registerItemType("corn", "corn2", "its corn");
        this.registerItemType("pumpkin", "pumpkin2", "its a pumpkin");
        this.registerItemType("turnip", "turnip2", "its a turnip");
    }
}