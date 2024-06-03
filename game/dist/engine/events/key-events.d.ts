import { EventType } from "./EventType";
export declare class KeyEvents {
    downKey: EventType;
    upKey: EventType;
    keyCode: number;
    constructor(downKey: EventType, upKey: EventType, keyCode: number);
    static create(controlEvent: EventType, controlReleaseEvent: EventType, controlKeyNumber: number): KeyEvents;
}
export declare let keyEvents: KeyEvents[];
