import { createComponentFactory } from "../builders/build-components";
import { AnimationComponent } from "../components/animation-component";
import { CropComponent } from "../components/crop-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { ComponentFactory } from "../engine/component/component-factory";
import { Entity } from "../engine/entity/entity";
import { GameEvent } from "../engine/events/game-event";
import { CropEntity } from "./crop-entity";

export class LinesEntity extends Entity{
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
    }

    handleEvents(events:{[key:string]:GameEvent}){
    }
    
    static create(){
        let cf:ComponentFactory = createComponentFactory();
        return new CropEntity(cf);
    }
}