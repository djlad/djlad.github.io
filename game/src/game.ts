import { PositionComponent } from './engine/component/components/position/position-component';
import { CropComponent } from './components/crop-component';

import { Game } from './engine/game';
import { ParticleComponent } from './components/particle-componet';
import { createPixiGame } from './game-builders';
import { AnimationComponent } from './engine/component/components/animation/animation-component';
import { Entity } from './engine/entity/entity';
import { PixiDependencies } from './engine/pixi-integration/pixi-dependencies';
import { GenericPositionComponent } from './engine/pixi-integration/pixi-components/generic-position-component';
import { WeaponComponent } from './components/weapon-component';

declare var synaptic:any;
export declare var g:Game;


function startGame(){
    // let game:Game = createGame();
    // let game:Game = createPhaserGameGeneric();
    let game:Game = createPixiGame();
    // game.entityFactory.componentFactory.createComponent("animation");
    game.gameDependencies.spriteManager.onLoad(()=>{

    game.addEntity("first");
    const player = makePlayer();
    const playerPosition = <PositionComponent>player.getComponent("position");
    const playerSword = <WeaponComponent> player.getComponent("weapon");
    setTimeout(()=>playerSword.holdWeapon(), 100);
    game.gameDependencies.cameras.setMainCamera(playerPosition);

    var villager = game.addEntity("villager");
    var component = <PositionComponent>villager.getComponent("position");
    let ac = <AnimationComponent>villager.getComponent("animation");
    ac.setSprite("arrowsword");
    component.x = 150;
    component.y = 300;
    component.vx = 0;
    // component.height/=2
    // component.width/=2
    // ac.setSprite("grey");
    // component.height = 60

    let sword = game.addEntity("weapon");
    const pos = <GenericPositionComponent>sword.getComponent("position");
    pos.x = 100;
    pos.y = 100;
    setInterval(()=>{
        pos.rotate+=.1;
    },1000/30);
    
    var deer = game.addEntity("deer");
    let deerPos = <PositionComponent>deer.getComponent("position");
    let deerAC = <AnimationComponent>deer.getComponent("animation");
    deerPos.x = 500;
    deerPos.y = 100;

    let particle: Entity = game.addEntity("particles");
    let particleC = <ParticleComponent>particle.getComponent("particles");
    particleC.targetParticles = 4;
    let pPos = <PositionComponent>particle.getComponent("position");
    pPos.x = 150;
    pPos.y = 400;
    

    placeField(360,300, "wheat", 32, 5)
    placeField(720,300, "corn", 64)
    placeField(360,660, "turnip", 64)
    placeField(720,660, "onion", 64)
    // setTimeout(makePlayer, 1000);
    function placeField(x:number,y:number, cropName:string, d:number=64, width:number=5){
        var crop:Entity;
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
    game.start();
    //@ts-ignore
    window.game = game;
    return game;
    });
}
if (typeof window !== 'undefined')
{
    const game = startGame();
    /*
    let game = createPixiGame();
    let g = game.gameDependencies as PixiDependencies;
    g.pixiGame.start();
    g.spriteManager.onLoad(()=>{
        console.log("hi");
    });
    setTimeout(()=>{
        const anim = g.pixiGame.getSpriteAnimation("greyWalk");
        g.pixiGame.container.addChild(anim);
        anim.play();
    }, 4000)*/
}