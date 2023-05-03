import { AllLevelGameItems, Level1GameItems } from "../../GameItems";
import AbstractScene from "../AbstractScene";
import IntroLevelScene from "./IntroLevelScene";

export default class Level2Scene extends IntroLevelScene {
    protected currentLevelGameItems = AllLevelGameItems;
    public override loadScene() {
        this.loadCurrentLevelGameItems();
        this.loadUltimateWave();
        this.loadAllGameMusic();
        this.loadAllSpriteSheet();
        this.loadAllMonstersPosition();
        this.load.image(this.inGameControlTextBackground, "shadowMaze_assets/images/inGameControlTextBackground.png");
        this.load.image(this.inGameHelpTextBackground, "shadowMaze_assets/images/inGameHelpTextBackground.png");

        // Load the tilemap
        // this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/lavaMap.json");
    }
}   