import { ComponentFactory } from "../engine/component/component-factory";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { EntityFactory } from "../engine/entity/entity-factory";
import { EventManager } from "../engine/events/event-manager";
import { PhaserCameras } from "../engine/phaser-integration/phaser-cameras";
import { PhaserGame } from "../engine/phaser-integration/phaser-game";
import { PhaserGameDependencies } from "../engine/phaser-integration/phaser-game-dependencies";
import { PhaserSpriteManager } from "../engine/phaser-integration/phaser-sprite-manager";
import { HtmlRenderer } from "../engine/renderers/implementations/html/html-renderer";

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