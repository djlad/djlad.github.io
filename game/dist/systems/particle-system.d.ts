import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import { ParticleComponent } from "../components/particle-componet";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { SystemArgs } from "../engine/system/system-args";
export declare class ParticleSystem extends EntitySystem {
    constructor(game: Game);
    static create(game: Game): ParticleSystem;
    addParticles(center: ParticleComponent, centerPosition: PositionComponent): void;
    updateParticles(entity: Entity): void;
    apply(args: SystemArgs): void;
    applyEvents(entity: Entity, eventManager: EventManager): void;
}
