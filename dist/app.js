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
System.register("engine/component/component", [], function (exports_1, context_1) {
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
System.register("engine/component/component-factory", ["engine/component/component"], function (exports_2, context_2) {
    "use strict";
    var component_1, ComponentFactory;
    var __moduleName = context_2 && context_2.id;
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
                        throw "component " + componentName + " not registered in componentFactory testing";
                    }
                    return this.componentTypes[componentName].create();
                };
                ComponentFactory.create = function () {
                    var cf = new ComponentFactory();
                    return cf;
                };
                return ComponentFactory;
            }());
            exports_2("ComponentFactory", ComponentFactory);
        }
    };
});
System.register("engine/events/event-manager", [], function (exports_3, context_3) {
    "use strict";
    var GameEvent, EventType, EventManager;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            GameEvent = (function () {
                function GameEvent(eventName, eventData, componentTarget) {
                    if (componentTarget === void 0) { componentTarget = null; }
                    this.eventName = eventName;
                    this.eventData = eventData;
                    this.eventDescription = EventType[eventName];
                }
                GameEvent.create = function (eventName, eventData) {
                    if (eventData === void 0) { eventData = null; }
                    var ge = new GameEvent(eventName, eventData);
                    return ge;
                };
                return GameEvent;
            }());
            exports_3("GameEvent", GameEvent);
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
                EventType[EventType["pDown"] = 10] = "pDown";
                EventType[EventType["pUp"] = 11] = "pUp";
                EventType[EventType["collision"] = 12] = "collision";
                EventType[EventType["fireProjectile"] = 13] = "fireProjectile";
                EventType[EventType["inflictDamage"] = 14] = "inflictDamage";
                EventType[EventType["changeVelocity"] = 15] = "changeVelocity";
            })(EventType || (EventType = {}));
            exports_3("EventType", EventType);
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
                    var controls = [EventType.wDown, EventType.aDown, EventType.sDown,
                        EventType.dDown, EventType.spaceDown, EventType.pDown];
                    var controlRelease = [EventType.wUp, EventType.aUp, EventType.sUp,
                        EventType.dUp, EventType.spaceUp, EventType.pUp];
                    var controlKeys = [87, 65, 83, 68, 32, 80];
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
                    var ge = new GameEvent(eventName, eventData);
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
                    em.createEvent(EventType.wDown);
                    em.createEvent(EventType.aDown);
                    em.createEvent(EventType.sDown);
                    em.createEvent(EventType.dDown);
                    return em;
                };
                return EventManager;
            }());
            exports_3("EventManager", EventManager);
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
                        console.log(this);
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
                        this.components[i].update();
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
System.register("engine/entity/entity-factory", ["engine/entity/entity", "engine/component/component-factory"], function (exports_5, context_5) {
    "use strict";
    var entity_1, component_factory_1, EntityFactory;
    var __moduleName = context_5 && context_5.id;
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
            exports_5("EntityFactory", EntityFactory);
        }
    };
});
System.register("engine/renderers/sprite-manager", [], function (exports_6, context_6) {
    "use strict";
    var HtmlSprite, SpriteAnimation, HtmlSpriteManager;
    var __moduleName = context_6 && context_6.id;
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
            exports_6("SpriteAnimation", SpriteAnimation);
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
            exports_6("HtmlSpriteManager", HtmlSpriteManager);
        }
    };
});
System.register("engine/renderers/render", ["engine/renderers/sprite-manager"], function (exports_7, context_7) {
    "use strict";
    var sprite_manager_1, HtmlRenderer, hrf;
    var __moduleName = context_7 && context_7.id;
    function createHtmlRenderer() {
        var canvas = document.getElementById("canvas");
        canvas.width = 1000;
        canvas.height = 850;
        var hsm = sprite_manager_1.HtmlSpriteManager.create();
        return new HtmlRenderer(canvas, hsm);
    }
    return {
        setters: [
            function (sprite_manager_1_1) {
                sprite_manager_1 = sprite_manager_1_1;
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
            exports_7("HtmlRenderer", HtmlRenderer);
            hrf = createHtmlRenderer();
        }
    };
});
System.register("engine/game", ["engine/entity/entity-factory", "engine/renderers/render", "engine/events/event-manager"], function (exports_8, context_8) {
    "use strict";
    var entity_factory_1, render_1, event_manager_1, Game;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (entity_factory_1_1) {
                entity_factory_1 = entity_factory_1_1;
            },
            function (render_1_1) {
                render_1 = render_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            }
        ],
        execute: function () {
            Game = (function () {
                function Game(entityFactory, renderer, eventManager) {
                    this._entities = [];
                    this.systems = [];
                    this.i = 0;
                    this.entityFactory = entityFactory;
                    this.renderer = renderer;
                    this.eventManager = eventManager;
                }
                Game.create = function () {
                    var game = new Game(entity_factory_1.EntityFactory.create(), render_1.HtmlRenderer.create(), event_manager_1.EventManager.create());
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
                    setInterval((function (game) {
                        return function () { game.step(); };
                    })(this), 1000 / 30);
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
                    this.entities = this.entities.filter(function (e) {
                        return !e.destroyed;
                    });
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
            exports_8("Game", Game);
        }
    };
});
System.register("engine/system/system", [], function (exports_9, context_9) {
    "use strict";
    var EntitySystem;
    var __moduleName = context_9 && context_9.id;
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
                    throw "an did not implement apply Events";
                };
                return EntitySystem;
            }());
            exports_9("EntitySystem", EntitySystem);
        }
    };
});
System.register("components/position-component", ["engine/component/component"], function (exports_10, context_10) {
    "use strict";
    var component_2, PositionComponent;
    var __moduleName = context_10 && context_10.id;
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
                PositionComponent.prototype.update = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.moved = !(this.vx === 0 && this.vy === 0);
                };
                PositionComponent.create = function () {
                    return new PositionComponent();
                };
                return PositionComponent;
            }(component_2.Component));
            exports_10("PositionComponent", PositionComponent);
        }
    };
});
System.register("sprite-manager", [], function (exports_11, context_11) {
    "use strict";
    var HtmlSprite, SpriteAnimation, HtmlSpriteManager;
    var __moduleName = context_11 && context_11.id;
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
            exports_11("SpriteAnimation", SpriteAnimation);
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
            exports_11("HtmlSpriteManager", HtmlSpriteManager);
        }
    };
});
System.register("components/animation-component", ["sprite-manager", "engine/component/component"], function (exports_12, context_12) {
    "use strict";
    var sprite_manager_2, component_3, AnimationComponent;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (sprite_manager_2_1) {
                sprite_manager_2 = sprite_manager_2_1;
            },
            function (component_3_1) {
                component_3 = component_3_1;
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
                    var spriteManager = sprite_manager_2.HtmlSpriteManager.create();
                    var ac = new AnimationComponent("blond", 2, spriteManager);
                    return ac;
                };
                return AnimationComponent;
            }(component_3.Component));
            exports_12("AnimationComponent", AnimationComponent);
        }
    };
});
System.register("components/wasd-component", ["engine/component/component"], function (exports_13, context_13) {
    "use strict";
    var component_4, WasdComponent;
    var __moduleName = context_13 && context_13.id;
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
            exports_13("WasdComponent", WasdComponent);
        }
    };
});
System.register("components/crop-component", ["engine/component/component"], function (exports_14, context_14) {
    "use strict";
    var component_5, CropComponent;
    var __moduleName = context_14 && context_14.id;
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
                    var cropLength = 30;
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
            exports_14("CropComponent", CropComponent);
        }
    };
});
System.register("components/projectile-component", ["engine/component/component"], function (exports_15, context_15) {
    "use strict";
    var component_6, ProjectileComponent;
    var __moduleName = context_15 && context_15.id;
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
            exports_15("ProjectileComponent", ProjectileComponent);
        }
    };
});
System.register("components/fight-component", ["engine/component/component"], function (exports_16, context_16) {
    "use strict";
    var component_7, FightComponent;
    var __moduleName = context_16 && context_16.id;
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
            exports_16("FightComponent", FightComponent);
        }
    };
});
System.register("components/health-component", ["engine/component/component"], function (exports_17, context_17) {
    "use strict";
    var component_8, HealthComponent;
    var __moduleName = context_17 && context_17.id;
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
            exports_17("HealthComponent", HealthComponent);
        }
    };
});
System.register("components/neural-fight-component", ["engine/component/component"], function (exports_18, context_18) {
    "use strict";
    var component_9, NeuralFightComponent;
    var __moduleName = context_18 && context_18.id;
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
            exports_18("NeuralFightComponent", NeuralFightComponent);
        }
    };
});
System.register("components/component-factory", ["components/position-component", "components/animation-component", "components/wasd-component", "components/crop-component", "components/projectile-component", "components/fight-component", "components/health-component", "components/neural-fight-component", "engine/component/component-factory"], function (exports_19, context_19) {
    "use strict";
    var position_component_1, animation_component_1, wasd_component_1, crop_component_1, projectile_component_1, fight_component_1, health_component_1, neural_fight_component_1, component_factory_2;
    var __moduleName = context_19 && context_19.id;
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
        return cf;
    }
    exports_19("createComponentFactory", createComponentFactory);
    function populateComponentFactory(game) {
        game.registerComponent(animation_component_1.AnimationComponent);
        game.registerComponent(position_component_1.PositionComponent);
        game.registerComponent(wasd_component_1.WasdComponent);
        game.registerComponent(crop_component_1.CropComponent);
        game.registerComponent(projectile_component_1.ProjectileComponent);
        game.registerComponent(fight_component_1.FightComponent);
        game.registerComponent(health_component_1.HealthComponent);
        game.registerComponent(neural_fight_component_1.NeuralFightComponent);
    }
    exports_19("populateComponentFactory", populateComponentFactory);
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
            function (component_factory_2_1) {
                component_factory_2 = component_factory_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("entities/crop-entity", ["engine/entity/entity", "components/component-factory"], function (exports_20, context_20) {
    "use strict";
    var entity_2, component_factory_3, CropEntity;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (entity_2_1) {
                entity_2 = entity_2_1;
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
                    var cf = component_factory_3.createComponentFactory();
                    return new CropEntity(cf);
                };
                return CropEntity;
            }(entity_2.Entity));
            exports_20("CropEntity", CropEntity);
        }
    };
});
System.register("systems/render-system", ["engine/system/system", "engine/renderers/render"], function (exports_21, context_21) {
    "use strict";
    var system_1, render_2, RenderSystem;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (system_1_1) {
                system_1 = system_1_1;
            },
            function (render_2_1) {
                render_2 = render_2_1;
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
                    var hr = render_2.HtmlRenderer.create();
                    return new RenderSystem(hr, game);
                };
                RenderSystem.prototype.apply = function (entity) {
                    console.log(5);
                    var a = entity.getComponent("animation", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || p == null)
                        return;
                    var r = this.renderer;
                    r.sprite(a.spriteName, p.x, p.y, p.width, p.height, a.getSpriteNumber(), !p.faceRight);
                };
                RenderSystem.prototype.applyEvents = function () { };
                return RenderSystem;
            }(system_1.EntitySystem));
            exports_21("RenderSystem", RenderSystem);
        }
    };
});
System.register("systems/neural-fight-system", ["engine/system/system"], function (exports_22, context_22) {
    "use strict";
    var system_2, NeuralFightSystem;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (system_2_1) {
                system_2 = system_2_1;
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
            }(system_2.EntitySystem));
            exports_22("NeuralFightSystem", NeuralFightSystem);
        }
    };
});
System.register("entities/villager-entity", ["engine/entity/entity", "components/component-factory"], function (exports_23, context_23) {
    "use strict";
    var entity_3, component_factory_4, VillagerEntity;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (entity_3_1) {
                entity_3 = entity_3_1;
            },
            function (component_factory_4_1) {
                component_factory_4 = component_factory_4_1;
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
                    var cf = component_factory_4.createComponentFactory();
                    var entity = new VillagerEntity(cf);
                    return entity;
                };
                return VillagerEntity;
            }(entity_3.Entity));
            exports_23("VillagerEntity", VillagerEntity);
        }
    };
});
System.register("entities/projectile-entity", ["engine/entity/entity", "components/component-factory"], function (exports_24, context_24) {
    "use strict";
    var entity_4, component_factory_5, ProjectileEntity;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (entity_4_1) {
                entity_4 = entity_4_1;
            },
            function (component_factory_5_1) {
                component_factory_5 = component_factory_5_1;
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
                    var cf = component_factory_5.createComponentFactory();
                    var pe = new ProjectileEntity(cf);
                    return pe;
                };
                return ProjectileEntity;
            }(entity_4.Entity));
            exports_24("ProjectileEntity", ProjectileEntity);
        }
    };
});
System.register("systems/wasd-system", ["engine/system/system", "engine/events/event-manager"], function (exports_25, context_25) {
    "use strict";
    var system_3, event_manager_2, WasdSystem;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (system_3_1) {
                system_3 = system_3_1;
            },
            function (event_manager_2_1) {
                event_manager_2 = event_manager_2_1;
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
                            case event_manager_2.EventType.wDown:
                                animation.setSprite(walkSprite);
                                position.vy = -speed;
                                break;
                            case event_manager_2.EventType.wUp:
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case event_manager_2.EventType.aDown:
                                position.faceRight = false;
                                animation.setSprite(walkSprite);
                                position.vx = -speed;
                                break;
                            case event_manager_2.EventType.aUp:
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case event_manager_2.EventType.sDown:
                                animation.setSprite(walkSprite);
                                position.vy = speed;
                                break;
                            case event_manager_2.EventType.sUp:
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case event_manager_2.EventType.dDown:
                                position.faceRight = true;
                                animation.setSprite(walkSprite);
                                position.vx = speed;
                                break;
                            case event_manager_2.EventType.dUp:
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case event_manager_2.EventType.spaceUp:
                                var ge = event_manager_2.GameEvent.create(event_manager_2.EventType.fireProjectile);
                                entity.emit(ge);
                                break;
                            case event_manager_2.EventType.pUp:
                                console.log(this.game);
                                break;
                        }
                    }
                };
                return WasdSystem;
            }(system_3.EntitySystem));
            exports_25("WasdSystem", WasdSystem);
        }
    };
});
System.register("entities/player-entity", ["engine/entity/entity", "components/component-factory"], function (exports_26, context_26) {
    "use strict";
    var entity_5, component_factory_6, PlayerEntity;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (entity_5_1) {
                entity_5 = entity_5_1;
            },
            function (component_factory_6_1) {
                component_factory_6 = component_factory_6_1;
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
                    var sprite = "grey";
                    var walkSprite = "greyWalk";
                    animation.setSprite(sprite);
                    wasd.sprite = sprite;
                    wasd.walkSprite = walkSprite;
                    position.width = 70;
                    return _this;
                }
                PlayerEntity.prototype.handleEvents = function (events) {
                };
                PlayerEntity.create = function () {
                    var cf = component_factory_6.createComponentFactory();
                    var entity = new PlayerEntity(cf);
                    return entity;
                };
                return PlayerEntity;
            }(entity_5.Entity));
            exports_26("PlayerEntity", PlayerEntity);
        }
    };
});
System.register("systems/crop-system", ["engine/system/system", "engine/events/event-manager", "entities/projectile-entity", "entities/player-entity"], function (exports_27, context_27) {
    "use strict";
    var system_4, event_manager_3, projectile_entity_1, player_entity_1, CropSystem;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (system_4_1) {
                system_4 = system_4_1;
            },
            function (event_manager_3_1) {
                event_manager_3 = event_manager_3_1;
            },
            function (projectile_entity_1_1) {
                projectile_entity_1 = projectile_entity_1_1;
            },
            function (player_entity_1_1) {
                player_entity_1 = player_entity_1_1;
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
                CropSystem.prototype.handleEvent = function (event, entity) {
                    var crop = entity.getComponent("crop");
                    switch (event.eventName) {
                        case event_manager_3.EventType.collision:
                            if (event.eventData instanceof projectile_entity_1.ProjectileEntity) {
                                crop.setCrop("wheat");
                            }
                            else if (event.eventData instanceof player_entity_1.PlayerEntity) {
                                crop.setCrop("turnip");
                            }
                            else {
                                crop.setCrop("corn");
                            }
                            break;
                    }
                };
                return CropSystem;
            }(system_4.EntitySystem));
            exports_27("CropSystem", CropSystem);
        }
    };
});
System.register("entities/first-entity", ["engine/entity/entity", "components/component-factory"], function (exports_28, context_28) {
    "use strict";
    var entity_6, component_factory_7, FirstEntity;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (entity_6_1) {
                entity_6 = entity_6_1;
            },
            function (component_factory_7_1) {
                component_factory_7 = component_factory_7_1;
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
                    var cf = component_factory_7.createComponentFactory();
                    var entity = new FirstEntity(cf);
                    return entity;
                };
                return FirstEntity;
            }(entity_6.Entity));
            exports_28("FirstEntity", FirstEntity);
        }
    };
});
System.register("systems/collision-system", ["engine/system/system", "engine/events/event-manager", "entities/first-entity"], function (exports_29, context_29) {
    "use strict";
    var system_5, event_manager_4, first_entity_1, CollisionSystem;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (system_5_1) {
                system_5 = system_5_1;
            },
            function (event_manager_4_1) {
                event_manager_4 = event_manager_4_1;
            },
            function (first_entity_1_1) {
                first_entity_1 = first_entity_1_1;
            }
        ],
        execute: function () {
            CollisionSystem = (function (_super) {
                __extends(CollisionSystem, _super);
                function CollisionSystem(game) {
                    var _this = _super.call(this, game) || this;
                    _this.movingEntities = [];
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
                    var p2 = e2.getComponent("position");
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
                    e1.emit(event_manager_4.GameEvent.create(event_manager_4.EventType.collision, e2));
                    e2.emit(event_manager_4.GameEvent.create(event_manager_4.EventType.collision, e1));
                };
                CollisionSystem.prototype.apply = function (entity) {
                    if (entity instanceof first_entity_1.FirstEntity) {
                        this.movingEntities = [];
                    }
                    var position = entity.getComponent("position");
                    var collision;
                    var entityTarget;
                    for (var i = 0; i < this.movingEntities.length; i++) {
                        entityTarget = this.movingEntities[i];
                        collision = this.checkCol(entity, entityTarget);
                        if (collision) {
                            this.addCollision(entity, entityTarget);
                        }
                    }
                    if (position.moved) {
                        this.movingEntities.push(entity);
                    }
                    if (entity instanceof first_entity_1.FirstEntity) {
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
                    }
                };
                ;
                CollisionSystem.prototype.applyEvents = function (entity) {
                };
                CollisionSystem.create = function (game) {
                    return new CollisionSystem(game);
                };
                return CollisionSystem;
            }(system_5.EntitySystem));
            exports_29("CollisionSystem", CollisionSystem);
        }
    };
});
System.register("systems/projectile-system", ["engine/system/system", "entities/projectile-entity", "engine/events/event-manager"], function (exports_30, context_30) {
    "use strict";
    var system_6, projectile_entity_2, event_manager_5, ProjectileSystem;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (system_6_1) {
                system_6 = system_6_1;
            },
            function (projectile_entity_2_1) {
                projectile_entity_2 = projectile_entity_2_1;
            },
            function (event_manager_5_1) {
                event_manager_5 = event_manager_5_1;
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
                            case event_manager_5.EventType.fireProjectile:
                                if (event.eventData !== null) {
                                    this.fireProjectile(entity, event.eventData.vx, event.eventData.vy);
                                }
                                else {
                                    this.fireProjectile(entity);
                                }
                                break;
                            case event_manager_5.EventType.collision:
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
                                    var ge = event_manager_5.GameEvent.create(event_manager_5.EventType.inflictDamage);
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
            }(system_6.EntitySystem));
            exports_30("ProjectileSystem", ProjectileSystem);
        }
    };
});
System.register("systems/fight-system", ["engine/system/system", "engine/events/event-manager"], function (exports_31, context_31) {
    "use strict";
    var system_7, event_manager_6, FightSystem;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (system_7_1) {
                system_7 = system_7_1;
            },
            function (event_manager_6_1) {
                event_manager_6 = event_manager_6_1;
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
                            entity.emit(event_manager_6.GameEvent.create(event_manager_6.EventType.fireProjectile, { vx: direction.dx * 10, vy: direction.dy * 10 }));
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
            }(system_7.EntitySystem));
            exports_31("FightSystem", FightSystem);
        }
    };
});
System.register("systems/health-system", ["engine/system/system", "engine/events/event-manager"], function (exports_32, context_32) {
    "use strict";
    var system_8, event_manager_7, HealthSystem;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (system_8_1) {
                system_8 = system_8_1;
            },
            function (event_manager_7_1) {
                event_manager_7 = event_manager_7_1;
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
                            case event_manager_7.EventType.inflictDamage:
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
            }(system_8.EntitySystem));
            exports_32("HealthSystem", HealthSystem);
        }
    };
});
System.register("systems/position-system", ["engine/system/system", "engine/events/event-manager"], function (exports_33, context_33) {
    "use strict";
    var system_9, event_manager_8, PositionSystem;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (system_9_1) {
                system_9 = system_9_1;
            },
            function (event_manager_8_1) {
                event_manager_8 = event_manager_8_1;
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
                            case event_manager_8.EventType.changeVelocity:
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
            }(system_9.EntitySystem));
            exports_33("PositionSystem", PositionSystem);
        }
    };
});
System.register("entities/entity-factory", ["entities/player-entity", "entities/villager-entity", "entities/crop-entity", "entities/first-entity", "entities/projectile-entity"], function (exports_34, context_34) {
    "use strict";
    var player_entity_2, villager_entity_1, crop_entity_1, first_entity_2, projectile_entity_3;
    var __moduleName = context_34 && context_34.id;
    function populateEntityFactory(game) {
        game.registerEntity("player", player_entity_2.PlayerEntity);
        game.registerEntity("villager", villager_entity_1.VillagerEntity);
        game.registerEntity("crop", crop_entity_1.CropEntity);
        game.registerEntity("first", first_entity_2.FirstEntity);
        game.registerEntity("projectile", projectile_entity_3.ProjectileEntity);
    }
    exports_34("populateEntityFactory", populateEntityFactory);
    return {
        setters: [
            function (player_entity_2_1) {
                player_entity_2 = player_entity_2_1;
            },
            function (villager_entity_1_1) {
                villager_entity_1 = villager_entity_1_1;
            },
            function (crop_entity_1_1) {
                crop_entity_1 = crop_entity_1_1;
            },
            function (first_entity_2_1) {
                first_entity_2 = first_entity_2_1;
            },
            function (projectile_entity_3_1) {
                projectile_entity_3 = projectile_entity_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("game", ["systems/render-system", "systems/wasd-system", "systems/crop-system", "systems/collision-system", "systems/projectile-system", "systems/health-system", "systems/position-system", "systems/neural-fight-system", "entities/entity-factory", "engine/game", "components/component-factory"], function (exports_35, context_35) {
    "use strict";
    var render_system_1, wasd_system_1, crop_system_1, collision_system_1, projectile_system_1, health_system_1, position_system_1, neural_fight_system_1, entity_factory_2, game_1, component_factory_8, game, player, pc, ac, villager, component, fight, v2, component, projectile;
    var __moduleName = context_35 && context_35.id;
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
        return game;
    }
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
            function (entity_factory_2_1) {
                entity_factory_2 = entity_factory_2_1;
            },
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (component_factory_8_1) {
                component_factory_8 = component_factory_8_1;
            }
        ],
        execute: function () {
            exports_35("game", game = createGame());
            entity_factory_2.populateEntityFactory(game);
            component_factory_8.populateComponentFactory(game);
            console.log(game.entityFactory.componentFactory.componentTypes);
            console.log(game.entityFactory.componentFactory.createComponent("animation"));
            player = game.addEntity("player");
            pc = player.getComponent("position");
            ac = player.getComponent("animation");
            pc.x = 300;
            pc.y = 380;
            villager = game.addEntity("villager");
            component = villager.getComponent("position");
            fight = villager.getComponent("fight");
            ac = villager.getComponent("animation");
            component.x = 150;
            component.y = 300;
            component.vx = 0;
            fight.attack = true;
            v2 = game.addEntity("villager");
            fight.target = v2;
            component = v2.getComponent("position");
            ac = v2.getComponent("animation");
            fight = v2.getComponent("fight");
            component.x = 600;
            component.y = 800;
            component.vx = 0;
            fight.target = villager;
            fight.attack = true;
            projectile = game.addEntity("projectile");
            pc = projectile.getComponent("position");
            pc.x = 100;
            pc.y = 500;
            pc.vx = 0;
            placeField(350, 300, "wheat", 50);
            placeField(650, 300, "corn", 50);
            placeField(350, 600, "turnip", 50);
            placeField(650, 600, "onion", 50);
            game.start();
        }
    };
});
System.register("render", ["sprite-manager"], function (exports_36, context_36) {
    "use strict";
    var sprite_manager_3, HtmlRenderer, hrf;
    var __moduleName = context_36 && context_36.id;
    function createHtmlRenderer() {
        var canvas = document.getElementById("canvas");
        canvas.width = 1400;
        canvas.height = 780;
        var hsm = sprite_manager_3.HtmlSpriteManager.create();
        return new HtmlRenderer(canvas, hsm);
    }
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
            exports_36("HtmlRenderer", HtmlRenderer);
            hrf = createHtmlRenderer();
        }
    };
});
System.register("components/inventory-component", ["engine/component/component"], function (exports_37, context_37) {
    "use strict";
    var component_10, InventoryItem, InventoryComponent;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (component_10_1) {
                component_10 = component_10_1;
            }
        ],
        execute: function () {
            InventoryItem = (function () {
                function InventoryItem() {
                    this.itemNumber = 0;
                }
                return InventoryItem;
            }());
            exports_37("InventoryItem", InventoryItem);
            InventoryComponent = (function (_super) {
                __extends(InventoryComponent, _super);
                function InventoryComponent() {
                    var _this = _super.call(this, "inventory") || this;
                    _this.inventory = [];
                    return _this;
                }
                InventoryComponent.prototype.update = function () { };
                InventoryComponent.create = function () {
                    return new InventoryComponent();
                };
                return InventoryComponent;
            }(component_10.Component));
            exports_37("InventoryComponent", InventoryComponent);
        }
    };
});
System.register("components/inventory-component/inventory-component", ["engine/component/component"], function (exports_38, context_38) {
    "use strict";
    var component_11, InventoryItem, InventoryComponent;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (component_11_1) {
                component_11 = component_11_1;
            }
        ],
        execute: function () {
            InventoryItem = (function () {
                function InventoryItem() {
                    this.itemNumber = 0;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                }
                return InventoryItem;
            }());
            exports_38("InventoryItem", InventoryItem);
            InventoryComponent = (function (_super) {
                __extends(InventoryComponent, _super);
                function InventoryComponent() {
                    var _this = _super.call(this, "inventory") || this;
                    _this.inventory = [];
                    return _this;
                }
                InventoryComponent.prototype.update = function () { };
                InventoryComponent.create = function () {
                    return new InventoryComponent();
                };
                return InventoryComponent;
            }(component_11.Component));
            exports_38("InventoryComponent", InventoryComponent);
        }
    };
});
System.register("components/inventory-component/inventory-item-type", [], function (exports_39, context_39) {
    "use strict";
    var InventoryItemType;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [],
        execute: function () {
            InventoryItemType = (function () {
                function InventoryItemType(itemNumber, itemName, itemDescription) {
                    this.itemNumber = 0;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                    this.itemNumber = itemNumber;
                    this.itemName = itemName;
                    this.itemDescription = itemDescription;
                }
                InventoryItemType.create = function (itemNumber, itemName, itemDescription) {
                    var newItemType;
                    newItemType = new InventoryItemType(itemNumber, itemName, itemDescription);
                    return newItemType;
                };
                return InventoryItemType;
            }());
            exports_39("InventoryItemType", InventoryItemType);
        }
    };
});
System.register("components/inventory-component/inventory-registry", [], function (exports_40, context_40) {
    "use strict";
    var InventoryItemRegistry;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
            InventoryItemRegistry = (function () {
                function InventoryItemRegistry() {
                }
                InventoryItemRegistry.prototype.registerItemType = function () {
                };
                return InventoryItemRegistry;
            }());
        }
    };
});
//# sourceMappingURL=app.js.map