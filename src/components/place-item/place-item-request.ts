export class PlaceItemRequest {
    constructor(entityName:string, coordinates:number[], quantity:number=1){
        this.entityName = entityName;
        this.coordinates = coordinates;
        this.quantity = quantity;
    }
    entityName:string;
    coordinates:number[];
    quantity:number = 1;
}