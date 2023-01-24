import { createComponentFactory } from "../../builders/build-components";
import { PositionComponent } from "../../engine/component/components/position/position-component";
import { ComponentFactory } from "../../engine/component/component-factory";
import { Entity } from "../../engine/entity/entity";
import { GameEvent } from "../../engine/events/game-event";

export class ParticlesEntity extends Entity{
    constructor(cf: ComponentFactory){
        super(cf);
        let position = <PositionComponent>this.addComponent("position");
        position.width = 10;
        this.addComponent("particles");
    }
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
    public static create(): Entity {
        let cf:ComponentFactory = createComponentFactory();
        return new ParticlesEntity(cf);
    }
}