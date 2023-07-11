import { Game, SpriteManager} from "aiwar";
import {buildComponents} from "./build-components";
import { buildEntities } from "./build-entities";
import { buildSystems } from "./build-systems";
import { buildSprites } from "./build-sprites";


export function build(game: Game): Game {
    buildSprites(game.spriteManager);
    buildEntities(game);
    buildComponents(game);
    buildSystems(game);
    return game;
}