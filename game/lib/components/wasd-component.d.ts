import { Component } from "../engine/component/component";
export declare class WasdComponent extends Component {
    constructor();
    speed: number;
    dashSpeed: number;
    dashingTime: number;
    maxDashingTime: number;
    dashing: boolean;
    dashWidth: number;
    dashHeight: number;
    dashSprite: string;
    dashSpriteNumber: number;
    sprite: string;
    walkSprite: string;
    startDashing(): void;
    update(): void;
    static create(): WasdComponent;
}
