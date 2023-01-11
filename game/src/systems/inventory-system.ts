import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";
import { InventoryComponent } from "../components/inventory-component/inventory-component";
import { InventoryItemEntity } from "../entities/inventory-item-entity";
import { PositionComponent } from "../components/position-component";
import { TextComponent } from "../components/text-component/text-component";
import { InventoryItem } from "../components/inventory-component/inventory-item";
import { SystemArgs } from "../engine/system/system-args";

export class InventorySystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
    static create(game:Game) {
        return new InventorySystem(game);
    }

    apply(args:SystemArgs):void{
        const entity = args.entity;
        let inventory:InventoryComponent = <InventoryComponent>entity.getComponent("inventory", true);
        let entityPosition:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if(inventory == null)return;
        if(entityPosition == null)return;
        if(inventory.inventoryItemEntities.length == 0){
            for(let i:number=0;i<10;i++){
                inventory
                .inventoryItemEntities
                .push(this.game.addEntity("inventoryItem"));
            }
        }
        let itemSlots:InventoryItem[] = inventory.getItems();
        for(let i:number=0;i<inventory.inventoryItemEntities.length;i++){
            let inventoryItem:InventoryItemEntity;
            let itemPosition:PositionComponent;
            inventoryItem = inventory.inventoryItemEntities[i];
            itemPosition = <PositionComponent>inventoryItem.getComponent("position");
            if(itemPosition == null){
                console.log("Warning: inventory item lost position component");
                continue;
            }
            itemPosition.x = entityPosition.x - 4*100 - 50 + i * 100 + entityPosition.vx;
            itemPosition.y = entityPosition.y + 350 + entityPosition.vy;
            itemPosition.x -= entityPosition.vx;
            itemPosition.y -= entityPosition.vy;
            
            let text:TextComponent = <TextComponent>inventoryItem.getComponent("text");
            if(itemSlots[i].itemQuantity != 0 ){
                text.setText(itemSlots[i].itemQuantity.toString());
            }
        }
    }

    applyEvents(entity:Entity):void{

    }
}