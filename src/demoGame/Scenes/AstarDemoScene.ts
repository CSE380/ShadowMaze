import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import Navmesh from "../../Wolfie2D/Pathfinding/Navmesh";
import DirectStrategy from "../../Wolfie2D/Pathfinding/Strategies/DirectStrategy";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import NPCActor from "../Actors/NPCActor";
import AstarStrategy from "../Pathfinding/AstarStrategy";
import { MainMenuButtonEvent } from "../CustomizedButton";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import PlayerActor from "../Actors/PlayerActor";
import HealthbarHUD from "../GameSystems/HUD/HealthbarHUD";
import { ItemEvent } from "../ProjectEvents";
import PlayerAI from "../AI/Player/PlayerAI";
/**
 * This is a dummy scene to test if your implementation of A* is working or not. If your implementation 
 * is working correctly, you should see the blue npc make it's way to the small blue box in the top-right 
 * corner of the screen.
 */
export default class AStarDemoScene extends Scene {

    protected player: PlayerActor;
    protected destination: Vec2;
    protected path: NavigationPath;
    private mainMenuLayerName: "gameMenu";
    private labelSize: number;
    private currLabels : Array<Label>;
    private nextLabels : Array<Label>;
    private mesh:Navmesh
    private wallSize; number;
    private healthbars: Map<number, HealthbarHUD>;

    // private player: PlayerActor;
    public loadScene(): void {
        this.load.spritesheet("player1", "shadowMaze_assets/spritesheets/player1.json");
        this.load.tilemap("level", "shadowMaze_assets/tilemaps/introLevel.json");
        this.load.spritesheet("BlueEnemy", "shadowMaze_assets/spritesheets/BlueEnemy.json");
        this.addLayer("primary", 10)
        this.labelSize = 16
        this.healthbars = new Map<number, HealthbarHUD>();
    }
    protected initLayers(): void {
       
        
    }
    protected initializePlayer(): void {
        let player = this.add.animatedSprite(PlayerActor, "player1", "primary");
        player.position.set(40, 40);
        player.battleGroup = 2;
        player.health = 10;
        player.maxHealth = 10;
        player.inventory.onChange = ItemEvent.INVENTORY_CHANGED
        player.addPhysics(new AABB(Vec2.ZERO, new Vec2(8, 8)));
        let healthbar = new HealthbarHUD(this, player, "primary", {size: player.size.clone().scaled(2, 1/2), offset: player.size.clone().scaled(0, -1/2)});
        console.log(player.id)
        this.healthbars.set(player.id, healthbar);
        // player.collisionShape.halfSize.scaleTo(0.25);
        player.addAI(PlayerAI);
        player.animation.play("IDLE");
        this.player = player
        this.viewport.follow(player);
    }
    public startScene(): void {
        let tilemapLayers = this.add.tilemap("level");
        let walls = <OrthogonalTilemap>tilemapLayers[1].getItems()[0];
        this.wallSize  = walls.size.x;
        let initPosition = new Vec2(40, 36);
        this.destination = new Vec2(450, 20);
        this.viewport.setCenter(initPosition.x);
        this.viewport.setBounds(0, 0, walls.size.x, walls.size.y);
        this.viewport.setZoomLevel(2);
        this.addUILayer(this.mainMenuLayerName);
        // Initialize a navmesh covering the tilemap
        this.mesh = this.initializeNavmesh(new PositionGraph(), walls);
        this.navManager.addNavigableEntity("navmesh", this.mesh);

        // Register the different pathfinding strategies with the navmesh
        this.mesh.registerStrategy("direct", new DirectStrategy(this.mesh));
        this.mesh.registerStrategy("astar", new AstarStrategy(this.mesh));

        // TODO Set the navigation strategy to be A*
        this.mesh.setStrategy("astar");

        // Create a dummy NPC
       this.initializePlayer();
        // this.buildBlackScreen();
        console.log(this.getSceneGraph().getNodesInRegion(<AABB>this.player.collisionShape));
        this.currLabels = <Array<Label>> this.getSceneGraph().getNodesAt(this.player.position)
        console.log(this.getSceneGraph().getNodesAt(this.player.position))
        this.currLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.TRANSPARENT})
       
        // this.npc.collisionShape.halfSize.scaleTo(5);
        // this.npc.setCollisionShape(new AABB(this.npc.position,1));
        console.log(this.player.collisionShape.halfSize.scaleTo(0.25))
        console.log(this.getSceneGraph().getNodesInRegion(<AABB>this.player.collisionShape));
        // The little blue rectangle in the top-right is where the NPC is trying to get to
        let destination = this.add.graphic(GraphicType.RECT, "primary", { position: this.destination, size: new Vec2(20, 20) })
        // let destination = this.add.graphic(GraphicType.CIRCLE, "primary", { center: this.destination, r:10 })
        destination.color = Color.BLUE;
        destination.color.a = .50;
        // Construct a path using the navmesh from the npc's position to the target destination
        // this.path = this.mesh.getNavigationPath(this.npc.position, this.destination);
    }
    public buildBlackScreen() {
        const len = this.wallSize / this.labelSize ;
        for (let i = 0; i <= len; i++) {
            for (let j = 0; j <= len; j++) {
                const x = i * this.labelSize;
                const y = j * this.labelSize + this.labelSize / 2;
                this.addBlackLabel(x, y);
            }
        }
    }
    public addBlackLabel(x: number, y: number) {
        const options = {
            position: new Vec2(x, y),
            text: "",
        }
        const label = this.add.uiElement(UIElementType.LABEL, this.mainMenuLayerName, options);
        label.size.set(this.labelSize * 2, this.labelSize * 2);
        label.borderWidth = 0;
        label.borderRadius = 0;
        label.borderColor = Color.TRANSPARENT;
        label.backgroundColor = Color.BLACK;
    }
    public updateScene(deltaT: number): void {
        this.updateLabel()
    }
    public updateLabel(){
        this.nextLabels= <Array<Label>>this.getSceneGraph().getNodesAt(this.player.position)
        this.currLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.BLACK})
        this.nextLabels.forEach(label=>{if (label.backgroundColor)label.backgroundColor=Color.TRANSPARENT})
        this.currLabels = this.nextLabels;
    }
    /**
     * Initializes the navmesh graph used by the NPCs in the HW4Scene. This method is a little buggy, and
     * and it skips over some of the positions on the tilemap. If you can fix my navmesh generation algorithm,
     * go for it.
     * @author PeteyLumpkins
     */

    protected initializeNavmesh(graph: PositionGraph, walls: OrthogonalTilemap): Navmesh {

        let dim: Vec2 = walls.getDimensions();
        for (let i = 0; i < dim.y; i++) {
            for (let j = 0; j < dim.x; j++) {
                let tile: AABB = walls.getTileCollider(j, i);
                graph.addPositionedNode(tile.center);
            }
        }

        let rc: Vec2;
        for (let i = 0; i < graph.numVertices; i++) {
            rc = walls.getTileColRow(i);
            if (!walls.isTileCollidable(rc.x, rc.y) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), rc.y) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), rc.y) &&
                !walls.isTileCollidable(rc.x, MathUtils.clamp(rc.y - 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(rc.x, MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), MathUtils.clamp(rc.y + 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x + 1, 0, dim.x - 1), MathUtils.clamp(rc.y - 1, 0, dim.y - 1)) &&
                !walls.isTileCollidable(MathUtils.clamp(rc.x - 1, 0, dim.x - 1), MathUtils.clamp(rc.y - 1, 0, dim.y - 1))

            ) {
                // Create edge to the left
                rc = walls.getTileColRow(i + 1);
                if ((i + 1) % dim.x !== 0 && !walls.isTileCollidable(rc.x, rc.y)) {
                    graph.addEdge(i, i + 1);
                    // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + 1)})
                }
                // Create edge below
                rc = walls.getTileColRow(i + dim.x);
                if (i + dim.x < graph.numVertices && !walls.isTileCollidable(rc.x, rc.y)) {
                    graph.addEdge(i, i + dim.x);
                    // this.add.graphic(GraphicType.LINE, "graph", {start: this.graph.getNodePosition(i), end: this.graph.getNodePosition(i + dim.x)})
                }


            }
        }

        // Set this graph as a navigable entity
        return new Navmesh(graph);

    }
}