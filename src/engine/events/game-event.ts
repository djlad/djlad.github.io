export class GameEvent {
    constructor(eventName:EventType, eventData:{}, componentTarget:string=null){
        this.eventName = eventName;
        this.eventData = eventData;
        this.eventDescription = EventType[eventName];
    }
    eventName:EventType;
    eventDescription:string;
    eventData:any;
    componentTarget:string;

    static create(eventName:EventType, eventData:{}=null):GameEvent{
        var ge:GameEvent = new GameEvent(eventName, eventData);
        return ge;
    }
}