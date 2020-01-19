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
        this.tileSize = 100;
    }
    private tileSize:number;
    private static instance:PlaceItemComponent = null;
    public placeItemRequests:PlaceItemRequest[]=[];
    private realCoordinatesToTileCoordinates(coordinates:number[]):number[] {
        let tileCoords:number[] = coordinates.map((coordinate) => {
           return (coordinate % this.tileSize) * this.tileSize;
        });
        return tileCoords;
    }
    placeItem(entityName:string, coordinates:number[]=[0, 0], relative:boolean=true):void {
        let tileCoords:number[] = this.realCoordinatesToTileCoordinates(coordinates);
        let placeItemRequest:PlaceItemRequest;
        placeItemRequest = new PlaceItemRequest(entityName, coordinates, 1, relative=true);
        this.placeItemRequests.push(placeItemRequest);
    }
    
    update(entity: Entity): void {
        
    }

    static create():PlaceItemComponent {
        return new PlaceItemComponent();
    }

}