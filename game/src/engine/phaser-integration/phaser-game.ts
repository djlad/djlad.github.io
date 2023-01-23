import * as Phaser from "phaser";
import { MainScene } from "./main-scene";


export class PhaserGame {
    constructor(){
        this.config = {
            type: Phaser.WEBGL,
            width:window.innerWidth,
            height:window.innerHeight,
            scene: MainScene,
            physics: {
                default:"arcade",
                arcade: {
                },
                matter:{
                    gravity:false,
                    debug: {
                        showBody: true,
                        showStaticBody: true
                    }
                },
            }
        }
    }
    config:Phaser.Types.Core.GameConfig;
    game: Phaser.Game;
    mainScene: MainScene = new MainScene();

    public start(){
        this.game = new Phaser.Game(this.config);
        this.mainScene.addCreator((scene)=>{
            console.log("creator for canvas");
            const canvas:HTMLCanvasElement = <HTMLCanvasElement>this.game.canvas;
            canvas.style.margin = "0";
            canvas.style.padding = "0";
            canvas.style.overflow = "hidden";
            canvas.style.position = "fixed";
            canvas.style.top = "0px";
            canvas.style.left = "0px";
        });
        this.game.scene.add("mainReal", this.mainScene);
        this.game.scene.switch("main", "mainReal");
    }

    setUpdater(updater:(delta:number)=>void){
        this.mainScene.setUpdater(updater);
    }

    private static phaserGame:PhaserGame = null; 

    public static createSingleton(){
        if (PhaserGame.phaserGame == null){
            PhaserGame.phaserGame = new PhaserGame();
        }
        return PhaserGame.phaserGame;
    }
}