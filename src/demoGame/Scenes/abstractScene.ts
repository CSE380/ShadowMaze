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
import { helpTextArray,controlTextArray } from "../Text";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import UIElement from "../../Wolfie2D/Nodes/UIElement";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
export default abstract class HW4Scene extends Scene {
    protected mainMenuLayerName="gameMenu";
    protected backgroundImageKey: "backgroundImage";
    protected backgroundImage: Sprite;
    protected center:Vec2;
    protected levelEndArea: Rect;
    protected levelEndLabel: Label;
    protected levelEndPosition: Vec2;
    protected levelEndHalfSize: Vec2;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager,options);
        this.center = this.getViewport().getCenter();
        console.log(this.center)
    }
    public loadScene(): void {
       
    }
    protected addText(option: Record<string, any>) {
        const newTextLabel = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName|| this.mainMenuLayerName, option);
        if(option.size)
        newTextLabel.size.set(option.size.x,option.size.y);
        else
        newTextLabel.size.set(300,100);
        newTextLabel.borderWidth = 2;
        newTextLabel.setTextColor(option.textColor||Color.WHITE)
        newTextLabel.setFontsize(option.fontSize|| 28);
        newTextLabel.setBackgroundColor(option.backgroundColor||Color.BLACK)
        if (option.align)
            newTextLabel.setHAlign(option.align)
    }
    // protected initializeLevelEnds(): void {

    //     this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: this.levelEndPosition, size: this.levelEndHalfSize });
    //     this.levelEndArea.addPhysics(undefined, undefined, false, true);
    //     this.levelEndArea.setTrigger(HW3PhysicsGroups.PLAYER, HW3Events.PLAYER_ENTERED_LEVEL_END, null);
    //     this.levelEndArea.color = new Color(255, 0, 255, .20);
    // }
    protected initializeLevelEnds(){
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, this.mainMenuLayerName, { position: this.levelEndPosition, size: this.levelEndHalfSize });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        // this.levelEndArea.setTrigger(HW3PhysicsGroups.PLAYER, HW3Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(255, 0, 255, .20);
    }
    protected addLevelEndLabel(){
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, this.mainMenuLayerName, { position: new Vec2(250, 100), text: "Level Complete" });
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";
        console.log(this.levelEndLabel)
    }
    protected addButtons( option: Record<string, any>) {
        const newButton = <Label>this.add.uiElement(UIElementType.BUTTON, option.layerName|| this.mainMenuLayerName, option);
        newButton.size.set(50,50);
        if(option.size) newButton.size.set(option.size.x,option.size.y);
        newButton.borderWidth = 0;
        newButton.borderColor = Color.TRANSPARENT;
        console.log(option.backgroundColor)
        newButton.setBackgroundColor(option.backgroundColor||Color.BLACK)
        newButton.setTextColor(option.textColor||Color.WHITE)
        newButton.onClickEventId = option.buttonName;
        newButton.setFontsize(50);
        this.receiver.subscribe(option.buttonName);
    }
    protected addControlTextLayer(option: Record<string, any>){
        let position = option.position;
        let yInitPoistion = position.y - 400;
        for(let text of controlTextArray){
            yInitPoistion += option.margin
            let textOption = {
                position: new Vec2(position.x-150, yInitPoistion),
                text: "• "+text,
                align:true,
                layerName:option.layerName,
                fontSize:option.fontSize,
            }
           this.addText(textOption);
        }
    }
    protected addBackButon(position:Vec2){
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(position.x-470, position.y - 470),
            text: leftArrow,
            buttonName:BackButtonEvent.BACK,
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
                align:"left",
            }
            this.addText(textOption);
        }
    } 
    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
   
    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch (event.type) {
            case BackButtonEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
        }
    }
    
    
}