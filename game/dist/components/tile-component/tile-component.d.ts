import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import { Tile } from "./tile";
export declare class TileComponent extends Component {
    constructor();
    update(entity: Entity): void;
    tileWidth: number;
    tiles: Tile[];
    private tilesByCoords;
    tileSpriteNames: string[];
    addTile(tile: Tile): void;
    static create(): TileComponent;
    createBuilder(): void;
    removeTiles(): void;
    coordToTile(x: number, y: number): Tile[];
    tileCoordToReal(coord: number): number;
}
