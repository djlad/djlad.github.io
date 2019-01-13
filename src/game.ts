import { Entity } from './entities/entity';
import { EntityFactory } from './entities/entity-factory';
import { ComponentFactory } from './components/component-factory';
import { EntitySystem, RenderSystem, WasdSystem, CropSystem } from './systems/system';
import { PositionComponent } from './components/position-component';
import { AnimationComponent } from './components/animation-component';
import { HtmlRenderer, Renderer } from './render';
import { EventManager } from './events/event-manager';
import { CropEntity } from './entities/crop-entity';
import { CropComponent } from './components/crop-component';

class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer, eventManager:EventManager){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
        this.eventManager = eventManager;
    }
    static create(){
        var game = new Game(EntityFactory.create(), HtmlRenderer.create(), EventManager.create());
        return game;
    }

    entities:Entity[] = [];
    entityFactory:EntityFactory;
    systems:EntitySystem[] = [];
    renderer:Renderer;
    eventManager:EventManager;
    update(){
        this.renderer.cbox();
        this.eventManager.update();
        //console.log("blanked")
        for(var i=0;i<this.entities.length;i++){
            //this.entities[i].handleEvents(this.eventManager.events);
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].applyEvents(this.entities[i], this.eventManager.events);
            }
        }
        for(var i=0;i<this.entities.length;i++){
            this.entities[i].update();
            for(var systemi=0;systemi<this.systems.length;systemi++){
                this.systems[systemi].apply(this.entities[i]);
            }
        }
        this.entities.sort(function(a:Entity,b:Entity){
            var pa:PositionComponent = <PositionComponent>a.getComponent("position");
            var pb:PositionComponent = <PositionComponent>b.getComponent("position");
            return pa.y - pb.y;
        });
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
        return entity;
    }

    addSystem(system:EntitySystem){
        this.systems.push(system);
    }
}
var game = Game.create();
var player = game.addEntity("player");
var pc= <PositionComponent>player.getComponent("position");

var villager = game.addEntity("villager");
var component = <PositionComponent>villager.getComponent("position");
component.x = 300;
component.y = 300;


placeField(350,300, "wheat", 50)
placeField(650,300, "corn", 50)
placeField(350,600, "turnip", 50)

function placeField(x:number,y:number, cropName:string, d:number=50){
    var crop:CropEntity;
    var cc:CropComponent;

    for(var i:number=0;i<5;i++){
        for(var i2:number=0;i2<5;i2++){
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




game.addSystem(RenderSystem.create());
game.addSystem(WasdSystem.create());
game.addSystem(CropSystem.create());
game.start();