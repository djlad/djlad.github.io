import { Component } from './component';
export class CropComponent extends Component {
    constructor(){
        super("crop");
        this.growthLengths = [5,5,5];
        this.growthStage = 0;
        this.cropName = "turnip"
        this.setCrop(this.cropName)
        this.setCrop("wheat");
    }
    //growth sprites for each stage
    growthSprites:string[];
    //index of current growthSprite in growthSprites
    //also index of growthLength in growth lengths
    growthStage:number;
    growthLengths:number[];
    timeSinceGrowth:number=0;
    cropName:string;
    
    setSprites(sprites:string[]){
        this.growthSprites = sprites;
        this.growthStage = 0;
    }

    isGrown():boolean{
        return this.growthStage == this.growthSprites.length-1;
    }

    setCrop(cropName:string){
        switch(cropName){
            case "turnip":
                this.growthSprites = ["turnip0", "turnip1", "turnip2"];
                this.growthLengths = [30, 30, 30];
                break;
            case "corn":
                this.growthSprites = ["corn0", "corn1", "corn2"];
                this.growthLengths = [30, 30, 30];
                break;
            case "wheat":
                this.growthSprites = ["wheat0", "wheat1", "wheat2"];
                this.growthLengths = [30, 30, 30];
                break;
        }
        this.growthStage = 0;
    }

    update(){
        if(this.isGrown()){
            return;
        }
        this.timeSinceGrowth++;
        var gs:number = this.growthStage;
        var gl:number = this.growthLengths[gs];
        if (this.timeSinceGrowth > gl){
            this.growthStage = (this.growthStage+1)%this.growthLengths.length;
            this.timeSinceGrowth = 0;
        }
    };

    static create():CropComponent{
        return new CropComponent();
    };
}