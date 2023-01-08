import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../components/position-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';
import {TileComponent} from '../components/tile-component/tile-component';

export class FirstEntity extends Entity{
    /**
     * this is an empty entity that will always be the first 
     * entity in the game.entities array. if a system wants to know if it is being applied 
     * to the first entity it can check if it is this entity.
     */
    constructor(cf:ComponentFactory){
        super(cf);
        var position:PositionComponent = <PositionComponent>this.addComponent("position");
        position.y = -9999999;
        var tiles = <TileComponent>this.addComponent("tile");
    }

    handleEvents(events:{[key:string]:GameEvent}){
        console.log(events);
    }

    static create():FirstEntity{
        let cf:ComponentFactory = createComponentFactory();
        var entity = new FirstEntity(cf);
        return entity;
    }
}