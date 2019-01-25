import { EntitySystem } from './system';
import { Entity } from '../entities/entity';
import { AnimationComponent } from '../components/animation-component';
import { CropComponent } from '../components/crop-component';
import { GameEvent, EventManager, EventType } from '../events/event-manager';
import { ProjectileEntity } from '../entities/projectile-entity';
import { PlayerEntity } from '../entities/player-entity';

export class CropSystem extends EntitySystem {
    constructor(){
        super();
    }
    apply(entity:Entity, eventManager:EventManager):void{
        var a:AnimationComponent = <AnimationComponent>entity.getComponent("animation", true);
        var c:CropComponent = <CropComponent>entity.getComponent("crop", true);
        if(a==null||c==null){
            return;
        }
        if (c.timeSinceGrowth == 0 || c.timeSinceGrowth==1){
            a.setSprite(c.growthSprites[c.growthStage]);
        }
    };

    applyEvents(entity:Entity, eventManager:EventManager):void{
        var c:CropComponent = <CropComponent>entity.getComponent("crop", true);
        if(c==null)return;

        var event:GameEvent;
        //if(entity.targetedEvents.length>0)console.log(entity.targetedEvents.length);
        for(var i:number=0;i<entity.targetedEvents.length;i++){
            event = entity.targetedEvents[i];
            this.handleEvent(event, entity);
        }
        entity.targetedEvents = [];
    };
    static create():EntitySystem{
        return new CropSystem();
    };

    handleEvent(event:GameEvent, entity:Entity):void{
        //console.log(event)
        var crop:CropComponent = <CropComponent>entity.getComponent("crop");
        switch (event.eventName){
            case EventType.collision:
                //console.log(event.eventData);

                if (event.eventData instanceof ProjectileEntity){
                    crop.setCrop("wheat");
                } else if(event.eventData instanceof PlayerEntity){
                    crop.setCrop("turnip");
                } else {
                    crop.setCrop("corn");
                }
                break;
        }
        
    }
}