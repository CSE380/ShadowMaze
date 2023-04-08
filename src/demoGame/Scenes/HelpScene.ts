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
import MainMenu from "./MainMenu";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";

/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class StartScene extends Scene {
    /* ########## MEMBER DEFINITIONS ##########*/
    private backgroundImageKey: "backgroundImage";
    private mainMenuLayerName: "startScene";
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
            text: "Helps"
        }
        this.addText(textOption);
        let yInitPoistion = center.y - 400;
        const newText = this.buildText();
        for(let text of newText){
            yInitPoistion += 50
            let textOption = {
                position: new Vec2(center.x-320, yInitPoistion),
                text: text,
                align:true,
            }
           this.addText(textOption);
        }
        // textOption = {
        //     position: new Vec2(center.x, center.y - 400),
        //     text: newText,
        // }
        this.buildText();
        // this.addText(textOption)
        const leftArrow = '\u2190';
        let buttonOption = {
            position: new Vec2(center.x - 470, center.y - 470),
            text: leftArrow,
        }
        this.addButtons(this.ButtonSelection.BACK, buttonOption);
    }
    protected buildText(): Array<string> {
        const paragraph = "The prince’s goal is to make it out of the maze alive! He has a sword and shield to help him do so, as well as an ultimate ability in the form of a flying sword slash. Using the attack button will swing his sword at the prince’s enemies in front of him, dealing damage. To use his shield, hold down the shield button to absorb incoming damage. Be careful though, the shield will go on cool-down if it takes too much damage. You can also parry attacks by pressing the shield button right when an attack will hit you. This will rebound ranged attacks, and stun melee enemies.";
        const MAX_LINE_LENGTH = 70;
        const lines = paragraph.split(" ");
        let currentLine = "";
        const result = lines.reduce((acc, word) => {
          if (currentLine.length + word.length + 1 > MAX_LINE_LENGTH) {
            acc.push(currentLine.trim());
            currentLine = "";
          }
          currentLine += `${word} `;
          return acc;
        }, []); 
        result.push(currentLine.trim());
        return result;
    }
    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
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
        console.log(event.type)
        switch (event.type) {
            case this.ButtonSelection.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }

        }
    }
}