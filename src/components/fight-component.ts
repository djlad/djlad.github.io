import { Component } from '../engine/component/component';
import { Entity } from '../engine/entity/entity';

export class FightComponent extends Component{
    constructor(){
        super("fight");
    }
    target:Entity;
    attack:boolean=false;
    maxSpeed:number=5;
    range:number=300;
    reloadTime:number=30;
    reloadTimer:number=30;

    attackTarget(){
    }
    
    canFire(){
        return this.reloadTime === this.reloadTimer;
    }

    update(){
        if (this.reloadTimer <= this.reloadTime){
            this.reloadTimer--;
        }
        if(this.reloadTimer <= 0){
            this.reloadTimer = this.reloadTime;
        }
    }

    static create(){
        return new FightComponent();
    }
}