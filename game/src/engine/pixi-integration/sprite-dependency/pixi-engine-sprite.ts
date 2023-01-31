import { IEngineSprite } from "./iengine-sprite";
import { GameDependencies } from "../../dependencies/game-dependencies";
import { IEngineCreator } from "./iengine-creator";
import { PixieEngineCreator } from "./pixie-engine-creator";
import { PixiDependencies } from "../pixi-dependencies";
import { PixiGame } from "../pixi-game";
import { AnimatedSprite } from "pixi.js";

export class PixieEngineSprite implements IEngineSprite {
    pixieGame: PixiGame;
    sprite: AnimatedSprite;
    constructor(gameDependencies:PixiDependencies){
        gameDependencies.checkDependency(gameDependencies.pixiGame);
        this.pixieGame = gameDependencies.pixiGame;
        this.sprite = this.pixieGame.getSpriteAnimation("greyWalk");
        this.pivotX = .5;
        this.pivotY = 1;
        this.anchorX = .5;
        this.anchorY = 1;
    }
    private _width: number;
    private _height: number;
    private _faceRight: boolean;
    private _x: number;
    private _y: number;
    private _vx: number;
    private _rotate:number=0;

    public get rotate(){
        return this._rotate;
    }

    public set rotate(newRotate:number){
        this._rotate = newRotate;
        this.sprite.rotation = newRotate;
    }

    /**
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this.sprite.width;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this.sprite.height;
	}

    /**
     * Getter faceRight
     * @return {boolean}
     */
	public get faceRight(): boolean {
		return this._faceRight;
	}

    /**
     * Getter x
     * @return {number}
     */
	public get x(): number {
		return this.sprite.x;
	}

    /**
     * Getter y
     * @return {number}
     */
	public get y(): number {
		return this.sprite.y;
	}

    /**
     * Getter vx
     * @return {number}
     */
	public get vx(): number {
		return this._vx;
	}

    /**
     * Getter vy
     * @return {number}
     */
	public get vy(): number {
		return this._vy;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this.sprite.width = value;
	}

    /**
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
        this.sprite.height = value;
	}

    /**
     * Setter faceRight
     * @param {boolean} value
     */
	public set faceRight(value: boolean) {
        if (value != this._faceRight){
            if (value){
                this.sprite.scale.x = Math.abs(this.sprite.scale.x);
            } else {
                this.sprite.scale.x = Math.abs(this.sprite.scale.x) * -1;
            }
        }
		this._faceRight = value;
	}

    /**
     * Setter x
     * @param {number} value
     */
	public set x(value: number) {
        this.sprite.x = value;
	}

    /**
     * Setter y
     * @param {number} value
     */
	public set y(value: number) {
        this.sprite.y = value;
        this.sprite.zIndex = value;
	}

    /**
     * Setter vx
     * @param {number} value
     */
	public set vx(value: number) {
		this._vx = value;
	}

    /**
     * Setter vy
     * @param {number} value
     */
	public set vy(value: number) {
		this._vy = value;
	}
    private _vy: number;
    
    get pivotX(){
        return this.sprite.pivot.x;
    }
    get pivotY(){
        return this.sprite.pivot.y;
    }
    get anchorX(){
        return this.sprite.anchor.x;
    }
    get anchorY(){
        return this.sprite.anchor.y;
    }
    set pivotX(value:number){
        this.sprite.anchor.x = value;
    }
    set pivotY(value:number){
        this.sprite.pivot.y = value;
    }
    set anchorX(value:number){
        this.sprite.pivot.x = value;
    }
    set anchorY(value:number){
        this.sprite.anchor.y = value;
    }
    setSprite(animationName: string): void {
        // console.log(`setSprite to ${animationName}`)
        const newSprite = this.pixieGame.getSpriteAnimation(animationName);
        newSprite.x = this.sprite.x;
        newSprite.y = this.sprite.y;
        newSprite.width = this.sprite.width;
        newSprite.height = this.sprite.height;
        newSprite.scale.x = this.sprite.scale.x;
        newSprite.pivot.x = this.pivotX;
        newSprite.pivot.y = this.pivotY;
        newSprite.anchor.x = this.anchorX;
        newSprite.anchor.y = this.anchorY;
        this.pixieGame.container.removeChild(this.sprite);
        this.sprite = newSprite;
    }
    public static create(gameDependencies:PixiDependencies){
        return new PixieEngineSprite(gameDependencies);
    }
}