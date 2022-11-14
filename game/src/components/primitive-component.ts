import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";

export class PrimitiveComponent extends Component {
    update(entity: Entity): void {
    }
    public static create(): PrimitiveComponent {
        return new PrimitiveComponent("primitive");
    }
}