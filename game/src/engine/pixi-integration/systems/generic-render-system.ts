import { AnimationComponent } from "../../../components/animation-component";
import { Component } from "../../component/component";
import { IPositionComponent } from "../../component/components/position/iposition-component";
import { PositionComponent } from "../../component/components/position/position-component";
import { Entity } from "../../entity/entity";
import { EventManager } from "../../events/event-manager";
import { Game } from "../../game";
import { EntitySystem } from "../../system/system";
import { SystemArgs } from "../../system/system-args";
import { IEngineCreator } from "../sprite-dependency/iengine-creator";

export class GenericRenderSystem extends EntitySystem {
    creator: IEngineCreator;
    constructor(game:Game, entityId:string){
        super(game);
        this.creator = this.game.gameDependencies.engineCreator;
    }
    targetComponents:Component[];

    apply(args:SystemArgs):void{
        const entity = args.entity;
        const position = <PositionComponent>entity.getComponent("position");
        const animation = <AnimationComponent>entity.getComponent("animation");

    };
    applyEvents(entity:Entity, eventManager:EventManager):void{
    }
    static create(game:Game, entityId:string):GenericRenderSystem{
    return new GenericRenderSystem(game, entityId);
    };
    
}