import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";

export class InventorySystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
    static create(game:Game) {
        return new InventorySystem(game);
    }

    apply(entity:Entity):void{
    }

    applyEvents(entity:Entity):void{

    }
}