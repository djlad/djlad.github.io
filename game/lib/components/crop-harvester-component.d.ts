import { Component } from "../engine/component/component";
import { Entity } from "../engine/entity/entity";
export declare class CropHarvesterComponent extends Component {
    harvesting: boolean;
    private harvestTime;
    private timeItTakesToHarvest;
    startHarvest(): void;
    update(entity: Entity): void;
    static create(): CropHarvesterComponent;
}
