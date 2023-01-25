import { IPositionComponent } from "../component/components/position/iposition-component";
import { PositionComponent } from "../component/components/position/position-component";
import { ICameras } from "./icameras";

export class GenericCameras implements ICameras {
    center: IPositionComponent;
    setMainCamera(positionComponent: IPositionComponent): void {
        this.center = positionComponent;
    }
    public static create():GenericCameras{
        return new GenericCameras();
    }
}