import { Component } from "../engine/component/component";

export class ProjectileComponent extends Component {
    constructor(){
        super("projectile");
    }
    lifeSpan:number=90;
    shooterId:number;

    update(){
    }

    static create():ProjectileComponent{
        return new ProjectileComponent();
    }
}