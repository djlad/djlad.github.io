import { Component } from '../components/component';
import { Entity } from '../entities/entity';
import { HtmlRenderer } from '../render';
import { AnimationComponent } from '../components/animation-component';
import { PositionComponent } from '../components/position-component';
import { GameEvent } from '../events/event-manager';
import { WasdComponent } from '../components/wasd-component';

export class EntitySystem {
    /**
     * System that can be applied to an entity
     * manipulates one or more components through the component's public interface
     * Do not change components directly through a system
     */
    constructor(){

    }
    targetComponents:Component[];

    apply(entity:Entity):void{
        throw "an entity system did not implement apply method.";
    };
    applyEvents(entity:Entity, events:{[key:string]:GameEvent}):void{
        throw "an did not implement apply Events";
    }
    static create():EntitySystem{
        throw "an entity system has no create method."
    };
}

export class RenderSystem extends EntitySystem{
    /**
     * used for drawing animation components
     */
    constructor(renderer:HtmlRenderer){
        super();
        this.renderer = renderer;
    }
    renderer:HtmlRenderer;

    static create():RenderSystem{
        var hr:HtmlRenderer = HtmlRenderer.create();
        return new RenderSystem(hr);
    }

    apply(entity:Entity){
        var a:AnimationComponent = <AnimationComponent>entity.getComponent("animation", true);
        var p:PositionComponent = <PositionComponent>entity.getComponent("position", true);
        if (a == null || p == null)return;
        var r:HtmlRenderer = this.renderer;
        r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), !p.faceRight);
    }
    applyEvents(){}
}

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
        var WasdComponent:WasdComponent = <WasdComponent>entity.getComponent("wasd", true);
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