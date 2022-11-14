import { Component } from "../../component";
import { Entity } from "../../../entity/entity";
import { PositionComponent } from "../../../../components/position-component";
import { OperationCanceledException } from "../../../../../node_modules/typescript/lib/typescript";

export class EffectComponent extends Component
{
    targets: Entity[]=[]
    addTarget(targetEntity: Entity){
        let position = <PositionComponent>targetEntity.getComponent("position", true);
        if (position == null) throw "Effect Component target needs a position component";
        this.targets.push(targetEntity);
    }
    update(entity: Entity): void {
    }
}

enum EffectType{
    line
}