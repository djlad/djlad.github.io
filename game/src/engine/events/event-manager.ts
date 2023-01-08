import { GameEvent } from "./game-event";
import { EventType } from "./EventType";
import { keyEvents } from "./key-events";

export class EventManager {
    constructor(){
        this.keys = this.createKeyListener();
    }

    keys:boolean[] = Array(1000);
    keysReleased:boolean[] = Array(1000);
    //events:{[key:string]:GameEvent[]} = {};
    events:GameEvent[] = [];
    callbacks:{[key:string]:((event:GameEvent)=>void)[]} = {};


    createKeyListener(){
        var keys:boolean[] = Array(1000);
        window.addEventListener("keydown", function(e){
            keys[e.keyCode] = true;
        })
        window.addEventListener("keyup", function(e){
            keys[e.keyCode] = false;
            //console.log(e.keyCode)
        })
        let canvas = document.getElementById("canvas");
        window.addEventListener("mouseup", (e)=>{
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            console.log("x: " + x + " y: " + y)
            this.emit(EventType.mouseUp, {x,y});
        })
        return keys;
    }

    update(){
        // this.events = [];
        for(var i:number=0;i<keyEvents.length;i++){
            let keyEvent = keyEvents[i];
            if(this.keys[keyEvent.keyCode]){
                //emit key down event
                this.emit(keyEvent.downKey);
                this.keysReleased[keyEvent.keyCode] = true;
            } else {
                if(this.keysReleased[keyEvent.keyCode]){
                    //emit key up event
                    this.emit(keyEvent.upKey);
                    this.keysReleased[keyEvent.keyCode] = false;
                }
            }
        }
    }

    emit(eventName:EventType, eventData:{}={}){
        var ge:GameEvent = new GameEvent(eventName, eventData);
        this.events.push(ge);
    }

    fireCallbacks(){
        //used with addListener
        //unused currently
        var events:GameEvent[];
        var callbacks:((event:GameEvent)=>void)[];
        for (let i=0;i<this.events.length;i++){
            let event = this.events[i];
            //get listener callbacks listening to this event
            if (!(event.eventName in this.callbacks)) continue;
            callbacks = this.callbacks[event.eventName];
            callbacks.forEach((callback)=>{
                callback(event);
            })
        }
        this.events = [];
    }

    addListener(eventName:EventType, callback:(event:GameEvent)=>void){
        //used with fireCallbacks
        //unused currently
        if (!(eventName in this.callbacks)){
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    
    createEvent(eventName:EventType){
        if(eventName in this.events)return;
        this.events = [];
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