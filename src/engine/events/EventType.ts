
export enum EventType {
    wDown,
    aDown,
    sDown,
    dDown,

    wUp,
    aUp,
    sUp,
    dUp,

    spaceDown,
    spaceUp,

    iUp,// show inventory
    iDown,

    pDown,// console.log game object
    pUp,

    collision,
    fireProjectile,

    inflictDamage,

    changeVelocity,

    giveItem,
}