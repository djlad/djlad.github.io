import * as Phaser from "phaser";


export class PhaserGame {
    constructor(){}
    config:Phaser.Types.Core.GameConfig = {
        type: Phaser?.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: this.preload,
            create: this.create,
            update: this.update
        }
    };
    game: Phaser.Game;

    preload(){

    }
    create(){

    }
    update(){
    }

    public start(){
        console.log("test");
        console.log(Phaser);
        console.log(Phaser.Game);
        this.game = new Phaser.Game(this.config);
    }
}