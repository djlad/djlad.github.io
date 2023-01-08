import { AnimationComponent } from "../components/animation-component";
import { PositionComponent } from "../components/position-component";
import { Tile } from "../components/tile-component/tile";
import { TileComponent } from "../components/tile-component/tile-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { EventType } from "../engine/events/EventType";
import { GameEvent } from "../engine/events/game-event";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { ClickableEntity } from "../entities/clickable-entity";

export class MapBuilderSystem extends EntitySystem{
    private clicks:GameEvent[] = [];
    private openBuilder:boolean = false;
    private tilePallete:ClickableEntity[] = [];
    private selectedTile: Tile;
    constructor(game:Game){
        super(game);
        this.game.eventManager.addListener(EventType.mouseUp, (data)=>{
            if(!this.openBuilder)return;
            this.clicks.push(data);
        });
        this.game.eventManager.addListener(EventType.tildUp, (data)=>{
            this.openBuilder = !this.openBuilder;
            this.createPalleteEntities();
        });
    }
    apply(entity: Entity, eventManager: EventManager): void {
        let tileComponent = <TileComponent>entity.getComponent("tile", true);
        if (tileComponent == null) return;
        if (!this.openBuilder)return;
        if (this.clicks.length == 0)return;
        let event = this.clicks.pop();
        let x = event.eventData.x;
        let y = event.eventData.y;
        let selectedTile = this.mouseCoordToTile(x, y, tileComponent);
        selectedTile.spriteNumber = 5;
    }
    createPalleteEntities(){
        let entity = this.game.getById(0);
        let tileComponent = <TileComponent>entity.getComponent("tile", true);
        for(let i=0;i<tileComponent.tileSpriteNames.length-0;i++){
            for(let i2=0;i2<25;i2++){
                let spriteName = tileComponent.tileSpriteNames[i];
                let tileButton = <ClickableEntity>this.game.addEntity("click");
                this.tilePallete.push(tileButton);
                let animation = <AnimationComponent>tileButton.getComponent("animation");
                let position = <PositionComponent>tileButton.getComponent("position");
                console.log(spriteName);
                animation.setSpriteNumber(spriteName, i2);
                let tileWidth = tileComponent.tileWidth;
                position.width = tileWidth;
                position.height = tileWidth;
                position.x = ((i2%5) * tileWidth);
                position.y = Math.floor(i2/5) * tileWidth;
                console.log(position.x);
            }
        }
    }
    mouseCoordToTile(x:number, y:number, tileComponent:TileComponent){
        let xOffset = this.game.renderer.offset[0];
        let yOffset = this.game.renderer.offset[1];
        return tileComponent.coordToTile(x + xOffset, y + yOffset)[0];
    }
    applyEvents(entity: Entity, eventManager: EventManager): void {
        
    }
    static create(game:Game):MapBuilderSystem{
        return new MapBuilderSystem(game);
    }
}