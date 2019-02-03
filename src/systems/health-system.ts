import { EntitySystem } from './system';
import { Game } from '../game';
import { Entity } from '../entities/entity';
import { HealthComponent } from '../components/health-component';
import { GameEvent, EventType } from '../events/event-manager';
export class HealthSystem extends EntitySystem{
    constructor(game:Game){
        super(game)
    }
    apply(entity:Entity){

    }
    applyEvents(entity:Entity){
        var health:HealthComponent = <HealthComponent>entity.getComponent("health", true);
        if(health == null)return;

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