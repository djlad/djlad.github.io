import { Entity } from "../entity/entity";
import { EventManager } from "../events/event-manager";

export class SystemArgs{
    entity:Entity;
    eventManager:EventManager;
    delta:number;
    fullFramesPassed:number;
}