import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
export declare class PrimitiveComponent extends Component {
    update(entity: Entity): void;
    static create(): PrimitiveComponent;
}
