import { IEngineSprite } from "./iengine-sprite";

export interface IEngineCreator {
    createEngineSprite():IEngineSprite;
}