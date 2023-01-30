import { Component } from "../../component/component";
import { IAnimationComponent } from "../../component/components/animation/ianimation-component";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { Entity } from "../../entity/entity";
import { EntityUpdateArgs } from "../../entity/entity-update-args";
import { Game } from "../../game";
import { IEngineSprite } from "../sprite-dependency/iengine-sprite";

export class GenericAnimationComponent extends Component implements IAnimationComponent {
    engineSprite: IEngineSprite;
    spriteName: string;
    public static fakeImageData: ImageData = new ImageData(1,1);
    public static componentName:string = "animation"
    constructor(game:GameDependencies, entityId:string){
        super("animation");
        game.checkDependency(game.engineCreator);
        this.engineSprite = game.engineCreator.createEngineSprite(entityId);
    }
    update(entity: Entity, args: EntityUpdateArgs): void {
    }
    getSpriteNumber(): void {
    }
    getRGBs(animationName?: string, spriteNumber?: number, width?: number, height?: number): ImageData {
        return GenericAnimationComponent.fakeImageData;
    }
    setFilter(pixelData: ImageData): void {
    }
    setSprite(animationName: string): void {
        if (animationName == this.spriteName)return;
        this.spriteName = animationName;
        this.engineSprite.setSprite(animationName);
    }
    setSpriteNumber(spriteName: string, spriteNumber: number): void {
    }
    public static create(game: GameDependencies, entityId:string): GenericAnimationComponent {
        return new GenericAnimationComponent(game, entityId);
    }
}