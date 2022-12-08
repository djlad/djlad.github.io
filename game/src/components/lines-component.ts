import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";

export class LinesComponent extends Component {
    constructor(){
        super("lines");
    }
    targetIds: number[]
    update(entity: Entity): void {
    }
}