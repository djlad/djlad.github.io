export class GameEvent {
    constructor(eventName:EventType, eventData:{}, componentTarget:string=null){
        this.eventName = eventName;
        this.eventData = eventData;
    }
    eventName:EventType;
    eventData:any;
    componentTarget:string;

    static create(eventName:EventType, eventData:{}):GameEvent{
        var ge:GameEvent = new GameEvent(eventName, eventData);
        return ge;
    }
}

export enum EventType {
    wDown,
    aDown,
    sDown,
    dDown,
    collision
}

export class EventManager {
    constructor(){
        this.keys = this.createKeyListener();
    }

    keys:boolean[] = Array(1000);
    events:{[key:string]:GameEvent[]} = {};
    callbacks:{[key:string]:((event:GameEvent)=>void)[]} = {};


    createKeyListener(){
        var keys:boolean[] = Array(1000);
        window.addEventListener("keydown", function(e){
            keys[e.keyCode] = true;
        })
        window.addEventListener("keyup", function(e){
            keys[e.keyCode] = false;
        })
        return keys;
    }

    update(){
        this.events = {};
        if (this.keys[87]){
            //w
            this.emit(EventType.wDown);
        }
        if (this.keys[65]){
            //a
            this.emit(EventType.aDown);
        }
        if (this.keys[83]){
            //s
            this.emit(EventType.sDown);
        }
        if (this.keys[68]){
            //d
            this.emit(EventType.dDown);
        }
        //console.log(this.callbacks)
        //console.log(this.events)
    }

    emit(eventName:EventType, eventData:{}={}){
        var ge:GameEvent = new GameEvent(eventName, eventData);
        if (eventName in this.events){
            this.events[eventName].push(ge);
        } else {
            this.events[eventName] = [ge];
        }
    }

    fireCallbacks(){
        var events:GameEvent[];
        var callbacks:((event:GameEvent)=>void)[];
        for (var eventName in this.events){
            //get emitted events to eventName
            events = this.events[eventName];
            //get listener callbacks listening to this event
            callbacks = this.callbacks[eventName];
            events.forEach((event:GameEvent)=>{
                callbacks.forEach((callback:(event:GameEvent)=>void)=>{
                    callback(event);
                })
            })
        }
    }

    addListener(eventName:EventType, callback:(event:GameEvent)=>void){
        this.callbacks[eventName].push(callback);
    }
    
    createEvent(eventName:EventType){
        if(eventName in this.events)return;
        this.events[eventName] = [];
        this.callbacks[eventName] = [];
    }

    static create(){
        var em:EventManager = new EventManager();
        em.createEvent(EventType.wDown);
        em.createEvent(EventType.aDown);
        em.createEvent(EventType.sDown);
        em.createEvent(EventType.dDown);
        return em;
    }
}