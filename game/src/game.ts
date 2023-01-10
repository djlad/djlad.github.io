import { PositionComponent } from './components/position-component';
import { AnimationComponent } from './components/animation-component';
import { CropEntity } from './entities/crop-entity';
import { CropComponent } from './components/crop-component';
import { RenderSystem } from './systems/render-system';
import { WasdSystem } from './systems/wasd-system';
import { CropSystem } from './systems/crop-system';
import { CollisionSystem } from './systems/collision-system';
import { ProjectileEntity } from './entities/projectile-entity';
import { ProjectileSystem } from './systems/projectile-system';
import { FightComponent } from './components/fight-component';
import { HealthSystem } from './systems/health-system';
import { PositionSystem } from './systems/position-system';

import { NeuralFightSystem } from './systems/neural-fight-system';
import { Game } from './engine/game';
import { buildSprites } from './builders/sprite-builder';
import { buildEntities } from './builders/entity-builder';
import { buildComponents } from './builders/build-components';
import { FightSystem } from './systems/fight-system';
import { PlaceItemSystem } from './systems/place-item-system';
import { InventorySystem } from './systems/inventory-system';
import { ParticleSystem } from './systems/particle-system';
import { ParticleEntity } from './entities/particles/particle-entity';
import { ParticleComponent } from './components/particle-componet';
import { MapBuilderSystem } from './systems/map-builder-system';
import { ClickSystem } from './systems/click-system';

declare var synaptic:any;
export declare var g:Game;

function createGame():Game{
    let game:Game = Game.create()
    game.addSystem(WasdSystem.create(game));
    game.addSystem(CropSystem.create(game));
    game.addSystem(CollisionSystem.create(game));
    game.addSystem(ProjectileSystem.create(game));
    // game.addSystem(FightSystem.create(game));
    game.addSystem(HealthSystem.create(game));
    game.addSystem(PositionSystem.create(game));
    game.addSystem(NeuralFightSystem.create(game));
    game.addSystem(PlaceItemSystem.create(game));
    game.addSystem(InventorySystem.create(game));
    game.addSystem(ParticleSystem.create(game));
    game.addSystem(RenderSystem.create(game));
    game.addSystem(MapBuilderSystem.create(game));
    game.addSystem(ClickSystem.create(game));

    buildSprites(game)
    buildEntities(game);
    buildComponents(game);
    return game;
}

export function startGame(){
    let game:Game = createGame();
    game.entityFactory.componentFactory.createComponent("animation");
    game.addEntity("first");
    makePlayer();
    //ac.setSprite("onion");

    var villager = game.addEntity("villager");
    var component = <PositionComponent>villager.getComponent("position");
    let ac = <AnimationComponent>villager.getComponent("animation");
    component.x = 150;
    component.y = 300;
    component.vx = 0;
    // component.height/=2
    // component.width/=2
    // ac.setSprite("grey");
    // component.height = 60
    
    var deer = game.addEntity("deer");
    let deerPos = <PositionComponent>deer.getComponent("position");
    let deerAC = <AnimationComponent>deer.getComponent("animation");
    deerPos.x = 500;
    deerPos.y = 100;

    let particle: ParticleEntity = <ParticleEntity> game.addEntity("particles");
    let particleC = <ParticleComponent>particle.getComponent("particles");
    particleC.targetParticles = 4;
    let pPos = <PositionComponent>particle.getComponent("position");
    pPos.x = 150;
    pPos.y = 400;
    

    placeField(350,300, "wheat", 50, 5)
    /*placeField(650,300, "corn", 50)
    placeField(350,600, "turnip", 50)
    placeField(650,600, "onion", 50)*/
    // setTimeout(makePlayer, 1000);
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
        var component = <PositionComponent>crop.getComponent("position");
        component.x = x;
        component.y = y;
        return crop
    }

    function makePlayer(){
        var player = game.addEntity("player");
        var pc= <PositionComponent>player.getComponent("position");
        var ac = <AnimationComponent>player.getComponent("animation");
        pc.x = 300;
        pc.y = 380;
        return player;
    }
    let intervalId:number = game.start();
    return game;
}
// (function(){
// startGame();
// })();