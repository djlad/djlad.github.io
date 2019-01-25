import { Entity } from './entity';
import { ComponentFactory } from '../components/component-factory';
import { GameEvent } from '../events/event-manager';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';

export class ProjectileEntity extends Entity {
    constructor(cf:ComponentFactory){
        super(cf);
        var animation:AnimationComponent = <AnimationComponent>this.addComponent("animation");
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        animation.setSprite("fireball");
        position.vx = 5;
    }
    speed:number;


    handleEvents(events:{[key:string]:GameEvent}):void{
    };

    static create(){
        var pe:ProjectileEntity = new ProjectileEntity(ComponentFactory.create());
        return pe;
    }
}