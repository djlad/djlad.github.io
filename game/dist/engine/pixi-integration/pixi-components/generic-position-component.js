define(["require", "exports", "../../component/component", "../../events/EventType"], function (require, exports, component_1, EventType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericPositionComponent = void 0;
    class GenericPositionComponent extends component_1.Component {
        constructor(game, entityId) {
            super("position");
            this.speedMultiplier = 50;
            this._vx = 0;
            this._vy = 0;
            this._rotate = 0;
            this._x = 0;
            this._y = 0;
            this.h = 0;
            this._width = 100;
            this._height = 100;
            this.flip = false;
            this._faceRight = true;
            this.faceX = 0;
            this.faceY = 0;
            this.moved = false;
            this.applyOffsets = true;
            this.engineSprite = game.engineCreator.createEngineSprite(entityId.toString());
            this.engineSprite.setSprite("greyWalk");
            this.engineSprite.width = this.width;
            this.engineSprite.height = this.height;
            game.checkDependency(game.eventManager);
            this.events = game.eventManager;
            this.entityId = entityId;
        }
        get vx() {
            return this._vx;
        }
        set vx(vx) {
            this.engineSprite.faceRight = this.faceRight;
            this.engineSprite.vx = vx * this.speedMultiplier;
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
            this.engineSprite.vy = vy;
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
            this.engineSprite.rotate = radiansToRotate;
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        set x(newX) {
            this._x = newX;
            this.events.emit(EventType_1.EventType.entityMoved, {
                entityId: this.entityId,
                x: this._x,
                y: this._y
            });
        }
        set y(newY) {
            this._y = newY;
            this.events.emit(EventType_1.EventType.entityMoved, {
                entityId: this.entityId,
                x: this._x,
                y: this._y
            });
        }
        get width() {
            return this.engineSprite.width;
        }
        set width(w) {
            this._width = w;
            this.engineSprite.width = w;
        }
        get height() {
            return this.engineSprite.height;
        }
        set height(h) {
            this.engineSprite.height = h;
            this._height = h;
        }
        get faceRight() {
            return this._faceRight;
        }
        set faceRight(value) {
            this._faceRight = value;
            this.engineSprite.faceRight = value;
        }
        get pivotX() {
            return this.engineSprite.pivotX;
        }
        get pivotY() {
            return this.engineSprite.pivotY;
        }
        get anchorX() {
            return this.engineSprite.anchorX;
        }
        get anchorY() {
            return this.engineSprite.anchorY;
        }
        set pivotX(value) {
            this.engineSprite.pivotX = value;
        }
        set pivotY(value) {
            this.engineSprite.pivotY = value;
        }
        set anchorX(value) {
            this.engineSprite.anchorX = value;
        }
        set anchorY(value) {
            this.engineSprite.anchorY = value;
        }
        update(entity, args) {
            const delta = args.delta;
            this.x += this.vx * delta;
            this.y += this.vy * delta;
            this.moved = !(this.vx == 0 && this.vy == 0);
        }
        static create(game, entityId) {
            return new GenericPositionComponent(game, entityId);
        }
    }
    exports.GenericPositionComponent = GenericPositionComponent;
    GenericPositionComponent.componentName = "position";
});
//# sourceMappingURL=generic-position-component.js.map