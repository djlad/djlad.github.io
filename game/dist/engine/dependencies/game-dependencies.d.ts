import { ComponentFactory } from "../component/component-factory";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { Game } from "../game";
import { IEngineCreator } from "../pixi-integration/sprite-dependency/iengine-creator";
import { ISpriteLoader } from "../renderers/isprite-loader";
import { Renderer } from "../renderers/render";
import { ICameras } from "./icameras";
export declare class GameDependencies {
    engineCreator: IEngineCreator;
    componentFactory: ComponentFactory;
    entityFactory: EntityFactory;
    renderer: Renderer;
    eventManager: EventManager;
    spriteManager: ISpriteLoader;
    cameras: ICameras;
    game: Game;
    checkDependency(gameDependency: any): void;
}
