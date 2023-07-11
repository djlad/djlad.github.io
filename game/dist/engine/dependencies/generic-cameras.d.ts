import { IPositionComponent } from "../component/components/position/iposition-component";
import { ICameras } from "./icameras";
export declare class GenericCameras implements ICameras {
    center: IPositionComponent;
    halfWindowWidth: number;
    halfWindowHeight: number;
    private getOffsetX;
    private getOffsetY;
    transformX(x: number): number;
    transformY(y: number): number;
    untransformX(x: number): number;
    untransformY(y: number): number;
    setMainCamera(positionComponent: IPositionComponent): void;
    static create(): GenericCameras;
}
