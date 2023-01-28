import { GameDependencies } from "../dependencies/game-dependencies";
import { ISpriteLoader } from "../renderers/isprite-loader";
import { PixiDependencies } from "./pixi-dependencies";
import { PixiGame } from "./pixi-game";

export class PixiSpriteManager implements ISpriteLoader {
    pixiGame: PixiGame;
    constructor(pixiGame:PixiGame){
        this.pixiGame = pixiGame;
    }
    async onLoad(callback?: () => void): Promise<any> {
        const textures = this.pixiGame.spriteNameToTexture;
        for(let i in textures){
            const texture = textures[i];
            await texture;
        }
        const spriteSheets = this.pixiGame.animationNameToSpriteSheet;
        for (let i in spriteSheets){
            const spriteSheet = spriteSheets[i];
            spriteSheet.parse();
        }
        if (callback == null)return;
        callback();
    }
    loadSprite(spriteName: string, fileName: string, widthImgs: number, heightImgs: number, offsetx?: number, offsety?: number): void {
        this.pixiGame.loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx, offsety);
    }
    loadSpriteWithDimensions(spriteName: string, fileName: string, frameWidth: number, frameHeight: number, offsetx: number, offsety: number): void {
    }
    loadSpriteOverlapping(spriteName: string, fileName: string): void {
    }
    addAnimation(spriteName: string, animationName: string, spriteNumbers: number[], delay?: number): void {
        this.pixiGame.addAnimation(spriteName, animationName, spriteNumbers, delay)
    }
    public static create(gameDependencies:PixiDependencies){
        gameDependencies.checkDependency(gameDependencies.pixiGame);
        return new PixiSpriteManager(gameDependencies.pixiGame);
    };
}