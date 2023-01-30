import { GameDependencies } from "../../dependencies/game-dependencies";
import { PixiDependencies } from "../pixi-dependencies";
import { IEngineCreator } from "./iengine-creator";
import { IEngineSprite } from "./iengine-sprite";
import { PixieEngineSprite } from "./pixi-engine-sprite";

export class PixieEngineCreator implements IEngineCreator {
    gameDependencies: PixiDependencies;
    idToEngineSprite: {[key:string]:PixieEngineSprite} = {};
    constructor(gameDependencies:PixiDependencies){
        this.gameDependencies = gameDependencies;
    }
    createEngineSprite(entityId: string): PixieEngineSprite{
        if (entityId in this.idToEngineSprite) return this.idToEngineSprite[entityId];
        const entity = PixieEngineSprite.create(this.gameDependencies);
        this.idToEngineSprite[entityId] = entity;
        return entity;
    }
    public static create(gameDependencies:PixiDependencies){
        return new PixieEngineCreator(gameDependencies);
    }
}