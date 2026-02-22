define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryItemEntity = void 0;
    class InventoryItemEntity {
        create(gameDependencies, entity) {
            entity.addComponent("position");
            entity.addComponent("animation");
            let text = entity.addComponent("text");
            text.addTextPlacement("", 0, 0);
            return entity;
        }
    }
    exports.InventoryItemEntity = InventoryItemEntity;
});
//# sourceMappingURL=inventory-item-entity.js.map