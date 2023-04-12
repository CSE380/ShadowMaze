export enum GameItems {
    LASER_GUNS = "laserGuns",
    DOOR = "door",
    HEALTH_PACKS = "healthPacks"
  }
function createGameItemsArray(){
  let GameItemsArray = []
  for (const key of Object.keys(GameItems)) {
    GameItemsArray.push(GameItems[key]);
  }
  return GameItemsArray;
}
export const GameItemsArray = createGameItemsArray();
