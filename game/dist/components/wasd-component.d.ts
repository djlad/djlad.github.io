import { Component } from "../engine/component/component";
export declare class WasdComponent extends Component {
    constructor();
    speed: number;
    sprite: string;
    walkSprite: string;
    update(): void;
    static create(): WasdComponent;
}
