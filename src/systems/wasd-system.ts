import { EntitySystem } from './system';
import { Entity } from '../entities/entity';
import { GameEvent, EventManager, EventType } from '../events/event-manager';
import { WasdComponent } from '../components/wasd-component';
import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
import { Game } from '../game';
import { VillagerEntity } from '../entities/villager-entity';
import { ProjectileEntity } from '../entities/projectile-entity';

export class WasdSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
    }
    static create(game:Game):WasdSystem{
        var wasd:WasdSystem = new WasdSystem(game);
        //eventManager.addListener(EventType.wDown, function(){console.log("w down")});
        return wasd;
    }

    apply(){}

    applyEvents(entity:Entity, eventManager:EventManager){
        var events:GameEvent[] = eventManager.events;
        var event:GameEvent;
        var wasdComponent:WasdComponent= <WasdComponent>entity.getComponent("wasd", true);
        if (wasdComponent == null)return;
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var animation:AnimationComponent = <AnimationComponent>entity.getComponent("animation");
        
        var speed:number = wasdComponent.speed;
        var sprite:string = wasdComponent.sprite;
        var walkSprite:string = wasdComponent.walkSprite;
        if (events.length > 0){
            //console.log(events)
        }
        for (var i=0;i<events.length;i++){
            event = events[i];
            //console.log(event)
            switch(event.eventName){
                case EventType.wDown:
                    animation.setSprite(walkSprite);
                    position.vy = -speed;
                break;
                case EventType.wUp:
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.aDown:
                    position.faceRight = false;
                    animation.setSprite(walkSprite);
                    position.vx = -speed;
                break;
                case EventType.aUp:
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.sDown:
                    animation.setSprite(walkSprite);
                    position.vy = speed;
                break;
                case EventType.sUp:
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.dDown:
                    position.faceRight = true;
                    animation.setSprite(walkSprite);
                    position.vx = speed;
                break;
                case EventType.dUp:
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.spaceUp:
                    var ge:GameEvent = GameEvent.create(EventType.fireProjectile);
                    entity.emit(ge);
                break;
                case EventType.pUp:
                    console.log("p up")
                    console.log(this.game)
                break;
            }
        }
    }
}