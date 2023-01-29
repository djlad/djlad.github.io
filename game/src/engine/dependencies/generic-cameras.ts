import { IPositionComponent } from "../component/components/position/iposition-component";
import { PositionComponent } from "../component/components/position/position-component";
import { GenericPositionComponent } from "../pixi-integration/pixi-components/generic-position-component";
import { ICameras } from "./icameras";

export class GenericCameras implements ICameras {
    center: IPositionComponent;
    halfWindowWidth:number = window.innerWidth/2;
    halfWindowHeight:number = window.innerHeight/2;
    transformX(x:number){
        return x - (this.center?.x??0) + this.halfWindowWidth;
    }
    transformY(y:number){
        return y - (this.center?.y??0) + this.halfWindowHeight;
    }
    setMainCamera(positionComponent: IPositionComponent): void {
        this.center = positionComponent;
    }
    public static create():GenericCameras{
        return new GenericCameras();
    }
}