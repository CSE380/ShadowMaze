export enum BattlerEvent {
    MONSTER_DEAD = "MONSTER_DEAD",
    MONSTER_HIT= "MONSTER_HIT",
    PRINCE_HIT = "PRINCE_HIT",
    PRINCE_DEAD = "PRINCE_DEAD",
}


export enum PlayerEvents {
    LEVEL_END= "LEVEL_END",
    PLAYER_ENTERED_LEVEL_END= "PLAYER_ENTERED_LEVEL_END",
} 

export enum MessageBox {
    SHOW="SHOW",
    HIDDEN = "HIDDEN",
    INVALID_ACTION = "You can not perform that action.",
    ITEM_NOT_FOUND = "That item cannot be found in your inventory.",
    SKILL_ON_CD = "That skill is on cooldown.",
}
export type AllGameEventType= BattlerEvent | PlayerEvents | MessageBox;

export enum ItemEvent {
    ITEM_REQUEST = "ITEM_REQUEST",

    LASERGUN_FIRED = "LASERGUN_FIRED",

    WEAPON_USED = "WEAPON_USED",
    CONSUMABLE_USED = "CONSUMABLE_USED",
    INVENTORY_CHANGED = "INVENTORY_CHANGED",
}

export enum HudEvent {
    HEALTH_CHANGE = "HEALTH_CHANGE",
    USE_HPACK = "USE_HPACK"
}