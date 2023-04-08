import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Battler from "../../../GameSystems/BattleSystem/Battler";
import Healthpack from "../../../GameSystems/ItemSystem/Items/Healthpack";
import { TargetableEntity } from "../../../GameSystems/Targeting/TargetableEntity";
import NPCActor from "../../../Actors/NPCActor";
import NPCBehavior from "../NPCBehavior";
import NPCAction from "./NPCAction";
import Finder from "../../../GameSystems/Searching/Finder";
import { ItemEvent } from "../../../Events";
import { HudEvent } from "../../../Events";
import Timer from "../../../../Wolfie2D/Timing/Timer";
export default class UseHealthpack extends NPCAction {

    // The targeting strategy used for this GotoAction - determines how the target is selected basically
    protected override _targetFinder: Finder<Battler>;
    // The targets or Targetable entities 
    protected override _targets: Battler[];
    // The target we are going to set the actor to target
    protected override _target: Battler | null;
    protected timer: Timer;
    protected healthPack: Healthpack
    public constructor(parent: NPCBehavior, actor: NPCActor) {
        super(parent, actor);
        this.timer = new Timer(2000);
        this.healthPack = null;
    }

    public performAction(target: Battler): void {


        if (this.timer.isStopped() && this.healthPack) {
            target.health +=(this.healthPack as Healthpack).health ;
            this.actor.inventory.remove((this.healthPack as Healthpack).id)
            // console.log(target)
            // console.log(this.actor.inventory)
            // console.log(this.actor)
            this.timer.start()
        }
        // this.finished()
        // this.emitter.fireEvent(HudEvent.USE_HPACK,{
        // id:target.id,
        // })
        // this.emitter.fireEvent(HudEvent.HEALTH_CHANGE, {id: this.id, curhp: this.health, maxhp: this.maxHealth});

    }
    public onEnter(options: Record<string, any>): void {
        // Clear the reference to the lasergun
        super.onEnter(options);
        let healthPack = this.actor.inventory.find(item => item.constructor === Healthpack);
        if (healthPack != null && healthPack.constructor === Healthpack) {
            this.healthPack = healthPack
        }

    }
    public onExit(): Record<string, any> {
        // Clear the reference to the lasergun
        this.healthPack = null;
        return super.onExit();
    }
}