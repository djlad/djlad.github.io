import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";

export class WasdSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
}