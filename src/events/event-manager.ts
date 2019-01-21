export class GameEvent {
    constructor(eventName:string, eventData:{}, componentTarget:string=null){
        this.eventName = eventName;
        this.eventData = eventData;
    }
    eventName:string;
    eventData:any;
    componentTarget:string;

    static create(eventName:string, eventData:{}):GameEvent{
        var ge:GameEvent = new GameEvent(eventName, eventData);
        return ge;
    }
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
            this.emit("w down");
        }
        if (this.keys[65]){
            this.emit("a down");
        }
        if (this.keys[83]){
            this.emit("s down");
        }
        if (this.keys[68]){
            this.emit("d down");
        }
        //console.log(this.callbacks)
        //console.log(this.events)
    }

    emit(eventName:string, eventData:{}={}){
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

    addListener(eventName:string, callback:(event:GameEvent)=>void){
        this.callbacks[eventName].push(callback);
    }
    
    createEvent(eventName:string){
        if(eventName in this.events)return;
        this.events[eventName] = [];
        this.callbacks[eventName] = [];
    }

    static create(){
        var em:EventManager = new EventManager();
        em.createEvent("w down");
        em.createEvent("a down");
        em.createEvent("s down");
        em.createEvent("d down");
        return em;
    }
}