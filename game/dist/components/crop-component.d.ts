import { Component } from '../engine/component/component';
export declare class CropComponent extends Component {
    constructor();
    growthSprites: string[];
    growthStage: number;
    growthLengths: number[];
    timeSinceGrowth: number;
    cropName: string;
    setSprites(sprites: string[]): void;
    isGrown(): boolean;
    setCrop(cropName: string): void;
    update(): void;
    static create(): CropComponent;
}
