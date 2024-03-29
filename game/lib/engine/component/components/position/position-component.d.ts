import { Component } from "../../component";
import { Entity } from "../../../entity/entity";
import { EntityUpdateArgs } from "../../../entity/entity-update-args";
import { IPositionComponent } from "./iposition-component";
export declare class PositionComponent extends Component implements IPositionComponent {
    constructor();
    private _vx;
    get vx(): number;
    set vx(vx: number);
    private _vy;
    get vy(): number;
    set vy(vy: number);
    private _rotate;
    get rotate(): number;
    set rotate(radiansToRotate: number);
    x: number;
    y: number;
    h: number;
    width: number;
    height: number;
    faceRight: boolean;
    faceX: number;
    faceY: number;
    moved: boolean;
    applyOffsets: boolean;
    update(entity: Entity, args: EntityUpdateArgs): void;
    static create(): PositionComponent;
    pivotX: number;
    pivotY: number;
    anchorX: number;
    anchorY: number;
}
