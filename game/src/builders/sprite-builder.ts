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
    // sm.addAnimation("swords", "arrowsword", [0], 30)

    return sm;
}

export function buildSprites(game:Game):void{
    populateSpriteManager(game.spriteManager);
}