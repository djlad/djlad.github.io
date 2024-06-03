export interface IEngineSprite {
    width: number;
    height: number;
    faceRight: boolean;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotate: number;
    pivotX: number;
    pivotY: number;
    anchorX: number;
    anchorY: number;
    setSprite(animationName: string): void;
}
