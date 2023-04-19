import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { BackButtonEvent, SelectMenuButtonEvent } from "../CustomizedButton";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import IntroLevelScene from "./IntroLevelScene";
import LevelTwo from "./LevelTwo";
import LevelThree from "./LevelThree";
import LevelFour from "./LevelFour";
import LevelFive from "./LevelFive";
import LevelSix from "./LevelSix";
import { GameLayers } from "../GameLayers";
import AbstractScene from "./AbstractScene";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
import MainMenuScene from "./MainMenuScene";
export default class MainMenu extends AbstractScene  {
    private mainMenuLayerName = "mainMenu";
    // private backgroundImageKey = "backgroundImage";
    private mainMenu: Layer;
    // private backgroundImage: Sprite;
    // private GameLayers = GameLayers;
    public initScene(option: Record<string, any>): void {
        this.option = option
    }
    public loadScene() {
        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/mazeBackground.jpg");
    }

    public startScene() {
        this.addUILayer(this.GameLayers.BASE);
        const center = this.viewport.getCenter();
        this.backgroundImage = this.add.sprite(this.backgroundImageKey, this.GameLayers.BASE);
        this.backgroundImage.position.set(center.x, center.y);
        // The main menu
        let positionY=center.y - 100;

        let i = 0 ;
        for(let buttonName in SelectMenuButtonEvent){
            buttonName = SelectMenuButtonEvent[buttonName]
            if(i  === 0 ){
                let buttonOption={
                    buttonName:buttonName,
                    position:new Vec2(center.x,positionY),
                    size:new Vec2(300, 50),
                    text:buttonName,
                }
                this.addButtons(buttonOption);
                break;
            }
            i++;     
        }
        this.addBackButon(center);
    }

    public updateScene() {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        
        switch (event.type) {
            case BackButtonEvent.BACK:{
                this.sceneManager.changeToScene(MainMenuScene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_1: {
                this.sceneManager.changeToScene(IntroLevelScene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_2: {
                this.sceneManager.changeToScene(LevelTwo,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_3: {
                this.sceneManager.changeToScene(LevelThree,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_4: {
                this.sceneManager.changeToScene(LevelFour,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_5: {
                this.sceneManager.changeToScene(LevelFive,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_6: {
                this.sceneManager.changeToScene(LevelSix,this.option);
                break;
            }
        }
    }
}