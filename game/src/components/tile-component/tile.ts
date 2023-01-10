import { SpriteId } from "./sprite-id";

export class Tile{
    spriteIds:SpriteId[]=[];
    tileX: number;
    tileY: number;
    public static create(spriteName: string, spriteNumber: number, tileX:number, tileY:number): Tile{
        let tile = new Tile();
        tile.spriteIds.push(SpriteId.create(
            spriteName,
            spriteNumber
        ));
        tile.tileX = tileX;
        tile.tileY = tileY;
        return tile;
    }
}