import State from "../../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import { BattlerEvent, HudEvent, ItemEvent } from "../../../ProjectEvents"
import Item from "../../../GameSystems/ItemSystem/Item";
import PlayerAI from "../PlayerAI";


export enum PlayerAnimationType {
    IDLE = "IDLE",
    MOVING = "MOVING",
    ATTACKING = "ATTACKING",
    SHIELDING = "SHIELDING"
}


export enum PlayerStateType {
    IDLE = "IDLE",
    ATTACKING = "ATTACKING",
    MOVING = "MOVING",
    SHIELDING = "SHIELDING"
}

export default abstract class PlayerState extends State {

    protected parent: PlayerAI;
    protected owner: PlayerActor;

    public constructor(parent: PlayerAI, owner: PlayerActor) {
        super(parent);
        this.owner = owner;
    }

    public override onEnter(options: Record<string, any>): void {}
    public override onExit(): Record<string, any> { return {}; }
    public override update(deltaT: number): void {

        // if (this.parent.owner.animation.isPlaying(PlayerAnimations.IDLE)) {
        //     this.parent.owner.rotation = 0;
        // }
        // Adjust the angle the player is facing 
        // this.parent.owner.rotation = this.parent.controller.rotation;
        let princeDirection = this.parent.controller.moveDir;
        //change direction of the prince
        if (princeDirection.x == 0) {
            if (princeDirection.y > 0) {
                this.parent.owner.rotation = 3.15;
            }
            if (princeDirection.y < 0) {
                this.parent.owner.rotation = 0;
            }
        }
        if (princeDirection.y == 0) {
            if (princeDirection.x > 0) {
                this.parent.owner.rotation = 4.75;
            }
            if (princeDirection.x < 0) {
                this.parent.owner.rotation = 1.5;
            }
        }
        if (princeDirection.x < 0) {
            if (princeDirection.y < 0) {
                this.parent.owner.rotation = 0.75;
            }
            if (princeDirection.y > 0) {
                this.parent.owner.rotation = 2.25;
            }
        }
        if (princeDirection.x > 0) {
            if (princeDirection.y < 0) {
                this.parent.owner.rotation = 5.25;
            }
            if (princeDirection.y > 0) {
                this.parent.owner.rotation = 3.75;
            }
        }

        // Move the player
        this.parent.owner.move(this.parent.controller.moveDir);

        // if (this.parent.controller.attacking) {

        // }
        // if (this.parent.controller.shielding) {

        // }

        // Handle the player trying to pick up an item
        if (this.parent.controller.pickingUp) {
            // Request an item from the scene
            this.emitter.fireEvent(ItemEvent.ITEM_REQUEST, {node: this.owner, inventory: this.owner.inventory});
        }

        // Handle the player trying to drop an item
        if (this.parent.controller.dropping) {
            
        }

        if (this.parent.controller.useItem) {

        }
    }

    public override handleInput(event: GameEvent): void {
        switch(event.type) {
            default: {
                throw new Error(`Unhandled event of type ${event.type} caught in PlayerState!`);
            }
        }
    }

}

import Idle from "./Idle";
import Shielding from "./Shielding";
import Moving from "./Moving";
import Attacking from "./Attacking";
import Dead from "./Dead";
import PlayerActor from "../../../Actors/PlayerActor";
import MathUtils from "../../../../Wolfie2D/Utils/MathUtils";
import { PlayerAnimations } from "../PlayerController";
export { Idle, Shielding, Moving, Dead, Attacking} 