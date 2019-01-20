import { EntitySystem } from './system';
import { Entity } from '../entities/entity';
import { GameEvent } from '../events/event-manager';
import { WasdComponent } from '../components/wasd-component';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';

export class WasdSystem extends EntitySystem {
    constructor(){
        super();
    }
    static create(){
        return new WasdSystem();
    }

    apply(){}

    applyEvents(entity:Entity, events:{[key:string]:GameEvent}){
        //console.log(events)
        var WasdComponent:WasdComponent= <WasdComponent>entity.getComponent("wasd", true);
        if (WasdComponent == null)return;
        
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var animation:AnimationComponent = <AnimationComponent>entity.getComponent("animation");
        var speed:number = 5;

        if("w down" in events){
            animation.setSprite("blondWalk");
            position.vy = -speed;
        } else if(position.vy == -speed){
            animation.setSprite("blond");
            position.vy = 0;
        }
        
        if("a down" in events){
            position.faceRight = false;
            animation.setSprite("blondWalk");
            position.vx = -speed;
        } else if(position.vx == -speed){
            animation.setSprite("blond");
            position.vx = 0;
        }
        
        if("s down" in events){
            animation.setSprite("blondWalk");
            position.vy = speed;
        } else if(position.vy == speed){
            animation.setSprite("blond");
            position.vy = 0;
        }

        if("d down" in events){
            position.faceRight = true;
            animation.setSprite("blondWalk");
            position.vx = speed;
        } else if(position.vx == speed){
            animation.setSprite("blond");
            position.vx = 0;
        }
    }
}