import { DashComponent } from "../components/dash-component";
import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { Game } from "../engine/game";
import { GenericAnimationComponent } from "../engine/pixi-integration/pixi-components/generic-animation-component";
import { GenericPositionComponent } from "../engine/pixi-integration/pixi-components/generic-position-component";
import { EntitySystem } from "../engine/system/system";
import { SystemArgs } from "../engine/system/system-args";

export class DashSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
    applyEvents(entity: Entity, eventManager: EventManager): void {
        
    }
    shouldApply(entity: Entity): boolean {
        return entity.getComponent("dash", true) != null;
    }
    apply(args:SystemArgs){
        const entity = args.entity;
        const dash = <DashComponent>entity.getComponent("dash");
        const dashing = dash.dashing;
        const dashingTime = dash.dashTime;
        const position = <GenericPositionComponent> entity.getComponent("position");
        const animation = <GenericAnimationComponent> entity.getComponent("animation");

        if (!dashing)return;
        // Transitions not yet supported on pixi engine so I'm dropping it for now.
        // if (dashingTime == Math.floor(wasdComponent.maxDashingTime/2)){
            // transition.start(wasdComponent.dashSprite, wasdComponent.dashSpriteNumber, false);
        // }
        if (dashingTime <= 0){
            dash.dashing = false;
            position.vx = 0;
            position.vy = 0;
            position.h = 0;
            return;
        }
        dash.dashTime -= 1; 
        position.vx = Math.sign(position.faceX) * dash.dashSpeed;
        position.vy = Math.sign(position.faceY) * dash.dashSpeed;
    }
    static create(game:Game):DashSystem{
        var dash:DashSystem = new DashSystem(game);
        return dash;
    }
}