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
    events:{[key:string]:GameEvent} = {};


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
        //console.log(this.keys)
    }

    emit(eventName:string, eventData:{}={}){
        this.events[eventName] = new GameEvent(eventName, eventData);
    }

    register(eventName:string){
        
    }

    static create(){
        return new EventManager();
    }
}