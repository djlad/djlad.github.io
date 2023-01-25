import { Component } from "../../engine/component/component";
import { InventoryItem } from "./inventory-item";
import { InventoryItemRegistry } from "./item-registry";
import { Entity } from "../../engine/entity/entity";
import { GiveItemEventData } from "./give-item-event-data";
import { InventoryItemType } from "./inventory-item-type";
import { GameEvent } from "../../engine/events/game-event";
import { EventType } from "../../engine/events/EventType";
import { InventoryItemEntity } from "../../entities/inventory-item-entity";
import { AnimationComponent } from "../animation-component";
import { TextComponent } from "../text-component/text-component";

export class InventoryComponent extends Component {
    constructor(itemRegistry:InventoryItemRegistry){
        super("inventory");
        this.itemRegistry = itemRegistry;
        this.itemSlots = new Array<InventoryItem>(10);
        for(let i:number=0;i<this.itemSlots.length;i++){
            let itemType:InventoryItemType = this.itemRegistry.itemTypes["nothing"];
            this.itemSlots[i] = InventoryItem.create(itemType);
        }

    }
    private inventory:{[key:string]:InventoryItem} = {};
    private itemSlots:InventoryItem[] = [];
    private selectedItemSlot:number=0;
    private itemRegistry:InventoryItemRegistry;
    inventoryItemEntities:Entity[] = [];//inventory item entities that appear on screen

    hashInventoryToString():void{
        let inventoryString:string = "Inventory:";
        for(let i:number=0;i<this.itemSlots.length;i++){
            let item:InventoryItem;
            item = this.itemSlots[i];
            inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;
        }
        inventoryString += "\n<---------->";
        console.log(inventoryString);
    }

    inventoryToString():void{
        let inventoryString:string = "Inventory:";
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

    addItemToHashTable(itemName:string, quantity:number=1):boolean{
        if(! (itemName in this.itemRegistry.itemTypes)){
            console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
            return false;
        }
        let itemType:InventoryItemType = this.itemRegistry.itemTypes[itemName];
        if(!(itemName in this.inventory)){
            this.inventory[itemName] = InventoryItem.create(itemType);
        }
        this.inventory[itemName].itemQuantity += quantity;
        return true;
    }

    getItems():InventoryItem[]{
        return this.itemSlots;
    }

    addItem(itemName:string, quantity:number=1):boolean {
        if(! (itemName in this.itemRegistry.itemTypes)){
            console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
            return false;
        }
        for(let i:number=0;i<this.itemSlots.length;i++) {
            let itemSlot:InventoryItem = this.itemSlots[i];
            if (itemSlot.itemName == itemName) {
                itemSlot.itemQuantity += quantity;
                return true;
            }
        }
        for(let i:number=0;i<this.itemSlots.length;i++) {
            let itemSlot:InventoryItem = this.itemSlots[i];
            if (itemSlot.itemName == "nothing") {
                let itemType:InventoryItemType = this.itemRegistry.itemTypes[itemName]
                this.itemSlots[i] = InventoryItem.create(itemType);
                this.itemSlots[i].itemQuantity = 1;
                return;
            }
        }
        
        return true;
    }
    update(entity:Entity):void{
        for(let i:number=0;i<this.inventoryItemEntities.length;i++){
            let inventoryItemEntity = this.inventoryItemEntities[i];
            let spriteComponent:AnimationComponent;
            spriteComponent = <AnimationComponent>inventoryItemEntity.getComponent("animation");
            let item:InventoryItem = this.itemSlots[i];
            let itemType:InventoryItemType = this.itemRegistry.itemTypes[item.itemName];
            spriteComponent.setSprite(itemType.itemSpriteName);
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