import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Scene from "../../Wolfie2D/Scene/Scene";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGun";
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
export default abstract class HW4Scene extends Scene {
    protected mainMenuLayerName = "gameMenu";
    protected backgroundImageKey: "backgroundImage";
    protected backgroundImage: Sprite;
    protected center: Vec2;
    protected levelEndArea: Rect;
    protected levelEndLabel: Label;
    protected playerInitPosition = new Vec2(15, 400);
    protected levelEndPosition = new Vec2(308, 20);
    protected levelEndHalfSize = new Vec2(25, 25)
    protected levelEndColor = new Color(255, 0, 0, 0.5);
    protected levelEndTimer: Timer;
    protected levelTransitionScreen: Rect;
    protected player: PlayerActor;
    protected isLevelEndEnetered: boolean;
    protected topMostLayer: "topMostLayer";
    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {
            ...options, physics: {
                // groupNames: [PhysicsGroups.PLAYER],
            }
        });
        this.init();
    }
    protected init() {
        this.center = this.getViewport().getCenter();
        this.initSubscribe();
        this.levelTransitionTimer = new Timer(500);
        this.addLayer(this.topMostLayer,10);
        // this.levelEndTimer = new Timer(3000, () => {
        //     this.levelTransitionScreen.tweens.play("fadeIn");
        // });
        this.levelEndTimer = new Timer(1000)
        this.isLevelEndEnetered = false;
    }
    public loadScene(): void {

    }
    protected initSubscribe() {
        this.receiver.subscribe(PlayerEvents.PLAYER_ENTERED_LEVEL_END)
    }
    protected addText(option: Record<string, any>) {
        const newTextLabel = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName || this.mainMenuLayerName, option);
        if (option.size)
            newTextLabel.size.set(option.size.x, option.size.y);
        else
            newTextLabel.size.set(300, 100);
        newTextLabel.borderWidth = 2;
        newTextLabel.setTextColor(option.textColor || Color.WHITE)
        newTextLabel.setFont(option.font|| "Arial");
        newTextLabel.setFontSize(option.fontSize || 28);
        newTextLabel.setBackgroundColor(option.backgroundColor || Color.BLACK)
        if (option.align)
            newTextLabel.setHAlign(option.align)
    }
    protected handleEnteredLevelEnd(): void {
        // If the timer hasn't run yet, start the end level animation
        console.log("start")
        // if (!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()) {
        //     console.log("run")
        //     this.levelEndTimer.start();
        //     this.addLevelEndLabel();
        //     this.levelEndLabel.tweens.play("slideIn");
        // }
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
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, this.topMostLayer, { position: new Vec2(500, 100), text: "Level Complete" });
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
        let yInitPoistion = position.y - 400;
        for (let text of controlTextArray) {
            yInitPoistion += option.margin
            let textOption = {
                position: new Vec2(position.x - 150, yInitPoistion),
                text: "• " + text,
                align: true,
                layerName: option.layerName,
                fontSize: option.fontSize,
                backgroundColor:Color.TRANSPARENT,
            }
            this.addText(textOption);
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
        let yInitPoistion = position.y - 400;
        const newText = helpTextArray;
        for (let text of newText) {
            yInitPoistion += option.margin
            let textOption = {
                position: new Vec2(position.x - 320, yInitPoistion),
                text: text,
                align: "left",
                backgroundColor:Color.TRANSPARENT,
                fontSize:option.fontSize,
            }
            this.addText(textOption);
        }
    }
    public updateScene() {
        while (this.receiver.hasNextEvent() ) {
            const gameEvent = this.receiver.getNextEvent()
            console.log(gameEvent)
            this.handleEvent(gameEvent);
        }
    }
    public isLevelEnd() {
        const label = this.levelEndArea;
        // console.log(this.player.position.x)
        // // console.log(this.player.position.y)
        // console.log(label.position.x)
        // console.log(label.position.y)
        // console.log(this.levelEndColor)
        if (Math.abs(label.position.x - this.player.position.x) <= 3 && (Math.abs(label.position.y - this.player.position.y) <= 3)) {
            if(!this.isLevelEndEnetered)
            this.emitter.fireEvent(PlayerEvents.PLAYER_ENTERED_LEVEL_END)
        }
    }
    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch (event.type) {
            case BackButtonEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
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
    }


}