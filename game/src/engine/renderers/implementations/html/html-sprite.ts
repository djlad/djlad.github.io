import { HtmlCanvas } from "./html-canvas";

export class HtmlSprite implements Sprite {
    constructor(fileName:string){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        this.sprite = spriteImg;
        spriteImg.onload = this.setFrameDimensions(this);
        this.ctx = HtmlCanvas.createSingleton().ctx;
    }
    getRGBs(spriteNumber: number): ImageData {
        throw new Error("Method not implemented.");
    }
    spriteDir:string = "../sprites/";
    sprite:HTMLImageElement;
    ctx:CanvasRenderingContext2D;
    frameCoordsCalculated: number[][] = []
    
    drawImage(spriteNumber: number, x: number, y: number, width: number, height: number): void {
        let fc = this.frameCoords(spriteNumber);
        // this.ctx.drawImage(this.sprite, fc[0], fc[1], this.frameWidth,
                        //   this.frameHeight, x, y, width, height);
    }

    private setFrameDimensions(sprite:HtmlSprite){
        return function(){
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = sprite.sprite.width;
            canvas.height = sprite.sprite.height;
            context.drawImage(sprite.sprite, 0, 0 );
            let pixelData = context.getImageData(0, 0, sprite.sprite.width, sprite.sprite.height);
            let averages = []
            for(let i=0;i<pixelData.data.length;i+=4){
                let average = (pixelData.data[i] + pixelData.data[i+1] + pixelData.data[i+2] + pixelData.data[i+3])/3;
                averages.push(average);
            }
            let frames = sprite.findFrames(averages, pixelData.width, pixelData.height);
            frames.forEach(f => {
                f.sort();
                let highestY = Math.floor(f[0]/pixelData.width);
                let lowestY = Math.floor(f[f.length-1]/pixelData.width);
                let height = lowestY - highestY;
            });
        }
    }

    findFrames(averagedPixelData: number[], width: number, height:number): number[][]{
        let stack: number[] = [];
        let claimed = new Set();
        let results: number[][] = []
        for(let i=0;i<averagedPixelData.length;i++)
        {
            if (claimed.has(i)) continue;
            let average = averagedPixelData[i];
            if (average <= 0)continue;
            stack.push(i);
            let nextResult:number[] = [i];
            while (stack.length > 0){
                if (stack.length > 60000) break;
                let pixelIndex = stack.pop();
                let average = averagedPixelData[pixelIndex];
                if (pixelIndex >= averagedPixelData.length)continue;
                if (pixelIndex < 0)continue;
                if (average <= 0)continue;
                if (claimed.has(pixelIndex)) continue;
                claimed.add(pixelIndex);
                nextResult.push(pixelIndex);
                stack.push(pixelIndex + 1);
                stack.push(pixelIndex - 1);
                stack.push(pixelIndex + width);
                stack.push(pixelIndex - width);
            }
            results.push(nextResult);
        }
        return results;
    }

    public frameCoords(spriteNum:number){
        return this.frameCoordsCalculated[spriteNum];
    }
    public static create(fileName: string){
        return new HtmlSprite(fileName);
    }
}