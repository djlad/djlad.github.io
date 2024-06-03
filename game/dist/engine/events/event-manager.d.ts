import { GameEvent } from "./game-event";
import { EventType } from "./EventType";
export declare class EventManager {
    constructor();
    keys: boolean[];
    keysReleased: boolean[];
    events: GameEvent[];
    callbacks: {
        [key: string]: ((event: GameEvent) => void)[];
    };
    touch: any;
    createKeyListener(): boolean[];
    update(): void;
    emit(eventName: EventType, eventData?: {}): void;
    fireCallbacks(): void;
    addListener(eventName: EventType, callback: (event: GameEvent) => void): void;
    createEvent(eventName: EventType): void;
    static create(): EventManager;
}
