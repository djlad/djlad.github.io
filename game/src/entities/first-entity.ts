import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { createComponentFactory } from '../builders/build-components';
import { GameEvent } from '../engine/events/game-event';
import {TileComponent} from '../components/tile-component/tile-component';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';

export class FirstEntity implements EntityRegistration{
    /**
     * this is an empty entity that will always be the first 
     * entity in the game.entities array. if a system wants to know if it is being applied 
     * to the first entity it can check if it is this entity.
     */
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        position.y = -9999999;
        var tiles = <TileComponent>entity.addComponent("tile");
        return entity;
    }
}