import { Component } from "../../component/component";
import { IAnimationComponent } from "../../component/components/animation/ianimation-component";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";

export class GenericAnimationComponent extends Component implements IAnimationComponent {
    update(entity: Entity, args: EntityUpdateArgs): void {
    }
    spriteName: string;
    public static fakeImageData: ImageData = new ImageData(1,1);
    getSpriteNumber(): void {
    }
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData {
        return GenericAnimationComponent.fakeImageData;
    }
    setFilter(pixelData: ImageData): void {
    }
    setSprite(animationName: string): void {
    }
    setSpriteNumber(spriteName: string, spriteNumber: number): void {
    }
    public static create(game: GameDependencies): GenericAnimationComponent {
        return new GenericAnimationComponent("animation");
    }
}