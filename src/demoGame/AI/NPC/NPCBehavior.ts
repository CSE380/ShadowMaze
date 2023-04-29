import StateMachineGoapAI from "../../../Wolfie2D/AI/Goap/StateMachineGoapAI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Line from "../../../Wolfie2D/Nodes/Graphics/Line";
import Timer from "../../../Wolfie2D/Timing/Timer";
import NPCActor from "../../Actors/NPCActor";
import { BattlerEvents, ItemEvent } from "../../ProjectEvents";
import NPCAction from "./NPCActions/NPCAction";
import { HudEvent } from "../../ProjectEvents";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
/**
 * An abstract implementation of behavior for an NPC. Each concrete implementation of the
 * NPCBehavior class should define some new behavior for an NPCActor. 
 */
export default abstract class NPCBehavior extends StateMachineGoapAI<NPCAction>  {

    protected override owner: NPCActor;
    private invincibleTime: Timer;
    private isInvincible = false;
    private minHealth = 0;
    private maxHealth = 10;
    private currentHealth :number;
    public initializeAI(owner: NPCActor, options: Record<string, any>): void {
        this.owner = owner;
        this.receiver.subscribe(BattlerEvents.MONSTER_ATTACK);
        this.receiver.subscribe(BattlerEvents.MONSTER_HIT);
        this.invincibleTime = new Timer(200, this.handleinvincibleTimeEnd, false);
        this.currentHealth = this.owner.health;
    }
    
    public activate(options: Record<string, any>): void { }

    public update(deltaT: number): void {
        super.update(deltaT);
        if(this.owner.health != this.currentHealth){
            
            this.owner.health = MathUtils.clamp(
                this.owner.health  - deltaT*6,
                this.currentHealth,
                this.owner.maxHealth,
              );
        }
    }

    /**
     * @param event the game event
     */
    public handleEvent(event: GameEvent): void {
        // console.log(event)
        switch (event.type) {
           
            case BattlerEvents.MONSTER_ATTACK: {
                console.log("MONSTER ATTACK");
                break;
            }
            case BattlerEvents.MONSTER_HIT: {
                let id: number = event.data.get("id");
                let dmg: number = event.data.get("dmg");
                if(id==this.owner.id){
                    this.handleMonsterHit(dmg);
                }
                break;
            }
            default: {
                super.handleEvent(event);
                break;
            }
        }
    }
    protected handleMonsterHit(dmg:number) {
      
        if (!this.isInvincible) {
            this.isInvincible = true;
            this.currentHealth -=dmg;
            if(this.currentHealth<=0){
                this.owner.freeze();
            }
            this.invincibleTime.start();
            if ( this.owner.health <= 0) {
                this.emitter.fireEvent(BattlerEvents.MONSTER_DEAD,{ id: this.owner.id });
                return;
            }
        }
    }
    protected handleinvincibleTimeEnd = () => {
        
        this.isInvincible = false;
        // TO DO
        // Play Idle animation
    };
   
    
}