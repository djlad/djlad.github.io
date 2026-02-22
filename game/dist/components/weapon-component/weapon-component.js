define(["require", "exports", "../../engine/component/component", "./swipe", "./wield-state", "./swipedata"], function (require, exports, component_1, swipe_1, wield_state_1, swipedata_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WeaponComponent = void 0;
    class WeaponComponent extends component_1.Component {
        constructor(gameDependencies) {
            super("weapon");
            this.wielder = null;
            this.weaponEntity = null;
            this.weaponPosition = null;
            this.swipe = new swipe_1.Swipe(0, 0, 0, 0);
            this.swipes = [];
            this.swipei = -1;
            this.weaponOffsetX = 0;
            this.weaponOffsetY = -.5;
            this.weaponFaceRight = true;
            this.wobble = 0;
            this.rotationSpeed = .1;
            this.weaponState = wield_state_1.WieldState.backSheathe;
            this.attacks = [swipedata_1.slashUp, swipedata_1.slashDown];
            this.attacki = 0;
            this.game = gameDependencies.game;
        }
        attack() {
            const current = this.swipe;
            let slashes = (0, swipedata_1.slashPos)(current);
            slashes = this.attacks[this.attacki](current);
            this.attacki = (this.attacki + 1) % this.attacks.length;
            this.setSwipes(slashes);
        }
        setWielder(wielder) {
            this.wielder = wielder;
            this.weaponEntity = this.game.addEntity("weapon");
            this.weaponPosition = this.weaponEntity.getComponent("position");
        }
        setSwipe(swipe) {
            this.swipe = swipe;
            this.weaponPosition.rotate = swipe.rotate;
        }
        setSwipes(swipes) {
            if (!this.weaponFaceRight)
                swipes.forEach(e => e.flip());
            this.swipes = swipes;
            this.swipei = 0;
        }
        holdWeapon() {
            this.weaponState = wield_state_1.WieldState.hold;
            const position = this.wielder.getComponent("position");
            const newPos = (0, swipedata_1.holdWeaponPos)();
            const newPos2 = new swipe_1.Swipe(0, 0, 0, 0);
            this.setSwipes([newPos]);
        }
        sheatheWeapon() {
            const newPos = new swipe_1.Swipe(5, .5, -.5, 0);
        }
        sheatheBack() {
            const newPos = (0, swipedata_1.sheahteBackPos)();
            const position = this.wielder.getComponent("position");
            this.setSwipes([newPos]);
            this.weaponState = wield_state_1.WieldState.backSheathe;
        }
        flip(faceRight) {
            if (faceRight === this.weaponFaceRight)
                return;
            this.weaponFaceRight = faceRight;
            this.swipes.forEach(swipe => swipe.flip());
            this.swipe.flip();
            this.weaponPosition.rotate = this.swipe.rotate;
        }
        spin() {
            const newPos = new swipe_1.Swipe(5, 0, -.5, this.weaponPosition.faceRight ? .1 : -.1);
            this.setSwipe(newPos);
        }
        zeroOut() {
            this.weaponOffsetX = 0;
            this.weaponOffsetY = 0;
            this.weaponPosition.rotate = 0;
            this.rotationSpeed = .0;
        }
        update(entity, args) {
            if (this.weaponEntity == null)
                console.warn("weapon component needs to call setWielder first");
            const wielderPosition = entity.getComponent("position");
            this.flip(wielderPosition.faceRight);
            const { offsetX, offsetY, rotate, rotateSpeed } = this.swipe;
            this.weaponPosition.x = wielderPosition.x + offsetX * wielderPosition.width;
            this.weaponPosition.y = wielderPosition.y + offsetY * wielderPosition.height;
            this.weaponPosition.rotate = rotate;
            this.swipeTowards();
        }
        rotateDistance(curRotate, targetRotate, longWay = false) {
            const d1 = Math.abs(targetRotate - curRotate);
            const up = targetRotate >= curRotate;
            let d2 = 2 * Math.PI - d1;
            const check = longWay ? d2 > d1 : d2 < d1;
            if (check) {
                if (up)
                    return -Math.abs(d2);
                return d2;
            }
            return d1 * (up ? 1 : -1);
        }
        swipeTowards() {
            if (this.swipei === -1)
                return;
            const target = this.swipes[this.swipei];
            const { speed } = target;
            const dx = target.offsetX - this.swipe.offsetX;
            const dy = target.offsetY - this.swipe.offsetY;
            const dr = this.rotateDistance(this.swipe.rotate, target.rotate, target.longWay);
            const h = Math.sqrt(dx * dx + dy * dy);
            const movey = dy / h * speed;
            const movex = dx / h * speed;
            const time = h / speed;
            let mr = dr / time;
            if (target.swipeToSpeed !== 0)
                mr = target.swipeToSpeed;
            this.swipe.rotateSpeed = mr;
            if (Math.abs(dx) >= Math.abs(movex)) {
                this.swipe.offsetX += movex;
            }
            else {
                this.swipe.offsetX = target.offsetX;
            }
            if (Math.abs(dy) >= Math.abs(movey)) {
                this.swipe.offsetY += movey;
            }
            else {
                this.swipe.offsetY = target.offsetY;
            }
            if (Math.abs(dr) >= Math.abs(this.swipe.rotateSpeed)) {
                this.swipe.rotate += this.swipe.rotateSpeed;
            }
            else {
                this.swipe.rotate = target.rotate;
                this.swipe.rotateSpeed = 0;
            }
            if (h === 0 && dr === 0) {
                this.swipei++;
                if (this.swipei >= this.swipes.length) {
                    this.swipei = -1;
                }
            }
        }
        flipRotate(rotate) {
            return Math.PI * .5 - rotate;
        }
        static create(gameDependencies) {
            return new WeaponComponent(gameDependencies);
        }
    }
    exports.WeaponComponent = WeaponComponent;
});
//# sourceMappingURL=weapon-component.js.map