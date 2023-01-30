import { EntitySystem } from '../engine/system/system';
import { Game } from '../engine/game';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { ProjectileComponent } from '../components/projectile-component';
import { ProjectileEntity } from '../entities/projectile-entity';
import { GameEvent } from '../engine/events/game-event';
import { EventType } from '../engine/events/EventType';
import { PrimitiveComponent } from '../components/primitive-component';
import { ParticlesEntity } from '../entities/particles/particles-entity';
import { SystemArgs } from '../engine/system/system-args';

export class ProjectileSystem extends EntitySystem {

    constructor(game:Game){
        super(game);
    }

    apply(args:SystemArgs){
        const entity = args.entity;
        var position:PositionComponent = <PositionComponent> entity.getComponent("position", true);
        var projectileComponent:ProjectileComponent = <ProjectileComponent>entity.getComponent("projectile", true);
        //console.log(projectileComponent)
        if(position == null)return
        if(projectileComponent == null)return
        projectileComponent.lifeSpan--;
        if (projectileComponent.lifeSpan == 0){
            //position.y -= 50;
            this.game.destroy(entity);
        }
    }

    fireProjectile(entity:Entity, vx:number=null, vy:number=null){
        let projectile = this.game.addEntity("projectile");
        let projectileComponent:ProjectileComponent = <ProjectileComponent>projectile.getComponent("projectile");
        let projPosition:PositionComponent = <PositionComponent>projectile.getComponent("position");
        
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");

        projectileComponent.shooterId = entity.id;
        projPosition.x = position.x;
        projPosition.y = position.y;
        
        if(vx !== null && vy !== null){
            projPosition.vx = vx;
            projPosition.vy = vy;
        } else {
            projPosition.vx = position.faceX;
            projPosition.vy = position.faceY;
        }
        projPosition.faceRight = position.faceRight;
    }

    applyEvents(entity:Entity){
        var events:GameEvent[] = entity.targetedEvents;
        var event:GameEvent;
        for(var i=0;i<events.length;i++){
            event = events[i];
            switch(event.eventName){
                case EventType.fireProjectile:
                    if(event.eventData !== null){
                        this.fireProjectile(entity, event.eventData.vx, event.eventData.vy);
                    } else {
                        this.fireProjectile(entity);
                    }
                break;
                case EventType.collision:
                    var isProj = entity instanceof ProjectileEntity;
                    if(!isProj)break;
                    var projectile:ProjectileComponent = <ProjectileComponent>entity.getComponent("projectile");
                    var isShooter = projectile.shooterId === event.eventData.id;
                    var isSelf = entity.id === event.eventData.id;
                    var isProjectile = event.eventData instanceof ProjectileEntity;
                    var collidedId:number = event.eventData.id;
                    var collided:Entity = this.game.getById(collidedId);
                    var hitParticle = event.eventData instanceof ParticlesEntity;
                    /*console.log(entity)
                    console.log(event.eventData)
                    console.log(isShooter)
                    console.log("-")*/
                    if(!isShooter && !isSelf && !isProjectile && !hitParticle){
                        var ge = GameEvent.create(EventType.inflictDamage)
                        collided.emit(ge, true);
                        //console.log(other.id)
                        //console.log(other.targetedEvents.length);
                        this.game.destroy(entity);
                    }
                break;
            }
        }
    }

    static create(game:Game):ProjectileSystem{
        return new ProjectileSystem(game);
    }
}