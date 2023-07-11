import { SpriteManager } from "aiwar";

export function buildSprites(sm: SpriteManager){
    sm.loadSprite("jungleGreyTiles", "opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_ground_grey.png", 6, 6);
    sm.addAnimation("jungleGreyTiles", "jungleGreyTile", [7]);
    
    let cn = 24 * 8 + 18;
    sm.addAnimation("scrops", "corn", [cn]);
    sm.loadSprite("victorian", "victoriansprites.png", 12, 8);
    sm.addAnimation("victorian", "bluecloak", [24]);
    sm.addAnimation("victorian", "bluecloakwalk", [24, 25, 26, 25], 5);
    cn = 12 * 6;
    sm.addAnimation("victorian", "grey", [cn], 5);
    sm.addAnimation("victorian", "greyWalk", [cn, cn + 1, cn + 2, cn + 1], 5);
}