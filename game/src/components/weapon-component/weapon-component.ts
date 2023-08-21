import { Component } from "../../engine/component/component";
import { IPositionComponent } from "../../engine/component/components/position/iposition-component";
import { PositionComponent } from "../../engine/component/components/position/position-component";
import { GameDependencies } from "../../engine/dependencies/game-dependencies";
import { Entity } from "../../engine/entity/entity";
import { EntityUpdateArgs } from "../../engine/entity/entity-update-args";
import { Game } from "../../engine/game";
import { GenericPositionComponent } from "../../engine/pixi-integration/pixi-components/generic-position-component";
import { WeaponEntity } from "../../entities/weapon-entity";
import { Swipe } from "./swipe";
import { WieldState } from "./wield-state";

export class WeaponComponent extends Component {
    constructor(gameDependencies:GameDependencies){
        super("weapon");
        this.game = gameDependencies.game;
    }
    wielder: Entity = null;
    weaponEntity: Entity = null;
    weaponPosition: GenericPositionComponent = null;
    swipe: Swipe = new Swipe(0, 0, 0, 0);
    weaponOffsetX: number = 0;
    weaponOffsetY: number = -.5;
    weaponFaceRight: boolean = true;
    game: Game;
    wobble:number=0;
    rotationSpeed:number = .1;
    weaponState: WieldState = WieldState.backSheathe;
    setWielder(wielder:Entity){
        this.wielder = wielder;
        this.weaponEntity = this.game.addEntity("weapon");
        this.weaponPosition = <GenericPositionComponent>this.weaponEntity.getComponent("position");
    }
    setSwipe(swipe:Swipe){
        this.swipe = swipe;
        /*this.weaponOffsetX = swipe.offsetX;
        this.weaponOffsetY = swipe.offsetY;
        // this.weaponPosition.rotate = swipe.rotate;
        this.rotationSpeed = swipe.rotateSpeed;*/
        this.weaponPosition.rotate = swipe.rotate;
    }
    holdWeapon(){
        const position = <GenericPositionComponent>this.wielder.getComponent("position");
        const newPos: Swipe = new Swipe(2,.1,-.45,0);
        if (!position.faceRight)newPos.flip();
        this.setSwipe(newPos);
        this.weaponState = WieldState.hold;
    }
    sheatheWeapon(){
        const newPos = new Swipe(5, .5, -.5, 0);
        this.setSwipe(newPos);
    }
    sheatheBack(){
        const newPos: Swipe = new Swipe(3.2, -.6, -.75, 0);
        const position = <GenericPositionComponent>this.wielder.getComponent("position");
        if (!position.faceRight)newPos.flip();
        this.setSwipe(newPos);
        // if (!this.weaponPosition.faceRight)this.flip(true);
        // this.weaponOffsetX = -.6;
        // this.weaponOffsetY = -.75;
        // this.weaponPosition.rotate = 3.2;
        // this.rotationSpeed = 0;
        this.weaponState = WieldState.backSheathe;
    }
    flip(faceRight:boolean){
        if (faceRight === this.weaponFaceRight)return;
        this.weaponFaceRight = faceRight;
        this.swipe.flip();
        this.weaponPosition.rotate = this.swipe.rotate;
        // this.weaponPosition.rotate = this.flipRotate(this.weaponPosition.rotate);
        // this.weaponOffsetX *= -1;
    }
    spin(){
        console.log('spin');
        const newPos = new Swipe(5, 0, -.5, this.weaponPosition.faceRight ? .1 : -.1);
        this.setSwipe(newPos);
    }
    zeroOut(){
        this.weaponOffsetX = 0;
        this.weaponOffsetY = 0;
        this.weaponPosition.rotate = 0;
        this.rotationSpeed = .0;
    }
    update(entity:Entity, args:EntityUpdateArgs){
        if (this.weaponEntity == null)console.warn("weapon component needs to call setWielder first");
        const wielderPosition = <GenericPositionComponent>entity.getComponent("position");
        this.flip(wielderPosition.faceRight);
        const {offsetX, offsetY, rotate, rotateSpeed} = this.swipe;
        this.weaponPosition.x = wielderPosition.x + offsetX * wielderPosition.width;
        this.weaponPosition.y = wielderPosition.y + offsetY * wielderPosition.height;
        this.weaponPosition.rotate += rotateSpeed;
    }
    private flipRotate(rotate:number) {
        return Math.PI * .5 - rotate;
    }
    static create(gameDependencies:GameDependencies):WeaponComponent{
        return new WeaponComponent(gameDependencies);
    }
}