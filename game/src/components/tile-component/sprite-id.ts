export class SpriteId{
    spriteName: string;
    spriteNumber: number;
    static create(spriteName:string, spriteNumber:number){
        const spriteId = new SpriteId();
        spriteId.spriteName = spriteName;
        spriteId.spriteNumber = spriteNumber;
        return spriteId;
    }
}