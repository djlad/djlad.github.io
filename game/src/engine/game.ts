import { Entity } from './entity/entity';
import { EntityFactory } from './entity/entity-factory';
import { EntitySystem } from './system/system';
import { EventManager } from './events/event-manager';
import { Renderer } from './renderers/render';
import { HtmlRenderer } from './renderers/implementations/html/html-renderer';
import { SpriteManager } from './renderers/sprite-manager';
import { PositionComponent } from './component/components/position/position-component';
import { SystemArgs } from './system/system-args';
import { EntityUpdateArgs } from './entity/entity-update-args';
import { PhaserGame } from './phaser-integration/phaser-game';
import { ISpriteLoader } from './renderers/isprite-loader';
import { GameDependencies } from './dependencies/game-dependencies';
import { ComponentFactory } from './component/component-factory';
import { GenericCameras } from './dependencies/generic-cameras';
import { EntityRegistration } from './entity/entity-registration';

export class Game {
    spriteManager: any;
    newTime: number;
    constructor(entityFactory:EntityFactory, renderer:Renderer, eventManager:EventManager, gameDependencies:GameDependencies){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
        this.eventManager = eventManager;
        this.gameDependencies = gameDependencies;
        this.spriteManager = gameDependencies.spriteManager;
    }

    static create():Game{
        const renderer = HtmlRenderer.create();
        const deps = new GameDependencies();
        deps.renderer = renderer;
        deps.eventManager = EventManager.create();
        deps.componentFactory = ComponentFactory.create(deps);
        deps.entityFactory = EntityFactory.create(deps);
        deps.spriteManager = deps.renderer.spriteManager;
        deps.cameras = GenericCameras.create();
        var game = new Game(deps.entityFactory, deps.renderer, EventManager.create(), deps);
        return game;
    }
    
    static createCustom(dependencies:GameDependencies):Game{
        var game = new Game(dependencies.entityFactory, dependencies.renderer, dependencies.eventManager, dependencies);
        dependencies.game = game;
        return game;
    }
    private starters:((games:Game)=>void)[] = [];
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
    systemsWithOncePerTurnUpdate:EntitySystem[] = [];
    renderer:Renderer;
    eventManager:EventManager;
    intervalId:number;
    gameDependencies: GameDependencies;
    performance: number;
    frameTime: number;
    targetFps: number = 60;
    counter: number = 0;
    lastTime = performance.now();
    frameTracker:number = 0;
    phaserGame:PhaserGame;
    update(delta:number, framesPassed:number){
        // this.renderer.cbox();
        this.eventManager.update();
        for (let i=0;i<this.systemsWithOncePerTurnUpdate.length;i++){
            const args = new SystemArgs();
            args.entity = this.entities[0];
            args.eventManager = this.eventManager;
            args.fullFramesPassed = framesPassed;
            this.systemsWithOncePerTurnUpdate[i].oncePerLoop(args);
        }
        for(var i=0;i<this.entities.length;i++){
            const args = new EntityUpdateArgs();
            args.delta = delta;
            args.fullFramePassed = framesPassed;
            this.entities[i].update(args);
            /*for(var systemi=0;systemi<this.systems.length;systemi++){
                const args = new SystemArgs();
                args.entity = this.entities[i];
                args.eventManager = this.eventManager;
                args.fullFramesPassed = framesPassed;
                this.systems[systemi].apply(args);
            }*/
            const args2 = new SystemArgs();
            args2.entity = this.entities[i];
            args2.eventManager = this.eventManager;
            args2.fullFramesPassed = framesPassed;
            this.entities[i].applySystems(args2);
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
        this.renderer.text(Math.floor(this.frameTime).toString(),0,0, 1000);
        this.counter = (this.counter + 1)%100;
    }
    step(delta:number){
        this.newTime = performance.now();
        this.performance = performance.now();
        delta = delta/(1000/this.targetFps);
        // console.log(delta);
        this.frameTracker += delta;
        if (this.frameTracker > 1){
            this.update(delta, Math.floor(this.frameTracker));
            this.frameTracker = 0;
        } else {
            this.update(delta, 0);
        }
        this.frameTime = performance.now() - this.performance;
    }
    private loop(time:number){
        const delta = (time - this.lastTime)/(1000/this.targetFps);
        this.step(delta);
        this.lastTime = time;
        window.requestAnimationFrame((time)=>{this.loop(time)});
    }
    start():number{
        if (this.starters.length > 0){
            console.log("starting game custom");
            this.starters.forEach((starter)=>{
                starter(this);
            });
            return;
        }
        console.log("starting game loop with requestAnimationFrame");
        window.requestAnimationFrame(()=>{
            this.loop(this.lastTime);
        });
        return 0;
    }

    stop(){
        clearInterval(this.intervalId);
    }

    addStarter(starterFunc:(game:Game)=>void){
        this.starters.push(starterFunc);
    }

    addEntity(entityName:string){
        var entity:Entity = this.entityFactory.create(entityName);
        this.systems.forEach((system)=>{
            if (system.shouldApply(entity)) {
                entity.addApplicableSystem(system);
            }
        })
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
        if (system.oncePerLoop == null)return;
        this.systemsWithOncePerTurnUpdate.push(system);
    }

    registerEntity(entityName:string, EntityClass:EntityRegistration):void{
        this.entityFactory.registerEntity(entityName, EntityClass);
    }

    registerComponent(EntityClass:any):void{
        this.entityFactory.registerComponent(EntityClass);
    }
}