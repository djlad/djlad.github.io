import { SpriteId } from "./sprite-id";
export declare class Tile {
    spriteIds: SpriteId[];
    tileX: number;
    tileY: number;
    static create(spriteName: string, spriteNumber: number, tileX: number, tileY: number): Tile;
}
