import { GameDependencies } from "../dependencies/game-dependencies";
import { Entity } from "../entity/entity";
import { EntityUpdateArgs } from "../entity/entity-update-args";
import { Game } from "../game";

export abstract class Component {
    constructor(componentName:string){
        this.componentName = componentName;
    }
    componentName:string;
    abstract update(entity:Entity, args:EntityUpdateArgs):void;
    static create(game:GameDependencies, entityId:string){
        throw "Component must implement static create function";
    };
    static createWithGame(game:Game, entityId:string){
    }
}