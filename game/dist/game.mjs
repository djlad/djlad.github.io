(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // external-global-plugin:phaser
  var require_phaser = __commonJS({
    "external-global-plugin:phaser"(exports, module) {
      module.exports = window.Phaser;
    }
  });

  // external-global-plugin:pixi.js
  var require_pixi = __commonJS({
    "external-global-plugin:pixi.js"(exports, module) {
      module.exports = window.PIXI;
    }
  });

  // src/entities/player-entity.ts
  var PlayerEntity = class {
    create(gameDependencies, entity) {
      var animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      var wasd = entity.addComponent("wasd");
      var inventory = entity.addComponent("inventory");
      let placeItem = entity.addComponent("placeItem");
      let cropHarvester;
      cropHarvester = entity.addComponent("cropHarvester");
      let particles = entity.addComponent("particles");
      particles.targetParticles = 0;
      entity.addComponent("transition");
      entity.addComponent("weapon");
      var sprite = "grey";
      var walkSprite = "greyWalk";
      animation.setSprite(sprite);
      wasd.sprite = sprite;
      wasd.walkSprite = walkSprite;
      position.width = 32;
      position.height = 48;
      let multi = 2.4;
      position.width *= multi;
      position.height *= multi;
      return entity;
    }
  };

  // src/entities/villager-entity.ts
  var VillagerEntity = class {
    create(gameDependcies, entity) {
      var animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      var fight = entity.addComponent("fight");
      var health = entity.addComponent("health");
      var neural = entity.addComponent("neural");
      position.width = 70;
      return entity;
    }
  };

  // src/entities/crop-entity.ts
  var CropEntity = class {
    create(gameDependencies, entity) {
      var position = entity.addComponent("position");
      position.width = 100;
      position.height = 100;
      let animation = entity.addComponent("animation");
      let crop = entity.addComponent("crop");
      if (crop.growthSprites.length > 0) {
        animation.setSprite(crop.growthSprites[0]);
      }
      return entity;
    }
  };

  // src/entities/first-entity.ts
  var FirstEntity = class {
    /**
     * this is an empty entity that will always be the first 
     * entity in the game.entities array. if a system wants to know if it is being applied 
     * to the first entity it can check if it is this entity.
     */
    create(gameDependencies, entity) {
      var position = entity.addComponent("position");
      position.y = -9999999;
      var tiles = entity.addComponent("tile");
      return entity;
    }
  };

  // src/entities/projectile-entity.ts
  var ProjectileEntity = class {
    create(gameDependencies, entity) {
      var animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      entity.addComponent("projectile");
      animation.setSprite("fireball");
      return entity;
    }
  };

  // src/entities/inventory-item-entity.ts
  var InventoryItemEntity = class {
    create(gameDependencies, entity) {
      entity.addComponent("position");
      entity.addComponent("animation");
      let text = entity.addComponent("text");
      text.addTextPlacement("", 0, 0);
      return entity;
    }
  };

  // src/entities/particles/particle-entity.ts
  var ParticleEntity = class {
    create(gameDependencies, entity) {
      let position = entity.addComponent("position");
      entity.addComponent("primitive");
      return entity;
    }
  };

  // src/entities/particles/particles-entity.ts
  var ParticlesEntity = class {
    create(gameDependencies, entity) {
      let position = entity.addComponent("position");
      position.width = 10;
      entity.addComponent("particles");
      return entity;
    }
  };

  // src/entities/clickable-entity.ts
  var ClickableEntity = class {
    create(gameDependencies, entity) {
      var position = entity.addComponent("position");
      let animation = entity.addComponent("animation");
      entity.addComponent("click");
      return entity;
    }
    handleEvents(events) {
    }
  };

  // src/entities/deer-entity.ts
  var DeerEntity = class {
    create(gameDependencies, entity) {
      var animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      animation.setSprite("deer");
      position.width = 110;
      position.height = 110;
      return entity;
    }
  };

  // src/entities/ui-panel-entity.ts
  var UIPanelEntity = class {
    create(gameDependcies, entity) {
      let animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      position.applyOffsets = false;
      animation.setSprite("woodpanelsunken");
      return entity;
    }
  };

  // src/entities/weapon-entity.ts
  var WeaponEntity = class {
    create(gameDependencies, entity) {
      const pos = entity.addComponent("position");
      const anim = entity.addComponent("animation");
      anim.setSprite("arrowsword");
      pos.width = 32;
      pos.height = 32;
      pos.width *= 2;
      pos.height *= 2;
      pos.pivotX = 1;
      pos.pivotY = 1;
      pos.anchorX = 1;
      pos.anchorY = 1;
      return entity;
    }
  };

  // src/builders/entity-builder.ts
  function buildEntities(game) {
    game.registerEntity("player", new PlayerEntity());
    game.registerEntity("villager", new VillagerEntity());
    game.registerEntity("crop", new CropEntity());
    game.registerEntity("first", new FirstEntity());
    game.registerEntity("projectile", new ProjectileEntity());
    game.registerEntity("inventoryItem", new InventoryItemEntity());
    game.registerEntity("particle", new ParticleEntity());
    game.registerEntity("particles", new ParticlesEntity());
    game.registerEntity("click", new ClickableEntity());
    game.registerEntity("deer", new DeerEntity());
    game.registerEntity("uipanel", new UIPanelEntity());
    game.registerEntity("weapon", new WeaponEntity());
  }

  // src/builders/sprite-builder.ts
  function populateSpriteManager(spriteManager) {
    var sm = spriteManager;
    sm.loadSprite("blondDress", "blond.png", 4, 8);
    sm.addAnimation("blondDress", "nothing", [18], 10);
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
    sm.loadSprite("swords", "sword-7Soul1.png", 8, 6);
    sm.addAnimation("swords", "arrowsword", [1], 30);
    sm.loadSprite("dwarves", "fantasysprites/DwarfSprites2.png", 12, 8);
    sm.addAnimation("dwarves", "dwarfopeneyes", [35]);
    sm.addAnimation("dwarves", "dwarfopeneyesWalk", [33, 35, 34, 35], 5);
    sm.loadSprite("goblins", "fantasysprites/EnemySpriteSheet1.png", 12, 8);
    sm.addAnimation("goblins", "speargoblin", [35]);
    sm.addAnimation("goblins", "speargoblinWalk", [33, 35, 34, 35], 5);
    sm.loadSprite("grass", "tilesets/submission_daneeklu/tilesets/grass.png", 3, 6);
    sm.loadSprite("soil", "tilesets/submission_daneeklu/tilesets/plowed_soil.png", 3, 6);
    sm.loadSprite("people3", "fantasysprites/PeopleSpriteSheet2.png", 12, 8);
    sm.addAnimation("people3", "brownpuffgirl", [80]);
    sm.addAnimation("people3", "brownpuffgirlwalk", [79, 80, 81], 5);
    sm.loadSprite("greg", "greg.png", 2, 2);
    sm.addAnimation("greg", "greg", [0]);
    sm.addAnimation("greg", "gregwalk", [1, 0, 3, 0], 10);
    sm.loadSprite("greyaction", "greyactions.png", 2, 2);
    sm.addAnimation("greyaction", "greythrow", [0, 1, 2], 5);
    sm.loadSprite("deer", "deer/deer male calciumtrice.png", 5, 5);
    sm.addAnimation("deer", "deer", [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);
    sm.loadSpriteWithDimensions("woodpanelui", "tilesets/submission_daneeklu/ui/scrollsandblocks.png", 96, 96, 0, 128);
    sm.addAnimation("woodpanelui", "woodpanelsunken", [0]);
    return sm;
  }
  function buildSprites(game) {
    populateSpriteManager(game.spriteManager);
  }

  // src/engine/events/EventType.ts
  var EventType = /* @__PURE__ */ ((EventType2) => {
    EventType2[EventType2["wDown"] = 0] = "wDown";
    EventType2[EventType2["aDown"] = 1] = "aDown";
    EventType2[EventType2["sDown"] = 2] = "sDown";
    EventType2[EventType2["dDown"] = 3] = "dDown";
    EventType2[EventType2["wUp"] = 4] = "wUp";
    EventType2[EventType2["aUp"] = 5] = "aUp";
    EventType2[EventType2["sUp"] = 6] = "sUp";
    EventType2[EventType2["dUp"] = 7] = "dUp";
    EventType2[EventType2["spaceDown"] = 8] = "spaceDown";
    EventType2[EventType2["spaceUp"] = 9] = "spaceUp";
    EventType2[EventType2["iUp"] = 10] = "iUp";
    EventType2[EventType2["iDown"] = 11] = "iDown";
    EventType2[EventType2["pDown"] = 12] = "pDown";
    EventType2[EventType2["pUp"] = 13] = "pUp";
    EventType2[EventType2["fDown"] = 14] = "fDown";
    EventType2[EventType2["fUp"] = 15] = "fUp";
    EventType2[EventType2["jUp"] = 16] = "jUp";
    EventType2[EventType2["kUp"] = 17] = "kUp";
    EventType2[EventType2["lUp"] = 18] = "lUp";
    EventType2[EventType2["hUp"] = 19] = "hUp";
    EventType2[EventType2["semicolonUp"] = 20] = "semicolonUp";
    EventType2[EventType2["tildUp"] = 21] = "tildUp";
    EventType2[EventType2["jDown"] = 22] = "jDown";
    EventType2[EventType2["kDown"] = 23] = "kDown";
    EventType2[EventType2["lDown"] = 24] = "lDown";
    EventType2[EventType2["hDown"] = 25] = "hDown";
    EventType2[EventType2["semicolonDown"] = 26] = "semicolonDown";
    EventType2[EventType2["tildDown"] = 27] = "tildDown";
    EventType2[EventType2["mouseUp"] = 28] = "mouseUp";
    EventType2[EventType2["mouseDown"] = 29] = "mouseDown";
    EventType2[EventType2["collision"] = 30] = "collision";
    EventType2[EventType2["fireProjectile"] = 31] = "fireProjectile";
    EventType2[EventType2["inflictDamage"] = 32] = "inflictDamage";
    EventType2[EventType2["changeVelocity"] = 33] = "changeVelocity";
    EventType2[EventType2["giveItem"] = 34] = "giveItem";
    EventType2[EventType2["dash"] = 35] = "dash";
    EventType2[EventType2["entityMoved"] = 36] = "entityMoved";
    EventType2[EventType2["touchStart"] = 37] = "touchStart";
    EventType2[EventType2["touchEnd"] = 38] = "touchEnd";
    return EventType2;
  })(EventType || {});

  // src/engine/system/system.ts
  var EntitySystem = class {
    /**
     * System that can be applied to an entity
     * manipulates one or more components through the component's public interface
     * Do not change components directly through a system
     */
    constructor(game) {
      this.oncePerLoop = null;
      this.game = game;
    }
    apply(args) {
      throw "an entity system did not implement apply method.";
    }
    applyEvents(entity, eventManager) {
      throw "an entity did not implement apply Events";
    }
    //static create(game:Game):EntitySystem{
    //    throw "an entity system has no create method."
    //};
  };

  // src/systems/click-system.ts
  var ClickSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
      this.clicks = [];
      this.clicksToProcessThisLoop = [];
      this.game.eventManager.addListener(28 /* mouseUp */, (data) => {
        this.clicks.push(data);
      });
      this.renderer = game.renderer;
    }
    clearClicksAndMoveClicksToProcess() {
      for (let i = 0; i < this.clicksToProcessThisLoop.length; i++) {
        this.clicksToProcessThisLoop.pop();
      }
      let numClicks = this.clicks.length;
      for (let i = 0; i < numClicks; i++) {
        this.clicksToProcessThisLoop.push(this.clicks.pop());
      }
    }
    apply(args) {
      const entity = args.entity;
      if (entity instanceof FirstEntity)
        this.clearClicksAndMoveClicksToProcess();
      let clickable = entity.getComponent("click", true);
      let position = entity.getComponent("position", true);
      if (clickable == null)
        return;
      if (position == null)
        return;
      this.clicksToProcessThisLoop.forEach((event) => {
        let x = event?.eventData.x;
        let y = event?.eventData.y;
        if (x == null || y == null)
          return;
        if (this.pointInPosition(x, y, position)) {
          clickable.click();
        }
      });
    }
    applyEvents(entity, eventManager) {
    }
    pointInPosition(x, y, position) {
      if (position.applyOffsets) {
        let offset = this.renderer.getOffset();
        x += offset[0];
        y += offset[1];
      }
      let leftx = position.x - position.width / 2;
      let rightx = position.x + position.width / 2;
      let topy = position.y - position.height;
      let bottomy = position.y;
      return x > leftx && x < rightx && y > topy && y < bottomy;
    }
    static create(game) {
      return new ClickSystem(game);
    }
  };

  // src/engine/events/game-event.ts
  var GameEvent = class {
    constructor(eventName, eventData, componentTarget = null) {
      this.eventName = eventName;
      this.eventData = eventData;
      this.eventDescription = EventType[eventName];
    }
    static create(eventName, eventData = null) {
      var ge = new GameEvent(eventName, eventData);
      return ge;
    }
  };

  // src/systems/collision-system.ts
  var CollisionSystem = class extends EntitySystem {
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
      var mask = (p1.width + p1.height) / 4;
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
      e1.emit(GameEvent.create(
        30 /* collision */,
        e2
      ));
      e2.emit(GameEvent.create(
        30 /* collision */,
        e1
      ));
    }
    removeMovingEntity(id) {
      delete this.movingEntities[id];
    }
    apply(args) {
      const entity = args.entity;
      if (entity instanceof FirstEntity) {
        var collidingEntities;
        for (var key in this.colliding) {
          collidingEntities = this.colliding[key];
          collision = this.checkCol(collidingEntities[0], collidingEntities[1]);
          if (collision && !collidingEntities[0].destroyed && !collidingEntities[1].destroyed) {
            this.emitCollision(collidingEntities[0], collidingEntities[1]);
          } else {
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
      } else {
        this.removeMovingEntity(entity.id);
      }
      if (entity instanceof ProjectileEntity) {
        let position2 = entity.getComponent("position");
      }
    }
    applyEvents(entity) {
    }
    static create(game) {
      return new CollisionSystem(game);
    }
  };

  // src/engine/entity/entity.ts
  var _Entity = class {
    constructor(componentFactory) {
      this.id = -1;
      this.components = [];
      this.componentNameToComponent = {};
      this.targetedEvents = [];
      this.delayedEvents = [];
      this.destroyed = false;
      this.componentFactory = componentFactory;
      _Entity.id++;
      this.id = _Entity.id;
    }
    addComponent(componentName) {
      var component = this.componentFactory.createComponent(componentName, this.id);
      this.componentNameToComponent[component.componentName] = component;
      this.components.push(component);
      return component;
    }
    getComponent(componentName, allowUndefined = false) {
      return this.componentNameToComponent[componentName];
    }
    emit(event, delayed = false) {
      if (delayed) {
        this.delayedEvents.push(event);
      } else {
        this.targetedEvents.push(event);
      }
    }
    update(args) {
      for (var i = 0; i < this.components.length; i++) {
        this.components[i].update(this, args);
      }
    }
    handleEvents(events) {
    }
    static create(gameDependcies) {
      gameDependcies.checkDependency(gameDependcies.componentFactory);
      const cf = gameDependcies.componentFactory;
      return new _Entity(cf);
    }
  };
  var Entity = _Entity;
  Entity.id = -1;

  // src/systems/crop-system.ts
  var CropSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
    }
    apply(args) {
      const entity = args.entity;
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
    static create(game) {
      return new CropSystem(game);
    }
    handleCollision(event, entity) {
      if (!(event.eventData instanceof Entity)) {
        return;
      }
      let collidedEntity = event.eventData;
      let cropHarvester;
      try {
        cropHarvester = collidedEntity.getComponent("cropHarvester");
      } catch {
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
        case 30 /* collision */:
          this.handleCollision(event, entity);
          break;
      }
    }
  };

  // src/systems/health-system.ts
  var HealthSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
    }
    apply(args) {
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
          case 32 /* inflictDamage */:
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

  // src/systems/inventory-system.ts
  var InventorySystem = class extends EntitySystem {
    constructor(game) {
      super(game);
    }
    static create(game) {
      return new InventorySystem(game);
    }
    apply(args) {
      const entity = args.entity;
      let inventory = entity.getComponent("inventory", true);
      let entityPosition = entity.getComponent("position", true);
      if (inventory == null)
        return;
      if (entityPosition == null)
        return;
      if (inventory.inventoryItemEntities.length == 0) {
        for (let i = 0; i < 10; i++) {
          inventory.inventoryItemEntities.push(this.game.addEntity("inventoryItem"));
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
        itemPosition.x = entityPosition.x - 4 * 100 - 50 + i * 100 + entityPosition.vx;
        itemPosition.y = entityPosition.y + 350 + entityPosition.vy;
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

  // src/components/tile-component/sprite-id.ts
  var SpriteId = class {
    static create(spriteName, spriteNumber) {
      const spriteId = new SpriteId();
      spriteId.spriteName = spriteName;
      spriteId.spriteNumber = spriteNumber;
      return spriteId;
    }
  };

  // src/systems/map-builder-system.ts
  var MapBuilderSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
      this.clicks = [];
      this.openBuilder = false;
      this.tilePallete = [];
      this.selectedSpriteId = SpriteId.create("soil", 0);
      this.game.eventManager.addListener(28 /* mouseUp */, (data) => {
        if (!this.openBuilder)
          return;
        this.clicks.push(data);
      });
      this.game.eventManager.addListener(21 /* tildUp */, (data) => {
        this.openBuilder = !this.openBuilder;
        this.createPalleteEntities();
      });
    }
    apply(args) {
      const entity = args.entity;
      let tileComponent = entity.getComponent("tile", true);
      if (tileComponent == null)
        return;
      if (!this.openBuilder)
        return;
      if (this.clicks.length == 0)
        return;
      let event = this.clicks.pop();
      let x = event.eventData.x;
      let y = event.eventData.y;
      let tileToChange = this.mouseCoordToTile(x, y, tileComponent);
      const tileCopy = JSON.parse(JSON.stringify(this.selectedSpriteId));
      tileToChange.spriteIds.push(tileCopy);
    }
    createPalleteEntities() {
      let entity = this.game.getById(0);
      let tileComponent = entity.getComponent("tile", true);
      let tileWidth = tileComponent.tileWidth / 1.5;
      const panel = this.game.addEntity("uipanel");
      const panelPosition = panel.getComponent("position");
      panelPosition.width = tileWidth * 6;
      panelPosition.height = tileWidth * 11;
      panelPosition.x = panelPosition.width / 2;
      panelPosition.y = -panelPosition.height;
      panelPosition.h = 2 * panelPosition.height;
      for (let i = 0; i < tileComponent.tileSpriteNames.length - 0; i++) {
        for (let i2 = 0; i2 < 25; i2++) {
          let spriteName = tileComponent.tileSpriteNames[i];
          let tileButton = this.game.addEntity("click");
          this.tilePallete.push(tileButton);
          let animation = tileButton.getComponent("animation");
          let position = tileButton.getComponent("position");
          let clickable = tileButton.getComponent("click");
          animation.setSpriteNumber(spriteName, i2);
          position.width = tileWidth;
          position.height = tileWidth;
          position.x = i2 % 5 * tileWidth + tileWidth / 2;
          position.y = Math.floor((i * 24 + i2) / 5) * tileWidth;
          position.x += panelPosition.width / 2 - 5 * tileWidth / 2;
          position.y += panelPosition.height / 2 - 5 * tileWidth / 2 - tileWidth;
          position.applyOffsets = false;
          clickable.addListener(() => {
            console.log("clicking: " + spriteName + i2.toString());
            this.selectedSpriteId.spriteName = spriteName;
            this.selectedSpriteId.spriteNumber = i2;
          });
        }
      }
    }
    mouseCoordToTile(x, y, tileComponent) {
      let xOffset = this.game.renderer.offset[0];
      let yOffset = this.game.renderer.offset[1];
      return tileComponent.coordToTile(x + xOffset, y + yOffset)[0];
    }
    applyEvents(entity, eventManager) {
    }
    static create(game) {
      return new MapBuilderSystem(game);
    }
  };

  // src/systems/neural-fight-system.ts
  var NeuralFightSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
    }
    static create(game) {
      return new NeuralFightSystem(game);
    }
    apply(args) {
      const entity = args.entity;
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

  // src/systems/particle-system.ts
  var ParticleSystem = class extends EntitySystem {
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
      particles.time = (particles.time + 1) % 1e3;
      for (let i = 0; i < particles.particles.length; i++) {
        let particle = particles.particles[i];
        let method = particles.paths[i];
        let particlePosition = particle.getComponent("primitive");
      }
    }
    apply(args) {
      const entity = args.entity;
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

  // src/systems/place-item-system.ts
  var PlaceItemSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
      this.tileSize = 50;
    }
    apply(args) {
      const entity = args.entity;
      let placeItem = entity.getComponent("placeItem", true);
      if (placeItem == null)
        return;
      let requests = placeItem.placeItemRequests;
      for (let i = 0; i < requests.length; i++) {
        let placeItemRequest = requests[i];
        if (placeItemRequest.relative) {
          let position;
          try {
            position = entity.getComponent("position");
            placeItemRequest.coordinates[0] += position.x;
            placeItemRequest.coordinates[1] += position.y;
          } catch {
          }
        }
        this.placeItem(placeItemRequest);
      }
      placeItem.placeItemRequests = [];
    }
    applyEvents() {
    }
    realCoordinatesToTileCoordinates(coordinates) {
      let tileCoords = coordinates.map((coordinate) => {
        return Math.floor(coordinate / this.tileSize) * this.tileSize;
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

  // src/systems/projectile-system.ts
  var ProjectileSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
    }
    apply(args) {
      const entity = args.entity;
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
      } else {
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
          case 31 /* fireProjectile */:
            if (event.eventData !== null) {
              this.fireProjectile(entity, event.eventData.vx, event.eventData.vy);
            } else {
              this.fireProjectile(entity);
            }
            break;
          case 30 /* collision */:
            var isProj = entity instanceof ProjectileEntity;
            if (!isProj)
              break;
            var projectile = entity.getComponent("projectile");
            var isShooter = projectile.shooterId === event.eventData.id;
            var isSelf = entity.id === event.eventData.id;
            var isProjectile = event.eventData instanceof ProjectileEntity;
            var collidedId = event.eventData.id;
            var collided = this.game.getById(collidedId);
            var hitParticle = event.eventData instanceof ParticlesEntity;
            if (!isShooter && !isSelf && !isProjectile && !hitParticle) {
              var ge = GameEvent.create(32 /* inflictDamage */);
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

  // src/systems/wasd-system.ts
  var WasdSystem = class extends EntitySystem {
    constructor(game) {
      super(game);
      this.move = false;
      this.stop = false;
      this.touchStart = { x: 0, y: 0 };
      game.eventManager.addListener(37 /* touchStart */, (e) => {
        this.move = true;
        this.touchStart.x = e.eventData.x;
        this.touchStart.y = e.eventData.y;
      });
      game.eventManager.addListener(38 /* touchEnd */, () => {
        this.move = false;
        this.stop = true;
      });
    }
    static create(game) {
      var wasd = new WasdSystem(game);
      return wasd;
    }
    apply(args) {
      const entity = args.entity;
      const position = entity.getComponent("position", true);
      const wasd = entity.getComponent("wasd", true);
      if (position == null)
        return;
      if (wasd == null)
        return;
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
      var speed = wasdComponent.speed;
      var sprite = wasdComponent.sprite;
      var walkSprite = wasdComponent.walkSprite;
      if (events.length > 0) {
      }
      for (var i = 0; i < events.length; i++) {
        event = events[i];
        switch (event.eventName) {
          case 0 /* wDown */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(walkSprite);
            position.vy = -speed;
            break;
          case 4 /* wUp */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vy = 0;
            break;
          case 1 /* aDown */:
            if (wasdComponent.dashing)
              break;
            position.faceRight = false;
            animation.setSprite(walkSprite);
            position.vx = -speed;
            break;
          case 5 /* aUp */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vx = 0;
            break;
          case 2 /* sDown */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(walkSprite);
            position.vy = speed;
            break;
          case 6 /* sUp */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vy = 0;
            break;
          case 3 /* dDown */:
            if (wasdComponent.dashing)
              break;
            position.faceRight = true;
            animation.setSprite(walkSprite);
            position.vx = speed;
            break;
          case 7 /* dUp */:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vx = 0;
            break;
          case 9 /* spaceUp */:
            this.dash(wasdComponent, position, animation, transition);
            break;
          case 9 /* spaceUp */:
            break;
          case 15 /* fUp */:
            let cropHarvester;
            cropHarvester = entity.getComponent("cropHarvester", true);
            cropHarvester.startHarvest();
            break;
          case 13 /* pUp */:
            console.log(this.game);
            const weapon = entity.getComponent("weapon");
            if (weapon.rotationSpeed == 0) {
              weapon.spin();
            } else {
              weapon.sheatheBack();
            }
            break;
          case 10 /* iUp */:
            let inventory;
            inventory = entity.getComponent("inventory", true);
            inventory.inventoryToString();
            break;
          case 16 /* jUp */:
            var ge = GameEvent.create(31 /* fireProjectile */);
            entity.emit(ge);
            break;
        }
      }
      this.updateDashing(entity, wasdComponent, position, animation, transition);
    }
    updateDashing(entity, wasdComponent, position, animation, transition) {
      if (!wasdComponent.dashing)
        return;
      if (wasdComponent.dashingTime == Math.floor(wasdComponent.maxDashingTime / 2)) {
        transition.start(wasdComponent.dashSprite, wasdComponent.dashSpriteNumber, false);
      }
      if (wasdComponent.dashingTime == 0) {
        wasdComponent.dashing = false;
        position.vx = 0;
        position.vy = 0;
        position.h = 0;
        return;
      }
      wasdComponent.dashingTime -= 1;
      position.vx = Math.sign(position.faceX) * wasdComponent.dashSpeed;
      position.vy = Math.sign(position.faceY) * wasdComponent.dashSpeed;
    }
    dash(wasdComponent, position, animation, transition) {
      if (wasdComponent.dashing)
        return;
      wasdComponent.startDashing();
      wasdComponent.dashWidth = position.width;
      wasdComponent.dashHeight = position.height;
      wasdComponent.dashSprite = animation.animationName;
      wasdComponent.dashSpriteNumber = animation.getSpriteNumber();
      transition.start(null, 32);
    }
  };

  // src/engine/entity/entity-factory.ts
  var EntityFactory = class {
    constructor(gameDependencies) {
      this.entityTypes = {};
      gameDependencies.checkDependency(gameDependencies.componentFactory);
      this.componentFactory = gameDependencies.componentFactory;
      this.dependencies = gameDependencies;
    }
    registerEntity(componentName, EntityClass) {
      this.entityTypes[componentName] = EntityClass;
    }
    registerComponent(componentClass) {
      this.componentFactory.registerComponent(componentClass);
    }
    create(entityName) {
      let entityClass = this.entityTypes[entityName];
      const entity = Entity.create(this.dependencies);
      return this.entityTypes[entityName].create(this.dependencies, entity);
    }
    static create(gameDependencies) {
      let ef = new EntityFactory(gameDependencies);
      return ef;
    }
  };

  // src/engine/events/key-events.ts
  var KeyEvents = class {
    constructor(downKey, upKey, keyCode) {
      this.downKey = downKey;
      this.upKey = upKey;
      this.keyCode = keyCode;
    }
    static create(controlEvent, controlReleaseEvent, controlKeyNumber) {
      return new KeyEvents(controlEvent, controlReleaseEvent, controlKeyNumber);
    }
  };
  function getKeyEvents() {
    let results = [];
    results.push(KeyEvents.create(0 /* wDown */, 4 /* wUp */, 87));
    results.push(KeyEvents.create(1 /* aDown */, 5 /* aUp */, 65));
    results.push(KeyEvents.create(2 /* sDown */, 6 /* sUp */, 83));
    results.push(KeyEvents.create(3 /* dDown */, 7 /* dUp */, 68));
    results.push(KeyEvents.create(8 /* spaceDown */, 9 /* spaceUp */, 32));
    results.push(KeyEvents.create(12 /* pDown */, 13 /* pUp */, 80));
    results.push(KeyEvents.create(11 /* iDown */, 10 /* iUp */, 73));
    results.push(KeyEvents.create(14 /* fDown */, 15 /* fUp */, 70));
    results.push(KeyEvents.create(22 /* jDown */, 16 /* jUp */, 74));
    results.push(KeyEvents.create(23 /* kDown */, 17 /* kUp */, 75));
    results.push(KeyEvents.create(24 /* lDown */, 18 /* lUp */, 76));
    results.push(KeyEvents.create(26 /* semicolonDown */, 26 /* semicolonDown */, 186));
    results.push(KeyEvents.create(27 /* tildDown */, 21 /* tildUp */, 192));
    return results;
  }
  var keyEvents = getKeyEvents();

  // src/engine/events/event-manager.ts
  var EventManager = class {
    constructor() {
      this.keys = Array(1e3);
      this.keysReleased = Array(1e3);
      //events:{[key:string]:GameEvent[]} = {};
      this.events = [];
      this.callbacks = {};
      this.touch = {};
      this.keys = this.createKeyListener();
    }
    createKeyListener() {
      var keys = Array(1e3);
      window.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
      });
      window.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
      });
      let canvas = document.getElementById("canvas");
      window.addEventListener("mouseup", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log("x: " + x + " y: " + y);
        this.emit(28 /* mouseUp */, { x, y });
      });
      window.addEventListener("touchstart", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        this.emit(37 /* touchStart */, {
          x,
          y
        });
      });
      window.addEventListener("touchend", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        this.emit(38 /* touchEnd */, {
          x,
          y
        });
      });
      return keys;
    }
    update() {
      for (var i = 0; i < keyEvents.length; i++) {
        let keyEvent = keyEvents[i];
        if (this.keys[keyEvent.keyCode]) {
          this.emit(keyEvent.downKey);
          this.keysReleased[keyEvent.keyCode] = true;
        } else {
          if (this.keysReleased[keyEvent.keyCode]) {
            this.emit(keyEvent.upKey);
            this.keysReleased[keyEvent.keyCode] = false;
          }
        }
      }
    }
    emit(eventName, eventData = {}) {
      var ge = new GameEvent(eventName, eventData);
      this.events.push(ge);
    }
    fireCallbacks() {
      var events;
      var callbacks;
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!(event.eventName in this.callbacks))
          continue;
        callbacks = this.callbacks[event.eventName];
        callbacks.forEach((callback) => {
          callback(event);
        });
      }
      this.events = [];
    }
    addListener(eventName, callback) {
      if (!(eventName in this.callbacks)) {
        this.callbacks[eventName] = [];
      }
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
      em.createEvent(0 /* wDown */);
      em.createEvent(1 /* aDown */);
      em.createEvent(2 /* sDown */);
      em.createEvent(3 /* dDown */);
      return em;
    }
  };

  // src/engine/renderers/sprite-animation.ts
  var SpriteAnimation = class {
    constructor(animationName, spriteName, spriteNumbers, delay) {
      this.spriteNumbers = spriteNumbers;
      this.animationName = animationName;
      this.spriteName = spriteName;
      this.delay = delay;
    }
    static create(animationName, spriteName, spriteNumbers, delay = 1) {
      var sa = new SpriteAnimation(
        animationName,
        spriteName,
        spriteNumbers,
        delay
      );
      return sa;
    }
  };

  // src/engine/renderers/implementations/html/html-canvas.ts
  var _HtmlCanvas = class {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
    }
    static createSingleton() {
      if (canvas != null)
        return _HtmlCanvas.canvas;
      var canvas = document.getElementById("canvas");
      if (canvas === null) {
        canvas = document.createElement("canvas");
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.margin = "0";
      canvas.style.padding = "0";
      canvas.style.overflow = "hidden";
      canvas.style.position = "fixed";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      _HtmlCanvas.canvas = new _HtmlCanvas(canvas);
      return _HtmlCanvas.canvas;
    }
  };
  var HtmlCanvas = _HtmlCanvas;
  HtmlCanvas.canvas = null;

  // src/engine/renderers/implementations/html/html-rect-sprite.ts
  var _HtmlRectSprite = class {
    constructor(spriteImg, widthImgs, heightImgs, offsetx = 0, offsety = 0, frameWidth = 0, frameHeight = 0) {
      this.frameWidth = 1;
      this.frameHeight = 1;
      this.loaded = false;
      this.sprite = spriteImg;
      this.widthImgs = widthImgs;
      this.heightImgs = heightImgs;
      this.offsetx = offsetx;
      this.offsety = offsety;
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.canvas = HtmlCanvas.createSingleton();
      this.ctx = HtmlCanvas.createSingleton().ctx;
    }
    getRGBs(width, height, spriteNumber) {
      let fc = this.frameCoords(spriteNumber);
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      if (width == null || height == null) {
        canvas.width = this.frameWidth;
        canvas.height = this.frameHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        this.sprite,
        fc[0],
        fc[1],
        this.frameWidth,
        this.frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      let pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      return pixelData;
    }
    drawImage(spriteNumber, x, y, width, height) {
      let fc = this.frameCoords(spriteNumber);
      this.ctx.drawImage(
        this.sprite,
        fc[0],
        fc[1],
        this.frameWidth,
        this.frameHeight,
        x,
        y,
        width,
        height
      );
    }
    setFrameDimensions(sprite) {
      return function() {
        sprite.frameWidth = sprite.sprite.width / sprite.widthImgs;
        sprite.frameHeight = sprite.sprite.height / sprite.heightImgs;
        sprite.loaded = true;
      };
    }
    frameCoords(spriteNum) {
      var frameWidth = this.frameWidth;
      var frameHeight = this.frameHeight;
      const widthImgs = Math.floor(this.sprite.width / frameWidth);
      var framex = spriteNum % widthImgs * frameWidth;
      var framey = Math.floor(spriteNum / widthImgs) * frameHeight;
      framex += this.offsetx;
      framey += this.offsety;
      return [framex, framey];
    }
    static create(fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
      var spriteImg = new Image();
      spriteImg.src = this.spriteDir + fileName;
      const newSprite = new _HtmlRectSprite(spriteImg, widthImgs, heightImgs, offsetx, offsety);
      spriteImg.onload = newSprite.setFrameDimensions(newSprite);
      return newSprite;
    }
    static createWithDimensions(fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
      var spriteImg = new Image();
      spriteImg.src = this.spriteDir + fileName;
      const newSprite = new _HtmlRectSprite(spriteImg, 0, 0, offsetx, offsety, frameWidth, frameHeight);
      return newSprite;
    }
  };
  var HtmlRectSprite = _HtmlRectSprite;
  HtmlRectSprite.spriteDir = "../sprites/";

  // src/engine/renderers/implementations/html/html-sprite.ts
  var HtmlSprite = class {
    constructor(fileName) {
      this.spriteDir = "../sprites/";
      this.frameCoordsCalculated = [];
      var spriteImg = new Image();
      spriteImg.src = this.spriteDir + fileName;
      this.sprite = spriteImg;
      spriteImg.onload = this.setFrameDimensions(this);
      this.ctx = HtmlCanvas.createSingleton().ctx;
    }
    getRGBs(spriteNumber) {
      throw new Error("Method not implemented.");
    }
    drawImage(spriteNumber, x, y, width, height) {
      let fc = this.frameCoords(spriteNumber);
    }
    setFrameDimensions(sprite) {
      return function() {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
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
        frames.forEach((f) => {
          f.sort();
          let highestY = Math.floor(f[0] / pixelData.width);
          let lowestY = Math.floor(f[f.length - 1] / pixelData.width);
          let height = lowestY - highestY;
        });
      };
    }
    findFrames(averagedPixelData, width, height) {
      let stack = [];
      let claimed = /* @__PURE__ */ new Set();
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
          if (stack.length > 6e4)
            break;
          let pixelIndex = stack.pop();
          let average2 = averagedPixelData[pixelIndex];
          if (pixelIndex >= averagedPixelData.length)
            continue;
          if (pixelIndex < 0)
            continue;
          if (average2 <= 0)
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

  // src/engine/renderers/sprite-manager.ts
  var _SpriteManager = class {
    constructor(spriteDir = "../sprites/") {
      this.sprites = {};
      //sprite name to sprite
      this.animations = {};
      //animation name to animation
      this.RGBs = {};
    }
    onLoad(callback) {
    }
    createSprite(fileName, widthImgs, heightImgs, offsetx, offsety) {
      return HtmlRectSprite.create(fileName, widthImgs, heightImgs, offsetx, offsety);
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
    loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
      var sprite = this.createSprite(fileName, widthImgs, heightImgs, offsetx, offsety);
      this.addSprite(spriteName, sprite);
    }
    loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
      const sprite = HtmlRectSprite.createWithDimensions(fileName, frameWidth, frameHeight, offsetx, offsety);
      this.addSprite(spriteName, sprite);
    }
    loadSpriteOverlapping(spriteName, fileName) {
      let sprite = HtmlSprite.create(fileName);
    }
    addAnimation(spriteName, animationName, spriteNumbers, delay = 1) {
      var sa = SpriteAnimation.create(animationName, spriteName, spriteNumbers, delay);
      if (!(spriteName in this.sprites)) {
        throw "error adding animation " + animationName + ". spriteName " + spriteName + "doesn't exist. sprites must be added through addSprite method first";
      }
      this.animations[animationName] = sa;
    }
    getAnimation(animationName) {
      if (animationName in this.animations) {
        return this.animations[animationName];
      } else {
        return null;
      }
    }
    getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
      let key = animationName + spriteNumber;
      if (key in this.RGBs)
        return this.RGBs[key];
      let animation = this.animations[animationName];
      let name = animation.spriteName;
      let sprite = this.sprites[name];
      if (!sprite.loaded) {
        return sprite.getRGBs(width, height, spriteNumber);
      }
      this.RGBs[key] = sprite.getRGBs(width, height, spriteNumber);
      return this.RGBs[key];
    }
    static create() {
      return new _SpriteManager();
    }
    static singeltonCreate() {
      if (_SpriteManager.spriteManager != null)
        return _SpriteManager.spriteManager;
      _SpriteManager.spriteManager = new _SpriteManager();
      return _SpriteManager.spriteManager;
    }
  };
  var SpriteManager = _SpriteManager;
  SpriteManager.spriteManager = null;

  // src/engine/renderers/implementations/html/html-renderer.ts
  var HtmlRenderer = class {
    // offScreenCanvas: OffscreenCanvas;
    constructor(context, spriteManager) {
      this.canvas = context.canvas;
      this.ctx = context.ctx;
      this.spriteManager = spriteManager;
      this.offset = [0, 0];
      this.ctx.font = "30px Arial";
    }
    getOffset() {
      return this.offset;
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
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    spriteFilter(filter, x, y, width, height, spriteNumber, options) {
      let flip = options.flip;
      x = x - width / 2;
      y = y - height;
      if (options.applyOffsets) {
        x -= this.offset[0];
        y -= this.offset[1];
      }
      let flipTranslation = 2 * (x + width / 2);
      if (flip) {
        this.ctx.translate(flipTranslation, 0);
        this.ctx.scale(-1, 1);
      }
      if (options.rotate) {
        this.ctx.rotate(options.rotate);
      }
      let canvas = document.createElement("canvas");
      canvas.width = filter.width;
      canvas.height = filter.height;
      let context = canvas.getContext("2d");
      context.putImageData(filter, 0, 0);
      this.ctx.drawImage(canvas, 0, 0, filter.width, filter.height, x, y, width, height);
      if (options.rotate) {
        this.ctx.rotate(-options.rotate);
      }
      if (flip) {
        this.ctx.scale(-1, 1);
        this.ctx.translate(-flipTranslation, 0);
      }
    }
    sprite(spriteName, x, y, width, height, spriteNumber, options) {
      let flip = options.flip;
      let sprite = this.spriteManager.getSprite(spriteName);
      let fc = sprite.frameCoords(spriteNumber);
      x = x - width / 2;
      y = y - height;
      if (options.applyOffsets) {
        x -= this.offset[0];
        y -= this.offset[1];
      }
      let flipTranslation = 2 * (x + width / 2);
      if (flip) {
        this.ctx.translate(flipTranslation, 0);
        this.ctx.scale(-1, 1);
      }
      if (options.rotate) {
        this.ctx.rotate(options.rotate);
      }
      if (x + width > -100 && x < this.canvas.width && y + height > -100 && y - height < this.canvas.height) {
        sprite.drawImage(spriteNumber, x, y, width, height);
      }
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
      this.ctx.globalAlpha = 0.6;
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
      let canvas = HtmlCanvas.createSingleton();
      var spriteManager = SpriteManager.singeltonCreate();
      return new HtmlRenderer(canvas, spriteManager);
    }
  };

  // src/engine/system/system-args.ts
  var SystemArgs = class {
  };

  // src/engine/entity/entity-update-args.ts
  var EntityUpdateArgs = class {
  };

  // src/engine/dependencies/game-dependencies.ts
  var GameDependencies = class {
    constructor() {
      this.engineCreator = null;
      // only necessary if using an engine like phaser/pixi
      this.componentFactory = null;
      this.entityFactory = null;
      this.renderer = null;
      this.eventManager = null;
      this.spriteManager = null;
      this.cameras = null;
    }
    checkDependency(gameDependency) {
      if (gameDependency == null) {
        console.error(`Dependency was requested but it was null`);
      }
    }
  };

  // src/engine/component/component.ts
  var Component = class {
    constructor(componentName) {
      this.componentName = componentName;
    }
    static create(game, entityId) {
      throw "Component must implement static create function";
    }
    static createWithGame(game, entityId) {
    }
  };

  // src/engine/component/component-factory.ts
  var ComponentFactory = class {
    constructor(gameDependencies) {
      this.componentTypes = {};
      this.gameDependencies = gameDependencies;
    }
    registerComponent(ComponentClass) {
      if (!(ComponentClass.prototype instanceof Component)) {
        console.log("component " + obj.componentName + " must extend class Component to be registered");
      }
      if (ComponentClass.componentName != null) {
        this.componentTypes[ComponentClass.componentName] = ComponentClass;
        return;
      }
      var obj = ComponentClass.create(this.gameDependencies);
      this.componentTypes[obj.componentName] = ComponentClass;
    }
    createComponent(componentName, entityId) {
      if (!(componentName in this.componentTypes)) {
        throw "component " + componentName + " not registered in componentFactory";
      }
      return this.componentTypes[componentName].create(this.gameDependencies, entityId);
    }
    static create(gameDependencies) {
      this.dependencies = gameDependencies;
      var cf = new ComponentFactory(gameDependencies);
      return cf;
    }
  };

  // src/engine/dependencies/generic-cameras.ts
  var GenericCameras = class {
    constructor() {
      this.halfWindowWidth = window.innerWidth / 2;
      this.halfWindowHeight = window.innerHeight / 2;
    }
    getOffsetX() {
      return (this.center?.x ?? 0) - this.halfWindowWidth;
    }
    getOffsetY() {
      return (this.center?.y ?? 0) - this.halfWindowHeight;
    }
    transformX(x) {
      return x - this.getOffsetX();
    }
    transformY(y) {
      return y - this.getOffsetY();
    }
    untransformX(x) {
      return x + ((this.center?.x ?? 0) - this.halfWindowWidth);
    }
    untransformY(y) {
      return y + ((this.center?.y ?? 0) - this.halfWindowHeight);
    }
    setMainCamera(positionComponent) {
      this.center = positionComponent;
    }
    static create() {
      return new GenericCameras();
    }
  };

  // src/engine/game.ts
  var Game = class {
    constructor(entityFactory, renderer, eventManager, gameDependencies) {
      this.starters = [];
      this._entities = [];
      this.systems = [];
      this.systemsWithOncePerTurnUpdate = [];
      this.targetFps = 60;
      this.counter = 0;
      this.lastTime = performance.now();
      this.frameTracker = 0;
      this.entityFactory = entityFactory;
      this.renderer = renderer;
      this.eventManager = eventManager;
      this.gameDependencies = gameDependencies;
      this.spriteManager = gameDependencies.spriteManager;
    }
    static create() {
      const renderer = HtmlRenderer.create();
      const deps = new GameDependencies();
      deps.renderer = renderer;
      deps.eventManager = EventManager.create();
      deps.componentFactory = ComponentFactory.create(deps);
      deps.entityFactory = EntityFactory.create(deps);
      deps.spriteManager = deps.renderer.spriteManager;
      deps.cameras = GenericCameras.create();
      var game = new Game(deps.entityFactory, deps.renderer, EventManager.create(), deps);
      return game;
    }
    static createCustom(dependencies) {
      var game = new Game(dependencies.entityFactory, dependencies.renderer, dependencies.eventManager, dependencies);
      dependencies.game = game;
      return game;
    }
    get entities() {
      return this._entities;
    }
    set entities(entities) {
      this._entities = entities;
    }
    update(delta, framesPassed) {
      this.eventManager.update();
      for (let i2 = 0; i2 < this.systemsWithOncePerTurnUpdate.length; i2++) {
        const args = new SystemArgs();
        args.entity = this.entities[0];
        args.eventManager = this.eventManager;
        args.fullFramesPassed = framesPassed;
        this.systemsWithOncePerTurnUpdate[i2].oncePerLoop(args);
      }
      for (var i = 0; i < this.entities.length; i++) {
        const args = new EntityUpdateArgs();
        args.delta = delta;
        args.fullFramePassed = framesPassed;
        this.entities[i].update(args);
        for (var systemi = 0; systemi < this.systems.length; systemi++) {
          const args2 = new SystemArgs();
          args2.entity = this.entities[i];
          args2.eventManager = this.eventManager;
          args2.fullFramesPassed = framesPassed;
          this.systems[systemi].apply(args2);
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
      this.entities.sort(function(a, b) {
        var pa = a.getComponent("position");
        var pb = b.getComponent("position");
        return pa.y - pb.y;
      });
      this.cleanDestroyedEntities();
      this.renderer.text(Math.floor(this.frameTime).toString(), 0, 0, 1e3);
      this.counter = (this.counter + 1) % 100;
    }
    step(delta) {
      this.newTime = performance.now();
      this.performance = performance.now();
      delta = delta / (1e3 / this.targetFps);
      this.frameTracker += delta;
      if (this.frameTracker > 1) {
        this.update(delta, Math.floor(this.frameTracker));
        this.frameTracker = 0;
      } else {
        this.update(delta, 0);
      }
      this.frameTime = performance.now() - this.performance;
    }
    loop(time) {
      const delta = (time - this.lastTime) / (1e3 / this.targetFps);
      this.step(delta);
      this.lastTime = time;
      window.requestAnimationFrame((time2) => {
        this.loop(time2);
      });
    }
    start() {
      if (this.starters.length > 0) {
        console.log("starting game custom");
        this.starters.forEach((starter) => {
          starter(this);
        });
        return;
      }
      console.log("starting game loop with requestAnimationFrame");
      window.requestAnimationFrame(() => {
        this.loop(this.lastTime);
      });
      return 0;
    }
    stop() {
      clearInterval(this.intervalId);
    }
    addStarter(starterFunc) {
      this.starters.push(starterFunc);
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
      if (this.entities.filter((entity) => entity.destroyed).length == 0)
        return;
      let newEntities = [];
      for (let i = 0; i < this.entities.length; i++) {
        if (!this.entities[i].destroyed) {
          newEntities.push(this.entities[i]);
        } else {
          delete this.entities[i];
        }
      }
      delete this.entities;
      this.entities = newEntities;
    }
    addSystem(system) {
      this.systems.push(system);
      if (system.oncePerLoop == null)
        return;
      this.systemsWithOncePerTurnUpdate.push(system);
    }
    registerEntity(entityName, EntityClass) {
      this.entityFactory.registerEntity(entityName, EntityClass);
    }
    registerComponent(EntityClass) {
      this.entityFactory.registerComponent(EntityClass);
    }
  };

  // src/components/clickable-component.ts
  var ClickableComponent = class extends Component {
    constructor() {
      super("click");
      this.callback = [];
    }
    update(entity) {
    }
    addListener(callback) {
      this.callback.push(callback);
    }
    click() {
      this.callback.forEach((callback) => {
        callback();
      });
    }
    static create() {
      return new ClickableComponent();
    }
  };

  // src/components/crop-component.ts
  var CropComponent = class extends Component {
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
    static create() {
      return new CropComponent();
    }
  };

  // src/components/fight-component.ts
  var FightComponent = class extends Component {
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

  // src/components/health-component.ts
  var HealthComponent = class extends Component {
    constructor() {
      super("health");
      this.health = 100;
    }
    update() {
    }
    static create() {
      return new HealthComponent();
    }
  };

  // src/components/inventory-component/inventory-item.ts
  var InventoryItem = class {
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

  // src/components/inventory-component/inventory-item-type.ts
  var _InventoryItemType = class {
    constructor(itemName, itemDescription, itemSpriteName) {
      this.itemId = -1;
      this.itemName = "no name";
      this.itemDescription = "no description";
      _InventoryItemType.largestItemId += 1;
      this.itemId = _InventoryItemType.largestItemId;
      this.itemName = itemName;
      this.itemDescription = itemDescription;
      this.itemSpriteName = itemSpriteName;
    }
    static create(itemName, itemSpriteName, itemDescription) {
      let newItemType;
      newItemType = new _InventoryItemType(itemName, itemDescription, itemSpriteName);
      return newItemType;
    }
  };
  var InventoryItemType = _InventoryItemType;
  InventoryItemType.largestItemId = -1;

  // src/components/inventory-component/item-registry.ts
  var InventoryItemRegistry = class {
    constructor() {
      this.itemTypes = {};
    }
    registerItemType(itemName, itemSpriteName, description) {
      let newItemType;
      newItemType = new InventoryItemType(itemName, description, itemSpriteName);
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

  // src/components/inventory-component/inventory-component.ts
  var InventoryComponent = class extends Component {
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
        this.itemSlots[i] = InventoryItem.create(itemType);
      }
    }
    //inventory item entities that appear on screen
    hashInventoryToString() {
      let inventoryString = "Inventory:";
      for (let i = 0; i < this.itemSlots.length; i++) {
        let item;
        item = this.itemSlots[i];
        inventoryString += `
${item.itemName}: ${item.itemQuantity}`;
      }
      inventoryString += "\n<---------->";
      console.log(inventoryString);
    }
    inventoryToString() {
      let inventoryString = "Inventory:";
      for (let i = 0; i < this.itemSlots.length; i++) {
        let item;
        item = this.itemSlots[i];
        inventoryString += `
${item.itemName}: ${item.itemQuantity}`;
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
        this.inventory[itemName] = InventoryItem.create(itemType);
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
          this.itemSlots[i] = InventoryItem.create(itemType);
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
      inventory = new InventoryComponent(InventoryItemRegistry.singletonCreate());
      return inventory;
    }
  };

  // src/components/neural-fight-component.ts
  var NeuralFightComponent = class extends Component {
    constructor() {
      super("neural");
    }
    update() {
    }
    static create() {
      return new NeuralFightComponent();
    }
  };

  // src/components/particle-componet.ts
  var ParticleComponent = class extends Component {
    constructor() {
      super("particles");
      this.particles = [];
      this.targetParticles = 10;
      this.time = 0;
      this.maxSpeed = 50;
      this.paths = [
        /*(center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            if (Math.abs(position.vx) < this.maxSpeed) position.vx += dx/Math.abs(dx) * .1;
            if (Math.abs(position.vy) < this.maxSpeed) position.vy += dy/Math.abs(dy) * .1;
        },*/
        /*(center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            if (Math.abs(position.vx) < this.maxSpeed) position.vx += dx/Math.abs(dx) * .2;
            if (dy > 50)position.vy = 1
            if (dy < -50)position.vy = -1
        }*/
        /*(center: PositionComponent, position: PositionComponent) => {
            let dx = center.x - position.x;
            let dy = center.y - position.y;
            position.vx += dx/Math.abs(dx) * .2;
            position.vy += dy/Math.abs(dy) * .2;
            // position.x += 1;
            // center.x += 1;
        }*/
        /*(center:PositionComponent, position: PositionComponent, time: number) => {
            let f = ()=>10 * Math.sin(.05 * time);
            let f2 = ()=>40 * Math.cos(.2 * time);
            position.y = center.y +  10*f();
            position.x = center.x + f2();
        },*/
        /*(center:PositionComponent, position: PositionComponent, time: number) => {
            let f = ()=>Math.sin(.05 * time/3);
            let f2 = ()=>40 * Math.cos(.2 * time/2);
            position.h = -2 + center.h - 2*center.width/3 +  30*f();
            position.x = center.x + f2();
            position.y = center.y - 1
        },
        (center:PositionComponent, position: PositionComponent, time: number) => {
            let f = ()=>Math.sin(.05 * time/3);
            let f2 = ()=>40 * Math.cos(.2 * time/2);
            position.h = -2 + center.h - 2*center.width/3 +  30*f();
            position.x = center.x - f2();
            position.y = center.y + 1
        },*/
        (center, position, time) => {
          let f = () => 40 * Math.sin(0.2 * time / 2);
          let f2 = () => 40 * Math.cos(0.2 * time / 2);
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

  // src/components/primitive-component.ts
  var PrimitiveComponent = class extends Component {
    update(entity) {
    }
    static create() {
      return new PrimitiveComponent("primitive");
    }
  };

  // src/components/projectile-component.ts
  var ProjectileComponent = class extends Component {
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

  // src/components/tile-component/tile.ts
  var Tile = class {
    constructor() {
      this.spriteIds = [];
    }
    static create(spriteName, spriteNumber, tileX, tileY) {
      let tile = new Tile();
      tile.spriteIds.push(SpriteId.create(
        spriteName,
        spriteNumber
      ));
      tile.tileX = tileX;
      tile.tileY = tileY;
      return tile;
    }
  };

  // src/components/tile-component/tile-component.ts
  var TileComponent = class extends Component {
    constructor() {
      super("tile");
      this.tileWidth = 64;
      this.tiles = [];
      this.tilesByCoords = {};
      this.tileSpriteNames = ["grass", "soil"];
    }
    update(entity) {
    }
    addTile(tile) {
      this.tiles.push(tile);
      const yToTile = this.tilesByCoords[tile.tileX];
      if (yToTile == null) {
        this.tilesByCoords[tile.tileX] = {};
      }
      this.tilesByCoords[tile.tileX][tile.tileY] = tile;
    }
    static create() {
      let tc = new TileComponent();
      let spriteName = "grass";
      let mapWidth = 200;
      let centerOffset = mapWidth / 2 - 5;
      let xlow = 4;
      let xhigh = xlow + 6;
      let ylow = 3;
      let yhigh = ylow + 6;
      for (let i = 0; i < mapWidth * mapWidth; i++) {
        let x = i % mapWidth - centerOffset;
        let y = Math.floor(i / mapWidth) - centerOffset;
        if (x >= xlow && x <= xhigh && y >= ylow && y <= yhigh) {
          if (x == xlow && y == ylow)
            tc.addTile(Tile.create("soil", 6, x, y));
          else if (x == xhigh && y == ylow)
            tc.addTile(Tile.create("soil", 8, x, y));
          else if (x == xlow && y == yhigh)
            tc.addTile(Tile.create("soil", 12, x, y));
          else if (x == xhigh && y == yhigh)
            tc.addTile(Tile.create("soil", 14, x, y));
          else if (x == xlow)
            tc.addTile(Tile.create("soil", 9, x, y));
          else if (x == xhigh)
            tc.addTile(Tile.create("soil", 11, x, y));
          else if (y == ylow)
            tc.addTile(Tile.create("soil", 7, x, y));
          else if (y == yhigh)
            tc.addTile(Tile.create("soil", 13, x, y));
          else
            tc.addTile(Tile.create("soil", 10, x, y));
          continue;
        }
        tc.addTile(Tile.create(spriteName, 14 + Math.ceil(Math.random() * 3), x, y));
      }
      return tc;
    }
    createBuilder() {
      let tileSetSpriteNames = ["grass", "soil"];
    }
    coordToTile(x, y) {
      let tileX = Math.floor((x + 0.5 * this.tileWidth) / this.tileWidth);
      let tileY = Math.ceil(y / this.tileWidth);
      const yToTile = this.tilesByCoords[tileX];
      if (yToTile == null)
        return [];
      const tile = yToTile[tileY];
      if (tile == null) {
        return [];
      }
      return [tile];
    }
    tileCoordToReal(coord) {
      return coord * this.tileWidth;
    }
  };

  // src/components/transitions/transition-component.ts
  var TransitionComponent = class extends Component {
    constructor() {
      super("transition");
      this.time = 0;
      this.reference = null;
      this.current = null;
      this.targetAnimationName = "fireball";
      this.targetSpriteNumber = 0;
      this.running = false;
      this.speed = 15;
    }
    update(entity) {
      if (!this.running)
        return;
      let animation = entity.getComponent("animation", true);
      if (animation == null)
        return;
      this.reference = animation.getRGBs();
      this.target = animation.getRGBs(this.targetAnimationName, this.targetSpriteNumber, this.reference.width, this.reference.height);
      if (this.targetAnimationName == null) {
        let newTarget = new ImageData(this.reference.width, this.reference.height);
        for (let i = 0; i < this.target.data.length; i++) {
          newTarget.data[i] = 0;
        }
        this.target = newTarget;
      }
      if (this.current == null) {
        if (this.reference.data.length == 4 || this.target.data.length == 4)
          return;
        this.current = new ImageData(this.reference.width, this.reference.height);
        for (let i = 0; i < this.reference.data.length; i++) {
          this.current.data[i] = this.reference.data[i];
        }
      }
      let noChanges = true;
      for (let i = 0; i < this.reference.data.length; i++) {
        let target = this.target.data[i];
        if (this.current.data[i] < target) {
          this.current.data[i] += this.speed;
        } else if (this.current.data[i] > target) {
          this.current.data[i] -= this.speed;
        }
        let distance = Math.abs(this.current.data[i] - target);
        if (distance < this.speed) {
          this.current.data[i] = target;
        } else {
          noChanges = false;
        }
      }
      animation.setFilter(this.current);
      if (noChanges) {
        animation.isFiltered = false;
        this.running = false;
      }
    }
    start(targetAnimationName = "fireball", targetSpriteNumber, resetCurrent = true) {
      this.running = true;
      this.time = 300;
      this.targetAnimationName = targetAnimationName;
      if (resetCurrent)
        this.current = null;
      this.targetSpriteNumber = targetSpriteNumber;
    }
    static create() {
      return new TransitionComponent();
    }
  };

  // src/components/wasd-component.ts
  var WasdComponent = class extends Component {
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
      this.dashSpriteNumber = 0;
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

  // src/components/place-item/place-item-request.ts
  var PlaceItemRequest = class {
    constructor(entityName, coordinates, quantity = 1, successCallback, relative = true) {
      this.entityName = entityName;
      this.coordinates = coordinates;
      this.quantity = quantity;
      this.successCallback = successCallback;
      this.relative = relative;
    }
  };

  // src/components/place-item/place-item-component.ts
  var PlaceItemComponent = class extends Component {
    constructor() {
      super("placeItem");
      this.placeItemRequests = [];
    }
    placeItem(entityName, coordinates = [0, 0], successCallback, relative = true) {
      let placeItemRequest;
      placeItemRequest = new PlaceItemRequest(entityName, coordinates, 1, successCallback, relative = true);
      this.placeItemRequests.push(placeItemRequest);
    }
    update(entity) {
    }
    static create() {
      return new PlaceItemComponent();
    }
  };

  // src/components/crop-harvester-component.ts
  var CropHarvesterComponent = class extends Component {
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
      } else {
        this.harvesting = false;
      }
    }
    static create() {
      return new CropHarvesterComponent("cropHarvester");
    }
  };

  // src/components/text-component/text-placement.ts
  var TextPlacement = class {
    constructor(textValue, offsetX, offsetY) {
      this.textValue = textValue;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    }
  };

  // src/components/text-component/text-component.ts
  var TextComponent = class extends Component {
    constructor() {
      super("text");
      this.textPlacements = [];
    }
    addTextPlacement(text, offsetX = 0, offsetY = 0) {
      this.textPlacements.push(new TextPlacement(text, offsetX, offsetY));
    }
    setText(value, index = 0) {
      if (index >= 0 && index < this.textPlacements.length) {
        this.textPlacements[index].textValue = value;
      }
    }
    update() {
    }
    static create() {
      return new TextComponent();
    }
  };

  // src/engine/phaser-integration/phaser-game.ts
  var Phaser = __toESM(require_phaser());

  // src/engine/phaser-integration/main-scene.ts
  var import_phaser = __toESM(require_phaser());
  var MainScene = class extends import_phaser.Scene {
    constructor() {
      super({ key: "main" });
      this.updater = () => {
      };
      this.creators = [];
      this.loaders = [];
    }
    setUpdater(updateFunction) {
      this.updater = updateFunction;
    }
    addCreator(creator) {
      this.creators.push(creator);
    }
    addPreloader(loader) {
      this.loaders.push(loader);
    }
    preload() {
      console.log("loading " + this.loaders.length);
      this.loaders.forEach(
        (loader) => {
          loader(this);
        }
      );
    }
    create() {
      console.log(`creating main scene with ${this.creators.length} creators`);
      this.creators.forEach((creator) => {
        creator(this);
      });
    }
    update(time, delta) {
      this.updater(delta);
    }
  };

  // src/engine/phaser-integration/phaser-game.ts
  var _PhaserGame = class {
    constructor() {
      this.mainScene = new MainScene();
      this.config = {
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: MainScene,
        fps: {
          target: 60,
          forceSetTimeOut: true
        },
        physics: {
          default: "arcade",
          arcade: {},
          matter: {
            gravity: false,
            debug: {
              showBody: true,
              showStaticBody: true
            }
          }
        }
      };
    }
    start() {
      this.game = new Phaser.Game(this.config);
      this.mainScene.addCreator((scene) => {
        console.log("creator for canvas");
        const canvas = this.game.canvas;
        canvas.style.margin = "0";
        canvas.style.padding = "0";
        canvas.style.overflow = "hidden";
        canvas.style.position = "fixed";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
      });
      this.game.scene.add("mainReal", this.mainScene);
      this.game.scene.switch("main", "mainReal");
    }
    setUpdater(updater) {
      this.mainScene.setUpdater(updater);
    }
    static createSingleton() {
      if (_PhaserGame.phaserGame == null) {
        _PhaserGame.phaserGame = new _PhaserGame();
      }
      return _PhaserGame.phaserGame;
    }
  };
  var PhaserGame = _PhaserGame;
  PhaserGame.phaserGame = null;

  // src/metadata.ts
  var metadata = { "sprites/arm.png": { "height": 32, "width": 32, "type": "png" }, "sprites/BearSprites.webp": { "height": 384, "width": 384, "type": "webp" }, "sprites/blond.png": { "height": 259, "width": 64, "type": "png" }, "sprites/blondWalk.png": { "height": 336, "width": 317, "type": "png" }, "sprites/crops.png": { "height": 256, "width": 384, "type": "png" }, "sprites/deer/deer female calciumtrice.png": { "height": 160, "width": 160, "type": "png" }, "sprites/deer/deer male calciumtrice.png": { "height": 160, "width": 160, "type": "png" }, "sprites/fantasysprites.png": { "height": 512, "width": 384, "type": "png" }, "sprites/fantasysprites/CompSpriteC.png": { "height": 166, "width": 96, "type": "png" }, "sprites/fantasysprites/DwarfSprites.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/DwarfSprites2.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/EnemySpriteSheet1.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/FDwarfSheet.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/PeopleSpriteSheet2.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/PeopleSpriteSheet3.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/SpriteCompD.png": { "height": 188, "width": 96, "type": "png" }, "sprites/fireball.png": { "height": 512, "width": 512, "type": "png" }, "sprites/greg.png": { "height": 96, "width": 64, "type": "png" }, "sprites/greyactions.png": { "height": 96, "width": 64, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/bat.png": { "height": 128, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/bee.png": { "height": 128, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/big_worm.png": { "height": 200, "width": 105, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/eyeball.png": { "height": 152, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/ghost.png": { "height": 184, "width": 120, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/man_eater_flower.png": { "height": 304, "width": 180, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/pumpking.png": { "height": 184, "width": 138, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/slime.png": { "height": 128, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/small_worm.png": { "height": 128, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/monsters/snake.png": { "height": 128, "width": 96, "type": "png" }, "sprites/LPC Base Assets/sprites/people/female_hurt.png": { "height": 64, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/female_slash.png": { "height": 256, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/female_spellcast.png": { "height": 258, "width": 448, "type": "png" }, "sprites/LPC Base Assets/sprites/people/female_walkcycle.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/sprites/people/hairfemale.png": { "height": 280, "width": 120, "type": "png" }, "sprites/LPC Base Assets/sprites/people/hairmale.png": { "height": 360, "width": 120, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_hurt_pants.png": { "height": 64, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_hurt.png": { "height": 64, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_pants.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_slash_pants.png": { "height": 256, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_slash.png": { "height": 256, "width": 384, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_spellcast_pants.png": { "height": 256, "width": 448, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_spellcast.png": { "height": 256, "width": 448, "type": "png" }, "sprites/LPC Base Assets/sprites/people/male_walkcycle.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/sprites/people/princess.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/sprites/people/soldier_altcolor.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/sprites/people/soldier.png": { "height": 256, "width": 576, "type": "png" }, "sprites/LPC Base Assets/tiles/barrel.png": { "height": 64, "width": 128, "type": "png" }, "sprites/LPC Base Assets/tiles/brackish.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/bridges.png": { "height": 224, "width": 192, "type": "png" }, "sprites/LPC Base Assets/tiles/buckets.png": { "height": 64, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/cabinets.png": { "height": 416, "width": 192, "type": "png" }, "sprites/LPC Base Assets/tiles/castle_lightsources.png": { "height": 128, "width": 160, "type": "png" }, "sprites/LPC Base Assets/tiles/castle_outside.png": { "height": 352, "width": 544, "type": "png" }, "sprites/LPC Base Assets/tiles/castlefloors_outside.png": { "height": 160, "width": 128, "type": "png" }, "sprites/LPC Base Assets/tiles/castlefloors.png": { "height": 320, "width": 320, "type": "png" }, "sprites/LPC Base Assets/tiles/castlewalls.png": { "height": 480, "width": 384, "type": "png" }, "sprites/LPC Base Assets/tiles/cement.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/cementstair.png": { "height": 128, "width": 160, "type": "png" }, "sprites/LPC Base Assets/tiles/chests.png": { "height": 96, "width": 64, "type": "png" }, "sprites/LPC Base Assets/tiles/country.png": { "height": 128, "width": 160, "type": "png" }, "sprites/LPC Base Assets/tiles/cup.png": { "height": 64, "width": 32, "type": "png" }, "sprites/LPC Base Assets/tiles/dirt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/dirt2.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/dungeon.png": { "height": 256, "width": 416, "type": "png" }, "sprites/LPC Base Assets/tiles/grass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/grassalt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/hole.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/holek.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/holemid.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/house.png": { "height": 224, "width": 288, "type": "png" }, "sprites/LPC Base Assets/tiles/inside.png": { "height": 320, "width": 320, "type": "png" }, "sprites/LPC Base Assets/tiles/kitchen.png": { "height": 128, "width": 64, "type": "png" }, "sprites/LPC Base Assets/tiles/lava.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/lavarock.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/mountains.png": { "height": 288, "width": 384, "type": "png" }, "sprites/LPC Base Assets/tiles/rock.png": { "height": 32, "width": 64, "type": "png" }, "sprites/LPC Base Assets/tiles/signs.png": { "height": 64, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/stairs.png": { "height": 448, "width": 256, "type": "png" }, "sprites/LPC Base Assets/tiles/treetop.png": { "height": 224, "width": 192, "type": "png" }, "sprites/LPC Base Assets/tiles/trunk.png": { "height": 96, "width": 192, "type": "png" }, "sprites/LPC Base Assets/tiles/victoria.png": { "height": 160, "width": 352, "type": "png" }, "sprites/LPC Base Assets/tiles/water.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/waterfall.png": { "height": 160, "width": 96, "type": "png" }, "sprites/LPC Base Assets/tiles/watergrass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/LPC Base Assets/UI/frame.gif": { "height": 211, "width": 236, "type": "gif" }, "sprites/LPC Base Assets/UI/lpc_home_cup.gif": { "height": 320, "width": 480, "type": "gif" }, "sprites/LPC Base Assets/UI/shadow.png": { "height": 64, "width": 160, "type": "png" }, "sprites/scrops.png": { "height": 672, "width": 391, "type": "png" }, "sprites/sword-7Soul1.png": { "height": 192, "width": 256, "type": "png" }, "sprites/tilesets/submission_daneeklu/character/grab_sheet.png": { "height": 256, "width": 384, "type": "png" }, "sprites/tilesets/submission_daneeklu/character/sword_sheet_128.png": { "height": 504, "width": 768, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_firelion_big.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_firelion_sheet.png": { "height": 256, "width": 256, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_iceshield_sheet.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_snakebite_sheet.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_torrentacle.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/turtleshell_front.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/turtleshell_side.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magics_preview.gif": { "height": 128, "width": 128, "type": "gif" }, "sprites/tilesets/submission_daneeklu/tileset_preview.png": { "height": 576, "width": 768, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/farming_fishing.png": { "height": 640, "width": 640, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/fence_alt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/fence.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/grass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/grassalt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/hole.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/plants.png": { "height": 384, "width": 288, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/plowed_soil.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/reed.png": { "height": 320, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/sand.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/sandwater.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/tallgrass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/wheat.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/youngwheat.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/ui_preview.png": { "height": 192, "width": 224, "type": "png" }, "sprites/tilesets/submission_daneeklu/ui/scrollsandblocks.png": { "height": 320, "width": 544, "type": "png" }, "sprites/victoriansprites.png": { "height": 384, "width": 384, "type": "png" } };

  // src/engine/phaser-integration/phaser-sprite-manager.ts
  var _PhaserSpriteManager = class {
    constructor(spriteDir = "../sprites/") {
      this.spriteNameToPath = {};
      this.phaserGame = PhaserGame.createSingleton();
      this.spriteDir = spriteDir;
    }
    onLoad(callback) {
      throw new Error("Method not implemented.");
    }
    path(fileName) {
      return this.spriteDir + fileName;
    }
    loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
      this.phaserGame.mainScene.addPreloader(() => {
        const path = this.path(fileName);
        const width = metadata[path.replace("../", "")].width;
        const height = metadata[path.replace("../", "")].height;
        const frameWidth = width / widthImgs;
        const frameHeight = height / heightImgs;
        this.phaserGame.mainScene.load.spritesheet(spriteName, path, {
          frameWidth,
          frameHeight
        });
      });
    }
    loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx = 0, offsety = 0) {
    }
    loadSpriteOverlapping(spriteName, fileName) {
    }
    addAnimation(spriteName, animationName, spriteNumbers, delay = 1) {
      this.phaserGame.mainScene.addCreator(() => {
        const anims = this.phaserGame.mainScene.anims;
        anims.create(
          {
            key: animationName,
            frames: anims.generateFrameNumbers(spriteName, {
              frames: spriteNumbers
            }),
            frameRate: Math.floor(30 / delay),
            repeat: -1
          }
        );
      });
    }
    getAnimation(animationName) {
      return SpriteAnimation.create(animationName, "", [], 0);
    }
    getRGBs(animationName = null, spriteNumber = 0, width = null, height = null) {
      return new ImageData(0, 0);
    }
    static create() {
      return new _PhaserSpriteManager();
    }
    static singeltonCreate() {
      if (_PhaserSpriteManager.spriteManager != null)
        return _PhaserSpriteManager.spriteManager;
      _PhaserSpriteManager.spriteManager = new _PhaserSpriteManager();
      return _PhaserSpriteManager.spriteManager;
    }
  };
  var PhaserSpriteManager = _PhaserSpriteManager;
  PhaserSpriteManager.spriteManager = null;

  // src/engine/pixi-integration/pixi-components/generic-animation-component.ts
  var _GenericAnimationComponent = class extends Component {
    constructor(game, entityId) {
      super("animation");
      game.checkDependency(game.engineCreator);
      this.engineSprite = game.engineCreator.createEngineSprite(entityId);
    }
    update(entity, args) {
    }
    getSpriteNumber() {
    }
    getRGBs(animationName, spriteNumber, width, height) {
      return _GenericAnimationComponent.fakeImageData;
    }
    setFilter(pixelData) {
    }
    setSprite(animationName) {
      if (animationName == this.spriteName)
        return;
      this.spriteName = animationName;
      this.engineSprite.setSprite(animationName);
    }
    setSpriteNumber(spriteName, spriteNumber) {
    }
    static create(game, entityId) {
      return new _GenericAnimationComponent(game, entityId);
    }
  };
  var GenericAnimationComponent = _GenericAnimationComponent;
  GenericAnimationComponent.fakeImageData = new ImageData(1, 1);
  GenericAnimationComponent.componentName = "animation";

  // src/engine/pixi-integration/pixi-components/generic-position-component.ts
  var _GenericPositionComponent = class extends Component {
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
      this.engineSprite = game.engineCreator.createEngineSprite(entityId);
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
      } else {
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
      } else {
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
      this.events.emit(36 /* entityMoved */, {
        entityId: this.entityId,
        x: this._x,
        y: this._y
      });
    }
    set y(newY) {
      this._y = newY;
      this.events.emit(36 /* entityMoved */, {
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
      return new _GenericPositionComponent(game, entityId);
    }
  };
  var GenericPositionComponent = _GenericPositionComponent;
  GenericPositionComponent.componentName = "position";

  // src/engine/pixi-integration/pixi-dependencies.ts
  var PixiDependencies = class extends GameDependencies {
  };

  // src/engine/pixi-integration/pixi-game.ts
  var import_pixi = __toESM(require_pixi());
  var _PixiGame = class {
    constructor() {
      this.tileSprites = {};
      this.xBound = 64;
      //how far left of 0 should we render tiles
      this.yBound = 64;
      //how far above 0 should we render tiles
      this.spriteNameToAnimationName = {};
      this.outViewSprites = [];
      this.spriteNameToTexturePromise = {};
      this.spriteNameToTexture = {};
      this.spriteNameToAtlas = {};
      this.animationNameToSpriteSheet = {};
      this.spriteNameToSpriteSheet = {};
      this.animationNameToParsed = {};
      this.spriteDir = "../sprites/";
      this.app = new import_pixi.Application({
        width: window.innerWidth,
        height: window.innerHeight
      });
      this.loader = import_pixi.Assets;
      document.body.appendChild(this.app.view);
      const canvas = this.app.renderer.view;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.margin = "0";
      canvas.style.padding = "0";
      canvas.style.overflow = "hidden";
      canvas.style.position = "fixed";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      this.container = new import_pixi.Container();
      this.app.stage.addChild(this.container);
      this.width = this.app.view.width;
      this.height = this.app.view.height;
    }
    tileKey(tile) {
      return `${tile.tileX}:${tile.tileY}`;
    }
    getInViewTiles(tiles, cameras) {
      const inViewTiles = {};
      const xBound = this.xBound;
      const yBound = this.yBound;
      for (let x = -xBound; x < this.width + xBound; x += tiles.tileWidth) {
        const dataX = cameras.untransformX(x);
        for (let y = -yBound; y < this.height + yBound; y += tiles.tileWidth) {
          const dataY = cameras.untransformY(y);
          const tilesAtCoord = tiles.coordToTile(dataX, dataY);
          if (tilesAtCoord.length == 0)
            continue;
          const tileAtCoord = tilesAtCoord[0];
          const key = this.tileKey(tileAtCoord);
          inViewTiles[key] = tileAtCoord;
        }
      }
      return inViewTiles;
    }
    arrangeTilesInView(tiles, cameras, outViewSprites = []) {
      const width = this.width;
      const height = this.height;
      const xBound = this.xBound;
      const yBound = this.yBound;
      let dataX;
      let dataY;
      for (let x = -xBound; x < width + xBound; x += tiles.tileWidth) {
        dataX = cameras.untransformX(x);
        for (let y = -yBound; y < height + yBound; y += tiles.tileWidth) {
          dataY = cameras.untransformY(y);
          const tilesAtCoord = tiles.coordToTile(dataX, dataY);
          if (tilesAtCoord.length == 0)
            continue;
          const tileAtCoord = tilesAtCoord[0];
          const spriteName = tileAtCoord.spriteIds[0].spriteName;
          const spriteNum = tileAtCoord.spriteIds[0].spriteNumber;
          const spriteSheet = this.spriteNameToSpriteSheet[spriteName];
          const key = this.tileKey(tileAtCoord);
          let tileSprite = this.tileSprites[key];
          if (tileSprite == null && this.outViewSprites.length == 0) {
            tileSprite = new import_pixi.Sprite(spriteSheet.textures[spriteNum]);
            tileSprite.width = tiles.tileWidth + 2;
            tileSprite.height = tiles.tileWidth + 2;
            this.tileSprites[key] = tileSprite;
            this.container.addChild(tileSprite);
          }
          if (tileSprite == null && this.outViewSprites.length > 0) {
            tileSprite = this.outViewSprites.pop();
            tileSprite.texture = spriteSheet.textures[spriteNum];
            this.tileSprites[key] = tileSprite;
          }
          tileSprite.x = cameras.transformX(tiles.tileCoordToReal(tileAtCoord.tileX));
          tileSprite.y = cameras.transformY(tiles.tileCoordToReal(tileAtCoord.tileY));
        }
      }
    }
    removeExisitingSpriteById(spriteKey) {
      const tileSprite = this.tileSprites[spriteKey];
      delete this.tileSprites[spriteKey];
      this.outViewSprites.push(tileSprite);
      return tileSprite;
    }
    removeOutOfViewSprites(inViewTiles) {
      for (let key in this.tileSprites) {
        const existingSprite = this.tileSprites[key];
        if (!(key in inViewTiles)) {
          const sprite = this.removeExisitingSpriteById(key);
        }
      }
    }
    async renderTiles(tiles, cameras) {
      const inViewTiles = this.getInViewTiles(tiles, cameras);
      this.removeOutOfViewSprites(inViewTiles);
      this.arrangeTilesInView(tiles, cameras, this.outViewSprites);
    }
    path(fileName) {
      return this.spriteDir + fileName;
    }
    start() {
    }
    getAtlasFrames(sheetWidth, sheetHeight, widthImgs, heightImgs) {
      const frameWidth = sheetWidth / widthImgs;
      const frameHeight = sheetHeight / heightImgs;
      const frames = {};
      let frameNumber = 0;
      for (let y = 0; y < sheetHeight; y += frameHeight) {
        for (let x = 0; x < sheetWidth; x += frameWidth) {
          const frameKey = `${frameNumber}`;
          frames[frameKey] = {
            frame: { x, y, w: frameWidth, h: frameHeight },
            sourceSize: { w: frameWidth, h: frameHeight },
            spriteSourceSize: { x: 0, y: 0 }
          };
          frameNumber++;
        }
      }
      return frames;
    }
    loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx = 0, offsety = 0) {
      this.spriteNameToAnimationName[spriteName] = [];
      const path = this.path(fileName);
      const texturePromise = this.loader.load(path);
      this.spriteNameToTexturePromise[spriteName] = texturePromise;
      texturePromise.then((texture) => {
        this.spriteNameToTexture[spriteName] = texture;
      });
      const width = metadata[path.replace("../", "")].width;
      const height = metadata[path.replace("../", "")].height;
      const frames = this.getAtlasFrames(width, height, widthImgs, heightImgs);
      const atlas = {
        frames,
        meta: {
          // image: 'images/spritesheet.png',
          // format:"RGBA8888",
          // size: { w: 128, h: 32 },
          scale: "1"
        },
        animations: {}
      };
      this.spriteNameToAtlas[spriteName] = atlas;
    }
    async addAnimation(spriteName, animationName, spriteNumbers, delay) {
      if (!(spriteName in this.spriteNameToAnimationName)) {
        console.log(`Skipped Animation: ${spriteName}`);
        return;
      }
      this.spriteNameToAnimationName[spriteName].push(animationName);
      const texture = await this.spriteNameToTexturePromise[spriteName];
      const atlas = this.spriteNameToAtlas[spriteName];
      if (atlas == null)
        return;
      const allFrames = atlas.frames;
      const animationFrames = {};
      spriteNumbers.forEach((num) => {
        const frameKey = num.toString();
        animationFrames[frameKey] = allFrames[frameKey];
      });
      atlas.animations[animationName] = spriteNumbers.map((n) => n.toString());
    }
    getSpriteAnimation(animationName) {
      const spriteSheet = this.animationNameToSpriteSheet[animationName];
      if (!(animationName in this.animationNameToParsed)) {
        this.animationNameToParsed[animationName] = true;
      }
      if (spriteSheet == null || !(animationName in spriteSheet.animations)) {
        return;
      }
      const animationFrames = spriteSheet.animations[animationName];
      const animation = new import_pixi.AnimatedSprite(animationFrames);
      animation.animationSpeed = 0.1666;
      animation.play();
      this.container.addChild(animation);
      this.container.sortableChildren = true;
      return animation;
    }
    async finishLoading() {
      const textures = this.spriteNameToTexturePromise;
      for (let i in textures) {
        const texture = textures[i];
        await texture;
      }
      this.finishSpriteSheetGeneration();
      const spriteSheets = this.spriteNameToSpriteSheet;
      for (let i in spriteSheets) {
        const spriteSheet = spriteSheets[i];
        spriteSheet.parse();
      }
    }
    finishSpriteSheetGeneration() {
      const spriteToAnimation = this.spriteNameToAnimationName;
      for (let spriteName in spriteToAnimation) {
        const animationNames = spriteToAnimation[spriteName];
        const texture = this.spriteNameToTexture[spriteName];
        const atlas = this.spriteNameToAtlas[spriteName];
        const spriteSheet = new import_pixi.Spritesheet(texture, atlas);
        this.spriteNameToSpriteSheet[spriteName] = spriteSheet;
        animationNames.forEach((animationName) => {
          this.animationNameToSpriteSheet;
          this.animationNameToSpriteSheet[animationName] = spriteSheet;
        });
      }
    }
    static createSingleton() {
      if (this.pixiGame != null)
        return _PixiGame.pixiGame;
      _PixiGame.pixiGame = new _PixiGame();
      return _PixiGame.pixiGame;
    }
  };
  var PixiGame = _PixiGame;
  PixiGame.pixiGame = null;

  // src/engine/pixi-integration/pixi-sprite-manager.ts
  var PixiSpriteManager = class {
    constructor(pixiGame) {
      this.pixiGame = pixiGame;
    }
    async onLoad(callback) {
      await this.pixiGame.finishLoading();
      if (callback == null)
        return;
      callback();
    }
    loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx, offsety) {
      this.pixiGame.loadSprite(spriteName, fileName, widthImgs, heightImgs, offsetx, offsety);
    }
    loadSpriteWithDimensions(spriteName, fileName, frameWidth, frameHeight, offsetx, offsety) {
    }
    loadSpriteOverlapping(spriteName, fileName) {
    }
    addAnimation(spriteName, animationName, spriteNumbers, delay) {
      this.pixiGame.addAnimation(spriteName, animationName, spriteNumbers, delay);
    }
    static create(gameDependencies) {
      gameDependencies.checkDependency(gameDependencies.pixiGame);
      return new PixiSpriteManager(gameDependencies.pixiGame);
    }
  };

  // src/engine/pixi-integration/sprite-dependency/pixi-engine-sprite.ts
  var PixieEngineSprite = class {
    constructor(gameDependencies) {
      this._rotate = 0;
      gameDependencies.checkDependency(gameDependencies.pixiGame);
      this.pixieGame = gameDependencies.pixiGame;
      this.sprite = this.pixieGame.getSpriteAnimation("greyWalk");
      this.pivotX = 0.5;
      this.pivotY = 1;
      this.anchorX = 0.5;
      this.anchorY = 1;
    }
    get rotate() {
      return this._rotate;
    }
    set rotate(newRotate) {
      this._rotate = newRotate;
      this.sprite.rotation = newRotate;
    }
    /**
     * Getter width
     * @return {number}
     */
    get width() {
      return this.sprite.width;
    }
    /**
     * Getter height
     * @return {number}
     */
    get height() {
      return this.sprite.height;
    }
    /**
     * Getter faceRight
     * @return {boolean}
     */
    get faceRight() {
      return this._faceRight;
    }
    /**
     * Getter x
     * @return {number}
     */
    get x() {
      return this.sprite.x;
    }
    /**
     * Getter y
     * @return {number}
     */
    get y() {
      return this.sprite.y;
    }
    /**
     * Getter vx
     * @return {number}
     */
    get vx() {
      return this._vx;
    }
    /**
     * Getter vy
     * @return {number}
     */
    get vy() {
      return this._vy;
    }
    /**
     * Setter width
     * @param {number} value
     */
    set width(value) {
      this.sprite.width = value;
    }
    /**
     * Setter height
     * @param {number} value
     */
    set height(value) {
      this.sprite.height = value;
    }
    /**
     * Setter faceRight
     * @param {boolean} value
     */
    set faceRight(value) {
      if (value != this._faceRight) {
        if (value) {
          this.sprite.scale.x = Math.abs(this.sprite.scale.x);
        } else {
          this.sprite.scale.x = Math.abs(this.sprite.scale.x) * -1;
        }
      }
      this._faceRight = value;
    }
    /**
     * Setter x
     * @param {number} value
     */
    set x(value) {
      this.sprite.x = value;
    }
    /**
     * Setter y
     * @param {number} value
     */
    set y(value) {
      this.sprite.y = value;
      this.sprite.zIndex = value;
    }
    /**
     * Setter vx
     * @param {number} value
     */
    set vx(value) {
      this._vx = value;
    }
    /**
     * Setter vy
     * @param {number} value
     */
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
  };

  // src/engine/pixi-integration/sprite-dependency/pixie-engine-creator.ts
  var PixieEngineCreator = class {
    constructor(gameDependencies) {
      this.idToEngineSprite = {};
      this.gameDependencies = gameDependencies;
    }
    createEngineSprite(entityId) {
      if (entityId in this.idToEngineSprite)
        return this.idToEngineSprite[entityId];
      const entity = PixieEngineSprite.create(this.gameDependencies);
      this.idToEngineSprite[entityId] = entity;
      return entity;
    }
    static create(gameDependencies) {
      return new PixieEngineCreator(gameDependencies);
    }
  };

  // src/engine/pixi-integration/generic-render.ts
  var GenericRenderer = class {
    constructor() {
    }
    spriteFilter(filter, x, y, width, height, spriteNumber, options) {
    }
    cbox() {
    }
    getOffset() {
      return [0, 0];
    }
    setOffset(offset) {
    }
    sprite(spriteName, x, y, width, height, spriteNumber, options) {
    }
    text(text, x, y, size) {
    }
    circle(x, y, r) {
    }
    line(x1, y1, x2, y2) {
    }
    static create() {
      return new GenericRenderer();
    }
  };

  // src/engine/pixi-integration/systems/generic-render-system.ts
  var GenericRenderSystem = class extends EntitySystem {
    constructor(game, entityId) {
      super(game);
      this.oncePerLoop = (args) => {
        const first = args.entity;
        const tiles = first.getComponent("tile");
        this.pixieGame.renderTiles(tiles, this.cameras);
      };
      const deps = this.game.gameDependencies;
      deps.checkDependency(deps.engineCreator);
      this.creator = deps.engineCreator;
      deps.checkDependency(deps.cameras);
      this.cameras = deps.cameras;
      game.eventManager.addListener(36 /* entityMoved */, (event) => {
        const newX = event.eventData.x;
        const newY = event.eventData.y;
        const entityId2 = event.eventData.entityId;
        const sprite = this.creator.createEngineSprite(entityId2.toString());
        sprite.x = this.cameras.transformX(newX);
        sprite.y = this.cameras.transformY(newY);
      });
      this.pixieGame = PixiGame.createSingleton();
    }
    apply(args) {
    }
    applyEvents(entity, eventManager) {
    }
    static create(game, entityId) {
      return new GenericRenderSystem(game, entityId);
    }
  };

  // src/engine/pixi-integration/pixi-builder.ts
  function pixiGameBuilder() {
    const deps = new PixiDependencies();
    deps.pixiGame = PixiGame.createSingleton();
    deps.spriteManager = PixiSpriteManager.create(deps);
    deps.renderer = GenericRenderer.create();
    deps.cameras = GenericCameras.create();
    deps.engineCreator = PixieEngineCreator.create(deps);
    deps.eventManager = EventManager.create();
    deps.componentFactory = ComponentFactory.create(deps);
    deps.entityFactory = EntityFactory.create(deps);
    const game = Game.createCustom(deps);
    game.registerComponent(GenericPositionComponent);
    game.registerComponent(GenericAnimationComponent);
    game.addSystem(GenericRenderSystem.create(game));
    game.addStarter(() => {
      setTimeout(() => deps.pixiGame.start(), 5e3);
    });
    game.addStarter(() => {
      deps.pixiGame.app.ticker.add((delta) => {
        game.step(delta * 15);
      });
    });
    return game;
  }

  // src/components/weapon-component.ts
  var WeaponComponent = class extends Component {
    constructor(gameDependencies, entityId) {
      super("weapon");
      this.weaponEntity = null;
      this.weaponPosition = null;
      this.weaponOffsetX = 0;
      this.weaponOffsetY = -0.5;
      this.wobble = 0;
      this.rotationSpeed = 0.1;
      this.game = gameDependencies.game;
    }
    holdWeapon() {
      this.weaponOffsetX = 0.1;
      this.weaponOffsetY = -0.45;
      this.weaponPosition.rotate = 2;
    }
    sheatheWeapon() {
      this.weaponOffsetX = 0.5;
      this.weaponOffsetY = -0.5;
      this.weaponPosition.rotate = 5;
    }
    sheatheBack() {
      this.weaponOffsetX = -0.6;
      this.weaponOffsetY = -0.75;
      this.weaponPosition.rotate = 3.2;
      this.rotationSpeed = 0;
    }
    flip(faceRight) {
      if (faceRight == this.weaponPosition.faceRight)
        return;
      this.weaponPosition.faceRight = faceRight;
      this.weaponOffsetX = faceRight ? -Math.abs(this.weaponOffsetX) : Math.abs(this.weaponOffsetX);
    }
    spin() {
      this.weaponOffsetX = 0;
      this.weaponOffsetY = -0.5;
      this.weaponPosition.rotate = 5;
      this.rotationSpeed = 0.1;
    }
    zeroOut() {
      this.weaponOffsetX = 0;
      this.weaponOffsetY = 0;
      this.weaponPosition.rotate = 0;
      this.rotationSpeed = 0;
    }
    update(entity, args) {
      if (this.weaponEntity == null) {
        this.weaponEntity = this.game.addEntity("weapon");
        this.weaponPosition = this.weaponEntity.getComponent("position");
      }
      const wielderPosition = entity.getComponent("position");
      this.flip(wielderPosition.faceRight);
      this.weaponPosition.x = wielderPosition.x + this.weaponOffsetX * wielderPosition.width + Math.ceil(Math.sin(this.wobble)) * 5;
      this.weaponPosition.y = wielderPosition.y + this.weaponOffsetY * wielderPosition.height;
      this.wobble += 0;
      this.weaponPosition.rotate += this.rotationSpeed;
    }
    static create(gameDependencies, entityId) {
      return new WeaponComponent(gameDependencies, entityId);
    }
  };

  // src/game-builders.ts
  function sharedComponents(game) {
    game.registerComponent(WasdComponent);
    game.registerComponent(CropComponent);
    game.registerComponent(ProjectileComponent);
    game.registerComponent(FightComponent);
    game.registerComponent(HealthComponent);
    game.registerComponent(NeuralFightComponent);
    game.registerComponent(InventoryComponent);
    game.registerComponent(ParticleComponent);
    game.registerComponent(PrimitiveComponent);
    game.registerComponent(TransitionComponent);
    game.registerComponent(TileComponent);
    game.registerComponent(ClickableComponent);
    game.registerComponent(PlaceItemComponent);
    game.registerComponent(CropHarvesterComponent);
    game.registerComponent(TextComponent);
    game.registerComponent(WeaponComponent);
  }
  function sharedSystems(game) {
    game.addSystem(WasdSystem.create(game));
    game.addSystem(CropSystem.create(game));
    game.addSystem(CollisionSystem.create(game));
    game.addSystem(ProjectileSystem.create(game));
    game.addSystem(HealthSystem.create(game));
    game.addSystem(NeuralFightSystem.create(game));
    game.addSystem(PlaceItemSystem.create(game));
    game.addSystem(InventorySystem.create(game));
    game.addSystem(ParticleSystem.create(game));
    game.addSystem(MapBuilderSystem.create(game));
    game.addSystem(ClickSystem.create(game));
  }
  function createPixiGame() {
    console.log("creating pixi game");
    const game = pixiGameBuilder();
    sharedSystems(game);
    buildSprites(game);
    buildEntities(game);
    sharedComponents(game);
    return game;
  }

  // src/game.ts
  function startGame() {
    let game = createPixiGame();
    game.gameDependencies.spriteManager.onLoad(() => {
      game.addEntity("first");
      const player = makePlayer();
      const playerPosition = player.getComponent("position");
      const playerSword = player.getComponent("weapon");
      setTimeout(() => playerSword.holdWeapon(), 100);
      game.gameDependencies.cameras.setMainCamera(playerPosition);
      var villager = game.addEntity("villager");
      var component = villager.getComponent("position");
      let ac = villager.getComponent("animation");
      ac.setSprite("arrowsword");
      component.x = 150;
      component.y = 300;
      component.vx = 0;
      let sword = game.addEntity("weapon");
      const pos = sword.getComponent("position");
      pos.x = 100;
      pos.y = 100;
      setInterval(() => {
        pos.rotate += 0.1;
      }, 1e3 / 30);
      var deer = game.addEntity("deer");
      let deerPos = deer.getComponent("position");
      let deerAC = deer.getComponent("animation");
      deerPos.x = 500;
      deerPos.y = 100;
      let particle = game.addEntity("particles");
      let particleC = particle.getComponent("particles");
      particleC.targetParticles = 4;
      let pPos = particle.getComponent("position");
      pPos.x = 150;
      pPos.y = 400;
      const tileWidth = 64;
      placeField(tileWidth * 5, tileWidth * 5, "wheat", tileWidth, 6);
      placeField(tileWidth * 12, tileWidth * 5, "corn", tileWidth);
      placeField(tileWidth * 5, tileWidth * 12, "turnip", tileWidth);
      placeField(tileWidth * 12, tileWidth * 12, "onion", tileWidth);
      function placeField(x, y, cropName, d = 64, width = 5) {
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
        var component2 = crop.getComponent("position");
        component2.x = x;
        component2.y = y;
        return crop;
      }
      function makePlayer() {
        var player2 = game.addEntity("player");
        var pc = player2.getComponent("position");
        var ac2 = player2.getComponent("animation");
        pc.x = 0;
        pc.y = 0;
        return player2;
      }
      game.start();
      window.game = game;
      return game;
    });
  }
  if (typeof window !== "undefined") {
    const game = startGame();
  }
})();
//# sourceMappingURL=game.mjs.map
