import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { FirstEntity } from '../entities/first-entity';
import { Game } from '../engine/game';
import { ProjectileEntity } from '../entities/projectile-entity';
import { GameEvent } from '../engine/events/game-event';
import { EventType } from '../engine/events/EventType';
import { SystemArgs } from '../engine/system/system-args';

export class CollisionSystem extends EntitySystem{
    constructor(game:Game){
        super(game);
    }
    movingEntities:{[key:number]:Entity}={};
    colliding:{[key:string]:Entity[]}={};
    numCollisions:number=0;

    private distance(e1:Entity, e2:Entity){
        var p1:PositionComponent = <PositionComponent>e1.getComponent("position");
        var p2:PositionComponent = <PositionComponent>e2.getComponent("position");
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    private checkCol(e1:Entity, e2:Entity) {
        console.log('check');
        var distance:number = this.distance(e1, e2);
        var p1:PositionComponent = <PositionComponent>e1.getComponent("position");
        var mask:number = ((p1.width) + (p1.height))/4;
        var collision = distance < mask;
        return collision;
    }

    private hashCollision(e1:Entity, e2:Entity){
        if(e1.id > e2.id){
            [e1, e2] = [e2, e1];
        }
        return e1.id.toString() + ":" + e2.id.toString();
    }

    private addCollision(e1:Entity, e2:Entity){
        var hash:string;
        hash = this.hashCollision(e1, e2);
        if(!(hash in this.colliding)){
            this.colliding[hash] = [e1, e2];
            this.numCollisions++;
        }
    }

    private removeCollision(e1:Entity, e2:Entity){
        var hash:string = this.hashCollision(e1, e2);
        if (hash in this.colliding){
            delete this.colliding[hash];
            this.numCollisions--;
        }
    }

    private emitCollision(e1:Entity, e2:Entity):void{
        e1.emit(GameEvent.create(
            EventType.collision,
            e2
        ));
        e2.emit(GameEvent.create(
            EventType.collision,
            e1
        ));
    }

    private removeMovingEntity(id:number):void{
        delete this.movingEntities[id];
    }

    apply(args:SystemArgs):void{
        const entity = args.entity;
        if(entity instanceof FirstEntity){
            var collidingEntities:Entity[];
            for(var key in this.colliding){
                collidingEntities = this.colliding[key];
                collision = this.checkCol(collidingEntities[0], collidingEntities[1])
                if(collision && !collidingEntities[0].destroyed && !collidingEntities[1].destroyed){
                    this.emitCollision(collidingEntities[0], collidingEntities[1]);
                } else {
                    this.removeCollision(collidingEntities[0], collidingEntities[1]);
                }
            }

            //remove destroyed moving entities
            for(let id in this.movingEntities){
                if(this.movingEntities[id].destroyed){
                    this.removeMovingEntity(parseInt(id));
                }
            }
        }
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var collision:boolean;
        var entityTarget:Entity;
        
        //for each moving entity check collision
        for(let id in this.movingEntities){
            entityTarget = this.movingEntities[id];
            collision = this.checkCol(entity, entityTarget);
            if(collision){
                this.addCollision(entity, entityTarget);
            }
        }

        //add entity to entities to be checked against all other objects
        //this only checks collisions for objects that are moving
        if(position.moved){
            this.movingEntities[entity.id] = entity;
        } else {
            this.removeMovingEntity(entity.id);
        }
        if(entity instanceof ProjectileEntity){
            let position = <PositionComponent>entity.getComponent("position");
        }
    };

    applyEvents(entity:Entity):void{
    }

    static create(game:Game):CollisionSystem{
        return new CollisionSystem(game);
    }
}