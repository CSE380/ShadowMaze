import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Line from "../../Wolfie2D/Nodes/Graphics/Line";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Navmesh from "../../Wolfie2D/Pathfinding/Navmesh";
import DirectStrategy from "../../Wolfie2D/Pathfinding/Strategies/DirectStrategy";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import NPCActor from "../Actors/NPCActor";
import PlayerActor from "../Actors/PlayerActor";
// import GuardBehavior from "../AI/NPC/NPCBehavior/GaurdBehavior";
// import HealerBehavior from "../AI/NPC/NPCBehavior/HealerBehavior";
import PlayerAI from "../AI/Player/PlayerAI";
import Battler from "../GameSystems/BattleSystem/Battler";
import BattlerBase from "../GameSystems/BattleSystem/BattlerBase";
import HealthbarHUD from "../GameSystems/HUD/HealthbarHUD";
import InventoryHUD from "../GameSystems/HUD/InventoryHUD";
import Inventory from "../GameSystems/ItemSystem/Inventory";
import Item from "../GameSystems/ItemSystem/Item";
import Healthpack from "../GameSystems/ItemSystem/Items/Healthpack";
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGuns";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import HelpScene from "./HelpScene";
import StartScene from "./StartScene";
import ProjectScene from "./AbstractScene";
import ControlScene from "./ControlScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import { MainMenuButtonEvent, PauseButtonEvent } from "../CustomizedButton";
import Input from "../../Wolfie2D/Input/Input";
import { controlTextArray, helpTextArray } from "../Text";
import { PhysicsGroups } from "../PhysicsGroups";
import { PlayerEvents } from "../ProjectEvents";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
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
   

    // public updateScene() {
    //     while (this.receiver.hasNextEvent()) {
    //         const gameEvent = this.receiver.getNextEvent()
    //         this.handleEvent(gameEvent);
    //     }
    //     if (Input.isKeyJustPressed("escape")) {
    //         this.emitter.fireEvent(PauseButtonEvent.PAUSE);
            
    //     }
    //     this.updateLabel();
    //     this.isLevelEnd();
    //     this.isPlayerAtItems();
    //     this.isUseItem();
    // }
    /**
     * @see Scene.updateScene
     */


    public handleEvent(event: GameEvent): void {
        
        this.handleInGameButtonEvent(event);
        // action type:
        // console.log(event.data.get(this.action) )
        if (event.data.get(this.action) == ACTIONTYPE.PICK)
            this.handlePickGameItemsEvent(event);
        if (event.data.get(this.action) == ACTIONTYPE.USE)
            this.handleUseGameItemsEvent(event);
        if (event.type == "BATTLER_KILLED")
            this.handleBattlerKilled(event);
    }

    protected handleInGameButtonEvent(event:GameEvent){
        switch (event.type) {
            case MainMenuButtonEvent.Restart: {
                this.sceneManager.changeToScene(IntroLevelScene);
                return;
            }
            case PauseButtonEvent.PAUSE: {
                console.log(this.isPauseMenuHidden)
                this.isPauseMenuHidden = !this.isPauseMenuHidden;
                this.showPauseMenu(this.isPauseMenuHidden);
                break;
            }
            case MainMenuButtonEvent.Select_levels: {
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(SelectLevelMenuScene);
                break;
            }
            case MainMenuButtonEvent.Controls: {
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(ControlScene);
                break;
            }
            case MainMenuButtonEvent.Help: {
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(HelpScene);
                break;
            }
            case MainMenuButtonEvent.CHEAT:{
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(CheatCodeMenuScene);
                break;
            }
            case MainMenuButtonEvent.Exit: {
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(StartScene);
                break;
            }
            case PlayerEvents.PLAYER_ENTERED_LEVEL_END: {
                this.handleEnteredLevelEnd();
                // this.viewport.setZoomLevel(1);
                // this.sceneManager.changeToScene(SelectLevelMenuScene);
            }
            case PlayerEvents.LEVEL_END: {
                setTimeout(() => {
                    this.viewport.setZoomLevel(1);
                    this.sceneManager.changeToScene(SelectLevelMenuScene);
                }, 2000)
            }
        }
    }
    // public override updateScene(){
    //     while (this.receiver.hasNextEvent()) {
    //         this.handleEvent(this.receiver.getNextEvent());
    //     }

    // }

    /** Initializes the layers in the scene */



}