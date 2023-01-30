import { AnimationComponent } from "../../../components/animation-component";
import { Component } from "../../component/component";
import { IPositionComponent } from "../../component/components/position/iposition-component";
import { PositionComponent } from "../../component/components/position/position-component";
import { GenericCameras } from "../../dependencies/generic-cameras";
import { ICameras } from "../../dependencies/icameras";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { EventType } from "../../events/EventType";
import { EventManager } from "../../events/event-manager";
import { Game } from "../../game";
import { EntitySystem } from "../../system/system";
import { SystemArgs } from "../../system/system-args";
import { IEngineCreator } from "../sprite-dependency/iengine-creator";
import { PixiGame } from "../pixi-game";
import { TileComponent } from "../../../components/tile-component/tile-component";

export class GenericRenderSystem extends EntitySystem {
    creator: IEngineCreator;
    cameras: GenericCameras;
    pixieGame: PixiGame;
    constructor(game:Game, entityId:string){
        super(game);
        const deps = this.game.gameDependencies;
        deps.checkDependency(deps.engineCreator);
        this.creator = deps.engineCreator;
        deps.checkDependency(deps.cameras);
        this.cameras = <GenericCameras>deps.cameras;
        game.eventManager.addListener(EventType.entityMoved, (event)=>{
            const newX:number = event.eventData.x;
            const newY:number = event.eventData.y;
            const entityId:number = event.eventData.entityId;
            const sprite = this.creator.createEngineSprite(entityId.toString());
            sprite.x = this.cameras.transformX(newX);
            sprite.y = this.cameras.transformY(newY);
        })
        this.pixieGame = PixiGame.createSingleton();
    }
    oncePerLoop = (args:SystemArgs) => {
        const first = args.entity;
        const tiles = <TileComponent>first.getComponent("tile");
        this.pixieGame.renderTiles(tiles, this.cameras);
    };
    targetComponents:Component[];

    apply(args:SystemArgs):void{
        // const entity = args.entity;
        // const position = <PositionComponent>entity.getComponent("position");
        // const animation = <AnimationComponent>entity.getComponent("animation");

    };
    applyEvents(entity:Entity, eventManager:EventManager):void{
    }
    static create(game:Game, entityId?:string):GenericRenderSystem{
    return new GenericRenderSystem(game, entityId);
    };
    
}