import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import Color from "../../Wolfie2D/Utils/Color";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
/**
 * A class that represents the behavior of the bubbles in the HW2Scene
 * @author PeteyLumpkins
 */
export const RAIN_SIZE = 10;
export const RAIN_SHAPE = new Vec2(1, RAIN_SIZE);
export const VIEWPORT_SIZE = 512;
export const CENTER = new Vec2(VIEWPORT_SIZE / 2, VIEWPORT_SIZE / 2);
export default class Rain implements AI {
  // The GameNode that owns this behavior
  private owner: Graphic;

  // The current horizontal and vertical speed of the bubble


  // Upper and lower bounds on the vertical speed of the bubble
  private speed: number;
  private center: Vec2;
  private timer: number;
  private maxTimer = 0.1;
  public initializeAI(owner: Graphic, options: Record<string, any>): void {
    this.owner = owner;
    this.speed = Math.random() * RandUtils.randFloat(1, 2);
    this.center = this.buildCenter(VIEWPORT_SIZE / 3);
    this.buildTimer();
    this.activate(options);
  }
  public buildCenter(padding: number): Vec2 {
    const center = VIEWPORT_SIZE / 2;
    return RandUtils.randVec(center - padding, center + padding, center - padding, center + padding);
  }
  public buildTimer() {
    this.timer = Math.random() * this.maxTimer / 6;
    // this.timer = 0;
  }
  public destroy(): void { }

  public activate(options: Record<string, any>): void {
  }

  public handleEvent(event: GameEvent): void {
    switch (event.type) {
      default: {
        throw new Error(
          "Unhandled event caught in BubbleBehavior! Event type: " + event.type
        );
      }
    }
  }

  public updateSize(deltaT: number) {
    // this.owner.size.x = this.owner.size.x - deltaT;
    this.owner.size.y = this.owner.size.y - deltaT;
    this.timer += deltaT;
    // if(this.owner.position.distanceTo(CENTER)<5){
    //   console.log(this.timer);
    // }
    if (this.owner.size.y < 4 || this.timer > this.maxTimer || this.owner.color.a < 0) {
      this.respwanDroplets();
    }

  }
  public respwanDroplets() {
    this.owner.position = RandUtils.randOutsideViewportVec(RAIN_SIZE, VIEWPORT_SIZE);
    this.owner.size = new Vec2(1, RandUtils.randFloat(7, 10));
    this.owner.rotation = Vec2.UP.angleToCCW(CENTER.dirTo(this.owner.position));
    this.owner.color.a = Math.random() * 0.5 + 0.5;
    this.buildTimer();
  }
  public updateDirection(deltaT: number) {
    let difference = this.owner.position.dirTo(CENTER).scale(this.speed);
    // this.owner.color = Color.WHITE;
    this.owner.position.add(difference);
  }
  public update(deltaT: number): void {
    if (this.owner.visible) {
      this.updateDirection(deltaT);
      this.updateSize(deltaT);
    }
  }
  public updateColor(deltaT: number): void {
    this.owner.color.a -= deltaT;
  }
}
