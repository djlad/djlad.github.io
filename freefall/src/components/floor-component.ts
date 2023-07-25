import { Component, Entity, EntityUpdateArgs } from "aiwar";

export class FloorComponent extends Component {
    constructor(){
        super("floor");
    }
    update(entity: Entity, args: EntityUpdateArgs): void {
    }
    
    static create(){
        return new FloorComponent();
    }
}