import { Component } from "../engine/component/component";
export declare class ProjectileComponent extends Component {
    constructor();
    lifeSpan: number;
    shooterId: number;
    update(): void;
    static create(): ProjectileComponent;
}
