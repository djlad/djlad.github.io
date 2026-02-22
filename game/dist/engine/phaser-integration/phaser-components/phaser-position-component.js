define(["require", "exports", "../../component/component", "../phaser-game"], function (require, exports, component_1, phaser_game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserPositionComponent = void 0;
    class PhaserPositionComponent extends component_1.Component {
        constructor(phaser) {
            super("position");
            this.speedMultiplier = 50;
            this._vx = 0;
            this._vy = 0;
            this._rotate = 0;
            this.x = 0;
            this.y = 0;
            this.h = 0;
            this.width = 100;
            this.height = 100;
            this.faceRight = true;
            this.faceX = 0;
            this.faceY = 0;
            this.moved = false;
            this.applyOffsets = true;
            this.pivotX = .5;
            this.pivotY = 1;
            this.anchorX = .5;
            this.anchorY = 1;
            this.phaserGame = phaser;
            this.phaserGame.mainScene.addCreator((scene) => {
                this.phaserObject = scene.physics.add.sprite(this.x, this.y, "victorian", 72);
                this.phaserObject.displayWidth = this.width;
                this.phaserObject.displayHeight = this.height;
            });
        }
        get vx() {
            return this._vx;
        }
        set vx(vx) {
            var _a, _b;
            if (((_b = (_a = this.phaserObject) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.velocity) != null && this.phaserObject.body.velocity.x != vx) {
                this.phaserObject.setFlipX(!this.faceRight);
                this.phaserObject.setVelocityX(vx * this.speedMultiplier);
            }
            this._vx = vx;
            if (vx == 0) {
                if (this.faceY !== 0) {
                    this.faceX = vx;
                }
            }
            else {
                this.faceX = vx;
                if (this.faceY !== 0 && this.vy == 0) {
                    this.faceY = 0;
                }
            }
        }
        get vy() {
            return this._vy;
        }
        set vy(vy) {
            var _a, _b;
            if (((_b = (_a = this.phaserObject) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.velocity) != null && this.phaserObject.body.velocity.y != vy) {
                this.phaserObject.setVelocityY(vy * this.speedMultiplier);
            }
            this._vy = vy;
            if (vy == 0) {
                if (this.faceX !== 0) {
                    this.faceY = vy;
                }
            }
            else {
                this.faceY = vy;
                if (this.faceX !== 0 && this.vx == 0) {
                    this.faceX = 0;
                }
            }
        }
        get rotate() {
            return this._rotate;
        }
        set rotate(radiansToRotate) {
            this._rotate = radiansToRotate % (2 * Math.PI);
        }
        update(entity, args) {
            const delta = args.delta;
            this.x += this.vx * delta;
            this.y += this.vy * delta;
            this.moved = !(this.vx == 0 && this.vy == 0);
        }
        static create() {
            return new PhaserPositionComponent(phaser_game_1.PhaserGame.createSingleton());
        }
    }
    exports.PhaserPositionComponent = PhaserPositionComponent;
});
//# sourceMappingURL=phaser-position-component.js.map