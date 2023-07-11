import { EntitySystem, Game, EventType, SystemArgs, GenericPositionComponent, WasdComponent, Entity, EventManager, GameEvent, PositionComponent, AnimationComponent, TransitionComponent, CropHarvesterComponent, WeaponComponent, InventoryComponent, GenericAnimationComponent } from "aiwar";

export class WasdSystem extends EntitySystem {
    constructor(game:Game){
        super(game);
        game.eventManager.addListener(EventType.touchStart, (e)=>{
            this.move = true;
            this.touchStart.x = e.eventData.x;
            this.touchStart.y = e.eventData.y
        });
        game.eventManager.addListener(EventType.touchEnd, (e)=>{
            this.move = false;
            this.stop = true;
            this.touchEndEvents.push(e.eventData);
        });
        game.eventManager.addListener(EventType.touchMove, (e)=>{
            this.touchCurrent.x = e.eventData.x;
            this.touchCurrent.y = e.eventData.y;
        });
    }
    private move:boolean = false;
    private stop:boolean = false;
    private touchStart:{x:number,y:number} = {x:0,y:0};
    private touchCurrent:{x:number,y:number} = {x:0,y:0};
    private touchEndEvents:{x:number, y:number}[] = [];
    private swipeThreshold: number = 64;
    static create(game:Game):WasdSystem{
        var wasd:WasdSystem = new WasdSystem(game);
        //eventManager.addListener(EventType.wDown, function(){console.log("w down")});
        return wasd;
    }

    apply(args:SystemArgs){
        const entity = args.entity;
        const position = <GenericPositionComponent>entity.getComponent("position", true);
        const ac = <GenericAnimationComponent>entity.getComponent("animation", true);
        const wasd = <WasdComponent>entity.getComponent("wasd", true);
        if (position == null) return;
        if (wasd == null) return;
        // this.controlTapToMove(position, entity);
        this.controlSwipeToMoveJump(position, entity);
        /*if (this.move){
            const swiped = Math.abs(this.touchCurrent.x - this.touchStart.x) > this.swipeThreshold;
            if (!swiped){
                position.vx = 0;
            }
            else if (this.touchCurrent.x > this.touchStart.x){
                position.vx = 10;
                position.faceRight = true;
            }
            else if (this.touchCurrent.x < this.touchStart.x){
                position.vx = -10;
                position.faceRight = false;
            }
        }*/
        ac.setSprite(wasd.walkSprite);
    }

    controlTapToMove(position:GenericPositionComponent, entity:Entity){
        while(this.touchEndEvents.length > 0){
            const end = this.touchEndEvents.pop();
            if (end === undefined) break;
            const swipedX = Math.abs(end.x - this.touchStart.x) > this.swipeThreshold;
            const swipedy = Math.abs(end.y - this.touchStart.y) > this.swipeThreshold;
            if (!swipedX) {
                    position.vx *= -1;
                    if (position.vx > 0){
                        position.faceRight = true;
                    } else if (position.vx < 0){
                        position.faceRight = false;
                    } else if (position.vx === 0) {
                        position.vx = 10;
                    }
            } else {
                position.vx = 0;
            }
            if (swipedy && end.y < this.touchStart.y) {
                if (entity.targetedEvents.length !== 0){
                    position.vy = -40;
                }
            }
        }
    }

    controlSwipeToMoveJump(position:GenericPositionComponent, entity:Entity){
        while(this.touchEndEvents.length > 0){
            const end = this.touchEndEvents.pop();
            if (end === undefined) break;
            const swipedX = Math.abs(end.x - this.touchStart.x) > this.swipeThreshold;
            const swipedy = Math.abs(end.y - this.touchStart.y) > this.swipeThreshold;
            if (swipedX) {
                if (this.touchCurrent.x > this.touchStart.x){
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
                if (entity.targetedEvents.length !== 0){
                    position.vy = -40;
                }
            }
        }
    }

    applyEvents(entity:Entity, eventManager:EventManager){
        var events:GameEvent[] = eventManager.events;
        var event:GameEvent;
        var wasdComponent:WasdComponent= <WasdComponent>entity.getComponent("wasd", true);
        if (wasdComponent == null)return;
        var position:PositionComponent = <PositionComponent>entity.getComponent("position");
        var animation:AnimationComponent = <AnimationComponent>entity.getComponent("animation");
        var transition:TransitionComponent = <TransitionComponent>entity.getComponent("transition");
        
        var speed:number = 15;//wasdComponent.speed;
        var sprite:string = wasdComponent.sprite;
        var walkSprite:string = wasdComponent.walkSprite;
        if (events.length > 0){
            //console.log(events)
        }
        for (var i=0;i<events.length;i++){
            event = events[i];
            //console.log(event)
            // console.log(event.eventName);
            switch(event.eventName){
                case EventType.wDown:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(walkSprite);
                    // position.vy = -speed;
                break;
                case EventType.wUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    if (entity.targetedEvents.length === 0)break
                    position.vy = -40;
                break;
                case EventType.aDown:
                    if (wasdComponent.dashing)break;
                    position.faceRight = false;
                    animation.setSprite(walkSprite);
                    position.vx = -speed;
                break;
                case EventType.aUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.sDown:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(walkSprite);
                    position.vy = speed;
                break;
                case EventType.sUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vy = 0;
                break;
                case EventType.dDown:
                    if (wasdComponent.dashing)break;
                    position.faceRight = true;
                    animation.setSprite(walkSprite);
                    position.vx = speed;
                break;
                case EventType.dUp:
                    if (wasdComponent.dashing)break;
                    animation.setSprite(sprite);
                    position.vx = 0;
                break;
                case EventType.spaceUp:
                    // this.dash(wasdComponent, position, animation, transition);
                break;
                case EventType.fUp:
                    let cropHarvester:CropHarvesterComponent;
                    cropHarvester = <CropHarvesterComponent>entity.getComponent("cropHarvester", true);
                    cropHarvester.startHarvest();
                break;
                case EventType.pUp:
                    //console.log("p up")
                    const weapon = <WeaponComponent>entity.getComponent("weapon");
                    if (weapon.rotationSpeed == 0){
                        weapon.spin();
                    } else {
                        weapon.sheatheBack();
                    }
                break;
                case EventType.iUp:
                    let inventory:InventoryComponent;
                    inventory = <InventoryComponent>entity.getComponent("inventory", true);
                    inventory.inventoryToString();
                break;
                case EventType.jUp:
                    var ge:GameEvent = GameEvent.create(EventType.fireProjectile);
                    entity.emit(ge);
                break;
            }
        }
        this.updateDashing(entity, wasdComponent, position, animation, transition);
    }
    private updateDashing(entity: Entity, wasdComponent: WasdComponent, position: PositionComponent, animation: AnimationComponent, transition: TransitionComponent){
        if (!wasdComponent.dashing)return;
        if (wasdComponent.dashingTime == Math.floor(wasdComponent.maxDashingTime/2)){
            transition.start(wasdComponent.dashSprite, wasdComponent.dashSpriteNumber, false);
        }
        if (wasdComponent.dashingTime == 0){
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
    private dash(wasdComponent:WasdComponent, position:PositionComponent, animation:AnimationComponent, transition:TransitionComponent){
        if(wasdComponent.dashing)return;
        wasdComponent.startDashing();
        wasdComponent.dashWidth = position.width;
        wasdComponent.dashHeight = position.height;
        wasdComponent.dashSprite = animation.animationName;
        wasdComponent.dashSpriteNumber = animation.getSpriteNumber();
        // transition.start(null, 32);
    }
}