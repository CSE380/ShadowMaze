import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";
import GraphUtils from "../../Wolfie2D/Utils/GraphUtils";
import Graph from "../../Wolfie2D/DataTypes/Graphs/Graph";
import EdgeNode from "../../Wolfie2D//DataTypes/Graphs/EdgeNode";
import PositionGraph from "../../Wolfie2D/DataTypes/Graphs/PositionGraph";
// TODO Construct a NavigationPath object using A*

/**
 * The AstarStrategy class is an extension of the abstract NavPathStrategy class. For our navigation system, you can
 * now specify and define your own pathfinding strategy. Originally, the two options were to use Djikstras or a
 * direct (point A -> point B) strategy. The only way to change how the pathfinding was done was by hard-coding things
 * into the classes associated with the navigation system. 
 * 
 * - Peter
 */
class Node {
    public fCost: number;
    public gCost: number;
    public hCost: number;
    static startIndex: number;
    public isEnd: boolean;
    static g: PositionGraph;
    static endIndex: number;
    public currIndex: number;
    constructor(index: number, startIndex?: number, endIndex?: number, g?: PositionGraph,gCost?:number) {

        if (endIndex && startIndex) {
            Node.endIndex = endIndex;
            Node.startIndex = startIndex;
            Node.g = g;
            this.gCost = 0;
        }
        this.currIndex = index;
        // this.gCost = this.manhattanDistance(index, Node.startIndex);
        this.hCost = this.manhattanDistance(index, Node.endIndex);
        this.fCost = this.gCost + this.hCost;
        // this.isEnd = Math.abs(this.currIndex - Node.endIndex) <=1
        this.isEnd = this.hCost == 0;
    }
    public manhattanDistance(a: number, b: number): number {
        return Math.abs(this.convertIndexToCoord(a).x - this.convertIndexToCoord(b).x)
           + Math.abs( this.convertIndexToCoord(a).y - this.convertIndexToCoord(b).y);
    }
    public convertIndexToCoord(a: number) {
        const len = 64;
        return {
            x: Math.floor(a / len),
            y: Math.floor(a % len),
        }
    }
}
export default class AstarStrategy extends NavPathStrat {

    /**
     * @see NavPathStrat.buildPath()
     */
    public buildPath(to: Vec2, from: Vec2): NavigationPath {
        let start = this.mesh.graph.snap(from);
        let end = this.mesh.graph.snap(to);
        let pathStack = new Stack<Vec2>(this.mesh.graph.numVertices);
        pathStack.push(to.clone());
        pathStack.push(this.mesh.graph.positions[end]);
        let parent = this.Astart(this.mesh.graph, start, end)
        for (let index of parent) {
            pathStack.push(this.mesh.graph.positions[index]);
        }
        return new NavigationPath(pathStack);
    }

    public getMinNode(nodeSet: Set<Node>) {
        let minNode = null;
        for (let currNode of nodeSet) {
            if (minNode == null) {
                minNode = currNode
            }
            else {
                if (currNode.fCost < minNode.fCost || (currNode.fCost == minNode.fCost && currNode.hCost < minNode.hCost)) {
                    minNode = currNode;
                }
            }
        }
        nodeSet.delete(minNode);
        return minNode;
    }
    public Astart(g: PositionGraph, start: number, end: number): Array<number> {
        let parent: Array<number> = new Array(g.numVertices).fill(0);
        let openNodeSet = new Set<Node>();
        let closeIndexArr : Array<boolean> = new Array(g.numVertices)
        let firstNode = new Node(start, start, end, g);
        openNodeSet.add(firstNode)
        let move = [1, -1, 64, -64]
        let currNode: Node;
        while (true) {
            currNode = this.getMinNode(openNodeSet);
            let currIndex = currNode.currIndex;
            if (currNode.isEnd) break;
            closeIndexArr[currIndex]=true;
            for (let moveIndex of move) {
                let nextIndex = currIndex + moveIndex
                if (g.edges[nextIndex]== null) {
                    console.log("against the wall");
                }
                if (g.edges[nextIndex] == null || closeIndexArr[nextIndex]) {
                    continue;
                }
                let nextNode = new Node(nextIndex)
                nextNode.gCost = currNode.gCost + 8;
                nextNode.fCost = nextNode.gCost + nextNode.hCost ;
                parent[nextNode.currIndex] = currNode.currIndex;
                openNodeSet.add(nextNode);
                closeIndexArr[nextIndex] = true;
                nextNode.gCost = currNode.gCost+8
            }
        }
        let index = currNode.currIndex;
        let result = [];
        while (index != firstNode.currIndex) {
            result.push(index);
            index = parent[index]
        }
        // console.log(result)
        return result;
    }

}