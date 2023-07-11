export declare class SpriteAnimation {
    constructor(animationName: string, spriteName: string, spriteNumbers: number[], delay: number);
    spriteNumbers: number[];
    animationName: string;
    spriteName: string;
    delay: number;
    static create(animationName: string, spriteName: string, spriteNumbers: number[], delay?: number): SpriteAnimation;
}
