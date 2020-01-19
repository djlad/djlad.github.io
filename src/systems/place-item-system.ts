import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";

class PlaceItemSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }

    apply(entity:Entity) {

    }

    applyEvents() {

    }

    static create(game:Game):PlaceItemSystem {
        return new PlaceItemSystem(game);
    }

}