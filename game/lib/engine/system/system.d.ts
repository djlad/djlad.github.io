import { Component } from '../component/component';
import { Entity } from '../entity/entity';
import { Game } from '../game';
import { EventManager } from '../events/event-manager';
import { SystemArgs } from './system-args';
export declare class EntitySystem {
    constructor(game: Game);
    targetComponents: Component[];
    game: Game;
    oncePerLoop: (args: SystemArgs) => void;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity, eventManager: EventManager): void;
}
