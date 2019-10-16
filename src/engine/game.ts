import { Entity } from './entity/entity';
import { EntityFactory } from './entity/entity-factory';
import { EntitySystem } from './system/system';
import { HtmlRenderer, Renderer } from './renderers/render';

export class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
    }

    static create():Game{
        var game = new Game(EntityFactory.create(), HtmlRenderer.create());
        return game;
    }

    private _entities:Entity[] = [];
    get entities():Entity[]{
        return this._entities;
    }
    set entities(entities:Entity[]){
        //console.log(entities)
        this._entities = entities;
    }
    //entitiesX:Entity[] = [];
    entityFactory:EntityFactory;
    systems:EntitySystem[] = [];
    renderer:Renderer;
    i:number=0;
    update(){
        this.renderer.cbox();
        for(var i=0;i<this.entities.length;i++){
            this.entities[i].update();
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].apply(this.entities[i]);
            }
        }

        var numEvents:number;
        for(var i=0;i<this.entities.length;i++){
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].applyEvents(this.entities[i]);
            }
            this.entities[i].targetedEvents = this.entities[i].delayedEvents;
            this.entities[i].delayedEvents = [];
        }
        this.cleanDestroyedEntities();
    }
    render(){

    }
    step(){
        this.update();
        this.render();
    }
    start(){
        console.log("starting game")
        setInterval((function(game){
            return function(){game.step()}
        })(this), 1000/30);
    }

    addEntity(entityName:string){
        var entity:Entity = this.entityFactory.create(entityName);
        this.entities.push(entity);
        //this.entitiesX.push(entity);
        return entity;
    }

    getById(entityId:number):Entity{
        var entity:Entity;
        for(var i=0;i<this.entities.length;i++){
            entity = this.entities[i];
            if(entityId == entity.id)return entity
        }
        return null;
    }

    destroy(entity:Entity){
        entity.destroyed = true;
    }

    cleanDestroyedEntities(){
        this.entities = this.entities.filter(function(e){
            return !e.destroyed;
        })
    }

    addSystem(system:EntitySystem){
        this.systems.push(system);
    }
}
export var game = Game.create();

game.start();