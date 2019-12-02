import { PositionComponent } from './position-component';
import { AnimationComponent } from './animation-component';
import { WasdComponent } from './wasd-component';
import { CropComponent } from './crop-component';
import { ProjectileComponent } from './projectile-component';
import { FightComponent } from './fight-component';
import { HealthComponent } from './health-component';
import { NeuralFightComponent } from './neural-fight-component';
import { ComponentFactory } from "../engine/component/component-factory";
import { Game } from '../engine/game';
import { InventoryComponent } from './inventory-component';

export function createComponentFactory():ComponentFactory{
    var cf:ComponentFactory = new ComponentFactory();
    cf.registerComponent(AnimationComponent);
    cf.registerComponent(PositionComponent);
    cf.registerComponent(WasdComponent);
    cf.registerComponent(CropComponent);
    cf.registerComponent(ProjectileComponent);
    cf.registerComponent(FightComponent);
    cf.registerComponent(HealthComponent);
    cf.registerComponent(NeuralFightComponent);
    cf.registerComponent(InventoryComponent);
    return cf;
}

export function populateComponentFactory(game:Game):void{
    game.registerComponent(AnimationComponent);
    game.registerComponent(PositionComponent);
    game.registerComponent(WasdComponent);
    game.registerComponent(CropComponent);
    game.registerComponent(ProjectileComponent);
    game.registerComponent(FightComponent);
    game.registerComponent(HealthComponent);
    game.registerComponent(NeuralFightComponent);
    game.registerComponent(InventoryComponent);
}