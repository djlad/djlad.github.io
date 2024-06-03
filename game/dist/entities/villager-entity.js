define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VillagerEntity = void 0;
    class VillagerEntity {
        create(gameDependcies, entity) {
            var animation = entity.addComponent("animation");
            var position = entity.addComponent("position");
            var fight = entity.addComponent("fight");
            var health = entity.addComponent("health");
            var neural = entity.addComponent("neural");
            const weapon = entity.addComponent("weapon");
            weapon.setWielder(entity);
            weapon.sheatheBack();
            position.width = 32;
            position.height = 48;
            let multi = 2.4;
            position.width *= multi;
            position.height *= multi;
            return entity;
        }
    }
    exports.VillagerEntity = VillagerEntity;
});
//# sourceMappingURL=villager-entity.js.map