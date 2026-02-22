import { Component } from "../engine/component/component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityUpdateArgs } from "../engine/entity/entity-update-args";
export declare class DashComponent extends Component {
    constructor(gameDependencies: GameDependencies);
    private maxDashingTime;
    dashTime: number;
    dashing: boolean;
    dashSpeed: number;
    startDashing(): void;
    update(entity: Entity, args: EntityUpdateArgs): void;
    static create(gameDependencies: GameDependencies): DashComponent;
}
