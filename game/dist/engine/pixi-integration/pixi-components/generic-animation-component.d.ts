import { Component } from "../../component/component";
import { IAnimationComponent } from "../../component/components/animation/ianimation-component";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { IEngineSprite } from "../sprite-dependency/iengine-sprite";
export declare class GenericAnimationComponent extends Component implements IAnimationComponent {
    engineSprite: IEngineSprite;
    spriteName: string;
    static fakeImageData: ImageData;
    static componentName: string;
    constructor(game: GameDependencies, entityId: string);
    update(entity: Entity, args: EntityUpdateArgs): void;
    getSpriteNumber(): void;
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData;
    setFilter(pixelData: ImageData): void;
    setSprite(animationName: string): void;
    setSpriteNumber(spriteName: string, spriteNumber: number): void;
    static create(game: GameDependencies, entityId: string): GenericAnimationComponent;
}
