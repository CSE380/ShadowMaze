import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { GameLayers } from "../GameLayers";
import AbstractScene from "../Scenes/AbstractScene";

export default class Lighting {
    private scene: Scene;
    private isDark: boolean;
    private timers: Timer[];
    private labels: Label[];
    private timerIndex: number;
    private colorLength = 50;
    private colorArray: Color[];
    constructor(scene: AbstractScene) {
        this.scene = scene;
        this.isDark = true;

        // Create an array of timers and labels
        this.timers = [];
        this.colorArray = [];
        this.labels = this.scene.getLayer(GameLayers.FOG_OF_WAR).getItems() as Label[];
        for (let i = 0; i < this.colorLength; i++) {
            const timer = new Timer(100, this.handleTimer.bind(this, i));
            this.timers.push(timer);
            this.createAlpha(i);
        }
        this.timerIndex = 0;
        this.timers[0].start();
    }
    protected createAlpha(i: number) {
        let { r, g, b, a } = new Color(0, 0, 0, 0);
        const length = this.colorLength;
        const lightningInterval = 0.2 * length;
        const base = 0.5;
        const ratio = base / lightningInterval;
        if (i < lightningInterval) {
            a = 1 - ratio * i;
            r = Math.round(255 - (i / lightningInterval) * 255);
            g = Math.round(255 - (i / lightningInterval) * 255);
            b = Math.round(255 - (i / lightningInterval) * 255);
        } else {
            const range = 1 - base;
            a = base + (i - lightningInterval) / (this.colorLength - lightningInterval) * range+0.1;
            r = 0;
            g = 0;
            b = 0;
        }
        
        const color = new Color(r, g, b, a);
        this.colorArray.push(color);
        console.log(color);
        
      }
      



    protected handleTimer(index: number) {
        // Change the color of the label and start the next timer
        // if(this.timerIndex < )
        this.labels.forEach(label => label.backgroundColor = this.colorArray[this.timerIndex]);

        this.timerIndex++;
        if (this.timerIndex >= this.timers.length) {
            this.timerIndex = 0;
        }
        this.timers[this.timerIndex].start();
    }
}
