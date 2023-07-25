import { CollisionSystem, Game} from "aiwar";
import { BoxCollisionSystem } from "../systems/box-collision-system";
import { WasdSystem } from "../systems/wasd-system";
import { FloorSystem } from "../systems/floor-system/floor-system";

export function buildSystems(game:Game){
    // game.addSystem(CollisionSystem.create(game));
    game.addSystem(BoxCollisionSystem.create(game));
    game.addSystem(FloorSystem.create(game));
    game.addSystem(WasdSystem.create(game));
}