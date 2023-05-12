import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { MainMenuButtonEvent, PauseButtonEvent } from "../../CustomizedButton";
import { Level6GameItems } from "../../GameItems";
import Battler from "../../GameSystems/BattleSystem/Battler";
import { MenuState } from "../../MenuState";
import { PlayerEvents } from "../../ProjectEvents";
import AbstractScene from "../AbstractScene";
import CheatCodeMenuScene from "../CheatCodeMenuScene";
import SelectLevelMenuScene from "../SelectLevelMenuScene";
import StartScene from "../StartScene";


export default class Level6Scene extends AbstractScene {
    public override loadScene() {
        this.playerInitPosition = new Vec2(250, 310);
        this.levelEndPosition = new Vec2(235, 110);
        this.pathToItems = "shadowMaze_assets/data/Level6Data/items/"
        this.pathToMonster = "shadowMaze_assets/data/Level6Data/enemies/"
        this.currentLevelGameItems = Level6GameItems;
        this.currentLevel = 6;
        this.loadCurrentLevelGameItems();
        this.loadUltimateWave();
        this.loadAllGameMusic();
        this.loadAllSpriteSheet();
        this.loadAllMonstersPosition();
        this.load.image(this.inGameControlTextBackground, "shadowMaze_assets/images/inGameControlTextBackground.png");
        this.load.image(this.inGameHelpTextBackground, "shadowMaze_assets/images/inGameHelpTextBackground.png");
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/LEVEL_SIX.json");
    }
    public handleEvent(event: GameEvent): void {
        super.handleEvent(event);
        this.handleInGameButtonEvent(event);
        // action type:  
    }
    public unloadScene(): void {
        this.keepResource();
    }
    protected handleInGameButtonEvent(event:GameEvent){
        let nextScene;
        // console.log(event)
        switch (event.type) {
            case MainMenuButtonEvent.Restart: {
                nextScene = Level6Scene;
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
                this.MenuCurrentState = MenuState.CONTROL_TEXT_MENU_SHOWN
                this.handleMenuShown();
                return;
            }
            case MainMenuButtonEvent.Help: {
                this.MenuCurrentState = MenuState.HELP_TEXT_MENU_SHOWN
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
}   