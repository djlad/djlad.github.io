define(["require", "exports", "../engine/system/system", "../engine/events/EventType", "../components/weapon-component/wield-state"], function (require, exports, system_1, EventType_1, wield_state_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WasdSystem = void 0;
    class WasdSystem extends system_1.EntitySystem {
        constructor(game) {
            super(game);
            this.move = false;
            this.stop = false;
            this.touchStart = { x: 0, y: 0 };
            game.eventManager.addListener(EventType_1.EventType.touchStart, (e) => {
                this.move = true;
                this.touchStart.x = e.eventData.x;
                this.touchStart.y = e.eventData.y;
            });
            game.eventManager.addListener(EventType_1.EventType.touchEnd, () => {
                this.move = false;
                this.stop = true;
            });
        }
        static create(game) {
            var wasd = new WasdSystem(game);
            return wasd;
        }
        shouldApply(entity) {
            return entity.getComponent("wasd", true) != null && entity.getComponent("position", true) != null;
        }
        apply(args) {
            const entity = args.entity;
            const position = entity.getComponent("position");
            const wasd = entity.getComponent("wasd");
            if (this.move) {
                if (this.touchStart.x > window.innerWidth / 2)
                    position.vx = 10;
                else
                    position.vx = -10;
                if (this.touchStart.y > window.innerHeight / 2)
                    position.vy = 10;
                else
                    position.vy = -10;
            }
            if (this.stop) {
                position.vx = 0;
                position.vy = 0;
                this.stop = false;
            }
        }
        applyEvents(entity, eventManager) {
            var events = eventManager.events;
            var event;
            var wasdComponent = entity.getComponent("wasd", true);
            if (wasdComponent == null)
                return;
            var position = entity.getComponent("position");
            var animation = entity.getComponent("animation");
            var transition = entity.getComponent("transition");
            const dash = entity.getComponent("dash");
            const dashing = dash.dashing;
            var speed = wasdComponent.speed;
            var sprite = wasdComponent.sprite;
            var walkSprite = wasdComponent.walkSprite;
            if (events.length > 0) {
            }
            for (var i = 0; i < events.length; i++) {
                event = events[i];
                switch (event.eventName) {
                    case EventType_1.EventType.wDown:
                        if (dashing)
                            break;
                        animation.setSprite(walkSprite);
                        position.vy = -speed;
                        break;
                    case EventType_1.EventType.wUp:
                        if (dashing)
                            break;
                        animation.setSprite(sprite);
                        position.vy = 0;
                        break;
                    case EventType_1.EventType.aDown:
                        if (dashing)
                            break;
                        position.faceRight = false;
                        animation.setSprite(walkSprite);
                        position.vx = -speed;
                        break;
                    case EventType_1.EventType.aUp:
                        if (dashing)
                            break;
                        animation.setSprite(sprite);
                        position.vx = 0;
                        break;
                    case EventType_1.EventType.sDown:
                        if (dashing)
                            break;
                        animation.setSprite(walkSprite);
                        position.vy = speed;
                        break;
                    case EventType_1.EventType.sUp:
                        if (dashing)
                            break;
                        animation.setSprite(sprite);
                        position.vy = 0;
                        break;
                    case EventType_1.EventType.dDown:
                        if (dashing)
                            break;
                        position.faceRight = true;
                        animation.setSprite(walkSprite);
                        position.vx = speed;
                        break;
                    case EventType_1.EventType.dUp:
                        if (dashing)
                            break;
                        animation.setSprite(sprite);
                        position.vx = 0;
                        break;
                    case EventType_1.EventType.spaceUp:
                        if (dashing)
                            break;
                        dash.startDashing();
                        break;
                    case EventType_1.EventType.fUp:
                        let cropHarvester;
                        cropHarvester = entity.getComponent("cropHarvester", true);
                        cropHarvester.startHarvest();
                        break;
                    case EventType_1.EventType.pUp:
                        console.log(this.game);
                        const weapon = entity.getComponent("weapon");
                        if (weapon.swipe.rotateSpeed == 0) {
                            weapon.spin();
                        }
                        else {
                            weapon.sheatheBack();
                        }
                        break;
                    case EventType_1.EventType.iUp:
                        let inventory;
                        inventory = entity.getComponent("inventory", true);
                        inventory.inventoryToString();
                        break;
                    case EventType_1.EventType.jUp:
                        const weapon2 = entity.getComponent("weapon");
                        if (weapon2.weaponState === wield_state_1.WieldState.hold) {
                            weapon2.attack();
                        }
                        break;
                    case EventType_1.EventType.kUp:
                        const weapon1 = entity.getComponent("weapon");
                        if (weapon1.weaponState === wield_state_1.WieldState.backSheathe) {
                            weapon1.holdWeapon();
                        }
                        else if (weapon1.weaponState === wield_state_1.WieldState.hold) {
                            weapon1.sheatheBack();
                        }
                        break;
                }
            }
        }
    }
    exports.WasdSystem = WasdSystem;
});
//# sourceMappingURL=wasd-system.js.map