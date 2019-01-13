import { PlayerEntity } from './player-entity';
import { Entity } from './entity';
import { VillagerEntity } from './villager-entity';
import { CropEntity } from './crop-entity';

export class EntityFactory {
    constructor(){}
    entityTypes:{[key:string]:any}={};
    registerComponent(componentName:string, EntityClass:any){
        if (EntityClass.prototype instanceof Entity){
            this.entityTypes[componentName] = EntityClass;
        } else {
            console.log("EntityClass must extend class Entity");
        }
    }

    create(entityName:string){
        return this.entityTypes[entityName].create();
    }

    static create():EntityFactory{
        return createEntityFactory();
    }
}

function createEntityFactory():EntityFactory{
    var ef = new EntityFactory();
    ef.registerComponent("player", PlayerEntity);
    ef.registerComponent("villager", VillagerEntity);
    ef.registerComponent("crop", CropEntity);
    return ef;
}