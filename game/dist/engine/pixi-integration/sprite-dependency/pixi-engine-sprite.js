define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PixieEngineSprite = void 0;
    class PixieEngineSprite {
        constructor(gameDependencies) {
            this._rotate = 0;
            gameDependencies.checkDependency(gameDependencies.pixiGame);
            this.pixieGame = gameDependencies.pixiGame;
            this.sprite = this.pixieGame.getSpriteAnimation("greyWalk");
            this.pivotX = .5;
            this.pivotY = 1;
            this.anchorX = .5;
            this.anchorY = 1;
        }
        get rotate() {
            return this._rotate;
        }
        set rotate(newRotate) {
            this._rotate = newRotate;
            this.sprite.rotation = newRotate;
        }
        get width() {
            return this.sprite.width;
        }
        get height() {
            return this.sprite.height;
        }
        get faceRight() {
            return this._faceRight;
        }
        get x() {
            return this.sprite.x;
        }
        get y() {
            return this.sprite.y;
        }
        get vx() {
            return this._vx;
        }
        get vy() {
            return this._vy;
        }
        set width(value) {
            this.sprite.width = value;
        }
        set height(value) {
            this.sprite.height = value;
        }
        set faceRight(value) {
            if (value != this._faceRight) {
                if (value) {
                    this.sprite.scale.x = Math.abs(this.sprite.scale.x);
                }
                else {
                    this.sprite.scale.x = Math.abs(this.sprite.scale.x) * -1;
                }
            }
            this._faceRight = value;
        }
        set x(value) {
            this.sprite.x = value;
        }
        set y(value) {
            this.sprite.y = value;
            this.sprite.zIndex = value;
        }
        set vx(value) {
            this._vx = value;
        }
        set vy(value) {
            this._vy = value;
        }
        get pivotX() {
            return this.sprite.pivot.x;
        }
        get pivotY() {
            return this.sprite.pivot.y;
        }
        get anchorX() {
            return this.sprite.anchor.x;
        }
        get anchorY() {
            return this.sprite.anchor.y;
        }
        set pivotX(value) {
            this.sprite.anchor.x = value;
        }
        set pivotY(value) {
            this.sprite.pivot.y = value;
        }
        set anchorX(value) {
            this.sprite.pivot.x = value;
        }
        set anchorY(value) {
            this.sprite.anchor.y = value;
        }
        setSprite(animationName) {
            const newSprite = this.pixieGame.getSpriteAnimation(animationName);
            newSprite.x = this.sprite.x;
            newSprite.y = this.sprite.y;
            newSprite.width = this.sprite.width;
            newSprite.height = this.sprite.height;
            newSprite.scale.x = this.sprite.scale.x;
            newSprite.pivot.x = this.pivotX;
            newSprite.pivot.y = this.pivotY;
            newSprite.anchor.x = this.anchorX;
            newSprite.anchor.y = this.anchorY;
            this.pixieGame.container.removeChild(this.sprite);
            this.sprite = newSprite;
        }
        static create(gameDependencies) {
            return new PixieEngineSprite(gameDependencies);
        }
    }
    exports.PixieEngineSprite = PixieEngineSprite;
});
//# sourceMappingURL=pixi-engine-sprite.js.map