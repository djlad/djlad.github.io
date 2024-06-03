define(["require", "exports", "../../engine/component/component", "./text-placement"], function (require, exports, component_1, text_placement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextComponent = void 0;
    class TextComponent extends component_1.Component {
        constructor() {
            super("text");
            this.textPlacements = [];
        }
        addTextPlacement(text, offsetX = 0, offsetY = 0) {
            this.textPlacements.push(new text_placement_1.TextPlacement(text, offsetX, offsetY));
        }
        setText(value, index = 0) {
            if (index >= 0 && index < this.textPlacements.length) {
                this.textPlacements[index].textValue = value;
            }
        }
        update() { }
        static create() {
            return new TextComponent();
        }
    }
    exports.TextComponent = TextComponent;
});
//# sourceMappingURL=text-component.js.map