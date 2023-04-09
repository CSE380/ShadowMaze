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
import { helpTextArray } from "../Text";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
export default class HW4Scene extends Scene {
    protected mainMenuLayerName="gameMenu";
    protected backgroundImageKey: "backgroundImage";
    protected backgroundImage: Sprite;
    public addText(option: Record<string, any>) {
        const newTextLabel = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName, option);
        if(option.size)
        newTextLabel.size.set(option.size.x,option.size.y);
        else
        newTextLabel.size.set(300,100);
        newTextLabel.borderWidth = 2;
        newTextLabel.setTextColor(Color.WHITE)
        newTextLabel.setFontsize(28);
        if (option.align)
            newTextLabel.setHAlign("left")
    }
    public addControlText(position:Vec2,controlText:Array<string>){
        let yInitPoistion = position.y - 400;
        for(let text of controlText){
            yInitPoistion += 100
            let textOption = {
                position: new Vec2(position.x-150, yInitPoistion),
                text: "• "+text,
                align:true,
                layerName:this.mainMenuLayerName,
            }
           this.addText(textOption);
        }
    }
    public addBackButon(position:Vec2){
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(position.x-470, position.y - 470),
            text: leftArrow,
            buttonName:BackButtonEvent.BACK,
            layerName:this.mainMenuLayerName
        }
        this.addButtons(buttonOption);
    }
    public addButtons( option: Record<string, any>) {
        const newButton = <Label>this.add.uiElement(UIElementType.BUTTON, option.layerName, option);
        newButton.size.set(50, 50);
        newButton.borderWidth = 0;
        newButton.borderColor = Color.TRANSPARENT;
        newButton.backgroundColor = Color.BLACK;
        newButton.onClickEventId = option.buttonName;
        newButton.setFontsize(50);
        this.receiver.subscribe(option.buttonName);
    }
    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
    public addHelpText(position:Vec2) {
        let yInitPoistion = position.y - 400;
        const newText = helpTextArray;
        for (let text of newText) {
            yInitPoistion += 50
            let textOption = {
                position: new Vec2(position.x - 320, yInitPoistion),
                text: text,
                align: true,
                layerName: this.mainMenuLayerName,
            }
            this.addText(textOption);
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