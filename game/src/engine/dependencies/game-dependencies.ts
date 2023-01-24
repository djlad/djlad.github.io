import { ComponentFactory } from "../component/component-factory";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { ISpriteLoader } from "../renderers/isprite-loader";
import { Renderer } from "../renderers/render";
import { ICameras } from "./icameras";

export class GameDependencies {
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