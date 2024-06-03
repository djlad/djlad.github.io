import { Component } from "../../engine/component/component";
import { InventoryItem } from "./inventory-item";
import { InventoryItemRegistry } from "./item-registry";
import { Entity } from "../../engine/entity/entity";
export declare class InventoryComponent extends Component {
    constructor(itemRegistry: InventoryItemRegistry);
    private inventory;
    private itemSlots;
    private selectedItemSlot;
    private itemRegistry;
    inventoryItemEntities: Entity[];
    hashInventoryToString(): void;
    inventoryToString(): void;
    selectItemSlot(itemSlotNumber: number): void;
    getSelectedItem(): InventoryItem;
    addItemToHashTable(itemName: string, quantity?: number): boolean;
    getItems(): InventoryItem[];
    addItem(itemName: string, quantity?: number): boolean;
    update(entity: Entity): void;
    private handleEvents;
    static create(): InventoryComponent;
}
