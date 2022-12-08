import { HtmlCanvas } from "./html-canvas";

export class HtmlSprite implements Sprite {
    constructor(fileName:string){
        var spriteImg:HTMLImageElement = new Image();
        spriteImg.src = this.spriteDir + fileName;
        this.sprite = spriteImg;
        spriteImg.onload = this.setFrameDimensions(this);
        this.ctx = HtmlCanvas.createSingleton().ctx;
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
            sprite.ctx.fillRect(0, 0, 400,400);
            let dy = 0;
            for (let i1=0;i1<frames.length;i1++){
                let frame = frames[i1+1];
                for(let i=0;i<frame.length;i++){
                    let frameIndex = frame[i+1];
                    pixelData.data[frameIndex*4] = 255
                    pixelData.data[frameIndex*4+2] = 0
                }
                frame = frames[i1];
                for(let i=0;i<frame.length;i++){
                    let frameIndex = frame[i];
                    pixelData.data[frameIndex*4] = 0
                    // pixelData.data[frameIndex*4+1] = 0
                    // pixelData.data[frameIndex*4+2] = 0
                }
                if (i1%6 == 5)dy+=pixelData.height;
                // sprite.ctx.putImageData(pixelData, 0, 0);
                sprite.ctx.putImageData(pixelData, 0+i1*pixelData.width%(pixelData.width*6), 0+i1+dy);
            }
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