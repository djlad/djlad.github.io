import { AnimationComponent, Entity, EntityRegistration, GameDependencies, PositionComponent } from "aiwar";
import { FloorComponent } from "../components/floor-component";

export class FloorEntity implements EntityRegistration {
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        const position = <PositionComponent>entity.addComponent("position");
        const animation = <AnimationComponent>entity.addComponent("animation");
        const floor = <FloorComponent>entity.addComponent("floor");
        animation.setSprite("jungleGreyTile");
        position.width = 64*2;
        position.height = 64*2;
        return entity;
    }
}