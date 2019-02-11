import { Component } from './component';

export class NeuralFightComponent extends Component{
    constructor(){
        super("neural");
    }

    update(){}

    static create(){
        return new NeuralFightComponent();
    }
}