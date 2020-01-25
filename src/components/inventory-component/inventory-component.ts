import { Component } from "../../engine/component/component";
import { InventoryItem } from "./inventory-item";
import { InventoryItemRegistry } from "./item-registry";
import { Entity } from "../../engine/entity/entity";
import { GiveItemEventData } from "./give-item-event-data";
import { InventoryItemType } from "./inventory-item-type";
import { GameEvent } from "../../engine/events/game-event";
import { EventType } from "../../engine/events/EventType";

export class InventoryComponent extends Component {
    constructor(itemRegistry:InventoryItemRegistry){
        super("inventory");
        this.itemRegistry = itemRegistry;
        this.itemSlots = new Array<InventoryItem>(10);

    }
    private inventory:{[key:string]:InventoryItem} = {};
    private itemSlots:InventoryItem[];
    private selectedItemSlot:number=0;
    private itemRegistry:InventoryItemRegistry;

    inventoryToString(){
        let inventoryString = "Inventory:";
        for(let i:number=0;i<this.itemSlots.length;i++){
            let item:InventoryItem;
            item = this.itemSlots[i];
            inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;

        }
        inventoryString += "\n<---------->";
        console.log(inventoryString);
    }

 
    selectItemSlot(itemSlotNumber:number) {
        this.selectedItemSlot = itemSlotNumber % this.itemSlots.length;
    }

    getSelectedItem():InventoryItem{
        return this.itemSlots[this.selectedItemSlot];
    }

    addItem(itemName:string, quantity:number=1):boolean{
        if(! (itemName in this.itemRegistry.itemTypes)){
            console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
            return false;
        }
        let itemType:InventoryItemType = this.itemRegistry.itemTypes[itemName];
        if(!(itemName in this.inventory)){
            this.inventory[itemName] = InventoryItem.create(itemType);
        }
        this.inventory[itemName].itemQuantity += quantity;
    }
    update(entity:Entity):void{
        let events:GameEvent[] = entity.targetedEvents;
        for(let i:number;i < events.length;i++){
            let event:GameEvent = events[i];
            this.handleEvents(event);
        }
    }

    private handleEvents(event:GameEvent):void{
    }

    static create():InventoryComponent{
        let inventory:InventoryComponent;
        inventory = new InventoryComponent(InventoryItemRegistry.singletonCreate());
        return inventory;
    }
}