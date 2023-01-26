import { ComponentFactory } from "../component/component-factory";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { Game } from "../game";
import { PixiDependencies } from "./pixi-dependencies";
import { PixiGame } from "./pixi-game";
import { PixiSpriteManager } from "./pixi-sprite-manager";

export function pixiGameBuilder():Game{
    const deps = new PixiDependencies()
    deps.pixiGame = PixiGame.createSingleton(); 
    deps.spriteManager = PixiSpriteManager.create(deps);
    // deps.cameras = 
    // deps.renderer = HtmlRenderer.create();
    deps.eventManager = EventManager.create();
    deps.componentFactory = ComponentFactory.create(deps);
    deps.entityFactory = EntityFactory.create(deps);

    const game = Game.createCustom(deps)
    game.addStarter(()=>{
        deps.pixiGame.start();
    });

    return game;
}