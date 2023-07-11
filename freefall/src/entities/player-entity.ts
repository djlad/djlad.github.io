import { EntityRegistration, AnimationComponent, PositionComponent, WasdComponent} from "aiwar";
import { GravityComponent } from "../components/gravity";

export class PlayerEntity implements EntityRegistration {
    create(gameDependencies, entity) {
        var wasd:WasdComponent = <WasdComponent>entity.addComponent("wasd");
        var animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        var gravity:GravityComponent = <GravityComponent>entity.addComponent("gravity");
        position.width = 64*2;
        position.height = 64*2;
        return entity;  
    }
}