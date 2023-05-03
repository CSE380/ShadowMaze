export enum AllLevelGameItems {
    INVENTORY_SLOT = "inventorySlot",
    LANTERN = "lantern",
    DOOR = "door",
    HEALTH_PACK = "healthPacks",
    PHASING_POTION="phasingPotion",
    TELEPORT_BOOT="teleportBoot",
    MEDUSA="medusa",
    ORACLE_ELIXIR="oracleElixir",
    SEEING_STONE="seeingStone",
    IRON_SHIELD = "ironShield",
    IRON_SWORD =  "ironSword",
    WOODEN_SWORD =  "woodenSword",
}

export enum Level1GameItems {
    LANTERNS = "lantern",
    INVENTORY_SLOT = "inventorySlot",
    IRON_SHIELD = "ironShield",
    IRON_SWORD =  "ironSword",
}
export enum Level2GameItems {
    LANTERNS = "lantern",
    INVENTORY_SLOT = "inventorySlot",
    IRON_SHIELD = "ironShield",
    IRON_SWORD =  "ironSword",
}
export type AllGameItemsType=typeof AllLevelGameItems | typeof Level1GameItems | typeof Level2GameItems;

