import { Application, Sprite, IApplicationOptions, Container, Assets, AssetsClass, AnimatedSprite, Spritesheet, BaseTexture, IAutoDetectOptions, IBaseTextureOptions, ISize, Resource, ISpritesheetData, ISpritesheetFrameData, spritesheetAsset, Texture, FrameObject} from 'pixi.js';
import { metadata } from '../../metadata';
import { TileComponent } from '../../components/tile-component/tile-component';
import { Tile } from '../../components/tile-component/tile';
import { GenericCameras } from '../dependencies/generic-cameras';

type Dict<T> = {
    [key: string]: T;
}
type SpriteType = Sprite;
export class PixiGame {
    tileSprites: {[key:string]:SpriteType} = {};
    width:number;
    height:number;
    xBound:number = 64;//how far left of 0 should we render tiles
    yBound:number = 64;//how far above 0 should we render tiles
    spriteNameToAnimationName: {[key:string]: string[]} = {};
    outViewSprites: SpriteType[] = [];
    private tileKey(tile:Tile){
        return `${tile.tileX}:${tile.tileY}`
    }
    private getInViewTiles(tiles:TileComponent, cameras:GenericCameras){
        const inViewTiles:{[key:string]:Tile} = {};
        const xBound = this.xBound;
        const yBound = this.yBound;
        for (let x=-xBound;x<this.width+xBound;x+=tiles.tileWidth){
            const dataX = cameras.untransformX(x);
            for (let y=-yBound;y<this.height+yBound;y+=tiles.tileWidth){
                const dataY = cameras.untransformY(y);
                const tilesAtCoord = tiles.coordToTile(dataX, dataY);
                if (tilesAtCoord.length == 0) continue;
                const tileAtCoord = tilesAtCoord[0];
                const key = this.tileKey(tileAtCoord);
                inViewTiles[key] = tileAtCoord;
            }
        }
        return inViewTiles;
    }
    private arrangeTilesInView(tiles:TileComponent, cameras:GenericCameras, outViewSprites:SpriteType[] = []){
        const width = this.width;
        const height = this.height;
        const xBound = this.xBound;
        const yBound = this.yBound;
        for (let x=-xBound;x<width+xBound;x+=tiles.tileWidth){
            const dataX = cameras.untransformX(x);
            for (let y=-yBound;y<height+yBound;y+=tiles.tileWidth){
                const dataY = cameras.untransformY(y);
                const tilesAtCoord = tiles.coordToTile(dataX, dataY);
                if (tilesAtCoord.length == 0) continue;
                const tileAtCoord = tilesAtCoord[0];
                const spriteName = tileAtCoord.spriteIds[0].spriteName;
                const spriteNum = tileAtCoord.spriteIds[0].spriteNumber;
                const spriteSheet = this.spriteNameToSpriteSheet[spriteName];
                const key = this.tileKey(tileAtCoord);
                let tileSprite = this.tileSprites[key];
                if (tileSprite == null && this.outViewSprites.length == 0){
                    tileSprite = new Sprite(spriteSheet.textures[spriteNum]);
                    tileSprite.width = tiles.tileWidth + 2;
                    tileSprite.height = tiles.tileWidth + 2;
                    this.tileSprites[key] = tileSprite;
                    this.container.addChild(tileSprite);
                }
                if (tileSprite == null && this.outViewSprites.length > 0){
                    tileSprite = this.outViewSprites.pop();
                    tileSprite.texture = spriteSheet.textures[spriteNum];
                    this.tileSprites[key] = tileSprite;
                }
                tileSprite.x = cameras.transformX(tiles.tileCoordToReal(tileAtCoord.tileX));
                tileSprite.y = cameras.transformY(tiles.tileCoordToReal(tileAtCoord.tileY));
            }
        }
    }
    private removeExisitingSpriteById(spriteKey:string){
        const tileSprite = this.tileSprites[spriteKey];
        delete this.tileSprites[spriteKey];
        this.outViewSprites.push(tileSprite);
        return tileSprite;
    }
    private removeOutOfViewSprites(){
        for(let key in this.tileSprites){
            const existingSprite = this.tileSprites[key];
            if (!(key in this.outViewSprites)){
                const sprite = this.removeExisitingSpriteById(key);
            }
        }
    }
    async renderTiles(tiles: TileComponent, cameras:GenericCameras) {
        const inViewTiles = this.getInViewTiles(tiles, cameras);
        this.removeOutOfViewSprites();
        this.arrangeTilesInView(tiles, cameras, this.outViewSprites);
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
        this.width = this.app.view.width;
        this.height = this.app.view.height;
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
        if (spriteSheet == null || !(animationName in spriteSheet.animations)){
            // console.log(`Animation not found: ${animationName}`);
            return;
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
            this.spriteNameToSpriteSheet[spriteName] = spriteSheet;
            animationNames.forEach((animationName)=>{
                this.animationNameToSpriteSheet
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