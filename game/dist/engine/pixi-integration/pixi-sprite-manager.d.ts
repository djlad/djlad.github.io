import { ISpriteLoader } from "../renderers/isprite-loader";
import { PixiDependencies } from "./pixi-dependencies";
import { PixiGame } from "./pixi-game";
export declare class PixiSpriteManager implements ISpriteLoader {
    pixiGame: PixiGame;
    constructor(pixiGame: PixiGame);
    onLoad(callback?: () => void): Promise<any>;
    loadSprite(spriteName: string, fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): void;
    loadSpriteWithDimensions(spriteName: string, fileName: string, frameWidth: number, frameHeight: number, offsetx: number, offsety: number): void;
    loadSpriteOverlapping(spriteName: string, fileName: string): void;
    addAnimation(spriteName: string, animationName: string, spriteNumbers: number[], delay?: number): void;
    static create(gameDependencies: PixiDependencies): PixiSpriteManager;
}
