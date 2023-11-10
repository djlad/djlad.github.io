import { Component } from "../engine/component/component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";

export class DashComponent extends Component
{
    constructor(gameDependencies:GameDependencies){
        super("dash");
    }
    update(entity: Entity): void {
        
    }
    static create(gameDependencies:GameDependencies):DashComponent{
        return new DashComponent(gameDependencies);
    }
}