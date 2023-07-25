import { Component } from '../engine/component/component';
import { Entity } from '../engine/entity/entity';
export declare class FightComponent extends Component {
    constructor();
    target: Entity;
    attack: boolean;
    maxSpeed: number;
    range: number;
    reloadTime: number;
    reloadTimer: number;
    attackTarget(): void;
    canFire(): boolean;
    update(): void;
    static create(): FightComponent;
}
