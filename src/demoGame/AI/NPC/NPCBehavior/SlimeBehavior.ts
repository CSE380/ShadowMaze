import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import NPCActor from "../../../Actors/NPCActor";
import BasicFinder from "../../../GameSystems/Searching/BasicFinder";
import { TargetableEntity } from "../../../GameSystems/Targeting/TargetableEntity";
import NPCBehavior from "../NPCBehavior";
import Battler from "../../../GameSystems/BattleSystem/Battler";
import { BattlerActiveFilter, EnemyFilter, RangeFilter } from "../../../GameSystems/Searching/HW4Filters";
import { TargetExists } from "../NPCStatuses/TargetExists";
import FalseStatus from "../NPCStatuses/FalseStatus";
import AttackEnemy from "../NPCActions/AttackEnemy";
import { ClosestPositioned } from "../../../GameSystems/Searching/HW4Reducers";
import Idle from "../NPCActions/GotoAction";
import GoapAction from "../../../../Wolfie2D/AI/Goap/GoapAction";
import GoapState from "../../../../Wolfie2D/AI/Goap/GoapState";

export default class SlimeBehavior extends NPCBehavior {
    protected target: TargetableEntity;
    protected range: number;

    public initializeAI(owner: NPCActor, options: Record<string, any>): void {
        super.initializeAI(owner, options);

        this.target = options.target;
        this.range = options.range;
        this.initializeStatuses();
        this.initializeActions();
        this.goal = SlimeStatuses.GOAL;

        this.initialize();
    }

    protected initializeStatuses(): void {
        let scene = this.owner.getScene();

        let enemyBattlerFinder = new BasicFinder<Battler>(null, BattlerActiveFilter(), EnemyFilter(this.owner), RangeFilter(this.target, 0, this.range*this.range));
        let enemyAtGuardPosition = new TargetExists(scene.getBattlers(), enemyBattlerFinder);
        this.addStatus(SlimeStatuses.ENEMY_IN_GUARD_POSITION, enemyAtGuardPosition);

        this.addStatus(SlimeStatuses.GOAL, new FalseStatus());
    }

    protected initializeActions(): void {
        let scene = this.owner.getScene();

        let attackEnemy = new AttackEnemy(this, this.owner);
        attackEnemy.targets = scene.getBattlers();
        attackEnemy.targetFinder = new BasicFinder<Battler>(ClosestPositioned(this.owner), BattlerActiveFilter(), EnemyFilter(this.owner), RangeFilter(this.target, 0, this.range*this.range));
        attackEnemy.addPrecondition(SlimeStatuses.ENEMY_IN_GUARD_POSITION);
        attackEnemy.addEffect(SlimeStatuses.GOAL);
        attackEnemy.cost = 1;
        this.addState(SlimeActions.ATTACK, attackEnemy);

        let slime = new Idle(this, this.owner);
        slime.targets = [this.target];
        slime.targetFinder = new BasicFinder();
        slime.addEffect(SlimeStatuses.GOAL);
        slime.cost = 1000;
        this.addState(SlimeActions.GUARD, slime);
    }

    public override addState(stateName: string, state: GoapAction): void {
        super.addState(stateName, state);
    }

    public override addStatus(statusName: string, status: GoapState): void {
        super.addStatus(statusName, status);
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

const SlimeStatuses = {
    ENEMY_IN_GUARD_POSITION: "enemy-at-guard-position",
    GOAL: "goal"
}

const SlimeActions = {
    IDLE: "idle",
    ATTACK: "attack",
    GUARD: "guard"
} as const;
