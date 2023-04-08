import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import MainHW4Scene from "./MainHW4Scene";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import ControlScene from "./ControlScene";
import GuardDemoScene from "./GuardDemoScene";
import { MainMenuButtonEvent } from "../CustomizedButton";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import HelpScene from "./HelpScene";
import StartScene from "./StartScene";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
export default class MainMenu extends Scene {
    private mainMenuLayerName:"mainMenu";
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private about: Layer;
    private control: Layer;
    private backgroundImage: Sprite;

    private backgroundImageKey:"backgroundImage";
    public loadScene(){
        this.load.image(this.backgroundImageKey,"hw4_assets/images/fullBackground.jpg");

    }

    public startScene(){
        const center = this.viewport.getCenter();
        this.mainMenu = this.addUILayer(this.mainMenuLayerName);
        this.backgroundImage = this.add.sprite(this.backgroundImageKey,this.mainMenuLayerName);
        this.backgroundImage.position.set(center.x, center.y);
        // The main menu
        let positionY=center.y - 400;
       
        for(const butttonName in MainMenuButtonEvent){
            positionY = positionY + 100;
            this.addButtons(butttonName,center.x,positionY );
        }
    }
    public addButtons(buttonName:string, x:number,y:number){
        const options={
            position:new Vec2(x,y),
            text:MainMenuButtonEvent[buttonName],
        }
        const play = this.add.uiElement(UIElementType.BUTTON, this.mainMenuLayerName, options);
        
        play.size.set(300, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.BLACK;
        play.onClickEventId = buttonName;
        this.receiver.subscribe(buttonName);
    }
    public updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch(MainMenuButtonEvent[event.type]) {
            case MainMenuButtonEvent.SELECT_LEVELS: {
              
                this.sceneManager.changeToScene(SelectLevelMenuScene);
                break;
            }
            case MainMenuButtonEvent.CONTROLS: {
                this.sceneManager.changeToScene(ControlScene);
                break;
            }
            case MainMenuButtonEvent.HELP: {
                this.sceneManager.changeToScene(HelpScene);
                break;
            }
            case MainMenuButtonEvent.EXIT:{
                this.sceneManager.changeToScene(StartScene);
            }
        }
    }
}