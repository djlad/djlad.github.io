import { createComponentFactory } from "../../builders/build-components";
import { ComponentFactory } from "../../engine/component/component-factory";
import { Entity } from "../../engine/entity/entity";
import { GameEvent } from "../../engine/events/game-event";

export class ParticleEntity extends Entity {
    constructor(cf: ComponentFactory){
        super(cf);
        this.addComponent("position");
        this.addComponent("primitive");
    }
    handleEvents(events: { [key: string]: GameEvent; }): void {
    }
    public static create(): Entity {
        let cf:ComponentFactory = createComponentFactory();
        return new ParticleEntity(cf);
    }
}