import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";

class PlaceItemSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }

    apply() {

    }

    applyEvents() {

    }

    static create(game:Game):PlaceItemSystem {
        return new PlaceItemSystem(game);
    }

}