import { Game } from "../../engine/game";
import { AnimationComponent } from "../../components/animation-component";
import { PositionComponent } from "../../engine/component/components/position/position-component";
import { PrimitiveComponent } from "../../components/primitive-component";
import { TextComponent } from "../../components/text-component/text-component";
import { TextPlacement } from "../../components/text-component/text-placement";
import { TileComponent } from "../../components/tile-component/tile-component";
import { Entity } from "../../engine/entity/entity";
import { Renderer } from "../../engine/renderers/render";
import { RenderOptions } from "../../engine/renderers/render-options";
import { EntitySystem } from "../../engine/system/system";
import { SystemArgs } from "../../engine/system/system-args";
import { FirstEntity } from "../../entities/first-entity";
import { PhaserPositionComponent } from "../../components/phaser-components/phaser-position-component";
import { PhaserAnimationComponent } from "../../components/phaser-components/phaser-animation-component";

export class PhaserRenderSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(game:Game){
        super(game);
    }

    static create(game:Game):PhaserRenderSystem{
        return new PhaserRenderSystem(game);
    }

    apply(args:SystemArgs){
        this.setPhaserAnimations(args.entity);
    }
    renderTileSet(entity: FirstEntity) {
    }

    private tileCoordToReal(tileWidth: number, coord: number): number{
        return coord * tileWidth;
    }

    renderText(entity:Entity){
    }

    setPhaserAnimations(entity:Entity){
        var a:PhaserAnimationComponent = <PhaserAnimationComponent>entity.getComponent("animation", true);
        var p:PhaserPositionComponent = <PhaserPositionComponent>entity.getComponent("position", true);
        if (a == null || p == null)return;
        if (!a.animationNameUpdated)return;
        a.animationNameUpdated = false;
        let options:RenderOptions = new RenderOptions();//rotate flip apply offsets config.
        if (p?.phaserObject == null) return;
        // console.log(`changing animation to ${a.animationName}`);
        p.phaserObject.anims.play(a.animationName);
        p.phaserObject.displayWidth = p.width;
        p.phaserObject.displayHeight = p.height;
    }

    renderPrimitive(entity:Entity){
    }

    centerCameraOn(entity:Entity){
    }

    applyEvents(){}
}