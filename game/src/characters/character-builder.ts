import { AnimationComponent } from "../engine/component/components/animation/animation-component";
import { PositionComponent } from "../engine/component/components/position/position-component";
import { Game } from "../engine/game";

function villager(game:Game, x:number, y:number) {
    var villager = game.addEntity("villager");
    var component = <PositionComponent>villager.getComponent("position");
    component.x = x;
    component.y = y;
    component.vx = 0;
    return villager;
}

export function blue(game:Game, x:number, y:number){
    const blue = villager(game, x, y);
    let ac = <AnimationComponent>blue.getComponent("animation");
    ac.setSprite("bluecloak");
    return blue;
}