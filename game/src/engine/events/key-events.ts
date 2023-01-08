import { EventType } from "./EventType";

export class KeyEvents
{
    downKey: EventType;
    upKey: EventType;
    keyCode: number;
    constructor(downKey:EventType, upKey:EventType, keyCode:number){
        this.downKey = downKey;
        this.upKey = upKey;
        this.keyCode = keyCode;
    }
    public static create(controlEvent:EventType, controlReleaseEvent:EventType, controlKeyNumber:number){
        return new KeyEvents(controlEvent, controlReleaseEvent, controlKeyNumber);
    }
}

function getKeyEvents()
{
    let results = []
    results.push(KeyEvents.create(EventType.wDown, EventType.wUp, 87));
    results.push(KeyEvents.create(EventType.aDown, EventType.aUp, 65));
    results.push(KeyEvents.create(EventType.sDown, EventType.sUp, 83));
    results.push(KeyEvents.create(EventType.dDown, EventType.dUp, 68));
    results.push(KeyEvents.create(EventType.spaceDown, EventType.spaceUp, 32));
    results.push(KeyEvents.create(EventType.pDown, EventType.pUp, 80));
    results.push(KeyEvents.create(EventType.iDown, EventType.iUp, 73));
    results.push(KeyEvents.create(EventType.fDown, EventType.fUp, 70));
    results.push(KeyEvents.create(EventType.jDown, EventType.jUp, 74));
    results.push(KeyEvents.create(EventType.kDown, EventType.kUp, 75));
    results.push(KeyEvents.create(EventType.lDown, EventType.lUp, 76));
    results.push(KeyEvents.create(EventType.semicolonDown, EventType.semicolonDown, 186));
    results.push(KeyEvents.create(EventType.tildDown, EventType.tildUp, 192));
    return results;
}

export let keyEvents = getKeyEvents();