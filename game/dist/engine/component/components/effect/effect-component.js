define(["require", "exports", "../../component"], function (require, exports, component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EffectComponent = void 0;
    class EffectComponent extends component_1.Component {
        constructor() {
            super(...arguments);
            this.targets = [];
        }
        addTarget(targetEntity) {
            let position = targetEntity.getComponent("position", true);
            if (position == null)
                throw "Effect Component target needs a position component";
            this.targets.push(targetEntity);
        }
        update(entity) {
        }
    }
    exports.EffectComponent = EffectComponent;
    var EffectType;
    (function (EffectType) {
        EffectType[EffectType["line"] = 0] = "line";
    })(EffectType || (EffectType = {}));
});
//# sourceMappingURL=effect-component.js.map