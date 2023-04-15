/* #################### IMPORTS #################### */
// Import from Wolfie2D or your own files here
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { BackButtonEvent } from "../CustomizedButton";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenuScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { controlTextArray } from "../Text";
import HW4Scene from "./AbstractScene";
/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class ControlScene extends HW4Scene {
    /* ########## MEMBER DEFINITIONS ##########*/
    loadScene(): void {
        // this.load.tilemap("map", "../dist/shadowMaze_assets/tilemaps/test2.json");

        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/mazeBackground.jpg");
        // console.log(this.load.getImage("image"));
       
    }

    // startScene() is where you should build any game objects you wish to have in your scene,
    // or where you should initialize any other things you will need in your scene
    // Once again, this occurs strictly after loadScene(), so anything you loaded there will be available
    startScene(): void {
        this.addUILayer(  this.GameLayers.BASE)
        this.backgroundImage = this.add.sprite(this.backgroundImageKey,   this.GameLayers.BASE);
        let center = this.viewport.getCenter();
        this.backgroundImage.position.set(center.x, center.y);
        let textOption = {
            position: new Vec2(center.x, center.y - 450),
            text: "Controls",
            backgroundColor:Color.TRANSPARENT,
            fontSize:50,
        }
        this.addLabel(textOption);
        let controlTextOption = {
            position: center,
            text: controlTextArray,
            margin:100,
            backgroundColor:Color.TRANSPARENT,
        }
        this.addControlTextLayer(controlTextOption);
        this.addBackButon(center);
    }
      public updateScene() {
        while (this.receiver.hasNextEvent()) {
            const gameEvent = this.receiver.getNextEvent()
            this.handleEvent(gameEvent);
        }
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