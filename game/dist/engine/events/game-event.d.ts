import { EventType } from "./EventType";
export declare class GameEvent {
    constructor(eventName: EventType, eventData: {}, componentTarget?: string);
    eventName: EventType;
    eventDescription: string;
    eventData: any;
    componentTarget: string;
    static create(eventName: EventType, eventData?: {}): GameEvent;
}
