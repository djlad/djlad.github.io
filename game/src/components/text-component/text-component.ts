import { Component } from "../../engine/component/component";
import { TextPlacement } from "./text-placement";

export class TextComponent extends Component {
    constructor(){
        super("text");
    }
    textPlacements:TextPlacement[]=[];
    addTextPlacement(text:string, offsetX:number=0, offsetY:number=0){
        this.textPlacements.push(new TextPlacement(text, offsetX, offsetY));
    }

    setText(value:string, index:number=0){
        if(index >= 0 && index < this.textPlacements.length){
            this.textPlacements[index].textValue = value;
        }
    }

    update(){}
    static create(){
        return new TextComponent();
    }
}