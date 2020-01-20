import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";

export class TileComponent extends Component{
    /*  Keeps track of tiles on the game screen (like checker board tiles)
        stores what items are in the tile. Makes sure that items are placed 
        in the center of the tile.
    */
    private tileSize:number=30;
    update(entity:Entity): void {}
    static create():TileComponent{
        return new TileComponent("tile");
    }
}