/* #################### IMPORTS #################### */
// Import from Wolfie2D or your own files here
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AstarDemoScene from "./AstarDemoScene";
import { BackButtonEvent } from "../CustomizedButton";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenuScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { helpTextArray } from "../Text";
import HW4Scene from "./HW4Scene";
/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class StartScene extends HW4Scene {
    /* ########## MEMBER DEFINITIONS ##########*/
    private backgroundImageKey: "backgroundImage";
    // private mainMenuLayerName: string = "startScene";
    private backgroundImage: Sprite;
    private ButtonSelection: typeof BackButtonEvent;
    loadScene(): void {
        // this.load.tilemap("map", "../dist/hw4_assets/tilemaps/test2.json");

        this.load.image(this.backgroundImageKey, "hw4_assets/images/mazeBackground.jpg");
        this.ButtonSelection = BackButtonEvent
        // console.log(this.load.getImage("image"));
    }

    // startScene() is where you should build any game objects you wish to have in your scene,
    // or where you should initialize any other things you will need in your scene
    // Once again, this occurs strictly after loadScene(), so anything you loaded there will be available
    startScene(): void {
        this.addUILayer(this.mainMenuLayerName)
        this.backgroundImage = this.add.sprite(this.backgroundImageKey, this.mainMenuLayerName);
        let center = this.viewport.getCenter();
        this.backgroundImage.position.set(center.x, center.y);
        let textOption = {
            position: new Vec2(center.x, center.y - 400),
            text: "Helps",
            layerName:this.mainMenuLayerName,
        }
        this.addText(textOption);
        let yInitPoistion = center.y - 400;
        const newText = helpTextArray;
        for(let text of newText){
            yInitPoistion += 50
            let textOption = {
                position: new Vec2(center.x-320, yInitPoistion),
                text: text,
                align:true,
                layerName:this.mainMenuLayerName,
            }
           this.addText(textOption);
        }
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(center.x - 470, center.y - 470),
            text: leftArrow,
        }
        this.addButtons(this.ButtonSelection.BACK, buttonOption);
    }
   
    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
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
        console.log(event.type)
        switch (event.type) {
            case this.ButtonSelection.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }

        }
    }
}