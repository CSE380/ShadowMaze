import Vec2 from "../../DataTypes/Vec2";
import Graphic from "../Graphic";
import Line from "./Line";
import Color from "../../Utils/Color";
export default class CircleGraph extends Graphic {
    protected _end: Vec2;
    protected r:number;
    borderColor: Color;

    /** The width of the border */
    borderWidth: number;
    constructor(center: Vec2, r:number){
        super();
        this.center = center;
        this.r = r;
        this.borderColor = Color.TRANSPARENT;
        this.borderWidth = 0;
        this.buildCircle();
        // Does this really have a meaning for lines?
        
    }
    private buildCircle(){
        
        for(let i = 0;i<=2*Math.PI;i +=0.01){
            let x = Math.sin(i) +this.r;
            let y = Math.cos(i)+this.r;
            let end= new Vec2(x, y);
            new Line(this.center,end);
        }
    }
    set center(pos: Vec2){
        this.position = pos;
    }

    get center(): Vec2 {
        return this.position;
    }

    set end(pos: Vec2){
        this._end = pos;
    }

    get end(): Vec2 {
        return this._end;
    }
    setBorderColor(color: Color): void {
        this.borderColor = color;
    }

    // @deprecated
    getBorderColor(): Color {
        return this.borderColor;
    }

    /**
     * Sets the border width of this rectangle
     * @param width The width of the rectangle in pixels
     */
    setBorderWidth(width: number){
        this.borderWidth = width;
    }

    getBorderWidth(): number {
        return this.borderWidth;
    }
}