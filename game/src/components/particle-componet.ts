import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
import { ParticleEntity } from "../entities/particles/particle-entity";
import { PositionComponent } from "./position-component";

export class ParticleComponent extends Component{
    constructor(){
        super("particles");
    }
    particles: Entity[] = []
    targetParticles: number = 10;
    time: number = 0;
    maxSpeed: number = 50;
    paths = [
        /*(center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            if (Math.abs(position.vx) < this.maxSpeed) position.vx += dx/Math.abs(dx) * .1;
            if (Math.abs(position.vy) < this.maxSpeed) position.vy += dy/Math.abs(dy) * .1;
        },*/
        /*(center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            if (Math.abs(position.vx) < this.maxSpeed) position.vx += dx/Math.abs(dx) * .2;
            if (dy > 50)position.vy = 1
            if (dy < -50)position.vy = -1
        }*/
        (center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            position.vx += dx/Math.abs(dx) * .2;
            position.vy += dy/Math.abs(dy) * .2;
            // position.x += 1;
            // center.x += 1;
            
        }
    ]
    addParticle(particle: Entity){
        this.particles.push(particle);
    }
    update(entity: Entity): void {
        for(let i:number=0;i<this.particles.length;i++){
            let particle = this.particles[i];
            let path = this.paths[i%this.paths.length];
            let center = <PositionComponent>entity.getComponent("position");
            let particlePosition = <PositionComponent>particle.getComponent("position");
            path(center, particlePosition);
        }
    }
    public static create(): ParticleComponent {
        return new ParticleComponent();
    }
}