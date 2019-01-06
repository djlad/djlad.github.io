import { Entity, EntityFactory} from './entities/entity';
import { ComponentFactory } from './components/component-factory';
import { EntitySystem, RenderSystem } from './systems/system';
import { PositionComponent } from './components/component';
import { HtmlRenderer } from './render';

class Game {
    constructor(entityFactory:EntityFactory){
        this.entityFactory = entityFactory;
    }
    static create(){
        return new Game(EntityFactory.create());
    }

    entities:Entity[] = [];
    entityFactory:EntityFactory;
    systems:EntitySystem[] = [];
    update(){
        renderer.cbox();
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
        console.log("start")
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

var renderer:HtmlRenderer = HtmlRenderer.create();
var game = Game.create();
var cf:ComponentFactory = ComponentFactory.create();
var ef:EntityFactory = EntityFactory.create();
var player = game.addEntity("player");
var component = <PositionComponent>player.getComponent("position");
component.vx = .33;
component.width = 60
game.addSystem(RenderSystem.create());
game.start();