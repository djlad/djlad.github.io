export class PlaceItemRequest {
    constructor(entityName:string, coordinates:number[], quantity:number=1, relative:boolean=true){
        this.entityName = entityName;
        this.coordinates = coordinates;
        this.quantity = quantity;
        this.relative = relative;
    }
    entityName:string;
    coordinates:number[];
    quantity:number;
    relative:boolean;
}