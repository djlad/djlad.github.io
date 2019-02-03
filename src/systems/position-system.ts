import { EntitySystem } from './system';
import { HtmlRenderer } from '../render';
import { Game } from '../game';
import { Entity } from '../entities/entity';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';
import { GameEvent, EventType } from '../events/event-manager';
import { RenderSystem } from './render-system';

export class PositionSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(game:Game){
        super(game);
    }
    renderer:HtmlRenderer;

    static create(game:Game):PositionSystem{
        return new PositionSystem(game);
    }

    apply(entity:Entity){
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