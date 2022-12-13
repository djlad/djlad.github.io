import { createComponentFactory } from "../builders/build-components";
import { AnimationComponent } from "../components/animation-component";
import { PositionComponent } from "../components/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";

export class ClickableEntity extends Entity {
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        let animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
    }
    private callback:()=>{};
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
    registerCallback(callback:()=>{}) {
        this.callback = callback;
    }
    static create(){
        let cf:ComponentFactory = createComponentFactory();
        return new ClickableEntity(cf);
    }
}