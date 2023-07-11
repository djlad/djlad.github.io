import { Application, Sprite, Container, AnimatedSprite, Spritesheet, ISpritesheetData, Texture } from 'pixi.js';
import { TileComponent } from '../../components/tile-component/tile-component';
import { GenericCameras } from '../dependencies/generic-cameras';
import { GameDependencies } from '../dependencies/game-dependencies';
type SpriteType = Sprite;
export declare class PixiGame {
    tileSprites: {
        [key: string]: SpriteType;
    };
    width: number;
    height: number;
    xBound: number;
    yBound: number;
    spriteNameToAnimationName: {
        [key: string]: string[];
    };
    outViewSprites: SpriteType[];
    ptime: number;
    metadata: {
        [key: string]: {
            width: number;
            height: number;
        };
    };
    private tileKey;
    private getInViewTiles;
    private arrangeTilesInView;
    private removeExisitingSpriteById;
    private removeOutOfViewSprites;
    renderTiles(tiles: TileComponent, cameras: GenericCameras): Promise<void>;
    private loader;
    spriteNameToTexturePromise: {
        [key: string]: Promise<Texture>;
    };
    spriteNameToTexture: {
        [key: string]: Texture;
    };
    spriteNameToAtlas: {
        [key: string]: ISpritesheetData;
    };
    animationNameToSpriteSheet: {
        [key: string]: Spritesheet;
    };
    spriteNameToSpriteSheet: {
        [key: string]: Spritesheet;
    };
    animationNameToParsed: {
        [key: string]: boolean;
    };
    constructor(imgMetaData: {
        [key: string]: {
            width: number;
            height: number;
        };
    });
    app: Application;
    container: Container;
    private spriteDir;
    private path;
    start(): void;
    private getAtlasFrames;
    loadSprite(spriteName: string, fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): void;
    addAnimation(spriteName: string, animationName: string, spriteNumbers: number[], delay?: number): Promise<void>;
    getSpriteAnimation(animationName: string): AnimatedSprite;
    finishLoading(): Promise<void>;
    private finishSpriteSheetGeneration;
    private static pixiGame;
    static createSingleton(deps: GameDependencies): PixiGame;
}
export {};
