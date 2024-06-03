define(["require", "exports", "../components/tile-component/sprite-id", "../engine/events/EventType", "../engine/system/system"], function (require, exports, sprite_id_1, EventType_1, system_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapBuilderSystem = void 0;
    class MapBuilderSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
            this.clicks = [];
            this.openBuilder = false;
            this.tilePallete = [];
            this.selectedSpriteId = sprite_id_1.SpriteId.create("soil", 0);
            this.game.eventManager.addListener(EventType_1.EventType.mouseUp, (data) => {
                if (!this.openBuilder)
                    return;
                this.clicks.push(data);
            });
            this.game.eventManager.addListener(EventType_1.EventType.tildUp, (data) => {
                this.openBuilder = !this.openBuilder;
                this.createPalleteEntities();
            });
        }
        shouldApply(entity) {
            return entity.getComponent("tile") != null;
        }
        apply(args) {
            const entity = args.entity;
            let tileComponent = entity.getComponent("tile", true);
            if (!this.openBuilder)
                return;
            if (this.clicks.length == 0)
                return;
            let event = this.clicks.pop();
            let x = event.eventData.x;
            let y = event.eventData.y;
            let tileToChange = this.mouseCoordToTile(x, y, tileComponent);
            const tileCopy = JSON.parse(JSON.stringify(this.selectedSpriteId));
            tileToChange.spriteIds.push(tileCopy);
        }
        createPalleteEntities() {
            let entity = this.game.getById(0);
            let tileComponent = entity.getComponent("tile", true);
            let tileWidth = tileComponent.tileWidth / 1.5;
            const panel = this.game.addEntity('uipanel');
            const panelPosition = panel.getComponent("position");
            panelPosition.width = tileWidth * 6;
            panelPosition.height = tileWidth * 11;
            panelPosition.x = panelPosition.width / 2;
            panelPosition.y = -panelPosition.height;
            panelPosition.h = 2 * panelPosition.height;
            for (let i = 0; i < tileComponent.tileSpriteNames.length - 0; i++) {
                for (let i2 = 0; i2 < 25; i2++) {
                    let spriteName = tileComponent.tileSpriteNames[i];
                    let tileButton = this.game.addEntity("click");
                    this.tilePallete.push(tileButton);
                    let animation = tileButton.getComponent("animation");
                    let position = tileButton.getComponent("position");
                    let clickable = tileButton.getComponent("click");
                    animation.setSpriteNumber(spriteName, i2);
                    position.width = tileWidth;
                    position.height = tileWidth;
                    position.x = ((i2 % 5) * tileWidth) + tileWidth / 2;
                    position.y = Math.floor(((i * 24) + i2) / 5) * tileWidth;
                    position.x += panelPosition.width / 2 - 5 * tileWidth / 2;
                    position.y += panelPosition.height / 2 - 5 * tileWidth / 2 - tileWidth;
                    position.applyOffsets = false;
                    clickable.addListener(() => {
                        console.log("clicking: " + spriteName + i2.toString());
                        this.selectedSpriteId.spriteName = spriteName;
                        this.selectedSpriteId.spriteNumber = i2;
                    });
                }
            }
        }
        mouseCoordToTile(x, y, tileComponent) {
            let xOffset = this.game.renderer.offset[0];
            let yOffset = this.game.renderer.offset[1];
            return tileComponent.coordToTile(x + xOffset, y + yOffset)[0];
        }
        applyEvents(entity, eventManager) {
        }
        static create(game) {
            return new MapBuilderSystem(game);
        }
    }
    exports.MapBuilderSystem = MapBuilderSystem;
});
//# sourceMappingURL=map-builder-system.js.map