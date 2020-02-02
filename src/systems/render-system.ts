import { EntitySystem } from '../engine/system/system';
import { AnimationComponent } from '../components/animation-component';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
import { Game } from '../engine/game';
import { Renderer } from '../engine/renderers/render';
import { HtmlRenderer } from '../engine/renderers/implementations/html/html-renderer';
import { populateSpriteManager } from '../builders/sprite-builder';
import { RenderOptions } from '../engine/renderers/render-options';

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
        var a:AnimationComponent = <AnimationComponent>entity.getComponent("animation", true);
        var p:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if (a == null || p == null)return;
        var r:Renderer = this.renderer;
        let options:RenderOptions = new RenderOptions();
        options.flip = !p.faceRight;
        options.rotate = p.rotate;
        r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), options);
    }
    applyEvents(){}
}