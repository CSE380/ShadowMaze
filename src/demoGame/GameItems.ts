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
    INVENTORY_SLOT = AllLevelGameItems.INVENTORY_SLOT,
    LANTERNS = "lantern",
}
export type AllGameItemsType= AllLevelGameItems | Level1GameItems;

