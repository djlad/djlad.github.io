import { Component } from "../../component/component";
import { IAnimationComponent } from "../../component/components/animation/ianimation-component";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { ISpriteLoader } from "../../renderers/isprite-loader";
export declare class PhaserAnimationComponent extends Component implements IAnimationComponent {
    animationName: string;
    spriteName: string;
    animationNameUpdated: boolean;
    private phaserGame;
    fakeImageData: ImageData;
    constructor(animationName: string, delay: number, spriteManager: ISpriteLoader);
    getSpriteNumber(): void;
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData;
    setFilter(pixelData: ImageData): void;
    setSprite(animationName: string): void;
    setSpriteNumber(spriteName: string, spriteNumber: number): void;
    update(entity: Entity, args: EntityUpdateArgs): void;
    static create(): PhaserAnimationComponent;
}
