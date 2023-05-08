export enum BattlerEvents {
    MONSTER_DEAD = "MONSTER_DEAD",
    MONSTER_DYING = "MONSTER_DYING",
    MONSTER_HIT= "MONSTER_HIT",
    MONSTER_ATTACK = "MONSTER_ATTACK",
    PRINCE_HIT = "PRINCE_HIT",
    PRINCE_DEAD = "PRINCE_DEAD",
    PRINCE_ATTACK  = "PRINCE_ATTACK"
}


export enum PlayerEvents {
    LEVEL_END= "LEVEL_END",
    PLAYER_ENTERED_LEVEL_END= "PLAYER_ENTERED_LEVEL_END",
} 

export enum MessageBoxEvents {
    SHOW="SHOW",
    HIDDEN = "HIDDEN",
    INVALID_ACTION = "You can not perform that action.",
    ITEM_NOT_FOUND = "That item cannot be found in your inventory.",
    SKILL_ON_CD = "That skill is on cooldown.",
    USE_DOOR = "The destaination has been shown",
    USE_LANTERN = "The visible area are increased",
    USE_HEALTH_PACK= "Health pack is used",
    USE_PHASING_POTION = "The prince is able to phase through the wall",
    USE_TElEPORT_BOOT="The prince is being teleported to a random position",
    USE_MEDUSA="All monsters are frozen for 5 seconds",
    USE_ORACLE_ELIXIR="All monsters'position are shown",
    USE_SEEING_STONE="All items'position are shown",
    USE_CURSED_SWORD="Increased physical damage at cost of health",
    UNUSED_CURSED_SWORD="The prince can not hold cursed sword anymore",
    
}
export type AllGameEventType= BattlerEvents | PlayerEvents | MessageBoxEvents;

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