import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import {  SelectMenuButtonEvent } from "../CustomizedButton";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import LevelScene from "./introLevelScene";
export default class MainMenu extends Scene {
    private mainMenuLayerName="mainMenu";
    private backgroundImageKey="backgroundImage";
    private mainMenu: Layer;
    private backgroundImage: Sprite;
    public loadScene(){
        this.load.image(this.backgroundImageKey, "shadowMaze_assets/images/mazeBackground.jpg");

    }

    public startScene(){
        this.mainMenu = this.addUILayer(this.mainMenuLayerName);
        console.log(this.mainMenuLayerName)
        const center = this.viewport.getCenter();
        this.backgroundImage = this.add.sprite(this.backgroundImageKey, this.mainMenuLayerName);
        console.log(this.backgroundImage)
        this.backgroundImage.position.set(center.x, center.y);
        // The main menu
        let positionY=center.y - 100;
        let i = 0 ;
        for(const butttonName in SelectMenuButtonEvent){
            
            if(i  === 0 ){
                this.addButtons(butttonName,center.x,positionY );
            }
            // else{
            //     this.addButtons(butttonName,center.x+250,positionY );
            //     positionY = positionY + 100;
            // }
            i++;
        }
        // this.addButtons(SelectMenuButtonEvent.LEVEL_1,center.x,center.y-100)
    }
    
    public addButtons(buttonName:string, x:number,y:number){
        const options={
            position:new Vec2(x,y),
            text:SelectMenuButtonEvent[buttonName],
        }
        const newButton = this.add.uiElement(UIElementType.BUTTON, this.mainMenuLayerName, options);
        newButton.size.set(300, 50);
        newButton.borderWidth = 2;
        newButton.borderColor = Color.WHITE;
        newButton.backgroundColor = Color.BLACK;
        newButton.onClickEventId = buttonName;
        this.receiver.subscribe(buttonName);
    }
    public updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public handleEvent(event: GameEvent): void {
    //    console.log(event.type)
        switch(SelectMenuButtonEvent[event.type]) {
            case SelectMenuButtonEvent.LEVEL_1: {
                this.sceneManager.changeToScene(LevelScene);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_2: {
                // this.sceneManager.changeToScene(AstarDemoScene);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_6:{

            }
        }
    }
}