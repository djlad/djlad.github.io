import { Entity } from './entities/entity';
import { EntityFactory } from './entities/entity-factory';
import { ComponentFactory } from './components/component-factory';
import { EntitySystem, RenderSystem, WasdSystem } from './systems/system';
import { PositionComponent } from './components/position-component';
import { AnimationComponent } from './components/animation-component';
import { HtmlRenderer, Renderer } from './render';
import { EventManager } from './events/event-manager';

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
var component = <PositionComponent>player.getComponent("position");
//component.vx = 5;
component.width = 60;
component.faceRight = false;

var villager = game.addEntity("villager");
component = <PositionComponent>villager.getComponent("position");
component.x = 300;
component.y = 300;

game.addSystem(RenderSystem.create());
game.addSystem(WasdSystem.create());
game.start();