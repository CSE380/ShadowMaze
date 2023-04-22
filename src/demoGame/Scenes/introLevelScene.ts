
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import StartScene from "./StartScene";
import ProjectScene from "./AbstractScene";

import { MainMenuButtonEvent, PauseButtonEvent } from "../CustomizedButton";

import { PlayerEvents } from "../ProjectEvents";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
import { MenuState } from "../MenuState";
const ACTIONTYPE = {
    PICK: "PICK",
    USE: "USE",
}

export default class IntroLevelScene extends ProjectScene {

    /** GameSystems in the HW4 Scene */


    // The wall layer of the tilemap
    // The position graph for the navmesh

    



    /**
     * @see Scene.update()
     */
    public override loadScene() {
        // Load the player and enemy spritesheets

        //laser gun
        this.loadAllGameItems();
        this.initLevelScene();
        // this.loadGameItems(this.laserGunsKey);
        this.load.spritesheet("prince", "shadowMaze_assets/spritesheets/prince_v4.json");
        this.load.spritesheet("RedHealer", "shadowMaze_assets/spritesheets/RedHealer.json");
        this.load.object("red", "shadowMaze_assets/data/enemies/red.json");
        // Load the tilemap
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
        console.log(event)
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
                    this.viewport.setZoomLevel(1);
                    this.sceneManager.changeToScene(nextScene,this.option);
                }, 2000)
                return;
            }
        }
        if(nextScene){
            this.viewport.setZoomLevel(1);
            this.sceneManager.changeToScene(nextScene,this.option);
        }
    }
   
  

    /** Initializes the layers in the scene */



}