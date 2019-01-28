import { Entity } from './entities/entity';
import { EntityFactory } from './entities/entity-factory';
import { ComponentFactory } from './components/component-factory';
import { EntitySystem } from './systems/system';
import { PositionComponent } from './components/position-component';
import { AnimationComponent } from './components/animation-component';
import { HtmlRenderer, Renderer } from './render';
import { EventManager } from './events/event-manager';
import { CropEntity } from './entities/crop-entity';
import { CropComponent } from './components/crop-component';
import { RenderSystem } from './systems/render-system';
import { WasdSystem } from './systems/wasd-system';
import { CropSystem } from './systems/crop-system';
import { CollisionSystem } from './systems/collision-system';
import { ProjectileEntity } from './entities/projectile-entity';
import { ProjectileComponent } from './components/projectile-component';
import { ProjectileSystem } from './systems/projectile-system';
import { FightSystem } from './systems/fight-system';
import { FightComponent } from './components/fight-component';

export class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer, eventManager:EventManager){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
        this.eventManager = eventManager;
    }
    static create(){
        var game = new Game(EntityFactory.create(), HtmlRenderer.create(), EventManager.create());
        game.addEntity("first");
        game.addSystem(RenderSystem.create(game));
        game.addSystem(WasdSystem.create(game));
        game.addSystem(CropSystem.create(game));
        game.addSystem(CollisionSystem.create(game));
        game.addSystem(ProjectileSystem.create(game));
        game.addSystem(FightSystem.create(game));
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
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].applyEvents(this.entities[i], this.eventManager);
            }
        }
        for(var i=0;i<this.entities.length;i++){
            this.entities[i].update();
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].apply(this.entities[i], this.eventManager);
            }
        }

        this.eventManager.fireCallbacks();

        this.entities.sort(function(a:Entity,b:Entity){
            var pa:PositionComponent = <PositionComponent>a.getComponent("position");
            var pb:PositionComponent = <PositionComponent>b.getComponent("position");
            return pa.y - pb.y;
        });
        this.cleanDestroyedEntities();
        /*
        this.entitiesX.sort(function(a:Entity,b:Entity){
            var pa:PositionComponent = <PositionComponent>a.getComponent("position");
            var pb:PositionComponent = <PositionComponent>b.getComponent("position");
            return pa.x - pb.x;
        });*/
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
var player = game.addEntity("player");
var pc= <PositionComponent>player.getComponent("position");
var ac = <AnimationComponent>player.getComponent("animation");
pc.x = 300;
pc.y = 380;
//ac.setSprite("onion");

var villager = game.addEntity("villager");
var component = <PositionComponent>villager.getComponent("position");
var fight = <FightComponent>villager.getComponent("fight");
ac = <AnimationComponent> villager.getComponent("animation");
component.x = 150;
component.y = 300;
component.vx = 0;
fight.attack = true;

var v2 = game.addEntity("villager");
fight.target = v2;

var component = <PositionComponent>v2.getComponent("position");
ac = <AnimationComponent> v2.getComponent("animation");
fight = <FightComponent>v2.getComponent("fight");
component.x = 600;
component.y = 800;
component.vx = 0;
fight.target = villager;
fight.attack = true;

var projectile:ProjectileEntity = <ProjectileEntity> game.addEntity("projectile");
pc = <PositionComponent>projectile.getComponent("position");
pc.x = 100;
pc.y = 500;
pc.vx = 0


//placeField(350,300, "wheat", 50)
//placeField(650,300, "corn", 50)
//placeField(350,600, "turnip", 50)
//placeField(650,600, "onion", 50)

function placeField(x:number,y:number, cropName:string, d:number=50, width:number=5){
    var crop:CropEntity;
    var cc:CropComponent;

    for(var i:number=0;i<width;i++){
        for(var i2:number=0;i2<width;i2++){
            crop = addCrop(x+i*d, y+i2*d);
            cc = <CropComponent>crop.getComponent("crop");
            cc.setCrop(cropName);
        }
    }
}

function addCrop(x:number,y:number){
    var crop = game.addEntity("crop");
    component = <PositionComponent>crop.getComponent("position");
    component.x = x;
    component.y = y;
    return crop
}




game.start();