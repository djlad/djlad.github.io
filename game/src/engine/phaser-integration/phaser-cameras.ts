import { IPositionComponent } from "../component/components/position/iposition-component";
import { GameDependencies } from "../dependencies/game-dependencies";
import { ICameras } from "../dependencies/icameras";
import { PhaserPositionComponent } from "./phaser-components/phaser-position-component";
import { PhaserGame } from "./phaser-game";
import { PhaserGameDependencies } from "./phaser-game-dependencies";

export class PhaserCameras implements ICameras {
    phaserGame: PhaserGame;
    constructor(phaserGame:PhaserGame){
        this.phaserGame = phaserGame;
    }
    center: IPositionComponent;
    setMainCamera(position:IPositionComponent): void {
        if (!(position instanceof PhaserPositionComponent)){
            console.error("Couldn't center camera. Position component must be PhaserPositionComponent");
        }
        this.center = position;
        const phaserPosition = <PhaserPositionComponent>position;
        this.phaserGame.mainScene.addCreator(()=>{
            const playerPhaserObj = phaserPosition.phaserObject;
            this.phaserGame.mainScene.cameras.main.startFollow(playerPhaserObj);
        })
    }
    public static create(gameDependencies:PhaserGameDependencies):PhaserCameras{
        gameDependencies.checkDependency(gameDependencies.phaserGame);
        const pc = new PhaserCameras(gameDependencies.phaserGame);
        return pc;
    }
}