import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { GameEvent } from '../engine/events/game-event';
import { SystemArgs } from '../engine/system/system-args';

declare var synaptic:any;

export class NeuralFightSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
    }

    static create(game:Game){
        return new NeuralFightSystem(game);
    }

    shouldApply(entity: Entity): boolean {
        return entity.getComponent("neural", true) != null;
    }

    apply(args:SystemArgs){
        const entity = args.entity;
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
