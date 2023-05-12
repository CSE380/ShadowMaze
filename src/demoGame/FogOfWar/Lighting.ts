import Graphic from "../../Wolfie2D/Nodes/Graphic";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { GameLayers } from "../GameLayers";
import AbstractScene from "../Scenes/AbstractScene";

export default class Lighting {
    private scene: Scene;
    private timers: Timer[];
    private labels: Label[];
    private timerIndex: number;
    private length = 100;
    private colorArray: Color[];
    private numberofFlashback: number;
    private numberofMaxFlashback = 4;

    constructor(scene: AbstractScene) {
        this.scene = scene;

        // Create an array of timers and labels
        this.timers = [];
        this.colorArray = [];
        this.numberofFlashback = 0;
        this.labels = this.scene.getLayer(GameLayers.FOG_OF_WAR).getItems() as Label[];
        for (let i = 0; i < this.length; i++) {
            const timer = new Timer(50, this.handleTimer.bind(this, i));
            this.timers.push(timer);
            this.createAlpha(i);
        }

        this.timerIndex = 0;
        this.timers[0].start();
    }
  

    protected createAlpha(i: number) {
        let { r, g, b, a } = new Color(0, 0, 0, 0);
        const length = this.length;
        const lightningInterval = 0.2 * length;
        const base = 0.5;
        const ratio = base / lightningInterval;
        let offset = 0.1;

        if (i < lightningInterval) {
            a = 1 - ratio * i;
            let rgbValue = 255 - (i / lightningInterval) * 255
            r = g = b = Math.round(rgbValue);
        } else {
            const range = 1 - base;
            a = base + (i - lightningInterval) / (this.length - lightningInterval) * range + offset;
            r = g = b = 0;
        }
        const color = new Color(r, g, b, a);
        this.colorArray.push(color);
    }
    protected handleTimer(index: number) {
        // Change the color of the label and start the next timer
        this.updateLightningColor();
        this.timerIndex++;
        if (this.timerIndex >= this.timers.length) {
            this.timerIndex = 0;
            this.numberofFlashback = 0;
        }
        this.timers[this.timerIndex].start();
    }
    protected updateLightningColor() {
        let index = this.timerIndex
        let flashbackRatio = 30;
        let flashBackIntervalRatio = 0.4;
        let start = flashBackIntervalRatio * this.length;
        let end = (flashBackIntervalRatio + 0.2) * this.length;
        let probability = 1;
        let probablityOffset = 0.03;
        if (index > start && index < end && this.calculateFlashbackProbability() && this.numberofFlashback < this.numberofMaxFlashback) {
            let random = Math.random();
            let flashbackOffset = 0;
            if (random > probability - probablityOffset) {
                flashbackOffset = flashbackRatio;
            }
            else if (random > probability - 2 * probablityOffset) {
                flashbackOffset = 0.7 * flashbackRatio;
            }
            else if (random > probability - 3 * probablityOffset) {
                flashbackOffset = 0.3 * flashbackRatio;
            }
            if (flashbackOffset > 0) {
                this.numberofFlashback++;
                console.log("flash")
            }
            index -= flashbackOffset;
            this.timerIndex = index;
        }
        this.labels.forEach(label => label.backgroundColor = this.colorArray[index]);
    }
    protected calculateFlashbackProbability() {
        let random = Math.random();
        let ratio = 1 / this.numberofMaxFlashback;
        let probability = this.numberofFlashback * ratio
        return random > probability;
    }
}
