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
import { ClosestPositioned } from "../GameSystems/Searching/HW4Reducers";
import BasicTargetable from "../GameSystems/Targeting/BasicTargetable";
import Position from "../GameSystems/Targeting/Position";
import AstarStrategy from "../Pathfinding/AstarStrategy";
import HW4Scene from "./HW4Scene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import { PauseButtonEvent } from "../CustomizedButton";
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
    private bases: BattlerBase[];
    protected player: PlayerActor;
    private healthpacks: Array<Healthpack>;
    private laserguns: Array<LaserGun>;
    private ButtonSelection: typeof PauseButtonEvent;
    // The wall layer of the tilemap
    private walls: OrthogonalTilemap;

    // The position graph for the navmesh
    private graph: PositionGraph;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        this.battlers = new Array<Battler & Actor>();
        this.healthbars = new Map<number, HealthbarHUD>();
        this.labelSize = 32;
        this.laserguns = new Array<LaserGun>();
        this.healthpacks = new Array<Healthpack>();
        this.ButtonSelection = PauseButtonEvent;

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
        // Create the player
        this.initializePlayer();
        let center = this.viewport.getCenter();
        const pauseSign = "\u23F8";
        let buttonOption = {
            position: new Vec2(center.x + 470, center.y - 470),
            text: pauseSign,
        }
        console.log(this.sceneGraph)
        this.addButtons(this.ButtonSelection.PAUSE, buttonOption);
    }
    /**
     * @see Scene.updateScene
     */
    public addText(option: Record<string, any>) {
        const name = <Label>this.add.uiElement(UIElementType.LABEL, this.mainMenuLayerName, option);
        name.size.set(300, 100);
        name.borderWidth = 2;
        name.setTextColor(Color.WHITE)
        name.setFontsize(28);
        if (option.align)
            name.setHAlign("left")
    }
    public addButtons(buttonName: string, option: Record<string, any>) {
        const play = <Label>this.add.uiElement(UIElementType.BUTTON, this.mainMenuLayerName, option);
        play.size.set(50, 50);
        play.borderWidth = 0;
        play.borderColor = Color.TRANSPARENT;
        play.backgroundColor = Color.BLACK;
        play.onClickEventId = buttonName;
        play.setFontsize(50);
        this.receiver.subscribe(buttonName);
    }

    public handleEvent(event: GameEvent): void {
        
        switch (event.type) {
            case this.ButtonSelection.PAUSE: {
                // this.sceneManager.changeToScene(MainMenu);
                break;
            }

        }
    }
    public override updateScene(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
        this.updateLabel();
    }
   
    /** Initializes the layers in the scene */
    protected initLayers(): void {
        // this.addLayer(this.buttonLayerName,10)
        this.addUILayer(this.mainMenuLayerName);
        // this.addUILayer(this.buttonLayerName);
       
    }




    /**
     * Initializes the player in the scene
     */
    protected initializePlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "player1", this.mainMenuLayerName);
        this.player = player
        player.position.set(40, 400);
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
        console.log(this.currLabels)
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
                this.addBlackLabel(x, y);
            }
        }
    }
    public addBlackLabel(x: number, y: number) {
        const options = {
            position: new Vec2(x, y),
            text: "",
        }
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