import { Application, Sprite, IApplicationOptions, Container, Assets, AssetsClass, AnimatedSprite, Spritesheet, BaseTexture, IAutoDetectOptions, IBaseTextureOptions, ISize, Resource, ISpritesheetData, ISpritesheetFrameData, spritesheetAsset, Texture, FrameObject} from 'pixi.js';
import { metadata } from '../../metadata';
import { TileComponent } from '../../components/tile-component/tile-component';
import { Tile } from '../../components/tile-component/tile';

type Dict<T> = {
    [key: string]: T;
}
export class PixiGame {
    tileSprites: {[key:string]:AnimatedSprite} = {};
    spriteNameToAnimationName: {[key:string]: string[]} = {};
    private tileKey(tile:Tile){
        return `${tile.tileX}:${tile.tileY}`
    }
    async renderTiles(tiles: TileComponent) {
        // return;
        const width = this.app.view.width;
        const height = this.app.view.height;
        tiles.tiles.forEach((tile)=>{
            const pixiGame = this;
            tile.spriteIds.forEach((spriteId)=>{
                // const texture = await this.spriteNameToTexture[spriteId.spriteName];
                const texture = this.spriteNameToTexture[spriteId.spriteName];
                const spriteNum = spriteId.spriteNumber;
                const x = tile.tileX;
                const y = tile.tileY;
                const key = this.tileKey(tile);
                let tileSprite = this.tileSprites[key];
                if (tileSprite == null){
                    tileSprite = new AnimatedSprite([texture]);
                    // this.container.addChild(tileSprite);
                    this.tileSprites[key] = tileSprite;
                }
            });
        });
    }
    private loader: AssetsClass;
    spriteNameToTexturePromise: {[key:string]:Promise<Texture>} = {};
    spriteNameToTexture: {[key:string]:Texture} = {};
    spriteNameToAtlas: {[key:string]:ISpritesheetData} = {};
    animationNameToSpriteSheet: {[key:string]:Spritesheet} = {};
    spriteNameToSpriteSheet: {[key:string]:Spritesheet} = {};
    animationNameToParsed: {[key:string]:boolean} = {};
    constructor(){
        this.app = new Application({
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.loader = Assets;
        document.body.appendChild(this.app.view as any);//I think not taking ICanvas is a bug.
        const canvas = this.app.renderer.view;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //@ts-ignore
        canvas.style.margin = "0";
        //@ts-ignore
        canvas.style.padding = "0";
        //@ts-ignore
        canvas.style.overflow = "hidden";
        //@ts-ignore
        canvas.style.position = "fixed";
        //@ts-ignore
        canvas.style.top = "0px";
        //@ts-ignore
        canvas.style.left = "0px";
        this.container = new Container();
        this.app.stage.addChild(this.container);
    }
    app: Application;
    container: Container;
    private spriteDir: string = "../sprites/"
    private path(fileName:string){
        return this.spriteDir + fileName;
    }
    start(){
    }
    private getAtlasFrames(sheetWidth:number, sheetHeight:number, widthImgs:number, heightImgs:number){
        const frameWidth = sheetWidth/widthImgs;
        const frameHeight = sheetHeight/heightImgs;
        const frames: Dict<ISpritesheetFrameData> = {};
        let frameNumber = 0;
        for (let y=0;y<sheetHeight;y+=frameHeight){
            for(let x=0;x<sheetWidth;x+=frameWidth){
                const frameKey = `${frameNumber}`;
                frames[frameKey] = {
                    frame:{x:x, y:y, w:frameWidth, h:frameHeight},
                    sourceSize: {w:frameWidth, h:frameHeight},
                    spriteSourceSize: {x:0,y:0}
                };
                frameNumber++;
            }
        }
        return frames;
    }
    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number, offsetx:number=0, offsety:number=0){
        this.spriteNameToAnimationName[spriteName] = [];
        const path: string = this.path(fileName);
        const texturePromise = this.loader.load(path);
        this.spriteNameToTexturePromise[spriteName] = texturePromise;
        texturePromise.then((texture)=>{
            this.spriteNameToTexture[spriteName] = texture;
        });
        const width:number = metadata[path.replace("../", "")].width;
        const height:number = metadata[path.replace("../", "")].height;
        const frames = this.getAtlasFrames(width, height, widthImgs, heightImgs);
        const atlas: ISpritesheetData = {
            frames:frames,
            meta:{
                // image: 'images/spritesheet.png',
                // format:"RGBA8888",
                // size: { w: 128, h: 32 },
                scale: "1"
            },
            animations: {}
        };
        this.spriteNameToAtlas[spriteName] = atlas;
    }
    async addAnimation(spriteName: string, animationName: string, spriteNumbers: number[], delay?: number){
        // load sprite must be loaded by this.loadSprite
        if (!(spriteName in this.spriteNameToAnimationName)){
            console.log(`Skipped Animation: ${spriteName}`);
            return;
        }
        this.spriteNameToAnimationName[spriteName].push(animationName);
        const texture = await this.spriteNameToTexturePromise[spriteName];
        const atlas = this.spriteNameToAtlas[spriteName];
        if (atlas == null) return;// temporarily skip.
        const allFrames = atlas.frames;
        const animationFrames:Dict<ISpritesheetFrameData> = {};
        spriteNumbers.forEach(num => {
            const frameKey = num.toString();
            animationFrames[frameKey] = allFrames[frameKey];
        });
        atlas.animations[animationName] = spriteNumbers.map((n)=>n.toString());
    }

    getSpriteAnimation(animationName:string){
        const spriteSheet = this.animationNameToSpriteSheet[animationName];
        if (!(animationName in this.animationNameToParsed)){
            this.animationNameToParsed[animationName] = true;
        }
        const animationFrames = spriteSheet.animations[animationName];
        const animation = new AnimatedSprite(animationFrames);
        animation.animationSpeed = 0.1666;
        animation.play();
        this.container.addChild(animation);
        this.container.sortableChildren = true;
        return animation;
    }

    async finishLoading(){
        const textures = this.spriteNameToTexturePromise;
        for(let i in textures){
            const texture = textures[i];
            await texture;
        }
        this.finishSpriteSheetGeneration();
        const spriteSheets = this.spriteNameToSpriteSheet;
        for (let i in spriteSheets){
            const spriteSheet = spriteSheets[i];
            spriteSheet.parse();
        }
    }

    private finishSpriteSheetGeneration(){
        // Create SpriteSheets
        const spriteToAnimation = this.spriteNameToAnimationName
        for (let spriteName in spriteToAnimation){
            const animationNames = spriteToAnimation[spriteName];
            const texture = this.spriteNameToTexture[spriteName];
            const atlas = this.spriteNameToAtlas[spriteName];
            const spriteSheet = new Spritesheet(texture, atlas);
            animationNames.forEach((animationName)=>{
                this.animationNameToSpriteSheet
                this.spriteNameToSpriteSheet[spriteName] = spriteSheet
                this.animationNameToSpriteSheet[animationName] = spriteSheet;
            });
        }
    }

    private static pixiGame:PixiGame = null;
    public static createSingleton(){
        if (this.pixiGame != null) return PixiGame.pixiGame;
        PixiGame.pixiGame = new PixiGame();
        return PixiGame.pixiGame;
    }
}