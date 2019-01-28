import { Component } from './component';

export class ProjectileComponent extends Component {
    constructor(){
        super("projectile");
    }
    lifeSpan:number=90;

    update(){
    }

    static create():ProjectileComponent{
        return new ProjectileComponent();
    }
}