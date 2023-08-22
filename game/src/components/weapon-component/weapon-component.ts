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
    swipes: Swipe[] = [];
    swipei: number = -1;
    weaponOffsetX: number = 0;
    weaponOffsetY: number = -.5;
    weaponFaceRight: boolean = true;
    game: Game;
    wobble:number=0;
    rotationSpeed:number = .1;
    weaponState: WieldState = WieldState.backSheathe;
    private sheatheSpeed = .1;
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
    setSwipes(swipes:Swipe[]){
        this.swipes = swipes;
        this.swipei = 0;
    }
    holdWeapon(){
        this.weaponState = WieldState.hold;
        const position = <GenericPositionComponent>this.wielder.getComponent("position");
        const newPos: Swipe = new Swipe(2,.1,-.45,0, this.sheatheSpeed);
        if (!position.faceRight)newPos.flip();
        // this.setSwipe(newPos);
        this.setSwipes([newPos]);
    }
    sheatheWeapon(){
        const newPos = new Swipe(5, .5, -.5, 0);
        // this.setSwipe(newPos);

    }
    sheatheBack(){
        const newPos: Swipe = new Swipe(3.2, -.6, -.75, 0, this.sheatheSpeed);
        const position = <GenericPositionComponent>this.wielder.getComponent("position");
        if (!position.faceRight)newPos.flip();
        // this.setSwipe(newPos);
        this.setSwipes([newPos]);
        this.weaponState = WieldState.backSheathe;
    }
    flip(faceRight:boolean){
        if (faceRight === this.weaponFaceRight)return;
        this.weaponFaceRight = faceRight;
        this.swipes.forEach(swipe => swipe.flip());
        this.swipe.flip();
        this.weaponPosition.rotate = this.swipe.rotate;
    }
    spin(){
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
        this.weaponPosition.rotate = rotate;
        // this.weaponPosition.rotate += rotateSpeed;
        this.swipeTowards();
    }
    private rotateDistance(curRotate: number, targetRotate: number, longWay: boolean = false){
        const d1 = Math.abs(targetRotate - curRotate);
        const up = targetRotate >= curRotate;
        let d2 = 2 * Math.PI - d1;
        const check = longWay ? d2 > d1 : d2 < d1;
        if (check) {
            if (up) return -Math.abs(d2);
            return d2;
        }
        return d1 * (up ? 1 : -1);
    }
    private swipeTowards(){
        if (this.swipei === -1)return;
        const target = this.swipes[this.swipei];
        const {speed} = target;
        const dx = target.offsetX - this.swipe.offsetX;
        const dy = target.offsetY - this.swipe.offsetY;
        const dr = this.rotateDistance(this.swipe.rotate, target.rotate, target.longWay);
        const h = Math.sqrt(dx * dx + dy * dy);
        const movey = dy/h * speed;
        const movex = dx/h * speed;
        const time = h/speed;
        const mr = time === 0 ? 0 : dr/time;
        if (true || this.swipe.rotateSpeed === 0) {
            this.swipe.rotateSpeed = mr;
        }
        if (Math.abs(dx) >= Math.abs(movex)){
            this.swipe.offsetX += movex;
        } else {
            this.swipe.offsetX = target.offsetX;
        }
        if (Math.abs(dy) >= Math.abs(movey)){
            this.swipe.offsetY += movey;
        } else {
            this.swipe.offsetY = target.offsetY;
        }
        if (Math.abs(dr) >= Math.abs(this.swipe.rotateSpeed)){
            // this.swipe.rotate += mr;
            this.swipe.rotate += this.swipe.rotateSpeed;
        } else {
            this.swipe.rotate = target.rotate;
            this.swipe.rotateSpeed = 0;
        }
        console.log(this.swipei);
        if (h === 0 && dr === 0){
            this.swipei = -1;
            console.log(this.swipei);
        }
    }
    private flipRotate(rotate:number) {
        return Math.PI * .5 - rotate;
    }
    static create(gameDependencies:GameDependencies):WeaponComponent{
        return new WeaponComponent(gameDependencies);
    }
}