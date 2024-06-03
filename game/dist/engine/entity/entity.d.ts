import { ComponentFactory, GenericComponentType } from '../component/component-factory';
import { Component } from '../component/component';
import { GameEvent } from '../events/game-event';
import { EntityUpdateArgs } from './entity-update-args';
import { GameDependencies } from '../dependencies/game-dependencies';
import { EntitySystem } from '../system/system';
import { SystemArgs } from '../system/system-args';
export declare class Entity {
    constructor(componentFactory: ComponentFactory);
    static id: number;
    id: number;
    private components;
    private componentNameToComponent;
    private componentToComponent;
    private componentFactory;
    private applicableSystems;
    targetedEvents: GameEvent[];
    delayedEvents: GameEvent[];
    destroyed: boolean;
    addApplicableSystem(system: EntitySystem): void;
    applySystems(args: SystemArgs): void;
    addComponent(componentName: string): Component;
    getComponent(componentName: string, allowUndefined?: boolean): Component;
    getComponentT<ComponentType extends Component>(componentClass: GenericComponentType<ComponentType>): ComponentType;
    emit(event: GameEvent, delayed?: boolean): void;
    update(args: EntityUpdateArgs): void;
    handleEvents(events: {
        [key: string]: GameEvent;
    }): void;
    static create(gameDependcies: GameDependencies): Entity;
}
