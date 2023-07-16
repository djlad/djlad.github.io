(() => {
  // ../game/lib/index.js
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var require_phaser = __commonJS({
    "external-global-plugin:phaser"(exports, module) {
      module.exports = window.Phaser;
    }
  });
  var require_pixi = __commonJS({
    "external-global-plugin:pixi.js"(exports, module) {
      module.exports = window.PIXI;
    }
  });
  var Component = class {
    constructor(componentName) {
      this.componentName = componentName;
    }
    componentName;
    static create(game2, entityId) {
      throw "Component must implement static create function";
    }
    static createWithGame(game2, entityId) {
    }
  };
  var PositionComponent = class extends Component {
    constructor() {
      super("position");
    }
    _vx = 0;
    get vx() {
      return this._vx;
    }
    set vx(vx) {
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
    _vy = 0;
    get vy() {
      return this._vy;
    }
    set vy(vy) {
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
    _rotate = 0;
    get rotate() {
      return this._rotate;
    }
    set rotate(radiansToRotate) {
      this._rotate = radiansToRotate % (2 * Math.PI);
    }
    x = 0;
    y = 0;
    h = 0;
    width = 100;
    height = 100;
    faceRight = true;
    faceX = 0;
    faceY = 0;
    moved = false;
    applyOffsets = true;
    update(entity, args) {
      const delta = args.delta;
      this.x += this.vx * delta;
      this.y += this.vy * delta;
      this.moved = !(this.vx == 0 && this.vy == 0);
    }
    static create() {
      return new PositionComponent();
    }
    pivotX = 0.5;
    pivotY = 1;
    anchorX = 0.5;
    anchorY = 1;
  };
  var WasdComponent = class extends Component {
    constructor() {
      super("wasd");
    }
    speed = 5;
    dashSpeed = 15;
    dashingTime = 0;
    maxDashingTime = 20;
    dashing = false;
    dashWidth = 0;
    dashHeight = 0;
    dashSprite = "";
    dashSpriteNumber = 0;
    sprite = "grey";
    walkSprite = "greyWalk";
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
  var CropComponent = class extends Component {
    constructor() {
      super("crop");
      this.growthLengths = [5, 5, 5];
      this.growthStage = 0;
      this.cropName = "turnip";
      this.setCrop(this.cropName);
    }
    //growth sprites for each stage
    growthSprites;
    //index of current growthSprite in growthSprites
    //also index of growthLength in growth lengths
    growthStage;
    growthLengths;
    timeSinceGrowth = 0;
    cropName;
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
  var ProjectileComponent = class extends Component {
    constructor() {
      super("projectile");
    }
    lifeSpan = 90;
    shooterId;
    update() {
    }
    static create() {
      return new ProjectileComponent();
    }
  };
  var FightComponent = class extends Component {
    constructor() {
      super("fight");
    }
    target;
    attack = false;
    maxSpeed = 5;
    range = 300;
    reloadTime = 30;
    reloadTimer = 30;
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
  var HealthComponent = class extends Component {
    constructor() {
      super("health");
    }
    health = 100;
    update() {
    }
    static create() {
      return new HealthComponent();
    }
  };
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
  var InventoryItem = class {
    constructor() {
    }
    itemQuantity = 0;
    itemName = "no name";
    itemDescription = "no description";
    itemSlot = -1;
    static create(itemType) {
      let item = new InventoryItem();
      item.itemName = itemType.itemName;
      item.itemDescription = itemType.itemDescription;
      return item;
    }
  };
  var _InventoryItemType = class {
    constructor(itemName, itemDescription, itemSpriteName) {
      _InventoryItemType.largestItemId += 1;
      this.itemId = _InventoryItemType.largestItemId;
      this.itemName = itemName;
      this.itemDescription = itemDescription;
      this.itemSpriteName = itemSpriteName;
    }
    itemId = -1;
    itemName = "no name";
    itemDescription = "no description";
    itemSpriteName;
    static create(itemName, itemSpriteName, itemDescription) {
      let newItemType;
      newItemType = new _InventoryItemType(itemName, itemDescription, itemSpriteName);
      return newItemType;
    }
  };
  var InventoryItemType = _InventoryItemType;
  __publicField(InventoryItemType, "largestItemId", -1);
  var _InventoryItemRegistry = class {
    constructor() {
    }
    itemTypes = {};
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
      let itemRegistry = new _InventoryItemRegistry();
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
  var InventoryItemRegistry = _InventoryItemRegistry;
  __publicField(InventoryItemRegistry, "singletonRegistry");
  var InventoryComponent = class extends Component {
    constructor(itemRegistry) {
      super("inventory");
      this.itemRegistry = itemRegistry;
      this.itemSlots = new Array(10);
      for (let i = 0; i < this.itemSlots.length; i++) {
        let itemType = this.itemRegistry.itemTypes["nothing"];
        this.itemSlots[i] = InventoryItem.create(itemType);
      }
    }
    inventory = {};
    itemSlots = [];
    selectedItemSlot = 0;
    itemRegistry;
    inventoryItemEntities = [];
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
  var PlaceItemRequest = class {
    constructor(entityName, coordinates, quantity = 1, successCallback, relative = true) {
      this.entityName = entityName;
      this.coordinates = coordinates;
      this.quantity = quantity;
      this.successCallback = successCallback;
      this.relative = relative;
    }
    entityName;
    coordinates;
    quantity;
    successCallback;
    relative;
  };
  var PlaceItemComponent = class extends Component {
    constructor() {
      super("placeItem");
    }
    placeItemRequests = [];
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
  var CropHarvesterComponent = class extends Component {
    harvesting = false;
    harvestTime = 0;
    timeItTakesToHarvest = 10;
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
  var TextPlacement = class {
    constructor(textValue, offsetX, offsetY) {
      this.textValue = textValue;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    }
    offsetX;
    offsetY;
    textValue;
  };
  var TextComponent = class extends Component {
    constructor() {
      super("text");
    }
    textPlacements = [];
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
  var ParticleComponent = class extends Component {
    constructor() {
      super("particles");
    }
    particles = [];
    targetParticles = 10;
    time = 0;
    maxSpeed = 50;
    paths = [
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
  var PrimitiveComponent = class extends Component {
    update(entity) {
    }
    static create() {
      return new PrimitiveComponent("primitive");
    }
  };
  var TransitionComponent = class extends Component {
    constructor() {
      super("transition");
    }
    time = 0;
    reference = null;
    current = null;
    targetAnimationName = "fireball";
    targetSpriteNumber = 0;
    target;
    running = false;
    speed = 15;
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
  var SpriteId = class {
    spriteName;
    spriteNumber;
    static create(spriteName, spriteNumber) {
      const spriteId = new SpriteId();
      spriteId.spriteName = spriteName;
      spriteId.spriteNumber = spriteNumber;
      return spriteId;
    }
  };
  var Tile = class {
    spriteIds = [];
    tileX;
    tileY;
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
  var TileComponent = class extends Component {
    constructor() {
      super("tile");
    }
    update(entity) {
    }
    tileWidth = 64;
    tiles = [];
    tilesByCoords = {};
    tileSpriteNames = ["grass", "soil"];
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
    removeTiles() {
      this.tiles = [];
      this.tilesByCoords = {};
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
  var ClickableComponent = class extends Component {
    constructor() {
      super("click");
    }
    update(entity) {
    }
    callback = [];
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
  var SpriteAnimation = class {
    constructor(animationName, spriteName, spriteNumbers, delay) {
      this.spriteNumbers = spriteNumbers;
      this.animationName = animationName;
      this.spriteName = spriteName;
      this.delay = delay;
    }
    spriteNumbers;
    animationName;
    spriteName;
    delay;
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
  var _HtmlCanvas = class {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
    }
    canvas;
    ctx;
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
  __publicField(HtmlCanvas, "canvas", null);
  var _HtmlRectSprite = class {
    constructor(spriteImg, widthImgs, heightImgs, offsetx = 0, offsety = 0, frameWidth = 0, frameHeight = 0) {
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
    ctx;
    widthImgs;
    heightImgs;
    frameWidth = 1;
    frameHeight = 1;
    sprite;
    canvas;
    loaded = false;
    offsetx;
    offsety;
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
  __publicField(HtmlRectSprite, "spriteDir", "../sprites/");
  var HtmlSprite = class {
    constructor(fileName) {
      var spriteImg = new Image();
      spriteImg.src = this.spriteDir + fileName;
      this.sprite = spriteImg;
      spriteImg.onload = this.setFrameDimensions(this);
      this.ctx = HtmlCanvas.createSingleton().ctx;
    }
    loaded;
    getRGBs(spriteNumber) {
      throw new Error("Method not implemented.");
    }
    spriteDir = "../sprites/";
    sprite;
    ctx;
    frameCoordsCalculated = [];
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
  var _SpriteManager = class {
    constructor(spriteDir = "../sprites/") {
    }
    onLoad(callback) {
    }
    sprites = {};
    //sprite name to sprite
    animations = {};
    //animation name to animation
    RGBs = {};
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
  __publicField(SpriteManager, "spriteManager", null);
  var WeaponComponent = class extends Component {
    constructor(gameDependencies, entityId) {
      super("weapon");
      this.game = gameDependencies.game;
    }
    weaponEntity = null;
    weaponPosition = null;
    weaponOffsetX = 0;
    weaponOffsetY = -0.5;
    game;
    wobble = 0;
    rotationSpeed = 0.1;
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
  var GameDependencies = class {
    engineCreator = null;
    // only necessary if using an engine like phaser/pixi
    imgMetaData = null;
    componentFactory = null;
    entityFactory = null;
    renderer = null;
    eventManager = null;
    spriteManager = null;
    cameras = null;
    game;
    checkDependency(gameDependency) {
      if (gameDependency == null) {
        console.error(`Dependency was requested but it was null`);
      }
    }
  };
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
  var _ComponentFactory = class {
    constructor(gameDependencies) {
      this.gameDependencies = gameDependencies;
    }
    gameDependencies;
    componentTypes = {};
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
      var cf = new _ComponentFactory(gameDependencies);
      return cf;
    }
  };
  var ComponentFactory = _ComponentFactory;
  __publicField(ComponentFactory, "dependencies");
  var GenericCameras = class {
    center;
    halfWindowWidth = window.innerWidth / 2;
    halfWindowHeight = window.innerHeight / 2;
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
  var _Entity = class {
    constructor(componentFactory) {
      this.componentFactory = componentFactory;
      _Entity.id++;
      this.id = _Entity.id;
    }
    id = -1;
    components = [];
    componentNameToComponent = {};
    componentFactory;
    targetedEvents = [];
    delayedEvents = [];
    destroyed = false;
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
  __publicField(Entity, "id", -1);
  var EntityFactory = class {
    constructor(gameDependencies) {
      gameDependencies.checkDependency(gameDependencies.componentFactory);
      this.componentFactory = gameDependencies.componentFactory;
      this.dependencies = gameDependencies;
    }
    dependencies;
    entityTypes = {};
    componentFactory;
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
  var EntityUpdateArgs = class {
    delta;
    fullFramePassed;
  };
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
    EventType2[EventType2["touchMove"] = 39] = "touchMove";
    return EventType2;
  })(EventType || {});
  var GameEvent = class {
    constructor(eventName, eventData, componentTarget = null) {
      this.eventName = eventName;
      this.eventData = eventData;
      this.eventDescription = EventType[eventName];
    }
    eventName;
    eventDescription;
    eventData;
    componentTarget;
    static create(eventName, eventData = null) {
      var ge = new GameEvent(eventName, eventData);
      return ge;
    }
  };
  var KeyEvents = class {
    downKey;
    upKey;
    keyCode;
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
    results.push(KeyEvents.create(0, 4, 87));
    results.push(KeyEvents.create(1, 5, 65));
    results.push(KeyEvents.create(2, 6, 83));
    results.push(KeyEvents.create(3, 7, 68));
    results.push(KeyEvents.create(8, 9, 32));
    results.push(KeyEvents.create(12, 13, 80));
    results.push(KeyEvents.create(11, 10, 73));
    results.push(KeyEvents.create(14, 15, 70));
    results.push(KeyEvents.create(22, 16, 74));
    results.push(KeyEvents.create(23, 17, 75));
    results.push(KeyEvents.create(24, 18, 76));
    results.push(KeyEvents.create(26, 26, 186));
    results.push(KeyEvents.create(27, 21, 192));
    return results;
  }
  var keyEvents = getKeyEvents();
  var EventManager = class {
    constructor() {
      this.keys = this.createKeyListener();
    }
    keys = Array(1e3);
    keysReleased = Array(1e3);
    //events:{[key:string]:GameEvent[]} = {};
    events = [];
    callbacks = {};
    touch = {};
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
        this.emit(28, { x, y });
      });
      window.addEventListener("touchstart", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        this.emit(37, {
          x,
          y
        });
      });
      window.addEventListener("touchend", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.changedTouches[0].clientX - rect.left;
        const y = e.changedTouches[0].clientY - rect.top;
        this.emit(38, {
          x,
          y
        });
      });
      window.addEventListener("touchmove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        this.emit(39, {
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
      em.createEvent(
        0
        /* wDown */
      );
      em.createEvent(
        1
        /* aDown */
      );
      em.createEvent(
        2
        /* sDown */
      );
      em.createEvent(
        3
        /* dDown */
      );
      return em;
    }
  };
  var HtmlRenderer = class {
    canvas;
    ctx;
    offset;
    spriteManager;
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
  var SystemArgs = class {
    entity;
    eventManager;
    delta;
    fullFramesPassed;
  };
  var Game = class {
    spriteManager;
    newTime;
    constructor(entityFactory, renderer, eventManager, gameDependencies) {
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
      var game2 = new Game(deps.entityFactory, deps.renderer, EventManager.create(), deps);
      return game2;
    }
    static createCustom(dependencies) {
      var game2 = new Game(dependencies.entityFactory, dependencies.renderer, dependencies.eventManager, dependencies);
      dependencies.game = game2;
      return game2;
    }
    starters = [];
    _entities = [];
    get entities() {
      return this._entities;
    }
    set entities(entities) {
      this._entities = entities;
    }
    //entitiesX:Entity[] = [];
    entityFactory;
    systems = [];
    systemsWithOncePerTurnUpdate = [];
    renderer;
    eventManager;
    intervalId;
    gameDependencies;
    performance;
    frameTime;
    targetFps = 60;
    counter = 0;
    lastTime = performance.now();
    frameTracker = 0;
    phaserGame;
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
  var import_phaser = __toESM(require_phaser());
  var MainScene = class extends import_phaser.Scene {
    constructor() {
      super({ key: "main" });
    }
    updater = () => {
    };
    creators = [];
    loaders = [];
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
  var Phaser = __toESM(require_phaser());
  var _PhaserGame = class {
    constructor() {
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
    config;
    game;
    mainScene = new MainScene();
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
  __publicField(PhaserGame, "phaserGame", null);
  var metadata = { "sprites/arm.png": { "height": 32, "width": 32, "type": "png" }, "sprites/BearSprites.webp": { "height": 384, "width": 384, "type": "webp" }, "sprites/blond.png": { "height": 259, "width": 64, "type": "png" }, "sprites/blondWalk.png": { "height": 336, "width": 317, "type": "png" }, "sprites/crops.png": { "height": 256, "width": 384, "type": "png" }, "sprites/deer/deer female calciumtrice.png": { "height": 160, "width": 160, "type": "png" }, "sprites/deer/deer male calciumtrice.png": { "height": 160, "width": 160, "type": "png" }, "sprites/fantasysprites.png": { "height": 512, "width": 384, "type": "png" }, "sprites/fantasysprites/CompSpriteC.png": { "height": 166, "width": 96, "type": "png" }, "sprites/fantasysprites/DwarfSprites.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/DwarfSprites2.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/EnemySpriteSheet1.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/FDwarfSheet.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/PeopleSpriteSheet2.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/PeopleSpriteSheet3.png": { "height": 256, "width": 384, "type": "png" }, "sprites/fantasysprites/SpriteCompD.png": { "height": 188, "width": 96, "type": "png" }, "sprites/fireball.png": { "height": 512, "width": 512, "type": "png" }, "sprites/greg.png": { "height": 96, "width": 64, "type": "png" }, "sprites/greyactions.png": { "height": 96, "width": 64, "type": "png" }, "sprites/scrops.png": { "height": 672, "width": 391, "type": "png" }, "sprites/sword-7Soul1.png": { "height": 192, "width": 256, "type": "png" }, "sprites/tilesets/submission_daneeklu/character/grab_sheet.png": { "height": 256, "width": 384, "type": "png" }, "sprites/tilesets/submission_daneeklu/character/sword_sheet_128.png": { "height": 504, "width": 768, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_firelion_big.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_firelion_sheet.png": { "height": 256, "width": 256, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_iceshield_sheet.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_snakebite_sheet.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/magic_torrentacle.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/turtleshell_front.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magic/turtleshell_side.png": { "height": 512, "width": 512, "type": "png" }, "sprites/tilesets/submission_daneeklu/magics_preview.gif": { "height": 128, "width": 128, "type": "gif" }, "sprites/tilesets/submission_daneeklu/tileset_preview.png": { "height": 576, "width": 768, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/farming_fishing.png": { "height": 640, "width": 640, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/fence_alt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/fence.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/grass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/grassalt.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/hole.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/plants.png": { "height": 384, "width": 288, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/plowed_soil.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/reed.png": { "height": 320, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/sand.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/sandwater.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/tallgrass.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/wheat.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/tilesets/youngwheat.png": { "height": 192, "width": 96, "type": "png" }, "sprites/tilesets/submission_daneeklu/ui_preview.png": { "height": 192, "width": 224, "type": "png" }, "sprites/tilesets/submission_daneeklu/ui/scrollsandblocks.png": { "height": 320, "width": 544, "type": "png" }, "sprites/victoriansprites.png": { "height": 384, "width": 384, "type": "png" } };
  var _PhaserSpriteManager = class {
    constructor(spriteDir = "../sprites/") {
      this.phaserGame = PhaserGame.createSingleton();
      this.spriteDir = spriteDir;
    }
    onLoad(callback) {
      throw new Error("Method not implemented.");
    }
    spriteDir;
    phaserGame;
    spriteNameToPath = {};
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
  __publicField(PhaserSpriteManager, "spriteManager", null);
  var EntitySystem = class {
    /**
     * System that can be applied to an entity
     * manipulates one or more components through the component's public interface
     * Do not change components directly through a system
     */
    constructor(game2) {
      this.game = game2;
    }
    targetComponents;
    game;
    oncePerLoop = null;
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
  var GenericRenderer = class {
    constructor() {
    }
    offset;
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
    spriteManager;
    static create() {
      return new GenericRenderer();
    }
  };
  var _GenericAnimationComponent = class extends Component {
    engineSprite;
    spriteName;
    constructor(game2, entityId) {
      super("animation");
      game2.checkDependency(game2.engineCreator);
      this.engineSprite = game2.engineCreator.createEngineSprite(entityId);
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
    static create(game2, entityId) {
      return new _GenericAnimationComponent(game2, entityId);
    }
  };
  var GenericAnimationComponent = _GenericAnimationComponent;
  __publicField(GenericAnimationComponent, "fakeImageData", new ImageData(1, 1));
  __publicField(GenericAnimationComponent, "componentName", "animation");
  var _GenericPositionComponent = class extends Component {
    // public phaserObject: Phaser.Physics.Matter.Sprite
    engineSprite;
    events;
    entityId;
    constructor(game2, entityId) {
      super("position");
      this.engineSprite = game2.engineCreator.createEngineSprite(entityId);
      this.engineSprite.setSprite("greyWalk");
      this.engineSprite.width = this.width;
      this.engineSprite.height = this.height;
      game2.checkDependency(game2.eventManager);
      this.events = game2.eventManager;
      this.entityId = entityId;
    }
    speedMultiplier = 50;
    _vx = 0;
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
    _vy = 0;
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
    _rotate = 0;
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
      this.events.emit(36, {
        entityId: this.entityId,
        x: this._x,
        y: this._y
      });
    }
    set y(newY) {
      this._y = newY;
      this.events.emit(36, {
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
    _x = 0;
    _y = 0;
    h = 0;
    _width = 100;
    _height = 100;
    flip = false;
    _faceRight = true;
    get faceRight() {
      return this._faceRight;
    }
    set faceRight(value) {
      this._faceRight = value;
      this.engineSprite.faceRight = value;
    }
    faceX = 0;
    faceY = 0;
    moved = false;
    applyOffsets = true;
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
    static create(game2, entityId) {
      return new _GenericPositionComponent(game2, entityId);
    }
  };
  var GenericPositionComponent = _GenericPositionComponent;
  __publicField(GenericPositionComponent, "componentName", "position");
  var PixiDependencies = class extends GameDependencies {
    pixiGame;
  };
  var import_pixi = __toESM(require_pixi());
  var _PixiGame = class {
    tileSprites = {};
    width;
    height;
    xBound = 64;
    //how far left of 0 should we render tiles
    yBound = 64;
    //how far above 0 should we render tiles
    spriteNameToAnimationName = {};
    outViewSprites = [];
    ptime;
    metadata;
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
    loader;
    spriteNameToTexturePromise = {};
    spriteNameToTexture = {};
    spriteNameToAtlas = {};
    animationNameToSpriteSheet = {};
    spriteNameToSpriteSheet = {};
    animationNameToParsed = {};
    constructor(imgMetaData) {
      this.metadata = imgMetaData ?? metadata;
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
    app;
    container;
    spriteDir = "../sprites/";
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
      const width = this.metadata[path.replace("../", "")].width;
      const height = this.metadata[path.replace("../", "")].height;
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
    static createSingleton(deps) {
      if (this.pixiGame != null)
        return _PixiGame.pixiGame;
      const metadata22 = deps.imgMetaData;
      _PixiGame.pixiGame = new _PixiGame(metadata22);
      return _PixiGame.pixiGame;
    }
  };
  var PixiGame = _PixiGame;
  __publicField(PixiGame, "pixiGame", null);
  var PixiSpriteManager = class {
    pixiGame;
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
  var PixieEngineSprite = class {
    pixieGame;
    sprite;
    constructor(gameDependencies) {
      gameDependencies.checkDependency(gameDependencies.pixiGame);
      this.pixieGame = gameDependencies.pixiGame;
      this.sprite = this.pixieGame.getSpriteAnimation("greyWalk");
      this.pivotX = 0.5;
      this.pivotY = 1;
      this.anchorX = 0.5;
      this.anchorY = 1;
    }
    _width;
    _height;
    _faceRight;
    _x;
    _y;
    _vx;
    _rotate = 0;
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
    _vy;
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
  var PixieEngineCreator = class {
    gameDependencies;
    idToEngineSprite = {};
    constructor(gameDependencies) {
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
  var GenericRenderSystem = class extends EntitySystem {
    creator;
    cameras;
    pixieGame;
    constructor(game2, entityId) {
      super(game2);
      const deps = this.game.gameDependencies;
      deps.checkDependency(deps.engineCreator);
      this.creator = deps.engineCreator;
      deps.checkDependency(deps.cameras);
      this.cameras = deps.cameras;
      game2.eventManager.addListener(36, (event) => {
        const newX = event.eventData.x;
        const newY = event.eventData.y;
        const entityId2 = event.eventData.entityId;
        const sprite = this.creator.createEngineSprite(entityId2.toString());
        sprite.x = this.cameras.transformX(newX);
        sprite.y = this.cameras.transformY(newY);
      });
      this.pixieGame = PixiGame.createSingleton(game2.gameDependencies);
    }
    oncePerLoop = (args) => {
      const first = args.entity;
      const tiles = first.getComponent("tile");
      this.pixieGame.renderTiles(tiles, this.cameras);
    };
    targetComponents;
    apply(args) {
    }
    applyEvents(entity, eventManager) {
    }
    static create(game2, entityId) {
      return new GenericRenderSystem(game2, entityId);
    }
  };
  function pixiGameBuilder(metadata22 = null) {
    const deps = new PixiDependencies();
    deps.imgMetaData = metadata22;
    deps.pixiGame = PixiGame.createSingleton(deps);
    deps.spriteManager = PixiSpriteManager.create(deps);
    deps.renderer = GenericRenderer.create();
    deps.cameras = GenericCameras.create();
    deps.engineCreator = PixieEngineCreator.create(deps);
    deps.eventManager = EventManager.create();
    deps.componentFactory = ComponentFactory.create(deps);
    deps.entityFactory = EntityFactory.create(deps);
    const game2 = Game.createCustom(deps);
    game2.registerComponent(GenericPositionComponent);
    game2.registerComponent(GenericAnimationComponent);
    game2.addSystem(GenericRenderSystem.create(game2));
    game2.addStarter(() => {
      setTimeout(() => deps.pixiGame.start(), 5e3);
    });
    game2.addStarter(() => {
      deps.pixiGame.app.ticker.add((delta) => {
        game2.step(delta * 15);
      });
    });
    return game2;
  }

  // src/components/gravity.ts
  var GravityComponent = class _GravityComponent extends Component {
    gravityY = 2;
    gravityX = 0;
    terminalVelocity = 20;
    constructor() {
      super("gravity");
    }
    setGravity(x, y) {
      this.gravityX = x;
      this.gravityY = y;
    }
    update(entity, args) {
      const position = entity.getComponent("position");
      const collisions = entity.targetedEvents.filter((e) => {
        return e.eventName === EventType.collision;
      });
      if (position.vy < this.terminalVelocity)
        position.vy += this.gravityY * args.delta;
      position.vx += this.gravityX * args.delta;
      collisions.forEach((collision) => {
        const collided = collision.eventData.getComponent("position");
        const dx = collided.x - position.x;
        const dy = collided.y - position.y;
        if (Math.abs(dx) < Math.abs(dy)) {
          position.vy = 0;
          if (dy > 0) {
            position.y = collided.y - collided.height + collided.vy;
          } else {
            position.y = collided.y + position.height + collided.vy;
          }
        } else {
          position.vx = 0;
          if (dx > 0) {
            position.x = collided.x - collided.width / 2 - position.width / 2;
          } else {
            position.x = collided.x + collided.width / 2 + position.width / 2;
          }
        }
      });
    }
    static create(game2, entityId) {
      return new _GravityComponent();
    }
  };

  // src/components/floor-component.ts
  var FloorComponent = class _FloorComponent extends Component {
    constructor() {
      super("floor");
    }
    update(entity, args) {
    }
    static create() {
      return new _FloorComponent();
    }
  };

  // src/builders/build-components.ts
  function buildComponents(game2) {
    game2.registerComponent(WasdComponent);
    game2.registerComponent(CropComponent);
    game2.registerComponent(ProjectileComponent);
    game2.registerComponent(FightComponent);
    game2.registerComponent(HealthComponent);
    game2.registerComponent(NeuralFightComponent);
    game2.registerComponent(InventoryComponent);
    game2.registerComponent(ParticleComponent);
    game2.registerComponent(PrimitiveComponent);
    game2.registerComponent(TransitionComponent);
    game2.registerComponent(TileComponent);
    game2.registerComponent(ClickableComponent);
    game2.registerComponent(PlaceItemComponent);
    game2.registerComponent(CropHarvesterComponent);
    game2.registerComponent(TextComponent);
    game2.registerComponent(WeaponComponent);
    game2.registerComponent(GravityComponent);
    game2.registerComponent(FloorComponent);
  }

  // src/entities/player-entity.ts
  var PlayerEntity = class {
    create(gameDependencies, entity) {
      var wasd = entity.addComponent("wasd");
      var animation = entity.addComponent("animation");
      var position = entity.addComponent("position");
      var gravity = entity.addComponent("gravity");
      position.width = 64 * 2;
      position.height = 64 * 2;
      return entity;
    }
  };

  // src/entities/floor-entity.ts
  var FloorEntity = class {
    create(gameDependencies, entity) {
      const position = entity.addComponent("position");
      const animation = entity.addComponent("animation");
      const floor = entity.addComponent("floor");
      animation.setSprite("jungleGreyTile");
      position.width = 64 * 2;
      position.height = 64 * 2;
      return entity;
    }
  };

  // src/builders/build-entities.ts
  function buildEntities(game2) {
    game2.registerEntity("first", new FirstEntity());
    game2.registerEntity("player", new PlayerEntity());
    game2.registerEntity("floor", new FloorEntity());
  }

  // src/systems/box-collision-system.ts
  var BoxCollisionSystem = class _BoxCollisionSystem extends EntitySystem {
    apply(args) {
    }
    oncePerLoop = (args) => {
      const entities = this.game.entities;
      for (let i = 0; i < entities.length; i++) {
        const entity1 = entities[i];
        const box1 = entity1.getComponent("position");
        for (let j = i + 1; j < entities.length; j++) {
          const entity2 = entities[j];
          const box2 = entity2.getComponent("position");
          if (this.checkCollision(box1, box2)) {
            entity1.emit(GameEvent.create(
              EventType.collision,
              entity2
            ));
            entity2.emit(GameEvent.create(
              EventType.collision,
              entity1
            ));
          }
        }
      }
    };
    checkCollision(box1, box2) {
      const halfWidth1 = box1.width / 2;
      const halfHeight1 = box1.height / 2;
      const halfWidth2 = box2.width / 2;
      const halfHeight2 = box2.height / 2;
      const dx = Math.abs(box1.x + box1.vx - (box2.x + box2.vx));
      const dy = Math.abs(box1.y + box1.vy - (box2.y + box2.vy));
      return dx < halfWidth1 + halfWidth2 && dy < halfHeight1 + halfHeight2;
    }
    applyEvents(entity, eventManager) {
    }
    static create(game2) {
      return new _BoxCollisionSystem(game2);
    }
  };

  // src/systems/accelerometer.ts
  async function requestAccessAsync(onDeviceOrientation, setError) {
    if (!DeviceOrientationEvent) {
      setError(new Error("Device orientation event is not supported by your browser"));
      return false;
    }
    const requester = "requestPermission";
    const hasRequester = DeviceOrientationEvent.hasOwnProperty(requester);
    const requesterIsFunc = hasRequester && typeof DeviceOrientationEvent[requester] === "function";
    if (hasRequester && requesterIsFunc) {
      let permission;
      try {
        permission = await DeviceOrientationEvent[requester]();
      } catch (err) {
        setError(err);
        return false;
      }
      if (permission !== "granted") {
        setError(new Error("Request to access the device orientation was rejected"));
        return false;
      }
    }
    window.addEventListener("deviceorientation", onDeviceOrientation);
    return true;
  }

  // src/systems/wasd-system.ts
  var WasdSystem = class _WasdSystem extends EntitySystem {
    rotation = {
      alpha: 0,
      beta: 0,
      gama: 0
    };
    jumpSpeed = -40;
    constructor(game2) {
      super(game2);
      game2.eventManager.addListener(EventType.touchStart, (e) => {
        this.move = true;
        this.touchStart.x = e.eventData.x;
        this.touchStart.y = e.eventData.y;
      });
      game2.eventManager.addListener(EventType.touchEnd, (e) => {
        this.move = false;
        this.stop = true;
        this.touchEndEvents.push(e.eventData);
      });
      game2.eventManager.addListener(EventType.touchMove, (e) => {
        this.touchCurrent.x = e.eventData.x;
        this.touchCurrent.y = e.eventData.y;
      });
      const d = document.getElementById("t");
      requestAccessAsync((e) => {
        this.rotation.alpha = e.alpha;
        this.rotation.beta = e.beta;
        this.rotation.gama = e.gamma;
        if (d == null)
          return;
        d.innerHTML = e.alpha + "<br/>" + e.beta + "<br/>" + e.gamma;
      }, console.log);
    }
    move = false;
    stop = false;
    touchStart = { x: 0, y: 0 };
    touchCurrent = { x: 0, y: 0 };
    touchEndEvents = [];
    swipeThreshold = 64;
    static create(game2) {
      var wasd = new _WasdSystem(game2);
      return wasd;
    }
    oncePerLoop = (args) => {
    };
    apply(args) {
      const entity = args.entity;
      const position = entity.getComponent("position", true);
      const ac = entity.getComponent("animation", true);
      const wasd = entity.getComponent("wasd", true);
      if (position == null)
        return;
      if (wasd == null)
        return;
      this.controlTiltToMove(position, entity);
      ac.setSprite(wasd.walkSprite);
    }
    controlTiltToMove(position, entity) {
      const direction = this.rotation?.gama;
      const percentMaxSpeed = (direction ?? 0) / 80;
      position.vx = 25 * percentMaxSpeed;
      position.faceRight = position.vx >= 0;
      while (this.touchEndEvents.length > 0) {
        const end = this.touchEndEvents.pop();
        this.jump(entity, position);
      }
    }
    controlTapToMove(position, entity) {
      while (this.touchEndEvents.length > 0) {
        const end = this.touchEndEvents.pop();
        if (end === void 0)
          break;
        const swipedX = Math.abs(end.x - this.touchStart.x) > this.swipeThreshold;
        const swipedy = Math.abs(end.y - this.touchStart.y) > this.swipeThreshold;
        if (!swipedX) {
          position.vx *= -1;
          if (position.vx > 0) {
            position.faceRight = true;
          } else if (position.vx < 0) {
            position.faceRight = false;
          } else if (position.vx === 0) {
            position.vx = 10;
          }
        } else {
          position.vx = 0;
        }
        if (swipedy && end.y < this.touchStart.y) {
          this.jump(entity, position);
        }
      }
    }
    controlSwipeToMoveJump(position, entity) {
      while (this.touchEndEvents.length > 0) {
        const end = this.touchEndEvents.pop();
        if (end === void 0)
          break;
        const swipedX = Math.abs(end.x - this.touchStart.x) > this.swipeThreshold;
        const swipedy = Math.abs(end.y - this.touchStart.y) > this.swipeThreshold;
        if (swipedX) {
          if (this.touchCurrent.x > this.touchStart.x) {
            position.vx = 10;
            position.faceRight = true;
          } else {
            position.vx = -10;
            position.faceRight = false;
          }
        } else {
          position.vx = 0;
        }
        if (swipedy && end.y < this.touchStart.y) {
          if (entity.targetedEvents.length !== 0) {
            position.vy = -40;
          }
        }
      }
    }
    jump(entity, position) {
      if (entity.targetedEvents.length !== 0) {
        position.vy = this.jumpSpeed;
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
      var speed = 15;
      var sprite = wasdComponent.sprite;
      var walkSprite = wasdComponent.walkSprite;
      if (events.length > 0) {
      }
      for (var i = 0; i < events.length; i++) {
        event = events[i];
        switch (event.eventName) {
          case EventType.wDown:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(walkSprite);
            break;
          case EventType.wUp:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            if (entity.targetedEvents.length === 0)
              break;
            position.vy = -40;
            break;
          case EventType.aDown:
            if (wasdComponent.dashing)
              break;
            position.faceRight = false;
            animation.setSprite(walkSprite);
            position.vx = -speed;
            break;
          case EventType.aUp:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vx = 0;
            break;
          case EventType.sDown:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(walkSprite);
            position.vy = speed;
            break;
          case EventType.sUp:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vy = 0;
            break;
          case EventType.dDown:
            if (wasdComponent.dashing)
              break;
            position.faceRight = true;
            animation.setSprite(walkSprite);
            position.vx = speed;
            break;
          case EventType.dUp:
            if (wasdComponent.dashing)
              break;
            animation.setSprite(sprite);
            position.vx = 0;
            break;
          case EventType.spaceUp:
            break;
          case EventType.fUp:
            let cropHarvester;
            cropHarvester = entity.getComponent("cropHarvester", true);
            cropHarvester.startHarvest();
            break;
          case EventType.pUp:
            const weapon = entity.getComponent("weapon");
            if (weapon.rotationSpeed == 0) {
              weapon.spin();
            } else {
              weapon.sheatheBack();
            }
            break;
          case EventType.iUp:
            let inventory;
            inventory = entity.getComponent("inventory", true);
            inventory.inventoryToString();
            break;
          case EventType.jUp:
            var ge = GameEvent.create(EventType.fireProjectile);
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
    }
  };

  // src/systems/floor-system/floor-challenge.ts
  var FloorChallenge = /* @__PURE__ */ ((FloorChallenge2) => {
    FloorChallenge2[FloorChallenge2["randomSteps"] = 0] = "randomSteps";
    FloorChallenge2[FloorChallenge2["closeBarriers"] = 1] = "closeBarriers";
    FloorChallenge2[FloorChallenge2["challengeDone"] = 2] = "challengeDone";
    return FloorChallenge2;
  })(FloorChallenge || {});

  // src/systems/floor-system/randomenum.ts
  function randomEnum(anEnum) {
    const enumValues = Object.keys(anEnum).map((n) => Number.parseInt(n)).filter((n) => !Number.isNaN(n));
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  // src/systems/floor-system/floor-system.ts
  var FloorSystem = class _FloorSystem extends EntitySystem {
    timer = 0;
    timeBetweenFloors = 45;
    floorsMade = 0;
    floorLevel = 0;
    // increase when floor is made or when a barrier is placed
    maxSpeed = -5;
    floors = [];
    floorWidth = 64 * 2;
    currentChallenge = 0 /* randomSteps */;
    // currentChallengeFunc: ()=>FloorChallenge = this.randomFloorChallengeGen();
    currentChallengeFunc = this.closeBarriersChallenge();
    speed = 0;
    apply(args) {
      const entity = args.entity;
      const ac = entity.getComponent("animation", true);
      if (ac == null)
        return;
      if (ac.spriteName !== "jungleGreyTile")
        return;
      entity.targetedEvents.forEach((event) => {
        if (event.eventName === EventType.collision) {
          ac.setSprite("jungleBrownTile");
        }
      });
    }
    applyEvents(entity, eventManager) {
      if (entity.targetedEvents.length === 0)
        return;
    }
    oncePerLoop = (args) => {
      this.timer++;
      this.speed = -5 - 0.4 * this.floorLevel;
      this.speed = Math.abs(this.speed) > Math.abs(this.maxSpeed) ? this.maxSpeed : this.speed;
      this.timeBetweenFloors = Math.abs(this.floorWidth * 2.5 / this.speed);
      let newChallenge = this.currentChallengeFunc();
      if (newChallenge === 2 /* challengeDone */) {
        this.timer = 0;
        this.currentChallenge = randomEnum(FloorChallenge);
        this.currentChallengeFunc = () => 2 /* challengeDone */;
        console.log("next challenge", this.currentChallenge.toString());
        switch (this.currentChallenge) {
          case 0 /* randomSteps */:
            this.currentChallengeFunc = this.randomFloorChallengeGen();
            break;
          case 1 /* closeBarriers */:
            this.currentChallengeFunc = this.closeBarriersChallenge();
            break;
        }
      }
      this.floors.forEach((floor) => {
        floor.getComponent("position").vy = this.speed;
      });
      this.checkLost();
    };
    checkJumpable(x) {
    }
    closeBarriersChallenge() {
      let floorsMade = 0;
      return () => {
        if (this.timer % this.timeBetweenFloors !== 0)
          return 1 /* closeBarriers */;
        if (this.floorsMade > 10)
          return 2 /* challengeDone */;
        this.placeBarrier(this.speed, 2);
        floorsMade++;
        return 1 /* closeBarriers */;
      };
    }
    randomFloorChallengeGen() {
      let floorsMade = 0;
      return () => {
        if (this.timer % this.timeBetweenFloors !== 0)
          return 0 /* randomSteps */;
        if (floorsMade > 10)
          return 2 /* challengeDone */;
        const height = window.innerHeight;
        const x = window.innerWidth * Math.random();
        this.placeFloor(x, height + this.floorWidth, this.speed);
        floorsMade++;
        return 0 /* randomSteps */;
      };
    }
    checkLost() {
      const py = this.game.getById(1).getComponent("position").y;
      if (py < 0 || py > window.innerHeight) {
        this.floorsMade = 0;
        this.floorLevel = 0;
        this.timer = 0;
        startGame(this.game);
      }
    }
    placeBarrier(vy, holeSize = 2) {
      const numFloors = Math.floor(window.innerWidth / this.floorWidth) + 1;
      const floorToSkip = Math.floor(Math.random() * (numFloors - holeSize + 1));
      Array.from(Array(numFloors).keys()).forEach((i) => {
        if (i >= floorToSkip && i - floorToSkip < holeSize)
          return;
        this.placeFloor(i * this.floorWidth + this.floorWidth / 2, window.innerHeight + this.floorWidth, vy);
      });
      this.floorLevel += 1;
      return floorToSkip;
    }
    placeFloor(x, y, vy = -1) {
      const floor = this.game.addEntity("floor");
      const pos = floor.getComponent("position");
      pos.x = x;
      pos.y = y;
      pos.vy = vy;
      this.floors.push(floor);
      this.floorsMade++;
      return floor;
    }
    static create(game2) {
      return new _FloorSystem(game2);
    }
  };

  // src/builders/build-systems.ts
  function buildSystems(game2) {
    game2.addSystem(BoxCollisionSystem.create(game2));
    game2.addSystem(FloorSystem.create(game2));
    game2.addSystem(WasdSystem.create(game2));
  }

  // src/builders/build-sprites.ts
  function buildSprites(sm) {
    sm.loadSprite("jungleGreyTiles", "opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_ground_grey.png", 6, 6);
    sm.addAnimation("jungleGreyTiles", "jungleGreyTile", [7]);
    sm.loadSprite("jungleBrownTiles", "opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_ground_brown.png", 6, 6);
    sm.addAnimation("jungleBrownTiles", "jungleBrownTile", [7]);
    let cn = 24 * 8 + 18;
    sm.addAnimation("scrops", "corn", [cn]);
    sm.loadSprite("victorian", "victoriansprites.png", 12, 8);
    sm.addAnimation("victorian", "bluecloak", [24]);
    sm.addAnimation("victorian", "bluecloakwalk", [24, 25, 26, 25], 5);
    cn = 12 * 6;
    sm.addAnimation("victorian", "grey", [cn], 5);
    sm.addAnimation("victorian", "greyWalk", [cn, cn + 1, cn + 2, cn + 1], 5);
  }

  // src/builders/builder.ts
  function build(game2) {
    buildSprites(game2.spriteManager);
    buildEntities(game2);
    buildComponents(game2);
    buildSystems(game2);
    return game2;
  }

  // src/metadata.ts
  var metadata2 = { "sprites/victoriansprites.png": { "height": 384, "width": 384, "type": "png" }, "sprites/opp1_jungle_tiles/db32.png": { "height": 32, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/mockups/temple01.png": { "height": 320, "width": 800, "type": "png" }, "sprites/opp1_jungle_tiles/mockups/jungle03.png": { "height": 320, "width": 800, "type": "png" }, "sprites/opp1_jungle_tiles/mockups/jungle02.png": { "height": 320, "width": 800, "type": "png" }, "sprites/opp1_jungle_tiles/mockups/jungle01.png": { "height": 320, "width": 800, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_str_front_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_str_complete_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_str_back_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope3_complete_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope2_front_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope2_complete_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope2_back_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope1_front_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope1_complete_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/misc/spr_obj_cart_slope1_back_anim.gif": { "height": 48, "width": 48, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_m_unko.png": { "height": 48, "width": 32, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_f_traveler_walk_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_f_traveler_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_f_sara.png": { "height": 64, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_f_ayla.png": { "height": 80, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/spr_f_archeologist_idle_anim.gif": { "height": 57, "width": 43, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_stonegolem.png": { "height": 80, "width": 176, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_skeleton_walk_anim.gif": { "height": 72, "width": 74, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_robot_short02_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_robot_short01_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_robot_heavy01_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/creatures/spr_ape_yeti.png": { "height": 80, "width": 80, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_wasp_idle_anim.gif": { "height": 96, "width": 96, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_ram.png": { "height": 64, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_monkey_hanging.png": { "height": 144, "width": 48, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_leafbug_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_leafbug_alert_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_dog_small.png": { "height": 32, "width": 32, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_dog_medium.png": { "height": 64, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/spr_dog.png": { "height": 72, "width": 102, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/guide_jungle_vines.png": { "height": 480, "width": 960, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/guide_jungle.png": { "height": 928, "width": 768, "type": "png" }, "sprites/opp1_jungle_tiles/environment/objects/obj_carniplant_attack_anim.gif": { "height": 96, "width": 128, "type": "gif" }, "sprites/opp1_jungle_tiles/environment/objects/obj_carniplant.png": { "height": 96, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg_solid_colors.png": { "height": 128, "width": 256, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_tall03_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_tall02_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_tall01_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_short02_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_short01_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_girl04_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_girl03_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_girl02_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_girl01_idle_anim.gif": { "height": 96, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_child02_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_village_npc_child01_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_m_pjnerd2.png": { "height": 67, "width": 38, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_m_pjnerd.png": { "height": 64, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_m_old_idle_anim.gif": { "height": 58, "width": 42, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/villagers/spr_f_old_idle_anim.gif": { "height": 62, "width": 44, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_walk_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_slide_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_run_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_look_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_jump_complete_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_jump_4land_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_jump_3down_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_jump_2midair_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_jump_1up_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/traveler/spr_m_traveler_duck_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_m_native_tallface.png": { "height": 80, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_m_native_hero_run_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_m_native_hero_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_f_native_walk_anim.gif": { "height": 58, "width": 31, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_f_native_longhair_walk_anim.gif": { "height": 58, "width": 31, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/native/spr_f_native_longhair_idle_anim.gif": { "height": 58, "width": 31, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_tall_talking_anim.png": { "height": 80, "width": 381, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_spear.png": { "height": 80, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_small_talking_anim.png": { "height": 80, "width": 382, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_kid.png": { "height": 64, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_fat.png": { "height": 80, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_earwarmer.png": { "height": 64, "width": 32, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_m_arctic_brute.png": { "height": 80, "width": 96, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_f_arctic_old.png": { "height": 80, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/humans/arctic/spr_f_arctic_lisa.png": { "height": 80, "width": 32, "type": "png" }, "sprites/opp1_jungle_tiles/sprites/animals/toucan/spr_toucan_up_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/toucan/spr_toucan_squawk_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/toucan/spr_toucan_hop_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/toucan/spr_toucan_fly_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/toucan/spr_toucan_down_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_r_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_r_attack_anim.gif": { "height": 64, "width": 128, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_jump_4land_anim.gif": { "height": 39, "width": 72, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_jump_3down.gif": { "height": 24, "width": 42, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_jump_2up.gif": { "height": 31, "width": 40, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_jump_1launch_anim.gif": { "height": 65, "width": 68, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_g_attack_anim.gif": { "height": 64, "width": 128, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_b_idle_anim.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/spr_frog_b_attack_anim.gif": { "height": 64, "width": 128, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/frog_r_idle.gif": { "height": 64, "width": 64, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/Frog_r_attack_anim.gif": { "height": 64, "width": 128, "type": "gif" }, "sprites/opp1_jungle_tiles/sprites/animals/frog/frog_jump_complete_anim.gif": { "height": 128, "width": 287, "type": "gif" }, "sprites/opp1_jungle_tiles/environment/tiles/temple/tile_temple.png": { "height": 256, "width": 544, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_water.png": { "height": 128, "width": 160, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_wall_grey.png": { "height": 384, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_wall_brown.png": { "height": 384, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_vegetation.png": { "height": 32, "width": 256, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_tree_light.png": { "height": 352, "width": 320, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_tree_dark.png": { "height": 352, "width": 320, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_treelimb.png": { "height": 192, "width": 448, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_slopes_grey.png": { "height": 160, "width": 192, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_slopes_brown.png": { "height": 160, "width": 192, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_plants_objects.png": { "height": 416, "width": 512, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_ground_grey.png": { "height": 192, "width": 192, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_ground_brown.png": { "height": 192, "width": 192, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_bridge.png": { "height": 96, "width": 352, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_bottom_water.png": { "height": 128, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_bottom_grey.png": { "height": 128, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_bottom_brown.png": { "height": 128, "width": 128, "type": "png" }, "sprites/opp1_jungle_tiles/environment/tiles/jungle/tile_jungle_bg_vines.png": { "height": 544, "width": 416, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud8.png": { "height": 41, "width": 64, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud7.png": { "height": 43, "width": 54, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud6.png": { "height": 211, "width": 512, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud5.png": { "height": 118, "width": 190, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud4.png": { "height": 256, "width": 120, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud3.png": { "height": 51, "width": 76, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud2.png": { "height": 128, "width": 234, "type": "png" }, "sprites/opp1_jungle_tiles/environment/background/bg objects/bg_cloud01.png": { "height": 157, "width": 174, "type": "png" } };

  // src/game.ts
  var game = pixiGameBuilder(metadata2);
  window.game = game;
  build(game);
  function startGame(game2) {
    game2.entities.forEach((entity) => {
      if ([0, 1].includes(entity.id))
        return;
      const pos2 = entity.getComponent("position");
      pos2.y = -9999;
      game2.destroy(entity);
    });
    const cameraPosition = new PositionComponent();
    const mid = window.innerWidth / 2;
    const midy = window.innerHeight / 2;
    cameraPosition.x = mid;
    cameraPosition.y = midy;
    game2.gameDependencies.cameras.setMainCamera(cameraPosition);
    const first = game2.getById(0) ?? game2.addEntity("first");
    const tiles = first.getComponent("tile");
    tiles.removeTiles();
    const player = game2.getById(1) ?? game2.addEntity("player");
    const pos = player.getComponent("position");
    pos.x = 300;
    pos.y = 200;
    placeFloor(pos.x, pos.y + window.innerHeight / 4);
  }
  game.addStarter(startGame);
  game.spriteManager.onLoad(() => {
    game.start();
  });
  function placeFloor(x, y) {
    const floor = game.addEntity("floor");
    const pos = floor.getComponent("position");
    pos.x = x;
    pos.y = y;
    pos.vy = -1;
    return floor;
  }
})();
//# sourceMappingURL=game.mjs.map
