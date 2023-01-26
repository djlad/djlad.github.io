import { IEngineSprite } from "./iengine-sprite";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { IEngineCreator } from "./iengine-creator";

export class PixieEngineSprite implements IEngineSprite {
    creator: IEngineCreator;
    constructor(gameDependencies:GameDependencies){
        this.creator = gameDependencies.engineCreator;
    }
    width: number;
    height: number;
    faceRight: boolean;
    x: number;
    y: number;
    vx: number;
    vy: number;
    setSprite(animationName: string): void {

    }
    public static create(gameDependencies:GameDependencies){
        return new PixieEngineSprite(gameDependencies);
    }
}