import { Entity } from "../../engine/entity/entity";
export declare class PlaceItemRequest {
    constructor(entityName: string, coordinates: number[], quantity: number, successCallback: (entity: Entity) => void, relative?: boolean);
    entityName: string;
    coordinates: number[];
    quantity: number;
    successCallback: (entity: Entity) => void;
    relative: boolean;
}
