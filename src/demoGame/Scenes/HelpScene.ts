/* #################### IMPORTS #################### */
// Import from Wolfie2D or your own files here
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { BackButtonEvent } from "../CustomizedButton";
import MainMenu from "./MainMenuScene";
import HW4Scene from "./AbstractScene";
/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class HelpScene extends HW4Scene {
    /* ########## MEMBER DEFINITIONS ##########*/
    // private mainMenuLayerName: string = "startScene";
    loadScene(): void {
        // this.load.tilemap("map", "../dist/shadowMaze_assets/tilemaps/test2.json");
        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/mazeBackground.jpg");
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
            position: new Vec2(center.x, center.y - 450),
            text: "Help",
            backgroundColor: Color.TRANSPARENT,
            fontSize: 50,
        }
        let helpTextOption = {
            position: center,
            margin: 50,
            backgroundColor: Color.TRANSPARENT,
            fontSize: 31,
        }
        this.addLabel(textOption);
        this.addHelpTextLayer(helpTextOption);
        this.addBackButon(center);
    }
   
  
    public handleEvent(event: GameEvent): void {
        super.handleEvent(event);
        console.log(event.type);
        switch (event.type) {
            case BackButtonEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }

        }
    }
}