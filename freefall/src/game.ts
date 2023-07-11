import { AnimationComponent, Game, GenericAnimationComponent, GenericPositionComponent, IPositionComponent, PositionComponent, TileComponent, buildComponents, pixiGameBuilder } from "aiwar";
import { build } from "./builders/builder";
import { metadata } from "./metadata";
import { GravityComponent } from "./components/gravity";

const game = pixiGameBuilder(metadata);
//@ts-ignore
window.game = game;

build(game);

export function startGame(game:Game){
    game.entities.forEach((entity)=>{
        if([0, 1].includes(entity.id))return;
        const pos = <GenericPositionComponent>entity.getComponent("position");
        pos.y = -9999;
        game.destroy(entity)
    });
    const cameraPosition = new PositionComponent();
    const mid = window.innerWidth/2;
    const midy = window.innerHeight/2;
    cameraPosition.x = mid;
    cameraPosition.y = midy;
    game.gameDependencies.cameras.setMainCamera(cameraPosition);
    const first = game.getById(0) ?? game.addEntity("first");
    const tiles = <TileComponent>first.getComponent("tile");
    tiles.removeTiles();
    const player = game.getById(1) ?? game.addEntity("player");
    const pos = <GenericPositionComponent>player.getComponent("position");
    pos.x = 300;
    pos.y = 200;
    placeFloor(pos.x, pos.y + 100);
}

game.addStarter(startGame);


game.spriteManager.onLoad(()=>{
    game.start();
});

function placeFloor(x: number, y: number){
    const floor = game.addEntity("floor");
    const pos = <GenericPositionComponent>floor.getComponent("position");
    pos.x = x;
    pos.y = y;
    pos.vy = -1;
    return floor;
}