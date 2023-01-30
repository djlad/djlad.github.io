import { IPositionComponent } from "../component/components/position/iposition-component";

export interface ICameras {
    center:IPositionComponent;
    setMainCamera(positionComponent: IPositionComponent):void;
}