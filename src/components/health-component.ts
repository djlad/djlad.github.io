import { Component } from './component';


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