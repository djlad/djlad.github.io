export class Swipe {
    private _rotate: number = 0;
    private twopi = Math.PI * 2;
    public get rotate(): number {
        return this._rotate;
    }
    public set rotate(value: number) {
        this._rotate = ((value % this.twopi) + this.twopi) % this.twopi;
    }
    constructor(
        rotate:number,
        public offsetX:number,
        public offsetY:number,
        public rotateSpeed: number,
        public speed:number = 0,
        public longWay:boolean = false
        ){
            this.rotate = rotate;
        }
    flip(){
        this.rotate = this.flipRotate(this.rotate);
        this.offsetX *= -1;
        this.rotateSpeed *= -1;
    }
    private flipRotate(rotate:number) {
        return Math.PI * .5 - rotate;
    }
}