import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import { PlayerAnimationType, PlayerStateType } from "./PlayerState";
import { PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class Idle extends PlayerState {

    public override onEnter(options: Record<string, any>): void {
        this.parent.owner.animation.playIfNotAlready(PlayerAnimations.IDLE, true);
    }

    public override handleInput(event: GameEvent): void {
        switch(event.type) {
            default: {
                super.handleInput(event);
                break;
            }
        }
    }

    public override update(deltaT: number): void {
        super.update(deltaT);
        if (this.parent.controller.shielding 
            && this.parent.owner._ai["currentStat"]["currentShield"] == 
            this.parent.owner._ai["maxStatValue"]) {
            this.finished(PlayerStateType.SHIELDING)
        }
        if (this.parent.controller.attacking) {
            this.finished(PlayerStateType.ATTACKING);
        }
        if (!this.parent.controller.moveDir.equals(Vec2.ZERO)) {
            this.finished(PlayerStateType.MOVING);
        }

    }

    public override onExit(): Record<string, any> { 
        return {}; 
    }
    
}