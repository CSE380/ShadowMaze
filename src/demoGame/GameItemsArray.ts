export enum GameItems {
    LANTERNS = "lantern",
    DOOR = "door",
    HEALTH_PACKS = "healthPacks",
    INVENTORY_SLOT = "inventorySlot",
    PHASING_POTION="phasingPotion",
    TELEPORT_BOOT="teleportBoot",
    MEDUSA="medusa",
    ORACLE_ELIXIR="oracleElixir",
    SEEING_STONE="seeingStone",
  }
function createGameItemsArray(){
  let GameItemsArray = []
  for (const key of Object.keys(GameItems)) {
    GameItemsArray.push(GameItems[key]);
  }
  return GameItemsArray;
}
export const GameItemsArray = createGameItemsArray();
