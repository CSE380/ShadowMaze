/* #################### IMPORTS #################### */
// Import from Wolfie2D or your own files here
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AstarDemoScene from "./AstarDemoScene";
import {  StartMenuButtonEvent} from "../CustomizedButton";
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
    private backgroundImageKey:"backgroundImage";
    private mainMenuLayerName:"startScene";
    private backgroundImage: Sprite;
    private ButtonSelection:typeof StartMenuButtonEvent;
    loadScene(): void {
        // this.load.tilemap("map", "../dist/hw4_assets/tilemaps/test2.json");
        
        this.load.image(this.backgroundImageKey,"hw4_assets/images/splash.jpg");
        this.ButtonSelection = StartMenuButtonEvent
        // console.log(this.load.getImage("image"));
    }

    // startScene() is where you should build any game objects you wish to have in your scene,
    // or where you should initialize any other things you will need in your scene
    // Once again, this occurs strictly after loadScene(), so anything you loaded there will be available
    startScene(): void {
        
        this.addUILayer(this.mainMenuLayerName)
        this.backgroundImage = this.add.sprite(this.backgroundImageKey,this.mainMenuLayerName);
        let center = this.viewport.getCenter();
        this.backgroundImage.position.set(center.x, center.y);
        let textOption = {
            position: new Vec2(center.x, center.y - 300),
            text: "Shadow Maze"
        }
        this.addName(textOption);
        let buttonOption = {
            position: new Vec2(center.x, center.y + 100),
            text: this.ButtonSelection.START_GAME
        }
       this.addButtons("Start Game",buttonOption );
    }
    public updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
    public addName(options){
        const textColor=new Color(165, 151, 245,2);
        const name = <Label>this.add.uiElement(UIElementType.LABEL,this.mainMenuLayerName,options);
        name.size.set(400, 100);
        name.borderWidth = 2;
        name.setTextColor(Color.WHITE)
        name.setFontsize(60)
        console.log(name.textColor)
        // name.borderColor = Color.WHITE;
        // name.backgroundColor = Color.BLACK;
    }
    public addButtons(buttonName:string, options){
        const play = this.add.uiElement(UIElementType.BUTTON, this.mainMenuLayerName, options);
        play.size.set(300, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.BLACK;
        play.onClickEventId = buttonName;
        this.receiver.subscribe(buttonName);
    }
   
    public handleEvent(event: GameEvent): void {
        console.log(event.type)
            switch(event.type) {
                case this.ButtonSelection.START_GAME: {
                    this.sceneManager.changeToScene(MainMenu);
                    break;
                }
                
            }
        }
}