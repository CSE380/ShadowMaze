import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { GameLayers } from "../GameLayers";
import ProjectScene from "../Scenes/AbstractScene";

export default class Lighting {
    private scene: Scene;
    private isDark: boolean;
    private timers: Timer[];
    private labels: Label[];
    private timerIndex: number;
    private colorLength = 7;
    private colorArray: Color[];
    constructor(scene: ProjectScene) {
        this.scene = scene;
        this.isDark = true;

        // Create an array of timers and labels
        this.timers = [];
        this.colorArray = [];
        this.labels = this.scene.getLayer(GameLayers.FOG_OF_WAR).getItems() as Label[];
        for (let i = 0; i < this.colorLength; i++) {
            const timer = new Timer(1000, this.handleTimer.bind(this, i));
            const color = new Color(0, 0, 0, 1 / (i + 1));
            console.log(this.colorArray)
            this.colorArray.push(color);
            this.timers.push(timer);
        }
        // Start the first timer
        this.timerIndex = 0;

        this.timers[0].start();
    }

    protected handleTimer(index: number) {
        // Change the color of the label and start the next timer
        console.log("runing")
        this.labels.forEach(label =>label.backgroundColor = this.colorArray[this.timerIndex] );
        this.timerIndex++;
        if (this.timerIndex >= this.timers.length) {
            this.timerIndex = 0;
        }
        this.timers[this.timerIndex].start();
    }
}
