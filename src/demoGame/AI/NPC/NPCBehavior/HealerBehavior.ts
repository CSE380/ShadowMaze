import NPCActor from "../../../Actors/NPCActor";
import NPCBehavior from "../NPCBehavior";
import GoalReached from "../NPCStatuses/FalseStatus";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Idle from "../NPCActions/GotoAction";
import { TargetExists } from "../NPCStatuses/TargetExists";
import BasicFinder from "../../../GameSystems/Searching/BasicFinder";
import { ClosestPositioned, LowestHealthBattler } from "../../../GameSystems/Searching/HW4Reducers";
import { AllyFilter, BattlerActiveFilter, BattlerGroupFilter, BattlerHealthFilter, EnemyFilter, ItemFilter, RangeFilter, VisibleItemFilter } from "../../../GameSystems/Searching/HW4Filters";
import PickupItem from "../NPCActions/PickupItem";
import UseHealthpack from "../NPCActions/UseHealthpack";
import Healthpack from "../../../GameSystems/ItemSystem/Items/Healthpack";
import Item from "../../../GameSystems/ItemSystem/Item";
import { HasItem } from "../NPCStatuses/HasItem";
import FalseStatus from "../NPCStatuses/FalseStatus";
import Battler from "../../../GameSystems/BattleSystem/Battler";


/**
 * When an NPC is acting as a healer, their goal is to try and heal it's teammates by running around, picking up healthpacks, 
 * bringing to the healthpacks to their allies and healing them.
 */
export default class HealerBehavior extends NPCBehavior  {

    /** The GameNode that owns this NPCGoapAI */
    protected override owner: NPCActor;
    
    /** Initialize the NPC AI */
    public initializeAI(owner: NPCActor, opts: Record<string, any>): void {
        super.initializeAI(owner, opts);

        this.addState
        this.initialize();

    }

    public override handleEvent(event: GameEvent): void {
        switch(event.type) {
            default: {
                super.handleEvent(event);
                break;
            }
        }
    }

    public override update(deltaT: number): void {
        super.update(deltaT);
    }

}


