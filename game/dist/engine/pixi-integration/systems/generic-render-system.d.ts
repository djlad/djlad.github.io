import { Component } from "../../component/component";
import { GenericCameras } from "../../dependencies/generic-cameras";
import { Entity } from "../../entity/entity";
import { EventManager } from "../../events/event-manager";
import { Game } from "../../game";
import { EntitySystem } from "../../system/system";
import { SystemArgs } from "../../system/system-args";
import { IEngineCreator } from "../sprite-dependency/iengine-creator";
import { PixiGame } from "../pixi-game";
export declare class GenericRenderSystem extends EntitySystem {
    creator: IEngineCreator;
    cameras: GenericCameras;
    pixieGame: PixiGame;
    constructor(game: Game, entityId: string);
    oncePerLoop: (args: SystemArgs) => void;
    targetComponents: Component[];
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity, eventManager: EventManager): void;
    static create(game: Game, entityId?: string): GenericRenderSystem;
}
