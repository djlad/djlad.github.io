interface SpriteManager {

}

interface Sprite {
    widthImgs:number,
    heightImgs:number
}

class HtmlSprite implements Sprite {
    constructor(fileName:string, widthImgs:number, heightImgs:number){
        var spriteImg = new Image();
        spriteImg.src = this.spriteDir + fileName;
        this.sprite = spriteImg;
        this.widthImgs = widthImgs;
        this.heightImgs = heightImgs;
        spriteImg.onload = this.setFrameDimensions(this);
    }
    spriteDir:string = "../sprites/";
    widthImgs:number;
    heightImgs:number;
    frameWidth:number;
    frameHeight:number;
    sprite:HTMLImageElement;

    private setFrameDimensions(sprite:HtmlSprite){
        return function(){
            sprite.frameWidth = sprite.sprite.width/sprite.widthImgs;
            sprite.frameHeight = sprite.sprite.height/sprite.heightImgs;
        }
    }

    frameCoords(spriteNum:number){
        var frameWidth:number = this.sprite.width/this.widthImgs;
        var frameHeight:number = this.sprite.height/this.heightImgs;
        var framex:number = spriteNum%this.widthImgs * frameWidth;
        var framey:number = Math.floor(spriteNum/this.widthImgs) * frameHeight;
        return [framex, framey];
    }
}

export class SpriteAnimation{
    constructor(animationName:string, spriteName:string, spriteNumbers:number[], delay:number){
        this.spriteNumbers = spriteNumbers;
        this.animationName = animationName;
        this.spriteName = spriteName;
        this.delay = delay;
    }
    spriteNumbers:number[];
    animationName:string;
    spriteName:string;
    delay:number;

    static create(animationName:string, spriteName:string, spriteNumbers:number[], delay:number=1){
        var sa:SpriteAnimation = new SpriteAnimation(
            animationName,
            spriteName,
            spriteNumbers,
            delay
        );
        return sa;
    }
}

export class HtmlSpriteManager implements SpriteManager{
    constructor(spriteDir:string="../sprites/"){}
    sprites:{ [key: string]: HtmlSprite } = {};
    animations:{ [key: string]: SpriteAnimation} = {};
    
    createSprite(fileName:string, widthImgs:number, heightImgs:number):HtmlSprite{
        return new HtmlSprite(fileName, widthImgs, heightImgs);
    }

    addSprite(spriteName:string, sprite:HtmlSprite){
        this.sprites[spriteName] = sprite;
    }

    getSprite(spriteName:string):HtmlSprite{
        if(! (spriteName in this.sprites)){
            throw "sprite "+spriteName+" does not exist";
        }
        return this.sprites[spriteName];
    }

    loadSprite(spriteName:string, fileName:string, widthImgs:number, heightImgs:number){
        var sprite = this.createSprite(fileName, widthImgs, heightImgs);
        this.addSprite(spriteName, sprite);
    }

    addAnimation(spriteName:string, animationName:string, spriteNumbers:Array<number>, delay=1){
        var sa:SpriteAnimation = SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
        if (!(spriteName in this.sprites)){
            throw "error adding animation "
            + animationName 
            + ". spriteName "
            + spriteName
            + "doesn't exist. sprites must be added through addSprite method first";
        }
        this.animations[animationName] = sa;
    }

    getAnimation(animationName:string):SpriteAnimation{
        return this.animations[animationName];
    }

    static create():HtmlSpriteManager{
        return createSpriteManager();
    }
}

function createSpriteManager():HtmlSpriteManager{
    var sm:HtmlSpriteManager = new HtmlSpriteManager();
    sm.loadSprite("blondDress", "blond.png", 4, 8);
    
    sm.loadSprite("blond", "blondWalk.png", 4, 2);
    sm.addAnimation("blond", "blondWalk", [4,5,6,7], 5);
    sm.addAnimation("blond", "blond", [4], 5);
   
    sm.loadSprite("fantasySprites", "fantasysprites.png", 12,8);
    sm.addAnimation("fantasySprites", "redHair", [24,25,26,25], 6);

    sm.loadSprite("crops", "crops.png", 12, 8);
    sm.addAnimation("crops", "turnip0", [0]);
    sm.addAnimation("crops", "turnip1", [1]);
    sm.addAnimation("crops", "turnip2", [2]);

    sm.addAnimation("crops", "corn0", [30]);
    sm.addAnimation("crops", "corn1", [31]);
    sm.addAnimation("crops", "corn2", [32]);
    
    sm.addAnimation("crops", "wheat0", [33]);
    sm.addAnimation("crops", "wheat1", [34]);
    sm.addAnimation("crops", "wheat2", [35]);
    
    sm.addAnimation("crops", "pumpkin0", [54]);
    sm.addAnimation("crops", "pumpkin1", [55]);
    sm.addAnimation("crops", "pumpkin2", [56]);

    sm.loadSprite("scrops", "scrops.png", 24, 23);
    sm.addAnimation("scrops", "onion0", [0]);
    sm.addAnimation("scrops", "onion1", [1]);
    sm.addAnimation("scrops", "onion2", [2]);
    sm.addAnimation("scrops", "onion3", [3]);
    sm.addAnimation("scrops", "onion4", [4]);
    sm.addAnimation("scrops", "onion5", [5]);
    sm.addAnimation("scrops", "onion", [6]);

    var cn = 24 * 8 + 18;
    sm.addAnimation("scrops", "corn", [cn]);

    sm.loadSprite("victorian","victoriansprites.png", 12, 8);
    sm.addAnimation("victorian", "bluecloak", [24]);
    sm.addAnimation("victorian", "bluecloakwalk", [24, 25, 26, 25], 5);
    
    cn = 12 * 6;
    sm.addAnimation("victorian", "grey", [cn], 5);
    sm.addAnimation("victorian", "greyWalk", [cn, cn+1, cn+2, cn+1], 5);

    cn = 8*4;
    sm.loadSprite("fireball", "fireball.png", 8, 8);
    sm.addAnimation("fireball", "fireball", [cn, cn+1,cn+2, cn+3, cn+4, cn+5, cn+6,cn+7])

    sm.loadSprite("tilesetcrops", "tilesets/submission_daneeklu/tilesets/plants.png", 9, 6);

    cn = 6;
    sm.addAnimation("tilesetcrops", "tomato0", [cn + 0]);
    sm.addAnimation("tilesetcrops", "tomato1", [cn + 9]);
    sm.addAnimation("tilesetcrops", "tomato2", [cn + 18]);
    sm.addAnimation("tilesetcrops", "tomato3", [cn + 27]);
    sm.addAnimation("tilesetcrops", "tomato4", [cn + 36]);

    return sm;
}