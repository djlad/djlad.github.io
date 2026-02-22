export declare class Swipe {
    offsetX: number;
    offsetY: number;
    rotateSpeed: number;
    speed: number;
    longWay: boolean;
    swipeToSpeed: number;
    private _rotate;
    private twopi;
    get rotate(): number;
    set rotate(value: number);
    constructor(rotate: number, offsetX: number, offsetY: number, rotateSpeed: number, speed?: number, longWay?: boolean, swipeToSpeed?: number);
    flip(): void;
    private flipRotate;
}
