/* #################### IMPORTS #################### */
// Import from Wolfie2D or your own files here
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { StartMenuButtonEvent } from "../CustomizedButton";
import MainMenu from "./MainMenuScene";
import HW4Scene from "./AbstractScene";
/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class StartScene extends HW4Scene {
    /* ########## MEMBER DEFINITIONS ##########*/

    loadScene(): void {
        // this.load.tilemap("map", "../dist/shadowMaze_assets/tilemaps/test2.json");

        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/splash.jpg");
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
            position: new Vec2(center.x, center.y - 300),
            text: "Shadow Maze",
            size: new Vec2(400, 100),
            fontSize: 60,
            backgroundColor: Color.TRANSPARENT,
            font: "Apple Chancery",
        }
        this.addText(textOption);
        let buttonOption = {
            position: new Vec2(center.x, center.y + 100),
            text: StartMenuButtonEvent.START_GAME,
            size: new Vec2(300, 50),
            textColor: Color.PURPLE,
            buttonName: "Start Game",
        }
        this.addButtons(buttonOption);
    }




    public handleEvent(event: GameEvent): void {
        switch (event.type) {
            case StartMenuButtonEvent.START_GAME: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }

        }
    }
}