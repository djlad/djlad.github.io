import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
export declare class ClickableComponent extends Component {
    constructor();
    update(entity: Entity): void;
    private callback;
    addListener(callback: () => void): void;
    click(): void;
    static create(): ClickableComponent;
}
