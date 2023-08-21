export class Swipe {
    constructor(
        public rotate:number,
        public offsetX:number,
        public offsetY:number,
        public rotateSpeed: number
        ){}
    flip(){
        this.rotate = this.flipRotate(this.rotate);
        this.offsetX *= -1;
        this.rotateSpeed *= -1;
    }
    private flipRotate(rotate:number) {
        return Math.PI * .5 - rotate;
    }
}