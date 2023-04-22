export enum BattlerEvent {
    MONSTER_DEAD = "MONSTER_DEAD",
    MONSTER_HIT= "MONSTER_HIT",
    PRINCE_HIT = "PRINCE_HIT",
    PRINCE_DEAD = "PRINCE_DEAD",
}

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

// export enum PlayerEvent {
//     PLAYER_KILLED = "PLAYER_KILLED",

// }

/**
 * A set of events for HW4
 */
export const PlayerEvents = {
    LEVEL_START: "LEVEL_START",
    LEVEL_END: "LEVEL_END",
    PLAYER_ENTERED_LEVEL_END: "PLAYER_ENTERED_LEVEL_END",
    FIRING_LASER: "FIRING_LASER",

} as const;
