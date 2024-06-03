define(["require", "exports", "../../engine/component/component", "./place-item-request"], function (require, exports, component_1, place_item_request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlaceItemComponent = void 0;
    class PlaceItemComponent extends component_1.Component {
        constructor() {
            super("placeItem");
            this.placeItemRequests = [];
        }
        placeItem(entityName, coordinates = [0, 0], successCallback, relative = true) {
            let placeItemRequest;
            placeItemRequest = new place_item_request_1.PlaceItemRequest(entityName, coordinates, 1, successCallback, relative = true);
            this.placeItemRequests.push(placeItemRequest);
        }
        update(entity) {
        }
        static create() {
            return new PlaceItemComponent();
        }
    }
    exports.PlaceItemComponent = PlaceItemComponent;
});
//# sourceMappingURL=place-item-component.js.map