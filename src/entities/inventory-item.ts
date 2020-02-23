import { Entity } from "../engine/entity/entity";
import { ComponentFactory } from "../engine/component/component-factory";
import { GameEvent } from "../engine/events/game-event";
import { createComponentFactory } from "../builders/build-components";

export class InventoryItemEntity extends Entity {
    handleEvents(events: {[key: string]:GameEvent}): void {
    }
    constructor(cf:ComponentFactory){
        super(cf);
        this.addComponent("position");
        this.addComponent("animation");
    }
    static create():InventoryItemEntity {
        return new InventoryItemEntity(createComponentFactory());
    }
}