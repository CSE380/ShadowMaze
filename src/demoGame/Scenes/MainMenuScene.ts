import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
// import MainHW4Scene from "./MainHW4Scene";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
// import GuardDemoScene from "./GuardDemoScene";
import { MainMenuButtonEvent } from "../CustomizedButton";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import HelpScene from "./HelpScene";
import StartScene from "./StartScene";
import ControlScene from "./ControlScene";
import CheatCodeMenuScene from "./CheatCodeMenuScene";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { GameLayers } from "../GameLayers";
export default class MainMenu extends Scene {
    private mainMenuLayerName:"mainMenu";
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private about: Layer;
    private control: Layer;
    private backgroundImage: Sprite;
    
    private backgroundImageKey:"backgroundImage";
    private option:Record<string, any>;
    public initScene(option: Record<string, any>): void {
        this.option = option
        console.log(this.option)
    }
    public loadScene(){
        this.load.image(this.backgroundImageKey,"shadowMaze_assets/images/fullBackground.jpg");
    }

    public startScene(){
        const center = this.viewport.getCenter();
        this.mainMenu = this.addUILayer(  GameLayers.BASE);
        this.backgroundImage = this.add.sprite(this.backgroundImageKey,  GameLayers.BASE);
        this.backgroundImage.position.set(center.x, center.y);
        // The main menu
        let positionY=center.y - 400;
       
        for(let buttonName in MainMenuButtonEvent){
            if(buttonName == "Restart") continue;
            if(buttonName == "Select_levels") 
                buttonName = "Select levels"
                
            positionY = positionY + 100;          
            const options={
                position:new Vec2(center.x,positionY),
                text:buttonName,
            }
            this.addButtons(options);
        }
    }
    public addButtons(options:Record<string, any>){
       
        const newButton = <Label>this.add.uiElement(UIElementType.BUTTON,  GameLayers.BASE, options);
        
        newButton.size.set(300, 50);
        newButton.borderWidth = 2;
        newButton.borderColor = Color.TRANSPARENT;
        newButton.backgroundColor = Color.BLACK;
        newButton.setTextColor(Color.PURPLE);
        newButton.onClickEventId = options.text;
        this.receiver.subscribe(options.text);
    }
    public updateScene(deltaT: number){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch(event.type) {
            case MainMenuButtonEvent.Select_levels: {
                this.sceneManager.changeToScene(SelectLevelMenuScene,this.option);
                break;
            }
            case MainMenuButtonEvent.Controls: {
                this.sceneManager.changeToScene(ControlScene);
                break;
            }
            case MainMenuButtonEvent.Help: {
                this.sceneManager.changeToScene(HelpScene);
                break;
            }
            case MainMenuButtonEvent.Exit:{
                this.sceneManager.changeToScene(StartScene);
                break;
            }
            case MainMenuButtonEvent.CHEAT:{
                this.sceneManager.changeToScene(CheatCodeMenuScene);
                break;
            }
        }
    }
}