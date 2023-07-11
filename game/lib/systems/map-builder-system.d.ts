import { Tile } from "../components/tile-component/tile";
import { TileComponent } from "../components/tile-component/tile-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { SystemArgs } from "../engine/system/system-args";
export declare class MapBuilderSystem extends EntitySystem {
    private clicks;
    private openBuilder;
    private tilePallete;
    private selectedSpriteId;
    constructor(game: Game);
    apply(args: SystemArgs): void;
    createPalleteEntities(): void;
    mouseCoordToTile(x: number, y: number, tileComponent: TileComponent): Tile;
    applyEvents(entity: Entity, eventManager: EventManager): void;
    static create(game: Game): MapBuilderSystem;
}
