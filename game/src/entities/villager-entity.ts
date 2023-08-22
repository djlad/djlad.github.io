import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GameDependencies } from '../engine/dependencies/game-dependencies';
import { WeaponComponent } from '../components/weapon-component/weapon-component';

export class VillagerEntity implements EntityRegistration{
    create(gameDependcies: GameDependencies, entity: Entity){
        var animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position:PositionComponent = <PositionComponent>entity.addComponent("position");
        var fight:FightComponent = <FightComponent>entity.addComponent("fight");
        var health:HealthComponent = <HealthComponent>entity.addComponent("health");
        var neural:NeuralFightComponent = <NeuralFightComponent>entity.addComponent("neural");
        const weapon = <WeaponComponent>entity.addComponent("weapon");
        weapon.setWielder(entity);
        weapon.sheatheBack();
        
        position.width = 32;
        position.height = 48;
        // animation.setSprite("brownpuffgirl");
        let multi = 2.4
        position.width *= multi
        position.height *= multi
        return entity;
    }
}