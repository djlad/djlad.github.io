import { Component, Entity, EntityUpdateArgs, EventType, GameDependencies, GenericPositionComponent } from "aiwar";

export class GravityComponent extends Component {
    private gravityY: number = 2;
    private gravityX: number = 0;
    private terminalVelocity: number = 20;
    constructor() {
        super("gravity");
    }
    setGravity(x:number,y:number){
        this.gravityX = x;
        this.gravityY = y;
    }
    update(entity: Entity, args: EntityUpdateArgs): void {
        const position = <GenericPositionComponent>entity.getComponent("position");
        const collisions = entity.targetedEvents.filter(e=>{
            return e.eventName === EventType.collision;
        });
        if(position.vy < this.terminalVelocity)position.vy += this.gravityY * args.delta;
        position.vx += this.gravityX * args.delta;
        collisions.forEach(collision=>{
            const collided = <GenericPositionComponent>collision.eventData.getComponent("position");
            const dx = collided.x - position.x;
            const dy = collided.y - position.y;
            if (Math.abs(dx) < Math.abs(dy)) {
                position.vy = 0;
                if (dy > 0) {// collided is below
                    position.y = collided.y - collided.height + collided.vy;
                } else {
                    position.y = collided.y + position.height + collided.vy;
                }
            } else {
                position.vx = 0;
                if (dx > 0) {// collided is to the right
                    position.x = collided.x - collided.width/2 - position.width/2;
                } else {
                    position.x = collided.x + collided.width/2 + position.width/2;
                }
            }
        });

    }
    static create(game: GameDependencies, entityId: string){
        return new GravityComponent();
    }
}