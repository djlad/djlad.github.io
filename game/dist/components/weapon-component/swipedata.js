define(["require", "exports", "./swipe"], function (require, exports, swipe_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.slashDown = exports.slashUp = exports.slashPos = exports.sheahteBackPos = exports.holdWeaponPos = void 0;
    const sheatheSpeed = .1;
    const sheatheRotateSpeed = sheatheSpeed * 3;
    const attackSpeed = .2;
    const holdWeaponPos = () => new swipe_1.Swipe(2, .1, -.45, 0, sheatheSpeed, false, sheatheRotateSpeed);
    exports.holdWeaponPos = holdWeaponPos;
    const sheahteBackPos = () => new swipe_1.Swipe(3.2, -.6, -.75, 0, sheatheSpeed, false, -sheatheRotateSpeed);
    exports.sheahteBackPos = sheahteBackPos;
    const slashPos = (current) => [
        new swipe_1.Swipe(0, current.offsetX, current.offsetY, .1, .1, false, -.2),
        new swipe_1.Swipe(Math.PI, current.offsetX, current.offsetY, .1, .1, false, .2),
    ];
    exports.slashPos = slashPos;
    const slashUp = (current) => [new swipe_1.Swipe(Math.PI * .25, current.offsetX, current.offsetY, .1, .1, false, -attackSpeed)];
    exports.slashUp = slashUp;
    const slashDown = (current) => [new swipe_1.Swipe(Math.PI * 1, current.offsetX, current.offsetY, .1, .1, false, attackSpeed),];
    exports.slashDown = slashDown;
});
//# sourceMappingURL=swipedata.js.map