import { Game } from "../game";
import { PhaserAnimationComponent } from "./phaser-components/phaser-animation-component";
import { PhaserPositionComponent } from "./phaser-components/phaser-position-component";
import { buildPhaserDependencies } from "./phaser-dependency-builder";
import { PhaserGame } from "./phaser-game";
import { PhaserRenderSystem } from "./phaser-systems/phaser-render-system";

function buildPhaserComponents(game:Game){
    console.log("building phaser game components");
    game.registerComponent(PhaserAnimationComponent);
    game.registerComponent(PhaserPositionComponent);
}

export function createPhaserGame(game:Game=null){
    if (game == null){
        const deps = buildPhaserDependencies();
        game = Game.createCustom(deps);
    }
    const phaserGame = PhaserGame.createSingleton();
    phaserGame.mainScene.addCreator((scene)=>{
        phaserGame.setUpdater((delta)=>{
            game.step(delta);
        });
    });
    buildPhaserComponents(game);
    game.addSystem(PhaserRenderSystem.create(game));
    game.addStarter(()=>{phaserGame.start()});
    return game;
}