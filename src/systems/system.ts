import { Component } from '../components/component';
import { Entity } from '../entities/entity';
import { HtmlRenderer } from '../render';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';
import { GameEvent } from '../events/event-manager';
import { WasdComponent } from '../components/wasd-component';
import { CropComponent } from '../components/crop-component';

export class EntitySystem {
    /**
     * System that can be applied to an entity
     * manipulates one or more components through the component's public interface
     * Do not change components directly through a system
     */
    constructor(){

    }
    targetComponents:Component[];

    apply(entity:Entity):void{
        throw "an entity system did not implement apply method.";
    };
    applyEvents(entity:Entity, events:{[key:string]:GameEvent}):void{
        throw "an did not implement apply Events";
    }
    static create():EntitySystem{
        throw "an entity system has no create method."
    };
}

