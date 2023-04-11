import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import PlayerActor from "../../../Actors/PlayerActor";
import PlayerAI from "../PlayerAI";
import { PlayerAnimations } from "../PlayerController";
import PlayerState, { PlayerStateType } from "./PlayerState";
import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";


export default class Attacking extends PlayerState {

    protected timer: Timer;
    
    public override onEnter(options: Record<string, any>): void {
        this.parent.owner.animation.play(PlayerAnimations.ATTACKING, false);
    }

    public override update(deltaT: number): void {
        super.update(deltaT);
        if (!this.parent.owner.animation.isPlaying(PlayerAnimations.ATTACKING)) {
            this.finished(PlayerStateType.IDLE);
        }  
    }

    public override handleInput(event: GameEvent): void {
        switch(event.type) {
            default: {
                super.handleInput(event);
                break;
            }
        }
    }


    public override onExit(): Record<string, any> { 
        return {};
    }
}