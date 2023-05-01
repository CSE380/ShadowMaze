import Timer from "../../../../Wolfie2D/Timing/Timer";
import NPCActor from "../../../Actors/NPCActor";
import { TargetableEntity } from "../../../GameSystems/Targeting/TargetableEntity";
import NPCAction from "./NPCAction";
import { BattlerEvents } from "../../../ProjectEvents";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import { MonsterAnimations } from "../../Player/PlayerController";
import { AnimationType } from "../../Player/PlayerStates/PlayerState";

export default class AttackEnemy extends NPCAction {
    protected timer: Timer;

    public constructor(parent, actor: NPCActor) {
        super(parent, actor);
        this._target = null;
        this.timer = new Timer(2000);
    }
    public performAction(target: TargetableEntity): void {
        // this.timer.isStopped() ? console.log("weapon cooling down!") : console.log("weapon ready");
        if (this.timer.isStopped()) {
            this.actor.animation.play(AnimationType.ATTACKING);
            this.actor.animation.queue(AnimationType.IDLE, true);
            this.emitter.fireEvent(BattlerEvents.MONSTER_ATTACK);
            this.timer.start();
        }
        this.finished();
    }
    public onEnter(options: Record<string, any>): void {
        super.onEnter(options);

    }
    public handleInput(event: GameEvent): void {
        switch (event.type) {
            default: {
                super.handleInput(event);
                break;
            }
        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);
    }

    public onExit(): Record<string, any> {
        return super.onExit();
    }


}