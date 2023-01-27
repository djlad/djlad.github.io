import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';

export class VillagerEntity implements EntityRegistration{
    create(gameDependcies: GameDependencies, entity: Entity){
        var animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        var fight:FightComponent = <FightComponent>entity.addComponent("fight");
        var health:HealthComponent = <HealthComponent>entity.addComponent("health");
        var neural:NeuralFightComponent = <NeuralFightComponent>entity.addComponent("neural");
        
        position.width = 70;
        /*animation.setSprite("brownpuffgirl");
        
        position.height = 32;
        let multiplier = 2.5;
        position.height *= multiplier * 1.1;
        position.width *= multiplier;*/
        return entity;
    }
}