import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
export declare class TransitionComponent extends Component {
    constructor();
    time: number;
    reference: ImageData;
    current: ImageData;
    targetAnimationName: string;
    targetSpriteNumber: number;
    target: ImageData;
    running: boolean;
    speed: number;
    update(entity: Entity): void;
    start(targetAnimationName: string, targetSpriteNumber: number, resetCurrent?: boolean): void;
    static create(): TransitionComponent;
}
