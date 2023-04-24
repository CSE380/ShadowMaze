import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";

// TODO Construct a NavigationPath object using A*

class Node {
    index: number;
    parent: Node;
    g: number;
    h: number;

    constructor(index: number, parent?: Node, g?: number, h?: number) {
        this.index = index;
        this.parent = parent;
        this.g = g;
        this.h = h;
    }
}

/**
 * The AstarStrategy class is an extension of the abstract NavPathStrategy class. For our navigation system, you can
 * now specify and define your own pathfinding strategy. Originally, the two options were to use Djikstras or a
 * direct (point A -> point B) strategy. The only way to change how the pathfinding was done was by hard-coding things
 * into the classes associated with the navigation system. 
 * 
 * - Peter
 */
export default class AstarStrategy extends NavPathStrat {
    /**
     * @see NavPathStrat.buildPath()
     */
    public buildPath(to: Vec2, from: Vec2): NavigationPath {
        let start = this.mesh.graph.snap(from);
		let end = this.mesh.graph.snap(to);
		let pathStack = new Stack<Vec2>(this.mesh.graph.numVertices);
        let pathNode = this.endNode(start, end);

        pathStack.push(to.clone());
        while (pathNode != null) {
            pathStack.push(this.mesh.graph.positions[pathNode.index]);
            pathNode = pathNode.parent;
        }
        return new NavigationPath(pathStack);
    }
    
    private endNode(start: number, end: number): Node {
        let startVec = this.mesh.graph.positions[start];
        let endVec = this.mesh.graph.positions[end];
        let openList: Array<Node> = new Array();
        let closedList: Array<boolean> = new Array(this.mesh.graph.numVertices);
        openList.push(new Node(start, null, 0, endVec.distanceTo(startVec)));
        closedList[start] = true;
        
        while (openList.length > 0) {
            //find node with lowest f=g+h value
            let curr = openList.reduce((a, b) => a.g + a.h < b.g + b.h ? a : b);
            openList.splice(openList.indexOf(curr), 1);
            if (curr.index == end)
                return curr;
                
            let edge = this.mesh.graph.getEdges(curr.index);
            while (edge != null) {
                if (!closedList[edge.y]) {
                    let adjNode = new Node(edge.y);
                    let position = this.mesh.graph.positions[edge.y];
                    adjNode.g = position.distanceTo(this.mesh.graph.positions[curr.index]) + curr.g;
                    adjNode.h = position.distanceTo(endVec);
                    adjNode.parent = curr;

                    openList.push(adjNode);
                    closedList[edge.y] = true;
                }
                edge = edge.next;
            }
        }

        return null;
    }
}