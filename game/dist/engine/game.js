define(["require", "exports", "./entity/entity-factory", "./events/event-manager", "./renderers/implementations/html/html-renderer", "./system/system-args", "./entity/entity-update-args", "./dependencies/game-dependencies", "./component/component-factory", "./dependencies/generic-cameras"], function (require, exports, entity_factory_1, event_manager_1, html_renderer_1, system_args_1, entity_update_args_1, game_dependencies_1, component_factory_1, generic_cameras_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    class Game {
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
            const renderer = html_renderer_1.HtmlRenderer.create();
            const deps = new game_dependencies_1.GameDependencies();
            deps.renderer = renderer;
            deps.eventManager = event_manager_1.EventManager.create();
            deps.componentFactory = component_factory_1.ComponentFactory.create(deps);
            deps.entityFactory = entity_factory_1.EntityFactory.create(deps);
            deps.spriteManager = deps.renderer.spriteManager;
            deps.cameras = generic_cameras_1.GenericCameras.create();
            var game = new Game(deps.entityFactory, deps.renderer, event_manager_1.EventManager.create(), deps);
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
            for (let i = 0; i < this.systemsWithOncePerTurnUpdate.length; i++) {
                const args = new system_args_1.SystemArgs();
                args.entity = this.entities[0];
                args.eventManager = this.eventManager;
                args.fullFramesPassed = framesPassed;
                this.systemsWithOncePerTurnUpdate[i].oncePerLoop(args);
            }
            for (var i = 0; i < this.entities.length; i++) {
                const args = new entity_update_args_1.EntityUpdateArgs();
                args.delta = delta;
                args.fullFramePassed = framesPassed;
                this.entities[i].update(args);
                const args2 = new system_args_1.SystemArgs();
                args2.entity = this.entities[i];
                args2.eventManager = this.eventManager;
                args2.fullFramesPassed = framesPassed;
                this.entities[i].applySystems(args2);
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
            this.renderer.text(Math.floor(this.frameTime).toString(), 0, 0, 1000);
            this.counter = (this.counter + 1) % 100;
        }
        step(delta) {
            this.newTime = performance.now();
            this.performance = performance.now();
            delta = delta / (1000 / this.targetFps);
            this.frameTracker += delta;
            if (this.frameTracker > 1) {
                this.update(delta, Math.floor(this.frameTracker));
                this.frameTracker = 0;
            }
            else {
                this.update(delta, 0);
            }
            this.frameTime = performance.now() - this.performance;
        }
        loop(time) {
            const delta = (time - this.lastTime) / (1000 / this.targetFps);
            this.step(delta);
            this.lastTime = time;
            window.requestAnimationFrame((time) => { this.loop(time); });
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
            this.systems.forEach((system) => {
                if (system.shouldApply(entity)) {
                    entity.addApplicableSystem(system);
                }
            });
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
    }
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map