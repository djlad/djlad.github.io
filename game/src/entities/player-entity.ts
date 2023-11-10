import { Entity } from '../engine/entity/entity';
import { PositionComponent } from '../engine/component/components/position/position-component';
import { WasdComponent } from '../components/wasd-component';
import { InventoryComponent } from '../components/inventory-component/inventory-component';
import { PlaceItemComponent } from '../components/place-item/place-item-component';
import { CropHarvesterComponent } from '../components/crop-harvester-component';
import { ParticleComponent } from '../components/particle-componet';
import { AnimationComponent } from '../engine/component/components/animation/animation-component';
import { GameDependencies } from '../engine/dependencies/game-dependencies';
import { EntityRegistration } from '../engine/entity/entity-registration';
import { GenericPositionComponent } from '../engine/pixi-integration/pixi-components/generic-position-component';
import { WeaponComponent } from '../components/weapon-component/weapon-component';

export class PlayerEntity implements EntityRegistration{
    create(gameDependencies: GameDependencies, entity: Entity): Entity {
        var animation:AnimationComponent = <AnimationComponent>entity.addComponent("animation");
        var position = <GenericPositionComponent>entity.addComponent("position");
        var wasd:WasdComponent = <WasdComponent>entity.addComponent("wasd");
        var inventory:InventoryComponent = <InventoryComponent>entity.addComponent("inventory");
        let placeItem:PlaceItemComponent = <PlaceItemComponent>entity.addComponent("placeItem");
        let cropHarvester:CropHarvesterComponent;
        cropHarvester = <CropHarvesterComponent>entity.addComponent("cropHarvester");
        let particles = <ParticleComponent>entity.addComponent("particles");
        particles.targetParticles = 0;
        entity.addComponent("transition");
        const weapon = <WeaponComponent>entity.addComponent("weapon");
        weapon.setWielder(entity);

        entity.addComponent("dash");
        
        var sprite:string = "grey";
        // var sprite:string = "greythrow";
        var walkSprite:string = "greyWalk";
        // var sprite:string = "greg";
        // var walkSprite:string = "gregwalk";
        // var sprite:string = "blond";
        // var walkSprite:string = "blondWalk";
        // var sprite:string = "dwarfopeneyes";
        // var walkSprite:string = "dwarfopeneyesWalk";
        // var sprite:string = "speargoblin";
        // var walkSprite:string = "speargoblinWalk";
        
        animation.setSprite(sprite)
        wasd.sprite = sprite;
        wasd.walkSprite = walkSprite;
        position.width = 32;
        position.height = 48;
        let multi = 2.4
        position.width *= multi
        position.height *= multi
        return entity;
    }
}