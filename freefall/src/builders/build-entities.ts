import { FirstEntity, Game} from "aiwar";
import { PlayerEntity } from "../entities/player-entity";
import { FloorEntity } from "../entities/floor-entity";

export function buildEntities(game:Game){
    game.registerEntity("first", new FirstEntity());
    game.registerEntity("player", new PlayerEntity());
    game.registerEntity("floor", new FloorEntity())
}