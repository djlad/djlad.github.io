import { Component } from '../engine/component/component';
import { SpriteManager } from '../engine/renderers/sprite-manager';
import { Entity } from '../engine/entity/entity';
import { EntityUpdateArgs } from '../engine/entity/entity-update-args';
export declare class AnimationComponent extends Component {
    constructor(animationName: string, delay: number, spriteManager: SpriteManager);
    spriteNumbers: number[];
    animationName: string;
    spriteName: string;
    delay: number;
    frameNum: number;
    spriteNum: number;
    spriteManager: SpriteManager;
    currentDelay: number;
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
