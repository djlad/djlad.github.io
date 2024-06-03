import { EntitySystem } from "../engine/system/system";
import { Game } from "../engine/game";
import { Entity } from "../engine/entity/entity";
import { SystemArgs } from "../engine/system/system-args";
export declare class PlaceItemSystem extends EntitySystem {
    constructor(game: Game);
    shouldApply(entity: Entity): boolean;
    apply(args: SystemArgs): void;
    applyEvents(): void;
    private tileSize;
    private realCoordinatesToTileCoordinates;
    private placeItem;
    static create(game: Game): PlaceItemSystem;
}
