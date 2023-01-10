import { createComponentFactory } from "../builders/build-components";
import { AnimationComponent } from "../components/animation-component";
import { PositionComponent } from "../components/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";

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