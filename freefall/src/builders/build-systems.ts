import { CollisionSystem, Game} from "aiwar";
import { FloorSystem } from "../systems/floor-system";
import { BoxCollisionSystem } from "../systems/box-collision-system";
import { WasdSystem } from "../systems/wasd-system";

export function buildSystems(game:Game){
    // game.addSystem(CollisionSystem.create(game));
    game.addSystem(BoxCollisionSystem.create(game));
    game.addSystem(FloorSystem.create(game));
    game.addSystem(WasdSystem.create(game));
}