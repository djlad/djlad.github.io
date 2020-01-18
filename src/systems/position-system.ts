import { EntitySystem } from '../engine/system/system';
import { Game } from '../engine/game';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
//import * as Synaptic from "synaptic";

export class PositionSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(game:Game){
        super(game);
    }
    static create(game:Game):PositionSystem{
        return new PositionSystem(game);
    }

    apply(entity:Entity){
        //console.log(Synaptic)
    }
    applyEvents(entity:Entity){
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        if(position === null)return;
        var events:GameEvent[] = entity.targetedEvents;
        var event:GameEvent;
        for(var i=0;i<events.length;i++){
            event = events[i];
            switch(event.eventName){
                case EventType.changeVelocity:
                    if("vx" in event.eventData){
                        position.vx = event.eventData.vx;
                    }
                    if("vy" in event.eventData){
                        position.vy = event.eventData.vy;
                    }
                break;
            }
        }
    }
}