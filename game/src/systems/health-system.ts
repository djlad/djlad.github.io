import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { HealthComponent } from '../components/health-component';
import { GameEvent } from '../engine/events/game-event';
import { EventType } from '../engine/events/EventType';
import { SystemArgs } from '../engine/system/system-args';
export class HealthSystem extends EntitySystem{
    constructor(game:Game){
        super(game)
    }
    apply(args:SystemArgs){

    }
    shouldApply(entity: Entity): boolean {
        return entity.getComponent("health", true) != null;
    }
    applyEvents(entity:Entity){
        var events:GameEvent[] = entity.targetedEvents;
        var event:GameEvent;
        //console.log(entity)
        //console.log(health)
        //console.log(entity.targetedEvents.length)
        for(var i=0;i<events.length;i++){
            event = events[i];
            switch(event.eventName){
                case EventType.inflictDamage:
                    //console.log('health')
                    this.handleDamage(entity, event);
                break;
            }
        }
        entity.targetedEvents = [];
    }
    handleDamage(entity:Entity, event:GameEvent){
        if(event.eventData === null){
            event.eventData = {damage:50};
        }
        var health:HealthComponent = <HealthComponent>entity.getComponent("health", true);
        health.health -= event.eventData.damage;
        if (health.health < 0){
            this.game.destroy(entity);
        }
    }
    static create(game:Game){
        return new HealthSystem(game);
    }
}