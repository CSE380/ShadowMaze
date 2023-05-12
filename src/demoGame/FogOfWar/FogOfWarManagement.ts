import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager";
import Color from "../../Wolfie2D/Utils/Color";
import { GameLayers } from "../GameLayers";
import AbstractScene from "../Scenes/AbstractScene";
import Lighting from "./Lighting";
import Rain, { CENTER, RAIN_SHAPE, RAIN_SIZE, VIEWPORT_SIZE } from "./Rain";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
export enum FogOfWarMode {
    LIGHTING_MODE = "lighting",
    STANDARD = "Standard"
}
export default class FogOfWarManagement {
    private scene: AbstractScene;
    private add: FactoryManager;
    private wallSize: number;
    private labelSize: number;
    private rainDroplets: Array<Graphic>;
    constructor(scene: AbstractScene, add: FactoryManager, wallSize?: number, labelSize?: number) {
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
        label.size.set(this.labelSize * 4, this.labelSize * 4);
        label.borderWidth = 0;
        label.borderRadius = 0;
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.FOG_OF_WAR_BLACK;
    }
    public createLine() {

    }
    public initObjectPools(): void {
        this.rainDroplets = new Array(500);
        for (let i = 0; i < this.rainDroplets.length; i++) {
            let start = RandUtils.randOutsideViewportVec(RAIN_SIZE, VIEWPORT_SIZE);
            this.rainDroplets[i] = this.add.graphic(GraphicType.RECT, GameLayers.UI, {
                position: start,
                size: new Vec2(1, RandUtils.randFloat(7,10)),
            });
            this.rainDroplets[i].color = Color.RAIN_COLOR;
            this.rainDroplets[i].visible = true;
            this.rainDroplets[i].rotation = Vec2.UP.angleToCCW(CENTER.dirTo(start));
            this.rainDroplets[i].addAI(Rain);
        }
    }


}

// let start = RandUtils.randOutsideViewportVec(RAIN_SIZE, VIEWPORT_SIZE /2);
// let dir = start.dirTo(CENTER).scale(0.1);
// let end = start.clone();
// end.add(dir)
// this.rainDroplets[i] = this.add.graphic(GraphicType.LINE, GameLayers.UI, {
//     start,
//     end,
//     color: Color.BLACK,
// });