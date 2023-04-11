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
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGun";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import HelpScene from "./HelpScene";
import StartScene from "./StartScene";
import HW4Scene from "./AbstractScene";
import ControlScene from "./ControlScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import {MainMenuButtonEvent } from "../CustomizedButton";
import Input from "../../Wolfie2D/Input/Input";
import { controlTextArray,helpTextArray } from "../Text";
import { layerNameArray } from "../LayerName";
import { PhysicsGroups } from "../PhysicsGroups";
import { PlayerEvents } from "../ProjectEvents";
enum PauseMenuState {
    Hidden,
    Visible,
    ControlsText,
    HelpText,
  }
export default class LevelScene extends HW4Scene {

    /** GameSystems in the HW4 Scene */
    private inventoryHud: InventoryHUD;
    private state: PauseMenuState = PauseMenuState.Hidden;
    /** All the battlers in the HW4Scene (including the player) */
    private battlers: (Battler & Actor)[];
    /** Healthbars for the battlers */
    private healthbars: Map<number, HealthbarHUD>;
    private labelSize: number;
    private currLabels : Array<Label>;
    private nextLabels : Array<Label>;
    private mesh:Navmesh
    private wallSize: number;
//    private levelEndPosition=new Vec2(400,400);
    private gameMenu= "gameMenu";
    private pauseButtonLayer= "pauseButtonLayer";
    private pauseMenuLayer= "pauseMenuLayer";
    private emptyMenuLayer= "emptyMenuLayer";
    private controlTextLayer= "controlTextLayer";
    private helpTextLayer = "helpTextLayer";
    private layerNames = ["gameMenu", "pauseButtonLayer","emptyMenuLayer", "pauseMenuLayer", "controlTextLayer","helpTextLayer"];
    private bases: BattlerBase[];
    
    private healthpacks: Array<Healthpack>;
    private ButtonSelection;
    // The wall layer of the tilemap
    private walls: OrthogonalTilemap;
    // The position graph for the navmesh
    private graph: PositionGraph;
    private restartButton:string;
    private isPauseMenuHidden:boolean;
    
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        this.battlers = new Array<Battler & Actor>();
        this.healthbars = new Map<number, HealthbarHUD>();
        this.labelSize = 32;
        this.healthpacks = new Array<Healthpack>();
        this.ButtonSelection = MainMenuButtonEvent;
        this.isPauseMenuHidden = true;
        for (const layerName of this.layerNames) {
            this[layerName] = layerName;
        }
        
    }

    /**
     * @see Scene.update()
     */
    public override loadScene() {
        // Load the player and enemy spritesheets
        this.load.spritesheet("prince", "shadowMaze_assets/spritesheets/prince_v2.json");

        // Load the tilemap
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");


    }
    /**
     * @see Scene.startScene
     */
    public override startScene() {
        // Add in the tilemap
        let tilemapLayers = this.add.tilemap("level");
        // console.log(tilemapLayers)
        // Get the wall layer
        // this.init()
        this.walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];
        this.wallSize = this.walls.size.x;
        // Set the viewport bounds to the tilemap
        let tilemapSize: Vec2 = this.walls.size;
        this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
        this.viewport.setZoomLevel(2);
        this.initLayers();
        // create screen first 
        // this.initBlackScreen();
        this.center = this.viewport.getHalfSize();
        // this.addBlackLabel(0, 100);
        this.initializePlayer();
        this.initPauseMenuLayer();
        this.initializeLevelEnds();
        // this.addLevelEndLabel();
        // this.addLevelEndLabel();
        // this.addLevelEndLabel();
        // this.initControlTextLayer();
        // this.initHelpTextLayer();
    }
    
    public initControlTextLayer(){
        let controlTextOption = {
            position: this.viewport.getCenter(),
            margin:40,
            layerName:this.controlTextLayer
        }
        this.addControlTextLayer(controlTextOption)
    }
    public initHelpTextLayer(){
        let helpTextOption = {
            position:new Vec2(450, 450),
            margin:40,
            layerName:this.helpTextLayer,
        }
        this.addHelpTextLayer(helpTextOption)
    }
    public initPauseMenuLayer(){
        const pauseSign = "\u23F8";
        let buttonOption = {
            position: new Vec2(475, 10),
            text: pauseSign,
            layerName:this.pauseButtonLayer,
            buttName:this.ButtonSelection.PAUSE, 
            backgroundColor: Color.TRANSPARENT,
        }
        this.addButtons(buttonOption);
        let emptyMenuOption = {
            position: this.center,
            text: "",
            size:new Vec2(300, 450),
            layerName:this.emptyMenuLayer,
            backgroundColor:Color.WHITE,
        }
        this.addText(emptyMenuOption);
        let pauseTextOption = {
            position: new Vec2(this.center.x, this.center.y-100),
            text: "Paused",
            size:new Vec2(100, 30),
            layerName:this.pauseMenuLayer,
            backgroundColor:Color.WHITE,
            textColor:Color.BLACK,
        }
        this.addText(pauseTextOption);
        let positionY=this.center.y - 60;
        for(let buttonName in this.ButtonSelection){
            if(buttonName == "Select_levels") 
                buttonName = "Select levels"   
            let buttonOption1= {
                position: new Vec2(this.center.x, positionY),
                text: buttonName,
                layerName :this.pauseMenuLayer,
                buttonName: buttonName,
                backgroundColor:Color.PURPLE,
                size:new Vec2(300,50),
                textColor:Color.WHITE,
            }
            this.addButtons( buttonOption1);
            positionY = positionY + 40;
        }
    }
    /**
     * @see Scene.updateScene
     */
  

    public handleEvent(event: GameEvent): void {
        // console.log("receive type")
        console.log(event.type)
        switch (event.type) {
            case this.ButtonSelection.PAUSE: {
                this.isPauseMenuHidden = !this.isPauseMenuHidden;
               
                // this.sceneManager.changeToScene(MainMenu);
                this.showPauseMenu(this.isPauseMenuHidden);
                break;
            }
            case MainMenuButtonEvent.Restart: {
                this.sceneManager.changeToScene(LevelScene);
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
            case MainMenuButtonEvent.Exit:{
                this.viewport.setZoomLevel(1);
                this.sceneManager.changeToScene(StartScene);
                break;
            }
            case PlayerEvents.PLAYER_ENTERED_LEVEL_END:{
                console.log("levelend")
                this.handleEnteredLevelEnd();
                // this.viewport.setZoomLevel(1);
                // this.sceneManager.changeToScene(SelectLevelMenuScene);
            }
            case PlayerEvents.LEVEL_END:{
              
                setTimeout(()=>{
                    this.viewport.setZoomLevel(1);
                    this.sceneManager.changeToScene(SelectLevelMenuScene);
                },2000)
               
            }
        }
    }
    public override updateScene(){
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
        if(Input.isKeyJustPressed("escape")){
           
            this.emitter.fireEvent(this.ButtonSelection.PAUSE)
        }
        this.updateLabel();
        this.isLevelEnd();
    }
   
    /** Initializes the layers in the scene */
    protected initLayers(): void {
        for(let i = 0;i<this.layerNames.length;i++){
            const layerName = this.layerNames[i];
            this.addLayer(this[layerName],i);
        }
        // this.getLayer(this.pauseButtonLayerName).setDepth(1);
        // this.getLayer(this.emptyMenuLayerName).setDepth(2);
        // this.getLayer(this.pauseMenuLayerName).setDepth(3);
        this.getLayer(this.emptyMenuLayer).setHidden(this.isPauseMenuHidden);
        this.getLayer(this.pauseMenuLayer).setHidden(this.isPauseMenuHidden);
    }   
    protected showPauseMenu(flag:boolean):void{
        this.getLayer(this.emptyMenuLayer).setHidden(flag);
        this.getLayer(this.pauseMenuLayer).setHidden(flag);
    }
   
      
    /**
     * Initializes the player in the scene
     */
    protected initializePlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "prince", this.gameMenu);
        this.player = player
        player.position.set(this.playerInitPosition.x,this.playerInitPosition.y);
        player.battleGroup = 2;

        player.health = 10;
        player.maxHealth = 10;
        // Give the player physics
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
        // player.setGroup(PhysicsGroups.PLAYER);
        this.initCurrLabel();
        // Give the player a healthbar
        let healthbar = new HealthbarHUD(this, player, this.gameMenu, {size: player.size.clone().scaled(2, 1/2), offset: player.size.clone().scaled(0, -1/2)});
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
        this.currLabels.forEach(label=>{this.updateColor(label)})
    }
    public increaseVision(){
        this.labelSize = this.labelSize*2;
    }
    public initBlackScreen() {
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
        const label = <Label>this.add.uiElement(UIElementType.LABEL, this.gameMenu, options);
        label.size.set(this.labelSize *2, this.labelSize *2);
        label.borderWidth = 0;
        label.borderRadius = 0;
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.BLACK;
    }
    public updateLabel(){
        this.nextLabels= <Array<Label>>this.getSceneGraph().getNodesAt(this.player.position)
        this.currLabels.forEach(label=>{this.updateColor(label)})
        this.nextLabels.forEach(label=>this.updateColor(label))
        this.currLabels = this.nextLabels;
    }
    public updateColor(label:Label){
        if(label.backgroundColor){
            if(label.backgroundColor.isEqual(Color.BLACK)){
                label.backgroundColor=Color.TRANSPARENT;
            }
            else if (label.backgroundColor.isEqual(Color.TRANSPARENT)){
                label.backgroundColor = Color.BLACK;
            }
        }
       

    }
   
}