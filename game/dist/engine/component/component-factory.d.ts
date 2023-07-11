import { GameDependencies } from "../dependencies/game-dependencies";
export declare class ComponentFactory {
    static dependencies: GameDependencies;
    constructor(gameDependencies: GameDependencies);
    gameDependencies: GameDependencies;
    componentTypes: {
        [key: string]: any;
    };
    registerComponent(ComponentClass: any): void;
    createComponent(componentName: string, entityId: number): any;
    static create(gameDependencies: GameDependencies): ComponentFactory;
}
