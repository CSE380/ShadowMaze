import Unique from "../../../Wolfie2D/DataTypes/Interfaces/Unique";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import Layer from "../../../Wolfie2D/Scene/Layer";
import Scene from "../../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../Targeting/BasicTargetable";
import BasicTargeting from "../Targeting/BasicTargeting";

import HW4Scene from "../../Scenes/AbstractScene";
import Inventory from "./Inventory";
import { TargetableEntity } from "../Targeting/TargetableEntity";
import { TargetingEntity } from "../Targeting/TargetingEntity";


export default abstract class Item implements Unique, TargetableEntity {

    protected sprite: Sprite;
    protected emitter: Emitter;
    protected _inventory: Inventory | null;
    protected _targetable: TargetableEntity;
    protected itemName:string;
    public isPickable:boolean;
    public floatInitPosition:number;
    public floatDistance=10;
    protected constructor(sprite: Sprite){ 
        this.sprite = sprite;
        this.emitter = new Emitter();
        this.isPickable = true;
        this._inventory = null;
        this._targetable = new BasicTargetable(this.sprite);
    }

    getTargeting(): TargetingEntity[] { 
        return this._targetable.getTargeting(); 
    }
    addTargeting(targeting: TargetingEntity): void {
        this._targetable.addTargeting(targeting);
    }
    removeTargeting(targeting: TargetingEntity): void {
        this._targetable.removeTargeting(targeting);
    }
    
    public get relativePosition(): Vec2 { return this.sprite.relativePosition; }

    public get id(): number { return this.sprite.id; }
    public get name():string {return this.itemName};
    public set name(name:string){ this.itemName = name}
    public get getPickable():boolean {return this.isPickable}
    public set setPickable(flag:boolean) {this.isPickable = flag}
    public get position(): Vec2 { return this.sprite.position; }
    public set setStartY(yInitPosition:number){this.floatInitPosition=yInitPosition}
    public get visible(): boolean { return this.sprite.visible; }
    public set visible(value: boolean) { this.sprite.visible = value; }

    public get inventory(): Inventory | null { return this._inventory; }
    public set inventory(value: Inventory | null) { this._inventory = value; }

}