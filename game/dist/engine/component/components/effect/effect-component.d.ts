import { Component } from "../../component";
import { Entity } from "../../../entity/entity";
export declare class EffectComponent extends Component {
    targets: Entity[];
    addTarget(targetEntity: Entity): void;
    update(entity: Entity): void;
}
