import { Component } from './component';

export class WasdComponent extends Component{
    constructor(){
        super("wasd");
    }
    update(){}
    static create(){
        return new WasdComponent();
    }
}