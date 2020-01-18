import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
import { InventoryComponent } from "./inventory-component/inventory-component";

export class PlaceItemComponent extends Component {
    constructor(){
        super("placeItem");
        this.tileSize = 20;
    }
    private tileSize:number;
    private static instance:PlaceItemComponent = null;

    realCoordinatesToTileCoordinates(coordinates:number[]):number[] {
        let tileCoords:number[] = coordinates.map((coordinate) => {
           return (coordinate % this.tileSize) * this.tileSize;
        });
        return tileCoords;
    }
    placeItem():void {
        
    }
    
    update(entity: Entity): void {
        
    }

    static create():PlaceItemComponent {
        return new PlaceItemComponent();
    }

}