import { Component } from "../engine/component/component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityUpdateArgs } from "../engine/entity/entity-update-args";

export class DashComponent extends Component
{
    constructor(gameDependencies:GameDependencies){
        super("dash");
    }
    private maxDashingTime: number = 20;
    dashTime: number = 0;
    dashing: boolean = false;
    dashSpeed: number = 20;
    startDashing(){
        this.dashing = true;
        this.dashTime = this.maxDashingTime;
    }

    update(entity: Entity, args: EntityUpdateArgs): void {
    }
    static create(gameDependencies:GameDependencies):DashComponent{
        return new DashComponent(gameDependencies);
    }
}