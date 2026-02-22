import { Game } from "../../game";
import { Entity } from "../../entity/entity";
import { EntitySystem } from "../../system/system";
import { SystemArgs } from "../../system/system-args";
import { FirstEntity } from "../../../entities/first-entity";
export declare class PhaserRenderSystem extends EntitySystem {
    constructor(game: Game);
    static create(game: Game): PhaserRenderSystem;
    apply(args: SystemArgs): void;
    renderTileSet(entity: FirstEntity): void;
    private tileCoordToReal;
    renderText(entity: Entity): void;
    setPhaserAnimations(entity: Entity): void;
    renderPrimitive(entity: Entity): void;
    centerCameraOn(entity: Entity): void;
    applyEvents(): void;
}
