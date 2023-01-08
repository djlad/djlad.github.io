import { ClickableComponent } from "../components/clickable-component";
import { PositionComponent } from "../components/position-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { EventType } from "../engine/events/EventType";
import { GameEvent } from "../engine/events/game-event";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { ClickableEntity } from "../entities/clickable-entity";

export class ClickSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
        this.game.eventManager.addListener(EventType.mouseUp, (data)=>{
            this.clicks.push(data);
        });
    }
    clicks: GameEvent[] = [];

    apply(entity: Entity, eventManager: EventManager): void {
        let clickable = <ClickableComponent>entity.getComponent("click", true);
        let position = <PositionComponent>entity.getComponent("position", true);
        if (clickable == null)return;
        if (position == null)return;
        let event = this.clicks.pop();
        let x = event.eventData.x;
        let y = event.eventData.y;
        if (this.pointInPosition(x, y, position)){
            clickable.click();
        }
    }

    applyEvents(entity: Entity, eventManager: EventManager): void {
        
    }

    pointInPosition(x:number, y:number, position:PositionComponent):boolean{
        let leftx = position.x - position.width/2;
        let rightx = position.x + position.width/2;
        let topy = position.y - position.height/2;
        let bottomy = position.y + position.height/2;
        return x > leftx && x < rightx && y > topy && y < bottomy;
    }

    static create(game:Game):ClickSystem{
        return new ClickSystem(game);
    }
}