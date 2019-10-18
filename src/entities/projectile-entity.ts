import { Entity } from '../engine/entity/entity';
import { GameEvent } from '../engine/events/event-manager';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';
import { ComponentFactory } from '../engine/component/component-factory';

export class ProjectileEntity extends Entity {
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        this.addComponent("projectile");
        animation.setSprite("fireball");
    }
    handleEvents(events:{[key:string]:GameEvent}):void{
    };

    static create(){
        var pe:ProjectileEntity = new ProjectileEntity(ComponentFactory.create());
        return pe;
    }
}