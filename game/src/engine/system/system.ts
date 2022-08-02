import { Component } from '../component/component';
import { Entity } from '../entity/entity';
import { Game } from '../game';
import { EventManager } from '../events/event-manager';

export class EntitySystem {
    /**
     * System that can be applied to an entity
     * manipulates one or more components through the component's public interface
     * Do not change components directly through a system
     */
    constructor(game:Game){
        this.game = game;
    }
    targetComponents:Component[];
    game:Game;

    apply(entity:Entity, eventManager:EventManager):void{
        throw "an entity system did not implement apply method.";
    };
    applyEvents(entity:Entity, eventManager:EventManager):void{
        throw "an entity did not implement apply Events";
    }

    //static create(game:Game):EntitySystem{
    //    throw "an entity system has no create method."
    //};
}

