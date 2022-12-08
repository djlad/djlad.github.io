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
            ComponentFactory = class ComponentFactory {
                constructor() {
                    this.componentTypes = {};
                }
                registerComponent(ComponentClass) {
                    var obj = ComponentClass.create();
                    if (ComponentClass.prototype instanceof component_1.Component) {
                        this.componentTypes[obj.componentName] = ComponentClass;
                    }
                    else {
                        console.log("component " + obj.componentName + " must extend class Component to be registered");
                    }
                }
                createComponent(componentName) {
                    if (!(componentName in this.componentTypes)) {
                        throw "component " + componentName + " not registered in componentFactory";
                    }
                    return this.componentTypes[componentName].create();
                }
                static create() {
                    var cf = new ComponentFactory();
                    return cf;
                }
            };
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
                EventType[EventType["dash"] = 21] = "dash";
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
            GameEvent = class GameEvent {
                constructor(eventName, eventData, componentTarget = null) {
                    this.eventName = eventName;
                    this.eventData = eventData;
                    this.eventDescription = EventType_1.EventType[eventName];
                }
                static create(eventName, eventData = null) {
                    var ge = new GameEvent(eventName, eventData);
                    return ge;
                }
            };
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
            Entity = class Entity {
                constructor(componentFactory) {
                    this.id = -1;
                    this.components = [];
                    this.targetedEvents = [];
                    this.delayedEvents = [];
                    this.destroyed = false;
                    this.componentFactory = componentFactory;
                    Entity.id++;
                    this.id = Entity.id;
                }
                addComponent(componentName) {
                    var component = this.componentFactory.createComponent(componentName);
                    this.components.push(component);
                    return component;
                }
                getComponent(componentName, allowUndefined = false) {
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
                }
                emit(event, delayed = false) {
                    if (delayed) {
                        this.delayedEvents.push(event);
                    }
                    else {
                        this.targetedEvents.push(event);
                    }
                }
                update() {
                    for (var i = 0; i < this.components.length; i++) {
                        this.components[i].update(this);
                    }
                }
                static create() {
                    return null;
                }
            };
            exports_4("Entity", Entity);
            Entity.id = -1;
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
            Component = class Component {
                constructor(componentName) {
                    this.componentName = componentName;
                }
                static create() {
                    throw "Component must implement static create function";
                }
                ;
            };
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
            PositionComponent = class PositionComponent extends component_2.Component {
                constructor() {
                    super("position");
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
                }
                get vx() {
                    return this._vx;
                }
                set vx(vx) {
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
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.moved = !(this.vx == 0 && this.vy == 0);
                }
                static create() {
                    return new PositionComponent();
                }
            };
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
            SpriteAnimation = class SpriteAnimation {
                constructor(animationName, spriteName, spriteNumbers, delay) {
                    this.spriteNumbers = spriteNumbers;
                    this.animationName = animationName;
                    this.spriteName = spriteName;
                    this.delay = delay;
                }
                static create(animationName, spriteName, spriteNumbers, delay = 1) {
                    var sa = new SpriteAnimation(animationName, spriteName, spriteNumbers, delay);
                    return sa;
                }
            };
            exports_7("SpriteAnimation", SpriteAnimation);
        }
    };
});
System.register("engine/renderers/implementations/html/html-canvas", [], function (exports_8, context_8) {
    "use strict";
    var HtmlCanvas;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            HtmlCanvas = class HtmlCanvas {
                constructor(canvas) {
                    this.canvas = canvas;
                    this.ctx = this.canvas.getContext("2d");
                }
                static createSingleton() {
                    if (canvas != null)
                        return HtmlCanvas.canvas;
                    var canvas = document.getElementById("canvas");
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    canvas.style.margin = "0";
                    canvas.style.padding = "0";
                    canvas.style.overflow = "hidden";
                    canvas.style.position = "fixed";
                    canvas.style.top = "0px";
                    canvas.style.left = "0px";
                    HtmlCanvas.canvas = new HtmlCanvas(canvas);
                    return HtmlCanvas.canvas;
                }
            };
            exports_8("HtmlCanvas", HtmlCanvas);
            HtmlCanvas.canvas = null;
        }
    };
});
System.register("engine/renderers/implementations/html/html-rect-sprite", ["engine/renderers/implementations/html/html-canvas"], function (exports_9, context_9) {
    "use strict";
    var html_canvas_1, HtmlRectSprite;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (html_canvas_1_1) {
                html_canvas_1 = html_canvas_1_1;
            }
        ],
        execute: function () {
            HtmlRectSprite = class HtmlRectSprite {
                constructor(fileName, widthImgs, heightImgs) {
                    this.spriteDir = "../sprites/";
                    var spriteImg = new Image();
                    spriteImg.src = this.spriteDir + fileName;
                    this.sprite = spriteImg;
                    this.widthImgs = widthImgs;
                    this.heightImgs = heightImgs;
                    spriteImg.onload = this.setFrameDimensions(this);
                    this.canvas = html_canvas_1.HtmlCanvas.createSingleton();
                    this.ctx = html_canvas_1.HtmlCanvas.createSingleton().ctx;
                }
                drawImage(spriteNumber, x, y, width, height) {
                    let fc = this.frameCoords(spriteNumber);
                    this.ctx.drawImage(this.sprite, fc[0], fc[1], this.frameWidth, this.frameHeight, x, y, width, height);
                }
                setFrameDimensions(sprite) {
                    return function () {
                        sprite.frameWidth = sprite.sprite.width / sprite.widthImgs;
                        sprite.frameHeight = sprite.sprite.height / sprite.heightImgs;
                    };
                }
                frameCoords(spriteNum) {
                    var frameWidth = this.sprite.width / this.widthImgs;
                    var frameHeight = this.sprite.height / this.heightImgs;
                    var framex = spriteNum % this.widthImgs * frameWidth;
                    var framey = Math.floor(spriteNum / this.widthImgs) * frameHeight;
                    return [framex, framey];
                }
            };
            exports_9("HtmlRectSprite", HtmlRectSprite);
        }
    };
});
System.register("engine/renderers/implementations/html/html-sprite", ["engine/renderers/implementations/html/html-canvas"], function (exports_10, context_10) {
    "use strict";
    var html_canvas_2, HtmlSprite;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (html_canvas_2_1) {
                html_canvas_2 = html_canvas_2_1;
            }
        ],
        execute: function () {
            HtmlSprite = class HtmlSprite {
                constructor(fileName) {
                    this.spriteDir = "../sprites/";
                    this.frameCoordsCalculated = [];
                    var spriteImg = new Image();
                    spriteImg.src = this.spriteDir + fileName;
                    this.sprite = spriteImg;
                    spriteImg.onload = this.setFrameDimensions(this);
                    this.ctx = html_canvas_2.HtmlCanvas.createSingleton().ctx;
                }
                drawImage(spriteNumber, x, y, width, height) {
                    let fc = this.frameCoords(spriteNumber);
                }
                setFrameDimensions(sprite) {
                    return function () {
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');
                        canvas.width = sprite.sprite.width;
                        canvas.height = sprite.sprite.height;
                        context.drawImage(sprite.sprite, 0, 0);
                        let pixelData = context.getImageData(0, 0, sprite.sprite.width, sprite.sprite.height);
                        let averages = [];
                        for (let i = 0; i < pixelData.data.length; i += 4) {
                            let average = (pixelData.data[i] + pixelData.data[i + 1] + pixelData.data[i + 2] + pixelData.data[i + 3]) / 3;
                            averages.push(average);
                        }
                        let frames = sprite.findFrames(averages, pixelData.width, pixelData.height);
                        sprite.ctx.fillRect(0, 0, 400, 400);
                        let dy = 0;
                        for (let i1 = 0; i1 < frames.length; i1++) {
                            let frame = frames[i1 + 1];
                            for (let i = 0; i < frame.length; i++) {
                                let frameIndex = frame[i + 1];
                                pixelData.data[frameIndex * 4] = 255;
                                pixelData.data[frameIndex * 4 + 2] = 0;
                            }
                            frame = frames[i1];
                            for (let i = 0; i < frame.length; i++) {
                                let frameIndex = frame[i];
                                pixelData.data[frameIndex * 4] = 0;
                            }
                            if (i1 % 6 == 5)
                                dy += pixelData.height;
                            sprite.ctx.putImageData(pixelData, 0 + i1 * pixelData.width % (pixelData.width * 6), 0 + i1 + dy);
                        }
                    };
                }
                findFrames(averagedPixelData, width, height) {
                    let stack = [];
                    let claimed = new Set();
                    let results = [];
                    for (let i = 0; i < averagedPixelData.length; i++) {
                        if (claimed.has(i))
                            continue;
                        let average = averagedPixelData[i];
                        if (average <= 0)
                            continue;
                        stack.push(i);
                        let nextResult = [i];
                        while (stack.length > 0) {
                            if (stack.length > 60000)
                                break;
                            let pixelIndex = stack.pop();
                            let average = averagedPixelData[pixelIndex];
                            if (pixelIndex >= averagedPixelData.length)
                                continue;
                            if (pixelIndex < 0)
                                continue;
                            if (average <= 0)
                                continue;
                            if (claimed.has(pixelIndex))
                                continue;
                            claimed.add(pixelIndex);
                            nextResult.push(pixelIndex);
                            stack.push(pixelIndex + 1);
                            stack.push(pixelIndex - 1);
                            stack.push(pixelIndex + width);
                            stack.push(pixelIndex - width);
                        }
                        results.push(nextResult);
                    }
                    return results;
                }
                frameCoords(spriteNum) {
                    return this.frameCoordsCalculated[spriteNum];
                }
                static create(fileName) {
                    return new HtmlSprite(fileName);
                }
            };
            exports_10("HtmlSprite", HtmlSprite);
        }
    };
});
System.register("engine/renderers/sprite-manager", ["engine/renderers/sprite-animation", "engine/renderers/implementations/html/html-rect-sprite", "engine/renderers/implementations/html/html-sprite"], function (exports_11, context_11) {
    "use strict";
    var sprite_animation_1, html_rect_sprite_1, html_sprite_1, SpriteManager;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (sprite_animation_1_1) {
                sprite_animation_1 = sprite_animation_1_1;
            },
            function (html_rect_sprite_1_1) {
                html_rect_sprite_1 = html_rect_sprite_1_1;
            },
            function (html_sprite_1_1) {
                html_sprite_1 = html_sprite_1_1;
            }
        ],
        execute: function () {
            SpriteManager = class SpriteManager {
                constructor(spriteDir = "../sprites/") {
                    this.sprites = {};
                    this.animations = {};
                }
                createSprite(fileName, widthImgs, heightImgs) {
                    return new html_rect_sprite_1.HtmlRectSprite(fileName, widthImgs, heightImgs);
                }
                addSprite(spriteName, sprite) {
                    this.sprites[spriteName] = sprite;
                }
                getSprite(spriteName) {
                    if (!(spriteName in this.sprites)) {
                        throw "sprite " + spriteName + " does not exist";
                    }
                    return this.sprites[spriteName];
                }
                loadSprite(spriteName, fileName, widthImgs, heightImgs) {
                    var sprite = this.createSprite(fileName, widthImgs, heightImgs);
                    this.addSprite(spriteName, sprite);
                }
                loadSpriteOverlapping(spriteName, fileName) {
                    let sprite = html_sprite_1.HtmlSprite.create(fileName);
                }
                addAnimation(spriteName, animationName, spriteNumbers, delay = 1) {
                    var sa = sprite_animation_1.SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
                    if (!(spriteName in this.sprites)) {
                        throw "error adding animation "
                            + animationName
                            + ". spriteName "
                            + spriteName
                            + "doesn't exist. sprites must be added through addSprite method first";
                    }
                    this.animations[animationName] = sa;
                }
                getAnimation(animationName) {
                    if (animationName in this.animations) {
                        return this.animations[animationName];
                    }
                    else {
                        return null;
                    }
                }
                static create() {
                    return new SpriteManager();
                }
                static singeltonCreate() {
                    if (SpriteManager.spriteManager != null)
                        return SpriteManager.spriteManager;
                    SpriteManager.spriteManager = new SpriteManager();
                    return SpriteManager.spriteManager;
                }
            };
            exports_11("SpriteManager", SpriteManager);
            SpriteManager.spriteManager = null;
        }
    };
});
System.register("components/animation-component", ["engine/component/component", "engine/renderers/sprite-manager"], function (exports_12, context_12) {
    "use strict";
    var component_3, sprite_manager_1, AnimationComponent;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (sprite_manager_1_1) {
                sprite_manager_1 = sprite_manager_1_1;
            }
        ],
        execute: function () {
            AnimationComponent = class AnimationComponent extends component_3.Component {
                constructor(animationName, delay, spriteManager) {
                    super("animation");
                    this.frameNum = 0;
                    this.spriteNum = 0;
                    this.delay = delay;
                    this.currentDelay = delay;
                    this.spriteManager = spriteManager;
                    this.setSprite(animationName);
                    this.animationName = animationName;
                }
                getSpriteNumber() {
                    var frameNum = this.frameNum;
                    var spriteNum = this.spriteNumbers[frameNum];
                    return spriteNum;
                }
                setSprite(animationName) {
                    if (animationName == this.animationName) {
                        return;
                    }
                    this.animationName = animationName;
                    var animation = this.spriteManager.getAnimation(animationName);
                    if (animation == null) {
                        console.log(`no animation found: ${animationName}`);
                        return;
                    }
                    this.spriteNumbers = animation.spriteNumbers;
                    this.spriteName = animation.spriteName;
                    this.delay = animation.delay;
                    this.frameNum = 0;
                }
                update() {
                    if (this.currentDelay == 0) {
                        this.frameNum++;
                        this.frameNum %= this.spriteNumbers.length;
                        this.spriteNum = this.getSpriteNumber();
                        this.currentDelay = this.delay;
                    }
                    else {
                        this.currentDelay--;
                    }
                }
                static create() {
                    var spriteManager = sprite_manager_1.SpriteManager.singeltonCreate();
                    var ac = new AnimationComponent("blond", 2, spriteManager);
                    return ac;
                }
            };
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
            WasdComponent = class WasdComponent extends component_4.Component {
                constructor() {
                    super("wasd");
                    this.speed = 5;
                    this.dashSpeed = 15;
                    this.dashingTime = 0;
                    this.maxDashingTime = 20;
                    this.dashing = false;
                    this.dashWidth = 0;
                    this.dashHeight = 0;
                    this.dashSprite = "";
                    this.sprite = "grey";
                    this.walkSprite = "greyWalk";
                }
                startDashing() {
                    this.dashing = true;
                    this.dashingTime = this.maxDashingTime;
                }
                update() {
                }
                static create() {
                    return new WasdComponent();
                }
            };
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
            CropComponent = class CropComponent extends component_5.Component {
                constructor() {
                    super("crop");
                    this.timeSinceGrowth = 0;
                    this.growthLengths = [5, 5, 5];
                    this.growthStage = 0;
                    this.cropName = "turnip";
                    this.setCrop(this.cropName);
                }
                setSprites(sprites) {
                    this.growthSprites = sprites;
                    this.growthStage = 0;
                }
                isGrown() {
                    return this.growthStage == this.growthSprites.length - 1;
                }
                setCrop(cropName) {
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
                }
                update() {
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
                }
                ;
                static create() {
                    return new CropComponent();
                }
                ;
            };
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
            ProjectileComponent = class ProjectileComponent extends component_6.Component {
                constructor() {
                    super("projectile");
                    this.lifeSpan = 90;
                }
                update() {
                }
                static create() {
                    return new ProjectileComponent();
                }
            };
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
            FightComponent = class FightComponent extends component_7.Component {
                constructor() {
                    super("fight");
                    this.attack = false;
                    this.maxSpeed = 5;
                    this.range = 300;
                    this.reloadTime = 30;
                    this.reloadTimer = 30;
                }
                attackTarget() {
                }
                canFire() {
                    return this.reloadTime === this.reloadTimer;
                }
                update() {
                    if (this.reloadTimer <= this.reloadTime) {
                        this.reloadTimer--;
                    }
                    if (this.reloadTimer <= 0) {
                        this.reloadTimer = this.reloadTime;
                    }
                }
                static create() {
                    return new FightComponent();
                }
            };
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
            HealthComponent = class HealthComponent extends component_8.Component {
                constructor() {
                    super("health");
                    this.health = 100;
                }
                update() { }
                static create() {
                    return new HealthComponent();
                }
            };
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
            NeuralFightComponent = class NeuralFightComponent extends component_9.Component {
                constructor() {
                    super("neural");
                }
                update() { }
                static create() {
                    return new NeuralFightComponent();
                }
            };
            exports_18("NeuralFightComponent", NeuralFightComponent);
        }
    };
});
System.register("engine/entity/entity-factory", ["engine/entity/entity", "engine/component/component-factory"], function (exports_19, context_19) {
    "use strict";
    var entity_1, component_factory_1, EntityFactory;
    var __moduleName = context_19 && context_19.id;
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
            EntityFactory = class EntityFactory {
                constructor(componentFactory) {
                    this.entityTypes = {};
                    this.componentFactory = componentFactory;
                }
                registerEntity(componentName, EntityClass) {
                    if (EntityClass.prototype instanceof entity_1.Entity) {
                        this.entityTypes[componentName] = EntityClass;
                    }
                    else {
                        console.log("EntityClass must extend class Entity");
                    }
                }
                registerComponent(componentClass) {
                    this.componentFactory.registerComponent(componentClass);
                }
                create(entityName) {
                    let entityClass = this.entityTypes[entityName];
                    return this.entityTypes[entityName].create();
                }
                static create() {
                    let componentFactory = component_factory_1.ComponentFactory.create();
                    let ef = new EntityFactory(componentFactory);
                    return ef;
                }
            };
            exports_19("EntityFactory", EntityFactory);
        }
    };
});
System.register("engine/events/event-manager", ["engine/events/game-event", "engine/events/EventType"], function (exports_20, context_20) {
    "use strict";
    var game_event_1, EventType_2, EventManager;
    var __moduleName = context_20 && context_20.id;
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
            EventManager = class EventManager {
                constructor() {
                    this.keys = Array(1000);
                    this.keysReleased = Array(1000);
                    this.events = [];
                    this.callbacks = {};
                    this.keys = this.createKeyListener();
                }
                createKeyListener() {
                    var keys = Array(1000);
                    window.addEventListener("keydown", function (e) {
                        keys[e.keyCode] = true;
                    });
                    window.addEventListener("keyup", function (e) {
                        keys[e.keyCode] = false;
                    });
                    return keys;
                }
                update() {
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
                }
                emit(eventName, eventData = {}) {
                    var ge = new game_event_1.GameEvent(eventName, eventData);
                    this.events.push(ge);
                }
                fireCallbacks() {
                    var events;
                    var callbacks;
                    for (var eventName in this.events) {
                        events = this.events;
                        callbacks = this.callbacks[eventName];
                        events.forEach((event) => {
                            callbacks.forEach((callback) => {
                                callback(event);
                            });
                        });
                    }
                }
                addListener(eventName, callback) {
                    this.callbacks[eventName].push(callback);
                }
                createEvent(eventName) {
                    if (eventName in this.events)
                        return;
                    this.events = [];
                    this.callbacks[eventName] = [];
                }
                static create() {
                    var em = new EventManager();
                    em.createEvent(EventType_2.EventType.wDown);
                    em.createEvent(EventType_2.EventType.aDown);
                    em.createEvent(EventType_2.EventType.sDown);
                    em.createEvent(EventType_2.EventType.dDown);
                    return em;
                }
            };
            exports_20("EventManager", EventManager);
        }
    };
});
System.register("engine/system/system", [], function (exports_21, context_21) {
    "use strict";
    var EntitySystem;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            EntitySystem = class EntitySystem {
                constructor(game) {
                    this.game = game;
                }
                apply(entity, eventManager) {
                    throw "an entity system did not implement apply method.";
                }
                ;
                applyEvents(entity, eventManager) {
                    throw "an entity did not implement apply Events";
                }
            };
            exports_21("EntitySystem", EntitySystem);
        }
    };
});
System.register("engine/renderers/render-options", [], function (exports_22, context_22) {
    "use strict";
    var RenderOptions;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            RenderOptions = class RenderOptions {
                constructor() {
                    this.flip = true;
                    this.rotate = 0;
                }
            };
            exports_22("RenderOptions", RenderOptions);
        }
    };
});
System.register("engine/renderers/render", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("engine/renderers/implementations/html/html-renderer", ["engine/renderers/sprite-manager", "engine/renderers/implementations/html/html-canvas"], function (exports_24, context_24) {
    "use strict";
    var sprite_manager_2, html_canvas_3, HtmlRenderer;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (sprite_manager_2_1) {
                sprite_manager_2 = sprite_manager_2_1;
            },
            function (html_canvas_3_1) {
                html_canvas_3 = html_canvas_3_1;
            }
        ],
        execute: function () {
            HtmlRenderer = class HtmlRenderer {
                constructor(context, spriteManager) {
                    this.canvas = context.canvas;
                    this.ctx = context.ctx;
                    this.spriteManager = spriteManager;
                    this.offset = [0, 0];
                    this.ctx.font = "30px Arial";
                }
                setOffset(offset) {
                    if (offset.length > 2) {
                        console.log("warning incorrect number of offsets");
                        return;
                    }
                    this.offset[0] = offset[0] - this.canvas.width / 2;
                    this.offset[1] = offset[1] - this.canvas.height / 2;
                }
                cbox() {
                    this.ctx.fillStyle = "#7CFC00";
                    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }
                sprite(spriteName, x, y, width, height, spriteNumber, options) {
                    let flip = options.flip;
                    let sprite = this.spriteManager.getSprite(spriteName);
                    let fc = sprite.frameCoords(spriteNumber);
                    x = x - width / 2;
                    x -= this.offset[0];
                    y = y - height;
                    y -= this.offset[1];
                    let flipTranslation = 2 * (x + width / 2);
                    if (flip) {
                        this.ctx.translate(flipTranslation, 0);
                        this.ctx.scale(-1, 1);
                    }
                    if (options.rotate) {
                        this.ctx.rotate(options.rotate);
                    }
                    sprite.drawImage(spriteNumber, x, y, width, height);
                    if (options.rotate) {
                        this.ctx.rotate(-options.rotate);
                    }
                    if (flip) {
                        this.ctx.scale(-1, 1);
                        this.ctx.translate(-flipTranslation, 0);
                    }
                }
                text(text, x, y, size = 10) {
                    x -= this.offset[0];
                    y -= this.offset[1];
                    this.ctx.fillText(text, x, y);
                }
                circle(x, y, r) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#690055";
                    this.ctx.globalAlpha = .6;
                    this.ctx.arc(x - this.offset[0], y - this.offset[1], r * 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "black";
                    this.ctx.globalAlpha = 1;
                    this.ctx.arc(x - this.offset[0], y - this.offset[1], r * 1, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.globalAlpha = 1;
                }
                line(x1, y1, x2, y2) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x1, y1);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.stroke();
                }
                static create() {
                    let canvas = html_canvas_3.HtmlCanvas.createSingleton();
                    var spriteManager = sprite_manager_2.SpriteManager.singeltonCreate();
                    return new HtmlRenderer(canvas, spriteManager);
                }
            };
            exports_24("HtmlRenderer", HtmlRenderer);
        }
    };
});
System.register("engine/game", ["engine/entity/entity-factory", "engine/events/event-manager", "engine/renderers/implementations/html/html-renderer"], function (exports_25, context_25) {
    "use strict";
    var entity_factory_1, event_manager_1, html_renderer_1, Game;
    var __moduleName = context_25 && context_25.id;
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
            Game = class Game {
                constructor(entityFactory, renderer, eventManager) {
                    this._entities = [];
                    this.systems = [];
                    this.entityFactory = entityFactory;
                    this.renderer = renderer;
                    this.eventManager = eventManager;
                    this.spriteManager = this.renderer.spriteManager;
                }
                static create() {
                    var game = new Game(entity_factory_1.EntityFactory.create(), html_renderer_1.HtmlRenderer.create(), event_manager_1.EventManager.create());
                    return game;
                }
                get entities() {
                    return this._entities;
                }
                set entities(entities) {
                    this._entities = entities;
                }
                update() {
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
                }
                render() {
                }
                step() {
                    this.update();
                    this.render();
                }
                start() {
                    console.log("starting game");
                    this.intervalId = setInterval((function (game) {
                        return function () { game.step(); };
                    })(this), 1000 / 40);
                    return this.intervalId;
                }
                stop() {
                    clearInterval(this.intervalId);
                }
                addEntity(entityName) {
                    var entity = this.entityFactory.create(entityName);
                    this.entities.push(entity);
                    return entity;
                }
                getById(entityId) {
                    var entity;
                    for (var i = 0; i < this.entities.length; i++) {
                        entity = this.entities[i];
                        if (entityId == entity.id)
                            return entity;
                    }
                    return null;
                }
                destroy(entity) {
                    entity.destroyed = true;
                }
                cleanDestroyedEntities() {
                    let newEntities = [];
                    for (let i = 0; i < this.entities.length; i++) {
                        if (!this.entities[i].destroyed) {
                            newEntities.push(this.entities[i]);
                        }
                        else {
                            delete this.entities[i];
                        }
                    }
                    delete this.entities;
                    this.entities = newEntities;
                }
                addSystem(system) {
                    this.systems.push(system);
                }
                registerEntity(entityName, EntityClass) {
                    this.entityFactory.registerEntity(entityName, EntityClass);
                }
                registerComponent(EntityClass) {
                    this.entityFactory.registerComponent(EntityClass);
                }
            };
            exports_25("Game", Game);
        }
    };
});
System.register("components/inventory-component/inventory-item-type", [], function (exports_26, context_26) {
    "use strict";
    var InventoryItemType;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
            InventoryItemType = class InventoryItemType {
                constructor(itemName, itemDescription, itemSpriteName) {
                    this.itemId = -1;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                    InventoryItemType.largestItemId += 1;
                    this.itemId = InventoryItemType.largestItemId;
                    this.itemName = itemName;
                    this.itemDescription = itemDescription;
                    this.itemSpriteName = itemSpriteName;
                }
                static create(itemName, itemSpriteName, itemDescription) {
                    let newItemType;
                    newItemType = new InventoryItemType(itemName, itemDescription, itemSpriteName);
                    return newItemType;
                }
            };
            exports_26("InventoryItemType", InventoryItemType);
            InventoryItemType.largestItemId = -1;
        }
    };
});
System.register("components/inventory-component/inventory-item", [], function (exports_27, context_27) {
    "use strict";
    var InventoryItem;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
            InventoryItem = class InventoryItem {
                constructor() {
                    this.itemQuantity = 0;
                    this.itemName = "no name";
                    this.itemDescription = "no description";
                    this.itemSlot = -1;
                }
                static create(itemType) {
                    let item = new InventoryItem();
                    item.itemName = itemType.itemName;
                    item.itemDescription = itemType.itemDescription;
                    return item;
                }
            };
            exports_27("InventoryItem", InventoryItem);
        }
    };
});
System.register("components/inventory-component/item-registry", ["components/inventory-component/inventory-item-type"], function (exports_28, context_28) {
    "use strict";
    var inventory_item_type_1, InventoryItemRegistry;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (inventory_item_type_1_1) {
                inventory_item_type_1 = inventory_item_type_1_1;
            }
        ],
        execute: function () {
            InventoryItemRegistry = class InventoryItemRegistry {
                constructor() {
                    this.itemTypes = {};
                }
                registerItemType(itemName, itemSpriteName, description) {
                    let newItemType;
                    newItemType = new inventory_item_type_1.InventoryItemType(itemName, description, itemSpriteName);
                    if (itemName in this.itemTypes) {
                        throw "error: item type: " + itemName + " already exists";
                    }
                    this.itemTypes[itemName] = newItemType;
                }
                static singletonCreate() {
                    if (this.singletonRegistry)
                        return this.singletonRegistry;
                    let itemRegistry = new InventoryItemRegistry();
                    this.singletonRegistry = itemRegistry;
                    this.singletonRegistry.populateItems();
                    return this.singletonRegistry;
                }
                populateItems() {
                    this.registerItemType("wheat", "wheat2", "its a wheat");
                    this.registerItemType("onion", "onion5", "its an onion");
                    this.registerItemType("corn", "corn2", "its corn");
                    this.registerItemType("pumpkin", "pumpkin2", "its a pumpkin");
                    this.registerItemType("turnip", "turnip2", "its a turnip");
                    this.registerItemType("nothing", "nothing", "nothing");
                }
            };
            exports_28("InventoryItemRegistry", InventoryItemRegistry);
        }
    };
});
System.register("components/inventory-component/give-item-event-data", [], function (exports_29, context_29) {
    "use strict";
    var GiveItemEventData;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
            GiveItemEventData = class GiveItemEventData {
                constructor(itemName, quantity) {
                    this.itemName = itemName;
                    this.quantity = quantity;
                }
            };
            exports_29("GiveItemEventData", GiveItemEventData);
        }
    };
});
System.register("components/text-component/text-placement", [], function (exports_30, context_30) {
    "use strict";
    var TextPlacement;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
            TextPlacement = class TextPlacement {
                constructor(textValue, offsetX, offsetY) {
                    this.textValue = textValue;
                    this.offsetX = offsetX;
                    this.offsetY = offsetY;
                }
            };
            exports_30("TextPlacement", TextPlacement);
        }
    };
});
System.register("components/text-component/text-component", ["engine/component/component", "components/text-component/text-placement"], function (exports_31, context_31) {
    "use strict";
    var component_10, text_placement_1, TextComponent;
    var __moduleName = context_31 && context_31.id;
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
            TextComponent = class TextComponent extends component_10.Component {
                constructor() {
                    super("text");
                    this.textPlacements = [];
                }
                addTextPlacement(text, offsetX = 0, offsetY = 0) {
                    this.textPlacements.push(new text_placement_1.TextPlacement(text, offsetX, offsetY));
                }
                setText(value, index = 0) {
                    if (index >= 0 && index < this.textPlacements.length) {
                        this.textPlacements[index].textValue = value;
                    }
                }
                update() { }
                static create() {
                    return new TextComponent();
                }
            };
            exports_31("TextComponent", TextComponent);
        }
    };
});
System.register("entities/inventory-item-entity", ["engine/entity/entity", "builders/build-components"], function (exports_32, context_32) {
    "use strict";
    var entity_2, build_components_1, InventoryItemEntity;
    var __moduleName = context_32 && context_32.id;
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
            InventoryItemEntity = class InventoryItemEntity extends entity_2.Entity {
                handleEvents(events) {
                }
                constructor(cf) {
                    super(cf);
                    this.addComponent("position");
                    this.addComponent("animation");
                    let text = this.addComponent("text");
                    text.addTextPlacement("", 0, 0);
                }
                static create() {
                    return new InventoryItemEntity(build_components_1.createComponentFactory());
                }
            };
            exports_32("InventoryItemEntity", InventoryItemEntity);
        }
    };
});
System.register("components/inventory-component/inventory-component", ["engine/component/component", "components/inventory-component/inventory-item", "components/inventory-component/item-registry"], function (exports_33, context_33) {
    "use strict";
    var component_11, inventory_item_1, item_registry_1, InventoryComponent;
    var __moduleName = context_33 && context_33.id;
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
            InventoryComponent = class InventoryComponent extends component_11.Component {
                constructor(itemRegistry) {
                    super("inventory");
                    this.inventory = {};
                    this.itemSlots = [];
                    this.selectedItemSlot = 0;
                    this.inventoryItemEntities = [];
                    this.itemRegistry = itemRegistry;
                    this.itemSlots = new Array(10);
                    for (let i = 0; i < this.itemSlots.length; i++) {
                        let itemType = this.itemRegistry.itemTypes["nothing"];
                        this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
                    }
                }
                hashInventoryToString() {
                    let inventoryString = "Inventory:";
                    for (let i = 0; i < this.itemSlots.length; i++) {
                        let item;
                        item = this.itemSlots[i];
                        inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;
                    }
                    inventoryString += "\n<---------->";
                    console.log(inventoryString);
                }
                inventoryToString() {
                    let inventoryString = "Inventory:";
                    for (let i = 0; i < this.itemSlots.length; i++) {
                        let item;
                        item = this.itemSlots[i];
                        inventoryString += `\n${item.itemName}: ${item.itemQuantity}`;
                    }
                    inventoryString += "\n<---------->";
                    console.log(inventoryString);
                }
                selectItemSlot(itemSlotNumber) {
                    this.selectedItemSlot = itemSlotNumber % this.itemSlots.length;
                }
                getSelectedItem() {
                    return this.itemSlots[this.selectedItemSlot];
                }
                addItemToHashTable(itemName, quantity = 1) {
                    if (!(itemName in this.itemRegistry.itemTypes)) {
                        console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
                        return false;
                    }
                    let itemType = this.itemRegistry.itemTypes[itemName];
                    if (!(itemName in this.inventory)) {
                        this.inventory[itemName] = inventory_item_1.InventoryItem.create(itemType);
                    }
                    this.inventory[itemName].itemQuantity += quantity;
                    return true;
                }
                getItems() {
                    return this.itemSlots;
                }
                addItem(itemName, quantity = 1) {
                    if (!(itemName in this.itemRegistry.itemTypes)) {
                        console.log(`Warning: itemName ${itemName} is not in the itemRegistry`);
                        return false;
                    }
                    for (let i = 0; i < this.itemSlots.length; i++) {
                        let itemSlot = this.itemSlots[i];
                        if (itemSlot.itemName == itemName) {
                            itemSlot.itemQuantity += quantity;
                            return true;
                        }
                    }
                    for (let i = 0; i < this.itemSlots.length; i++) {
                        let itemSlot = this.itemSlots[i];
                        if (itemSlot.itemName == "nothing") {
                            let itemType = this.itemRegistry.itemTypes[itemName];
                            this.itemSlots[i] = inventory_item_1.InventoryItem.create(itemType);
                            this.itemSlots[i].itemQuantity = 1;
                            return;
                        }
                    }
                    return true;
                }
                update(entity) {
                    for (let i = 0; i < this.inventoryItemEntities.length; i++) {
                        let inventoryItemEntity = this.inventoryItemEntities[i];
                        let spriteComponent;
                        spriteComponent = inventoryItemEntity.getComponent("animation");
                        let item = this.itemSlots[i];
                        let itemType = this.itemRegistry.itemTypes[item.itemName];
                        spriteComponent.setSprite(itemType.itemSpriteName);
                    }
                }
                handleEvents(event) {
                }
                static create() {
                    let inventory;
                    inventory = new InventoryComponent(item_registry_1.InventoryItemRegistry.singletonCreate());
                    return inventory;
                }
            };
            exports_33("InventoryComponent", InventoryComponent);
        }
    };
});
System.register("components/place-item/place-item-request", [], function (exports_34, context_34) {
    "use strict";
    var PlaceItemRequest;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [],
        execute: function () {
            PlaceItemRequest = class PlaceItemRequest {
                constructor(entityName, coordinates, quantity = 1, successCallback, relative = true) {
                    this.entityName = entityName;
                    this.coordinates = coordinates;
                    this.quantity = quantity;
                    this.successCallback = successCallback;
                    this.relative = relative;
                }
            };
            exports_34("PlaceItemRequest", PlaceItemRequest);
        }
    };
});
System.register("components/place-item/place-item-component", ["engine/component/component", "components/place-item/place-item-request"], function (exports_35, context_35) {
    "use strict";
    var component_12, place_item_request_1, PlaceItemComponent;
    var __moduleName = context_35 && context_35.id;
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
            PlaceItemComponent = class PlaceItemComponent extends component_12.Component {
                constructor() {
                    super("placeItem");
                    this.placeItemRequests = [];
                }
                placeItem(entityName, coordinates = [0, 0], successCallback, relative = true) {
                    let placeItemRequest;
                    placeItemRequest = new place_item_request_1.PlaceItemRequest(entityName, coordinates, 1, successCallback, relative = true);
                    this.placeItemRequests.push(placeItemRequest);
                }
                update(entity) {
                }
                static create() {
                    return new PlaceItemComponent();
                }
            };
            exports_35("PlaceItemComponent", PlaceItemComponent);
        }
    };
});
System.register("components/crop-harvester-component", ["engine/component/component"], function (exports_36, context_36) {
    "use strict";
    var component_13, CropHarvesterComponent;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [
            function (component_13_1) {
                component_13 = component_13_1;
            }
        ],
        execute: function () {
            CropHarvesterComponent = class CropHarvesterComponent extends component_13.Component {
                constructor() {
                    super(...arguments);
                    this.harvesting = false;
                    this.harvestTime = 0;
                    this.timeItTakesToHarvest = 10;
                }
                startHarvest() {
                    this.harvesting = true;
                    this.harvestTime = this.timeItTakesToHarvest;
                }
                update(entity) {
                    if (this.harvestTime > 0) {
                        this.harvestTime -= 1;
                    }
                    else {
                        this.harvesting = false;
                    }
                }
                static create() {
                    return new CropHarvesterComponent("cropHarvester");
                }
            };
            exports_36("CropHarvesterComponent", CropHarvesterComponent);
        }
    };
});
System.register("entities/particles/particle-entity", ["builders/build-components", "engine/entity/entity"], function (exports_37, context_37) {
    "use strict";
    var build_components_2, entity_3, ParticleEntity;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (build_components_2_1) {
                build_components_2 = build_components_2_1;
            },
            function (entity_3_1) {
                entity_3 = entity_3_1;
            }
        ],
        execute: function () {
            ParticleEntity = class ParticleEntity extends entity_3.Entity {
                constructor(cf) {
                    super(cf);
                    let position = this.addComponent("position");
                    this.addComponent("primitive");
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_2.createComponentFactory();
                    return new ParticleEntity(cf);
                }
            };
            exports_37("ParticleEntity", ParticleEntity);
        }
    };
});
System.register("components/particle-componet", ["engine/component/component"], function (exports_38, context_38) {
    "use strict";
    var component_14, ParticleComponent;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (component_14_1) {
                component_14 = component_14_1;
            }
        ],
        execute: function () {
            ParticleComponent = class ParticleComponent extends component_14.Component {
                constructor() {
                    super("particles");
                    this.particles = [];
                    this.targetParticles = 10;
                    this.time = 0;
                    this.maxSpeed = 50;
                    this.paths = [
                        (center, position, time) => {
                            let f = () => 40 * Math.sin(.2 * time / 2);
                            let f2 = () => 40 * Math.cos(.2 * time / 2);
                            position.h = -2 + center.h - 2 * center.width / 3 + f();
                            position.x = center.x - f2();
                            position.y = center.y + 1;
                        }
                    ];
                }
                addParticle(particle) {
                    this.particles.push(particle);
                }
                update(entity) {
                    for (let i = 0; i < this.particles.length; i++) {
                        let particle = this.particles[i];
                        let path = this.paths[i % this.paths.length];
                        let center = entity.getComponent("position");
                        let particlePosition = particle.getComponent("position");
                        path(center, particlePosition, -(this.time + i * 10));
                    }
                }
                static create() {
                    return new ParticleComponent();
                }
            };
            exports_38("ParticleComponent", ParticleComponent);
        }
    };
});
System.register("components/primitive-component", ["engine/component/component"], function (exports_39, context_39) {
    "use strict";
    var component_15, PrimitiveComponent;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [
            function (component_15_1) {
                component_15 = component_15_1;
            }
        ],
        execute: function () {
            PrimitiveComponent = class PrimitiveComponent extends component_15.Component {
                update(entity) {
                }
                static create() {
                    return new PrimitiveComponent("primitive");
                }
            };
            exports_39("PrimitiveComponent", PrimitiveComponent);
        }
    };
});
System.register("builders/build-components", ["components/position-component", "components/animation-component", "components/wasd-component", "components/crop-component", "components/projectile-component", "components/fight-component", "components/health-component", "components/neural-fight-component", "components/inventory-component/inventory-component", "engine/component/component-factory", "components/place-item/place-item-component", "components/crop-harvester-component", "components/text-component/text-component", "components/particle-componet", "components/primitive-component"], function (exports_40, context_40) {
    "use strict";
    var position_component_1, animation_component_1, wasd_component_1, crop_component_1, projectile_component_1, fight_component_1, health_component_1, neural_fight_component_1, inventory_component_1, component_factory_2, place_item_component_1, crop_harvester_component_1, text_component_1, particle_componet_1, primitive_component_1;
    var __moduleName = context_40 && context_40.id;
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
        cf.registerComponent(particle_componet_1.ParticleComponent);
        cf.registerComponent(primitive_component_1.PrimitiveComponent);
        return cf;
    }
    exports_40("createComponentFactory", createComponentFactory);
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
        game.registerComponent(particle_componet_1.ParticleComponent);
        game.registerComponent(primitive_component_1.PrimitiveComponent);
    }
    exports_40("buildComponents", buildComponents);
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
            },
            function (particle_componet_1_1) {
                particle_componet_1 = particle_componet_1_1;
            },
            function (primitive_component_1_1) {
                primitive_component_1 = primitive_component_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("entities/crop-entity", ["engine/entity/entity", "builders/build-components"], function (exports_41, context_41) {
    "use strict";
    var entity_4, build_components_3, CropEntity;
    var __moduleName = context_41 && context_41.id;
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
            CropEntity = class CropEntity extends entity_4.Entity {
                constructor(cf) {
                    super(cf);
                    var position = this.addComponent("position");
                    let animation = this.addComponent("animation");
                    let crop = this.addComponent("crop");
                    if (crop.growthSprites.length > 0) {
                        animation.setSprite(crop.growthSprites[0]);
                    }
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_3.createComponentFactory();
                    return new CropEntity(cf);
                }
            };
            exports_41("CropEntity", CropEntity);
        }
    };
});
System.register("builders/sprite-builder", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
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
        sm.loadSprite("arm", "arm.png", 1, 1);
        sm.addAnimation("arm", "arm0", [1]);
        sm.loadSpriteOverlapping("swords", "sword-7Soul1.png");
        return sm;
    }
    exports_42("populateSpriteManager", populateSpriteManager);
    function buildSprites(game) {
        populateSpriteManager(game.spriteManager);
    }
    exports_42("buildSprites", buildSprites);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("entities/player-entity", ["engine/entity/entity", "builders/build-components"], function (exports_43, context_43) {
    "use strict";
    var entity_5, build_components_4, PlayerEntity;
    var __moduleName = context_43 && context_43.id;
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
            PlayerEntity = class PlayerEntity extends entity_5.Entity {
                constructor(componentFactory) {
                    super(componentFactory);
                    var animation = this.addComponent("animation");
                    var position = this.addComponent("position");
                    var wasd = this.addComponent("wasd");
                    var inventory = this.addComponent("inventory");
                    let placeItem = this.addComponent("placeItem");
                    let cropHarvester;
                    cropHarvester = this.addComponent("cropHarvester");
                    let particles = this.addComponent("particles");
                    particles.targetParticles = 8;
                    var sprite = "grey";
                    var walkSprite = "greyWalk";
                    animation.setSprite(sprite);
                    wasd.sprite = sprite;
                    wasd.walkSprite = walkSprite;
                    position.width = 70;
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_4.createComponentFactory();
                    var entity = new PlayerEntity(cf);
                    return entity;
                }
            };
            exports_43("PlayerEntity", PlayerEntity);
        }
    };
});
System.register("entities/first-entity", ["engine/entity/entity", "builders/build-components"], function (exports_44, context_44) {
    "use strict";
    var entity_6, build_components_5, FirstEntity;
    var __moduleName = context_44 && context_44.id;
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
            FirstEntity = class FirstEntity extends entity_6.Entity {
                constructor(cf) {
                    super(cf);
                    var position = this.addComponent("position");
                    position.y = 9999999;
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_5.createComponentFactory();
                    var entity = new FirstEntity(cf);
                    return entity;
                }
            };
            exports_44("FirstEntity", FirstEntity);
        }
    };
});
System.register("systems/render-system", ["engine/system/system", "engine/renderers/render-options", "entities/first-entity"], function (exports_45, context_45) {
    "use strict";
    var system_1, render_options_1, first_entity_1, RenderSystem;
    var __moduleName = context_45 && context_45.id;
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
            RenderSystem = class RenderSystem extends system_1.EntitySystem {
                constructor(renderer, game) {
                    super(game);
                    this.renderer = renderer;
                }
                static create(game) {
                    let hr = game.renderer;
                    return new RenderSystem(hr, game);
                }
                apply(entity) {
                    if (entity instanceof first_entity_1.FirstEntity) {
                        let player = this.game.getById(1);
                        this.centerCameraOn(player);
                    }
                    this.renderAnimationComponent(entity);
                    this.renderText(entity);
                    this.renderPrimitive(entity);
                }
                renderText(entity) {
                    let p = entity.getComponent("position", true);
                    let text = entity.getComponent("text", true);
                    if (p == null || text == null)
                        return;
                    for (let i = 0; i < text.textPlacements.length; i++) {
                        let tp = text.textPlacements[i];
                        this.renderer.text(tp.textValue, p.x, p.y, 10);
                    }
                }
                renderAnimationComponent(entity) {
                    var a = entity.getComponent("animation", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || p == null)
                        return;
                    var r = this.renderer;
                    let options = new render_options_1.RenderOptions();
                    options.flip = !p.faceRight;
                    options.rotate = p.rotate;
                    r.sprite(a.spriteName, Math.round(p.x), Math.round(p.y + p.h), p.width, p.height, a.getSpriteNumber(), options);
                }
                renderPrimitive(entity) {
                    var primitive = entity.getComponent("primitive", true);
                    var position = entity.getComponent("position", true);
                    if (primitive == null || position == null)
                        return;
                    this.renderer.circle(Math.round(position.x), Math.round(position.y + position.h), 4);
                }
                centerCameraOn(entity) {
                    let position = entity.getComponent("position");
                    this.renderer.setOffset([position.x, position.y]);
                }
                applyEvents() { }
            };
            exports_45("RenderSystem", RenderSystem);
        }
    };
});
System.register("systems/wasd-system", ["engine/system/system", "engine/events/game-event", "engine/events/EventType"], function (exports_46, context_46) {
    "use strict";
    var system_2, game_event_2, EventType_3, WasdSystem;
    var __moduleName = context_46 && context_46.id;
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
            WasdSystem = class WasdSystem extends system_2.EntitySystem {
                constructor(game) {
                    super(game);
                }
                static create(game) {
                    var wasd = new WasdSystem(game);
                    return wasd;
                }
                apply() { }
                applyEvents(entity, eventManager) {
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
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(walkSprite);
                                position.vy = -speed;
                                break;
                            case EventType_3.EventType.wUp:
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case EventType_3.EventType.aDown:
                                if (wasdComponent.dashing)
                                    break;
                                position.faceRight = false;
                                animation.setSprite(walkSprite);
                                position.vx = -speed;
                                break;
                            case EventType_3.EventType.aUp:
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case EventType_3.EventType.sDown:
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(walkSprite);
                                position.vy = speed;
                                break;
                            case EventType_3.EventType.sUp:
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(sprite);
                                position.vy = 0;
                                break;
                            case EventType_3.EventType.dDown:
                                if (wasdComponent.dashing)
                                    break;
                                position.faceRight = true;
                                animation.setSprite(walkSprite);
                                position.vx = speed;
                                break;
                            case EventType_3.EventType.dUp:
                                if (wasdComponent.dashing)
                                    break;
                                animation.setSprite(sprite);
                                position.vx = 0;
                                break;
                            case EventType_3.EventType.spaceUp:
                                var ge = game_event_2.GameEvent.create(EventType_3.EventType.fireProjectile);
                                entity.emit(ge);
                                break;
                            case EventType_3.EventType.spaceUp:
                                break;
                            case EventType_3.EventType.pUp:
                                console.log(this.game);
                                break;
                            case EventType_3.EventType.iUp:
                                let inventory;
                                inventory = entity.getComponent("inventory", true);
                                inventory.inventoryToString();
                                break;
                            case EventType_3.EventType.fUp:
                                if (wasdComponent.dashing)
                                    break;
                                wasdComponent.startDashing();
                                wasdComponent.dashWidth = position.width;
                                wasdComponent.dashHeight = position.height;
                                wasdComponent.dashSprite = animation.animationName;
                                animation.setSprite('fireball');
                                break;
                        }
                    }
                    this.updateDashing(entity, wasdComponent, position, animation);
                }
                updateDashing(entity, wasdComponent, position, animation) {
                    if (!wasdComponent.dashing)
                        return;
                    if (wasdComponent.dashingTime == 0) {
                        wasdComponent.dashing = false;
                        position.vx = 0;
                        position.vy = 0;
                        position.h = 0;
                        animation.setSprite(wasdComponent.dashSprite);
                        return;
                    }
                    wasdComponent.dashingTime -= 1;
                    position.vx = Math.sign(position.faceX) * wasdComponent.dashSpeed;
                    position.vy = Math.sign(position.faceY) * wasdComponent.dashSpeed;
                }
            };
            exports_46("WasdSystem", WasdSystem);
        }
    };
});
System.register("entities/projectile-entity", ["engine/entity/entity", "builders/build-components"], function (exports_47, context_47) {
    "use strict";
    var entity_7, build_components_6, ProjectileEntity;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (entity_7_1) {
                entity_7 = entity_7_1;
            },
            function (build_components_6_1) {
                build_components_6 = build_components_6_1;
            }
        ],
        execute: function () {
            ProjectileEntity = class ProjectileEntity extends entity_7.Entity {
                constructor(cf) {
                    super(cf);
                    var animation = this.addComponent("animation");
                    var position = this.addComponent("position");
                    this.addComponent("projectile");
                    animation.setSprite("fireball");
                }
                handleEvents(events) {
                }
                ;
                static create() {
                    let cf = build_components_6.createComponentFactory();
                    var pe = new ProjectileEntity(cf);
                    return pe;
                }
            };
            exports_47("ProjectileEntity", ProjectileEntity);
        }
    };
});
System.register("systems/crop-system", ["engine/system/system", "engine/entity/entity", "engine/events/EventType"], function (exports_48, context_48) {
    "use strict";
    var system_3, entity_8, EventType_4, CropSystem;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [
            function (system_3_1) {
                system_3 = system_3_1;
            },
            function (entity_8_1) {
                entity_8 = entity_8_1;
            },
            function (EventType_4_1) {
                EventType_4 = EventType_4_1;
            }
        ],
        execute: function () {
            CropSystem = class CropSystem extends system_3.EntitySystem {
                constructor(game) {
                    super(game);
                }
                apply(entity) {
                    var a = entity.getComponent("animation", true);
                    var c = entity.getComponent("crop", true);
                    var p = entity.getComponent("position", true);
                    if (a == null || c == null) {
                        return;
                    }
                    if (c.timeSinceGrowth == 0 || c.timeSinceGrowth == 1) {
                        a.setSprite(c.growthSprites[c.growthStage]);
                    }
                }
                ;
                applyEvents(entity) {
                    var c = entity.getComponent("crop", true);
                    if (c == null)
                        return;
                    var event;
                    for (var i = 0; i < entity.targetedEvents.length; i++) {
                        event = entity.targetedEvents[i];
                        this.handleEvent(event, entity);
                    }
                }
                ;
                static create(game) {
                    return new CropSystem(game);
                }
                ;
                handleCollision(event, entity) {
                    if (!(event.eventData instanceof entity_8.Entity)) {
                        return;
                    }
                    let collidedEntity = event.eventData;
                    let cropHarvester;
                    try {
                        cropHarvester = collidedEntity.getComponent("cropHarvester");
                    }
                    catch (_a) {
                        return;
                    }
                    if (!cropHarvester.harvesting) {
                        return;
                    }
                    let crop = entity.getComponent("crop");
                    let playerInventory;
                    playerInventory = collidedEntity.getComponent("inventory");
                    if (crop.isGrown()) {
                        playerInventory.addItem(crop.cropName, 1);
                    }
                    this.game.destroy(entity);
                }
                handleEvent(event, entity) {
                    switch (event.eventName) {
                        case EventType_4.EventType.collision:
                            this.handleCollision(event, entity);
                            break;
                    }
                }
            };
            exports_48("CropSystem", CropSystem);
        }
    };
});
System.register("systems/collision-system", ["engine/system/system", "entities/first-entity", "entities/projectile-entity", "engine/events/game-event", "engine/events/EventType"], function (exports_49, context_49) {
    "use strict";
    var system_4, first_entity_2, projectile_entity_1, game_event_3, EventType_5, CollisionSystem;
    var __moduleName = context_49 && context_49.id;
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
            CollisionSystem = class CollisionSystem extends system_4.EntitySystem {
                constructor(game) {
                    super(game);
                    this.movingEntities = {};
                    this.colliding = {};
                    this.numCollisions = 0;
                }
                distance(e1, e2) {
                    var p1 = e1.getComponent("position");
                    var p2 = e2.getComponent("position");
                    var dx = p2.x - p1.x;
                    var dy = p2.y - p1.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }
                checkCol(e1, e2) {
                    var distance = this.distance(e1, e2);
                    var p1 = e1.getComponent("position");
                    var mask = ((p1.width) + (p1.height)) / 4;
                    var collision = distance < mask;
                    return collision;
                }
                hashCollision(e1, e2) {
                    if (e1.id > e2.id) {
                        [e1, e2] = [e2, e1];
                    }
                    return e1.id.toString() + ":" + e2.id.toString();
                }
                addCollision(e1, e2) {
                    var hash;
                    hash = this.hashCollision(e1, e2);
                    if (!(hash in this.colliding)) {
                        this.colliding[hash] = [e1, e2];
                        this.numCollisions++;
                    }
                }
                removeCollision(e1, e2) {
                    var hash = this.hashCollision(e1, e2);
                    if (hash in this.colliding) {
                        delete this.colliding[hash];
                        this.numCollisions--;
                    }
                }
                emitCollision(e1, e2) {
                    e1.emit(game_event_3.GameEvent.create(EventType_5.EventType.collision, e2));
                    e2.emit(game_event_3.GameEvent.create(EventType_5.EventType.collision, e1));
                }
                removeMovingEntity(id) {
                    delete this.movingEntities[id];
                }
                apply(entity) {
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
                        for (let id in this.movingEntities) {
                            if (this.movingEntities[id].destroyed) {
                                this.removeMovingEntity(parseInt(id));
                            }
                        }
                    }
                    var position = entity.getComponent("position");
                    var collision;
                    var entityTarget;
                    for (let id in this.movingEntities) {
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
                        let position = entity.getComponent("position");
                    }
                }
                ;
                applyEvents(entity) {
                }
                static create(game) {
                    return new CollisionSystem(game);
                }
            };
            exports_49("CollisionSystem", CollisionSystem);
        }
    };
});
System.register("systems/projectile-system", ["engine/system/system", "entities/projectile-entity", "engine/events/game-event", "engine/events/EventType"], function (exports_50, context_50) {
    "use strict";
    var system_5, projectile_entity_2, game_event_4, EventType_6, ProjectileSystem;
    var __moduleName = context_50 && context_50.id;
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
            ProjectileSystem = class ProjectileSystem extends system_5.EntitySystem {
                constructor(game) {
                    super(game);
                }
                apply(entity) {
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
                }
                fireProjectile(entity, vx = null, vy = null) {
                    let projectile = this.game.addEntity("projectile");
                    let projectileComponent = projectile.getComponent("projectile");
                    let projPosition = projectile.getComponent("position");
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
                }
                applyEvents(entity) {
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
                }
                static create(game) {
                    return new ProjectileSystem(game);
                }
            };
            exports_50("ProjectileSystem", ProjectileSystem);
        }
    };
});
System.register("systems/health-system", ["engine/system/system", "engine/events/EventType"], function (exports_51, context_51) {
    "use strict";
    var system_6, EventType_7, HealthSystem;
    var __moduleName = context_51 && context_51.id;
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
            HealthSystem = class HealthSystem extends system_6.EntitySystem {
                constructor(game) {
                    super(game);
                }
                apply(entity) {
                }
                applyEvents(entity) {
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
                }
                handleDamage(entity, event) {
                    if (event.eventData === null) {
                        event.eventData = { damage: 50 };
                    }
                    var health = entity.getComponent("health", true);
                    health.health -= event.eventData.damage;
                    if (health.health < 0) {
                        this.game.destroy(entity);
                    }
                }
                static create(game) {
                    return new HealthSystem(game);
                }
            };
            exports_51("HealthSystem", HealthSystem);
        }
    };
});
System.register("systems/position-system", ["engine/system/system", "engine/events/EventType"], function (exports_52, context_52) {
    "use strict";
    var system_7, EventType_8, PositionSystem;
    var __moduleName = context_52 && context_52.id;
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
            PositionSystem = class PositionSystem extends system_7.EntitySystem {
                constructor(game) {
                    super(game);
                }
                static create(game) {
                    return new PositionSystem(game);
                }
                apply(entity) {
                }
                applyEvents(entity) {
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
                }
            };
            exports_52("PositionSystem", PositionSystem);
        }
    };
});
System.register("systems/neural-fight-system", ["engine/system/system"], function (exports_53, context_53) {
    "use strict";
    var system_8, NeuralFightSystem;
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (system_8_1) {
                system_8 = system_8_1;
            }
        ],
        execute: function () {
            NeuralFightSystem = class NeuralFightSystem extends system_8.EntitySystem {
                constructor(game) {
                    super(game);
                }
                static create(game) {
                    return new NeuralFightSystem(game);
                }
                apply(entity) {
                    var neural = entity.getComponent("neural", true);
                    if (neural == null) {
                        return;
                    }
                }
                applyEvents(entity) {
                    var events = entity.targetedEvents;
                    var event;
                    for (var i = 0; i < events.length; i++) {
                        event = events[i];
                    }
                }
            };
            exports_53("NeuralFightSystem", NeuralFightSystem);
        }
    };
});
System.register("entities/villager-entity", ["engine/entity/entity", "builders/build-components"], function (exports_54, context_54) {
    "use strict";
    var entity_9, build_components_7, VillagerEntity;
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [
            function (entity_9_1) {
                entity_9 = entity_9_1;
            },
            function (build_components_7_1) {
                build_components_7 = build_components_7_1;
            }
        ],
        execute: function () {
            VillagerEntity = class VillagerEntity extends entity_9.Entity {
                constructor(cf) {
                    super(cf);
                    var animation = this.addComponent("animation");
                    var position = this.addComponent("position");
                    var fight = this.addComponent("fight");
                    var health = this.addComponent("health");
                    var neural = this.addComponent("neural");
                    position.width = 70;
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_7.createComponentFactory();
                    var entity = new VillagerEntity(cf);
                    return entity;
                }
            };
            exports_54("VillagerEntity", VillagerEntity);
        }
    };
});
System.register("entities/particles/particles-entity", ["builders/build-components", "engine/entity/entity"], function (exports_55, context_55) {
    "use strict";
    var build_components_8, entity_10, ParticlesEntity;
    var __moduleName = context_55 && context_55.id;
    return {
        setters: [
            function (build_components_8_1) {
                build_components_8 = build_components_8_1;
            },
            function (entity_10_1) {
                entity_10 = entity_10_1;
            }
        ],
        execute: function () {
            ParticlesEntity = class ParticlesEntity extends entity_10.Entity {
                constructor(cf) {
                    super(cf);
                    let position = this.addComponent("position");
                    position.width = 10;
                    this.addComponent("particles");
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_8.createComponentFactory();
                    return new ParticlesEntity(cf);
                }
            };
            exports_55("ParticlesEntity", ParticlesEntity);
        }
    };
});
System.register("builders/entity-builder", ["entities/player-entity", "entities/villager-entity", "entities/crop-entity", "entities/first-entity", "entities/projectile-entity", "entities/inventory-item-entity", "entities/particles/particle-entity", "entities/particles/particles-entity"], function (exports_56, context_56) {
    "use strict";
    var player_entity_1, villager_entity_1, crop_entity_1, first_entity_3, projectile_entity_3, inventory_item_entity_1, particle_entity_1, particles_entity_1;
    var __moduleName = context_56 && context_56.id;
    function buildEntities(game) {
        game.registerEntity("player", player_entity_1.PlayerEntity);
        game.registerEntity("villager", villager_entity_1.VillagerEntity);
        game.registerEntity("crop", crop_entity_1.CropEntity);
        game.registerEntity("first", first_entity_3.FirstEntity);
        game.registerEntity("projectile", projectile_entity_3.ProjectileEntity);
        game.registerEntity("inventoryItem", inventory_item_entity_1.InventoryItemEntity);
        game.registerEntity("particle", particle_entity_1.ParticleEntity);
        game.registerEntity("particles", particles_entity_1.ParticlesEntity);
    }
    exports_56("buildEntities", buildEntities);
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
            },
            function (particle_entity_1_1) {
                particle_entity_1 = particle_entity_1_1;
            },
            function (particles_entity_1_1) {
                particles_entity_1 = particles_entity_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("systems/fight-system", ["engine/system/system", "engine/events/game-event", "engine/events/EventType"], function (exports_57, context_57) {
    "use strict";
    var system_9, game_event_5, EventType_9, FightSystem;
    var __moduleName = context_57 && context_57.id;
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
            FightSystem = class FightSystem extends system_9.EntitySystem {
                constructor(game) {
                    super(game);
                }
                get_entity_direction(origin, destination) {
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
                }
                hypotenuse(e1, e2) {
                    var position1 = e1.getComponent("position");
                    var position2 = e2.getComponent("position");
                    var dx = position2.x - position1.x;
                    var dy = position2.y - position1.y;
                    var hypotenuse = Math.sqrt(dx * dx + dy * dy);
                    return hypotenuse;
                }
                apply(entity) {
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
                }
                ;
                applyEvents(entity) {
                }
                static create(game) {
                    return new FightSystem(game);
                }
                ;
            };
            exports_57("FightSystem", FightSystem);
        }
    };
});
System.register("systems/place-item-system", ["engine/system/system"], function (exports_58, context_58) {
    "use strict";
    var system_10, PlaceItemSystem;
    var __moduleName = context_58 && context_58.id;
    return {
        setters: [
            function (system_10_1) {
                system_10 = system_10_1;
            }
        ],
        execute: function () {
            PlaceItemSystem = class PlaceItemSystem extends system_10.EntitySystem {
                constructor(game) {
                    super(game);
                    this.tileSize = 50;
                }
                apply(entity) {
                    let placeItem;
                    try {
                        placeItem = entity.getComponent("placeItem");
                    }
                    catch (_a) {
                        return;
                    }
                    let requests = placeItem.placeItemRequests;
                    for (let i = 0; i < requests.length; i++) {
                        let placeItemRequest = requests[i];
                        if (placeItemRequest.relative) {
                            let position;
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
                }
                applyEvents() {
                }
                realCoordinatesToTileCoordinates(coordinates) {
                    let tileCoords = coordinates.map((coordinate) => {
                        return (Math.floor(coordinate / this.tileSize)) * this.tileSize;
                    });
                    return tileCoords;
                }
                placeItem(placeItemRequest) {
                    let realCoordinates = placeItemRequest.coordinates;
                    let tileCoordinates = this.realCoordinatesToTileCoordinates(realCoordinates);
                    let x = tileCoordinates[0];
                    let y = tileCoordinates[1];
                    let newEntity;
                    newEntity = this.game.addEntity(placeItemRequest.entityName);
                    let position = newEntity.getComponent("position", true);
                    if (position == null) {
                        return;
                    }
                    position.x = x;
                    position.y = y;
                    placeItemRequest.successCallback(newEntity);
                    return newEntity;
                }
                static create(game) {
                    return new PlaceItemSystem(game);
                }
            };
            exports_58("PlaceItemSystem", PlaceItemSystem);
        }
    };
});
System.register("systems/inventory-system", ["engine/system/system"], function (exports_59, context_59) {
    "use strict";
    var system_11, InventorySystem;
    var __moduleName = context_59 && context_59.id;
    return {
        setters: [
            function (system_11_1) {
                system_11 = system_11_1;
            }
        ],
        execute: function () {
            InventorySystem = class InventorySystem extends system_11.EntitySystem {
                constructor(game) {
                    super(game);
                }
                static create(game) {
                    return new InventorySystem(game);
                }
                apply(entity) {
                    let inventory = entity.getComponent("inventory", true);
                    let entityPosition = entity.getComponent("position", true);
                    if (inventory == null)
                        return;
                    if (entityPosition == null)
                        return;
                    if (inventory.inventoryItemEntities.length == 0) {
                        for (let i = 0; i < 10; i++) {
                            inventory
                                .inventoryItemEntities
                                .push(this.game.addEntity("inventoryItem"));
                        }
                    }
                    let itemSlots = inventory.getItems();
                    for (let i = 0; i < inventory.inventoryItemEntities.length; i++) {
                        let inventoryItem;
                        let itemPosition;
                        inventoryItem = inventory.inventoryItemEntities[i];
                        itemPosition = inventoryItem.getComponent("position");
                        if (itemPosition == null) {
                            console.log("Warning: inventory item lost position component");
                            continue;
                        }
                        itemPosition.x = entityPosition.x - 4 * 100 - 50 + i * 100;
                        itemPosition.y = entityPosition.y + 350;
                        itemPosition.x -= entityPosition.vx;
                        itemPosition.y -= entityPosition.vy;
                        let text = inventoryItem.getComponent("text");
                        if (itemSlots[i].itemQuantity != 0) {
                            text.setText(itemSlots[i].itemQuantity.toString());
                        }
                    }
                }
                applyEvents(entity) {
                }
            };
            exports_59("InventorySystem", InventorySystem);
        }
    };
});
System.register("systems/particle-system", ["engine/system/system"], function (exports_60, context_60) {
    "use strict";
    var system_12, ParticleSystem;
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (system_12_1) {
                system_12 = system_12_1;
            }
        ],
        execute: function () {
            ParticleSystem = class ParticleSystem extends system_12.EntitySystem {
                constructor(game) {
                    super(game);
                }
                static create(game) {
                    return new ParticleSystem(game);
                }
                addParticles(center, centerPosition) {
                    if (center.particles.length >= center.targetParticles)
                        return;
                    while (center.particles.length < center.targetParticles) {
                        center.particles.push(this.game.addEntity("particle"));
                        let position = center.particles[center.particles.length - 1].getComponent("position");
                        position.x = centerPosition.x - Math.random() * 30;
                        position.y = centerPosition.y - Math.random() * 30;
                    }
                }
                updateParticles(entity) {
                    let particles = entity.getComponent("particles", true);
                    let position = entity.getComponent("position", true);
                    particles.time = (particles.time + 1) % 1000;
                    for (let i = 0; i < particles.particles.length; i++) {
                        let particle = particles.particles[i];
                        let method = particles.paths[i];
                        let particlePosition = particle.getComponent("primitive");
                    }
                }
                apply(entity, eventManager) {
                    let particles = entity.getComponent("particles", true);
                    let position = entity.getComponent("position", true);
                    if (position == null || particles == null)
                        return;
                    this.addParticles(particles, position);
                    this.updateParticles(entity);
                }
                applyEvents(entity, eventManager) {
                }
            };
            exports_60("ParticleSystem", ParticleSystem);
        }
    };
});
System.register("game", ["systems/render-system", "systems/wasd-system", "systems/crop-system", "systems/collision-system", "systems/projectile-system", "systems/health-system", "systems/position-system", "systems/neural-fight-system", "engine/game", "builders/sprite-builder", "builders/entity-builder", "builders/build-components", "systems/place-item-system", "systems/inventory-system", "systems/particle-system"], function (exports_61, context_61) {
    "use strict";
    var render_system_1, wasd_system_1, crop_system_1, collision_system_1, projectile_system_1, health_system_1, position_system_1, neural_fight_system_1, game_1, sprite_builder_1, entity_builder_1, build_components_9, place_item_system_1, inventory_system_1, particle_system_1;
    var __moduleName = context_61 && context_61.id;
    function createGame() {
        let game = game_1.Game.create();
        game.addSystem(wasd_system_1.WasdSystem.create(game));
        game.addSystem(crop_system_1.CropSystem.create(game));
        game.addSystem(collision_system_1.CollisionSystem.create(game));
        game.addSystem(projectile_system_1.ProjectileSystem.create(game));
        game.addSystem(health_system_1.HealthSystem.create(game));
        game.addSystem(position_system_1.PositionSystem.create(game));
        game.addSystem(neural_fight_system_1.NeuralFightSystem.create(game));
        game.addSystem(place_item_system_1.PlaceItemSystem.create(game));
        game.addSystem(inventory_system_1.InventorySystem.create(game));
        game.addSystem(particle_system_1.ParticleSystem.create(game));
        game.addSystem(render_system_1.RenderSystem.create(game));
        sprite_builder_1.buildSprites(game);
        entity_builder_1.buildEntities(game);
        build_components_9.buildComponents(game);
        return game;
    }
    function startGame() {
        let game = createGame();
        game.entityFactory.componentFactory.createComponent("animation");
        game.addEntity("first");
        makePlayer();
        var villager = game.addEntity("villager");
        var component = villager.getComponent("position");
        let ac = villager.getComponent("animation");
        component.x = 150;
        component.y = 300;
        component.vx = 0;
        ac.setSprite("arrowsword");
        let particle = game.addEntity("particles");
        let particleC = particle.getComponent("particles");
        particleC.targetParticles = 4;
        let pPos = particle.getComponent("position");
        pPos.x = 150;
        pPos.y = 400;
        placeField(350, 300, "wheat", 50, 5);
        function placeField(x, y, cropName, d = 50, width = 5) {
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
        function makePlayer() {
            var player = game.addEntity("player");
            var pc = player.getComponent("position");
            var ac = player.getComponent("animation");
            pc.x = 300;
            pc.y = 380;
            return player;
        }
        let intervalId = game.start();
        return game;
    }
    exports_61("startGame", startGame);
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
            function (build_components_9_1) {
                build_components_9 = build_components_9_1;
            },
            function (place_item_system_1_1) {
                place_item_system_1 = place_item_system_1_1;
            },
            function (inventory_system_1_1) {
                inventory_system_1 = inventory_system_1_1;
            },
            function (particle_system_1_1) {
                particle_system_1 = particle_system_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("components/dash-component", ["engine/component/component"], function (exports_62, context_62) {
    "use strict";
    var component_16, DashComponent;
    var __moduleName = context_62 && context_62.id;
    return {
        setters: [
            function (component_16_1) {
                component_16 = component_16_1;
            }
        ],
        execute: function () {
            DashComponent = class DashComponent extends component_16.Component {
                update(entity) {
                    throw new Error("Method not implemented.");
                }
            };
            exports_62("DashComponent", DashComponent);
        }
    };
});
System.register("components/lines-component", ["engine/component/component"], function (exports_63, context_63) {
    "use strict";
    var component_17, LinesComponent;
    var __moduleName = context_63 && context_63.id;
    return {
        setters: [
            function (component_17_1) {
                component_17 = component_17_1;
            }
        ],
        execute: function () {
            LinesComponent = class LinesComponent extends component_17.Component {
                constructor() {
                    super("lines");
                }
                update(entity) {
                }
            };
            exports_63("LinesComponent", LinesComponent);
        }
    };
});
System.register("engine/component/components/effect/effect-component", ["engine/component/component"], function (exports_64, context_64) {
    "use strict";
    var component_18, EffectComponent, EffectType;
    var __moduleName = context_64 && context_64.id;
    return {
        setters: [
            function (component_18_1) {
                component_18 = component_18_1;
            }
        ],
        execute: function () {
            EffectComponent = class EffectComponent extends component_18.Component {
                constructor() {
                    super(...arguments);
                    this.targets = [];
                }
                addTarget(targetEntity) {
                    let position = targetEntity.getComponent("position", true);
                    if (position == null)
                        throw "Effect Component target needs a position component";
                    this.targets.push(targetEntity);
                }
                update(entity) {
                }
            };
            exports_64("EffectComponent", EffectComponent);
            (function (EffectType) {
                EffectType[EffectType["line"] = 0] = "line";
            })(EffectType || (EffectType = {}));
        }
    };
});
System.register("entities/lines-entity", ["builders/build-components", "engine/entity/entity", "entities/crop-entity"], function (exports_65, context_65) {
    "use strict";
    var build_components_10, entity_11, crop_entity_2, LinesEntity;
    var __moduleName = context_65 && context_65.id;
    return {
        setters: [
            function (build_components_10_1) {
                build_components_10 = build_components_10_1;
            },
            function (entity_11_1) {
                entity_11 = entity_11_1;
            },
            function (crop_entity_2_1) {
                crop_entity_2 = crop_entity_2_1;
            }
        ],
        execute: function () {
            LinesEntity = class LinesEntity extends entity_11.Entity {
                constructor(cf) {
                    super(cf);
                    var position = this.addComponent("position");
                }
                handleEvents(events) {
                }
                static create() {
                    let cf = build_components_10.createComponentFactory();
                    return new crop_entity_2.CropEntity(cf);
                }
            };
            exports_65("LinesEntity", LinesEntity);
        }
    };
});
//# sourceMappingURL=app.js.map