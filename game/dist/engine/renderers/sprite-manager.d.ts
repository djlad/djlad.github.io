import { SpriteAnimation } from "./sprite-animation";
import { HtmlRectSprite } from "./implementations/html/html-rect-sprite";
import { Sprite } from "./sprite";
import { ISpriteLoader } from "./isprite-loader";
export declare class SpriteManager implements ISpriteLoader {
    constructor(spriteDir?: string);
    onLoad(callback?: () => void): void;
    sprites: {
        [key: string]: Sprite;
    };
    animations: {
        [key: string]: SpriteAnimation;
    };
    RGBs: {
        [key: string]: ImageData;
    };
    createSprite(fileName: string, widthImgs: number, heightImgs: number, offsetx: number, offsety: number): HtmlRectSprite;
    addSprite(spriteName: string, sprite: Sprite): void;
    getSprite(spriteName: string): Sprite;
    loadSprite(spriteName: string, fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): void;
    loadSpriteWithDimensions(spriteName: string, fileName: string, frameWidth: number, frameHeight: number, offsetx?: number, offsety?: number): void;
    loadSpriteOverlapping(spriteName: string, fileName: string): void;
    addAnimation(spriteName: string, animationName: string, spriteNumbers: Array<number>, delay?: number): void;
    getAnimation(animationName: string): SpriteAnimation;
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData;
    static create(): SpriteManager;
    private static spriteManager;
    static singeltonCreate(): SpriteManager;
}
