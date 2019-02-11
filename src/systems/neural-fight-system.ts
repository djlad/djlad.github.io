import { EntitySystem } from './system';
import { Entity } from '../entities/entity';
import { Game } from '../game';
import { GameEvent } from '../events/event-manager';
import { NeuralFightComponent } from '../components/neural-fight-component';

declare var synaptic:any;

export class NeuralFightSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
    }

    static create(game:Game){
        return new NeuralFightSystem(game);
    }

    apply(entity:Entity){
        var neural:NeuralFightComponent = <NeuralFightComponent>entity.getComponent("neural", true);
        if(neural == null){
            return;
        }
        //console.log()
    }

    applyEvents(entity:Entity){
        var events:GameEvent[] = entity.targetedEvents;
        var event:GameEvent;
        for(var i=0;i<events.length;i++){
            event = events[i];
        }
    }
}
