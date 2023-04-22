import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import PlayerActor from "../../Actors/PlayerActor";
import { ItemEvent } from "../../ProjectEvents";
import Inventory from "../../GameSystems/ItemSystem/Inventory";
import Item from "../../GameSystems/ItemSystem/Item";
import PlayerController from "./PlayerController";
import { Idle, Shielding, Moving, Dead, PlayerStateType, Attacking } from "./PlayerStates/PlayerState";
import { BattlerEvent } from "../../ProjectEvents";
import Timer from "../../../Wolfie2D/Timing/Timer";
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
    //hp
    private currentHealth: number;
    private maxHealth: number;
    private minHealth: number;
    // energy
    private currentEnergy: number;
    private maxEnergy: number;
    private minEnergy: number;
    // hit 
    private invincibleTime: Timer;
    private isInvincible = false;
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
        this.receiver.subscribe(BattlerEvent.PRINCE_DEAD);
        this.receiver.subscribe(BattlerEvent.PRINCE_HIT);
        this.invincibleTime = new Timer(1000, this.handleinvincibleTimeEnd, false);
        this.activate(null)
    }

    public activate(options: Record<string, any>): void {
        this.currentHealth = 1;

        // Set upper and lower bounds on the player's health
        this.minHealth = 0;
        this.maxHealth = 10;

        // Set the player's current Energy
        this.currentEnergy = 1;

        // Set upper and lower bounds on the player's Energy
        this.minEnergy = 0;
        this.maxEnergy = 20;
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }

        // If the player is out of hp - play the death animation
       
    }

    public destroy(): void { }

    public handleEvent(event: GameEvent): void {
        switch (event.type) {
            case BattlerEvent.PRINCE_HIT: {
                this.handlePrinceHit();
                break;
            }
            case BattlerEvent.PRINCE_DEAD: {
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
            if (this.currentHealth <= this.minHealth) {
                this.emitter.fireEvent(BattlerEvent.PRINCE_DEAD);
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