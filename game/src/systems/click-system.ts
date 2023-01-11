import { ClickableComponent } from "../components/clickable-component";
import { PositionComponent } from "../components/position-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { EventType } from "../engine/events/EventType";
import { GameEvent } from "../engine/events/game-event";
import { Game } from "../engine/game";
import { HtmlRenderer } from "../engine/renderers/implementations/html/html-renderer";
import { EntitySystem } from "../engine/system/system";
import { ClickableEntity } from "../entities/clickable-entity";
import { Renderer } from '../engine/renderers/render';
import { FirstEntity } from "../entities/first-entity";
import { SystemArgs } from "../engine/system/system-args";

export class ClickSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
        this.game.eventManager.addListener(EventType.mouseUp, (data)=>{
            this.clicks.push(data);
        });
        this.renderer = game.renderer;
    }
    clicks: GameEvent[] = [];
    clicksToProcessThisLoop: GameEvent[] = [];
    renderer: Renderer;
    private clearClicksAndMoveClicksToProcess(){
        for (let i=0;i<this.clicksToProcessThisLoop.length;i++){
            this.clicksToProcessThisLoop.pop();
        }
        let numClicks = this.clicks.length;
        for (let i=0;i<numClicks;i++){
            this.clicksToProcessThisLoop.push(this.clicks.pop());
        }
    }

    apply(args:SystemArgs): void {
        const entity = args.entity;
        if(entity instanceof FirstEntity)this.clearClicksAndMoveClicksToProcess();
        let clickable = <ClickableComponent>entity.getComponent("click", true);
        let position = <PositionComponent>entity.getComponent("position", true);
        if (clickable == null)return;
        if (position == null)return;
        this.clicksToProcessThisLoop.forEach((event)=>{
            let x = event?.eventData.x;
            let y = event?.eventData.y;
            if (x == null || y == null)return;
            if (this.pointInPosition(x, y, position)){
                clickable.click();
            }
        });
    }

    applyEvents(entity: Entity, eventManager: EventManager): void {
        
    }

    pointInPosition(x:number, y:number, position:PositionComponent):boolean{
        if (position.applyOffsets){
            let offset = this.renderer.getOffset();
            x += offset[0];
            y += offset[1];
        }
        let leftx = position.x - position.width/2;
        let rightx = position.x + position.width/2;
        let topy = position.y - position.height;
        let bottomy = position.y;
        return x > leftx && x < rightx && y > topy && y < bottomy;
    }

    static create(game:Game):ClickSystem{
        return new ClickSystem(game);
    }
}