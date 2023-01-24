import { createComponentFactory } from "../builders/build-components";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";
import { AnimationComponent } from "../engine/component/components/animation/animation-component";

export class UIPanelEntity extends Entity {
    constructor(cf:ComponentFactory){
        super(cf);
        let animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        position.applyOffsets = false;
        animation.setSprite("woodpanelsunken");
    }
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
    static create(){
        let cf:ComponentFactory = createComponentFactory();
        return new UIPanelEntity(cf);
    }
}