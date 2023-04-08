import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AstarDemoScene from "./AstarDemoScene";
import {  SelectMenuButtonEvent } from "../CustomizedButton";
import SelectLevelMenuScene from "./SelectLevelMenuScene";
import LevelScene from "./LevelScene";
export default class MainMenu extends Scene {
    private mainMenuLayerName:"mainMenu";
    private backgroundImageKey:"backgroundImage";
    private mainMenu: Layer;
    public loadScene(){
        this.load.image(this.backgroundImageKey,"hw4_assets/images/fullBackground.jpg");

    }

    public startScene(){
        const center = this.viewport.getCenter();

        // The main menu
        let positionY=center.y - 100;
        this.mainMenu = this.addUILayer(this.mainMenuLayerName);
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
    //    console.log(event.type)
        switch(SelectMenuButtonEvent[event.type]) {
            case SelectMenuButtonEvent.LEVEL_1: {
                this.sceneManager.changeToScene(LevelScene);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_2: {
                this.sceneManager.changeToScene(AstarDemoScene);
                break;
            }
            case SelectMenuButtonEvent.LEVEL_6:{

            }
        }
    }
}