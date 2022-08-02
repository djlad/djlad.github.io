import { Component } from "../engine/component/component";


export class HealthComponent extends Component {
    constructor(){
        super("health");
    }
    health:number=100;

    update(){}

    static create():HealthComponent{
        return new HealthComponent();
    }
}