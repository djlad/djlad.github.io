import * as Phaser from "phaser";
import { MainScene } from "./main-scene";
export declare class PhaserGame {
    constructor();
    config: Phaser.Types.Core.GameConfig;
    game: Phaser.Game;
    mainScene: MainScene;
    start(): void;
    setUpdater(updater: (delta: number) => void): void;
    private static phaserGame;
    static createSingleton(): PhaserGame;
}
