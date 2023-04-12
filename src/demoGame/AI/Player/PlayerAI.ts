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
import { PlayerEvents } from "../../ProjectEvents";
import Input from "../../../Wolfie2D/Input/Input";
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
    
    public initializeAI(owner: PlayerActor, opts: Record<string, any>): void {
        this.owner = owner;
        this.controller = new PlayerController(owner);

        // Add the players states to it's StateMachine
        this.addState(PlayerStateType.IDLE, new Idle(this, this.owner));
        this.addState(PlayerStateType.MOVING, new Moving(this, this.owner));
        this.addState(PlayerStateType.SHIELDING, new Shielding(this,  this.owner));
        this.addState(PlayerStateType.ATTACKING, new Attacking(this, this.owner));
        
        // Initialize the players state to Idle
        this.initialize(PlayerStateType.IDLE);
        this.receiver.subscribe(PlayerEvents.FIRING_LASER);
    }

    public activate(options: Record<string, any>): void { }

    public update(deltaT: number): void {
        super.update(deltaT);
        // if(Input.isKeyJustPressed(""))
    }

    public destroy(): void {}

    public handleEvent(event: GameEvent): void {
        switch(event.type) {
            case ItemEvent.LASERGUN_FIRED: {
                this.handleLaserFiredEvent(event.data.get("actorId"), event.data.get("to"), event.data.get("from"));
                break;
            }
            case PlayerEvents.FIRING_LASER:{
                console.log("laser");
            }
            default: {
                super.handleEvent(event);
                break;
            }
        }
    }

    protected handleLaserFiredEvent(actorId: number, to: Vec2, from: Vec2): void {
        if (this.owner.id !== actorId && this.owner.collisionShape !== undefined ) {
            if (this.owner.collisionShape.getBoundingRect().intersectSegment(to, from.clone().sub(to)) !== null) {
                this.owner.health -= 1;
            }
        }
    }


}