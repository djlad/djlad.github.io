import { ComponentFactory } from '../component/component-factory';
import { Component } from '../component/component';
import { GameEvent } from '../events/game-event';
import { EntityUpdateArgs } from './entity-update-args';
import { GameDependencies } from '../dependencies/game-dependencies';
export declare class Entity {
    constructor(componentFactory: ComponentFactory);
    static id: number;
    id: number;
    components: Component[];
    componentNameToComponent: {
        [key: string]: Component;
    };
    componentFactory: ComponentFactory;
    targetedEvents: GameEvent[];
    delayedEvents: GameEvent[];
    destroyed: boolean;
    addComponent(componentName: string): Component;
    getComponent(componentName: string, allowUndefined?: boolean): Component;
    emit(event: GameEvent, delayed?: boolean): void;
    update(args: EntityUpdateArgs): void;
    handleEvents(events: {
        [key: string]: GameEvent;
    }): void;
    static create(gameDependcies: GameDependencies): Entity;
}
