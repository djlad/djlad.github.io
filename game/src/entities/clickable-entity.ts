import { createComponentFactory } from "../builders/build-components";
import { AnimationComponent } from "../components/animation-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";

export class ClickableEntity extends Entity {
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        let animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        this.addComponent("click");
    }
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
    static create(){
        let cf:ComponentFactory = createComponentFactory();
        return new ClickableEntity(cf);
    }
}