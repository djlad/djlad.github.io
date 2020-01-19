import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";
import { PlaceItemComponent } from "../components/place-item/place-item-component";
import { PlaceItemRequest } from "../components/place-item/place-item-request";
import { PositionComponent } from "../components/position-component";

export class PlaceItemSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }

    apply(entity:Entity):void {
        let placeItem:PlaceItemComponent;
        try{
            placeItem = <PlaceItemComponent>entity.getComponent("placeItem");
        } catch {return}
        let requests:PlaceItemRequest[] = placeItem.placeItemRequests
        for(let i:number=0;i<requests.length;i++){
            let placeItemRequest:PlaceItemRequest = requests[i];
            if (placeItemRequest.relative){
                let position:PositionComponent;
                try{
                    position = <PositionComponent>entity.getComponent("position");
                    placeItemRequest.coordinates[0] += position.x;
                    placeItemRequest.coordinates[1] += position.y;
                } catch {}
            }
            this.placeItem(placeItemRequest);
        }
        placeItem.placeItemRequests = [];
    }

    applyEvents() {

    }
    private placeItem(placeItemRequest:PlaceItemRequest):Entity{
        let x:number;
        let y:number;
        x = placeItemRequest.coordinates[0];
        y = placeItemRequest.coordinates[1];
        let newEntity:Entity;
        newEntity = this.game.addEntity(placeItemRequest.entityName);
        let position:PositionComponent = <PositionComponent>newEntity.getComponent("position", true);
        if(position == null){
            return;
        }
        position.x = x;
        position.y = y;
        return newEntity;
    }
    static create(game:Game):PlaceItemSystem {
        return new PlaceItemSystem(game);
    }

}