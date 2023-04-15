import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Scene from "../../Wolfie2D/Scene/Scene";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import gameItems from "../GameSystems/ItemSystem/Items/LaserGuns";
import Healthpack from "../GameSystems/ItemSystem/Items/Healthpack";
import Battler from "../GameSystems/BattleSystem/Battler";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../Wolfie2D/Utils/Color";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import { BackButtonEvent } from "../CustomizedButton";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import MainMenu from "./MainMenuScene";
import { helpTextArray, controlTextArray } from "../Text";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import UIElement from "../../Wolfie2D/Nodes/UIElement";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { PhysicsGroups } from "../PhysicsGroups";
import { PlayerEvents } from "../ProjectEvents";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import Timer from "../../Wolfie2D/Timing/Timer";
import Input from "../../Wolfie2D/Input/Input";
import PlayerActor from "../Actors/PlayerActor";
import Line from "../../Wolfie2D/Nodes/Graphics/Line";
import BubbleShaderType from "../Shaders/BubbleShaderType";
import LaserShaderType from "../Shaders/LaserShaderType";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import LaserBehavior from "../AI/LaserBehavior";
import { MainMenuButtonEvent } from "../CustomizedButton";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import PlayerAI from "../AI/Player/PlayerAI";
import { GameItemsArray, GameItems } from "../GameItemsArray";
import { PlayerInput } from "../AI/Player/PlayerController";
export const GAMELayers = {
    PRIMARY: "PRIMARY",
    BACKGROUND: "BACKGROUND",
    UIlayer: "UIlayer",
} as const;
export default abstract class ProjectScene extends Scene {

    protected wallSize: number;

    protected backgroundImage: Sprite;
    //Level end
    protected center: Vec2;
    protected levelEndArea: Rect;
    protected levelEndLabel: Label;
    protected playerInitPosition = new Vec2(15, 400);
    protected levelEndPosition = new Vec2(308, 20);
    protected levelEndHalfSize = new Vec2(25, 25)
    protected levelEndColor = new Color(255, 0, 0, 0.5);
    protected levelEndTimer: Timer;
    protected levelTransitionScreen: Rect;
    protected isLevelEndEnetered: boolean;
    //player 
    protected player: PlayerActor;
    protected laserGuns: Array<gameItems>;
    private lasers: Array<Graphic>;
    protected door: Sprite
    //ui
    // Health labels
    protected healthLabel: Label;
    protected healthBar: Label;
    protected healthBarBg: Label;
    //oprotectedy labels
    protected energyLabel: Label;
    protected energyBar: Label;
    protected energyBarBg: Label;
    protected textInitPositionX = 12;
    protected textInitPositionY = 15;
    protected offSet=65;
    protected healthTextLablePosition = new Vec2(this.textInitPositionX, this.textInitPositionY *1);
    protected healthLabelPosition =     new Vec2(this.textInitPositionX+this.offSet, this.textInitPositionY *2);
    protected energyTextLablePosition = new Vec2(this.textInitPositionX, this.textInitPositionY *3);
    protected energyBarLabelPosition =  new Vec2(this.textInitPositionX+this.offSet, this.textInitPositionY *4);

    //items to game 
    protected gameItemsArray = GameItemsArray;
    protected gameItemsMap = new Map<string, Array<gameItems>>();
    protected laserGunsKey = "laserGuns";
    protected lightShape: AABB;
    protected lightDuration: boolean;
    //ui display
    protected currLabels: Array<Label>;
    protected nextLabels: Array<Label>;
    protected mainMenuLayerName = "gameMenu";
    protected backgroundImageKey: "backgroundImage";
    protected gameMenu = "gameMenu";
    protected pauseButtonLayer = "pauseButtonLayer";
    protected pauseMenuLayer = "pauseMenuLayer";
    protected emptyMenuLayer = "emptyMenuLayer";
    protected controlTextLayer = "controlTextLayer";
    protected helpTextLayer = "helpTextLayer";
    protected layerNames = ["gameMenu", "pauseButtonLayer", "emptyMenuLayer", "pauseMenuLayer", "controlTextLayer", "helpTextLayer"];
    protected UIlayer: "UIlayer";
    //
    protected labelSize: number;
    protected isPauseMenuHidden: boolean;
    protected ButtonSelection;
    // relative path to the assets
    protected pathToItems = `shadowMaze_assets/data/items/`;
    protected pathToSprite = `shadowMaze_assets/sprites/`;
    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {
            ...options, physics: {
                // groupNames: [PhysicsGroups.PLAYER],
            }
        });
        this.labelSize = 24;

        this.isPauseMenuHidden = true;
        this.ButtonSelection = MainMenuButtonEvent;
        for (const layerName of this.layerNames) {
            this[layerName] = layerName;
        }
        this.init();
    }
    protected init() {
        this.center = this.getViewport().getCenter();
        this.initSubscribe();
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(1000)
        this.isLevelEndEnetered = false;
        this.initUI();
        this.loadScene();
    }
    // protected initObjectPools(): void {
    //     // Init bubble object pool


    //     // Init the object pool of lasers
    //     this.lasers = new Array(4);
    //     for (let i = 0; i < this.lasers.length; i++) {
    //       this.lasers[i] = this.add.graphic(GraphicType.RECT, this.mainMenuLayerName, {
    //         position: Vec2.ZERO,
    //         size: Vec2.ZERO,
    //       });
    //       this.lasers[i].useCustomShader(LaserShaderType.KEY);
    //       this.lasers[i].color = Color.RED;
    //       this.lasers[i].visible = false;
    //       this.lasers[i].addAI(LaserBehavior, { src: Vec2.ZERO, dst: Vec2.ZERO });
    //     }
    //   }
    protected loadGameItems(key: string) {
        this.load.object(key, `${this.pathToItems}${key}.json`);
        this.load.image(key, `${this.pathToSprite}${key}.png`);

    }
    protected loadAllGameItems() {
        for (let key of this.gameItemsArray) {
            this.loadGameItems(key);
        }

    }
    protected initAllGameItems() {
        for (let key of this.gameItemsArray) {
            let gameItem = this.load.getObject(key);
            // console.log(this.load.getObject(key))
            const items = new Array<gameItems>(gameItem.position.length);
            for (let i = 0; i < items.length; i++) {
                let sprite = this.add.sprite(key, this.mainMenuLayerName);
                let line = <Line>this.add.graphic(GraphicType.LINE, this.mainMenuLayerName, { start: Vec2.ZERO, end: Vec2.ZERO });
                items[i] = gameItems.create(sprite, line);
                items[i].position.set(gameItem.position[i][0], gameItem.position[i][1]);
                items[i].name = key;
            }
            this.gameItemsMap.set(key, items);
        }
    }
    // protected initLaserGun(key:string){
    //     let gameItem = this.load.getObject(key);
    //     this.laserGuns = new Array<gameItems>(gameItem.items.length);
    //     for (let i = 0; i < gameItem.items.length; i++) {
    //         let sprite = this.add.sprite(this.laserGunsKey, this.mainMenuLayerName);
    //         let line = <Line>this.add.graphic(GraphicType.LINE,  this.mainMenuLayerName, {start: Vec2.ZERO, end: Vec2.ZERO});
    //         this.laserGuns[i] = gameItems.create(sprite, line);

    //         this.laserGuns[i].position.set(gameItem.position[i][0], gameItem.position[i][1]);
    //     }
    // }
    public loadScene(): void {
        this.loadAllGameItems();
        // this.loadGameItems(this.laserGunsKey);
        this.load.spritesheet("prince", "shadowMaze_assets/spritesheets/prince.json");
        // Load the tilemap
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");
        // this.load.object("door", "shadowMaze_assets/data/items/door.json");
        // this.load.image("door", "shadowMaze_assets/sprites/door.png");

        // this.initLaserGun();
        // console.log("loaded")
        // this.load.shader(
        //     BubbleShaderType.KEY,
        //     BubbleShaderType.VSHADER,
        //     BubbleShaderType.FSHADER
        //   );
        //   // Load in the shader for laser.
        //   this.load.shader(
        //     LaserShaderType.KEY,
        //     LaserShaderType.VSHADER,
        //     LaserShaderType.FSHADER
        //   );
    }
    protected buildLightShape() {
        const lightDistance = 1 * this.labelSize;
        const centerToEdge = new Vec2(lightDistance, lightDistance);
        this.lightShape = new AABB(this.player.position, centerToEdge);
        return this.lightShape;
    }

    // public getMoveDir(): Vec2 { 
    //     let dir: Vec2 = Vec2.ZERO;
    //     dir.y = (Input.isPressed(PlayerInput.MOVE_UP) ? -1 : 0) + (Input.isPressed(PlayerInput.MOVE_DOWN) ? 1 : 0);
    // 	dir.x = (Input.isPressed(PlayerInput.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(PlayerInput.MOVE_RIGHT) ? 1 : 0);
    //     return dir.normalize();
    // }
    protected initSubscribe() {
        this.receiver.subscribe(PlayerEvents.PLAYER_ENTERED_LEVEL_END)
        this.initgameItemEventSubscribe();
    }
    protected initgameItemEventSubscribe() {
        for (let gameItemKey of GameItemsArray) {
            this.receiver.subscribe(gameItemKey);
        }
    }
    protected initUI(): void {
        // UILayer stuff
        this.addUILayer(GAMELayers.UIlayer);

        // HP Label
        let healthTextOption = {
            position: this.healthTextLablePosition,
            text: "   HP    ",
            layerName: GAMELayers.UIlayer,
            fontSize: 24,
            backgroundColor: Color.TRANSPARENT,
            size:new Vec2(300, 30),
        }
        this.addLabel(healthTextOption);
        // energy text Label
        let energyTextOption = {
            position: this.energyTextLablePosition,
            text: "         ENERGY",
            layerName: GAMELayers.UIlayer,
            fontSize: 24,
            backgroundColor: Color.TRANSPARENT,
            size:new Vec2(300, 30),
        }
        this.addLabel(energyTextOption);
        // HealthBar label
        this.healthBar = <Label>this.add.uiElement(
            UIElementType.LABEL,
            GAMELayers.UIlayer,
            {
                position: this.healthLabelPosition,
                text: "",
            }
        );

        this.healthBar.size = new Vec2(300, 25);
        this.healthBar.backgroundColor = Color.GREEN;

        //energyBar
        this.energyBar = <Label>this.add.uiElement(UIElementType.LABEL, GAMELayers.UIlayer, {
            position: this.energyBarLabelPosition,
            text: "",
        });
        this.energyBar.size = new Vec2(300, 25);
        this.energyBar.backgroundColor = Color.CYAN;

        // // HealthBar Border
        // this.healthBarBg = <Label>this.add.uiElement(
        //     UIElementType.LABEL,
        //     GAMELayers.UIlayer,
        //     {
        //         position: new Vec2(225, 50),
        //         text: "",
        //     }
        // );
        // this.healthBarBg.size = new Vec2(300, 25);
        // this.healthBarBg.borderColor = Color.BLACK;

        // AirBar Border
        // this.energyBarBg = <Label>this.add.uiElement(
        //     UIElementType.LABEL,
        //     GAMELayers.UIlayer,
        //     {
        //         position: new Vec2(225, 100),
        //         text: "",
        //     }
        // );
        // this.energyBarBg.size = new Vec2(300, 25);
        // this.energyBarBg.borderColor = Color.BLACK;
    }
    protected addLabel(option: Record<string, any>) {
        const newTextLabel = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName || this.mainMenuLayerName, option);
        if (option.size)
            newTextLabel.size.set(option.size.x, option.size.y);
        else
            newTextLabel.size.set(300, 100);
        newTextLabel.borderWidth = 2;
        newTextLabel.setTextColor(option.textColor || Color.WHITE)
        newTextLabel.setFont(option.font || "Arial");
        newTextLabel.setFontSize(option.fontSize || 28);
        newTextLabel.setBackgroundColor(option.backgroundColor || Color.BLACK)
        if (option.align)
            newTextLabel.setHAlign(option.align)
    }
    protected handleEnteredLevelEnd(): void {
        if (!this.isLevelEndEnetered) {
            this.isLevelEndEnetered = true;
            this.addLevelEndLabel();
            this.levelEndLabel.tweens.play("slideIn");
        }
    }
    protected initializeLevelEnds() {

        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, this.mainMenuLayerName, { position: this.levelEndPosition, size: this.levelEndHalfSize });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        // this.levelEndArea.setTrigger(PhysicsGroups.PLAYER, PlayerEvents.PLAYER_ENTERED_LEVEL_END, null);
        // this.levelEndArea.setTrigger(HW3PhysicsGroups.PLAYER, HW3Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = this.levelEndColor;

    }
    protected addLevelEndLabel() {
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, this.UIlayer, { position: new Vec2(500, 100), text: "Level Complete" });
        this.levelEndLabel.size.set(1500, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";

        // console.log(this.levelEndLabel)
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: 0,
                    end: 150,
                    ease: EaseFunctionType.OUT_SINE
                }
            ],
            onEnd: PlayerEvents.LEVEL_END,
        });
    }
    protected addButtons(option: Record<string, any>) {
        const newButton = <Label>this.add.uiElement(UIElementType.BUTTON, option.layerName || this.mainMenuLayerName, option);
        newButton.size.set(50, 50);
        if (option.size) newButton.size.set(option.size.x, option.size.y);
        newButton.borderWidth = 0;
        newButton.borderColor = Color.TRANSPARENT;
        newButton.setBackgroundColor(option.backgroundColor || Color.BLACK)
        newButton.setTextColor(option.textColor || Color.WHITE)
        newButton.onClickEventId = option.buttonName;
        newButton.setFontSize(50);
        this.receiver.subscribe(option.buttonName);
    }
    protected addControlTextLayer(option: Record<string, any>) {
        let position = option.position;
        let yInitPosition = position.y - 400;
        for (let text of controlTextArray) {
            yInitPosition += option.margin
            let textOption = {
                position: new Vec2(position.x - 150, yInitPosition),
                text: "• " + text,
                align: true,
                layerName: option.layerName,
                fontSize: option.fontSize,
                backgroundColor: Color.TRANSPARENT,
            }
            this.addLabel(textOption);
        }
    }


    protected addBackButon(position: Vec2) {
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(position.x - 470, position.y - 470),
            text: leftArrow,
            buttonName: BackButtonEvent.BACK,
        }
        this.addButtons(buttonOption);
    }
    protected addHelpTextLayer(option: Record<string, any>) {
        let position = option.position;
        let yInitPosition = position.y - 400;
        const newText = helpTextArray;
        for (let text of newText) {
            yInitPosition += option.margin
            let textOption = {
                position: new Vec2(position.x - 320, yInitPosition),
                text: text,
                align: "left",
                backgroundColor: Color.TRANSPARENT,
                fontSize: option.fontSize,
            }
            this.addLabel(textOption);
        }
    }
    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            const gameEvent = this.receiver.getNextEvent()
            this.handleEvent(gameEvent);
        }
        if (Input.isKeyJustPressed("escape")) {
            this.emitter.fireEvent(this.ButtonSelection.PAUSE)
        }
        this.updateLabel();
        this.isLevelEnd();
        // this.displayVec2(this.getMoveDir());
        this.isPlayerAtItems();
    }
    public isLevelEnd() {
        const label = this.levelEndArea;
        if (Math.abs(label.position.x - this.player.position.x) <= 3 && (Math.abs(label.position.y - this.player.position.y) <= 3)) {
            if (!this.isLevelEndEnetered)
                this.emitter.fireEvent(PlayerEvents.PLAYER_ENTERED_LEVEL_END)
        }
    }
    protected handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch (event.type) {
            case BackButtonEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }

            // case gameItemsArray[]
            // case PlayerEvents.PLAYER_ENTERED_LEVEL_END:{
            //     console.log("levelend")
            //     this.handleEnteredLevelEnd();
            //     // this.viewport.setZoomLevel(1);
            //     // this.sceneManager.changeToScene(SelectLevelMenuScene);
            // }
            // case PlayerEvents.LEVEL_END:{
            //     console.log("level finished")

            // }
        }
        this.handleGameItemsEvent(event);
    }
    protected handleGameItemsEvent(event: GameEvent) {
        console.log(event.type)
        switch (event.type) {
            case GameItems.LASER_GUNS: {
                this.lightDuration = !this.lightDuration;
                break;
            }
            case GameItems.DOOR: {
                this.showLevelEndPosition();
            }
            case GameItems.HEALTH_PACKS: {

            }
        }
    }
    protected showLevelEndPosition() {
        const label = <Array<Label>>this.getSceneGraph().getNodesAt(this.levelEndPosition);
        label.forEach(label => { this.updateColor(label) })
    }
    public initCurrLabel() {
        this.currLabels = <Array<Label>>this.getSceneGraph().getNodesAt(this.player.position)
        this.currLabels.forEach(label => { this.updateColor(label) })
    }

    public initBlackScreen() {
        const len = this.wallSize / this.labelSize;
        for (let i = 0; i <= 2 * len; i++) {
            for (let j = 0; j <= 2 * len; j++) {
                let x = 0.5 * i * this.labelSize;
                let y = 0.5 * j * this.labelSize;
                let options = {
                    position: new Vec2(x, y),
                    text: "",
                }
                this.addBlackLabel(options);
            }
        }
    }
    public addBlackLabel(options: Record<string, any>) {
        const label = <Label>this.add.uiElement(UIElementType.LABEL, this.gameMenu, options);
        label.size.set(this.labelSize * 2, this.labelSize * 2);
        label.borderWidth = 0;
        label.borderRadius = 0;
        // console.log(label.padding)
        // label.setHAlign("left");
        // label.setVAlign("top");
        label.setFontSize(60)
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.BLACK;
    }
    public updateLabel() {
        this.nextLabels = this.transparentLabels();
        this.currLabels.forEach(label => { this.updateColor(label) })
        this.nextLabels.forEach(label => this.updateColor(label))
        this.currLabels = this.nextLabels;
    }
    public transparentLabels(): Array<Label> {
        let labels: Array<Label>
        if (!this.lightDuration) {
            labels = <Array<Label>>this.getSceneGraph().getNodesAt(this.player.position);
        }
        else {
            // labels = <Array<Label>>this.getSceneGraph().getNodesInRegion(this.lightShape);
            labels = <Array<Label>>this.getSceneGraph().getNodesInRegion(this.lightShape);

        }
        return labels;
    }
    public updateColor(label: Label) {
        if (label.backgroundColor) {
            if (label.backgroundColor.isEqual(Color.BLACK)) {
                label.backgroundColor = Color.TRANSPARENT;
            }
            else if (label.backgroundColor.isEqual(Color.TRANSPARENT)) {
                label.backgroundColor = Color.BLACK;
            }
        }
    }
    protected initLayers(): void {
        for (let i = 0; i < this.layerNames.length; i++) {
            const layerName = this.layerNames[i];
            this.addLayer(this[layerName], i);
        }
        // this.getLayer(this.pauseButtonLayerName).setDepth(1);
        // this.getLayer(this.emptyMenuLayerName).setDepth(2);
        // this.getLayer(this.pauseMenuLayerName).setDepth(3);
        // this.addLayer(this.UIlayer, 10);
        this.getLayer(this.emptyMenuLayer).setHidden(this.isPauseMenuHidden);
        this.getLayer(this.pauseMenuLayer).setHidden(this.isPauseMenuHidden);
    }
    protected handleHealthChange(currentHealth: number, maxHealth: number): void {
        let unit = this.healthBarBg.size.x / maxHealth;
    
        this.healthBar.size.set(
          this.healthBarBg.size.x - unit * (maxHealth - currentHealth),
          this.healthBarBg.size.y
        );
        this.healthBar.position.set(
          this.healthBarBg.position.x - (unit / 2) * (maxHealth - currentHealth),
          this.healthBarBg.position.y
        );
    
        this.healthBar.backgroundColor =
          currentHealth < (maxHealth * 1) / 4
            ? Color.RED
            : currentHealth < (maxHealth * 3) / 4
            ? Color.YELLOW
            : Color.GREEN;
      }
    protected showPauseMenu(flag: boolean): void {
        this.getLayer(this.emptyMenuLayer).setHidden(flag);
        this.getLayer(this.pauseMenuLayer).setHidden(flag);
    }
    protected isPlayerAtItems() {

        // this.laserGuns.forEach(laser=>{
        //     if(laser.visible  && laser.position.distanceTo(this.player.position)<10){
        //         console.log("got items");

        //         laser.visible = false;
        //         this.lightDuration = true;
        //     }
        // })
        for (const gameItems of this.gameItemsMap.values()) {
            // console.log(value);
            gameItems.forEach(gameItem => {
                if (gameItem.visible && gameItem.position.distanceTo(this.player.position) < 10) {
                    gameItem.visible = false;
                    this.emitter.fireEvent(gameItem.name);
                }
            })
        }
    }
    protected displayVec2(position: Vec2) {
        console.log(position.x + "      " + position.y)

    }
    /**
     * Initializes the player in the scene
     */
    protected initializePlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "prince", this.gameMenu);
        this.player = player
        player.position.set(this.playerInitPosition.x, this.playerInitPosition.y);
        player.battleGroup = 2;
        player.health = 10;
        player.maxHealth = 10;
        player.scale = new Vec2(2, 2);
        // Give the player physics
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
        // player.setGroup(PhysicsGroups.PLAYER);
        this.buildLightShape();
        this.initCurrLabel();
        // Give the player a healthbar

        // Give the player PlayerAI
        player.addAI(PlayerAI);

        // Start the player in the "IDLE" animation
        player.animation.play("IDLE");
        this.viewport.follow(player);

    }
    public initControlTextLayer() {
        let controlTextOption = {
            position: this.viewport.getCenter(),
            margin: 40,
            layerName: this.controlTextLayer
        }
        this.addControlTextLayer(controlTextOption)
    }
    public initHelpTextLayer() {
        let helpTextOption = {
            position: new Vec2(450, 450),
            margin: 40,
            layerName: this.helpTextLayer,
        }
        this.addHelpTextLayer(helpTextOption)
    }
    public initPauseMenuLayer() {
        const pauseSign = "\u23F8";
        let buttonOption = {
            position: new Vec2(475, 20),
            text: pauseSign,
            layerName: this.pauseButtonLayer,
            buttName: this.ButtonSelection.PAUSE,
            backgroundColor: Color.TRANSPARENT,
        }
        this.addButtons(buttonOption);
        let emptyMenuOption = {
            position: this.center,
            text: "",
            size: new Vec2(300, 450),
            layerName: this.emptyMenuLayer,
            backgroundColor: Color.WHITE,
        }
        this.addLabel(emptyMenuOption);
        let pauseTextOption = {
            position: new Vec2(this.center.x, this.center.y - 100),
            text: "Paused",
            size: new Vec2(100, 30),
            layerName: this.pauseMenuLayer,
            backgroundColor: Color.WHITE,
            textColor: Color.BLACK,
        }
        this.addLabel(pauseTextOption);
        let positionY = this.center.y - 60;
        for (let buttonName in this.ButtonSelection) {
            if (buttonName == "Select_levels")
                buttonName = "Select levels"
            let buttonOption1 = {
                position: new Vec2(this.center.x, positionY),
                text: buttonName,
                layerName: this.pauseMenuLayer,
                buttonName: buttonName,
                backgroundColor: Color.PURPLE,
                size: new Vec2(300, 50),
                textColor: Color.WHITE,
            }
            this.addButtons(buttonOption1);
            positionY = positionY + 40;
        }
    }
}