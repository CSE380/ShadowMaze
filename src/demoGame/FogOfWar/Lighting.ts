import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import { GameLayers } from "../GameLayers";
import ProjectScene from "../Scenes/AbstractScene";
export default class Lighting {
    private scene:Scene;
    private isDark:boolean;
    private darkTimer:Timer;
    private lightTimer:Timer;
    constructor(scene:ProjectScene){
        this.scene =scene;
        this.isDark = true;
        this.darkTimer=new Timer(1000,this.handledarkTimer.bind(this));
        this.lightTimer=new Timer(500,this.handlelightTimer.bind(this));
        this.darkTimer.start();
    }
    protected handledarkTimer(){
       
        if(this.isDark){
            this.isDark =false;
            this.scene.getLayer(GameLayers.FOG_OF_WAR).setHidden(true);
            this.lightTimer.start();
        }
    }
    protected handlelightTimer(){
        console.log(this.isDark)
        if(!this.isDark){
            this.isDark =true;
            this.scene.getLayer(GameLayers.FOG_OF_WAR).setHidden(false);
            this.darkTimer.start();
        }
    }
}