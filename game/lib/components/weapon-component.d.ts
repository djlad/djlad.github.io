import { Component } from "../engine/component/component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityUpdateArgs } from "../engine/entity/entity-update-args";
import { Game } from "../engine/game";
import { GenericPositionComponent } from "../engine/pixi-integration/pixi-components/generic-position-component";
export declare class WeaponComponent extends Component {
    constructor(gameDependencies: GameDependencies, entityId: string);
    weaponEntity: Entity;
    weaponPosition: GenericPositionComponent;
    weaponOffsetX: number;
    weaponOffsetY: number;
    game: Game;
    wobble: number;
    rotationSpeed: number;
    holdWeapon(): void;
    sheatheWeapon(): void;
    sheatheBack(): void;
    flip(faceRight: boolean): void;
    spin(): void;
    zeroOut(): void;
    update(entity: Entity, args: EntityUpdateArgs): void;
    static create(gameDependencies: GameDependencies, entityId: string): WeaponComponent;
}
