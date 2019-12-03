import { Component } from "../../engine/component/component";
import { InventoryItem } from "./inventory-item";
import { InventoryItemRegistry } from "./item-registry";
import { Entity } from "../../engine/entity/entity";
import { GameEvent, EventType } from "../../engine/events/event-manager";
import { GiveItemEventData } from "./give-item-event-data";

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
    addItem(itemName:string, quantity:number=1){

    }
    update(entity:Entity):void{
        let events:GameEvent[] = entity.targetedEvents;
        for(let i:number;i < events.length;i++){
            let event:GameEvent = events[i];
            this.handleEvents(event);
        }
    }

    private handleEvents(event:GameEvent):void{
        switch(event.eventName){
            case EventType.giveItem:
                let eventData:GiveItemEventData = <GiveItemEventData>event.eventData;
                let itemName:string = eventData.itemName;
                let quantity:number = eventData.quantity;
                this.addItem(itemName, quantity);
            break;
        }
    }

    static create():InventoryComponent{
        let inventory:InventoryComponent;
        inventory = new InventoryComponent(InventoryItemRegistry.singletonCreate());
        return inventory;
    }
}