import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
import { PositionComponent } from "../engine/component/components/position/position-component";
export declare class ParticleComponent extends Component {
    constructor();
    particles: Entity[];
    targetParticles: number;
    time: number;
    maxSpeed: number;
    paths: ((center: PositionComponent, position: PositionComponent, time: number) => void)[];
    addParticle(particle: Entity): void;
    update(entity: Entity): void;
    static create(): ParticleComponent;
}
