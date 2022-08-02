import { EntitySystem } from '../engine/system/system';
import { AnimationComponent } from '../components/animation-component';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
import { Game } from '../engine/game';
import { Renderer } from '../engine/renderers/render';
import { HtmlRenderer } from '../engine/renderers/implementations/html/html-renderer';
import { populateSpriteManager } from '../builders/sprite-builder';
import { RenderOptions } from '../engine/renderers/render-options';
import { PlayerEntity } from '../entities/player-entity';
import { FirstEntity } from '../entities/first-entity';
import { TextComponent } from '../components/text-component/text-component';
import { TextPlacement } from '../components/text-component/text-placement';

export class RenderSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(renderer:Renderer, game:Game){
        super(game);
        this.renderer = renderer;
    }
    renderer:Renderer;

    static create(game:Game):RenderSystem{
        let hr:Renderer = game.renderer;
        return new RenderSystem(hr, game);
    }

    apply(entity:Entity){
        if (entity instanceof FirstEntity){
            let player:Entity = this.game.getById(1);
            this.centerCameraOn(player);
        }
        this.renderAnimationComponent(entity);
        this.renderText(entity);
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
        r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), options);
    }

    centerCameraOn(entity:Entity){
            let position:PositionComponent = <PositionComponent>entity.getComponent("position");
            this.renderer.setOffset([position.x, position.y]);
    }

    applyEvents(){}
}