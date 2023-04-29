import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import PlayerActor from "../../Actors/PlayerActor";
import Inventory from "../../GameSystems/ItemSystem/Inventory";
import Item from "../../GameSystems/ItemSystem/Item";
import PlayerController from "./PlayerController";
import { Idle, Shielding, Moving, Dead, PlayerStateType, Attacking } from "./PlayerStates/PlayerState";
import { BattlerEvents } from "../../ProjectEvents";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { PlayerStatsArray } from "../../PlayerStatsArray";
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
    private invincibleTime: Timer;
    private isInvincible = false;
    //stats of AI
    private currentStatValue = 10;
    private statNames = PlayerStatsArray;
    private minStatValue = 0;
    private maxStatValue = 10;
    private dmg = 2;
    private ultDmg = 5;
    private currentStat = {};
    public initializeAI(owner: PlayerActor, opts: Record<string, any>): void {
        this.owner = owner;
        this.controller = new PlayerController(owner);

        // Add the players states to it's StateMachine
        this.addState(PlayerStateType.IDLE, new Idle(this, this.owner));
        this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));
        this.addState(PlayerStateType.SHIELDING, new Shielding(this, this.owner));
        this.addState(PlayerStateType.ATTACKING, new Attacking(this, this.owner));

        // Initialize the players state to Idle
        this.initialize(PlayerStateType.IDLE);
        this.receiver.subscribe(BattlerEvents.PRINCE_DEAD);
        this.receiver.subscribe(BattlerEvents.PRINCE_HIT);
        this.invincibleTime = new Timer(1000, this.handleinvincibleTimeEnd, false);
        this.activate(null)
    }

    public activate(options: Record<string, any>): void {
        for (const name of this.statNames) {
            this.currentStat[name] = this.currentStatValue; // Set default value for each stat
            if(name !=='currentHealth'){
                this.currentStat[name] = 0;
            }

        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }

         this.currentStat['currentShield'] = MathUtils.clamp(
            this.currentStat['currentShield']  + deltaT*3,
            this.minStatValue,
            this.maxStatValue,
          );
    }

    public destroy(): void { }

    public handleEvent(event: GameEvent): void {
        switch (event.type) {
            case BattlerEvents.PRINCE_HIT: {
                this.handlePrinceHit();
                break;
            }
            case BattlerEvents.PRINCE_DEAD: {
                console.log("dead");
                break;
            }
        }
    }
    // TO DO play hit animation
    protected handlePrinceHit() {
      
        if (!this.isInvincible) {
            this.isInvincible = true;
            this.invincibleTime.start();
            if ( this.currentStat["currentHealth"] <= this.minStatValue) {
                this.emitter.fireEvent(BattlerEvents.PRINCE_DEAD);
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