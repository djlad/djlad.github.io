define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WieldState = void 0;
    var WieldState;
    (function (WieldState) {
        WieldState[WieldState["backSheathe"] = 0] = "backSheathe";
        WieldState[WieldState["hold"] = 1] = "hold";
        WieldState[WieldState["swipe"] = 2] = "swipe";
    })(WieldState || (exports.WieldState = WieldState = {}));
});
//# sourceMappingURL=wield-state.js.map