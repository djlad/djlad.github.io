import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import { InventoryComponent } from "../inventory-component/inventory-component";
import { PlaceItemRequest } from "./place-item-request";
/**
 * Allows the user to place items. Items can only be placed on tiles.
 * Tiles are squares of side length this.tileSize. Place item requests
 * describe what item to place and where to place it.
 * PlaceItemSystem will read the requests and do the actual placing
 */
export class PlaceItemComponent extends Component {
    constructor(){
        super("placeItem");
    }
    public placeItemRequests:PlaceItemRequest[]=[];
    placeItem(  entityName:string, coordinates:number[]=[0, 0],
                successCallback:(entity:Entity)=>void, relative:boolean=true):void {
        let placeItemRequest:PlaceItemRequest;
        placeItemRequest = new PlaceItemRequest(entityName, coordinates, 1, successCallback, relative=true);
        this.placeItemRequests.push(placeItemRequest);
    }
    
    update(entity: Entity): void {
        
    }

    static create():PlaceItemComponent {
        return new PlaceItemComponent();
    }

}