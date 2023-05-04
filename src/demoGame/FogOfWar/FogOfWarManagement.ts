import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import { GameLayers } from "../GameLayers";
import AbstractScene from "../Scenes/AbstractScene";
import Lighting from "./Lighting";
export enum FogOfWarMode {
    LIGHTING_MODE = "lighting",
    STANDARD="Standard"
}
export default class FogOfWarManagement {
    private scene: AbstractScene;
    private add: FactoryManager;
    private wallSize: number;
    private labelSize: number;
    constructor(scene: AbstractScene, add: FactoryManager,wallSize?:number,labelSize?: number) {
        this.scene = scene;
        this.add = add;
        this.wallSize = wallSize;
        this.labelSize = labelSize;
    }
    public initFogOfWar(modeName: string) {
        if (modeName == FogOfWarMode.LIGHTING_MODE) {
            const option = {
                position: new Vec2(256, 314),
                text: "",
            }
            const label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.FOG_OF_WAR, option);
            label.size.set(1024, 956);
            label.borderWidth = 0;
            label.borderRadius = 0;
            label.borderColor = Color.TRANSPARENT;
            label.backgroundColor = Color.BLACK;
            new Lighting(this.scene);
        }
        else {
            const len = this.wallSize / this.labelSize;
            for (let i = 0; i <= 2 * len; i++) {
                for (let j = 6; j <= 2 * len; j++) {
                    let x = 0.5 * i * this.labelSize;
                    let y = 0.5 * j * this.labelSize;
                    let options = {
                        position: new Vec2(x, y),
                        text: "",
                    }
                    this.addBlackLabel(options);
                }
            }
        }
    }
    public addBlackLabel(options: Record<string, any>) {
        const label = <Label>this.add.uiElement(UIElementType.LABEL, GameLayers.FOG_OF_WAR, options);
        label.size.set(this.labelSize * 2, this.labelSize * 2);
        label.borderWidth = 0;
        label.borderRadius = 0;
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.FOG_OF_WAR_BLACK;
    }
}