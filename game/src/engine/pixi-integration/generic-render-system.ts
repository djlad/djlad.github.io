import { FirstEntity } from "../../entities/first-entity";
import { Entity } from "../entity/entity";
import { Game } from "../game";
import { Renderer } from "../renderers/render";
import { RenderOptions } from "../renderers/render-options";
import { SpriteManager } from "../renderers/sprite-manager";
import { SystemArgs } from "../system/system-args";

export class GenericRenderSystem implements Renderer{
    constructor(){}
    offset: number[];
    spriteFilter(filter: ImageData, x: number, y: number, width: number, height: number, spriteNumber: number, options: RenderOptions): void {
    }
    cbox(): void {
    }
    getOffset(): number[] {
        return [0,0];
    }
    setOffset(offset: number[]): void {
    }
    sprite(spriteName: string, x: number, y: number, width: number, height: number, spriteNumber: number, options: RenderOptions): void {
    }
    text(text: string, x: number, y: number, size: number): void {
    }
    circle(x: number, y: number, r: number): void {
    }
    line(x1: number, y1: number, x2: number, y2: number): void {
    }
    spriteManager: SpriteManager;
    static create():GenericRenderSystem{
        return new GenericRenderSystem();
    }
}