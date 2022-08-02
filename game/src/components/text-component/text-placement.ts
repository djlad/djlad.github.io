export class TextPlacement{
    constructor(textValue:string, offsetX:number, offsetY:number){
        this.textValue = textValue;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    offsetX:number;
    offsetY:number;
    textValue:string;
}