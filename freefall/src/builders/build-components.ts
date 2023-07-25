import { Game, ClickableComponent, CropComponent, CropHarvesterComponent, FightComponent, HealthComponent, InventoryComponent, NeuralFightComponent, ParticleComponent, PlaceItemComponent, PrimitiveComponent, ProjectileComponent, TextComponent, TileComponent, TransitionComponent, WasdComponent, WeaponComponent } from "aiwar";
import { GravityComponent } from "../components/gravity";
import { FloorComponent } from "../components/floor-component";

export function buildComponents(game:Game){
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
    game.registerComponent(GravityComponent);
    game.registerComponent(FloorComponent);
}