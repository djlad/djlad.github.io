import { Entity } from './entity';
import { ComponentFactory } from '../component/component-factory';
import { GameDependencies } from '../dependencies/game-dependencies';
import { EntityRegistration } from './entity-registration';
export declare class EntityFactory {
    constructor(gameDependencies: GameDependencies);
    dependencies: GameDependencies;
    entityTypes: {
        [key: string]: EntityRegistration;
    };
    componentFactory: ComponentFactory;
    registerEntity(componentName: string, EntityClass: EntityRegistration): void;
    registerComponent(componentClass: any): void;
    create(entityName: string): Entity;
    static create(gameDependencies: GameDependencies): EntityFactory;
}
