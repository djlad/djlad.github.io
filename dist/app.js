var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("engine/component/component-factory", ["engine/component/component"], function (exports_1, context_1) {
    "use strict";
    var component_1, ComponentFactory;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            ComponentFactory = (function () {
                function ComponentFactory() {
                    this.componentTypes = {};
                }
                ComponentFactory.prototype.registerComponent = function (ComponentClass) {
                    var obj = ComponentClass.create();
                    if (ComponentClass.prototype instanceof component_1.Component) {
                        this.componentTypes[obj.componentName] = ComponentClass;
                    }
                    else {
                        console.log("component " + obj.componentName + " must extend class Component to be registered");
                    }
                };
                ComponentFactory.prototype.createComponent = function (componentName) {
                    if (!(componentName in this.componentTypes)) {
                        throw "component " + componentName + " not registered in componentFactory";
                    }
                    return this.componentTypes[componentName].create();
                };
                ComponentFactory.create = function () {
                    var cf = new ComponentFactory();
                    return cf;
                };
                return ComponentFactory;
            }());
            exports_1("ComponentFactory", ComponentFactory);
        }
    };
});
System.register("engine/events/EventType", [], function (exports_2, context_2) {
    "use strict";
    var EventType;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            (function (EventType) {
                EventType[EventType["wDown"] = 0] = "wDown";
                EventType[EventType["aDown"] = 1] = "aDown";
                EventType[EventType["sDown"] = 2] = "sDown";
                EventType[EventType["dDown"] = 3] = "dDown";
                EventType[EventType["wUp"] = 4] = "wUp";
                EventType[EventType["aUp"] = 5] = "aUp";
                EventType[EventType["sUp"] = 6] = "sUp";
                EventType[EventType["dUp"] = 7] = "dUp";
                EventType[EventType["spaceDown"] = 8] = "spaceDown";
                EventType[EventType["spaceUp"] = 9] = "spaceUp";
                EventType[EventType["iUp"] = 10] = "iUp";
                EventType[EventType["iDown"] = 11] = "iDown";
                EventType[EventType["pDown"] = 12] = "pDown";
                EventType[EventType["pUp"] = 13] = "pUp";
                EventType[EventType["fDown"] = 14] = "fDown";
                EventType[EventType["fUp"] = 15] = "fUp";
                EventType[EventType["collision"] = 16] = "collision";
                EventType[EventType["fireProjectile"] = 17] = "fireProjectile";
                EventType[EventType["inflictDamage"] = 18] = "inflictDamage";
                EventType[EventType["changeVelocity"] = 19] = "changeVelocity";
                EventType[EventType["giveItem"] = 20] = "giveItem";
            })(EventType || (EventType = {}));
            exports_2("EventType", EventType);
        }
    };
});
System.register("engine/events/game-event", ["engine/events/EventType"], function (exports_3, context_3) {
    "use strict";
    var EventType_1, GameEvent;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (EventType_1_1) {
                EventType_1 = EventType_1_1;
            }
        ],
        execute: function () {
            GameEvent = (function () {
                function GameEvent(eventName, eventData, componentTarget) {
                    if (componentTarget === void 0) { componentTarget = null; }
                    this.eventName = eventName;
                    this.eventData = eventData;
                    this.eventDescription = EventType_1.EventType[eventName];
                }
                GameEvent.create = function (eventName, eventData) {
                    if (eventData === void 0) { eventData = null; }
                    var ge = new GameEvent(eventName, eventData);
                    return ge;
                };
                return GameEvent;
            }());
            exports_3("GameEvent", GameEvent);
        }
    };
});
System.register("engine/entity/entity", [], function (exports_4, context_4) {
    "use strict";
    var Entity;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Entity = (function () {
                function Entity(componentFactory) {
                    this.id = -1;
                    this.components = [];
                    this.targetedEvents = [];
                    this.delayedEvents = [];
                    this.destroyed = false;
                    this.componentFactory = componentFactory;
                    Entity.id++;
                    this.id = Entity.id;
                }
                Entity.prototype.addComponent = function (componentName) {
                    var component = this.componentFactory.createComponent(componentName);
                    this.components.push(component);
                    return component;
                };
                Entity.prototype.getComponent = function (componentName, allowUndefined) {
                    if (allowUndefined === void 0) { allowUndefined = false; }
                    var component = undefined;
                    for (var i = 0; i < this.components.length; i++) {
                        if (this.components[i].componentName == componentName) {
                            return this.components[i];
                        }
                    }
                    if (!allowUndefined) {
                        throw "entity has no component " + componentName;
                    }
                    return component;
                };
                Entity.prototype.emit = function (event, delayed) {
                    if (delayed === void 0) { delayed = false; }
                    if (delayed) {
                        this.delayedEvents.push(event);
                    }
                    else {
                        this.targetedEvents.push(event);
                    }
                };
                Entity.prototype.update = function () {
                    for (var i = 0; i < this.components.length; i++) {
                        this.components[i].update(this);
                    }
                };
                Entity.create = function () {
                    return null;
                };
                Entity.id = -1;
                return Entity;
            }());
            exports_4("Entity", Entity);
        }
    };
});
System.register("engine/component/component", [], function (exports_5, context_5) {
    "use strict";
    var Component;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Component = (function () {
                function Component(componentName) {
                    this.componentName = componentName;
                }
                Component.create = function () {
                    throw "Component must implement static create function";
                };
                ;
                return Component;
            }());
            exports_5("Component", Component);
        }
    };
});
System.register("components/position-component", ["engine/component/component"], function (exports_6, context_6) {
    "use strict";
    var component_2, PositionComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (component_2_1) {
                component_2 = component_2_1;
            }
        ],
        execute: function () {
            PositionComponent = (function (_super) {
                __extends(PositionComponent, _super);
                function PositionComponent() {
                    var _this = _super.call(this, "position") || this;
                    _this._vx = 0;
                    _this._vy = 0;
                    _this._rotate = 0;
                    _this.x = 0;
                    _this.y = 0;
                    _this.width = 100;
                    _this.height = 100;
                    _this.faceRight = true;
                    _this.faceX = 0;
                    _this.faceY = 0;
                    _this.moved = false;
                    return _this;
                }
                Object.defineProperty(PositionComponent.prototype, "vx", {
                    get: function () {
                        return this._vx;
                    },
                    set: function (vx) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PositionComponent.prototype, "vy", {
                    get: function () {
                        return this._vy;
                    },
                    set: function (vy) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PositionComponent.prototype, "rotate", {
                    get: function () {
                        return this._rotate;
                    },
                    set: function (radiansToRotate) {
                        this._rotate = radiansToRotate % (2 * Math.PI);
                    },
                    enumerable: true,
                    configurable: true
                });
                PositionComponent.prototype.update = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.moved = !(this.vx == 0 && this.vy == 0);
                };
                PositionComponent.create = function () {
                    return new PositionComponent();
                };
                return PositionComponent;
            }(component_2.Component));
            exports_6("PositionComponent", PositionComponent);
        }
    };
});
System.register("engine/renderers/sprite-animation", [], function (exports_7, context_7) {
    "use strict";
    var SpriteAnimation;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            SpriteAnimation = (function () {
                function SpriteAnimation(animationName, spriteName, spriteNumbers, delay) {
                    this.spriteNumbers = spriteNumbers;
                    this.animationName = animationName;
                    this.spriteName = spriteName;
                    this.delay = delay;
                }
                SpriteAnimation.create = function (animationName, spriteName, spriteNumbers, delay) {
                    if (delay === void 0) { delay = 1; }
                    var sa = new SpriteAnimation(animationName, spriteName, spriteNumbers, delay);
                    return sa;
                };
                return SpriteAnimation;
            }());
            exports_7("SpriteAnimation", SpriteAnimation);
        }
    };
});
System.register("engine/renderers/implementations/html/html-sprite", [], function (exports_8, context_8) {
    "use strict";
    var HtmlSprite;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            HtmlSprite = (function () {
                function HtmlSprite(fileName, widthImgs, heightImgs) {
                    this.spriteDir = "../sprites/";
                    var spriteImg = new Image();
                    spriteImg.src = this.spriteDir + fileName;
                    this.sprite = spriteImg;
                    this.widthImgs = widthImgs;
                    this.heightImgs = heightImgs;
                    spriteImg.onload = this.setFrameDimensions(this);
                }
                HtmlSprite.prototype.setFrameDimensions = function (sprite) {
                    return function () {
                        sprite.frameWidth = sprite.sprite.width / sprite.widthImgs;
                        sprite.frameHeight = sprite.sprite.height / sprite.heightImgs;
                    };
                };
                HtmlSprite.prototype.frameCoords = function (spriteNum) {
                    var frameWidth = this.sprite.width / this.widthImgs;
                    var frameHeight = this.sprite.height / this.heightImgs;
                    var framex = spriteNum % this.widthImgs * frameWidth;
                    var framey = Math.floor(spriteNum / this.widthImgs) * frameHeight;
                    return [framex, framey];
                };
                return HtmlSprite;
            }());
            exports_8("HtmlSprite", HtmlSprite);
        }
    };
});
System.register("engine/renderers/sprite-manager", ["engine/renderers/sprite-animation", "engine/renderers/implementations/html/html-sprite"], function (exports_9, context_9) {
    "use strict";
    var sprite_animation_1, html_sprite_1, SpriteManager;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (sprite_animation_1_1) {
                sprite_animation_1 = sprite_animation_1_1;
            },
            function (html_sprite_1_1) {
                html_sprite_1 = html_sprite_1_1;
            }
        ],
        execute: function () {
            SpriteManager = (function () {
                function SpriteManager(spriteDir) {
                    if (spriteDir === void 0) { spriteDir = "../sprites/"; }
                    this.sprites = {};
                    this.animations = {};
                }
                SpriteManager.prototype.createSprite = function (fileName, widthImgs, heightImgs) {
                    return new html_sprite_1.HtmlSprite(fileName, widthImgs, heightImgs);
                };
                SpriteManager.prototype.addSprite = function (spriteName, sprite) {
                    this.sprites[spriteName] = sprite;
                };
                SpriteManager.prototype.getSprite = function (spriteName) {
                    if (!(spriteName in this.sprites)) {
                        throw "sprite " + spriteName + " does not exist";
                    }
                    return this.sprites[spriteName];
                };
                SpriteManager.prototype.loadSprite = function (spriteName, fileName, widthImgs, heightImgs) {
                    var sprite = this.createSprite(fileName, widthImgs, heightImgs);
                    this.addSprite(spriteName, sprite);
                };
                SpriteManager.prototype.addAnimation = function (spriteName, animationName, spriteNumbers, delay) {
                    if (delay === void 0) { delay = 1; }
                    var sa = sprite_animation_1.SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
                    if (!(spriteName in this.sprites)) {
                        throw "error adding animation "
                            + animationName
                            + ". spriteName "
                            + spriteName
                            + "doesn't exist. sprites must be added through addSprite method first";
                    }
                    this.animations[animationName] = sa;
                };
                SpriteManager.prototype.getAnimation = function (animationName) {
                    if (animationName in this.animations) {
                        return this.animations[animationName];
                    }
                    else {
                        return null;
                    }
                };
                SpriteManager.create = function () {
                    return new SpriteManager();
                };
                return SpriteManager;
            }());
            exports_9("SpriteManager", SpriteManager);
        }
    };
});
System.register("render/sprite-manager", ["engine/renderers/sprite-manager"], function (exports_10, context_10) {
    "use strict";
    var sprite_manager_1;
    var __moduleName = context_10 && context_10.id;
    function populateSpriteManager(spriteManager) {
        var sm = spriteManager;
        sm.loadSprite("nothing", "blond.png", 100, 100);
        sm.addAnimation("nothing", "nothing", [0], 5);
        sm.loadSprite("blondDress", "blond.png", 4, 8);
        sm.loadSprite("blond", "blondWalk.png", 4, 2);
        sm.addAnimation("blond", "blondWalk", [4, 5, 6, 7], 5);
        sm.addAnimation("blond", "blond", [4], 5);
        sm.loadSprite("fantasySprites", "fantasysprites.png", 12, 8);
        sm.addAnimation("fantasySprites", "redHair", [24, 25, 26, 25], 6);
        sm.loadSprite("crops", "crops.png", 12, 8);
        sm.addAnimation("crops", "turnip0", [0]);
        sm.addAnimation("crops", "turnip1", [1]);
        sm.addAnimation("crops", "turnip2", [2]);
        sm.addAnimation("crops", "corn0", [30]);
        sm.addAnimation("crops", "corn1", [31]);
        sm.addAnimation("crops", "corn2", [32]);
        sm.addAnimation("crops", "wheat0", [33]);
        sm.addAnimation("crops", "wheat1", [34]);
        sm.addAnimation("crops", "wheat2", [35]);
        sm.addAnimation("crops", "pumpkin0", [54]);
        sm.addAnimation("crops", "pumpkin1", [55]);
        sm.addAnimation("crops", "pumpkin2", [56]);
        sm.loadSprite("scrops", "scrops.png", 24, 23);
        sm.addAnimation("scrops", "onion0", [0]);
        sm.addAnimation("scrops", "onion1", [1]);
        sm.addAnimation("scrops", "onion2", [2]);
        sm.addAnimation("scrops", "onion3", [3]);
        sm.addAnimation("scrops", "onion4", [4]);
        sm.addAnimation("scrops", "onion5", [5]);
        sm.addAnimation("scrops", "onion", [6]);
        var cn = 24 * 8 + 18;
        sm.addAnimation("scrops", "corn", [cn]);
        sm.loadSprite("victorian", "victoriansprites.png", 12, 8);
        sm.addAnimation("victorian", "bluecloak", [24]);
        sm.addAnimation("victorian", "bluecloakwalk", [24, 25, 26, 25], 5);
        cn = 12 * 6;
        sm.addAnimation("victorian", "grey", [cn], 5);
        sm.addAnimation("victorian", "greyWalk", [cn, cn + 1, cn + 2, cn + 1], 5);
        cn = 8 * 4;
        sm.loadSprite("fireball", "fireball.png", 8, 8);
        sm.addAnimation("fireball", "fireball", [cn, cn + 1, cn + 2, cn + 3, cn + 4, cn + 5, cn + 6, cn + 7]);
        sm.loadSprite("tilesetcrops", "tilesets/submission_daneeklu/tilesets/plants.png", 9, 6);
        cn = 6;
        sm.addAnimation("tilesetcrops", "tomato0", [cn + 0]);
        sm.addAnimation("tilesetcrops", "tomato1", [cn + 9]);
        sm.addAnimation("tilesetcrops", "tomato2", [cn + 18]);
        sm.addAnimation("tilesetcrops", "tomato3", [cn + 27]);
        sm.addAnimation("tilesetcrops", "tomato4", [cn + 36]);
        return sm;
    }
    function createSpriteManager() {
        var sm = sprite_manager_1.SpriteManager.create();
        return populateSpriteManager(sm);
    }
    exports_10("createSpriteManager", createSpriteManager);
    return {
        setters: [
            function (sprite_manager_1_1) {
                sprite_manager_1 = sprite_manager_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("components/animation-component", ["engine/component/component", "render/sprite-manager"], function (exports_11, context_11) {
    "use strict";
    var component_3, sprite_manager_2, AnimationComponent;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (sprite_manager_2_1) {
                sprite_manager_2 = sprite_manager_2_1;
            }
        ],
        execute: function () {
            AnimationComponent = (function (_super) {
                __extends(AnimationComponent, _super);
                function AnimationComponent(animationName, delay, spriteManager) {
                    var _this = _super.call(this, "animation") || this;
                    _this.frameNum = 0;
                    _this.spriteNum = 0;
                    _this.delay = delay;
                    _this.currentDelay = delay;
                    _this.spriteManager = spriteManager;
                    _this.setSprite(animationName);
                    _this.animationName = animationName;
                    return _this;
                }
                AnimationComponent.prototype.getSpriteNumber = function () {
                    var frameNum = this.frameNum;
                    var spriteNum = this.spriteNumbers[frameNum];
                    return spriteNum;
                };
                AnimationComponent.prototype.setSprite = function (animationName) {
                    if (animationName == this.animationName) {
                        return;
                    }
                    this.animationName = animationName;
                    var animation = this.spriteManager.getAnimation(animationName);
                    if (animation == null)
                        return;
                    this.spriteNumbers = animation.spriteNumbers;
                    this.spriteName = animation.spriteName;
                    this.delay = animation.delay;
                    this.frameNum = 0;
                };
                AnimationComponent.prototype.update = function () {
                    if (this.currentDelay == 0) {
                        this.frameNum++;
                        this.frameNum %= this.spriteNumbers.length;
                        this.spriteNum = this.getSpriteNumber();
                        this.currentDelay = this.delay;
                    }
                    else {
                        this.currentDelay--;
                    }
                };
                AnimationComponent.create = function () {
                    var spriteManager = sprite_manager_2.createSpriteManager();
                    var ac = new AnimationComponent("blond", 2, spriteManager);
                    return ac;
                };
                return AnimationComponent;
            }(component_3.Component));
            exports_11("AnimationComponent", AnimationComponent);
        }
    };
});
System.register("components/wasd-component", ["engine/component/component"], function (exports_12, context_12) {
    "use strict";
    var component_4, WasdComponent;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (component_4_1) {
                component_4 = component_4_1;
            }
        ],
        execute: function () {
            WasdComponent = (function (_super) {
                __extends(WasdComponent, _super);
                function WasdComponent() {
                    var _this = _super.call(this, "wasd") || this;
                    _this.speed = 5;
                    _this.sprite = "grey";
                    _this.walkSprite = "greyWalk";
                    return _this;
                }
                WasdComponent.prototype.update = function () { };
                WasdComponent.create = function () {
                    return new WasdComponent();
                };
                return WasdComponent;
            }(component_4.Component));
            exports_12("WasdComponent", WasdComponent);
        }
    };
});
System.register("components/crop-component", ["engine/component/component"], function (exports_13, context_13) {
    "use strict";
    var component_5, CropComponent;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (component_5_1) {
                component_5 = component_5_1;
            }
        ],
        execute: function () {
            CropComponent = (function (_super) {
                __extends(CropComponent, _super);
                function CropComponent() {
                    var _this = _super.call(this, "crop") || this;
                    _this.timeSinceGrowth = 0;
                    _this.growthLengths = [5, 5, 5];
                    _this.growthStage = 0;
                    _this.cropName = "turnip";
                    _this.setCrop(_this.cropName);
                    return _this;
                }
                CropComponent.prototype.setSprites = function (sprites) {
                    this.growthSprites = sprites;
                    this.growthStage = 0;
                };
                CropComponent.prototype.isGrown = function () {
                    return this.growthStage == this.growthSprites.length - 1;
                };
                CropComponent.prototype.setCrop = function (cropName) {
                    var cropLength = 300;
                    this.growthLengths = [cropLength, cropLength, cropLength];
                    switch (cropName) {
                        case "turnip":
                            this.growthSprites = ["turnip0", "turnip1", "turnip2"];
                            this.growthLengths = [cropLength, cropLength, cropLength];
                            break;
                        case "corn":
                            this.growthSprites = ["corn0", "corn1", "corn2"];
                            this.growthLengths = [cropLength, cropLength, cropLength];
                            break;
                        case "wheat":
                            this.growthSprites = ["wheat0", "wheat1", "wheat2"];
                            this.growthLengths = [cropLength, cropLength, cropLength];
                            break;
                        case "pumpkin":
                            this.growthSprites = ["pumpkin0", "pumpkin1", "pumpkin2"];
                            this.growthLengths = [cropLength, cropLength, cropLength];
                            break;
                        case "onion":
                            this.growthSprites = ["onion0", "onion1", "onion2", "onion3", "onion4", "onion5"];
                            this.growthLengths = [cropLength, cropLength, cropLength, cropLength, cropLength, cropLength];
                            break;
                        case "tomato":
                            this.growthSprites = ["tomato0", "tomato1", "tomato2", "tomato3"];
                            this.growthLengths = [cropLength, cropLength, cropLength, cropLength];
                            break;
                    }
                    this.growthStage = 0;
                    this.cropName = cropName;
                };
                CropComponent.prototype.update = function () {
                    if (this.isGrown()) {
                        return;
                    }
                    this.timeSinceGrowth++;
                    var gs = this.growthStage;
                    var gl = this.growthLengths[gs];
                    if (this.timeSinceGrowth > gl) {
                        this.growthStage = (this.growthStage + 1) % this.growthLengths.length;
                        this.timeSinceGrowth = 0;
                    }
                };
                ;
                CropComponent.create = function () {
                    return new CropComponent();
                };
                ;
                return CropComponent;
            }(component_5.Component));
            exports_13("CropComponent", CropComponent);
        }
    };
});
System.register("components/projectile-component", ["engine/component/component"], function (exports_14, context_14) {
    "use strict";
    var component_6, ProjectileComponent;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (component_6_1) {
                component_6 = component_6_1;
            }
        ],
        execute: function () {
            ProjectileComponent = (function (_super) {
                __extends(ProjectileComponent, _super);
                function ProjectileComponent() {
                    var _this = _super.call(this, "projectile") || this;
                    _this.lifeSpan = 90;
                    return _this;
                }
                ProjectileComponent.prototype.update = function () {
                };
                ProjectileComponent.create = function () {
                    return new ProjectileComponent();
                };
                return ProjectileComponent;
            }(component_6.Component));
            exports_14("ProjectileComponent", ProjectileComponent);
        }
    };
});
System.register("components/fight-component", ["engine/component/component"], function (exports_15, context_15) {
    "use strict";
    var component_7, FightComponent;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (component_7_1) {
                component_7 = component_7_1;
            }
        ],
        execute: function () {
            FightComponent = (function (_super) {
                __extends(FightComponent, _super);
                function FightComponent() {
                    var _this = _super.call(this, "fight") || this;
                    _this.attack = false;
                    _this.maxSpeed = 5;
                    _this.range = 300;
                    _this.reloadTime = 30;
                    _this.reloadTimer = 30;
                    return _this;
                }
                FightComponent.prototype.attackTarget = function () {
                };
                FightComponent.prototype.canFire = function () {
                    return this.reloadTime === this.reloadTimer;
                };
                FightComponent.prototype.update = function () {
                    if (this.reloadTimer <= this.reloadTime) {
                        this.reloadTimer--;
                    }
                    if (this.reloadTimer <= 0) {
                        this.reloadTimer = this.reloadTime;
                    }
                };
                FightComponent.create = function () {
                    return new FightComponent();
                };
                return FightComponent;
            }(component_7.Component));
            exports_15("FightComponent", FightComponent);
        }
    };
});
System.register("components/health-component", ["engine/component/component"], function (exports_16, context_16) {
    "use strict";
    var component_8, HealthComponent;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (component_8_1) {
                component_8 = component_8_1;
            }
        ],
        execute: function () {
            HealthComponent = (function (_super) {
                __extends(HealthComponent, _super);
                function HealthComponent() {
                    var _this = _super.call(this, "health") || this;
                    _this.health = 100;
                    return _this;
                }
                HealthComponent.prototype.update = function () { };
                HealthComponent.create = function () {
                    return new HealthComponent();
                };
                return HealthComponent;
            }(component_8.Component));
            exports_16("HealthComponent", HealthComponent);
        }
    };
});
System.register("components/neural-fight-component", ["engine/component/component"], function (exports_17, context_17) {
    "use strict";
    var component_9, NeuralFightComponent;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (component_9_1) {
                component_9 = component_9_1;
            }
        ],
        execute: function () {
            NeuralFightComponent = (function (_super) {
                __extends(NeuralFightComponent, _super);
                function NeuralFightComponent() {
                    return _super.call(this, "neural") || this;
                }
                NeuralFightComponent.prototype.update = function () { };
                NeuralFightComponent.create = function () {
                    return new NeuralFightComponent();
                };
                return NeuralFightComponent;
            }(component_9.Component));
            exports_17("NeuralFightComponent", NeuralFightComponent);
        }
    };
});
System.register("engine/entity/entity-factory", ["engine/entity/entity", "engine/component/component-factory"], function (exports_18, context_18) {
    "use strict";
    var entity_1, component_factory_1, EntityFactory;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (entity_1_1) {
                entity_1 = entity_1_1;
            },
            function (component_factory_1_1) {
                component_factory_1 = component_factory_1_1;
            }
        ],
        execute: function () {
            EntityFactory = (function () {
                function EntityFactory(componentFactory) {
                    this.entityTypes = {};
                    this.componentFactory = componentFactory;
                }
                EntityFactory.prototype.registerEntity = function (componentName, EntityClass) {
                    if (EntityClass.prototype instanceof entity_1.Entity) {
                        this.entityTypes[componentName] = EntityClass;
                    }
                    else {
                        console.log("EntityClass must extend class Entity");
                    }
                };
                EntityFactory.prototype.registerComponent = function (componentClass) {
                    this.componentFactory.registerComponent(componentClass);
                };
                EntityFactory.prototype.create = function (entityName) {
                    var entityClass = this.entityTypes[entityName];
                    return this.entityTypes[entityName].create();
                };
                EntityFactory.create = function () {
                    var componentFactory = component_factory_1.ComponentFactory.create();
                    var ef = new EntityFactory(componentFactory);
                    return ef;
                };
                return EntityFactory;
            }());
            exports_18("EntityFactory", EntityFactory);
        }
    };
});
System.register("engine/events/event-manager", ["engine/events/game-event", "engine/events/EventType"], function (exports_19, context_19) {
    "use strict";
    var game_event_1, EventType_2, EventManager;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (game_event_1_1) {
                game_event_1 = game_event_1_1;
            },
            function (EventType_2_1) {
                EventType_2 = EventType_2_1;
            }
        ],
        execute: function () {
            EventManager = (function () {
                function EventManager() {
                    this.keys = Array(1000);
                    this.keysReleased = Array(1000);
                    this.events = [];
                    this.callbacks = {};
                    this.keys = this.createKeyListener();
                }
                EventManager.prototype.createKeyListener = function () {
                    var keys = Array(1000);
                    window.addEventListener("keydown", function (e) {
                        keys[e.keyCode] = true;
                    });
                    window.addEventListener("keyup", function (e) {
                        keys[e.keyCode] = false;
                    });
                    return keys;
                };
                EventManager.prototype.update = function () {
                    this.events = [];
                    var controls = [EventType_2.EventType.wDown, EventType_2.EventType.aDown, EventType_2.EventType.sDown,
                        EventType_2.EventType.dDown, EventType_2.EventType.spaceDown, EventType_2.EventType.pDown, EventType_2.EventType.iDown, EventType_2.EventType.fDown];
                    var controlRelease = [EventType_2.EventType.wUp, EventType_2.EventType.aUp, EventType_2.EventType.sUp,
                        EventType_2.EventType.dUp, EventType_2.EventType.spaceUp, EventType_2.EventType.pUp, EventType_2.EventType.iUp, EventType_2.EventType.fUp];
                    var controlKeys = [87, 65, 83, 68, 32, 80, 73, 70];
                    for (var i = 0; i < controls.length; i++) {
                        if (this.keys[controlKeys[i]]) {
                            this.emit(controls[i]);
                            this.keysReleased[controlKeys[i]] = true;
                        }
                        else {
                            if (this.keysReleased[controlKeys[i]]) {
                                this.emit(controlRelease[i]);
                                this.keysReleased[controlKeys[i]] = false;
                            }
                        }
                    }
                };
                EventManager.prototype.emit = function (eventName, eventData) {
                    if (eventData === void 0) { eventData = {}; }
                    var ge = new game_event_1.GameEvent(eventName, eventData);
                    this.events.push(ge);
                };
                EventManager.prototype.fireCallbacks = function () {
                    var events;
                    var callbacks;
                    for (var eventName in this.events) {
                        events = this.events;
                        callbacks = this.callbacks[eventName];
                        events.forEach(function (event) {
                            callbacks.forEach(function (callback) {
                                callback(event);
                            });
                        });
                    }
                };
                EventManager.prototype.addListener = function (eventName, callback) {
                    this.callbacks[eventName].push(callback);
                };
                EventManager.prototype.createEvent = function (eventName) {
                    if (eventName in this.events)
                        return;
                    this.events = [];
                    this.callbacks[eventName] = [];
                };
                EventManager.create = function () {
                    var em = new EventManager();
                    em.createEvent(EventType_2.EventType.wDown);
                    em.createEvent(EventType_2.EventType.aDown);
                    em.createEvent(EventType_2.EventType.sDown);
                    em.createEvent(EventType_2.EventType.dDown);
                    return em;
                };
                return EventManager;
            }());
            exports_19("EventManager", EventManager);
        }
    };
});
System.register("engine/system/system", [], function (exports_20, context_20) {
    "use strict";
    var EntitySystem;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
            EntitySystem = (function () {
                function EntitySystem(game) {
                    this.game = game;
                }
                EntitySystem.prototype.apply = function (entity, eventManager) {
                    throw "an entity system did not implement apply method.";
                };
                ;
                EntitySystem.prototype.applyEvents = function (entity, eventManager) {
                    throw "an entity did not implement apply Events";
                };
                return EntitySystem;
            }());
            exports_20("EntitySystem", EntitySystem);
        }
    };
});
System.register("engine/renderers/render-options", [], function (exports_21, context_21) {
    "use strict";
    var RenderOptions;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            RenderOptions = (function () {
                function RenderOptions() {
                    this.flip = true;
                    this.rotate = 0;
                }
                return RenderOptions;
            }());
            exports_21("RenderOptions", RenderOptions);
        }
    };
});
System.register("engine/renderers/render", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("engine/renderers/implementations/html/html-renderer", ["engine/renderers/sprite-manager"], function (exports_23, context_23) {
    "use strict";
    var sprite_manager_3, HtmlRenderer;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (sprite_manager_3_1) {
                sprite_manager_3 = sprite_manager_3_1;
            }
        ],
        execute: function () {
            HtmlRenderer = (function () {
                function HtmlRenderer(context, spriteManager) {
                    this.canvas = context;
                    this.ctx = this.canvas.getContext("2d");
                    this.spriteManager = spriteManager;
                    this.offset = [0, 0];
                }
                HtmlRenderer.prototype.setOffset = function (offset) {
                    if (offset.length > 2) {
                        console.log("warning incorrect number of offsets");
                        return;
                    }
                    this.offset[0] = offset[0] - this.canvas.width / 2;
                    this.offset[1] = offset[1] - this.canvas.height / 2;
                };
                HtmlRenderer.prototype.cbox = function () {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                };
                HtmlRenderer.prototype.sprite = function (spriteName, x, y, width, height, spriteNumber, options) {
                    var flip = options.flip;
                    var sprite = this.spriteManager.getSprite(spriteName);
                    var spriteImg = sprite.sprite;
                    var fc = sprite.frameCoords(spriteNumber);
                    x = x - width / 2;
                    x -= this.offset[0];
                    y = y - height;
                    y -= this.offset[1];
                    var flipTranslation = 2 * (x + width / 2);
                    if (flip) {
                        this.ctx.translate(flipTranslation, 0);
                        this.ctx.scale(-1, 1);
                    }
                    if (options.rotate) {
                        this.ctx.rotate(options.rotate);
                    }
                    this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth, sprite.frameHeight, x, y, width, height);
                    if (options.rotate) {
                        this.ctx.rotate(-options.rotate);
                    }
                    if (flip) {
                        this.ctx.scale(-1, 1);
                        this.ctx.translate(-flipTranslation, 0);
                    }
                };
                HtmlRenderer.prototype.text = function (text, x, y, size) {
                    if (size === void 0) { size = 10; }
                    x -= this.offset[0];
                    y -= this.offset[1];
                    this.ctx.fillText(text, x, y);
                };
                HtmlRenderer.create = function () {
                    var canvas = document.getElementById("canvas");
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    canvas.style.margin = "0";
                    canvas.style.padding = "0";
                    canvas.style.overflow = "hidden";
                    canvas.style.position = "fixed";
                    canvas.style.top = "0px";
                    canvas.style.left = "0px";
                    var spriteManager = sprite_manager_3.SpriteManager.create();
                    return new HtmlRenderer(canvas, spriteManager);
                };
                return HtmlRenderer;
            }());
            exports_23("HtmlRenderer", HtmlRenderer);
        }
    };
});
System.register("engine/game", ["engine/entity/entity-factory", "engine/events/event-manager", "engine/renderers/implementations/html/html-renderer"], function (exports_24, context_24) {
    "use strict";
    var entity_factory_1, event_manager_1, html_renderer_1, Game;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (entity_factory_1_1) {
                entity_factory_1 = entity_factory_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (html_renderer_1_1) {
                html_renderer_1 = html_renderer_1_1;
            }
        ],
        execute: function () {
            Game = (function () {
                function Game(entityFactory, renderer, eventManager) {
                    this._entities = [];
                    this.systems = [];
                    this.entityFactory = entityFactory;
                    this.renderer = renderer;
                    this.eventManager = eventManager;
                    this.spriteManager = this.renderer.spriteManager;
                }
                Game.create = function () {
                    var game = new Game(entity_factory_1.EntityFactory.create(), html_renderer_1.HtmlRenderer.create(), event_manager_1.EventManager.create());
                    return game;
                };
                Object.defineProperty(Game.prototype, "entities", {
                    get: function () {
                        return this._entities;
                    },
                    set: function (entities) {
                        this._entities = entities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Game.prototype.update = function () {
                    this.renderer.cbox();
                    this.eventManager.update();
                    for (var i = 0; i < this.entities.length; i++) {
                        this.entities[i].update();
                        for (var systemi = 0; systemi < this.systems.length; systemi++) {
                            this.systems[systemi].apply(this.entities[i], this.eventManager);
                        }
                    }
                    var numEvents;
                    for (var i = 0; i < this.entities.length; i++) {
                        for (var systemi = 0; systemi < this.systems.length; systemi++) {
                            this.systems[systemi].applyEvents(this.entities[i], this.eventManager);
                        }
                        this.entities[i].targetedEvents = this.entities[i].delayedEvents;
                        this.entities[i].delayedEvents = [];
                    }
                    this.eventManager.fireCallbacks();
                    this.entities.sort(function (a, b) {
                        var pa = a.getComponent("position");
                        var pb = b.getComponent("position");
                        return pa.y - pb.y;
                    });
                    this.cleanDestroyedEntities();
                };
                Game.prototype.render = function () {
                };
                Game.prototype.step = function () {
                    this.update();
                    this.render();
                };
                Game.prototype.start = function () {
                    console.log("starting game");
                    this.intervalId = setInterval((function (game) {
                        return function () { game.step(); };
                    })(this), 1000 / 40);
                    return this.intervalId;
                };
                Game.prototype.stop = function () {
                    clearInterval(this.intervalId);
                };
                Game.prototype.addEntity = function (entityName) {
                    var entity = this.entityFactory.create(entityName);
                    this.entities.push(entity);
                    return entity;
                };
                Game.prototype.getById = function (entityId) {
                    var entity;
                    for (var i = 0; i < this.entities.length; i++) {
                        entity = this.entities[i];
                        if (entityId == entity.id)
                            return entity;
                    }
                    return null;
                };
                Game.prototype.destroy = function (entity) {
                    entity.destroyed = true;
                };
                Game.prototype.cleanDestroyedEntities = function () {
                    var newEntities = [];
                    for (var i = 0; i < this.entities.length; i++) {
                        if (!this.entities[i].destroyed) {
                            newEntities.push(this.entities[i]);
                        }
                        else {
                            delete this.entities[i];
                        }
                    }
                    delete this.entities;
                    this.entities = newEntities;
                };
                Game.prototype.addSystem = function (system) {
                    this.systems.push(system);
                };
                Game.prototype.registerEntity = function (entityName, EntityClass) {
                    this.entityFactory.registerEntity(entityName, EntityClass);
                };
                Game.prototype.registerComponent = function (EntityClass) {
                    this.entityFactory.registerComponent(EntityClass);
                };
                return Game;
            }());
            exports_24("Game", Game);
        }
    };
});
System.register("components/inventory-component/inventory-item-type", [], function (exports_25, context_25) {
    "use strict";
    var InventoryItemType;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
            InventoryItemType = (function () {
                function InventoryItemType(itemName, itemDescription, itemSpriteName) {
                    this.itemId = -1;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                    InventoryItemType.largestItemId += 1;
                    this.itemId = InventoryItemType.largestItemId;
                    this.itemName = itemName;
                    this.itemDescription = itemDescription;
                    this.itemSpriteName = itemSpriteName;
                }
                InventoryItemType.create = function (itemName, itemSpriteName, itemDescription) {
                    var newItemType;
                    newItemType = new InventoryItemType(itemName, itemDescription, itemSpriteName);
                    return newItemType;
                };
                InventoryItemType.largestItemId = -1;
                return InventoryItemType;
            }());
            exports_25("InventoryItemType", InventoryItemType);
        }
    };
});
System.register("components/inventory-component/inventory-item", [], function (exports_26, context_26) {
    "use strict";
    var InventoryItem;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
            InventoryItem = (function () {
                function InventoryItem() {
                    this.itemQuantity = 0;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                    this.itemSlot = -1;
                }
                InventoryItem.create = function (itemType) {
                    var item = new InventoryItem();
                    item.itemName = itemType.itemName;
                    item.itemDescription = itemType.itemDescription;
                    return item;
                };
                return InventoryItem;
            }());
            exports_26("InventoryItem", InventoryItem);
        }
    };
});
System.register("components/inventory-component/item-registry", ["components/inventory-component/inventory-item-type"], function (exports_27, context_27) {
    "use strict";
    var inventory_item_type_1, InventoryItemRegistry;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (inventory_item_type_1_1) {
                inventory_item_type_1 = inventory_item_type_1_1;
            }
        ],
        execute: function () {
            InventoryItemRegistry = (function () {
                function InventoryItemRegistry() {
                    this.itemTypes = {};
                }
                InventoryItemRegistry.prototype.registerItemType = function (itemName, itemSpriteName, description) {
                    var newItemType;
                    newItemType = new inventory_item_type_1.InventoryItemType(itemName, description, itemSpriteName);
                    if (itemName in this.itemTypes) {
                        throw "error: item type: " + itemName + " already exists";
                    }
                    this.itemTypes[itemName] = newItemType;
                };
                InventoryItemRegistry.singletonCreate = function () {
                    if (this.singletonRegistry)
                        return this.singletonRegistry;
                    var itemRegistry = new InventoryItemRegistry();
                    this.singletonRegistry = itemRegistry;
                    this.singletonRegistry.populateItems();
                    return this.singletonRegistry;
                };
                InventoryItemRegistry.prototype.populateItems = function () {
                    this.registerItemType("wheat", "wheat2", "its a wheat");
                    this.registerItemType("onion", "onion5", "its an onion");
                    this.registerItemType("corn", "corn2", "its corn");
                    this.registerItemType("pumpkin", "pumpkin2", "its a pumpkin");
                    this.registerItemType("turnip", "turnip2", "its a turnip");
                    this.registerItemType("nothing", "nothing", "nothing");
                };
                return InventoryItemRegistry;
            }());
            exports_27("InventoryItemRegistry", InventoryItemRegistry);
        }
    };
});
System.register("components/inventory-component/give-item-event-data", [], function (exports_28, context_28) {
    "use strict";
    var GiveItemEventData;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
            GiveItemEventData = (function () {
                function GiveItemEventData(itemName, quantity) {
                    this.itemName = itemName;
                    this.quantity = quantity;
                }
                return GiveItemEventData;
            }());
            exports_28("GiveItemEventData", GiveItemEventData);
        }
    };
});
System.register("components/text-component/text-placement", [], function (exports_29, context_29) {
    "use strict";
    var TextPlacement;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
            TextPlacement = (function () {
                function TextPlacement(textValue, offsetX, offsetY) {
                    this.textValue = textValue;
                    this.offsetX = offsetX;
                    this.offsetY = offsetY;
                }
                return TextPlacement;
            }());
            exports_29("TextPlacement", TextPlacement);
        }
    };
});
System.register("components/text-component/text-component", ["engine/component/component", "components/text-component/text-placement"], function (exports_30, context_30) {
    "use strict";
    var component_10, text_placement_1, TextComponent;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (component_10_1) {
                component_10 = component_10_1;
            },
            function (text_placement_1_1) {
                text_placement_1 = text_placement_1_1;
            }
        ],
        execute: function () {
            TextComponent = (function (_super) {
                __extends(TextComponent, _super);
                function TextComponent() {
                    var _this = _super.call(this, "text") || this;
                    _this.textPlacements = [];
                    return _this;
                }
                TextComponent.prototype.addTextPlacement = function (text, offsetX, offsetY) {
                    if (offsetX === void 0) { offsetX = 0; }
                    if (offsetY === void 0) { offsetY = 0; }
                    this.textPlacements.push(new text_placement_1.TextPlacement(text, offsetX, offsetY));
                };
                TextComponent.prototype.setText = function (value, index) {
                    if (index === void 0) { index = 0; }
                    if (index >= 0 && index < this.textPlacements.length) {
                        this.textPlacements[index].textValue = value;
                    }
                };
                TextComponent.prototype.update = function () { };
                TextComponent.create = function () {
                    return new TextComponent();
                };
                return TextComponent;
            }(component_10.Component));
            exports_30("TextComponent", TextComponent);
        }
    };
});
System.register("entities/inventory-item-entity", ["engine/entity/entity", "builders/build-components"], function (exports_31, context_31) {
    "use strict";
    var entity_2, build_components_1, InventoryItemEntity;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (entity_2_1) {
                entity_2 = entity_2_1;
            },
            function (build_components_1_1) {
                build_components_1 = build_components_1_1;
            }
        ],
        execute: function () {
            InventoryItemEntity = (function (_super) {
                __extends(InventoryItemEntity, _super);
                function InventoryItemEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    _this.addComponent("position");
                    _this.addComponent("animation");
                    var text = _this.addComponent("text");
                    text.addTextPlacement("0", 0, 0);
                    return _this;
                }
                InventoryItemEntity.prototype.handleEvents = function (events) {
                };
                InventoryItemEntity.create = function () {
                    return new InventoryItemEntity(build_components_1.createComponentFactory());
                };
                return InventoryItemEntity;
            }(entity_2.Entity));
            exports_31("InventoryItemEntity", InventoryItemEntity);
        }
    };
});
System.register("components/inventory-component/inventory-component", ["engine/component/component", "components/inventory-component/inventory-item", "components/inventory-component/item-registry"], function (exports_32, context_32) {
    "use strict";
    var component_11, inventory_item_1, item_registry_1, InventoryComponent;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (component_11_1) {
                component_11 = component_11_1;
            },
            function (inventory_item_1_1) {
                inventory_item_1 = inventory_item_1_1;
            },
            function (item_registry_1_1) {
                item_registry_1 = item_registry_1_1;
            }
        ],
        execute: function () {
            InventoryComponent = (function (_super) {
                __extends(InventoryComponent, _super);
                function InventoryComponent(itemRegistry) {
                    var _this = _super.call(this, "inventory") || this;
                    _this.inventory = {};
                    _this.itemSlots = [];
                    _this.selectedItemSlot = 0;
                    _this.inventoryItemEntities = [];
                    _this.itemRegistry = itemRegistry;
                    _this.itemSlots = new Array(10);
                    for (var i = 0; i < _this.itemSlots.length; i++) {
                        var itemType = _this.itemRegistry.itemTypes["nothing"];
                        _this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
                    }
                    return _this;
                }
                InventoryComponent.prototype.hashInventoryToString = function () {
                    var inventoryString = "Inventory:";
                    for (var i = 0; i < this.itemSlots.length; i++) {
                        var item = void 0;
                        item = this.itemSlots[i];
                        inventoryString += "\n" + item.itemName + ": " + item.itemQuantity;
                    }
                    inventoryString += "\n<---------->";
                    console.log(inventoryString);
                };
                InventoryComponent.prototype.inventoryToString = function () {
                    var inventoryString = "Inventory:";
                    for (var i = 0; i < this.itemSlots.length; i++) {
                        var item = void 0;
                        item = this.itemSlots[i];
                        inventoryString += "\n" + item.itemName + ": " + item.itemQuantity;
                    }
                    inventoryString += "\n<---------->";
                    console.log(inventoryString);
                };
                InventoryComponent.prototype.selectItemSlot = function (itemSlotNumber) {
                    this.selectedItemSlot = itemSlotNumber % this.itemSlots.length;
                };
                InventoryComponent.prototype.getSelectedItem = function () {
                    return this.itemSlots[this.selectedItemSlot];
                };
                InventoryComponent.prototype.addItemToHashTable = function (itemName, quantity) {
                    if (quantity === void 0) { quantity = 1; }
                    if (!(itemName in this.itemRegistry.itemTypes)) {
                        console.log("Warning: itemName " + itemName + " is not in the itemRegistry");
                        return false;
                    }
                    var itemType = this.itemRegistry.itemTypes[itemName];
                    if (!(itemName in this.inventory)) {
                        this.inventory[itemName] = inventory_item_1.InventoryItem.create(itemType);
                    }
                    this.inventory[itemName].itemQuantity += quantity;
                    return true;
                };
                InventoryComponent.prototype.getItems = function () {
                    return this.itemSlots;
                };
                InventoryComponent.prototype.addItem = function (itemName, quantity) {
                    if (quantity === void 0) { quantity = 1; }
                    if (!(itemName in this.itemRegistry.itemTypes)) {
                        console.log("Warning: itemName " + itemName + " is not in the itemRegistry");
                        return false;
                    }
                    for (var i = 0; i < this.itemSlots.length; i++) {
                        var itemSlot = this.itemSlots[i];
                        if (itemSlot.itemName == itemName) {
                            itemSlot.itemQuantity += quantity;
                            return true;
                        }
                    }
                    for (var i = 0; i < this.itemSlots.length; i++) {
                        var itemSlot = this.itemSlots[i];
                        if (itemSlot.itemName == "nothing") {
                            var itemType = this.itemRegistry.itemTypes[itemName];
                            this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
                            this.itemSlots[i].itemQuantity = 1;
                            return;
                        }
                    }
                    return true;
                };
                InventoryComponent.prototype.update = function (entity) {
                    for (var i = 0; i < this.inventoryItemEntities.length; i++) {
                        var inventoryItemEntity = this.inventoryItemEntities[i];
                        var spriteComponent = void 0;
                        spriteComponent = inventoryItemEntity.getComponent("animation");
                        var item = this.itemSlots[i];
                        var itemType = this.itemRegistry.itemTypes[item.itemName];
                        spriteComponent.setSprite(itemType.itemSpriteName);
                    }
                };
                InventoryComponent.prototype.handleEvents = function (event) {
                };
                InventoryComponent.create = function () {
                    var inventory;
                    inventory = new InventoryComponent(item_registry_1.InventoryItemRegistry.singletonCreate());
                    return inventory;
                };
                return InventoryComponent;
            }(component_11.Component));
            exports_32("InventoryComponent", InventoryComponent);
        }
    };
});
System.register("components/place-item/place-item-request", [], function (exports_33, context_33) {
    "use strict";
    var PlaceItemRequest;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [],
        execute: function () {
            PlaceItemRequest = (function () {
                function PlaceItemRequest(entityName, coordinates, quantity, successCallback, relative) {
                    if (quantity === void 0) { quantity = 1; }
                    if (relative === void 0) { relative = true; }
                    this.entityName = entityName;
                    this.coordinates = coordinates;
                    this.quantity = quantity;
                    this.successCallback = successCallback;
                    this.relative = relative;
                }
                return PlaceItemRequest;
            }());
            exports_33("PlaceItemRequest", PlaceItemRequest);
        }
    };
});
System.register("components/place-item/place-item-component", ["engine/component/component", "components/place-item/place-item-request"], function (exports_34, context_34) {
    "use strict";
    var component_12, place_item_request_1, PlaceItemComponent;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (component_12_1) {
                component_12 = component_12_1;
            },
            function (place_item_request_1_1) {
                place_item_request_1 = place_item_request_1_1;
            }
        ],
        execute: function () {
            PlaceItemComponent = (function (_super) {
                __extends(PlaceItemComponent, _super);
                function PlaceItemComponent() {
                    var _this = _super.call(this, "placeItem") || this;
                    _this.placeItemRequests = [];
                    return _this;
                }
                PlaceItemComponent.prototype.placeItem = function (entityName, coordinates, successCallback, relative) {
                    if (coordinates === void 0) { coordinates = [0, 0]; }
                    if (relative === void 0) { relative = true; }
                    var placeItemRequest;
                    placeItemRequest = new place_item_request_1.PlaceItemRequest(entityName, coordinates, 1, successCallback, relative = true);
                    this.placeItemRequests.push(placeItemRequest);
                };
                PlaceItemComponent.prototype.update = function (entity) {
                };
                PlaceItemComponent.create = function () {
                    return new PlaceItemComponent();
                };
                return PlaceItemComponent;
            }(component_12.Component));
            exports_34("PlaceItemComponent", PlaceItemComponent);
        }
    };
});
System.register("components/crop-harvester-component", ["engine/component/component"], function (exports_35, context_35) {
    "use strict";
    var component_13, CropHarvesterComponent;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (component_13_1) {
                component_13 = component_13_1;
            }
        ],
        execute: function () {
            CropHarvesterComponent = (function (_super) {
                __extends(CropHarvesterComponent, _super);
                function CropHarvesterComponent() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.harvesting = false;
                    _this.harvestTime = 0;
                    _this.timeItTakesToHarvest = 10;
                    return _this;
                }
                CropHarvesterComponent.prototype.startHarvest = function () {
                    this.harvesting = true;
                    this.harvestTime = this.timeItTakesToHarvest;
                };
                CropHarvesterComponent.prototype.update = function (entity) {
                    if (this.harvestTime > 0) {
                        this.harvestTime -= 1;
                    }
                    else {
                        this.harvesting = false;
                    }
                };
                CropHarvesterComponent.create = function () {
                    return new CropHarvesterComponent("cropHarvester");
                };
                return CropHarvesterComponent;
            }(component_13.Component));
            exports_35("CropHarvesterComponent", CropHarvesterComponent);
        }
    };
});
System.register("builders/build-components", ["components/position-component", "components/animation-component", "components/wasd-component", "components/crop-component", "components/projectile-component", "components/fight-component", "components/health-component", "components/neural-fight-component", "components/inventory-component/inventory-component", "engine/component/component-factory", "components/place-item/place-item-component", "components/crop-harvester-component", "components/text-component/text-component"], function (exports_36, context_36) {
    "use strict";
    var position_component_1, animation_component_1, wasd_component_1, crop_component_1, projectile_component_1, fight_component_1, health_component_1, neural_fight_component_1, inventory_component_1, component_factory_2, place_item_component_1, crop_harvester_component_1, text_component_1;
    var __moduleName = context_36 && context_36.id;
    function createComponentFactory() {
        var cf = new component_factory_2.ComponentFactory();
        cf.registerComponent(animation_component_1.AnimationComponent);
        cf.registerComponent(position_component_1.PositionComponent);
        cf.registerComponent(wasd_component_1.WasdComponent);
        cf.registerComponent(crop_component_1.CropComponent);
        cf.registerComponent(projectile_component_1.ProjectileComponent);
        cf.registerComponent(fight_component_1.FightComponent);
        cf.registerComponent(health_component_1.HealthComponent);
        cf.registerComponent(neural_fight_component_1.NeuralFightComponent);
        cf.registerComponent(inventory_component_1.InventoryComponent);
        cf.registerComponent(place_item_component_1.PlaceItemComponent);
        cf.registerComponent(crop_harvester_component_1.CropHarvesterComponent);
        cf.registerComponent(text_component_1.TextComponent);
        return cf;
    }
    exports_36("createComponentFactory", createComponentFactory);
    function buildComponents(game) {
        game.registerComponent(animation_component_1.AnimationComponent);
        game.registerComponent(position_component_1.PositionComponent);
        game.registerComponent(wasd_component_1.WasdComponent);
        game.registerComponent(crop_component_1.CropComponent);
        game.registerComponent(projectile_component_1.ProjectileComponent);
        game.registerComponent(fight_component_1.FightComponent);
        game.registerComponent(health_component_1.HealthComponent);
        game.registerComponent(neural_fight_component_1.NeuralFightComponent);
        game.registerComponent(inventory_component_1.InventoryComponent);
    }
    exports_36("buildComponents", buildComponents);
    return {
        setters: [
            function (position_component_1_1) {
                position_component_1 = position_component_1_1;
            },
            function (animation_component_1_1) {
                animation_component_1 = animation_component_1_1;
            },
            function (wasd_component_1_1) {
                wasd_component_1 = wasd_component_1_1;
            },
            function (crop_component_1_1) {
                crop_component_1 = crop_component_1_1;
            },
            function (projectile_component_1_1) {
                projectile_component_1 = projectile_component_1_1;
            },
            function (fight_component_1_1) {
                fight_component_1 = fight_component_1_1;
            },
            function (health_component_1_1) {
                health_component_1 = health_component_1_1;
            },
            function (neural_fight_component_1_1) {
                neural_fight_component_1 = neural_fight_component_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            },
            function (component_factory_2_1) {
                component_factory_2 = component_factory_2_1;
            },
            function (place_item_component_1_1) {
                place_item_component_1 = place_item_component_1_1;
            },
            function (crop_harvester_component_1_1) {
                crop_harvester_component_1 = crop_harvester_component_1_1;
            },
            function (text_component_1_1) {
                text_component_1 = text_component_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("entities/crop-entity", ["engine/entity/entity", "builders/build-components"], function (exports_37, context_37) {
    "use strict";
    var entity_3, build_components_2, CropEntity;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (entity_3_1) {
                entity_3 = entity_3_1;
            },
            function (build_components_2_1) {
                build_components_2 = build_components_2_1;
            }
        ],
        execute: function () {
            CropEntity = (function (_super) {
                __extends(CropEntity, _super);
                function CropEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    var position = _this.addComponent("position");
                    var animation = _this.addComponent("animation");
                    var crop = _this.addComponent("crop");
                    if (crop.growthSprites.length > 0) {
                        animation.setSprite(crop.growthSprites[0]);
                    }
                    return _this;
                }
                CropEntity.prototype.handleEvents = function (events) {
                };
                CropEntity.create = function () {
                    var cf = build_components_2.createComponentFactory();
                    return new CropEntity(cf);
                };
                return CropEntity;
            }(entity_3.Entity));
            exports_37("CropEntity", CropEntity);
        }
    };
});
System.register("builders/sprite-builder", [], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    function populateSpriteManager(spriteManager) {
        var sm = spriteManager;
        sm.loadSprite("blondDress", "blond.png", 4, 8);
        sm.loadSprite("nothing", "blond.png", 100, 100);
        sm.addAnimation("nothing", "nothing", [0], 10);
        sm.loadSprite("blond", "blondWalk.png", 4, 2);
        sm.addAnimation("blond", "blondWalk", [4, 5, 6, 7], 5);
        sm.addAnimation("blond", "blond", [4], 5);
        sm.loadSprite("fantasySprites", "fantasysprites.png", 12, 8);
        sm.addAnimation("fantasySprites", "redHair", [24, 25, 26, 25], 6);
        sm.loadSprite("crops", "crops.png", 12, 8);
        sm.addAnimation("crops", "turnip0", [0]);
        sm.addAnimation("crops", "turnip1", [1]);
        sm.addAnimation("crops", "turnip2", [2]);
        sm.addAnimation("crops", "corn0", [30]);
        sm.addAnimation("crops", "corn1", [31]);
        sm.addAnimation("crops", "corn2", [32]);
        sm.addAnimation("crops", "wheat0", [33]);
        sm.addAnimation("crops", "wheat1", [34]);
        sm.addAnimation("crops", "wheat2", [35]);
        sm.addAnimation("crops", "pumpkin0", [54]);
        sm.addAnimation("crops", "pumpkin1", [55]);
        sm.addAnimation("crops", "pumpkin2", [56]);
        sm.loadSprite("scrops", "scrops.png", 24, 23);
        sm.addAnimation("scrops", "onion0", [0]);
        sm.addAnimation("scrops", "onion1", [1]);
        sm.addAnimation("scrops", "onion2", [2]);
        sm.addAnimation("scrops", "onion3", [3]);
        sm.addAnimation("scrops", "onion4", [4]);
        sm.addAnimation("scrops", "onion5", [5]);
        sm.addAnimation("scrops", "onion", [6]);
        var cn = 24 * 8 + 18;
        sm.addAnimation("scrops", "corn", [cn]);
        sm.loadSprite("victorian", "victoriansprites.png", 12, 8);
        sm.addAnimation("victorian", "bluecloak", [24]);
        sm.addAnimation("victorian", "bluecloakwalk", [24, 25, 26, 25], 5);
        cn = 12 * 6;
        sm.addAnimation("victorian", "grey", [cn], 5);
        sm.addAnimation("victorian", "greyWalk", [cn, cn + 1, cn + 2, cn + 1], 5);
        cn = 8 * 4;
        sm.loadSprite("fireball", "fireball.png", 8, 8);
        sm.addAnimation("fireball", "fireball", [cn, cn + 1, cn + 2, cn + 3, cn + 4, cn + 5, cn + 6, cn + 7]);
        sm.loadSprite("tilesetcrops", "tilesets/submission_daneeklu/tilesets/plants.png", 9, 6);
        cn = 6;
        sm.addAnimation("tilesetcrops", "tomato0", [cn + 0]);
        sm.addAnimation("tilesetcrops", "tomato1", [cn + 9]);
        sm.addAnimation("tilesetcrops", "tomato2", [cn + 18]);
        sm.addAnimation("tilesetcrops", "tomato3", [cn + 27]);
        sm.addAnimation("tilesetcrops", "tomato4", [cn + 36]);
        return sm;
    }
    exports_38("populateSpriteManager", populateSpriteManager);
    function buildSprites(game) {
        populateSpriteManager(game.spriteManager);
    }
    exports_38("buildSprites", buildSprites);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entities/player-entity", ["engine/entity/entity", "builders/build-components"], function (exports_39, context_39) {
    "use strict";
    var entity_4, build_components_3, PlayerEntity;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [
            function (entity_4_1) {
                entity_4 = entity_4_1;
            },
            function (build_components_3_1) {
                build_components_3 = build_components_3_1;
            }
        ],
        execute: function () {
            PlayerEntity = (function (_super) {
                __extends(PlayerEntity, _super);
                function PlayerEntity(componentFactory) {
                    var _this = _super.call(this, componentFactory) || this;
                    var animation = _this.addComponent("animation");
                    var position = _this.addComponent("position");
                    var wasd = _this.addComponent("wasd");
                    var inventory = _this.addComponent("inventory");
                    var placeItem = _this.addComponent("placeItem");
                    var cropHarvester;
                    cropHarvester = _this.addComponent("cropHarvester");
                    var sprite = "blond";
                    var walkSprite = "blondWalk";
                    animation.setSprite(sprite);
                    wasd.sprite = sprite;
                    wasd.walkSprite = walkSprite;
                    position.width = 70;
                    return _this;
                }
                PlayerEntity.prototype.handleEvents = function (events) {
                };
                PlayerEntity.create = function () {
                    var cf = build_components_3.createComponentFactory();
                    var entity = new PlayerEntity(cf);
                    return entity;
                };
                return PlayerEntity;
            }(entity_4.Entity));
            exports_39("PlayerEntity", PlayerEntity);
        }
    };
});
System.register("entities/first-entity", ["engine/entity/entity", "builders/build-components"], function (exports_40, context_40) {
    "use strict";
    var entity_5, build_components_4, FirstEntity;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [
            function (entity_5_1) {
                entity_5 = entity_5_1;
            },
            function (build_components_4_1) {
                build_components_4 = build_components_4_1;
            }
        ],
        execute: function () {
            FirstEntity = (function (_super) {
                __extends(FirstEntity, _super);
                function FirstEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    var position = _this.addComponent("position");
                    position.y = 9999999;
                    return _this;
                }
                FirstEntity.prototype.handleEvents = function (events) {
                };
                FirstEntity.create = function () {
                    var cf = build_components_4.createComponentFactory();
                    var entity = new FirstEntity(cf);
                    return entity;
                };
                return FirstEntity;
            }(entity_5.Entity));
            exports_40("FirstEntity", FirstEntity);
        }
    };
});
System.register("systems/render-system", ["engine/system/system", "engine/renderers/render-options", "entities/first-entity"], function (exports_41, context_41) {
    "use strict";
    var system_1, render_options_1, first_entity_1, RenderSystem;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [
            function (system_1_1) {
                system_1 = system_1_1;
            },
            function (render_options_1_1) {
                render_options_1 = render_options_1_1;
            },
            function (first_entity_1_1) {
                first_entity_1 = first_entity_1_1;
            }
        ],
        execute: function () {
            RenderSystem = (function (_super) {
                __extends(RenderSystem, _super);
                function RenderSystem(renderer, game) {
                    var _this = _super.call(this, game) || this;
                    _this.renderer = renderer;
                    return _this;
                }
                RenderSystem.create = function (game) {
                    var hr = game.renderer;
                    return new RenderSystem(hr, game);
                };
                RenderSystem.prototype.apply = function (entity) {
                    if (entity instanceof first_entity_1.FirstEntity) {
                        var player = this.game.getById(1);
                        this.centerCameraOn(player);
                    }
                    this.renderAnimationComponent(entity);
                    this.renderText(entity);
                };
                RenderSystem.prototype.renderText = function (entity) {
                    var p = entity.getComponent("position", true);
                    var text = entity.getComponent("text", true);
                    if (p == null || text == null)
                        return;
                    for (var i = 0; i < text.textPlacements.length; i++) {
                        var tp = text.textPlacements[i];
                        this.renderer.text(tp.textValue, p.x, p.y, 10);
                    }
                };
                RenderSystem.prototype.renderAnimationComponent = function (entity) {
                    var a = entity.getComponent("animation", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || p == null)
                        return;
                    var r = this.renderer;
                    var options = new render_options_1.RenderOptions();
                    options.flip = !p.faceRight;
                    options.rotate = p.rotate;
                    r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), options);
                };
                RenderSystem.prototype.centerCameraOn = function (entity) {
                    var position = entity.getComponent("position");
                    this.renderer.setOffset([position.x, position.y]);
                };
                RenderSystem.prototype.applyEvents = function () { };
                return RenderSystem;
            }(system_1.EntitySystem));
            exports_41("RenderSystem", RenderSystem);
        }
    };
});
System.register("systems/wasd-system", ["engine/system/system", "engine/events/game-event", "engine/events/EventType"], function (exports_42, context_42) {
    "use strict";
    var system_2, game_event_2, EventType_3, WasdSystem;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (system_2_1) {
                system_2 = system_2_1;
            },
            function (game_event_2_1) {
                game_event_2 = game_event_2_1;
            },
            function (EventType_3_1) {
                EventType_3 = EventType_3_1;
            }
        ],
        execute: function () {
            WasdSystem = (function (_super) {
                __extends(WasdSystem, _super);
                function WasdSystem(game) {
                    return _super.call(this, game) || this;
                }
                WasdSystem.create = function (game) {
                    var wasd = new WasdSystem(game);
                    return wasd;
                };
                WasdSystem.prototype.apply = function () { };
                WasdSystem.prototype.applyEvents = function (entity, eventManager) {
                    var events = eventManager.events;
                    var event;
                    var wasdComponent = entity.getComponent("wasd", true);
                    if (wasdComponent == null)
                        return;
                    var position = entity.getComponent("position");
                    var animation = entity.getComponent("animation");
                    var speed = wasdComponent.speed;
                    var sprite = wasdComponent.sprite;
                    var walkSprite = wasdComponent.walkSprite;
                    if (events.length > 0) {
                    }
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                        switch (event.eventName) {
                            case EventType_3.EventType.wDown:
                                animation.setSprite(walkSprite);
                                position.vy = -speed;
                                break;
                            case EventType_3.EventType.wUp:
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case EventType_3.EventType.aDown:
                                position.faceRight = false;
                                animation.setSprite(walkSprite);
                                position.vx = -speed;
                                break;
                            case EventType_3.EventType.aUp:
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case EventType_3.EventType.sDown:
                                animation.setSprite(walkSprite);
                                position.vy = speed;
                                break;
                            case EventType_3.EventType.sUp:
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case EventType_3.EventType.dDown:
                                position.faceRight = true;
                                animation.setSprite(walkSprite);
                                position.vx = speed;
                                break;
                            case EventType_3.EventType.dUp:
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case EventType_3.EventType.spaceUp:
                                var ge = game_event_2.GameEvent.create(EventType_3.EventType.fireProjectile);
                                entity.emit(ge);
                                break;
                            case EventType_3.EventType.spaceUp:
                                break;
                            case EventType_3.EventType.fUp:
                                var cropHarvester = void 0;
                                try {
                                    cropHarvester = entity.getComponent("cropHarvester");
                                }
                                catch (_a) {
                                    return;
                                }
                                cropHarvester.startHarvest();
                                break;
                            case EventType_3.EventType.pUp:
                                console.log(this.game);
                                break;
                            case EventType_3.EventType.iUp:
                                var inventory = void 0;
                                inventory = entity.getComponent("inventory", true);
                                inventory.inventoryToString();
                                break;
                        }
                    }
                };
                return WasdSystem;
            }(system_2.EntitySystem));
            exports_42("WasdSystem", WasdSystem);
        }
    };
});
System.register("entities/projectile-entity", ["engine/entity/entity", "builders/build-components"], function (exports_43, context_43) {
    "use strict";
    var entity_6, build_components_5, ProjectileEntity;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [
            function (entity_6_1) {
                entity_6 = entity_6_1;
            },
            function (build_components_5_1) {
                build_components_5 = build_components_5_1;
            }
        ],
        execute: function () {
            ProjectileEntity = (function (_super) {
                __extends(ProjectileEntity, _super);
                function ProjectileEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    var animation = _this.addComponent("animation");
                    var position = _this.addComponent("position");
                    _this.addComponent("projectile");
                    animation.setSprite("fireball");
                    return _this;
                }
                ProjectileEntity.prototype.handleEvents = function (events) {
                };
                ;
                ProjectileEntity.create = function () {
                    var cf = build_components_5.createComponentFactory();
                    var pe = new ProjectileEntity(cf);
                    return pe;
                };
                return ProjectileEntity;
            }(entity_6.Entity));
            exports_43("ProjectileEntity", ProjectileEntity);
        }
    };
});
System.register("systems/crop-system", ["engine/system/system", "engine/entity/entity", "engine/events/EventType"], function (exports_44, context_44) {
    "use strict";
    var system_3, entity_7, EventType_4, CropSystem;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [
            function (system_3_1) {
                system_3 = system_3_1;
            },
            function (entity_7_1) {
                entity_7 = entity_7_1;
            },
            function (EventType_4_1) {
                EventType_4 = EventType_4_1;
            }
        ],
        execute: function () {
            CropSystem = (function (_super) {
                __extends(CropSystem, _super);
                function CropSystem(game) {
                    return _super.call(this, game) || this;
                }
                CropSystem.prototype.apply = function (entity) {
                    var a = entity.getComponent("animation", true);
                    var c = entity.getComponent("crop", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || c == null) {
                        return;
                    }
                    if (c.timeSinceGrowth == 0 || c.timeSinceGrowth == 1) {
                        a.setSprite(c.growthSprites[c.growthStage]);
                    }
                };
                ;
                CropSystem.prototype.applyEvents = function (entity) {
                    var c = entity.getComponent("crop", true);
                    if (c == null)
                        return;
                    var event;
                    for (var i = 0; i < entity.targetedEvents.length; i++) {
                        event = entity.targetedEvents[i];
                        this.handleEvent(event, entity);
                    }
                };
                ;
                CropSystem.create = function (game) {
                    return new CropSystem(game);
                };
                ;
                CropSystem.prototype.handleCollision = function (event, entity) {
                    if (!(event.eventData instanceof entity_7.Entity)) {
                        return;
                    }
                    var collidedEntity = event.eventData;
                    var cropHarvester;
                    try {
                        cropHarvester = collidedEntity.getComponent("cropHarvester");
                    }
                    catch (_a) {
                        return;
                    }
                    if (!cropHarvester.harvesting) {
                        return;
                    }
                    var crop = entity.getComponent("crop");
                    var playerInventory;
                    playerInventory = collidedEntity.getComponent("inventory");
                    if (crop.isGrown()) {
                        playerInventory.addItem(crop.cropName, 1);
                    }
                    this.game.destroy(entity);
                };
                CropSystem.prototype.handleEvent = function (event, entity) {
                    switch (event.eventName) {
                        case EventType_4.EventType.collision:
                            this.handleCollision(event, entity);
                            break;
                    }
                };
                return CropSystem;
            }(system_3.EntitySystem));
            exports_44("CropSystem", CropSystem);
        }
    };
});
System.register("systems/collision-system", ["engine/system/system", "entities/first-entity", "entities/projectile-entity", "engine/events/game-event", "engine/events/EventType"], function (exports_45, context_45) {
    "use strict";
    var system_4, first_entity_2, projectile_entity_1, game_event_3, EventType_5, CollisionSystem;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
            function (system_4_1) {
                system_4 = system_4_1;
            },
            function (first_entity_2_1) {
                first_entity_2 = first_entity_2_1;
            },
            function (projectile_entity_1_1) {
                projectile_entity_1 = projectile_entity_1_1;
            },
            function (game_event_3_1) {
                game_event_3 = game_event_3_1;
            },
            function (EventType_5_1) {
                EventType_5 = EventType_5_1;
            }
        ],
        execute: function () {
            CollisionSystem = (function (_super) {
                __extends(CollisionSystem, _super);
                function CollisionSystem(game) {
                    var _this = _super.call(this, game) || this;
                    _this.movingEntities = {};
                    _this.colliding = {};
                    _this.numCollisions = 0;
                    return _this;
                }
                CollisionSystem.prototype.distance = function (e1, e2) {
                    var p1 = e1.getComponent("position");
                    var p2 = e2.getComponent("position");
                    var dx = p2.x - p1.x;
                    var dy = p2.y - p1.y;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                CollisionSystem.prototype.checkCol = function (e1, e2) {
                    var distance = this.distance(e1, e2);
                    var p1 = e1.getComponent("position");
                    var mask = ((p1.width) + (p1.height)) / 4;
                    var collision = distance < mask;
                    return collision;
                };
                CollisionSystem.prototype.hashCollision = function (e1, e2) {
                    var _a;
                    if (e1.id > e2.id) {
                        _a = [e2, e1], e1 = _a[0], e2 = _a[1];
                    }
                    return e1.id.toString() + ":" + e2.id.toString();
                };
                CollisionSystem.prototype.addCollision = function (e1, e2) {
                    var hash;
                    hash = this.hashCollision(e1, e2);
                    if (!(hash in this.colliding)) {
                        this.colliding[hash] = [e1, e2];
                        this.numCollisions++;
                    }
                };
                CollisionSystem.prototype.removeCollision = function (e1, e2) {
                    var hash = this.hashCollision(e1, e2);
                    if (hash in this.colliding) {
                        delete this.colliding[hash];
                        this.numCollisions--;
                    }
                };
                CollisionSystem.prototype.emitCollision = function (e1, e2) {
                    e1.emit(game_event_3.GameEvent.create(EventType_5.EventType.collision, e2));
                    e2.emit(game_event_3.GameEvent.create(EventType_5.EventType.collision, e1));
                };
                CollisionSystem.prototype.removeMovingEntity = function (id) {
                    delete this.movingEntities[id];
                };
                CollisionSystem.prototype.apply = function (entity) {
                    if (entity instanceof first_entity_2.FirstEntity) {
                        var collidingEntities;
                        for (var key in this.colliding) {
                            collidingEntities = this.colliding[key];
                            collision = this.checkCol(collidingEntities[0], collidingEntities[1]);
                            if (collision && !collidingEntities[0].destroyed && !collidingEntities[1].destroyed) {
                                this.emitCollision(collidingEntities[0], collidingEntities[1]);
                            }
                            else {
                                this.removeCollision(collidingEntities[0], collidingEntities[1]);
                            }
                        }
                        for (var id in this.movingEntities) {
                            if (this.movingEntities[id].destroyed) {
                                this.removeMovingEntity(parseInt(id));
                            }
                        }
                    }
                    var position = entity.getComponent("position");
                    var collision;
                    var entityTarget;
                    for (var id in this.movingEntities) {
                        entityTarget = this.movingEntities[id];
                        collision = this.checkCol(entity, entityTarget);
                        if (collision) {
                            this.addCollision(entity, entityTarget);
                        }
                    }
                    if (position.moved) {
                        this.movingEntities[entity.id] = entity;
                    }
                    else {
                        this.removeMovingEntity(entity.id);
                    }
                    if (entity instanceof projectile_entity_1.ProjectileEntity) {
                        var position_1 = entity.getComponent("position");
                    }
                };
                ;
                CollisionSystem.prototype.applyEvents = function (entity) {
                };
                CollisionSystem.create = function (game) {
                    return new CollisionSystem(game);
                };
                return CollisionSystem;
            }(system_4.EntitySystem));
            exports_45("CollisionSystem", CollisionSystem);
        }
    };
});
System.register("systems/projectile-system", ["engine/system/system", "entities/projectile-entity", "engine/events/game-event", "engine/events/EventType"], function (exports_46, context_46) {
    "use strict";
    var system_5, projectile_entity_2, game_event_4, EventType_6, ProjectileSystem;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (system_5_1) {
                system_5 = system_5_1;
            },
            function (projectile_entity_2_1) {
                projectile_entity_2 = projectile_entity_2_1;
            },
            function (game_event_4_1) {
                game_event_4 = game_event_4_1;
            },
            function (EventType_6_1) {
                EventType_6 = EventType_6_1;
            }
        ],
        execute: function () {
            ProjectileSystem = (function (_super) {
                __extends(ProjectileSystem, _super);
                function ProjectileSystem(game) {
                    return _super.call(this, game) || this;
                }
                ProjectileSystem.prototype.apply = function (entity) {
                    var position = entity.getComponent("position", true);
                    var projectileComponent = entity.getComponent("projectile", true);
                    if (position == null)
                        return;
                    if (projectileComponent == null)
                        return;
                    projectileComponent.lifeSpan--;
                    if (projectileComponent.lifeSpan == 0) {
                        this.game.destroy(entity);
                    }
                };
                ProjectileSystem.prototype.fireProjectile = function (entity, vx, vy) {
                    if (vx === void 0) { vx = null; }
                    if (vy === void 0) { vy = null; }
                    var projectile = this.game.addEntity("projectile");
                    var projectileComponent = projectile.getComponent("projectile");
                    var projPosition = projectile.getComponent("position");
                    var position = entity.getComponent("position");
                    projectileComponent.shooterId = entity.id;
                    projPosition.x = position.x;
                    projPosition.y = position.y;
                    if (vx !== null && vy !== null) {
                        projPosition.vx = vx;
                        projPosition.vy = vy;
                    }
                    else {
                        projPosition.vx = position.faceX;
                        projPosition.vy = position.faceY;
                    }
                    projPosition.faceRight = position.faceRight;
                };
                ProjectileSystem.prototype.applyEvents = function (entity) {
                    var events = entity.targetedEvents;
                    var event;
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                        switch (event.eventName) {
                            case EventType_6.EventType.fireProjectile:
                                if (event.eventData !== null) {
                                    this.fireProjectile(entity, event.eventData.vx, event.eventData.vy);
                                }
                                else {
                                    this.fireProjectile(entity);
                                }
                                break;
                            case EventType_6.EventType.collision:
                                var isProj = entity instanceof projectile_entity_2.ProjectileEntity;
                                if (!isProj)
                                    break;
                                var projectile = entity.getComponent("projectile");
                                var isShooter = projectile.shooterId === event.eventData.id;
                                var isSelf = entity.id === event.eventData.id;
                                var isProjectile = event.eventData instanceof projectile_entity_2.ProjectileEntity;
                                var collidedId = event.eventData.id;
                                var collided = this.game.getById(collidedId);
                                if (!isShooter && !isSelf && !isProjectile) {
                                    var ge = game_event_4.GameEvent.create(EventType_6.EventType.inflictDamage);
                                    collided.emit(ge, true);
                                    this.game.destroy(entity);
                                }
                                break;
                        }
                    }
                };
                ProjectileSystem.create = function (game) {
                    return new ProjectileSystem(game);
                };
                return ProjectileSystem;
            }(system_5.EntitySystem));
            exports_46("ProjectileSystem", ProjectileSystem);
        }
    };
});
System.register("systems/health-system", ["engine/system/system", "engine/events/EventType"], function (exports_47, context_47) {
    "use strict";
    var system_6, EventType_7, HealthSystem;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (system_6_1) {
                system_6 = system_6_1;
            },
            function (EventType_7_1) {
                EventType_7 = EventType_7_1;
            }
        ],
        execute: function () {
            HealthSystem = (function (_super) {
                __extends(HealthSystem, _super);
                function HealthSystem(game) {
                    return _super.call(this, game) || this;
                }
                HealthSystem.prototype.apply = function (entity) {
                };
                HealthSystem.prototype.applyEvents = function (entity) {
                    var health = entity.getComponent("health", true);
                    if (health == null)
                        return;
                    var events = entity.targetedEvents;
                    var event;
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                        switch (event.eventName) {
                            case EventType_7.EventType.inflictDamage:
                                this.handleDamage(entity, event);
                                break;
                        }
                    }
                    entity.targetedEvents = [];
                };
                HealthSystem.prototype.handleDamage = function (entity, event) {
                    if (event.eventData === null) {
                        event.eventData = { damage: 50 };
                    }
                    var health = entity.getComponent("health", true);
                    health.health -= event.eventData.damage;
                    if (health.health < 0) {
                        this.game.destroy(entity);
                    }
                };
                HealthSystem.create = function (game) {
                    return new HealthSystem(game);
                };
                return HealthSystem;
            }(system_6.EntitySystem));
            exports_47("HealthSystem", HealthSystem);
        }
    };
});
System.register("systems/position-system", ["engine/system/system", "engine/events/EventType"], function (exports_48, context_48) {
    "use strict";
    var system_7, EventType_8, PositionSystem;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [
            function (system_7_1) {
                system_7 = system_7_1;
            },
            function (EventType_8_1) {
                EventType_8 = EventType_8_1;
            }
        ],
        execute: function () {
            PositionSystem = (function (_super) {
                __extends(PositionSystem, _super);
                function PositionSystem(game) {
                    return _super.call(this, game) || this;
                }
                PositionSystem.create = function (game) {
                    return new PositionSystem(game);
                };
                PositionSystem.prototype.apply = function (entity) {
                };
                PositionSystem.prototype.applyEvents = function (entity) {
                    var position = entity.getComponent("position");
                    if (position === null)
                        return;
                    var events = entity.targetedEvents;
                    var event;
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                        switch (event.eventName) {
                            case EventType_8.EventType.changeVelocity:
                                if ("vx" in event.eventData) {
                                    position.vx = event.eventData.vx;
                                }
                                if ("vy" in event.eventData) {
                                    position.vy = event.eventData.vy;
                                }
                                break;
                        }
                    }
                };
                return PositionSystem;
            }(system_7.EntitySystem));
            exports_48("PositionSystem", PositionSystem);
        }
    };
});
System.register("systems/neural-fight-system", ["engine/system/system"], function (exports_49, context_49) {
    "use strict";
    var system_8, NeuralFightSystem;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (system_8_1) {
                system_8 = system_8_1;
            }
        ],
        execute: function () {
            NeuralFightSystem = (function (_super) {
                __extends(NeuralFightSystem, _super);
                function NeuralFightSystem(game) {
                    return _super.call(this, game) || this;
                }
                NeuralFightSystem.create = function (game) {
                    return new NeuralFightSystem(game);
                };
                NeuralFightSystem.prototype.apply = function (entity) {
                    var neural = entity.getComponent("neural", true);
                    if (neural == null) {
                        return;
                    }
                };
                NeuralFightSystem.prototype.applyEvents = function (entity) {
                    var events = entity.targetedEvents;
                    var event;
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                    }
                };
                return NeuralFightSystem;
            }(system_8.EntitySystem));
            exports_49("NeuralFightSystem", NeuralFightSystem);
        }
    };
});
System.register("entities/villager-entity", ["engine/entity/entity", "builders/build-components"], function (exports_50, context_50) {
    "use strict";
    var entity_8, build_components_6, VillagerEntity;
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [
            function (entity_8_1) {
                entity_8 = entity_8_1;
            },
            function (build_components_6_1) {
                build_components_6 = build_components_6_1;
            }
        ],
        execute: function () {
            VillagerEntity = (function (_super) {
                __extends(VillagerEntity, _super);
                function VillagerEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    var animation = _this.addComponent("animation");
                    var position = _this.addComponent("position");
                    var fight = _this.addComponent("fight");
                    var health = _this.addComponent("health");
                    var neural = _this.addComponent("neural");
                    position.width = 70;
                    return _this;
                }
                VillagerEntity.prototype.handleEvents = function (events) {
                };
                VillagerEntity.create = function () {
                    var cf = build_components_6.createComponentFactory();
                    var entity = new VillagerEntity(cf);
                    return entity;
                };
                return VillagerEntity;
            }(entity_8.Entity));
            exports_50("VillagerEntity", VillagerEntity);
        }
    };
});
System.register("builders/entity-builder", ["entities/player-entity", "entities/villager-entity", "entities/crop-entity", "entities/first-entity", "entities/projectile-entity", "entities/inventory-item-entity"], function (exports_51, context_51) {
    "use strict";
    var player_entity_1, villager_entity_1, crop_entity_1, first_entity_3, projectile_entity_3, inventory_item_entity_1;
    var __moduleName = context_51 && context_51.id;
    function buildEntities(game) {
        game.registerEntity("player", player_entity_1.PlayerEntity);
        game.registerEntity("villager", villager_entity_1.VillagerEntity);
        game.registerEntity("crop", crop_entity_1.CropEntity);
        game.registerEntity("first", first_entity_3.FirstEntity);
        game.registerEntity("projectile", projectile_entity_3.ProjectileEntity);
        game.registerEntity("inventoryItem", inventory_item_entity_1.InventoryItemEntity);
    }
    exports_51("buildEntities", buildEntities);
    return {
        setters: [
            function (player_entity_1_1) {
                player_entity_1 = player_entity_1_1;
            },
            function (villager_entity_1_1) {
                villager_entity_1 = villager_entity_1_1;
            },
            function (crop_entity_1_1) {
                crop_entity_1 = crop_entity_1_1;
            },
            function (first_entity_3_1) {
                first_entity_3 = first_entity_3_1;
            },
            function (projectile_entity_3_1) {
                projectile_entity_3 = projectile_entity_3_1;
            },
            function (inventory_item_entity_1_1) {
                inventory_item_entity_1 = inventory_item_entity_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("systems/fight-system", ["engine/system/system", "engine/events/game-event", "engine/events/EventType"], function (exports_52, context_52) {
    "use strict";
    var system_9, game_event_5, EventType_9, FightSystem;
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (system_9_1) {
                system_9 = system_9_1;
            },
            function (game_event_5_1) {
                game_event_5 = game_event_5_1;
            },
            function (EventType_9_1) {
                EventType_9 = EventType_9_1;
            }
        ],
        execute: function () {
            FightSystem = (function (_super) {
                __extends(FightSystem, _super);
                function FightSystem(game) {
                    return _super.call(this, game) || this;
                }
                FightSystem.prototype.get_entity_direction = function (origin, destination) {
                    var position1 = origin.getComponent("position");
                    var position2 = destination.getComponent("position");
                    var dx = position2.x - position1.x;
                    var dy = position2.y - position1.y;
                    var hypotenuse = Math.sqrt(dx * dx + dy * dy);
                    dx /= hypotenuse;
                    dy /= hypotenuse;
                    return {
                        dx: dx,
                        dy: dy
                    };
                };
                FightSystem.prototype.hypotenuse = function (e1, e2) {
                    var position1 = e1.getComponent("position");
                    var position2 = e2.getComponent("position");
                    var dx = position2.x - position1.x;
                    var dy = position2.y - position1.y;
                    var hypotenuse = Math.sqrt(dx * dx + dy * dy);
                    return hypotenuse;
                };
                FightSystem.prototype.apply = function (entity) {
                    var fight = entity.getComponent("fight", true);
                    if (fight == null)
                        return;
                    var position = entity.getComponent("position");
                    if (!fight.attack)
                        return;
                    var hypotenuse = this.hypotenuse(entity, fight.target);
                    var direction = this.get_entity_direction(entity, fight.target);
                    if (hypotenuse > fight.range) {
                        direction.dx *= fight.maxSpeed;
                        direction.dy *= fight.maxSpeed;
                        position.vx = direction.dx;
                        position.vy = direction.dy;
                    }
                    else {
                        position.vx = 0;
                        position.vy = 0;
                        if (fight.canFire()) {
                            entity.emit(game_event_5.GameEvent.create(EventType_9.EventType.fireProjectile, { vx: direction.dx * 10, vy: direction.dy * 10 }));
                            fight.reloadTimer--;
                        }
                    }
                };
                ;
                FightSystem.prototype.applyEvents = function (entity) {
                };
                FightSystem.create = function (game) {
                    return new FightSystem(game);
                };
                ;
                return FightSystem;
            }(system_9.EntitySystem));
            exports_52("FightSystem", FightSystem);
        }
    };
});
System.register("systems/place-item-system", ["engine/system/system"], function (exports_53, context_53) {
    "use strict";
    var system_10, PlaceItemSystem;
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (system_10_1) {
                system_10 = system_10_1;
            }
        ],
        execute: function () {
            PlaceItemSystem = (function (_super) {
                __extends(PlaceItemSystem, _super);
                function PlaceItemSystem(game) {
                    var _this = _super.call(this, game) || this;
                    _this.tileSize = 50;
                    return _this;
                }
                PlaceItemSystem.prototype.apply = function (entity) {
                    var placeItem;
                    try {
                        placeItem = entity.getComponent("placeItem");
                    }
                    catch (_a) {
                        return;
                    }
                    var requests = placeItem.placeItemRequests;
                    for (var i = 0; i < requests.length; i++) {
                        var placeItemRequest = requests[i];
                        if (placeItemRequest.relative) {
                            var position = void 0;
                            try {
                                position = entity.getComponent("position");
                                placeItemRequest.coordinates[0] += position.x;
                                placeItemRequest.coordinates[1] += position.y;
                            }
                            catch (_b) { }
                        }
                        this.placeItem(placeItemRequest);
                    }
                    placeItem.placeItemRequests = [];
                };
                PlaceItemSystem.prototype.applyEvents = function () {
                };
                PlaceItemSystem.prototype.realCoordinatesToTileCoordinates = function (coordinates) {
                    var _this = this;
                    var tileCoords = coordinates.map(function (coordinate) {
                        return (Math.floor(coordinate / _this.tileSize)) * _this.tileSize;
                    });
                    return tileCoords;
                };
                PlaceItemSystem.prototype.placeItem = function (placeItemRequest) {
                    var realCoordinates = placeItemRequest.coordinates;
                    var tileCoordinates = this.realCoordinatesToTileCoordinates(realCoordinates);
                    var x = tileCoordinates[0];
                    var y = tileCoordinates[1];
                    var newEntity;
                    newEntity = this.game.addEntity(placeItemRequest.entityName);
                    var position = newEntity.getComponent("position", true);
                    if (position == null) {
                        return;
                    }
                    position.x = x;
                    position.y = y;
                    placeItemRequest.successCallback(newEntity);
                    return newEntity;
                };
                PlaceItemSystem.create = function (game) {
                    return new PlaceItemSystem(game);
                };
                return PlaceItemSystem;
            }(system_10.EntitySystem));
            exports_53("PlaceItemSystem", PlaceItemSystem);
        }
    };
});
System.register("systems/inventory-system", ["engine/system/system"], function (exports_54, context_54) {
    "use strict";
    var system_11, InventorySystem;
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [
            function (system_11_1) {
                system_11 = system_11_1;
            }
        ],
        execute: function () {
            InventorySystem = (function (_super) {
                __extends(InventorySystem, _super);
                function InventorySystem(game) {
                    return _super.call(this, game) || this;
                }
                InventorySystem.create = function (game) {
                    return new InventorySystem(game);
                };
                InventorySystem.prototype.apply = function (entity) {
                    var inventory = entity.getComponent("inventory", true);
                    var entityPosition = entity.getComponent("position", true);
                    if (inventory == null)
                        return;
                    if (entityPosition == null)
                        return;
                    if (inventory.inventoryItemEntities.length == 0) {
                        for (var i = 0; i < 10; i++) {
                            inventory
                                .inventoryItemEntities
                                .push(this.game.addEntity("inventoryItem"));
                        }
                    }
                    var itemSlots = inventory.getItems();
                    for (var i = 0; i < inventory.inventoryItemEntities.length; i++) {
                        var inventoryItem = void 0;
                        var itemPosition = void 0;
                        inventoryItem = inventory.inventoryItemEntities[i];
                        itemPosition = inventoryItem.getComponent("position");
                        if (itemPosition == null) {
                            console.log("Warning: inventory item lost position component");
                            continue;
                        }
                        itemPosition.x = entityPosition.x - 4 * 100 - 50 + i * 100;
                        itemPosition.y = entityPosition.y + 400;
                        itemPosition.x -= entityPosition.vx;
                        itemPosition.y -= entityPosition.vy;
                        var text = inventoryItem.getComponent("text");
                        text.setText(itemSlots[i].itemQuantity.toString());
                    }
                };
                InventorySystem.prototype.applyEvents = function (entity) {
                };
                return InventorySystem;
            }(system_11.EntitySystem));
            exports_54("InventorySystem", InventorySystem);
        }
    };
});
System.register("game", ["systems/render-system", "systems/wasd-system", "systems/crop-system", "systems/collision-system", "systems/projectile-system", "systems/health-system", "systems/position-system", "systems/neural-fight-system", "engine/game", "builders/sprite-builder", "builders/entity-builder", "builders/build-components", "systems/place-item-system", "systems/inventory-system"], function (exports_55, context_55) {
    "use strict";
    var render_system_1, wasd_system_1, crop_system_1, collision_system_1, projectile_system_1, health_system_1, position_system_1, neural_fight_system_1, game_1, sprite_builder_1, entity_builder_1, build_components_7, place_item_system_1, inventory_system_1;
    var __moduleName = context_55 && context_55.id;
    function createGame() {
        var game = game_1.Game.create();
        game.addSystem(render_system_1.RenderSystem.create(game));
        game.addSystem(wasd_system_1.WasdSystem.create(game));
        game.addSystem(crop_system_1.CropSystem.create(game));
        game.addSystem(collision_system_1.CollisionSystem.create(game));
        game.addSystem(projectile_system_1.ProjectileSystem.create(game));
        game.addSystem(health_system_1.HealthSystem.create(game));
        game.addSystem(position_system_1.PositionSystem.create(game));
        game.addSystem(neural_fight_system_1.NeuralFightSystem.create(game));
        game.addSystem(place_item_system_1.PlaceItemSystem.create(game));
        game.addSystem(inventory_system_1.InventorySystem.create(game));
        sprite_builder_1.buildSprites(game);
        entity_builder_1.buildEntities(game);
        build_components_7.buildComponents(game);
        return game;
    }
    function startGame() {
        var game = createGame();
        game.entityFactory.componentFactory.createComponent("animation");
        game.addEntity("first");
        var player = game.addEntity("player");
        var pc = player.getComponent("position");
        var ac = player.getComponent("animation");
        pc.x = 300;
        pc.y = 380;
        var villager = game.addEntity("villager");
        var component = villager.getComponent("position");
        var fight = villager.getComponent("fight");
        ac = villager.getComponent("animation");
        component.x = 150;
        component.y = 300;
        component.vx = 0;
        fight.attack = true;
        var v2 = game.addEntity("villager");
        fight.target = v2;
        var component = v2.getComponent("position");
        ac = v2.getComponent("animation");
        fight = v2.getComponent("fight");
        component.x = 600;
        component.y = 800;
        component.vx = 0;
        fight.target = villager;
        fight.attack = true;
        var projectile = game.addEntity("projectile");
        pc = projectile.getComponent("position");
        pc.x = 100;
        pc.y = 500;
        pc.vx = 0;
        placeField(350, 300, "wheat", 50);
        placeField(650, 300, "corn", 50);
        placeField(350, 600, "turnip", 50);
        placeField(650, 600, "onion", 50);
        function placeField(x, y, cropName, d, width) {
            if (d === void 0) { d = 50; }
            if (width === void 0) { width = 5; }
            var crop;
            var cc;
            for (var i = 0; i < width; i++) {
                for (var i2 = 0; i2 < width; i2++) {
                    crop = addCrop(x + i * d, y + i2 * d);
                    cc = crop.getComponent("crop");
                    cc.setCrop(cropName);
                }
            }
        }
        function addCrop(x, y) {
            var crop = game.addEntity("crop");
            var component = crop.getComponent("position");
            component.x = x;
            component.y = y;
            return crop;
        }
        var intervalId = game.start();
    }
    exports_55("startGame", startGame);
    return {
        setters: [
            function (render_system_1_1) {
                render_system_1 = render_system_1_1;
            },
            function (wasd_system_1_1) {
                wasd_system_1 = wasd_system_1_1;
            },
            function (crop_system_1_1) {
                crop_system_1 = crop_system_1_1;
            },
            function (collision_system_1_1) {
                collision_system_1 = collision_system_1_1;
            },
            function (projectile_system_1_1) {
                projectile_system_1 = projectile_system_1_1;
            },
            function (health_system_1_1) {
                health_system_1 = health_system_1_1;
            },
            function (position_system_1_1) {
                position_system_1 = position_system_1_1;
            },
            function (neural_fight_system_1_1) {
                neural_fight_system_1 = neural_fight_system_1_1;
            },
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (sprite_builder_1_1) {
                sprite_builder_1 = sprite_builder_1_1;
            },
            function (entity_builder_1_1) {
                entity_builder_1 = entity_builder_1_1;
            },
            function (build_components_7_1) {
                build_components_7 = build_components_7_1;
            },
            function (place_item_system_1_1) {
                place_item_system_1 = place_item_system_1_1;
            },
            function (inventory_system_1_1) {
                inventory_system_1 = inventory_system_1_1;
            }
        ],
        execute: function () {
            (function () {
                startGame();
            })();
        }
    };
});
//# sourceMappingURL=app.js.map