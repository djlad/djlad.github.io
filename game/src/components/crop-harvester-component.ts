import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";

export class CropHarvesterComponent extends Component{
    harvesting:boolean = false;
    private harvestTime:number = 0;
    private timeItTakesToHarvest:number = 10;

    public startHarvest():void {
        this.harvesting = true;
        this.harvestTime = this.timeItTakesToHarvest;
    }

    update(entity: Entity): void {
        if (this.harvestTime > 0){
            this.harvestTime -= 1;
        } else {
            this.harvesting = false;
        }
    }

    static create():CropHarvesterComponent{
        return new CropHarvesterComponent("cropHarvester");
    }
}