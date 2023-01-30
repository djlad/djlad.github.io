import { Scene } from "phaser";
export class MainScene extends Scene {
    constructor(){
        super({key:"main"})
    }
    private updater: (delta:number)=>void = ()=>{};
    private creators: ((scene:Scene)=>void)[] = [];
    private loaders: ((scene:Scene)=>void)[] = [];
    setUpdater(updateFunction:(delta:number)=>void){
        this.updater = updateFunction;
    }
    addCreator(creator:(scene:Phaser.Scene)=>void){
        this.creators.push(creator);
    }
    addPreloader(loader:(scene:Phaser.Scene)=>void){
        this.loaders.push(loader);
    }
    preload(){
        console.log("loading " + this.loaders.length);
        this.loaders.forEach((loader)=>{
            loader(this)}
        );
    }
    create(){
        console.log(`creating main scene with ${this.creators.length} creators`);
        this.creators.forEach((creator)=>{creator(this)});
    }
    update(time: number, delta: number): void {
        this.updater(delta);
    }
}