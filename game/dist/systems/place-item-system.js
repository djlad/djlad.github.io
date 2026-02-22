define(["require", "exports", "../engine/system/system"], function (require, exports, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlaceItemSystem = void 0;
    class PlaceItemSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
            this.tileSize = 50;
        }
        shouldApply(entity) {
            return entity.getComponent("placeItem") != null;
        }
        apply(args) {
            const entity = args.entity;
            let placeItem = entity.getComponent("placeItem");
            let requests = placeItem.placeItemRequests;
            for (let i = 0; i < requests.length; i++) {
                let placeItemRequest = requests[i];
                if (placeItemRequest.relative) {
                    let position;
                    try {
                        position = entity.getComponent("position");
                        placeItemRequest.coordinates[0] += position.x;
                        placeItemRequest.coordinates[1] += position.y;
                    }
                    catch (_a) { }
                }
                this.placeItem(placeItemRequest);
            }
            placeItem.placeItemRequests = [];
        }
        applyEvents() {
        }
        realCoordinatesToTileCoordinates(coordinates) {
            let tileCoords = coordinates.map((coordinate) => {
                return (Math.floor(coordinate / this.tileSize)) * this.tileSize;
            });
            return tileCoords;
        }
        placeItem(placeItemRequest) {
            let realCoordinates = placeItemRequest.coordinates;
            let tileCoordinates = this.realCoordinatesToTileCoordinates(realCoordinates);
            let x = tileCoordinates[0];
            let y = tileCoordinates[1];
            let newEntity;
            newEntity = this.game.addEntity(placeItemRequest.entityName);
            let position = newEntity.getComponent("position", true);
            if (position == null) {
                return;
            }
            position.x = x;
            position.y = y;
            placeItemRequest.successCallback(newEntity);
            return newEntity;
        }
        static create(game) {
            return new PlaceItemSystem(game);
        }
    }
    exports.PlaceItemSystem = PlaceItemSystem;
});
//# sourceMappingURL=place-item-system.js.map