import { Entity } from './entity/entity';
import { EntityFactory } from './entity/entity-factory';
import { EntitySystem } from './system/system';
import { EventManager } from './events/event-manager';
import { Renderer } from './renderers/render';
import { HtmlRenderer } from './renderers/implementations/html/html-renderer';
import { SpriteManager } from './renderers/sprite-manager';
import { PositionComponent } from '../components/position-component';
import { SystemArgs } from './system/system-args';
import { EntityUpdateArgs } from './entity/entity-update-args';
import { PhaserGame } from './phaser-integration/phaser-game';
import { ISpriteLoader } from './renderers/isprite-loader';

export class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer, eventManager:EventManager, spriteManager:ISpriteLoader){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
        this.eventManager = eventManager;
        this.spriteManager = spriteManager;
    }

    static create():Game{
        const renderer = HtmlRenderer.create();
        var game = new Game(EntityFactory.create(), renderer, EventManager.create(), renderer.spriteManager);
        return game;
    }
    
    static createCustom(spriteManager:ISpriteLoader):Game{
        var game = new Game(EntityFactory.create(), HtmlRenderer.create(), EventManager.create(), spriteManager);
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
    intervalId:number;
    spriteManager:ISpriteLoader;
    performance: number;
    frameTime: number;
    targetFps: number = 60;
    counter: number = 0;
    lastTime = performance.now();
    frameTracker:number = 0;
    phaserGame:PhaserGame;
    update(delta:number, framesPassed:number){
        // this.renderer.cbox();
        this.performance = performance.now();
        this.eventManager.update();
        for(var i=0;i<this.entities.length;i++){
            const args = new EntityUpdateArgs();
            args.delta = delta;
            args.fullFramePassed = framesPassed;
            this.entities[i].update(args);
            for(var systemi=0;systemi<this.systems.length;systemi++){
                const args = new SystemArgs();
                args.entity = this.entities[i];
                args.eventManager = this.eventManager;
                args.fullFramesPassed = framesPassed;
                this.systems[systemi].apply(args);
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
        
        this.eventManager.fireCallbacks();
        
        this.entities.sort(function(a:Entity,b:Entity){
            var pa:PositionComponent = <PositionComponent>a.getComponent("position");
            var pb:PositionComponent = <PositionComponent>b.getComponent("position");
            return pa.y - pb.y;
        });
        this.cleanDestroyedEntities();
        if (this.counter%10==0){
            this.frameTime = 100*(performance.now() - this.performance)/(1000/this.targetFps)
        }else performance.now();
        this.renderer.text(Math.floor(this.frameTime).toString(),0,0, 1000);
        this.counter = (this.counter + 1)%100;
    }
    step(delta:number){
        delta = delta/(1000/this.targetFps);
        this.frameTracker += delta;
        if (this.frameTracker > 1){
            this.update(delta, Math.floor(this.frameTracker));
            this.frameTracker = 0;
        } else {
            this.update(delta, 0);
        }
    }
    private loop(time:number){
        const delta = (time - this.lastTime)/(1000/this.targetFps);
        this.step(delta);
        this.lastTime = time;
        window.requestAnimationFrame((time)=>{this.loop(time)});
    }
    start():number{
        console.log("starting game")
        window.requestAnimationFrame(()=>{
            this.loop(this.lastTime);
        });
        return 0;
    }

    stop(){
        clearInterval(this.intervalId);
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
        if(this.entities.filter((entity)=>entity.destroyed).length == 0)return;
        let newEntities:Entity[] = [];
        for(let i:number=0;i<this.entities.length;i++){
            if(!this.entities[i].destroyed){
                newEntities.push(this.entities[i]);
            } else {
                delete this.entities[i];
            }
        }
        delete this.entities;
        this.entities = newEntities;
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