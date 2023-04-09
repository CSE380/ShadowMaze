import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Scene from "../../Wolfie2D/Scene/Scene";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import LaserGun from "../GameSystems/ItemSystem/Items/LaserGun";
import Healthpack from "../GameSystems/ItemSystem/Items/Healthpack";
import Battler from "../GameSystems/BattleSystem/Battler";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../Wolfie2D/Utils/Color";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
export default class HW4Scene extends Scene {
    protected mainMenuLayerName="gameMenu"
    public addText(option: Record<string, any>) {
        const name = <Label>this.add.uiElement(UIElementType.LABEL, option.layerName, option);
        name.size.set(300, 100);
        name.borderWidth = 2;
        name.setTextColor(Color.WHITE)
        name.setFontsize(28);
        if (option.align)
            name.setHAlign("left")
    }
    
}