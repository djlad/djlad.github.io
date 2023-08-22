import { Swipe } from "./swipe";

const sheatheSpeed = .1;
const sheatheRotateSpeed = sheatheSpeed * 3;
const attackSpeed = .2;

export const holdWeaponPos = ()=>new Swipe(2,.1,-.45,0, sheatheSpeed, false, sheatheRotateSpeed);
export const sheahteBackPos = ()=>new Swipe(3.2, -.6, -.75, 0, sheatheSpeed, false, sheatheRotateSpeed);
export const slashPos = (current:Swipe)=>[
    new Swipe(0, current.offsetX, current.offsetY,.1,.1, false, -.2),
    new Swipe(Math.PI, current.offsetX, current.offsetY,.1,.1, false, .2),
    // new Swipe(current.rotate, current.offsetX, current.offsetY,.1,.1, false, -.2)
    /*new Swipe(0, current.offsetX, current.offsetY,.1,.1, false, -.2),
    new Swipe(current.rotate+1, current.offsetX, current.offsetY,.1,.1, false, .2),
    new Swipe(current.rotate, current.offsetX, current.offsetY,.1,.1, false, -.2)*/
];

export const slashUp = (current:Swipe)=>[new Swipe(Math.PI*.25, current.offsetX, current.offsetY,.1,.1, false, -attackSpeed)]

export const slashDown = (current:Swipe)=>[new Swipe(Math.PI*1, current.offsetX, current.offsetY,.1,.1, false, attackSpeed),]