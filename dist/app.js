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
System.register("components/component", [], function (exports_1, context_1) {
    "use strict";
    var Component;
    var __moduleName = context_1 && context_1.id;
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
            exports_1("Component", Component);
        }
    };
});
System.register("components/position-component", ["components/component"], function (exports_2, context_2) {
    "use strict";
    var component_1, PositionComponent;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            PositionComponent = (function (_super) {
                __extends(PositionComponent, _super);
                function PositionComponent() {
                    var _this = _super.call(this, "position") || this;
                    _this.x = 0;
                    _this.y = 0;
                    _this.vx = 0;
                    _this.vy = 0;
                    _this.width = 100;
                    _this.height = 100;
                    _this.faceRight = true;
                    return _this;
                }
                PositionComponent.prototype.update = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                };
                PositionComponent.create = function () {
                    return new PositionComponent();
                };
                return PositionComponent;
            }(component_1.Component));
            exports_2("PositionComponent", PositionComponent);
        }
    };
});
System.register("sprite-manager", [], function (exports_3, context_3) {
    "use strict";
    var HtmlSprite, SpriteAnimation, HtmlSpriteManager;
    var __moduleName = context_3 && context_3.id;
    function createSpriteManager() {
        var sm = new HtmlSpriteManager();
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
        return sm;
    }
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
            exports_3("SpriteAnimation", SpriteAnimation);
            HtmlSpriteManager = (function () {
                function HtmlSpriteManager(spriteDir) {
                    if (spriteDir === void 0) { spriteDir = "../sprites/"; }
                    this.sprites = {};
                    this.animations = {};
                }
                HtmlSpriteManager.prototype.createSprite = function (fileName, widthImgs, heightImgs) {
                    return new HtmlSprite(fileName, widthImgs, heightImgs);
                };
                HtmlSpriteManager.prototype.addSprite = function (spriteName, sprite) {
                    this.sprites[spriteName] = sprite;
                };
                HtmlSpriteManager.prototype.getSprite = function (spriteName) {
                    if (!(spriteName in this.sprites)) {
                        throw "sprite " + spriteName + " does not exist";
                    }
                    return this.sprites[spriteName];
                };
                HtmlSpriteManager.prototype.loadSprite = function (spriteName, fileName, widthImgs, heightImgs) {
                    var sprite = this.createSprite(fileName, widthImgs, heightImgs);
                    this.addSprite(spriteName, sprite);
                };
                HtmlSpriteManager.prototype.addAnimation = function (spriteName, animationName, spriteNumbers, delay) {
                    if (delay === void 0) { delay = 1; }
                    var sa = SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
                    if (!(spriteName in this.sprites)) {
                        throw "error adding animation "
                            + animationName
                            + ". spriteName "
                            + spriteName
                            + "doesn't exist. sprites must be added through addSprite method first";
                    }
                    this.animations[animationName] = sa;
                };
                HtmlSpriteManager.prototype.getAnimation = function (animationName) {
                    return this.animations[animationName];
                };
                HtmlSpriteManager.create = function () {
                    return createSpriteManager();
                };
                return HtmlSpriteManager;
            }());
            exports_3("HtmlSpriteManager", HtmlSpriteManager);
        }
    };
});
System.register("components/animation-component", ["components/component", "sprite-manager"], function (exports_4, context_4) {
    "use strict";
    var component_2, sprite_manager_1, AnimationComponent;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (component_2_1) {
                component_2 = component_2_1;
            },
            function (sprite_manager_1_1) {
                sprite_manager_1 = sprite_manager_1_1;
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
                    var spriteManager = sprite_manager_1.HtmlSpriteManager.create();
                    var ac = new AnimationComponent("blondWalk", 2, spriteManager);
                    return ac;
                };
                return AnimationComponent;
            }(component_2.Component));
            exports_4("AnimationComponent", AnimationComponent);
        }
    };
});
System.register("components/wasd-component", ["components/component"], function (exports_5, context_5) {
    "use strict";
    var component_3, WasdComponent;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (component_3_1) {
                component_3 = component_3_1;
            }
        ],
        execute: function () {
            WasdComponent = (function (_super) {
                __extends(WasdComponent, _super);
                function WasdComponent() {
                    return _super.call(this, "wasd") || this;
                }
                WasdComponent.prototype.update = function () { };
                WasdComponent.create = function () {
                    return new WasdComponent();
                };
                return WasdComponent;
            }(component_3.Component));
            exports_5("WasdComponent", WasdComponent);
        }
    };
});
System.register("components/crop-component", ["components/component"], function (exports_6, context_6) {
    "use strict";
    var component_4, CropComponent;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (component_4_1) {
                component_4 = component_4_1;
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
                    _this.setCrop("wheat");
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
                    switch (cropName) {
                        case "turnip":
                            this.growthSprites = ["turnip0", "turnip1", "turnip2"];
                            this.growthLengths = [30, 30, 30];
                            break;
                        case "corn":
                            this.growthSprites = ["corn0", "corn1", "corn2"];
                            this.growthLengths = [30, 30, 30];
                            break;
                        case "wheat":
                            this.growthSprites = ["wheat0", "wheat1", "wheat2"];
                            this.growthLengths = [30, 30, 30];
                            break;
                    }
                    this.growthStage = 0;
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
            }(component_4.Component));
            exports_6("CropComponent", CropComponent);
        }
    };
});
System.register("components/component-factory", ["components/component", "components/position-component", "components/animation-component", "components/wasd-component", "components/crop-component"], function (exports_7, context_7) {
    "use strict";
    var component_5, position_component_1, animation_component_1, wasd_component_1, crop_component_1, ComponentFactory;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (component_5_1) {
                component_5 = component_5_1;
            },
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
            }
        ],
        execute: function () {
            ComponentFactory = (function () {
                function ComponentFactory() {
                    this.componentTypes = {};
                }
                ComponentFactory.prototype.registerComponent = function (ComponentClass) {
                    var obj = ComponentClass.create();
                    if (ComponentClass.prototype instanceof component_5.Component) {
                        this.componentTypes[obj.componentName] = ComponentClass;
                    }
                    else {
                        console.log("component " + obj.componentName + "must extend class Component to be registered");
                    }
                };
                ComponentFactory.prototype.createComponent = function (componentName) {
                    if (!(componentName in this.componentTypes)) {
                        throw "component " + componentName + " not registered in componentFactory testing";
                    }
                    return this.componentTypes[componentName].create();
                };
                ComponentFactory.create = function () {
                    var cf = new ComponentFactory();
                    cf.registerComponent(animation_component_1.AnimationComponent);
                    cf.registerComponent(position_component_1.PositionComponent);
                    cf.registerComponent(wasd_component_1.WasdComponent);
                    cf.registerComponent(crop_component_1.CropComponent);
                    return cf;
                };
                return ComponentFactory;
            }());
            exports_7("ComponentFactory", ComponentFactory);
        }
    };
});
System.register("events/event-manager", [], function (exports_8, context_8) {
    "use strict";
    var GameEvent, EventManager;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            GameEvent = (function () {
                function GameEvent(eventName, eventData) {
                }
                return GameEvent;
            }());
            exports_8("GameEvent", GameEvent);
            EventManager = (function () {
                function EventManager() {
                    this.keys = Array(1000);
                    this.events = {};
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
                    this.events = {};
                    if (this.keys[87]) {
                        this.emit("w down");
                    }
                    if (this.keys[65]) {
                        this.emit("a down");
                    }
                    if (this.keys[83]) {
                        this.emit("s down");
                    }
                    if (this.keys[68]) {
                        this.emit("d down");
                    }
                };
                EventManager.prototype.emit = function (eventName, eventData) {
                    if (eventData === void 0) { eventData = {}; }
                    this.events[eventName] = new GameEvent(eventName, eventData);
                };
                EventManager.prototype.register = function (eventName) {
                };
                EventManager.create = function () {
                    return new EventManager();
                };
                return EventManager;
            }());
            exports_8("EventManager", EventManager);
        }
    };
});
System.register("entities/entity", [], function (exports_9, context_9) {
    "use strict";
    var Entity;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            Entity = (function () {
                function Entity(componentFactory) {
                    this.components = [];
                    this.componentFactory = componentFactory;
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
                    if (!allowUndefined)
                        throw "entity has no component " + componentName;
                    return component;
                };
                Entity.prototype.update = function () {
                    for (var i = 0; i < this.components.length; i++) {
                        this.components[i].update();
                    }
                };
                Entity.create = function () {
                    return null;
                };
                return Entity;
            }());
            exports_9("Entity", Entity);
        }
    };
});
System.register("entities/player-entity", ["entities/entity", "components/component-factory"], function (exports_10, context_10) {
    "use strict";
    var entity_1, component_factory_1, PlayerEntity;
    var __moduleName = context_10 && context_10.id;
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
            PlayerEntity = (function (_super) {
                __extends(PlayerEntity, _super);
                function PlayerEntity(componentFactory) {
                    var _this = _super.call(this, componentFactory) || this;
                    _this.addComponent("animation");
                    var position = _this.addComponent("position");
                    _this.addComponent("wasd");
                    position.width = 60;
                    return _this;
                }
                PlayerEntity.prototype.handleEvents = function (events) {
                };
                PlayerEntity.create = function () {
                    var entity = new PlayerEntity(component_factory_1.ComponentFactory.create());
                    return entity;
                };
                return PlayerEntity;
            }(entity_1.Entity));
            exports_10("PlayerEntity", PlayerEntity);
        }
    };
});
System.register("entities/villager-entity", ["entities/entity", "components/component-factory"], function (exports_11, context_11) {
    "use strict";
    var entity_2, component_factory_2, VillagerEntity;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (entity_2_1) {
                entity_2 = entity_2_1;
            },
            function (component_factory_2_1) {
                component_factory_2 = component_factory_2_1;
            }
        ],
        execute: function () {
            VillagerEntity = (function (_super) {
                __extends(VillagerEntity, _super);
                function VillagerEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    _this.addComponent("animation");
                    var position = _this.addComponent("position");
                    position.width = 60;
                    return _this;
                }
                VillagerEntity.prototype.handleEvents = function (events) {
                };
                VillagerEntity.create = function () {
                    var entity = new VillagerEntity(component_factory_2.ComponentFactory.create());
                    return entity;
                };
                return VillagerEntity;
            }(entity_2.Entity));
            exports_11("VillagerEntity", VillagerEntity);
        }
    };
});
System.register("entities/crop-entity", ["entities/entity", "components/component-factory"], function (exports_12, context_12) {
    "use strict";
    var entity_3, component_factory_3, CropEntity;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (entity_3_1) {
                entity_3 = entity_3_1;
            },
            function (component_factory_3_1) {
                component_factory_3 = component_factory_3_1;
            }
        ],
        execute: function () {
            CropEntity = (function (_super) {
                __extends(CropEntity, _super);
                function CropEntity(cf) {
                    var _this = _super.call(this, cf) || this;
                    _this.addComponent("animation");
                    _this.addComponent("position");
                    _this.addComponent("crop");
                    var animation = _this.getComponent("animation");
                    var position = _this.getComponent("position");
                    return _this;
                }
                CropEntity.prototype.handleEvents = function (events) {
                };
                CropEntity.create = function () {
                    return new CropEntity(component_factory_3.ComponentFactory.create());
                };
                return CropEntity;
            }(entity_3.Entity));
            exports_12("CropEntity", CropEntity);
        }
    };
});
System.register("entities/entity-factory", ["entities/player-entity", "entities/entity", "entities/villager-entity", "entities/crop-entity"], function (exports_13, context_13) {
    "use strict";
    var player_entity_1, entity_4, villager_entity_1, crop_entity_1, EntityFactory;
    var __moduleName = context_13 && context_13.id;
    function createEntityFactory() {
        var ef = new EntityFactory();
        ef.registerComponent("player", player_entity_1.PlayerEntity);
        ef.registerComponent("villager", villager_entity_1.VillagerEntity);
        ef.registerComponent("crop", crop_entity_1.CropEntity);
        return ef;
    }
    return {
        setters: [
            function (player_entity_1_1) {
                player_entity_1 = player_entity_1_1;
            },
            function (entity_4_1) {
                entity_4 = entity_4_1;
            },
            function (villager_entity_1_1) {
                villager_entity_1 = villager_entity_1_1;
            },
            function (crop_entity_1_1) {
                crop_entity_1 = crop_entity_1_1;
            }
        ],
        execute: function () {
            EntityFactory = (function () {
                function EntityFactory() {
                    this.entityTypes = {};
                }
                EntityFactory.prototype.registerComponent = function (componentName, EntityClass) {
                    if (EntityClass.prototype instanceof entity_4.Entity) {
                        this.entityTypes[componentName] = EntityClass;
                    }
                    else {
                        console.log("EntityClass must extend class Entity");
                    }
                };
                EntityFactory.prototype.create = function (entityName) {
                    return this.entityTypes[entityName].create();
                };
                EntityFactory.create = function () {
                    return createEntityFactory();
                };
                return EntityFactory;
            }());
            exports_13("EntityFactory", EntityFactory);
        }
    };
});
System.register("render", ["sprite-manager"], function (exports_14, context_14) {
    "use strict";
    var sprite_manager_2, HtmlRenderer, hrf;
    var __moduleName = context_14 && context_14.id;
    function createHtmlRenderer() {
        var canvas = document.getElementById("canvas");
        canvas.width = 1000;
        canvas.height = 850;
        var hsm = sprite_manager_2.HtmlSpriteManager.create();
        return new HtmlRenderer(canvas, hsm);
    }
    return {
        setters: [
            function (sprite_manager_2_1) {
                sprite_manager_2 = sprite_manager_2_1;
            }
        ],
        execute: function () {
            HtmlRenderer = (function () {
                function HtmlRenderer(context, spriteManager) {
                    this.canvas = context;
                    this.ctx = this.canvas.getContext("2d");
                    this.spriteManager = spriteManager;
                }
                HtmlRenderer.prototype.cbox = function () {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                };
                HtmlRenderer.prototype.sprite = function (spriteName, x, y, width, height, spriteNumber, flip) {
                    if (flip === void 0) { flip = false; }
                    var sprite = this.spriteManager.getSprite(spriteName);
                    var spriteImg = sprite.sprite;
                    var fc = sprite.frameCoords(spriteNumber);
                    if (flip) {
                        this.ctx.translate(2 * x, 0);
                        this.ctx.scale(-1, 1);
                    }
                    this.ctx.drawImage(spriteImg, fc[0], fc[1], sprite.frameWidth, sprite.frameHeight, x - width / 2, y - height, width, height);
                    if (flip) {
                        this.ctx.scale(-1, 1);
                        this.ctx.translate(-2 * x, 0);
                    }
                };
                HtmlRenderer.create = function () {
                    return createHtmlRenderer();
                };
                return HtmlRenderer;
            }());
            exports_14("HtmlRenderer", HtmlRenderer);
            hrf = createHtmlRenderer();
        }
    };
});
System.register("systems/system", ["render"], function (exports_15, context_15) {
    "use strict";
    var render_1, EntitySystem, RenderSystem, WasdSystem, CropSystem;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (render_1_1) {
                render_1 = render_1_1;
            }
        ],
        execute: function () {
            EntitySystem = (function () {
                function EntitySystem() {
                }
                EntitySystem.prototype.apply = function (entity) {
                    throw "an entity system did not implement apply method.";
                };
                ;
                EntitySystem.prototype.applyEvents = function (entity, events) {
                    throw "an did not implement apply Events";
                };
                EntitySystem.create = function () {
                    throw "an entity system has no create method.";
                };
                ;
                return EntitySystem;
            }());
            exports_15("EntitySystem", EntitySystem);
            RenderSystem = (function (_super) {
                __extends(RenderSystem, _super);
                function RenderSystem(renderer) {
                    var _this = _super.call(this) || this;
                    _this.renderer = renderer;
                    return _this;
                }
                RenderSystem.create = function () {
                    var hr = render_1.HtmlRenderer.create();
                    return new RenderSystem(hr);
                };
                RenderSystem.prototype.apply = function (entity) {
                    var a = entity.getComponent("animation", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || p == null)
                        return;
                    var r = this.renderer;
                    r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), !p.faceRight);
                };
                RenderSystem.prototype.applyEvents = function () { };
                return RenderSystem;
            }(EntitySystem));
            exports_15("RenderSystem", RenderSystem);
            WasdSystem = (function (_super) {
                __extends(WasdSystem, _super);
                function WasdSystem() {
                    return _super.call(this) || this;
                }
                WasdSystem.create = function () {
                    return new WasdSystem();
                };
                WasdSystem.prototype.apply = function () { };
                WasdSystem.prototype.applyEvents = function (entity, events) {
                    var WasdComponent = entity.getComponent("wasd", true);
                    if (WasdComponent == null)
                        return;
                    var position = entity.getComponent("position");
                    var animation = entity.getComponent("animation");
                    var speed = 5;
                    if ("w down" in events) {
                        animation.setSprite("blondWalk");
                        position.vy = -speed;
                    }
                    else if (position.vy == -speed) {
                        animation.setSprite("blond");
                        position.vy = 0;
                    }
                    if ("a down" in events) {
                        position.faceRight = false;
                        animation.setSprite("blondWalk");
                        position.vx = -speed;
                    }
                    else if (position.vx == -speed) {
                        animation.setSprite("blond");
                        position.vx = 0;
                    }
                    if ("s down" in events) {
                        animation.setSprite("blondWalk");
                        position.vy = speed;
                    }
                    else if (position.vy == speed) {
                        animation.setSprite("blond");
                        position.vy = 0;
                    }
                    if ("d down" in events) {
                        position.faceRight = true;
                        animation.setSprite("blondWalk");
                        position.vx = speed;
                    }
                    else if (position.vx == speed) {
                        animation.setSprite("blond");
                        position.vx = 0;
                    }
                };
                return WasdSystem;
            }(EntitySystem));
            exports_15("WasdSystem", WasdSystem);
            CropSystem = (function (_super) {
                __extends(CropSystem, _super);
                function CropSystem() {
                    return _super.call(this) || this;
                }
                CropSystem.prototype.apply = function (entity) {
                    var a = entity.getComponent("animation", true);
                    var c = entity.getComponent("crop", true);
                    if (a == null || c == null) {
                        return;
                    }
                    if (c.timeSinceGrowth == 0 || c.timeSinceGrowth == 1) {
                        a.setSprite(c.growthSprites[c.growthStage]);
                    }
                };
                ;
                CropSystem.prototype.applyEvents = function (entity, events) {
                };
                ;
                CropSystem.create = function () {
                    return new CropSystem();
                };
                ;
                return CropSystem;
            }(EntitySystem));
            exports_15("CropSystem", CropSystem);
        }
    };
});
System.register("game", ["entities/entity-factory", "systems/system", "render", "events/event-manager"], function (exports_16, context_16) {
    "use strict";
    var entity_factory_1, system_1, render_2, event_manager_1, Game, game, player, pc, villager, component;
    var __moduleName = context_16 && context_16.id;
    function placeField(x, y, cropName, d) {
        if (d === void 0) { d = 50; }
        var crop;
        var cc;
        for (var i = 0; i < 5; i++) {
            for (var i2 = 0; i2 < 5; i2++) {
                crop = addCrop(x + i * d, y + i2 * d);
                cc = crop.getComponent("crop");
                cc.setCrop(cropName);
            }
        }
    }
    function addCrop(x, y) {
        var crop = game.addEntity("crop");
        component = crop.getComponent("position");
        component.x = x;
        component.y = y;
        return crop;
    }
    return {
        setters: [
            function (entity_factory_1_1) {
                entity_factory_1 = entity_factory_1_1;
            },
            function (system_1_1) {
                system_1 = system_1_1;
            },
            function (render_2_1) {
                render_2 = render_2_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            }
        ],
        execute: function () {
            Game = (function () {
                function Game(entityFactory, renderer, eventManager) {
                    this.entities = [];
                    this.systems = [];
                    this.entityFactory = entityFactory;
                    this.renderer = renderer;
                    this.eventManager = eventManager;
                }
                Game.create = function () {
                    var game = new Game(entity_factory_1.EntityFactory.create(), render_2.HtmlRenderer.create(), event_manager_1.EventManager.create());
                    return game;
                };
                Game.prototype.update = function () {
                    this.renderer.cbox();
                    this.eventManager.update();
                    for (var i = 0; i < this.entities.length; i++) {
                        for (var systemi = 0; systemi < this.systems.length; systemi++) {
                            this.systems[systemi].applyEvents(this.entities[i], this.eventManager.events);
                        }
                    }
                    for (var i = 0; i < this.entities.length; i++) {
                        this.entities[i].update();
                        for (var systemi = 0; systemi < this.systems.length; systemi++) {
                            this.systems[systemi].apply(this.entities[i]);
                        }
                    }
                    this.entities.sort(function (a, b) {
                        var pa = a.getComponent("position");
                        var pb = b.getComponent("position");
                        return pa.y - pb.y;
                    });
                };
                Game.prototype.render = function () {
                };
                Game.prototype.step = function () {
                    this.update();
                    this.render();
                };
                Game.prototype.start = function () {
                    console.log("starting game");
                    setInterval((function (game) {
                        return function () { game.step(); };
                    })(this), 1000 / 30);
                };
                Game.prototype.addEntity = function (entityName) {
                    var entity = this.entityFactory.create(entityName);
                    this.entities.push(entity);
                    return entity;
                };
                Game.prototype.addSystem = function (system) {
                    this.systems.push(system);
                };
                return Game;
            }());
            game = Game.create();
            player = game.addEntity("player");
            pc = player.getComponent("position");
            villager = game.addEntity("villager");
            component = villager.getComponent("position");
            component.x = 300;
            component.y = 300;
            placeField(350, 300, "wheat", 50);
            placeField(650, 300, "corn", 50);
            placeField(350, 600, "turnip", 50);
            game.addSystem(system_1.RenderSystem.create());
            game.addSystem(system_1.WasdSystem.create());
            game.addSystem(system_1.CropSystem.create());
            game.start();
        }
    };
});
//# sourceMappingURL=app.js.map