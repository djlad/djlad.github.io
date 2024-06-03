import { GameDependencies } from "../dependencies/game-dependencies";
import { Component } from "./component";
export type GenericComponentType<ComponentType extends Component> = {
    new (...args: any[]): ComponentType;
    componentName: string;
    create(gameDependencies: GameDependencies, entityId: number): ComponentType;
};
export declare class ComponentFactory {
    static dependencies: GameDependencies;
    constructor(gameDependencies: GameDependencies);
    gameDependencies: GameDependencies;
    componentTypes: {
        [key: string]: GenericComponentType<any>;
    };
    registerComponent<ComponentType extends Component>(ComponentClass: GenericComponentType<ComponentType>): void;
    createComponent(componentName: string, entityId: number): any;
    static create(gameDependencies: GameDependencies): ComponentFactory;
}
