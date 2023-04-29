export enum GameItems {
    LANTERNS = "lantern",
    DOOR = "door",
    HEALTH_PACKS = "healthPacks",
    INVENTORYSLOT = "inventorySlot",
    PHASINGPOTION="phasingPotion"
  }
function createGameItemsArray(){
  let GameItemsArray = []
  for (const key of Object.keys(GameItems)) {
    GameItemsArray.push(GameItems[key]);
  }
  return GameItemsArray;
}
export const GameItemsArray = createGameItemsArray();
