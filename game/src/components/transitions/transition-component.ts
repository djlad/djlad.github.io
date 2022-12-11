import { Component } from "../../engine/component/component";
import { Entity } from "../../engine/entity/entity";
import {AnimationComponent} from "../animation-component";
export class TransitionComponent extends Component{
    constructor(){
        super("transition");
    }
    time: number=0;
    reference: ImageData = null;
    current: ImageData = null;
    targetAnimationName: string = "fireball";
    target: ImageData
    update(entity: Entity): void {
        let animation = <AnimationComponent>entity.getComponent("animation", true);
        if (animation == null) return;
        if (this.reference == null){
            this.reference = animation.getRGBs();
            this.target = animation.getRGBs(this.targetAnimationName, 32);
            this.current = new ImageData(this.reference.width, this.reference.height);
            for(let i=0;i<this.reference.data.length;i++){
                this.current.data[i] = this.reference.data[i];
            }
        }

        for(let i=0;i<this.reference.data.length;i++){
            // let ref = this.reference.data[i];
            let target = this.target.data[i];
            if (this.current.data[i] < target){
                this.current.data[i] += 1;
            } else if (this.current.data[i] > target){
                this.current.data[i] -= 1;
            }
        }
        animation.setFilter(this.current);
        // animation.setFilter(this.target);
        this.time = (this.time + 1)%255;
    }
    public static create(): TransitionComponent{
        return new TransitionComponent();
    }
}