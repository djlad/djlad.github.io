import { Component } from "../engine/component/component";
import { IPositionComponent } from "../engine/component/components/position/iposition-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { GameDependencies } from "../engine/dependencies/game-dependencies";
import { Entity } from "../engine/entity/entity";
import { EntityUpdateArgs } from "../engine/entity/entity-update-args";
import { Game } from "../engine/game";
import { GenericPositionComponent } from "../engine/pixi-integration/pixi-components/generic-position-component";
import { WeaponEntity } from "../entities/weapon-entity";

export class WeaponComponent extends Component {
    constructor(gameDependencies:GameDependencies, entityId:string){
        super("weapon");
        this.game = gameDependencies.game;
    }
    weaponEntity: Entity = null;
    weaponPosition: GenericPositionComponent = null;
    weaponOffsetX: number = 0;
    weaponOffsetY: number = -.5;
    game: Game;
    wobble:number=0;
    rotationSpeed:number = .1;
    holdWeapon(){
        this.weaponOffsetX = .1;
        this.weaponOffsetY = -.45
        this.weaponPosition.rotate = 2;
    }
    sheatheWeapon(){
        this.weaponOffsetX = .5;
        this.weaponOffsetY = -.5;
        this.weaponPosition.rotate = 5;
    }
    sheatheBack(){
        this.weaponOffsetX = -.6;
        this.weaponOffsetY = -.75;
        this.weaponPosition.rotate = 3.2;
        this.rotationSpeed = 0;
    }
    flip(faceRight:boolean){
        if (faceRight == this.weaponPosition.faceRight)return;
        this.weaponOffsetX = faceRight ? -Math.abs(this.weaponOffsetX):Math.abs(this.weaponOffsetX);
        this.weaponPosition.faceRight = faceRight;
        // console.log(this.weaponOffsetX);
        // console.log(this.weaponPosition.faceRight);
    }
    spin(){
        this.weaponOffsetX = 0;
        this.weaponOffsetY = -.5;
        this.weaponPosition.rotate = 5;
        this.rotationSpeed = .1;
    }
    zeroOut(){
        this.weaponOffsetX = 0;
        this.weaponOffsetY = 0;
        this.weaponPosition.rotate = 0;
        this.rotationSpeed = .0;
    }
    update(entity:Entity, args:EntityUpdateArgs){
        if (this.weaponEntity == null){
            this.weaponEntity = this.game.addEntity("weapon");
            this.weaponPosition = <GenericPositionComponent>this.weaponEntity.getComponent("position");
        }
        const wielderPosition = <GenericPositionComponent>entity.getComponent("position");
        this.weaponPosition.x = wielderPosition.x + this.weaponOffsetX * wielderPosition.width + Math.ceil(Math.sin(this.wobble))*5;
        this.weaponPosition.y = wielderPosition.y + this.weaponOffsetY * wielderPosition.height;
        this.flip(wielderPosition.faceRight);
        this.wobble += 0;
        this.weaponPosition.rotate+=this.rotationSpeed;
    }
    static create(gameDependencies:GameDependencies, entityId:string):WeaponComponent{
        return new WeaponComponent(gameDependencies, entityId);
    }
}