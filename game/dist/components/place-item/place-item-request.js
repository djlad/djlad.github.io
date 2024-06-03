define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlaceItemRequest = void 0;
    class PlaceItemRequest {
        constructor(entityName, coordinates, quantity = 1, successCallback, relative = true) {
            this.entityName = entityName;
            this.coordinates = coordinates;
            this.quantity = quantity;
            this.successCallback = successCallback;
            this.relative = relative;
        }
    }
    exports.PlaceItemRequest = PlaceItemRequest;
});
//# sourceMappingURL=place-item-request.js.map