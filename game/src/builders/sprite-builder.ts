/**
 * add sprites to the game here using the game object's spriteManager
 */

import { SpriteManager } from "../engine/renderers/sprite-manager";
import { Game } from "../engine/game";

export function populateSpriteManager(spriteManager:SpriteManager):SpriteManager{
    var sm:SpriteManager = spriteManager;
    sm.loadSprite("blondDress", "blond.png", 4, 8);
    sm.loadSprite("nothing", "blond.png", 100, 100);
    sm.addAnimation("nothing", "nothing", [0], 10);
    
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

    sm.loadSprite("arm", "arm.png", 1, 1);
    sm.addAnimation("arm", "arm0", [1]);
    
    sm.loadSpriteOverlapping("swords", "sword-7Soul1.png");
    // sm.addAnimation("swordAs", "arrowsword", [0], 30)
    sm.loadSprite("dwarves", "fantasysprites/DwarfSprites2.png", 12, 8);
    sm.addAnimation("dwarves", "dwarfopeneyes", [35]);
    sm.addAnimation("dwarves", "dwarfopeneyesWalk", [33, 35, 34, 35], 5);
    
    sm.loadSprite("goblins", "fantasysprites/EnemySpriteSheet1.png", 12, 8);
    sm.addAnimation("goblins", "speargoblin", [35]);
    sm.addAnimation("goblins", "speargoblinWalk", [33, 35, 34, 35], 5);

    sm.loadSprite("grass", "tilesets/submission_daneeklu/tilesets/grass.png", 3, 6);
    sm.loadSprite("soil", "tilesets/submission_daneeklu/tilesets/plowed_soil.png", 3, 6);

    sm.loadSprite("people3", "fantasysprites/PeopleSpriteSheet2.png", 12, 8);
    sm.addAnimation("people3", "brownpuffgirl", [80]);
    sm.addAnimation("people3", "brownpuffgirlwalk", [79, 80, 81], 5);

    sm.loadSprite("victorian2", "BearSprites.webp", 12, 8);
    sm.addAnimation("victorian2", "nun", [79], 5);
    sm.addAnimation("victorian2", "nunwalk", [78,79,80, 79], 5);

    sm.loadSprite("greg", "greg.png", 2,2);
    sm.addAnimation("greg", "greg", [0]);
    sm.addAnimation("greg", "gregwalk", [1,0,3,0], 10);

    sm.loadSprite("greyaction", "greyactions.png", 2,2);
    sm.addAnimation("greyaction", "greythrow", [0,1,2],5)

    sm.loadSprite("deer", "deer/deer male calciumtrice.png", 5, 5);
    sm.addAnimation("deer", "deer", [0,1,2,3,4,5,6,7,8],10)

    return sm;
}

export function buildSprites(game:Game):void{
    populateSpriteManager(game.spriteManager);
}