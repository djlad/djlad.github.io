import { PositionComponent } from './engine/component/components/position/position-component';
import { CropComponent } from './components/crop-component';

import { Game } from './engine/game';
import { ParticleComponent } from './components/particle-componet';
import { createPixiGame } from './game-builders';
import { AnimationComponent } from './engine/component/components/animation/animation-component';
import { Entity } from './engine/entity/entity';
import { PixiDependencies } from './engine/pixi-integration/pixi-dependencies';
import { GenericPositionComponent } from './engine/pixi-integration/pixi-components/generic-position-component';
import { WeaponComponent } from './components/weapon-component/weapon-component';
import { blue } from './characters/character-builder';

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

    const john = blue(game, 100, 100);

    let sword = game.addEntity("weapon");
    const pos = <GenericPositionComponent>sword.getComponent("position");
    pos.x = 100;
    pos.y = 300;
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
    
    const tileWidth = 64;
    placeField(tileWidth*5, tileWidth*5, "wheat", tileWidth, 6);
    placeField(tileWidth*12, tileWidth*5, "corn", tileWidth);
    placeField(tileWidth*5, tileWidth*12, "turnip", tileWidth);
    placeField(tileWidth*12, tileWidth*12, "onion", tileWidth);
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
        pc.x = 0;
        pc.y = 0;
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