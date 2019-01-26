import { EntitySystem } from './system';
import { HtmlRenderer } from '../render';
import { AnimationComponent } from '../components/animation-component';
import { Entity } from '../entities/entity';
import { PositionComponent } from '../components/position-component';
import { Game } from '../game';

export class RenderSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(renderer:HtmlRenderer, game:Game){
        super(game);
        this.renderer = renderer;
    }
    renderer:HtmlRenderer;

    static create(game:Game):RenderSystem{
        var hr:HtmlRenderer = HtmlRenderer.create();
        return new RenderSystem(hr, game);
    }

    apply(entity:Entity){
        var a:AnimationComponent = <AnimationComponent>entity.getComponent("animation", true);
        var p:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if (a == null || p == null)return;
        var r:HtmlRenderer = this.renderer;
        r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), !p.faceRight);
    }
    applyEvents(){}
}