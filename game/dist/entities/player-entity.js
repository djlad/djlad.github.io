define(["require", "exports", "../engine/pixi-integration/pixi-components/generic-position-component"], function (require, exports, generic_position_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerEntity = void 0;
    class PlayerEntity {
        create(gameDependencies, entity) {
            var animation = entity.addComponent("animation");
            var position = entity.addComponent("position");
            position = entity.getComponentT(generic_position_component_1.GenericPositionComponent);
            var wasd = entity.addComponent("wasd");
            var inventory = entity.addComponent("inventory");
            let placeItem = entity.addComponent("placeItem");
            let cropHarvester;
            cropHarvester = entity.addComponent("cropHarvester");
            let particles = entity.addComponent("particles");
            particles.targetParticles = 0;
            entity.addComponent("transition");
            const weapon = entity.addComponent("weapon");
            weapon.setWielder(entity);
            entity.addComponent("dash");
            var sprite = "grey";
            var walkSprite = "greyWalk";
            animation.setSprite(sprite);
            wasd.sprite = sprite;
            wasd.walkSprite = walkSprite;
            position.width = 32;
            position.height = 48;
            let multi = 2.4;
            position.width *= multi;
            position.height *= multi;
            return entity;
        }
    }
    exports.PlayerEntity = PlayerEntity;
});
//# sourceMappingURL=player-entity.js.map