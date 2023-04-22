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
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { PlayerEvents } from "../ProjectEvents";

import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";
import { BattlerEvent } from "../ProjectEvents";

// scene import
// import IntroLevelScene from "./IntroLevelScene";
// import StartScene from "./StartScene";
// import CheatCodeMenuScene from "./CheatCodeMenuScene";

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
import { MainMenuButtonEvent, PauseButtonEvent } from "../CustomizedButton";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import PlayerAI from "../AI/Player/PlayerAI";
import { GameItemsArray, GameItems } from "../GameItemsArray";
import { PlayerInput } from "../AI/Player/PlayerController";
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGuns";
import { ACTIONTYPE } from "../ActionType";
import { GameLayers } from "../GameLayers";
import { ItemButtonArray as ItemButtonKeyArray } from "../Controls";
import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import Navmesh from "../../Wolfie2D/Pathfinding/Navmesh";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import AstarStrategy from "../Pathfinding/AstarStrategy";
import NPCActor from "../Actors/NPCActor";
import { MenuState } from "../MenuState";
export default abstract class ProjectScene extends Scene {
    protected walls: OrthogonalTilemap;
    protected path: NavigationPath;
    //button event
    protected PauseButtonEvent = PauseButtonEvent;
    protected wallSize: number;
    protected emptyString = "";
    protected action = "action";
    protected backgroundImage: Sprite;
    protected GameLayers = GameLayers;
    protected backButtonPosition = new Vec2(50, 50);


    //Level end
    protected center: Vec2;
    protected levelEndArea: Rect;
    protected levelEndLabel: Label;
    protected playerInitPosition = new Vec2(15, 300);
    protected levelEndPosition = new Vec2(28, 250);
    protected levelEndHalfSize = new Vec2(25, 25)
    protected levelEndColor = new Color(255, 0, 0, 0.5);
    protected levelEndTimer: Timer;
    protected levelTransitionScreen: Rect;
    protected isLevelEndEnetered: boolean;
    //player 
    protected player: PlayerActor;
    protected laserGuns: Array<gameItems>;
    protected door: Sprite
    protected backgroundImageKey: string;
    //ui
    // Health labels
    protected healthLabel: Label;
    protected healthBar: Label;
    protected healthBarBg: Label;
    //oprotectedy labels
    protected energyLabel: Label;
    protected energyBar: Label;
    protected energyBarBg: Label;
    protected textInitPositionX = 10;
    protected textInitPositionY = 15;
    protected offSet = 65;
    protected healthTextLablePosition = new Vec2(this.textInitPositionX, this.textInitPositionY * 1);
    protected healthLabelPosition = new Vec2(this.textInitPositionX + this.offSet, this.textInitPositionY * 2);
    protected energyTextLablePosition = new Vec2(this.textInitPositionX, this.textInitPositionY * 3);
    protected energyBarLabelPosition = new Vec2(this.textInitPositionX + this.offSet, this.textInitPositionY * 4);

    //items to game 
    protected gameItemsArray = GameItemsArray;
    protected gameItemsMap = new Map<string, Array<gameItems>>();
    protected laserGunsKey = "laserGuns";
    protected lightShape: AABB;
    protected lightDuration: boolean;
    protected inventorySlotsMap = new Map<number, Map<Vec2, Array<gameItems>>>();
    // protected test = new Map<number,Vec2>()
    //ui display
    protected currLabels: Array<Label>;
    protected nextLabels: Array<Label>;


    protected labelSize: number;
    protected isPauseMenuHidden: boolean;
    protected MenuCurentState: MenuState;
    // relative path to the assets
    protected pathToItems = `shadowMaze_assets/data/items/`;
    protected pathToSprite = `shadowMaze_assets/sprites/`;
    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;

    //Li
    protected battlers: (Battler & Actor)[];
    protected BattlerEvent = BattlerEvent;
    protected option: Record<string, any>;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {
            ...options, physics: {
                // groupNames: [PhysicsGroups.PLAYER],
            }
        });
        this.labelSize = 32;
        this.isPauseMenuHidden = true;
        this.MenuCurentState = MenuState.HIDDEN;
        this.option = {
            isAstarChecked: false,
            isfogOfWarChecked: false,
        }
        // this.ButtonSelection = MainMenuButtonEvent;
        // for (const layerName of this.layerNames) {
        //     this[layerName] = layerName;
        // }

        this.battlers = new Array<Battler & Actor>();

    }
    public initScene(option: Record<string, any>): void {
        if (option !== undefined)
            this.option = option

    }
    protected initLevelScene() {
        this.center = this.getViewport().getCenter();
        this.initSubscribe();
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(1000)
        this.isLevelEndEnetered = false;
        this.initLayers();
        this.initUI();
    }
    protected loadGameItems(key: string) {
        this.load.object(key, `${this.pathToItems}${key}.json`);
        this.load.image(key, `${this.pathToSprite}${key}.png`);

    }
    protected loadAllGameItems() {
        for (let key of this.gameItemsArray) {
            this.loadGameItems(key);
        }

    }
    protected initInventorySlotsMap() {
        const inventorySlotsPosition = this.load.getObject(GameItems.INVENTORYSLOT)
        let i = 1;
        for (let position of inventorySlotsPosition.position) {
            const postionItemsMap = new Map<Vec2, Array<gameItems>>();
            postionItemsMap.set(position, []);
            this.inventorySlotsMap.set(i, postionItemsMap);
            i++;
        }
    }
    protected initAllGameItems() {
        for (let key of this.gameItemsArray) {
            let gameItem = this.load.getObject(key);            const items = new Array<gameItems>(gameItem.position.length);
            for (let i = 0; i < items.length; i++) {
                let sprite, line;
                if (key === "inventorySlot") {
                    sprite = this.add.sprite(key, this.GameLayers.BEFORE_BASE);
                    line = <Line>this.add.graphic(GraphicType.LINE, this.GameLayers.BEFORE_BASE, { start: Vec2.ZERO, end: Vec2.ZERO });
                    let numOfSlots = <Label>this.add.uiElement(UIElementType.LABEL, this.GameLayers.BEFORE_BASE, { position: new Vec2(gameItem.position[i][0] - 17, gameItem.position[i][1]), text: `${i + 1}` });
                    numOfSlots.fontSize = 24;
                    numOfSlots.font = "Courier";
                    numOfSlots.textColor = Color.BLACK;
                    // numOfSlots.position.set(gameItem.position[i][0]-100, gameItem.position[i][1])
                }
                else {
                    sprite = this.add.sprite(key, this.GameLayers.BASE);
                    line = <Line>this.add.graphic(GraphicType.LINE, this.GameLayers.BASE, { start: Vec2.ZERO, end: Vec2.ZERO });
                }
                items[i] = gameItems.create(sprite, line);
                items[i].position.set(gameItem.position[i][0], gameItem.position[i][1]);
                items[i].name = key;
            }
            this.gameItemsMap.set(key, items);
        }
    }
    public startScene(): void {
        let tilemapLayers = this.add.tilemap("level");
        this.walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];
        this.wallSize = this.walls.size.x;
        // Set the viewport bounds to the tilemap
        let tilemapSize: Vec2 = this.walls.size;
        this.viewport.setBounds(0, 0, tilemapSize.x, tilemapSize.y);
        this.viewport.setZoomLevel(2);
        // this.initLayers();
        this.initPlayer()
        this.initInventorySlotsMap();
        // this.initUI();
        // create screen first 
        if (!this.option.isfogOfWarChecked)
            // this.initFogOfWar();


            this.center = this.viewport.getHalfSize();
        this.initPauseMenuLayer();
        this.initializeLevelEnds();
        this.initAllGameItems();
        this.initializeNPCs();
        // this.addLevelEndLabel();
        // this.levelEndLabel.tweens.play("slideIn");

    }

    protected initializeNPCs(): void {
        let red = this.load.getObject("red");
        for (let i = 0; i < red.healers.length; i++) {
            let npc = this.add.animatedSprite(NPCActor, "RedHealer", this.GameLayers.BASE);
            npc.position.set(red.healers[i][0], red.healers[i][1]);
            npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);

            // npc.addAI(HealerBehavior);
            this.battlers.push(npc);
            npc.animation.play("IDLE");
        }
    }

    public loadScene(): void {
        this.loadAllGameItems();
        // this.loadGameItems(this.laserGunsKey);
        this.load.spritesheet("prince", "shadowMaze_assets/spritesheets/prince.json");


        // Load the tilemap
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");

    }
    protected buildLightShape() {
        const lightDistance = 1 * this.labelSize;
        const centerToEdge = new Vec2(lightDistance, lightDistance);
        this.lightShape = new AABB(this.player.position, centerToEdge);
        return this.lightShape;
    }


    protected initSubscribe() {
        this.receiver.subscribe(PlayerEvents.PLAYER_ENTERED_LEVEL_END);
        this.receiver.subscribe(PlayerEvents.LEVEL_END);
        this.initBattlerEventSubscribe();
        this.initGameItemEventSubscribe();
    }
    protected initBattlerEventSubscribe() {
        for (const event of Object.values(BattlerEvent)) {
            this.receiver.subscribe(event);
        }
    }
    protected initGameItemEventSubscribe() {
        for (let gameItemKey of GameItemsArray) {
            this.receiver.subscribe(gameItemKey);
        }
    }

    protected initUI(): void {
        // UILayer stuff
        // this.addUILayer(GAMELayers.UIlayer);
        // HP Label
        let healthTextOption = {
            position: this.healthTextLablePosition,
            text: "   HP    ",
            layerName: this.GameLayers.BASE,
            fontSize: 24,
            backgroundColor: Color.ALMOST_TRANSPARENT,
            size: new Vec2(300, 30),
        }
        this.addLabel(healthTextOption);
        // energy text Label
        let energyTextOption = {
            position: this.energyTextLablePosition,
            text: "         ENERGY",
            layerName: this.GameLayers.BASE,
            fontSize: 24,
            backgroundColor: Color.ALMOST_TRANSPARENT,
            size: new Vec2(300, 30),
        }
        this.addLabel(energyTextOption);
        // HealthBar label
        this.healthBar = <Label>this.add.uiElement(
            UIElementType.LABEL,
            this.GameLayers.BASE,
            {
                position: this.healthLabelPosition,
                text: "",
            }
        );
        this.healthBar.size = new Vec2(300, 25);
        this.healthBar.backgroundColor = Color.GREEN;

        //energyBar
        this.energyBar = <Label>this.add.uiElement(UIElementType.LABEL, this.GameLayers.BASE, {
            position: this.energyBarLabelPosition,
            text: "",
        });
        this.energyBar.size = new Vec2(300, 25);
        this.energyBar.backgroundColor = Color.CYAN;

        // // HealthBar Border
        this.healthBarBg = <Label>this.add.uiElement(
            UIElementType.LABEL,
            this.GameLayers.BASE,
            {
                position: this.healthLabelPosition,
                text: "",
            }
        );
        this.healthBarBg.size = new Vec2(300, 25);
        this.healthBarBg.borderColor = Color.BLACK;

        // energy Border
        this.energyBarBg = <Label>this.add.uiElement(
            UIElementType.LABEL,
            this.GameLayers.BASE,
            {
                position: this.energyBarLabelPosition,
                text: "",
            }
        );
        this.energyBarBg.size = new Vec2(300, 25);
        this.energyBarBg.borderColor = Color.BLACK;
    }
    protected addLabel(option: Record<string, any>) {
        const newTextLabel = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName || this.GameLayers.BASE, option);
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
        return newTextLabel;
    }
    protected handleEnteredLevelEnd(): void {
        if (!this.isLevelEndEnetered) {
            this.isLevelEndEnetered = true;
            this.addLevelEndLabel();
            this.levelEndLabel.tweens.play("slideIn");

        }

    }
    protected initializeLevelEnds() {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, this.GameLayers.BASE, { position: this.levelEndPosition, size: this.levelEndHalfSize });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        // this.levelEndArea.setTrigger(PhysicsGroups.PLAYER, PlayerEvents.PLAYER_ENTERED_LEVEL_END, null);
        // this.levelEndArea.setTrigger(HW3PhysicsGroups.PLAYER, HW3Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = this.levelEndColor;

    }
    protected addLevelEndLabel() {
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.UI, { position: new Vec2(20, 96), text: "Level Complete" });
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: 0,
                    end: 270,
                    ease: EaseFunctionType.OUT_SINE
                }
            ],
            onEnd: PlayerEvents.LEVEL_END,
        });
    }
    protected addButtons(option: Record<string, any>) {
        const newButton = <Label>this.add.uiElement(UIElementType.BUTTON, option.layerName || this.GameLayers.BASE, option);
        newButton.size.set(50, 50);
        if (option.size) newButton.size.set(option.size.x, option.size.y);
        newButton.setBorderWidth(option.borderWidth || 0);
        newButton.setBorderColor(option.BorderColor || Color.TRANSPARENT);
        newButton.setBackgroundColor(option.backgroundColor || Color.BLACK)
        newButton.setTextColor(option.textColor || Color.WHITE)
        newButton.onClickEventId = option.buttonName;
        newButton.setFontSize(50);
        this.receiver.subscribe(option.buttonName);
        return newButton;
    }

    protected addBackButon(position: Vec2) {
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(position.x, position.y),
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
                layerName: GameLayers.HELP_TEXT_MENU,
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
            this.emitter.fireEvent(PauseButtonEvent.PAUSE);
        }

        if (this.option.isAstarChecked) {
            this.player.moveOnPath(1, this.path)
        }

        this.updateLabel();
        this.isLevelEnd();
        this.isPlayerAtItems();
        this.isPlayerAttacking();
        this.isUseItem();

    }


    protected isUseItem() {
        ItemButtonKeyArray.forEach(key => {
            if (Input.isKeyJustPressed(key)) {
                const positionItemMap = this.inventorySlotsMap.get(parseInt(key))
                for (let [key, value] of positionItemMap.entries()) {
                    if (value.length != 0) {
                        const gameItem = value.pop();
                        this.emitter.fireEvent(gameItem.name, { action: ACTIONTYPE.USE, gameItem: gameItem });
                    }
                }
            }
        })
    }
    public isLevelEnd() {
        const label = this.levelEndArea;
        if (Math.abs(label.position.x - this.player.position.x) <= 3 && (Math.abs(label.position.y - this.player.position.y) <= 3)) {
            if (!this.isLevelEndEnetered)
                this.emitter.fireEvent(PlayerEvents.PLAYER_ENTERED_LEVEL_END)
        }
    }
    protected handleEvent(event: GameEvent): void {

        if (event.data.get(this.action) == ACTIONTYPE.PICK)
            this.handlePickGameItemsEvent(event);
        if (event.data.get(this.action) == ACTIONTYPE.USE)
            this.handleUseGameItemsEvent(event);
        this.handleBattlerEvents(event);
    }
    protected handleBattlerEvents(event: GameEvent) {
        switch (event.type) {
            case BattlerEvent.MONSTER_DEAD: {
                this.handleBattlerKilled(event);
                break;
            }
            case BattlerEvent.PRINCE_HIT: {
                if (!this.player._ai["isInvincible"]) {
                    this.player._ai["currentHealth"]--;
                    this.handleHealthChange(
                        this.player._ai["currentHealth"],
                        this.player._ai["maxHealth"]
                    );
                }
                break;
            }
            case BattlerEvent.PRINCE_DEAD: {
                setTimeout(() => {
                    this.viewport.setZoomLevel(1);
                    this.sceneManager.changeToScene(MainMenu, this.option);
                }, 2000)
            }
        }
    }
    protected handleBattlerKilled(event: GameEvent) {
        let id: number = event.data.get("id");
        let battler = this.battlers.find(b => b.id === id);
        if (battler) {
            battler.battlerActive = false;
        }
    }
    protected handleUseGameItemsEvent(event: GameEvent) {
        this.RemoveItemFromInventory(event)
        switch (event.type) {
            case GameItems.LASER_GUNS: {
                this.lightDuration = !this.lightDuration;
                break;
            }
            case GameItems.DOOR: {
                this.showLevelEndPosition();
                break;
            }
            case GameItems.HEALTH_PACKS: {

            }
        }
    }
    protected RemoveItemFromInventory(event: GameEvent) {
        const gameItem = event.data.get("gameItem")
        gameItem.visible = false;
    }
    protected handleMenuStateChange() {
        switch (this.MenuCurentState) {
            case MenuState.HIDDEN: {
                this.MenuCurentState = MenuState.SHOWN;
                break;
            }
            case MenuState.SHOWN: {
                this.MenuCurentState = MenuState.HIDDEN;
                break;
            }
            case MenuState.CONTROL_TEXT_MENU_SHOWN: {
                this.MenuCurentState = MenuState.SHOWN;
                break;
            }
            case MenuState.HELP_TEXT_MENU_SHOWN: {
                this.MenuCurentState = MenuState.SHOWN;
                break;
            }
        }
    }
    protected handleMenuShown() {
        switch (this.MenuCurentState) {
            case MenuState.HIDDEN: {
                this.setContainerAndMenu(GameLayers.PAUSE_MENU_CONTAINER, GameLayers.PAUSE_MENU, true)
                break;
            }
            case MenuState.SHOWN: {
                this.setContainerAndMenu(GameLayers.PAUSE_MENU_CONTAINER, GameLayers.PAUSE_MENU, false)
                this.setContainerAndMenu(GameLayers.CONTROL_TEXT_MENU_CONTAINER, GameLayers.CONTROL_TEXT_MENU, true)
                this.setContainerAndMenu(GameLayers.HELP_TEXT_MENU_CONTAINER, GameLayers.HELP_TEXT_MENU, true)
                break;
            }
            case MenuState.CONTROL_TEXT_MENU_SHOWN: {
                this.setContainerAndMenu(GameLayers.CONTROL_TEXT_MENU_CONTAINER, GameLayers.CONTROL_TEXT_MENU, false)
                break;
            }
            case MenuState.HELP_TEXT_MENU_SHOWN: {
                this.setContainerAndMenu(GameLayers.HELP_TEXT_MENU_CONTAINER, GameLayers.HELP_TEXT_MENU, false)
                break;
            }
        }
    }
    protected setContainerAndMenu(container: string, menu: string, flag: boolean,) {
        this.getLayer(container).setHidden(flag);
        this.getLayer(menu).setHidden(flag);
    }
    protected handlePickGameItemsEvent(event: GameEvent) {
        this.putItemToInventory(event)
    }
    protected putItemToInventory(event: GameEvent) {
        const gameItem = <LaserGun>event.data.get("gameItem");
        for (let postionItemsMap of Array.from(this.inventorySlotsMap.values())) {
            for (const [key, value] of postionItemsMap) {
                if (value.length === 0) {
                    gameItem.position.set(key[0], key[1]);
                    postionItemsMap.set(key, [gameItem]);

                    return;
                }
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

    public initFogOfWar() {
        const len = this.wallSize / this.labelSize;
        for (let i = 0; i <= 2 * len; i++) {
            for (let j = 6; j <= 2 * len; j++) {
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
        const label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.FOG_OF_WAR, options);
        label.size.set(this.labelSize * 2, this.labelSize * 2);
        label.borderWidth = 0;
        label.borderRadius = 0;
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
        let depth = 1;
        for (const layer in GameLayers) {
            this.addLayer(layer, depth);
            depth++;
        }
        this.setContainerAndMenu(GameLayers.PAUSE_MENU_CONTAINER, GameLayers.PAUSE_MENU, true);
        this.setContainerAndMenu(GameLayers.CONTROL_TEXT_MENU_CONTAINER, GameLayers.CONTROL_TEXT_MENU, true)
        this.setContainerAndMenu(GameLayers.HELP_TEXT_MENU_CONTAINER, GameLayers.HELP_TEXT_MENU, true)


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


    protected isPlayerAttacking() {
        let midpoint = null;
        switch (this.player.rotation) {
            case 0:
                midpoint = new Vec2(this.player.position.x, this.player.position.y - 15);
                break;
            case 3.15:
                midpoint = new Vec2(this.player.position.x, this.player.position.y + 15);
                break;
            case 1.15:
                midpoint = new Vec2(this.player.position.x - 15, this.player.position.y);
                break;
            case 4.75:
                midpoint = new Vec2(this.player.position.x + 15, this.player.position.y);
                break;
            case 5.25:
                midpoint = new Vec2(this.player.position.x + 10, this.player.position.y - 10);
                break;
            case 0.75:
                midpoint = new Vec2(this.player.position.x - 10, this.player.position.y - 10);
                break;
            case 3.75:
                midpoint = new Vec2(this.player.position.x + 10, this.player.position.y + 10);
                break;
            case 2.25:
                midpoint = new Vec2(this.player.position.x - 10, this.player.position.y + 10);
                break;
            default:
                midpoint = this.player.position;
                break;
        }
        for (const battler of this.battlers) {
            if (battler.battlerActive && battler.position.distanceTo(midpoint) <= 15 && this.player.animation.isPlaying("ATTACKING")) {
                this.emitter.fireEvent(BattlerEvent.MONSTER_DEAD, { id: battler.id });
            }
            if (battler.battlerActive && battler.position.distanceTo(this.player.position) < 10) {
                this.emitter.fireEvent(BattlerEvent.PRINCE_HIT);
                // this.emitter.fireEvent(BattlerEvent.BATTLER_KILLED, {id: battler.id});
            }
        }
    }

    protected isPlayerAtItems() {
        for (const gameItems of this.gameItemsMap.values()) {
            gameItems.forEach(gameItem => {
                if (gameItem.visible && gameItem.position.distanceTo(this.player.position) < 10) {
                    // gameItem.visible = false;
                    this.emitter.fireEvent(gameItem.name, { action: ACTIONTYPE.PICK, gameItem: gameItem });
                }
            })
        }
    }
    /**
     * Initializes the player in the scene
     */
    protected initPlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "prince", this.GameLayers.BASE);
        this.player = player
        player.position.set(this.playerInitPosition.x, this.playerInitPosition.y);
        player.battleGroup = 2;
        player.health = 10;
        player.maxHealth = 10;
        player.scale = new Vec2(2, 2);
        // this.inventoryHud = new InventoryHUD(this, player.inventory, "inventorySlot", {
        //     start: new Vec2(232, 24),
        //     slotLayer: GameLayers.BEFORE_BASE,
        //     padding: 8,
        //     itemLayer: GameLayers.BASE,
        // });

        // Give the player physics
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)), null, true);
        // player.setGroup(PhysicsGroups.PLAYER);
        this.buildLightShape();
        this.initCurrLabel();
        // Give the player a healthbar

        // Give the player PlayerAI
        if (this.option.isAstarChecked) {
            console.log("Auto Pilot");
            this.initAstarMode();
        }
        else {
            player.addAI(PlayerAI);
        }
        // 
        player.animation.play("IDLE");

        // Start the player in the "IDLE" animation


    }
    protected initAstarMode() {
        let navmesh = this.initializeNavmesh(new PositionGraph(), this.walls);
        navmesh.registerStrategy("astar", new AstarStrategy(navmesh));
        this.navManager.addNavigableEntity("navmesh", navmesh);
        navmesh.setStrategy("astar");
        this.player.collisionShape.halfSize.scaleTo(0.25);
        this.path = navmesh.getNavigationPath(this.player.position, this.levelEndPosition);
        console.log(this.path);
    }
    protected displayInGameControls() {
        this.initControlTextLayer();
    }
    public initControlTextLayer() {
        let controlTextOption = {
            position: new Vec2(450, 450),
            margin: 40,
            layerName: GameLayers.CONTROL_TEXT_MENU
        }
        this.addControlTextLayer(controlTextOption)
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
    public initHelpTextLayer() {
        let helpTextOption = {
            position: new Vec2(450, 450),
            margin: 40,
            layerName: GameLayers.CONTROL_TEXT_MENU
        }
        this.addHelpTextLayer(helpTextOption)
    }
    public initPauseMenuLayer() {
        const pauseSign = "\u23F8";
        let pauseSignbuttonOption = {
            position: new Vec2(475, 20),
            text: pauseSign,
            layerName: GameLayers.UI,
            buttonName: PauseButtonEvent.PAUSE,
            backgroundColor: Color.TRANSPARENT,
        }
        this.addButtons(pauseSignbuttonOption);
        let emptyMenuOption = {
            position: this.center,
            text: "",
            size: new Vec2(300, 550),
            layerName: GameLayers.PAUSE_MENU_CONTAINER,
            backgroundColor: Color.WHITE,
        }
        this.addLabel(emptyMenuOption);
        let controlTextMenuOption = {
            position: new Vec2(256, 256),
            text: "",
            size: new Vec2(1000, 1000),
            layerName: this.GameLayers.CONTROL_TEXT_MENU_CONTAINER,
            backgroundColor: new Color(0, 0, 0, 0.99),
        }
        this.addLabel(controlTextMenuOption);
        this.initControlTextLayer()
        let helpTextMenuOption = {
            position: new Vec2(256, 256),
            text: "",
            size: new Vec2(1000, 1000),
            layerName: this.GameLayers.HELP_TEXT_MENU_CONTAINER,
            backgroundColor: new Color(0, 0, 0, 0.99),
        }
        this.addLabel(helpTextMenuOption);
        this.initHelpTextLayer();
        let pauseTextOption = {
            position: new Vec2(this.center.x, this.center.y - 100),
            text: "Paused",
            size: new Vec2(100, 30),
            layerName: GameLayers.PAUSE_MENU,
            backgroundColor: Color.WHITE,
            textColor: Color.BLACK,
        }
        this.addLabel(pauseTextOption);
        let positionY = this.center.y - 60;
        for (let buttonName in MainMenuButtonEvent) {
            if (buttonName == "Select_levels")
                buttonName = "Select levels"
            let buttonOption1 = {
                position: new Vec2(this.center.x, positionY),
                text: buttonName,
                layerName: GameLayers.PAUSE_MENU,
                buttonName: buttonName,
                backgroundColor: Color.PURPLE,
                size: new Vec2(300, 50),
                textColor: Color.WHITE,
            }
            this.addButtons(buttonOption1);
            positionY = positionY + 40;
        }
    }
    protected initializeNavmesh(graph: PositionGraph, walls: OrthogonalTilemap): Navmesh {

        let dim: Vec2 = walls.getDimensions();
        for (let i = 0; i < dim.y; i++) {
            for (let j = 0; j < dim.x; j++) {
                let tile: AABB = walls.getTileCollider(j, i);
                graph.addPositionedNode(tile.center);
            }
        }

        let rc: Vec2;
        for (let i = 0; i < graph.numVertices; i++) {
            rc = walls.getTileColRow(i);
            if (!walls.isTileCollidable(rc.x, rc.y) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), rc.y) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), rc.y) &&
                !walls.isTileCollidable(rc.x, MathUtils.clamp(rc.y - 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(rc.x, MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), MathUtils.clamp(rc.y - 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), MathUtils.clamp(rc.y - 1, 0, dim.y - 1))

            ) {
                // Create edge to the left
                rc = walls.getTileColRow(i + 1);
                if ((i + 1) % dim.x !== 0 && !walls.isTileCollidable(rc.x, rc.y)) {
                    graph.addEdge(i, i + 1);
                    // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + 1)})
                }
                // Create edge below
                rc = walls.getTileColRow(i + dim.x);
                if (i + dim.x < graph.numVertices && !walls.isTileCollidable(rc.x, rc.y)) {
                    graph.addEdge(i, i + dim.x);
                    // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + dim.x)})
                }


            }
        }

        // Set this graph as a navigable entity
        return new Navmesh(graph);

    }
}