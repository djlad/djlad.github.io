import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import { HtmlCanvas } from "../../engine/renderers/implementations/html/html-canvas";
import { Tile } from "./tile";

export class TileComponent extends Component{
    constructor(){
        super("tile");
    }
    update(entity: Entity): void {
    }

    tileWidth: number = 64;
    tiles: Tile[] = [];
    private tilesByCoords:{[key:number]:{[key:number]:Tile}} = {};
    tileSpriteNames: string[] = ["grass", "soil"]
    addTile(tile:Tile){
        this.tiles.push(tile);
        const yToTile = this.tilesByCoords[tile.tileX];
        if (yToTile == null){
            this.tilesByCoords[tile.tileX] = {}
        }
        this.tilesByCoords[tile.tileX][tile.tileY] = tile;
    }
    public static create(): TileComponent{
        let tc = new TileComponent();
        let spriteName = "grass";
        let mapWidth = 50;
        let centerOffset = mapWidth/2-5;
        let xlow = 4;
        let xhigh = xlow + 6
        let ylow = 3;
        let yhigh = ylow + 6;
        for(let i=0;i<mapWidth*mapWidth;i++){
            let x = i%mapWidth-centerOffset;
            let y = Math.floor(i/mapWidth)-centerOffset;
            if (x >= xlow && x <= xhigh && y >= ylow && y <= yhigh) {
                if (x==xlow && y == ylow) tc.addTile(Tile.create("soil", 6, x, y));
                else if (x==xhigh && y == ylow) tc.addTile(Tile.create("soil", 8, x, y));
                else if (x==xlow && y == yhigh) tc.addTile(Tile.create("soil", 12, x, y));
                else if (x==xhigh && y == yhigh) tc.addTile(Tile.create("soil", 14, x, y));
                else if (x==xlow) tc.addTile(Tile.create("soil", 9, x, y));
                else if (x==xhigh) tc.addTile(Tile.create("soil", 11, x, y));
                else if (y==ylow) tc.addTile(Tile.create("soil", 7, x, y));
                else if (y==yhigh) tc.addTile(Tile.create("soil", 13, x, y));
                else
                tc.addTile(Tile.create("soil", 10, x, y));
                continue;
            }
            tc.addTile(Tile.create(spriteName, 14+Math.ceil(Math.random()*3), x, y));
        }
        return tc;
    }
    createBuilder():void{
        let tileSetSpriteNames = ["grass", "soil"];
    }
    
    coordToTile(x:number, y:number):Tile[]{
        let tileX = Math.floor((x+.5*this.tileWidth)/this.tileWidth);
        let tileY = Math.ceil(y/this.tileWidth);
        const yToTile = this.tilesByCoords[tileX]
        if (yToTile == null) return [];
        const tile = yToTile[tileY];
        if (tile == null){
            return [];
        }
        return [tile];
    }
    tileCoordToReal(coord:number){
        return coord * this.tileWidth;        
    }
}