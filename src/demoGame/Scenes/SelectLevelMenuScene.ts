import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { BackButtonEvent, SelectMenuButtonEvent } from "../CustomizedButton";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import IntroLevelScene from "./LevelScenes/IntroLevelScene";
import { GameLayers } from "../GameLayers";
import AbstractScene from "./AbstractScene";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
import MainMenuScene from "./MainMenuScene";
import Battler from "../GameSystems/BattleSystem/Battler";
import Level2Scene from "./LevelScenes/Level2Scene";
import Level3Scene from "./LevelScenes/Level3Scene";
import Level4Scene from "./LevelScenes/Level4Scene";
import Level5Scene from "./LevelScenes/Level5Scene.";
import Level6Scene from "./LevelScenes/Level6Scene";
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
        let positionY=center.y-250;
        let i = 0 ;
        for(let buttonName in SelectMenuButtonEvent){
            buttonName = SelectMenuButtonEvent[buttonName];
           
            if(i  < 6 ){
                let buttonOption={
                    buttonName:buttonName,
                    position:new Vec2(center.x,positionY),
                    size:new Vec2(300, 70),
                    text:buttonName,
                }
                this.addButtons(buttonOption);
            }
            i++;
            positionY=positionY+100;
        }
        this.addBackButton(this.backButtonPosition);
    }

    public updateScene(deltaT: number) {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public handleEvent(event: GameEvent): void {
        
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
                this.sceneManager.changeToScene(Level2Scene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_3: {
                this.sceneManager.changeToScene(Level3Scene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_4: {
                this.sceneManager.changeToScene(Level4Scene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_5: {
                this.sceneManager.changeToScene(Level5Scene,this.option);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_6: {
                this.sceneManager.changeToScene(Level6Scene,this.option);
                break;
            }
        }
    }

    public getBattlers(): Battler[] { return this.battlers; }

}