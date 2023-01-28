import { IEngineSprite } from "./iengine-sprite";

export interface IEngineCreator {
    createEngineSprite(entityId:string):IEngineSprite;
}