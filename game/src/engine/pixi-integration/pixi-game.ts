import { Application, Sprite, IApplicationOptions, Container, Assets, AssetsClass, AnimatedSprite, Spritesheet, BaseTexture, IAutoDetectOptions, IBaseTextureOptions, ISize, Resource, ISpritesheetData, ISpritesheetFrameData, spritesheetAsset} from 'pixi.js';
import { metadata } from '../../metadata';
type Dict<T> = {
    [key: string]: T;
}
export class PixiGame {
    private loader: AssetsClass;
    spriteNameToTexture: {[key:string]:Promise<any>} = {};
    spriteNameToAtlas: {[key:string]:ISpritesheetData} = {};
    animationNameToSpriteSheet: {[key:string]: Spritesheet} = {};
    animationNameToParsed: {[key:string]:boolean} = {};
    constructor(){
        this.app = new Application({
            width: window.innerWidth,
            height:window.innerHeight
        });
        this.loader = Assets;
        document.body.appendChild(this.app.view as any);//I think not taking ICanvas is a bug.
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
        const path: string = this.path(fileName);
        const texturePromise = this.loader.load(path);
        this.spriteNameToTexture[spriteName] = texturePromise;
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
        const texture = await this.spriteNameToTexture[spriteName];
        const atlas = this.spriteNameToAtlas[spriteName];
        if (atlas == null) return;// temporarily skip.
        const allFrames = atlas.frames;
        const animationFrames:Dict<ISpritesheetFrameData> = {};
        spriteNumbers.forEach(num => {
            const frameKey = num.toString();
            animationFrames[frameKey] = allFrames[frameKey];
        });
        atlas.animations[animationName] = spriteNumbers.map((n)=>n.toString());
        const spriteSheet = new Spritesheet(texture, atlas);
        this.animationNameToSpriteSheet[animationName] = spriteSheet;
    }

    getSpriteAnimation(animationName:string){
        const spriteSheet = this.animationNameToSpriteSheet[animationName];
        // console.log(this.animationNameToSpriteSheet);
        // if (spriteSheet == null)return null;
        if (!(animationName in this.animationNameToParsed)){
            spriteSheet.parse();
            this.animationNameToParsed[animationName] = true;
        }
        const animation = new AnimatedSprite(spriteSheet.animations[animationName]);
        animation.animationSpeed = 0.1666;
        animation.play();
        this.container.addChild(animation);
        return animation;
    }

    public static createSingleton(){
        return new PixiGame();
    }
}