import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { Renderer } from '../engine/renderers/render';
import { SystemArgs } from '../engine/system/system-args';
import { IPositionComponent } from '../engine/component/components/position/iposition-component';
export declare class RenderSystem extends EntitySystem {
    private camera;
    constructor(renderer: Renderer, game: Game);
    renderer: Renderer;
    static create(game: Game): RenderSystem;
    apply(args: SystemArgs): void;
    renderTileSet(entity: Entity): void;
    private tileCoordToReal;
    renderText(entity: Entity): void;
    renderAnimationComponent(entity: Entity): void;
    renderPrimitive(entity: Entity): void;
    centerCameraOn(position: IPositionComponent): void;
    applyEvents(): void;
}
