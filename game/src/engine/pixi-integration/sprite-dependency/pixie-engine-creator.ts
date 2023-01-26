import { GameDependencies } from "../../dependencies/game-dependencies";
import { IEngineCreator } from "./iengine-creator";
import { IEngineSprite } from "./iengine-sprite";
import { PixieEngineSprite } from "./pixi-engine-sprite";

export class PixieEngineCreator implements IEngineCreator {
    gameDependencies: GameDependencies;
    constructor(gameDependencies:GameDependencies){
        this.gameDependencies = gameDependencies;
    }
    createEngineSprite(): PixieEngineSprite{
        return PixieEngineSprite.create(this.gameDependencies);
    }
    public static create(gameDependencies:GameDependencies){
        return new PixieEngineCreator(gameDependencies);
    }
}