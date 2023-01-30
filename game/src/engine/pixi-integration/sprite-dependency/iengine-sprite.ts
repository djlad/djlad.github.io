export interface IEngineSprite {
    width:number;
    height:number;
    faceRight:boolean;
    x:number;
    y:number;
    vx:number;
    vy:number;
    setSprite(animationName:string):void;

}