import { Entity } from './entities/entity';
import { EntityFactory } from './entities/entity-factory';
import { ComponentFactory } from './components/component-factory';
import { EntitySystem, RenderSystem } from './systems/system';
import { PositionComponent } from './components/position-component';
import { AnimationComponent } from './components/animation-component';
import { HtmlRenderer, Renderer } from './render';

class Game {
    constructor(entityFactory:EntityFactory, renderer:Renderer){
        this.entityFactory = entityFactory;
        this.renderer = renderer;
    }
    static create(){
        return new Game(EntityFactory.create(), HtmlRenderer.create());
    }

    entities:Entity[] = [];
    entityFactory:EntityFactory;
    systems:EntitySystem[] = [];
    renderer:Renderer;
    update(){
        this.renderer.cbox();
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
var renderer:Renderer = HtmlRenderer.create();
var game = Game.create();
var cf:ComponentFactory = ComponentFactory.create();
var ef:EntityFactory = EntityFactory.create();
var player = game.addEntity("player");
var component = <PositionComponent>player.getComponent("position");
component.vx = 1;
component.vy = 1;
component.width = 60
component.faceRight = true;
game.addSystem(RenderSystem.create());
game.start();