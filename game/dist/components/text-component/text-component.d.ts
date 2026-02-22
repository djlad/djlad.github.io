import { Component } from "../../engine/component/component";
import { TextPlacement } from "./text-placement";
export declare class TextComponent extends Component {
    constructor();
    textPlacements: TextPlacement[];
    addTextPlacement(text: string, offsetX?: number, offsetY?: number): void;
    setText(value: string, index?: number): void;
    update(): void;
    static create(): TextComponent;
}
