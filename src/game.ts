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

declare var synaptic:any;

function createGame():Game{
    let game:Game = Game.create()
    game.addSystem(RenderSystem.create(game));
    game.addSystem(WasdSystem.create(game));
    game.addSystem(CropSystem.create(game));
    game.addSystem(CollisionSystem.create(game));
    game.addSystem(ProjectileSystem.create(game));
    // game.addSystem(FightSystem.create(game));
    game.addSystem(HealthSystem.create(game));
    game.addSystem(PositionSystem.create(game));
    game.addSystem(NeuralFightSystem.create(game));
    game.addSystem(PlaceItemSystem.create(game));

    buildSprites(game)
    buildEntities(game);
    buildComponents(game);
    return game;
}

export function startGame(){
    let game:Game = createGame();
    game.entityFactory.componentFactory.createComponent("animation");
    game.addEntity("first");

    var player = game.addEntity("player");

    var pc= <PositionComponent>player.getComponent("position");
    var ac = <AnimationComponent>player.getComponent("animation");
    pc.x = 300;
    pc.y = 380;
    //ac.setSprite("onion");

    var villager = game.addEntity("villager");
    var component = <PositionComponent>villager.getComponent("position");
    var fight = <FightComponent>villager.getComponent("fight");
    ac = <AnimationComponent>villager.getComponent("animation");
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


    placeField(350,300, "wheat", 50)
    placeField(650,300, "corn", 50)
    placeField(350,600, "turnip", 50)
    placeField(650,600, "onion", 50)

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
    let intervalId:number = game.start();
}
(function(){
    startGame();
})();