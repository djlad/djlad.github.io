import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { CropComponent } from '../components/crop-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';

export class CropEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        position.width = 100;
        position.height = 100;
        let animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        let crop:CropComponent = <CropComponent>entity.addComponent("crop");
        if(crop.growthSprites.length > 0) {
            animation.setSprite(crop.growthSprites[0]);
        }
        return entity;
    }
}