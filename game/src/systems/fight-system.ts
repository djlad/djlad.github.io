import { EntitySystem } from '../engine/system/system';
import { Entity } from '../engine/entity/entity';
import { Game } from '../engine/game';
import { FightComponent } from '../components/fight-component';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { GameEvent } from '../engine/events/game-event';
import { EventType } from '../engine/events/EventType';
import { SystemArgs } from '../engine/system/system-args';

export class FightSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }

    get_entity_direction(origin:Entity, destination:Entity){
        var position1:PositionComponent = <PositionComponent>origin.getComponent("position");
        var position2:PositionComponent = <PositionComponent>destination.getComponent("position");
        var dx:number = position2.x - position1.x;
        var dy:number = position2.y - position1.y;
        var hypotenuse:number = Math.sqrt(dx*dx + dy*dy);
        dx /= hypotenuse;
        dy /= hypotenuse;
        
        return {
            dx:dx,
            dy:dy
        }
    }

    hypotenuse(e1:Entity, e2:Entity):number{
        var position1:PositionComponent = <PositionComponent>e1.getComponent("position");
        var position2:PositionComponent = <PositionComponent>e2.getComponent("position");
        var dx:number = position2.x - position1.x;
        var dy:number = position2.y - position1.y;
        var hypotenuse:number = Math.sqrt(dx*dx + dy*dy);
        return hypotenuse;
    }

    apply(args:SystemArgs):void{
        const entity = args.entity;
        var fight:FightComponent = <FightComponent>entity.getComponent("fight", true);
        if(fight == null)return;
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        //console.log(entity)
        if(!fight.attack)return;
        var hypotenuse:number = this.hypotenuse(entity, fight.target);

        var direction = this.get_entity_direction(entity, fight.target);
        if(hypotenuse > fight.range){
            direction.dx *= fight.maxSpeed;
            direction.dy *= fight.maxSpeed;
            position.vx = direction.dx;
            position.vy = direction.dy;
        } else {
            position.vx = 0;
            position.vy = 0;
            if(fight.canFire()){
                entity.emit(GameEvent.create(EventType.fireProjectile,
                    {vx:direction.dx*10,vy:direction.dy*10}));
                fight.reloadTimer--;
            }
        }
    };
    applyEvents(entity:Entity):void{
    }

    static create(game:Game):EntitySystem{
        return new FightSystem(game);
    };
}