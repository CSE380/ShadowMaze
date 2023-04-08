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
import GuardBehavior from "../AI/NPC/NPCBehavior/GaurdBehavior";
import HealerBehavior from "../AI/NPC/NPCBehavior/HealerBehavior";
import PlayerAI from "../AI/Player/PlayerAI";
import { ItemEvent, PlayerEvent, BattlerEvent, HudEvent } from "../Events";
import Battler from "../GameSystems/BattleSystem/Battler";
import BattlerBase from "../GameSystems/BattleSystem/BattlerBase";
import HealthbarHUD from "../GameSystems/HUD/HealthbarHUD";
import InventoryHUD from "../GameSystems/HUD/InventoryHUD";
import Inventory from "../GameSystems/ItemSystem/Inventory";
import Item from "../GameSystems/ItemSystem/Item";
import Healthpack from "../GameSystems/ItemSystem/Items/Healthpack";
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGun";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import HelpScene from "./HelpScene";
import StartScene from "./StartScene";
import HW4Scene from "./HW4Scene";
import ControlScene from "./ControlScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import {MainMenuButtonEvent } from "../CustomizedButton";
import Input from "../../Wolfie2D/Input/Input";
export default class LevelScene extends HW4Scene {

    /** GameSystems in the HW4 Scene */
    private inventoryHud: InventoryHUD;

    /** All the battlers in the HW4Scene (including the player) */
    private battlers: (Battler & Actor)[];
    /** Healthbars for the battlers */
    private healthbars: Map<number, HealthbarHUD>;
    private labelSize: number;
    private currLabels : Array<Label>;
    private nextLabels : Array<Label>;
    private mesh:Navmesh
    private wallSize; number;
    private mainMenuLayerName: "gameMenu";
    private buttonLayerName: "buttonLayer";
    private pauseMenuLayerName: "pauseMenu";
    private bases: BattlerBase[];
    protected player: PlayerActor;
    private healthpacks: Array<Healthpack>;
    private laserguns: Array<LaserGun>;
    private ButtonSelection;
    // The wall layer of the tilemap
    private walls: OrthogonalTilemap;
    private center:Vec2;
    // The position graph for the navmesh
    private graph: PositionGraph;
    private restartButton:string;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        this.battlers = new Array<Battler & Actor>();
        this.healthbars = new Map<number, HealthbarHUD>();
        this.labelSize = 64;
        this.laserguns = new Array<LaserGun>();
        this.healthpacks = new Array<Healthpack>();
        this.ButtonSelection = MainMenuButtonEvent;
        this.buttonLayerName= "buttonLayer";
        this.restartButton = "restart";
        this.pauseMenuLayerName = "pauseMenu";
    }

    /**
     * @see Scene.update()
     */
    public override loadScene() {
        // Load the player and enemy spritesheets
        this.load.spritesheet("player1", "hw4_assets/spritesheets/player1.json");

        // Load the tilemap
        this.load.tilemap("level", "hw4_assets/tilemaps/introLevel.json");


    }
    /**
     * @see Scene.startScene
     */
    public override startScene() {
        // Add in the tilemap
        let tilemapLayers = this.add.tilemap("level");
        console.log(tilemapLayers)
        // Get the wall layer
        this.walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];
        this.wallSize = this.walls.size.x;
        // Set the viewport bounds to the tilemap
        let tilemapSize: Vec2 = this.walls.size;

        this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
        this.viewport.setZoomLevel(2);

        this.initLayers();
        // create screen first 
        this.buildBlackScreen();
        this.center = this.viewport.getHalfSize();
        
        // this.addBlackLabel(0, 100);
        this.initializePlayer();
        this.addPauseMenu();
        
       
    }
    public addPauseMenu(){
        const pauseSign = "\u23F8";
        let buttonOption = {
            position: new Vec2(475, 10),
            text: pauseSign,
            layerName:this.buttonLayerName,
        }
        this.addButtons(this.ButtonSelection.PAUSE, buttonOption);
        
        let emptyMenuOption = {
            position: new Vec2(this.center.x, this.center.y),
            text: "",
            size:new Vec2(300, 450),
            layerName:this.buttonLayerName,
        }
        this.addText(emptyMenuOption);
        let pauseTextOption = {
            position: new Vec2(this.center.x, this.center.y-100),
            text: "Paused",
            size:new Vec2(100, 30),
            layerName:this.pauseMenuLayerName,
        }
        this.addText(pauseTextOption);
        let positionY=this.center.y - 60;
        for(const buttonName in this.ButtonSelection){
            let buttonOption1= {
                position: new Vec2(this.center.x, positionY),
                text: MainMenuButtonEvent[buttonName],
                layerName :this.pauseMenuLayerName,
            }
            this.addButtons(buttonName, buttonOption1);
            positionY = positionY + 40;
        }
    }
    /**
     * @see Scene.updateScene
     */
    public addText(option: Record<string, any>) {
        const name = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName, option);
        name.size.set(option.size.x,option.size.y);
        name.borderWidth = 2;
        name.backgroundColor=Color.WHITE;
    }
    public addButtons(buttonName: string, option: Record<string, any>) {
        const newButton = <Label>this.add.uiElement(UIElementType.LABEL,  option.layerName, option);
        newButton.size.set(200, 50);
        newButton.borderWidth = 2;
        newButton.borderColor = Color.TRANSPARENT;
        // newButton.backgroundColor = Color.BLACK;
        newButton.setTextColor(Color.PURPLE);
        newButton.onClickEventId = buttonName;
        this.receiver.subscribe(buttonName);
        console.log(newButton)
    }

    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch (event.type) {
            case this.ButtonSelection.PAUSE: {
                // this.sceneManager.changeToScene(MainMenu);
                console.log("pause")
                break;
            }
            case this.restartButton: {
                // this.sceneManager.changeToScene(MainMenu);
                console.log("restart")
                break;
            }
            case MainMenuButtonEvent.Select_levels: {
                console.log("?")
                this.sceneManager.changeToScene(SelectLevelMenuScene);
                break;
            }
            case MainMenuButtonEvent.Controls: {
                this.sceneManager.changeToScene(ControlScene);
                break;
            }
            case MainMenuButtonEvent.Help: {
                this.sceneManager.changeToScene(HelpScene);
                break;
            }
            case MainMenuButtonEvent.Exit:{
                this.sceneManager.changeToScene(StartScene);
            }
        }
    }
    public override updateScene(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
       
        if(Input.isKeyJustPressed("escape")){
            this.emitter.fireEvent(this.ButtonSelection.PAUSE)
        }
        this.updateLabel()
    }
   
    /** Initializes the layers in the scene */
    protected initLayers(): void {
        // this.addLayer(this.buttonLayerName,10)
        this.addLayer(this.mainMenuLayerName);
        // this.addUILayer(this.mainMenuLayerName);
        this.addUILayer(this.buttonLayerName);
        this.addUILayer(this.pauseMenuLayerName);
        this.getLayer(this.buttonLayerName).setDepth(1);
        this.getLayer(this.pauseMenuLayerName).setDepth(2);
    
    }   




    /**
     * Initializes the player in the scene
     */
    protected initializePlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "player1", this.mainMenuLayerName);
        this.player = player
        player.position.set(400, 10);
        player.battleGroup = 2;

        player.health = 10;
        player.maxHealth = 10;
        // Give the player physics
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
      
        this.initCurrLabel();
        // Give the player a healthbar
        let healthbar = new HealthbarHUD(this, player, this.mainMenuLayerName, {size: player.size.clone().scaled(2, 1/2), offset: player.size.clone().scaled(0, -1/2)});
        this.healthbars.set(player.id, healthbar);

        // Give the player PlayerAI
        player.addAI(PlayerAI);

        // Start the player in the "IDLE" animation
        player.animation.play("IDLE");
        this.battlers.push(player);
        this.viewport.follow(player);
    }
    public initCurrLabel(){
        this.currLabels = <Array<Label>> this.getSceneGraph().getNodesAt(this.player.position)
        this.currLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.TRANSPARENT})
    }
    public increaseVision(){
        this.labelSize = this.labelSize*2;
    }
    public buildBlackScreen() {
        const len = this.wallSize / this.labelSize ;
        for (let i = 0; i <= len; i++) {
            for (let j = 0; j <= len; j++) {
                const x = i * this.labelSize;
                const y = j * this.labelSize + this.labelSize / 2;
                const options = {
                    position: new Vec2(x, y),
                    text: "",
                }
                this.addBlackLabel(options);
            }
        }
    }
    public addBlackLabel(options:Record<string, any>) {
       
        const label = <Label>this.add.uiElement(UIElementType.LABEL, this.mainMenuLayerName, options);
        label.size.set(this.labelSize *2, this.labelSize *2);
        label.borderWidth = 0;
        label.borderRadius = 0;
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.BLACK;
    }
    public updateLabel(){
        this.nextLabels= <Array<Label>>this.getSceneGraph().getNodesAt(this.player.position)
        this.currLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.BLACK})
        this.nextLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.TRANSPARENT})
        this.currLabels = this.nextLabels;
    }
    
   
}