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
        setTimeout(()=>{this.sprite.x + 100}, 4000);
    }
    private _width: number;
    private _height: number;
    private _faceRight: boolean;
    private _x: number;
    private _y: number;
    private _vx: number;

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
    setSprite(animationName: string): void {

    }
    public static create(gameDependencies:PixiDependencies){
        return new PixieEngineSprite(gameDependencies);
    }
}