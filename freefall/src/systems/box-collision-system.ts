import { Entity, EntitySystem, EventManager, EventType, Game, GameEvent, GenericPositionComponent, SystemArgs } from "aiwar";
import { textChangeRangeIsUnchanged } from "typescript";

export class BoxCollisionSystem extends EntitySystem {
    apply(args: SystemArgs): void {}
    oncePerLoop = (args: SystemArgs) => {
        
      const entities = this.game.entities;
      for (let i = 0; i < entities.length; i++) {
        const entity1 = entities[i];
        const box1 = <GenericPositionComponent>entity1.getComponent("position");
        for (let j = i + 1; j < entities.length; j++) {
          const entity2 = entities[j];
          const box2 = <GenericPositionComponent>entity2.getComponent("position");
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
    checkCollision(
        box1: GenericPositionComponent,
        box2: GenericPositionComponent
      ): boolean {
        const halfWidth1 = box1.width / 2;
        const halfHeight1 = box1.height / 2;
        const halfWidth2 = box2.width / 2;
        const halfHeight2 = box2.height / 2;
        const dx = Math.abs(box1.x+box1.vx - (box2.x + box2.vx));
        const dy = Math.abs(box1.y+box1.vy - (box2.y+box2.vy));
        return dx < halfWidth1 + halfWidth2 && dy < halfHeight1 + halfHeight2;
    }
    applyEvents(entity: Entity, eventManager: EventManager): void {
    }
    static create(game:Game) {
        return new BoxCollisionSystem(game);
    }
}