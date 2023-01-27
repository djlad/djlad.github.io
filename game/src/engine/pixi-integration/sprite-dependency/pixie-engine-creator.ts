import { GameDependencies } from "../../dependencies/game-dependencies";
import { PixiDependencies } from "../pixi-dependencies";
import { IEngineCreator } from "./iengine-creator";
import { IEngineSprite } from "./iengine-sprite";
import { PixieEngineSprite } from "./pixi-engine-sprite";

export class PixieEngineCreator implements IEngineCreator {
    gameDependencies: PixiDependencies;
    constructor(gameDependencies:PixiDependencies){
        this.gameDependencies = gameDependencies;
    }
    createEngineSprite(): PixieEngineSprite{
        return PixieEngineSprite.create(this.gameDependencies);
    }
    public static create(gameDependencies:PixiDependencies){
        return new PixieEngineCreator(gameDependencies);
    }
}