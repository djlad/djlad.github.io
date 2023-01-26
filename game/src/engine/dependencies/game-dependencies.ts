import { ComponentFactory } from "../component/component-factory";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { IEngineCreator } from "../pixi-integration/sprite-dependency/iengine-creator";
import { ISpriteLoader } from "../renderers/isprite-loader";
import { Renderer } from "../renderers/render";
import { ICameras } from "./icameras";

export class GameDependencies {
     engineCreator:IEngineCreator = null;// only necessary if using an engine like phaser/pixi
     componentFactory: ComponentFactory = null;
     entityFactory:EntityFactory = null;
     renderer:Renderer = null;
     eventManager:EventManager = null;
     spriteManager:ISpriteLoader = null;
     cameras:ICameras = null;
     checkDependency(gameDependency:any){
          if (gameDependency == null){
               console.error(`Dependency was requested but it was null`);
          }
     }
}