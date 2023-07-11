import { ISpriteLoader } from "../renderers/isprite-loader";
import { SpriteAnimation } from "../renderers/sprite-animation";
export declare class PhaserSpriteManager implements ISpriteLoader {
    constructor(spriteDir?: string);
    onLoad(callback?: () => void): void;
    private spriteDir;
    private phaserGame;
    private spriteNameToPath;
    private path;
    loadSprite(spriteName: string, fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): void;
    loadSpriteWithDimensions(spriteName: string, fileName: string, frameWidth: number, frameHeight: number, offsetx?: number, offsety?: number): void;
    loadSpriteOverlapping(spriteName: string, fileName: string): void;
    addAnimation(spriteName: string, animationName: string, spriteNumbers: Array<number>, delay?: number): void;
    getAnimation(animationName: string): SpriteAnimation;
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData;
    static create(): PhaserSpriteManager;
    private static spriteManager;
    static singeltonCreate(): PhaserSpriteManager;
}
