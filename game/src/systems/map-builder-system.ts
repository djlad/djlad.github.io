import { AnimationComponent } from "../components/animation-component";
import { ClickableComponent } from "../components/clickable-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { SpriteId } from "../components/tile-component/sprite-id";
import { Tile } from "../components/tile-component/tile";
import { TileComponent } from "../components/tile-component/tile-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { EventType } from "../engine/events/EventType";
import { GameEvent } from "../engine/events/game-event";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { SystemArgs } from "../engine/system/system-args";
import { ClickableEntity } from "../entities/clickable-entity";

export class MapBuilderSystem extends EntitySystem{
    private clicks:GameEvent[] = [];
    private openBuilder:boolean = false;
    private tilePallete:Entity[] = [];
    private selectedSpriteId: SpriteId = SpriteId.create("soil", 0);
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
    apply(args:SystemArgs): void {
        const entity = args.entity;
        let tileComponent = <TileComponent>entity.getComponent("tile", true);
        if (tileComponent == null) return;
        if (!this.openBuilder)return;
        if (this.clicks.length == 0)return;
        let event = this.clicks.pop();
        let x = event.eventData.x;
        let y = event.eventData.y;
        let tileToChange = this.mouseCoordToTile(x, y, tileComponent);
        const tileCopy = JSON.parse(JSON.stringify(this.selectedSpriteId));
        tileToChange.spriteIds.push(tileCopy);
    }
    createPalleteEntities(){
        let entity = this.game.getById(0);
        let tileComponent = <TileComponent>entity.getComponent("tile", true);
        let tileWidth = tileComponent.tileWidth/1.5;
        const panel = this.game.addEntity('uipanel');
        // const panel = this.game.addEntity("villager");
        const panelPosition = <PositionComponent>panel.getComponent("position");
        panelPosition.width = tileWidth*6;
        panelPosition.height = tileWidth * 11;
        panelPosition.x = panelPosition.width/2;
        panelPosition.y = -panelPosition.height;
        panelPosition.h = 2*panelPosition.height;


        for(let i=0;i<tileComponent.tileSpriteNames.length-0;i++){
            for(let i2=0;i2<25;i2++){
                let spriteName = tileComponent.tileSpriteNames[i];
                let tileButton = this.game.addEntity("click");
                this.tilePallete.push(tileButton);
                let animation = <AnimationComponent>tileButton.getComponent("animation");
                let position = <PositionComponent>tileButton.getComponent("position");
                let clickable = <ClickableComponent>tileButton.getComponent("click");
                animation.setSpriteNumber(spriteName, i2);
                position.width = tileWidth;
                position.height = tileWidth;
                position.x = ((i2%5) * tileWidth) + tileWidth/2;
                position.y = Math.floor(((i*24)+i2)/5) * tileWidth;
                position.x+=panelPosition.width/2 - 5*tileWidth/2;
                position.y+=panelPosition.height/2 - 5*tileWidth/2 - tileWidth;
                position.applyOffsets = false;
                clickable.addListener(()=>{
                    console.log("clicking: "+ spriteName + i2.toString());
                    this.selectedSpriteId.spriteName = spriteName;
                    this.selectedSpriteId.spriteNumber = i2;
                });
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