import { PositionComponent } from '../engine/component/components/position/position-component';
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
import { CropHarvesterComponent } from '../components/crop-harvester-component';
import { TextComponent } from '../components/text-component/text-component';
import { ParticleComponent } from '../components/particle-componet';
import { PrimitiveComponent } from '../components/primitive-component';
import { TransitionComponent } from '../components/transitions/transition-component';
import { TileComponent } from '../components/tile-component/tile-component';
import { ClickableComponent } from '../components/clickable-component';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { PhaserAnimationComponent } from '../engine/phaser-integration/phaser-components/phaser-animation-component';
import { PhaserPositionComponent } from '../engine/phaser-integration/phaser-components/phaser-position-component';
import { WeaponComponent } from '../components/weapon-component';


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
    game.registerComponent(ParticleComponent);
    game.registerComponent(PrimitiveComponent);
    game.registerComponent(TransitionComponent);
    game.registerComponent(TileComponent);
    game.registerComponent(ClickableComponent);
    game.registerComponent(PlaceItemComponent);
    game.registerComponent(CropHarvesterComponent);
    game.registerComponent(TextComponent);
    game.registerComponent(WeaponComponent);
}