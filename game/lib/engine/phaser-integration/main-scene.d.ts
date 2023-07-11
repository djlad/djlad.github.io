import { Scene } from "phaser";
export declare class MainScene extends Scene {
    constructor();
    private updater;
    private creators;
    private loaders;
    setUpdater(updateFunction: (delta: number) => void): void;
    addCreator(creator: (scene: Phaser.Scene) => void): void;
    addPreloader(loader: (scene: Phaser.Scene) => void): void;
    preload(): void;
    create(): void;
    update(time: number, delta: number): void;
}
