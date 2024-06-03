var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "pixi.js", "../../metadata"], function (require, exports, pixi_js_1, metadata_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PixiGame = void 0;
    class PixiGame {
        tileKey(tile) {
            return `${tile.tileX}:${tile.tileY}`;
        }
        getInViewTiles(tiles, cameras) {
            const inViewTiles = {};
            const xBound = this.xBound;
            const yBound = this.yBound;
            for (let x = -xBound; x < this.width + xBound; x += tiles.tileWidth) {
                const dataX = cameras.untransformX(x);
                for (let y = -yBound; y < this.height + yBound; y += tiles.tileWidth) {
                    const dataY = cameras.untransformY(y);
                    const tilesAtCoord = tiles.coordToTile(dataX, dataY);
                    if (tilesAtCoord.length == 0)
                        continue;
                    const tileAtCoord = tilesAtCoord[0];
                    const key = this.tileKey(tileAtCoord);
                    inViewTiles[key] = tileAtCoord;
                }
            }
            return inViewTiles;
        }
        arrangeTilesInView(tiles, cameras, outViewSprites = []) {
            const width = this.width;
            const height = this.height;
            const xBound = this.xBound;
            const yBound = this.yBound;
            let dataX;
            let dataY;
            for (let x = -xBound; x < width + xBound; x += tiles.tileWidth) {
                dataX = cameras.untransformX(x);
                for (let y = -yBound; y < height + yBound; y += tiles.tileWidth) {
                    dataY = cameras.untransformY(y);
                    const tilesAtCoord = tiles.coordToTile(dataX, dataY);
                    if (tilesAtCoord.length == 0)
                        continue;
                    const tileAtCoord = tilesAtCoord[0];
                    const spriteName = tileAtCoord.spriteIds[0].spriteName;
                    const spriteNum = tileAtCoord.spriteIds[0].spriteNumber;
                    const spriteSheet = this.spriteNameToSpriteSheet[spriteName];
                    const key = this.tileKey(tileAtCoord);
                    let tileSprite = this.tileSprites[key];
                    if (tileSprite == null && this.outViewSprites.length == 0) {
                        tileSprite = new pixi_js_1.Sprite(spriteSheet.textures[spriteNum]);
                        tileSprite.width = tiles.tileWidth + 2;
                        tileSprite.height = tiles.tileWidth + 2;
                        this.tileSprites[key] = tileSprite;
                        this.container.addChild(tileSprite);
                    }
                    if (tileSprite == null && this.outViewSprites.length > 0) {
                        tileSprite = this.outViewSprites.pop();
                        tileSprite.texture = spriteSheet.textures[spriteNum];
                        this.tileSprites[key] = tileSprite;
                    }
                    tileSprite.x = cameras.transformX(tiles.tileCoordToReal(tileAtCoord.tileX)) - cameras.center.vx;
                    tileSprite.y = cameras.transformY(tiles.tileCoordToReal(tileAtCoord.tileY)) - cameras.center.vy;
                }
            }
        }
        removeExisitingSpriteById(spriteKey) {
            const tileSprite = this.tileSprites[spriteKey];
            delete this.tileSprites[spriteKey];
            this.outViewSprites.push(tileSprite);
            return tileSprite;
        }
        removeOutOfViewSprites(inViewTiles) {
            for (let key in this.tileSprites) {
                const existingSprite = this.tileSprites[key];
                if (!(key in inViewTiles)) {
                    const sprite = this.removeExisitingSpriteById(key);
                }
            }
        }
        renderTiles(tiles, cameras) {
            return __awaiter(this, void 0, void 0, function* () {
                const inViewTiles = this.getInViewTiles(tiles, cameras);
                this.removeOutOfViewSprites(inViewTiles);
                this.arrangeTilesInView(tiles, cameras, this.outViewSprites);
            });
        }
        constructor(imgMetaData) {
            this.tileSprites = {};
            this.xBound = 64;
            this.yBound = 64;
            this.spriteNameToAnimationName = {};
            this.outViewSprites = [];
            this.spriteNameToTexturePromise = {};
            this.spriteNameToTexture = {};
            this.spriteNameToAtlas = {};
            this.animationNameToSpriteSheet = {};
            this.spriteNameToSpriteSheet = {};
            this.animationNameToParsed = {};
            this.spriteDir = "../sprites/";
            this.metadata = imgMetaData !== null && imgMetaData !== void 0 ? imgMetaData : metadata_1.metadata;
            this.app = new pixi_js_1.Application({
                width: window.innerWidth,
                height: window.innerHeight
            });
            this.loader = pixi_js_1.Assets;
            document.body.appendChild(this.app.view);
            const canvas = this.app.renderer.view;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.margin = "0";
            canvas.style.padding = "0";
            canvas.style.overflow = "hidden";
            canvas.style.position = "fixed";
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            this.container = new pixi_js_1.Container();
            this.app.stage.addChild(this.container);
            this.width = this.app.view.width;
            this.height = this.app.view.height;
        }
        path(fileName) {
            return this.spriteDir + fileName;
        }
        start() {
        }
        getAtlasFrames(sheetWidth, sheetHeight, widthImgs, heightImgs) {
            const frameWidth = sheetWidth / widthImgs - 1;
            const frameHeight = sheetHeight / heightImgs - 1;
            if (sheetWidth === 256 && sheetHeight === 192) {
                console.log(frameWidth, frameHeight);
            }
            const frames = {};
            let frameNumber = 0;
            for (let y = 0; y < sheetHeight; y += frameHeight + 1) {
                for (let x = 0; x < sheetWidth; x += frameWidth + 1) {
                    const frameKey = `${frameNumber}`;
                    frames[frameKey] = {
                        frame: { x: x, y: y, w: frameWidth, h: frameHeight },
                        sourceSize: { w: frameWidth, h: frameHeight },
                        spriteSourceSize: { x: 0, y: 0 }
                    };
                    frameNumber++;
                }
            }
            return frames;
        }
        loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
            this.spriteNameToAnimationName[spriteName] = [];
            const path = this.path(fileName);
            const texturePromise = this.loader.load(path);
            this.spriteNameToTexturePromise[spriteName] = texturePromise;
            texturePromise.then((texture) => {
                this.spriteNameToTexture[spriteName] = texture;
            });
            const width = this.metadata[path.replace("../", "")].width;
            const height = this.metadata[path.replace("../", "")].height;
            if ('swords' === spriteName) {
                console.log(spriteName);
                console.log(width, height);
            }
            const frames = this.getAtlasFrames(width, height, widthImgs, heightImgs);
            const atlas = {
                frames: frames,
                meta: {
                    scale: "1"
                },
                animations: {}
            };
            this.spriteNameToAtlas[spriteName] = atlas;
        }
        addAnimation(spriteName, animationName, spriteNumbers, delay) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(spriteName in this.spriteNameToAnimationName)) {
                    console.log(`Skipped Animation: ${spriteName}`);
                    return;
                }
                this.spriteNameToAnimationName[spriteName].push(animationName);
                const texture = yield this.spriteNameToTexturePromise[spriteName];
                const atlas = this.spriteNameToAtlas[spriteName];
                if (atlas == null)
                    return;
                const allFrames = atlas.frames;
                const animationFrames = {};
                spriteNumbers.forEach(num => {
                    const frameKey = num.toString();
                    animationFrames[frameKey] = allFrames[frameKey];
                });
                atlas.animations[animationName] = spriteNumbers.map((n) => n.toString());
            });
        }
        getSpriteAnimation(animationName) {
            const spriteSheet = this.animationNameToSpriteSheet[animationName];
            if (!(animationName in this.animationNameToParsed)) {
                this.animationNameToParsed[animationName] = true;
            }
            if (spriteSheet == null || !(animationName in spriteSheet.animations)) {
                return;
            }
            const animationFrames = spriteSheet.animations[animationName];
            const animation = new pixi_js_1.AnimatedSprite(animationFrames);
            animation.animationSpeed = 0.1666;
            animation.play();
            this.container.addChild(animation);
            this.container.sortableChildren = true;
            return animation;
        }
        finishLoading() {
            return __awaiter(this, void 0, void 0, function* () {
                const textures = this.spriteNameToTexturePromise;
                for (let i in textures) {
                    const texture = textures[i];
                    yield texture;
                }
                this.finishSpriteSheetGeneration();
                const spriteSheets = this.spriteNameToSpriteSheet;
                for (let i in spriteSheets) {
                    const spriteSheet = spriteSheets[i];
                    spriteSheet.parse();
                    pixi_js_1.utils.clearTextureCache();
                }
            });
        }
        finishSpriteSheetGeneration() {
            const spriteToAnimation = this.spriteNameToAnimationName;
            for (let spriteName in spriteToAnimation) {
                const animationNames = spriteToAnimation[spriteName];
                const texture = this.spriteNameToTexture[spriteName];
                const atlas = this.spriteNameToAtlas[spriteName];
                const spriteSheet = new pixi_js_1.Spritesheet(texture, atlas);
                this.spriteNameToSpriteSheet[spriteName] = spriteSheet;
                animationNames.forEach((animationName) => {
                    this.animationNameToSpriteSheet;
                    this.animationNameToSpriteSheet[animationName] = spriteSheet;
                });
            }
        }
        static createSingleton(deps) {
            if (this.pixiGame != null)
                return PixiGame.pixiGame;
            const metadata = deps.imgMetaData;
            PixiGame.pixiGame = new PixiGame(metadata);
            return PixiGame.pixiGame;
        }
    }
    exports.PixiGame = PixiGame;
    PixiGame.pixiGame = null;
});
//# sourceMappingURL=pixi-game.js.map