import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { Game } from '../engine/game';
import { Renderer } from '../engine/renderers/render';
import { HtmlRenderer } from '../engine/renderers/implementations/html/html-renderer';
import { populateSpriteManager } from '../builders/sprite-builder';
import { RenderOptions } from '../engine/renderers/render-options';
import { PlayerEntity } from '../entities/player-entity';
import { FirstEntity } from '../entities/first-entity';
import { TextComponent } from '../components/text-component/text-component';
import { TextPlacement } from '../components/text-component/text-placement';
import { PrimitiveComponent } from '../components/primitive-component';
import { TileComponent } from '../components/tile-component/tile-component';
import { Tile } from '../components/tile-component/tile';
import { SystemArgs } from '../engine/system/system-args';
import { ICameras } from '../engine/dependencies/icameras';
import { IPositionComponent } from '../engine/component/components/position/iposition-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';

export class RenderSystem extends EntitySystem{
    private camera: ICameras;
    /**
     * used for drawing animation components
     */
    constructor(renderer:Renderer, game:Game){
        super(game);
        this.renderer = renderer;
        this.camera = game.gameDependencies.cameras;
    }
    renderer:Renderer;

    static create(game:Game):RenderSystem{
        let hr:Renderer = game.renderer;
        return new RenderSystem(hr, game);
    }

    apply(args:SystemArgs){
        const entity = args.entity;
        if (entity.id == 0){
            this.centerCameraOn(this.camera.center);
            this.renderer.cbox();
            this.renderTileSet(entity);
        }
        this.renderAnimationComponent(entity);
        this.renderText(entity);
        this.renderPrimitive(entity);
    }
    renderTileSet(entity: Entity) {
        let tileComp = <TileComponent>entity.getComponent("tile");
        let tiles = tileComp.tiles;
        let options:RenderOptions = new RenderOptions();
        options.flip = false;
        options.rotate = 0;
        for (let i=0;i<tiles.length;i++){
            let tile = tiles[i];
            let x = this.tileCoordToReal(tileComp.tileWidth, tile.tileX);
            let y = this.tileCoordToReal(tileComp.tileWidth, tile.tileY);
            tile.spriteIds.forEach((spriteId)=>{
                this.renderer.sprite(spriteId.spriteName, x, y, tileComp.tileWidth, tileComp.tileWidth+1, spriteId.spriteNumber, options);
            });
        }
    }

    private tileCoordToReal(tileWidth: number, coord: number): number{
        return coord * tileWidth;
    }

    renderText(entity:Entity){
        let p:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        let text:TextComponent = <TextComponent>entity.getComponent("text", true);
        if(p == null || text == null)return;
        for(let i:number=0;i<text.textPlacements.length;i++){
            let tp:TextPlacement = text.textPlacements[i];
            // this.renderer.text(tp.textValue, p.x + tp.offsetX, p.y + tp.offsetY, 10);
            this.renderer.text(tp.textValue, p.x, p.y, 10);
        }
    }

    renderAnimationComponent(entity:Entity){
        var a:AnimationComponent = <AnimationComponent>entity.getComponent("animation", true);
        var p:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if (a == null || p == null)return;
        var r:Renderer = this.renderer;
        let options:RenderOptions = new RenderOptions();
        options.flip = !p.faceRight;
        options.rotate = p.rotate;
        options.applyOffsets = p.applyOffsets;
        if (a.isFiltered){
            r.spriteFilter(a.filter, Math.round(p.x), Math.round(p.y + p.h), p.width, p.height, a.getSpriteNumber(), options);
            return;
        }
        r.sprite(a.spriteName, Math.round(p.x), Math.round(p.y + p.h), p.width, p.height, a.getSpriteNumber(), options);
    }

    renderPrimitive(entity:Entity){
        var primitive:PrimitiveComponent = <PrimitiveComponent>entity.getComponent("primitive", true);
        var position:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if (primitive == null || position == null) return;
        this.renderer.circle(Math.round(position.x), Math.round(position.y + position.h), 4);
    }

    centerCameraOn(position:IPositionComponent){
            this.renderer.setOffset([position.x + position.vx, position.y + position.vy]);
    }

    applyEvents(){}
}