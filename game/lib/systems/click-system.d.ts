import { PositionComponent } from "../engine/component/components/position/position-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { GameEvent } from "../engine/events/game-event";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { Renderer } from '../engine/renderers/render';
import { SystemArgs } from "../engine/system/system-args";
export declare class ClickSystem extends EntitySystem {
    constructor(game: Game);
    clicks: GameEvent[];
    clicksToProcessThisLoop: GameEvent[];
    renderer: Renderer;
    private clearClicksAndMoveClicksToProcess;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity, eventManager: EventManager): void;
    pointInPosition(x: number, y: number, position: PositionComponent): boolean;
    static create(game: Game): ClickSystem;
}
