import { Entity } from "../engine/entity/entity";
import { EventManager } from "../engine/events/event-manager";
import { Game } from "../engine/game";
import { EntitySystem } from "../engine/system/system";
import {ParticleComponent} from "../components/particle-componet";
import { PositionComponent } from "../components/position-component";

export class ParticleSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
    }

    static create(game:Game){
        return new ParticleSystem(game);
    }

    addParticles(center: ParticleComponent, centerPosition: PositionComponent){
        if (center.particles.length >= center.targetParticles)return;
        while(center.particles.length < center.targetParticles){
            center.particles.push(this.game.addEntity("particle"));
            let position = <PositionComponent>center.particles[center.particles.length-1].getComponent("position");
            position.x = centerPosition.x - Math.random()*10;
            position.y = centerPosition.y - Math.random()*10;
            position.vx = Math.random()*.5;
            position.vy = Math.random()*.5;
        }
    }

    updateParticles(entity: Entity){
        let particles = <ParticleComponent> entity.getComponent("particles", true);
        let position = <PositionComponent> entity.getComponent("position", true);
        
        particles.time = (particles.time + 1) % 1000;
        
        for(let i:number = 0; i<particles.particles.length; i++){
            let particle = particles.particles[i];
            let method = particles.paths[i];
            let particlePosition = <PositionComponent>particle.getComponent("primitive");
        }
    }

    apply(entity: Entity, eventManager: EventManager): void {
        let particles = <ParticleComponent> entity.getComponent("particles", true);
        let position = <PositionComponent> entity.getComponent("position", true);
        if (position == null || particles == null) return;
        this.addParticles(particles, position);
        this.updateParticles(entity);
    }

    applyEvents(entity: Entity, eventManager: EventManager): void {
        
    }
}