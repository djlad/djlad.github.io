import { Entity } from "../../../entity/entity";
import { EntityUpdateArgs } from "../../../entity/entity-update-args";
import { SpriteManager } from "../../../renderers/sprite-manager";
import { Component } from "../../component";
import { IAnimationComponent } from "./ianimation-component";
export declare class AnimationComponent extends Component implements IAnimationComponent {
    constructor(animationName: string, delay: number, spriteManager: SpriteManager);
    private spriteNumbers;
    animationName: string;
    spriteName: string;
    private delay;
    private frameNum;
    private spriteNum;
    private spriteManager;
    private currentDelay;
    filter: ImageData;
    isFiltered: boolean;
    getSpriteNumber(): number;
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData;
    setFilter(pixelData: ImageData): void;
    setSprite(animationName: string): void;
    setSpriteNumber(spriteName: string, spriteNumber: number): void;
    update(entity: Entity, args: EntityUpdateArgs): void;
    static create(): AnimationComponent;
}
