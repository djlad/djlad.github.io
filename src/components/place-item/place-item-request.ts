import { Entity } from "../../engine/entity/entity";

export class PlaceItemRequest {
    constructor(entityName:string, coordinates:number[], quantity:number=1,
                successCallback:(entity:Entity)=>void, relative:boolean=true){
        this.entityName = entityName;
        this.coordinates = coordinates;
        this.quantity = quantity;
        this.successCallback = successCallback;
        this.relative = relative;
    }
    entityName:string;
    coordinates:number[];
    quantity:number;
    successCallback: (entity: Entity) => void;
    relative:boolean;
}