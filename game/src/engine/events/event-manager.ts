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
        return keys;
    }

    update(){
        this.events = [];
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
        for (var eventName in this.events){
            //get emitted events to eventName
            events = this.events;
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
        //used with fireCallbacks
        //unused currently
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