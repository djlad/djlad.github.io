import { ComponentFactory } from "../component/component-factory";
import { GenericCameras } from "../dependencies/generic-cameras";
import { EntityFactory } from "../entity/entity-factory";
import { EventManager } from "../events/event-manager";
import { Game } from "../game";
import { GenericAnimationComponent } from "./pixi-components/generic-animation-component";
import { GenericPositionComponent } from "./pixi-components/generic-position-component";
import { PixiDependencies } from "./pixi-dependencies";
import { PixiGame } from "./pixi-game";
import { PixiSpriteManager } from "./pixi-sprite-manager";
import { PixieEngineCreator } from "./sprite-dependency/pixie-engine-creator";
import { GenericRenderer } from "./generic-render";
import { GenericRenderSystem } from "./systems/generic-render-system";

export function pixiGameBuilder():Game{
    const deps = new PixiDependencies()
    deps.pixiGame = PixiGame.createSingleton(); 
    deps.spriteManager = PixiSpriteManager.create(deps);
    // deps.cameras = 
    // deps.renderer = HtmlRenderer.create();
    deps.renderer = GenericRenderer.create();
    deps.cameras = GenericCameras.create();
    deps.engineCreator = PixieEngineCreator.create(deps);
    deps.eventManager = EventManager.create();
    deps.componentFactory = ComponentFactory.create(deps);
    deps.entityFactory = EntityFactory.create(deps);

    const game = Game.createCustom(deps)
    game.registerComponent(GenericPositionComponent);
    game.registerComponent(GenericAnimationComponent);
    game.addSystem(GenericRenderSystem.create(game));
    game.addStarter(()=>{
        setTimeout(()=>deps.pixiGame.start(), 5000);
    });
    game.addStarter(()=>{
        deps.pixiGame.app.ticker.add((delta)=>{
            game.step(delta*15);
        });
    });
    return game;
}