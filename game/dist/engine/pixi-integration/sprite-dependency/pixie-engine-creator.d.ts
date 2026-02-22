import { PixiDependencies } from "../pixi-dependencies";
import { IEngineCreator } from "./iengine-creator";
import { PixieEngineSprite } from "./pixi-engine-sprite";
export declare class PixieEngineCreator implements IEngineCreator {
    gameDependencies: PixiDependencies;
    idToEngineSprite: {
        [key: string]: PixieEngineSprite;
    };
    constructor(gameDependencies: PixiDependencies);
    createEngineSprite(entityId: string): PixieEngineSprite;
    static create(gameDependencies: PixiDependencies): PixieEngineCreator;
}
