import { Component } from "../engine/component/component";
export declare class HealthComponent extends Component {
    constructor();
    health: number;
    update(): void;
    static create(): HealthComponent;
}
