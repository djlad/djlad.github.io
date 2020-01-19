import { PositionComponent } from '../components/position-component';
import { AnimationComponent } from '../components/animation-component';
import { WasdComponent } from '../components/wasd-component';
import { CropComponent } from '../components/crop-component';
import { ProjectileComponent } from '../components/projectile-component';
import { FightComponent } from '../components/fight-component';
import { HealthComponent } from '../components/health-component';
import { NeuralFightComponent } from '../components/neural-fight-component';
import { Game } from '../engine/game';
import { InventoryComponent } from '../components/inventory-component/inventory-component';
import { ComponentFactory } from '../engine/component/component-factory';
import { PlaceItemComponent } from '../components/place-item/place-item-component';

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
    cf.registerComponent(PlaceItemComponent);
    return cf;
}

export function buildComponents(game:Game):void{
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