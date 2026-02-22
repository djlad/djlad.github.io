define(["require", "exports", "../engine/events/EventType", "../engine/system/system", "../entities/first-entity"], function (require, exports, EventType_1, system_1, first_entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickSystem = void 0;
    class ClickSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
            this.clicks = [];
            this.clicksToProcessThisLoop = [];
            this.game.eventManager.addListener(EventType_1.EventType.mouseUp, (data) => {
                this.clicks.push(data);
            });
            this.renderer = game.renderer;
        }
        clearClicksAndMoveClicksToProcess() {
            for (let i = 0; i < this.clicksToProcessThisLoop.length; i++) {
                this.clicksToProcessThisLoop.pop();
            }
            let numClicks = this.clicks.length;
            for (let i = 0; i < numClicks; i++) {
                this.clicksToProcessThisLoop.push(this.clicks.pop());
            }
        }
        shouldApply(entity) {
            return entity.getComponent("click", true) != null && entity.getComponent("position", true) != null;
        }
        apply(args) {
            console.log('click system');
            const entity = args.entity;
            if (entity instanceof first_entity_1.FirstEntity)
                this.clearClicksAndMoveClicksToProcess();
            let clickable = entity.getComponent("click", true);
            let position = entity.getComponent("position", true);
            this.clicksToProcessThisLoop.forEach((event) => {
                let x = event === null || event === void 0 ? void 0 : event.eventData.x;
                let y = event === null || event === void 0 ? void 0 : event.eventData.y;
                if (x == null || y == null)
                    return;
                if (this.pointInPosition(x, y, position)) {
                    clickable.click();
                }
            });
        }
        applyEvents(entity, eventManager) {
        }
        pointInPosition(x, y, position) {
            if (position.applyOffsets) {
                let offset = this.renderer.getOffset();
                x += offset[0];
                y += offset[1];
            }
            let leftx = position.x - position.width / 2;
            let rightx = position.x + position.width / 2;
            let topy = position.y - position.height;
            let bottomy = position.y;
            return x > leftx && x < rightx && y > topy && y < bottomy;
        }
        static create(game) {
            return new ClickSystem(game);
        }
    }
    exports.ClickSystem = ClickSystem;
});
//# sourceMappingURL=click-system.js.map