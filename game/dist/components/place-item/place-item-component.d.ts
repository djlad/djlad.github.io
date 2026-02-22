import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import { PlaceItemRequest } from "./place-item-request";
export declare class PlaceItemComponent extends Component {
    constructor();
    placeItemRequests: PlaceItemRequest[];
    placeItem(entityName: string, coordinates: number[], successCallback: (entity: Entity) => void, relative?: boolean): void;
    update(entity: Entity): void;
    static create(): PlaceItemComponent;
}
