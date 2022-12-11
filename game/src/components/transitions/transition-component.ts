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
    targetSpriteNumber: number = 0;
    target: ImageData;
    running: boolean = false;
    speed: number = 15;
    update(entity: Entity): void {
        if (!this.running) return;
        let animation = <AnimationComponent>entity.getComponent("animation", true);
        if (animation == null) return;
        this.reference = animation.getRGBs();
        this.target = animation.getRGBs(this.targetAnimationName, this.targetSpriteNumber, this.reference.width, this.reference.height);
        if (this.targetAnimationName == null){
            let newTarget = new ImageData(this.reference.width, this.reference.height);
            for (let i=0;i<this.target.data.length;i++){
                newTarget.data[i] = 0;
            }
            this.target = newTarget;
        }
        if (this.current == null){
            // check if sprites are loaded length == 4 means it's a place holder of 1 pixel
            if (this.reference.data.length == 4 || this.target.data.length == 4) return;
            this.current = new ImageData(this.reference.width, this.reference.height);
            for(let i=0;i<this.reference.data.length;i++){
                this.current.data[i] = this.reference.data[i];
            }
        }
        let noChanges = true;
        for(let i=0;i<this.reference.data.length;i++){
            let target = this.target.data[i];
            if (this.current.data[i] < target){
                this.current.data[i] += this.speed;
            } else if (this.current.data[i] > target){
                this.current.data[i] -= this.speed;
            }
            let distance = Math.abs(this.current.data[i] - target);
            if (distance < this.speed){
                this.current.data[i] = target;
            } else {
                noChanges = false;
            }
        }
        animation.setFilter(this.current);
        if (noChanges){
            animation.isFiltered = false;
            this.running = false;
        }
    }
    public start(targetAnimationName:string = "fireball", targetSpriteNumber:number, resetCurrent:boolean=true):void{
        this.running = true;
        this.time = 300;
        this.targetAnimationName = targetAnimationName;
        if (resetCurrent) this.current = null;
        this.targetSpriteNumber = targetSpriteNumber;
    }
    public static create(): TransitionComponent{
        return new TransitionComponent();
    }
}