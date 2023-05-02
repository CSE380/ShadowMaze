import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Scene from "../../Wolfie2D/Scene/Scene";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import gameItems from "../GameSystems/ItemSystem/Items/LaserGuns";
import Battler from "../GameSystems/BattleSystem/Battler";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../Wolfie2D/Utils/Color";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import { BackButtonEvent } from "../CustomizedButton";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import MainMenu from "./MainMenuScene";
import { helpTextArray, controlTextArray } from "../Text";
import { PlayerStatsArray, PlayerStatsColorArray, PlayerStatsNameArray } from "../PlayerStatsArray";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { PlayerEvents, BattlerEvents, MessageBoxEvents, AllGameEventType } from "../ProjectEvents";

import Actor from "../../Wolfie2D/DataTypes/Interfaces/Actor";


// scene import
// import IntroLevelScene from "./IntroLevelScene";
// import StartScene from "./StartScene";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import { PlayerStatKey } from "../PlayerStatsArray";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import Timer from "../../Wolfie2D/Timing/Timer";
import Input from "../../Wolfie2D/Input/Input";
import PlayerActor from "../Actors/PlayerActor";
import { AnimationType } from "../AI/Player/PlayerStates/PlayerState";
import Line from "../../Wolfie2D/Nodes/Graphics/Line";
import BubbleShaderType from "../Shaders/BubbleShaderType";
import LaserShaderType from "../Shaders/LaserShaderType";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import { MainMenuButtonEvent, PauseButtonEvent } from "../CustomizedButton";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import PlayerAI from "../AI/Player/PlayerAI";
import { AllLevelGameItems, Level1GameItems } from "../GameItems";
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
import MonsterBehavior from "../AI/NPC/NPCBehavior/MonsterBehavior";
import BasicTargetable from "../GameSystems/Targeting/BasicTargetable";
import Position from "../GameSystems/Targeting/Position";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { GameSound } from "../GameSound";
import { GameCharacters } from "../GameCharacters";
//
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import HealthbarHUD from "../GameSystems/HUD/HealthbarHUD";
const enum tweensEffect {
    SLIDEIN = "slideIn",
    SLIDEOUT = "slideOut",
    FADEIN = "fadeIn",
    FADEOUT = "fadeOut",
}
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

    //message box to display invalid action
    // level transtion
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;
    //Level end
    protected center: Vec2;
    protected levelEndArea: Rect;
    protected levelEndTransitionLabel: Label;
    protected messageBoxLabel: Label;
    protected playerInitPosition = new Vec2(260, 235);
    // protected playerInitPosition = new Vec2(360, 180);
    protected levelEndPosition = new Vec2(260, 490);
    protected levelEndHalfSize = new Vec2(25, 25)
    protected levelEndColor = new Color(255, 0, 0, 0.5);
    protected levelEndTimer: Timer;
    protected isLevelEndEnetered: boolean;
    //player 
    protected player: PlayerActor;
    protected laserGuns: Array<gameItems>;
    protected door: Sprite
    protected backgroundImageKey: string;
    protected playerMaxStatValue = 10;

    //ultimate
    protected ultimateWave: Sprite;
    protected ultimateWaveKey = "ultimateWave";
    protected ultimateWaveDirection: Vec2;
    protected ultimateWaveFiredposition = new Vec2(0, 0);
    protected ultimateWavePlayerDistance = 40;
    //ui
    protected inGameControlTextBackground = "inGameControlTextBackground"
    protected inGameHelpTextBackground = "inGameHelpTextBackground"
    // player hud
    protected PlayerStatUI = {};
    protected oneStatUI = {
        label: Label,
        bar: Label,
        barBg: Label,
    }
    protected dmgLabel: Label;
    protected defLabel: Label;
    //items to game 

    protected gameItemsMap = new Map<string, Array<gameItems>>();
    protected laserGunsKey = "laserGuns";
    protected lanternShape: AABB;
    protected lanternDuration = false;
    protected inventorySlotsMap = new Map<number, Map<Vec2, Array<gameItems>>>();
    protected count=0;
    // protected test = new Map<number,Vec2>()
    //ui display
    protected currentPlayerPositionLabels: Array<Label>;

    //audio and music
    
    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "shadowMaze_assets/music/level_bgm.mp3";
    protected labelSize: number;
    protected isPauseMenuHidden: boolean;
    protected MenuCurentState: MenuState;
    // relative path to the assets
    protected pathToItems = `shadowMaze_assets/data/items/`;
    protected pathToSprite = `shadowMaze_assets/sprites/`;
    protected pathToMusic = `shadowMaze_assets/music/`;
    protected pathToSpriteSheets = `shadowMaze_assets/spritesheets/`;
    //Li
    protected healthbars: Map<number, HealthbarHUD>;
    protected battlers: (Battler & Actor)[];
    protected option: Record<string, any>;
    protected visibleGroup: (PlayerActor | NPCActor | Sprite)[] = [];
    protected npcGroup = [];
    protected gameItemGroup: gameItems[] = [];
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
        this.healthbars = new Map<number, HealthbarHUD>();
        this.battlers = new Array<Battler & Actor>();
    }
    public initScene(option: Record<string, any>): void {
        if (option !== undefined)
            this.option = option
        // this.option.isAstarChecked = true;
    }
    protected initLevelScene() {
        this.center = this.getViewport().getCenter();
        this.initSubscribe();
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(1000)
        this.isLevelEndEnetered = false;
        this.initLayers();
        this.levelEndTransitionLabel = this.addTweenLabel(this.levelEndTransitionLabel, PlayerEvents.LEVEL_END, tweensEffect.SLIDEIN);
        this.messageBoxLabel = this.addTweenLabel(this.messageBoxLabel, MessageBoxEvents.HIDDEN, tweensEffect.SLIDEIN);
    }
    // load all resources
    protected loadGameItems(key: string) {
        this.load.object(key, `${this.pathToItems}${key}.json`);
        this.load.image(key, `${this.pathToSprite}${key}.png`);
    }
    protected loadUltimateWave() {
        let key = this.ultimateWaveKey;
        this.load.image(key, `${this.pathToSprite}${key}.png`);
    }


    protected loadAllGameItems() {
        for (let key of Object.values(AllLevelGameItems)) {
            this.loadGameItems(key);
        }
    }
    protected loadGameSound(key:string){
        let format:string;
        if(key == GameSound.LEVEL_BGM_KEY)
            format = 'mp3';
        else{
            format = 'wav';
        }
        this.load.audio(key, `${this.pathToMusic}${key}.${format}`);

    }

    protected loadGameCharacter(key:string){
        this.load.spritesheet(key, `${this.pathToSpriteSheets}${key}.json`);
    }
    protected loadAllSpreadSheet(){
        for (let key of Object.values(GameCharacters)) {
            this.loadGameCharacter(key);
        }
    }
    protected loadAllGameMusic(){
        for (let key of Object.values(GameSound)) {
            this.loadGameSound(key);
        }
    }
    protected initInventorySlotsMap() {
        const inventorySlotsPosition = this.load.getObject(AllLevelGameItems.INVENTORY_SLOT)
        let i = 1;
        for (let position of inventorySlotsPosition.position) {
            const postionItemsMap = new Map<Vec2, Array<gameItems>>();
            postionItemsMap.set(position, []);
            this.inventorySlotsMap.set(i, postionItemsMap);
            i++;
        }
    }
    protected initAllGameItems() {
        for (let key of Object.values(AllLevelGameItems)) {
            let gameItem = this.load.getObject(key);
            const items = new Array<gameItems>(gameItem.position.length);
            for (let i = 0; i < items.length; i++) {
                let sprite, line;
                let isPickableFlag = false;
                if (key === AllLevelGameItems.INVENTORY_SLOT) {
                    sprite = this.add.sprite(key, this.GameLayers.BEFORE_BASE);
                    line = <Line>this.add.graphic(GraphicType.LINE, this.GameLayers.BEFORE_BASE, { start: Vec2.ZERO, end: Vec2.ZERO });
                    let numOfSlots = <Label>this.add.uiElement(UIElementType.LABEL, this.GameLayers.BEFORE_BASE, { position: new Vec2(gameItem.position[i][0] - 22, gameItem.position[i][1]), text: `${i + 1}` });
                    numOfSlots.fontSize = 24;
                    numOfSlots.font = "Courier";
                    numOfSlots.textColor = Color.BLACK;

                }
                else {
                    sprite = this.add.sprite(key, this.GameLayers.BASE);
                    line = <Line>this.add.graphic(GraphicType.LINE, this.GameLayers.BASE, { start: Vec2.ZERO, end: Vec2.ZERO });
                    isPickableFlag = true;
                    if (key == AllLevelGameItems.IRON_SWORD) {
                        isPickableFlag = false;
                        this.dmgLabel = this.createDefDmgLabel(gameItem.position[i], PlayerStatKey.DMG);
                    } else if (key == AllLevelGameItems.IRON_SHIELD) {
                        isPickableFlag = false;
                        this.defLabel = this.createDefDmgLabel(gameItem.position[i], PlayerStatKey.DEF);
                    }
                }
                items[i] = gameItems.create(sprite, line);
                items[i].position.set(gameItem.position[i][0], gameItem.position[i][1]);
                items[i].name = key;
                items[i].isPickable = isPickableFlag;
                items[i].floatInitPosition =  gameItem.position[i][1];
                this.gameItemGroup.push(items[i]);

            }
            this.gameItemsMap.set(key, items);
        }

    }
    protected initUltimateWave() {
        this.ultimateWave = this.add.sprite(this.ultimateWaveKey, this.GameLayers.BASE);
        this.ultimateWave.visible = false
        const halfSize = this.player.sizeWithZoom.scale(0.25);
        this.ultimateWave.position.set(this.player.position.x, this.player.position.y);
        this.ultimateWave.setCollisionShape(new AABB(this.player.position, halfSize));
        this.visibleGroup.push(this.ultimateWave);
    }
    private floatPickableItem(deltaT:number) {
        this.count+=deltaT
        for (let [key, gameItemArray] of (this.gameItemsMap)) {
            gameItemArray.forEach(item => {
                if (item.isPickable) {
                    item.position.set(item.position.x,item.floatInitPosition+item.floatDistance*Math.sin(this.count))
                }
            }
            )
        }
    }
    private createDefDmgLabel(position: number[], statKey: PlayerStatKey): Label {
        const stat = this.player._ai[statKey];

        return <Label>this.add.uiElement(UIElementType.LABEL, this.GameLayers.BASE, {
            position: new Vec2(position[0] + 22, position[1]), text: `${stat}`
        });


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
        this.initLevelScene();
        this.initPlayer();
        this.initExit();
        let navmesh = this.initializeNavmesh(new PositionGraph(), this.walls);
        navmesh.registerStrategy("astar", new AstarStrategy(navmesh));
        navmesh.setStrategy("astar");
        this.navManager.addNavigableEntity("navmesh", navmesh);

        this.initInventorySlotsMap();
        // create screen first 
        if (!this.option.isfogOfWarChecked)
            // this.initFogOfWar();
        this.center = this.viewport.getHalfSize();
        this.initPauseMenuLayer();

        if (!this.option.isAstarChecked) {
            this.initPlayerStatHUD();
            this.initNPCs();
            this.initAllGameItems();
            
        }
        // this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GameSound.LEVEL_BGM_KEY, loop: true, holdReference: true });
    }

    protected initNPCs(): void {
        const monster = this.load.getObject("monster");
        const npcData = [
            { name: "slime", key: "black_pudding", scale: new Vec2(0.15, 0.15), behavior: MonsterBehavior },
            // { name: "troll", key: "troll", scale: new Vec2(1.5, 1.5), behavior: monsterBehavior },
        ];
        for (const { name, key, scale, behavior } of npcData) {
            const data = monster[name];
            for (const [x, y] of data) {
                const npc = this.add.animatedSprite(NPCActor, key, this.GameLayers.BASE);
                npc.position.set(x, y);
                npc.addPhysics(new AABB(Vec2.ZERO, new Vec2(7, 7)), null, false);
                npc.scale = scale;
                npc.navkey = "navmesh";
                npc.health = 10;
                npc.maxHealth = 10;
                npc.addAI(behavior, { target: new BasicTargetable(new Position(npc.position.x, npc.position.y)), range: 100 });
                npc.animation.play("IDLE", true);
                this.battlers.push(npc);
                this.npcGroup.push(npc);
                let healthbar = new HealthbarHUD(this, npc, GameLayers.BASE, { size: new Vec2(64.0, 16.0), offset: new Vec2(0.0, -16.0) });
                this.healthbars.set(npc.id, healthbar);
            }
        }
    }
    public loadScene(): void {
        this.loadAllGameItems();
        
        this.loadAllGameMusic();
        // this.loadGameItems(this.laserGunsKey);
        this.load.spritesheet("prince", "shadowMaze_assets/spritesheets/prince.json");


        // Load the tilemap
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/futureLevel.json");

    }
    protected buildLanternShape(position: Vec2) {
        const lightDistance = 1 * this.labelSize;
        const centerToEdge = new Vec2(lightDistance, lightDistance);
        this.lanternShape = new AABB(position, centerToEdge);
        return this.lanternShape;
    }


    protected initSubscribe() {

        this.initGameEventSubscribe([
            ...Object.values(BattlerEvents),
            ...Object.values(PlayerEvents),
            ...Object.values(MessageBoxEvents),
        ]);
        this.receiver.subscribe(PlayerInput.ULTIMATE);
        this.initGameItemEventSubscribe();
    }

    protected initGameEventSubscribe(gameEvents: AllGameEventType[]) {
        for (const event of gameEvents) {
            this.receiver.subscribe(event);
        }
    }
    protected initGameItemEventSubscribe() {

        for (let gameItemKey of Object.values(AllLevelGameItems)) {
            this.receiver.subscribe(gameItemKey);
        }
    }

    protected initPlayerStatHUD(): void {
        // UILayer stuff
        // this.addUILayer(GAMELayers.UIlayer);
        // HP Label
        const currentStat = this.player._ai["currentStat"];
        let yOffset = 10;
        let index = 0;
        let newText: string;
        for (const stat of Object.keys(currentStat)) {
            let statUI = {
                label: null,
                bar: null,
                barBg: null,
            };
            if (PlayerStatsNameArray[index] == 'HP') {
                newText = PlayerStatsNameArray[index];
            }
            else {
                newText = "    " + PlayerStatsNameArray[index];
            }
            //bar
            statUI.label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.BASE, { position: new Vec2(10, yOffset), text: newText });
            statUI.label.size.set(300, 30);
            statUI.label.fontSize = 24;
            statUI.label.font = "Courier";

            //background
            statUI.bar = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.BASE, { position: new Vec2(75, yOffset), text: "" });
            statUI.bar.size = new Vec2(300, 25);
            statUI.bar.backgroundColor = Color[PlayerStatsColorArray[index]];

            //border
            statUI.barBg = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.BASE, { position: new Vec2(75, yOffset), text: "" });
            statUI.barBg.size = new Vec2(300, 25);
            statUI.barBg.borderColor = Color.BLACK;
            yOffset += 20
            index++;
            this.PlayerStatUI[stat] = statUI;
            this.handlePlayerStatChange(stat)
        }

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
            this.levelEndTransitionLabel.tweens.play(tweensEffect.SLIDEIN);
        }

    }
    protected addTweenLabel(label: Label, onEndEvent: string, effect: string): Label {
        if (effect == tweensEffect.SLIDEIN) {
            label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.UI, { position: new Vec2(-500, 96), text: "Level Complete" });
            label.tweens.add(tweensEffect.SLIDEIN, {
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
                onEnd: onEndEvent,
            });
            label.tweens.add(tweensEffect.SLIDEOUT, {
                startDelay: 1000,
                duration: 1000,
                effects: [
                    {
                        property: TweenableProperties.posX,
                        start: 270,
                        end: 1000,
                        ease: EaseFunctionType.OUT_SINE
                    }
                ],

                // onEnd: onEndEvent,
            });
            label.size.set(1200, 60);
            label.borderRadius = 0;
            label.backgroundColor = new Color(34, 32, 52);
            label.textColor = Color.WHITE;
            label.fontSize = 48;
            label.font = "PixelSimple";
        }
        else {
            label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.UI, { position: new Vec2(300, 200), text: "" });
            label.alpha = 1;

            label.tweens.add(tweensEffect.FADEIN, {
                startDelay: 0,
                duration: 1000,
                effects: [
                    {
                        property: TweenableProperties.alpha,
                        start: 0,
                        end: 1,
                        ease: EaseFunctionType.IN_OUT_QUAD
                    }
                ],
                onEnd: onEndEvent,
            });
            label.tweens.add(tweensEffect.FADEOUT, {
                startDelay: 0,
                duration: 1000,
                effects: [
                    {
                        property: TweenableProperties.alpha,
                        start: 1,
                        end: 0,
                        ease: EaseFunctionType.IN_OUT_QUAD
                    }
                ],

            });
        }


        return label;
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

    public updateScene(deltaT: number) {

        while (this.receiver.hasNextEvent()) {
            const gameEvent = this.receiver.getNextEvent()
            this.handleEvent(gameEvent);
        }
        if (Input.isKeyJustPressed("escape")) {
            this.emitter.fireEvent(PauseButtonEvent.PAUSE);
        }

        if (this.option.isAstarChecked) {
            this.player.moveOnPath(1, this.path)
            if (this.path.isDone()) {
                this.handleEnteredLevelEnd();
            }
            else{
               this.player.rotation = Vec2.UP.angleToCCW(this.path.getMoveDirection(this.player));
               this.player.animation.playIfNotAlready(AnimationType.MOVING,true);
            }

        }
        else {
            this.handleAllPlayStatChange();
            this.isPlayerAtItems();
            this.isPlayerAttacking();
            this.isPlayerUseItem();
            this.updateVisibleGroup();
            this.floatPickableItem(deltaT);
            this.healthbars.forEach(healthbar => healthbar.update(deltaT));
        }
        this.isPlayerAtLevelEnd();
    }
    protected handleAllPlayStatChange(){
        this.handlePlayerStatChange(PlayerStatKey.CURRENT_SHIELD);
        this.handlePlayerStatChange(PlayerStatKey.CURRENT_HEALTH);
        this.handlePlayerStatChange(PlayerStatKey.CURRENT_ENERGY);
       
    }
    protected updateVisibleGroup() {
        this.updateTranparentLabels(this.player);
        if (this.ultimateWave.visible) {
            const distance = this.ultimateWave.position.distanceTo(this.player.position);
            const f = this.ultimateWave.collisionShape.overlaps(this.player.collisionShape)
            if (distance > this.ultimateWavePlayerDistance) {
                if (!this.ultimateWave.currentTransparentLabels) {
                    this.ultimateWave.currentTransparentLabels = this.initTransparentLabelByPosition(this.ultimateWave.position);
                }
                else
                    this.updateTranparentLabels(this.ultimateWave);
            }
            this.updateUltimateWave();
        }
    }
    protected isUltimateLeftPlayer(): boolean {
        let lables = this.getLabelsByPosition(this.ultimateWave.position);

        lables = lables.filter(label => label.backgroundColor == Color.FOG_OF_WAR_TRANSPARENT)
        return lables.length == 0;
    }
    protected updateUltimateWave() {
        let oldPosition = this.ultimateWave.position;
        let travellingDirectionVec = this.ultimateWaveDirection;
        // this.ultimateWave.currentTransparentLabels = this.initTransparentLabelByPosition(this.ultimateWave.position);

        const ratio = 8;
        this.ultimateWave.position.set(oldPosition.x + travellingDirectionVec.x / ratio, oldPosition.y + travellingDirectionVec.y / ratio);
        if (this.hasVecOutOfBound(this.ultimateWave.position.x) ||
            this.hasVecOutOfBound(this.ultimateWave.position.y)) {
            this.ultimateWave.visible = false;
            this.ultimateWave.currentTransparentLabels.forEach(label => {
                this.updateTranparentLablesColor(label);
            })
            this.ultimateWave.currentTransparentLabels = undefined;
        }
        this.checkUltimateMonstersCollision();
    }
    protected checkUltimateMonstersCollision() {
        this.battlers.forEach(battler => {
            if (battler.battlerActive && !(battler == this.player)) {
                if (battler.position.distanceTo(this.ultimateWave.position) < 30) {
                    this.emitter.fireEvent(BattlerEvents.MONSTER_HIT, { id: battler.id, dmg: this.player._ai["ultDmg"] });
                }
            }
        }
        )
    }
    protected hasVecOutOfBound(x: number) {
        if (x < -15 || x > 540) return true;
        else return false;
    }
    protected isPlayerUseItem() {
        ItemButtonKeyArray.forEach(key => {
            if (Input.isKeyJustPressed(key)) {
                const positionItemMap = this.inventorySlotsMap.get(parseInt(key))
                for (let [key, value] of positionItemMap.entries()) {
                    if (value.length != 0) {
                        const gameItem = value.pop();
                        this.emitter.fireEvent(gameItem.name, { action: ACTIONTYPE.USE, gameItem: gameItem });
                        return;
                    }
                    else {
                        this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.ITEM_NOT_FOUND });
                    }
                }

            }
        })
    }
    public isPlayerAtLevelEnd() {
        if (this.levelEndPosition.distanceSqTo(this.player.position) < 10) {
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
        this.handleInGameMessageBox(event);
    }
    protected handleInGameMessageBox(event: GameEvent) {
        switch (event.type) {
            case MessageBoxEvents.SHOW: {
                this.messageBoxLabel.text = event.data.get("message");
                if (this.messageBoxLabel.text == MessageBoxEvents.UNUSE_CURSED_SWORD)
                    this.dmgLabel.text = this.player._ai[PlayerStatKey.DMG];
                this.messageBoxLabel.tweens.play(tweensEffect.SLIDEIN);
                break;
            }

            case MessageBoxEvents.HIDDEN: {
                this.messageBoxLabel.tweens.play(tweensEffect.SLIDEOUT);
                break;
            }



        }
    }
    protected handleBattlerEvents(event: GameEvent) {
        switch (event.type) {
            case BattlerEvents.MONSTER_DEAD: {
                this.handleBattlerKilled(event);
                if (this.player._ai["currentStat"]["currentEnergy"] < this.playerMaxStatValue) {
                    this.player._ai["currentStat"]["currentEnergy"]++;
                    this.handlePlayerStatChange("currentEnergy");
                }
                break;
            }
            case BattlerEvents.PRINCE_HIT: {
                if (!this.player._ai["isInvincible"]) {
                    this.player._ai["currentStat"][PlayerStatKey.CURRENT_HEALTH]--;
                    this.handlePlayerStatChange(PlayerStatKey.CURRENT_HEALTH);
                    this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GameSound.PRINCE_HIT, loop: false, holdReference: true });

                }
                break;
            }
            case BattlerEvents.PRINCE_DEAD: {
                setTimeout(() => {
                    this.viewport.setZoomLevel(1);
                    this.sceneManager.changeToScene(SelectLevelMenuScene, this.option);
                }, 2000)
            }
            case PlayerInput.ULTIMATE: {
                if (!this.ultimateWave.visible){
                    this.handleFireUltimate();
                    this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GameSound.ULT_KEY, loop: false, holdReference: true });
                }


            }
        }
    }
    protected handleFireUltimate() {
        this.ultimateWave.visible = true;
        let faceDirectionVec = this.getFaceDirectionVec();
        this.ultimateWave.position.set(faceDirectionVec.x, faceDirectionVec.y);
        this.ultimateWaveDirection = faceDirectionVec.sub(this.player.position);
        // this.ultimateWave.currentTransparentLabels = this.initTransparentLabelByPosition(this.ultimateWave.position);

        this.ultimateWave.rotation = this.player.rotation;
        this.ultimateWaveFiredposition.x = this.player.position.x;
        this.ultimateWaveFiredposition.y = this.player.position.y;
    }
    protected handleBattlerKilled(event: GameEvent) {
        let id: number = event.data.get("id");
        let battler = this.battlers.find(b => b.id === id);
        
        if (battler) {
            this.healthbars.get(id).visible = false;
            setTimeout(()=>{
                battler.battlerActive = false;
            },1000)

        }
    }
    protected handleUseGameItemsEvent(event: GameEvent) {
        this.RemoveItemFromInventory(event)
        switch (event.type) {
            case AllLevelGameItems.LANTERNS: {
                this.lanternDuration = !this.lanternDuration;
                this.ultimateWavePlayerDistance = 70;
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_LANTERN })
                break;
            }
            case AllLevelGameItems.DOOR: {
                this.showPositionByColor(this.levelEndPosition, Color.TRANSPARENT);
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_DOOR })
                break;
            }
            case AllLevelGameItems.HEALTH_PACKS: {
                if (this.player._ai["currentStat"][PlayerStatKey.CURRENT_HEALTH] < this.playerMaxStatValue)
                    this.player._ai["currentStat"][PlayerStatKey.CURRENT_HEALTH]++;
                this.handlePlayerStatChange(PlayerStatKey.CURRENT_HEALTH);
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GameSound.HEALING_KEY, loop: false, holdReference: true });
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_HEALTH_PACK })
                break;
            }
            case AllLevelGameItems.PHASING_POTION: {
                const halfSize = this.player.sizeWithZoom.scale(0);
                this.player.setCollisionShape(new AABB(this.player.position, halfSize));
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_PHASING_POTION });
                break;
            }
            case AllLevelGameItems.TELEPORT_BOOT: {
                this.player.position.set(90, 150);
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_TElEPORT_BOOT });
                break;
            }
            case AllLevelGameItems.MEDUSA: {
                this.npcGroup.forEach(npc => npc.freeze());
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_MEDUSA })
                break;
            }
            case AllLevelGameItems.ORACLE_ELIXIR: {
                this.npcGroup.forEach(npc => npc.visible && this.showPositionByColor(npc.position, Color.TRANSPARENT))
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_ORACLE_ELIXIR })
                break;
            }
            case AllLevelGameItems.SEEING_STONE: {
                this.gameItemGroup.forEach(gameItem => gameItem.visible && this.showPositionByColor(gameItem.position, Color.TRANSPARENT))
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_SEEING_STONE })
                break;
            }
            case AllLevelGameItems.WOODEN_SWORD: {
                this.player._ai[PlayerStatKey.IS_CURSED] = true;
                this.player._ai[PlayerStatKey.DMG] = parseInt(PlayerStatKey.CURSED_DMG);
                this.dmgLabel.text = (PlayerStatKey.CURSED_DMG);
                this.emitter.fireEvent(MessageBoxEvents.SHOW, { message: MessageBoxEvents.USE_CURSED_SWORD })
                break;
            }
        }
    }
    protected RemoveItemFromInventory(event: GameEvent) {
        const gameItem = event.data.get("gameItem");
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
        this.putItemToInventory(event);

    }
    protected putItemToInventory(event: GameEvent) {
        const gameItem = <LaserGun>event.data.get("gameItem");
        for (let postionItemsMap of Array.from(this.inventorySlotsMap.values())) {
            for (const [key, value] of postionItemsMap) {
                if (value.length === 0) {
                    gameItem.position.set(key[0], key[1]);
                    postionItemsMap.set(key, [gameItem]);
                    gameItem.isPickable = false;
                    this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GameSound.PICK_ITEM, loop: false, holdReference: true });
                    return;
                }
            }

        }
    }
    protected showPositionByColor(position: Vec2, color: Color) {
        const labels = this.getLabelsByPosition(position);
        labels.forEach(label => {
            if (label.backgroundColor) {
                if (label.backgroundColor.isEqual(Color.FOG_OF_WAR_BLACK)) {
                    label.backgroundColor = color
                }
                else if (label.backgroundColor.isEqual(Color.TRANSPARENT)) {
                    label.backgroundColor = color
                }
            }

        }
        );
    }


    public initTransparentLabelByPosition(position: Vec2): Array<Label> {
        const labels = this.getLabelsByPosition(position)
        labels.forEach(label => { this.updateTranparentLablesColor(label) })
        return labels;
    }
    public updateTranparentLabels(sprite: Sprite) {
        let nextTransparentLabels = this.getLabelsByPosition(sprite.position);
        sprite.currentTransparentLabels.forEach(label => { this.updateTranparentLablesColor(label) })
        nextTransparentLabels.forEach(label => this.updateTranparentLablesColor(label))
        sprite.currentTransparentLabels = nextTransparentLabels
    }
    public getLabelsByPosition(postion: Vec2): Array<Label> {
        let labels: Array<Label>
        if (!this.lanternDuration) {
            labels = <Array<Label>>this.getSceneGraph().getNodesAt(postion);
        }
        else {
            labels = <Array<Label>>this.getSceneGraph().getNodesInRegion(this.buildLanternShape(postion));
        }
        labels = labels.filter(label => label.getLayer().getName() == GameLayers.FOG_OF_WAR)
        return labels;
    }
    public updateTranparentLablesColor(label: Label) {
        if (label.backgroundColor) {
            if (label.backgroundColor.isEqual(Color.FOG_OF_WAR_BLACK)) {
                label.backgroundColor = Color.FOG_OF_WAR_TRANSPARENT;
            }
            else if (label.backgroundColor.isEqual(Color.FOG_OF_WAR_TRANSPARENT)) {
                label.backgroundColor = Color.FOG_OF_WAR_BLACK;
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
    protected handlePlayerStatChange(type: string): void {
        // this.PlayerStatUI[PlayerStatsNameArray[index]] = statUI;
        let oneStatUI = this.PlayerStatUI[type]
        const currentStatValue = this.player._ai["currentStat"][type]
        let unit = oneStatUI["barBg"].size.x / this.playerMaxStatValue;
        oneStatUI["bar"].size.set(oneStatUI["barBg"].size.x - unit * (this.playerMaxStatValue - currentStatValue), oneStatUI["barBg"].size.y);
        oneStatUI["bar"].position.set(oneStatUI["barBg"].position.x - (unit / 2 / this.getViewScale()) * (this.playerMaxStatValue - currentStatValue), oneStatUI["barBg"].position.y);
        if (type == PlayerStatKey.CURRENT_HEALTH)
            oneStatUI["bar"].backgroundColor = currentStatValue < this.playerMaxStatValue * 1 / 4 ? Color.RED : currentStatValue < this.playerMaxStatValue * 3 / 4 ? Color.YELLOW : Color.GREEN;
    }

    protected isPlayerAttacking() {
        //midpoint represents a few inches in front of the prince
        let midpoint = this.getFaceDirectionVec();
        //check every battler(sprite) in the list
        for (const battler of this.battlers) {
            //if the batter is the prince, then we can just ignore it
            if (battler == this.player) {
                continue;
            }
            //if the monster is active and is within a certain distance of the prince attack animation, then we can assume the monster has been hit
            if (battler.battlerActive && battler.position.distanceTo(midpoint) <= 15 && this.player.animation.isPlaying(AnimationType.ATTACKING)) {
                //fire an event that means the monster has been hit. we need to know which monster has been hit and provide the damage the prince has dealt
                //in NPCbehaviour.ts, the event will be handleded
                this.emitter.fireEvent(BattlerEvents.MONSTER_HIT, { id: battler.id, dmg: this.player._ai["dmg"] });
            }
        }
    }
    protected getFaceDirectionVec(): Vec2 {
        let midpoint = new Vec2(this.player.position.x, this.player.position.y);
        switch (this.player.rotation) {
            case 0:
                // midpoint = new Vec2(this.player.position.x, this.player.position.y - 15);
                midpoint.y = this.player.position.y - 15;
                break;
            case 3.15:
                midpoint.y = this.player.position.y + 15;
                break;
            case 1.5:
                midpoint.x = this.player.position.x - 15;
                break;
            case 4.75:
                midpoint.x = this.player.position.x + 15;
                break;
            case 5.25:
                midpoint.x = this.player.position.x + 10;
                midpoint.y = this.player.position.y - 10;
                break;
            case 0.75:
                midpoint.x = this.player.position.x - 10;
                midpoint.y = this.player.position.y - 10;
                break;
            case 3.75:
                midpoint.x = this.player.position.x + 10;
                midpoint.y = this.player.position.y + 10;
                break;
            case 2.25:
                midpoint.x = this.player.position.x - 10;
                midpoint.y = this.player.position.y + 10;
                break;
            default:
                midpoint = this.player.position;
                break;
        }
        return midpoint;
    }
    protected isPlayerAtItems() {
        for (const gameItems of this.gameItemsMap.values()) {
            gameItems.forEach(gameItem => {
                if (gameItem.visible && gameItem.isPickable && gameItem.position.distanceTo(this.player.position) < 10) {
                    // gameItem.visible = false;
                    this.emitter.fireEvent(gameItem.name, { action: ACTIONTYPE.PICK, gameItem: gameItem });
                }
            })
        }
    }
    /**
     * Initializes the player in the scene
     */
    protected initExit():void{
        let exit  = this.add.animatedSprite(PlayerActor, GameCharacters.EXIT, this.GameLayers.BASE);
        exit.position.set(this.levelEndPosition.x,this.levelEndPosition.y);
        exit.animation.playIfNotAlready(AnimationType.IDLE,true)
    }
    protected initPlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, GameCharacters.PRINCE, this.GameLayers.BASE);
        this.player = player
        player.position.set(this.playerInitPosition.x, this.playerInitPosition.y);
        player.battleGroup = 2;
        player.scale = new Vec2(2, 2);
        // Give the player physics
        this.battlers.push(this.player);
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)), null, false);
        const halfSize = this.player.sizeWithZoom.scale(0.125);
        player.setCollisionShape(new AABB(this.player.position, halfSize))
        player.currentTransparentLabels = this.initTransparentLabelByPosition(this.player.position);
        this.buildLanternShape(this.player.position);
        this.visibleGroup.push(player);

        // Give the player PlayerAI

        if (this.option.isAstarChecked) {
            console.log("Auto Pilot");
            this.initAstarMode();
        }
        else {
            player.addAI(PlayerAI);
            this.initUltimateWave();
        }
        // 
        player.animation.play("IDLE");



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
            layerName: GameLayers.HELP_TEXT_MENU
        }
        this.addHelpTextLayer(helpTextOption)
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
                layerName: option.layerName,
            }
            this.addLabel(textOption);
            // this.add.uiElement(UIElementType.LABEL,option.layerName,textOption);
        }
    }
    protected sceneChange(nextScene) {
        this.viewport.setZoomLevel(1);
        this.sceneManager.changeToScene(nextScene, this.option);
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: GameSound.LEVEL_BGM_KEY, loop: true, holdReference: true });
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

        // let emptyMenuOption = {
        //     position: this.center,
        //     text: "",
        //     size: new Vec2(300, 550),
        //     layerName: GameLayers.PAUSE_MENU_CONTAINER,
        //     backgroundColor: Color.WHITE,
        // }
        // this.addLabel(emptyMenuOption);
        this.backgroundImage = this.add.sprite(this.inGameControlTextBackground, GameLayers.PAUSE_MENU_CONTAINER);
        this.backgroundImage.position.set(this.center.x, this.center.y + 20);
        this.backgroundImage = this.add.sprite(this.inGameControlTextBackground, GameLayers.CONTROL_TEXT_MENU_CONTAINER);
        this.backgroundImage.position.set(this.center.x, this.center.y + 20);
        let controlTextOption = {
            position: new Vec2(400, 515),
            margin: 30,
            layerName: GameLayers.CONTROL_TEXT_MENU
        }
        this.addControlTextLayer(controlTextOption)
        let inGameControlTextBackgroundImage = this.add.sprite(this.inGameHelpTextBackground, GameLayers.HELP_TEXT_MENU_CONTAINER);
        inGameControlTextBackgroundImage.position.set(this.center.x, this.center.y + 10);
        let helpTextOption = {
            position: new Vec2(435, 450),
            margin: 40,
            layerName: GameLayers.HELP_TEXT_MENU
        }
        this.addHelpTextLayer(helpTextOption)
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
        label.backgroundColor = Color.FOG_OF_WAR_BLACK;
    }
    public abstract getBattlers(): Battler[];
}
