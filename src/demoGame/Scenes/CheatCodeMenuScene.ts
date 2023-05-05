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
import Battler from "../GameSystems/BattleSystem/Battler";
/* #################### CLASS DEFINITION #################### */

// Welcome to Wolfie2D!
// This is a simple sample scene so something displays when you run the game.
export default class CheatCodeMenuScene extends HW4Scene {
    /* ########## MEMBER DEFINITIONS ##########*/
    protected Astar = "Auto-Pilot";
    protected FogOfWar = "Remove Fog of War";
    protected astarCheckLabel: Label;
    protected isAstarChecked:boolean;
    protected fogOfWarCheckLabel: Label;
    protected isfogOfWarChecked: boolean;
    loadScene(): void {
        // this.load.tilemap("map", "../dist/shadowMaze_assets/tilemaps/test2.json");

        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/mazeBackground.jpg");
        // console.log(this.load.getImage("image"));

    }

    // startScene() is where you should build any game objects you wish to have in your scene,
    // or where you should initialize any other things you will need in your scene
    // Once again, this occurs strictly after loadScene(), so anything you loaded there will be available
    startScene(): void {
        this.addUILayer(this.GameLayers.BASE)
        this.isAstarChecked = false;
        this.isfogOfWarChecked = false;
        this.backgroundImage = this.add.sprite(this.backgroundImageKey, this.GameLayers.BASE);
        let center = this.viewport.getCenter();
        this.addBackButton(this.backButtonPosition);
        this.backgroundImage.position.set(center.x, center.y);
        let textOption = {
            position: new Vec2(center.x, center.y - 450),
            text: "Cheat Mode",
            backgroundColor: Color.TRANSPARENT,
            fontSize: 50,
        }
        this.addLabel(textOption);
        this.astarCheckLabel = this.addModeButton(center, this.Astar);
        center = new Vec2(center.x, center.y + 200);
        this.fogOfWarCheckLabel = this.addModeButton(center, this.FogOfWar);
      
    }
    public addModeButton(position: Vec2, buttonName: string) {
        let aStarTextOption = {
            position: new Vec2(position.x, position.y - 250),
            text: buttonName,
            size: new Vec2(300, 50),
            // buttonName:"Astar",
            fontSize: 50,
            textColor: Color.PURPLE,
            backgroundColor: Color.TRANSPARENT,
        }
        this.addLabel(aStarTextOption);
        let aStarChoiceOption = {
            position: new Vec2(position.x, position.y - 150),
            text: "",
            size: new Vec2(50, 50),
            buttonName: buttonName,
            backgroundColor: Color.WHITE,
            borderWidth: 10,
            fontSize: 30,
        }
        this.addButtons(aStarChoiceOption);
        let aStarCheckOption = {
            position: new Vec2(position.x, position.y - 150),
            text: "\u2713",
            size: new Vec2(50, 50),
            backgroundColor: Color.WHITE,
            borderWidth: 10,
            fontSize: 50,
            textColor: Color.TRANSPARENT,
        }
        return this.addLabel(aStarCheckOption);
    }
    public updateScene(deltaT: number) {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
    public showCheckLabel(label: Label, flag: boolean) {
        if (!flag) {
            label.setTextColor(Color.BLACK);
        }
        else {
            label.setTextColor(Color.TRANSPARENT);
        }
        return !flag;
    }
   
    public handleEvent(event: GameEvent): void {
        // console.log(event.type === this.Astar)
        console.log(event.type)
        // console.log(event.type === this.FogOfWar)
        switch (event.type) {
            case BackButtonEvent.BACK: {
                const option={
                    isAstarChecked:this.isAstarChecked,
                    isfogOfWarChecked:this.isfogOfWarChecked,
                }
                this.sceneManager.changeToScene(SelectLevelMenuScene,option);
                break;
            }
            case this.Astar: {
                // this.isAstarChecked= !this.isAstarChecked
                // this.showCheckLabel(this.astarCheckLabel, this.isAstarChecked);
                this.isAstarChecked = this.showCheckLabel(this.astarCheckLabel,this.isAstarChecked);
                break;
            }
            case this.FogOfWar: {
                this.isfogOfWarChecked =this.showCheckLabel(this.fogOfWarCheckLabel, this.isfogOfWarChecked);
                break;
            }
        }
    }

    public getBattlers(): Battler[] { return this.battlers; }

    
}