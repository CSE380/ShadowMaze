
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import StartScene from "./StartScene";
import AbstractScene from "./AbstractScene";
import Battler from "../GameSystems/BattleSystem/Battler";

import { MainMenuButtonEvent, PauseButtonEvent } from "../CustomizedButton";
import { PlayerEvents } from "../ProjectEvents";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
import { MenuState } from "../MenuState";
import { AllLevelGameItems, Level1GameItems } from "../GameItems";
const ACTIONTYPE = {
    PICK: "PICK",
    USE: "USE",
}

export default class IntroLevelScene extends AbstractScene {

    protected currentLevelGameItems = Level1GameItems;
    /**
     * @see Scene.update()
     */
    public override loadScene() {
        

        // this.load.audio(this.levelMusicKey, IntroLevelScene.LEVEL_MUSIC_PATH);

        this.loadCurrentLevelGameItems();
        this.loadUltimateWave();
        this.loadAllGameMusic();
        this.loadAllSpreadSheet();
        this.loadAllMonstersPosition();
        this.load.image(this.inGameControlTextBackground, "shadowMaze_assets/images/inGameControlTextBackground.png");
        this.load.image(this.inGameHelpTextBackground, "shadowMaze_assets/images/inGameHelpTextBackground.png");

        // Load the tilemap
        // this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/LI_TEST_MAP.json");
    }
    /**
     * @see Scene.startScene
     */
   

   


    public handleEvent(event: GameEvent): void {
        super.handleEvent(event);
        this.handleInGameButtonEvent(event);
        // action type:  
    }
    protected handleInGameButtonEvent(event:GameEvent){
        let nextScene;
        // console.log(event)
        switch (event.type) {
            case MainMenuButtonEvent.Restart: {
                nextScene = IntroLevelScene
                break;
            }
            case PauseButtonEvent.PAUSE: {
                this.handleMenuStateChange();
                this.handleMenuShown();
                break;
            }
            case MainMenuButtonEvent.Select_levels: {
                nextScene = SelectLevelMenuScene
                break;
            }
            case MainMenuButtonEvent.Controls: {
                this.MenuCurentState = MenuState.CONTROL_TEXT_MENU_SHOWN
                this.handleMenuShown();
                return;
            }
            case MainMenuButtonEvent.Help: {
                this.MenuCurentState = MenuState.HELP_TEXT_MENU_SHOWN
                this.handleMenuShown();
                break;
            }
            case MainMenuButtonEvent.CHEAT:{
                nextScene = CheatCodeMenuScene
                break;
            }
            case MainMenuButtonEvent.Exit: {
                nextScene = StartScene
                break;
            }
            case PlayerEvents.PLAYER_ENTERED_LEVEL_END: {
                this.handleEnteredLevelEnd();
                break;
            }  
            case PlayerEvents.LEVEL_END: {
                setTimeout(() => {
                    nextScene = SelectLevelMenuScene
                    this.sceneChange(nextScene)
                }, 2000)
                return;
            }
        }
        if(nextScene){
            this.sceneChange(nextScene)
        }
    }

    public getBattlers(): Battler[] { return this.battlers; }
    /** Initializes the layers in the scene */



}
