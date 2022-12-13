export class Tile{
    spriteName: string;
    spriteNumber: number;
    tileX: number;
    tileY: number;
    public static create(spriteName: string, spriteNumber: number, tileX:number, tileY:number): Tile{
        let tile = new Tile();
        tile.spriteName = spriteName;
        tile.spriteNumber = spriteNumber;
        tile.tileX = tileX;
        tile.tileY = tileY;
        return tile;
    }
}