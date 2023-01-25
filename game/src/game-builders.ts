import { buildEntities } from "./builders/entity-builder";
import { buildSprites } from "./builders/sprite-builder";
import { PhaserGame } from "./engine/phaser-integration/phaser-game";
import { ClickSystem } from "./systems/click-system";
import { CollisionSystem } from "./systems/collision-system";
import { CropSystem } from "./systems/crop-system";
import { HealthSystem } from "./systems/health-system";
import { InventorySystem } from "./systems/inventory-system";
import { MapBuilderSystem } from "./systems/map-builder-system";
import { NeuralFightSystem } from "./systems/neural-fight-system";
import { ParticleSystem } from "./systems/particle-system";
import { PlaceItemSystem } from "./systems/place-item-system";
import { PositionSystem } from "./systems/position-system";
import { ProjectileSystem } from "./systems/projectile-system";
import { WasdSystem } from "./systems/wasd-system";
import { Game } from './engine/game';
import { ClickableComponent } from "./components/clickable-component";
import { CropComponent } from "./components/crop-component";
import { FightComponent } from "./components/fight-component";
import { HealthComponent } from "./components/health-component";
import { InventoryComponent } from "./components/inventory-component/inventory-component";
import { NeuralFightComponent } from "./components/neural-fight-component";
import { ParticleComponent } from "./components/particle-componet";
import { PositionComponent } from "./engine/component/components/position/position-component";
import { PrimitiveComponent } from "./components/primitive-component";
import { ProjectileComponent } from "./components/projectile-component";
import { TileComponent } from "./components/tile-component/tile-component";
import { TransitionComponent } from "./components/transitions/transition-component";
import { WasdComponent } from "./components/wasd-component";
import { PhaserSpriteManager } from "./engine/phaser-integration/phaser-sprite-manager";
import { PhaserRenderSystem } from "./engine/phaser-integration/phaser-systems/phaser-render-system";
import { buildPhaserDependencies } from "./engine/phaser-integration/phaser-dependency-builder";
import { AnimationComponent } from "./engine/component/components/animation/animation-component";
import { PlaceItemComponent } from "./components/place-item/place-item-component";
import { CropHarvesterComponent } from "./components/crop-harvester-component";
import { TextComponent } from "./components/text-component/text-component";
import { PhaserAnimationComponent } from "./engine/phaser-integration/phaser-components/phaser-animation-component";
import { PhaserPositionComponent } from "./engine/phaser-integration/phaser-components/phaser-position-component";
import { createPhaserGame } from "./engine/phaser-integration/phaser-builder";
function sharedComponents(game:Game){
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

}
function buildComponents(game:Game){
    console.log("building game components");
    game.registerComponent(AnimationComponent);
    game.registerComponent(PositionComponent);
    sharedComponents(game);
}

export function createPhaserGameGeneric():Game{
    console.log("creating phaser game");
    // const deps = buildPhaserDependencies();
    // let game:Game = Game.createCustom(deps);
    let game:Game = createPhaserGame();
    game.addSystem(WasdSystem.create(game));
    game.addSystem(CropSystem.create(game));
    // game.addSystem(CollisionSystem.create(game));
    game.addSystem(ProjectileSystem.create(game));
    // game.addSystem(FightSystem.create(game));
    game.addSystem(HealthSystem.create(game));
    game.addSystem(PositionSystem.create(game));
    game.addSystem(NeuralFightSystem.create(game));
    game.addSystem(PlaceItemSystem.create(game));
    game.addSystem(InventorySystem.create(game));
    game.addSystem(ParticleSystem.create(game));
    game.addSystem(PhaserRenderSystem.create(game));
    game.addSystem(MapBuilderSystem.create(game));
    game.addSystem(ClickSystem.create(game));

    buildSprites(game);
    buildEntities(game);
    sharedComponents(game);
    return game;
}