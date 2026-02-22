import { IPositionComponent } from "../component/components/position/iposition-component";
import { ICameras } from "../dependencies/icameras";
import { PhaserGame } from "./phaser-game";
import { PhaserGameDependencies } from "./phaser-game-dependencies";
export declare class PhaserCameras implements ICameras {
    phaserGame: PhaserGame;
    constructor(phaserGame: PhaserGame);
    center: IPositionComponent;
    setMainCamera(position: IPositionComponent): void;
    static create(gameDependencies: PhaserGameDependencies): PhaserCameras;
}
