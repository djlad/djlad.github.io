import { ComponentFactory } from "../component/component-factory";
import { GameDependencies } from "../dependencies/game-dependencies";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { PhaserCameras } from "./phaser-cameras";
import { PhaserGame } from "./phaser-game";
import { PhaserGameDependencies } from "./phaser-game-dependencies";
import { PhaserSpriteManager } from "./phaser-sprite-manager";
import { HtmlRenderer } from "../renderers/implementations/html/html-renderer";

export function buildPhaserDependencies(){
    const deps = new PhaserGameDependencies();
    deps.phaserGame = PhaserGame.createSingleton();
    deps.cameras = PhaserCameras.create(deps);
    deps.renderer = HtmlRenderer.create();
    deps.spriteManager = PhaserSpriteManager.create();
    deps.eventManager = EventManager.create();
    deps.componentFactory = ComponentFactory.create(deps);
    deps.entityFactory = EntityFactory.create(deps);
    return deps;
}