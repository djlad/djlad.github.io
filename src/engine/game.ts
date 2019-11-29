import { Entity } from './entity/entity';
import { EntityFactory } from './entity/entity-factory';
import { EntitySystem } from './system/system';
import { EventManager } from './events/event-manager';
import { Renderer } from './renderers/render';
import { HtmlRenderer } from './renderers/html-renderer';



export class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer, eventManager:EventManager){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
        this.eventManager = eventManager;
    }

    static create():Game{
        var game = new Game(EntityFactory.create(), HtmlRenderer.create(), EventManager.create());
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
    eventManager:EventManager;
    i:number=0;
    update(){
        this.renderer.cbox();
        this.eventManager.update();
        for(var i=0;i<this.entities.length;i++){
            this.entities[i].update();
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].apply(this.entities[i], this.eventManager);
            }
        }

        var numEvents:number;
        for(var i=0;i<this.entities.length;i++){
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].applyEvents(this.entities[i], this.eventManager);
            }
            this.entities[i].targetedEvents = this.entities[i].delayedEvents;
            this.entities[i].delayedEvents = [];
        }
        
        //this.eventManager.fireCallbacks();
        
        /* this.entities.sort(function(a:Entity,b:Entity){
            var pa:PositionComponent = <PositionComponent>a.getComponent("position");
            var pb:PositionComponent = <PositionComponent>b.getComponent("position");
            return pa.y - pb.y;
        }); */
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

    addSystem(system:EntitySystem):void{
        this.systems.push(system);
    }

    registerEntity(entityName:string, EntityClass:any):void{
        this.entityFactory.registerEntity(entityName, EntityClass);
    }

    registerComponent(EntityClass:any):void{
        this.entityFactory.registerComponent(EntityClass);
    }
}