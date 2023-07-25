import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
export declare class LinesComponent extends Component {
    constructor();
    targetIds: number[];
    update(entity: Entity): void;
}
