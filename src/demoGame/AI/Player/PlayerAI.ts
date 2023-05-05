import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import PlayerActor from "../../Actors/PlayerActor";
import Inventory from "../../GameSystems/ItemSystem/Inventory";
import Item from "../../GameSystems/ItemSystem/Item";
import PlayerController from "./PlayerController";
import { Idle, Shielding, Moving, Dead, PlayerStateType, Attacking, AnimationType } from "./PlayerStates/PlayerState";
import { BattlerEvents, MessageBoxEvents } from "../../ProjectEvents";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { PlayerStatsArray, PlayerStatKey } from "../../PlayerStatsArray";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
/**
 * The AI that controls the player. The players AI has been configured as a Finite State Machine (FSM)
 * with 4 states; Idle, Moving, shielding, and Dead.
 */

export default class PlayerAI extends StateMachineAI implements AI {

    /** The GameNode that owns this AI */
    public owner: PlayerActor;
    /** A set of controls for the player */
    public controller: PlayerController;
    /** The inventory object associated with the player */
    public inventory: Inventory;
    /** The players held item */
    public item: Item | null;

    // hit 
    private defendingTime:Timer
    private isDefending =false;
    private invincibleTime: Timer;
    private isInvincible = false;
    //stats of AI
    private currentStatValue = 10;
    private statNames = PlayerStatsArray;
    private minStatValue = 0;
    private maxStatValue = 10;
    //curse 
    private isCursed: boolean;
    private cursedRatio = -0.2;
    private cursedThreshHold = 0.3*this.maxStatValue;
    private dmg = 2;

    private ultDmg = 10;
    private def = 0;
    private currentStat = {};
    public initializeAI(owner: PlayerActor, opts: Record<string, any>): void {
        this.owner = owner;
        this.controller = new PlayerController(owner);
        this.isCursed = false;
        // Add the players states to it's StateMachine
        this.addState(PlayerStateType.IDLE, new Idle(this, this.owner));
        this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));
        this.addState(PlayerStateType.SHIELDING, new Shielding(this, this.owner));
        this.addState(PlayerStateType.ATTACKING, new Attacking(this, this.owner));

        // Initialize the players state to Idle
        this.initialize(PlayerStateType.IDLE);
        this.receiver.subscribe(BattlerEvents.PRINCE_DEAD);
        this.receiver.subscribe(BattlerEvents.PRINCE_HIT);
        this.receiver.subscribe(BattlerEvents.MONSTER_ATTACK);
        // this.receiver.subscribe(BattlerEvents.MONSTER_HIT);
        this.invincibleTime = new Timer(1000, ()=>this.isInvincible =this.resetFlag(this.isInvincible), false);
        this.defendingTime= new Timer(300, ()=>this.isDefending = this.resetFlag(this.isDefending), false);
        this.activate(null)
    }
    
    public activate(options: Record<string, any>): void {
        for (const name of this.statNames) {
            this.currentStat[name] = this.currentStatValue; // Set default value for each stat
            if (name !== 'currentHealth') {
                this.currentStat[name] = 0;
            }
            // this.currentStat[name]=10;
        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
        this.updateCurseStat(deltaT);
        this.dynamicUpdatePlayerStat(3 * deltaT, PlayerStatKey.CURRENT_SHIELD);

    }

    public destroy(): void { }
    public updateCurseStat(deltaT: number){
        if (this.isCursed) {
            if(this.currentStat[PlayerStatKey.CURRENT_HEALTH]<=this.cursedThreshHold){
                this.dmg = 2;
                this.emitter.fireEvent(MessageBoxEvents.SHOW,{message:MessageBoxEvents.UNUSED_CURSED_SWORD})
                this.isCursed = false;
            }
            this.dynamicUpdatePlayerStat(this.cursedRatio * deltaT, PlayerStatKey.CURRENT_HEALTH);
        }
    }
    public dynamicUpdatePlayerStat(deltaT: number, stat: string) {
        this.currentStat[stat] = MathUtils.clamp(
            this.currentStat[stat] + deltaT * 3,
            this.minStatValue,
            this.maxStatValue,
        );
    }
    public handleEvent(event: GameEvent): void {
        switch (event.type) {
            case BattlerEvents.MONSTER_ATTACK:{
                this.handleMonsterAttack();
                break;
            }
            case BattlerEvents.PRINCE_HIT: {
                this.handlePrinceHit();
                break;
            }
            case BattlerEvents.PRINCE_DEAD: {
                break;
            }
            case BattlerEvents.MONSTER_HIT:{
                
                this.handleMonsterHit();
            }
        }
    }
    // TO DO play hit animation
    protected handleMonsterHit(){
        
        if(this.currentStat[PlayerStatKey.CURRENT_ENERGY]<this.maxStatValue){
            this.currentStat[PlayerStatKey.CURRENT_ENERGY]++;
        }
    }
    protected handleMonsterAttack(){
        if(this.owner.animation.isPlaying(AnimationType.SHIELDING)){
            if(!this.isDefending){
                this.isDefending = true;
                this.defendingTime.start();
                console.log("defending")
            }
        }
        else{
            this.emitter.fireEvent(BattlerEvents.PRINCE_HIT);
            
        }
    }
    protected handlePrinceHit() {
        
        if (!this.isInvincible) {
            this.isInvincible = true;
            this.invincibleTime.start();
            // this.owner.animation.play(AnimationType.HIT);
            if (this.currentStat["currentHealth"] <= this.minStatValue) {
                this.emitter.fireEvent(BattlerEvents.PRINCE_DEAD);
                return;
            }
        }
    }
    protected resetFlag = (flag:boolean) => {
        return !flag;
    };

}