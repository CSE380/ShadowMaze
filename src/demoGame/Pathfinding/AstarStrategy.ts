import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";

// TODO Construct a NavigationPath object using A*

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
        console.log(to);
        console.log(from);
		let path = new Stack<Vec2>(this.mesh.graph.numVertices);    //a stack of type Vec2 that takes the number of verticies in the graph

        let start = this.mesh.graph.snap(from); //return a vertex closest to the start in the graph
		let end = this.mesh.graph.snap(to); //return a vertex closest to the end in the graph
        
        console.log(start);
        console.log(end);

        let height = 64;
        let width = 64;

        const node = {  //create an object to represent a node
            walkable: true,
            index: null,
            g_value: -1,
            h_value: -1,
            total: -1,
            seen: false,
            origin: -1
        }
        let arrayOfNodes: Array<typeof node> = new Array(this.mesh.graph.numVertices);  //declare an array of nodes 
        for (let i = 0; i < arrayOfNodes.length; i++) { //initialize an array of nodes to repsent every node in the grpah
            const shallowClone = {...node};
            arrayOfNodes[i] = shallowClone;
            arrayOfNodes[i].index = i;
        }
        let points : Array<number> = new Array(8)   //declare an array to represent the 8 nodes that will be surrounding the current node
        let cheapest_total = this.mesh.graph.numVertices;   //represent the cheapest total of the entire grpah
        let cheapest_h_value = this.mesh.graph.numVertices;
        let cheapest_node = {...node};  //create a temp node for the node with the cheapest total
        let current = start;    //set the current to the starting position
        
        for (let i = 0; i < 4096; i++) {
            // console.log(this.mesh.graph.edges[3833]);
            if (this.mesh.graph.edges[i] == undefined || this.mesh.graph.edges[i].next == null || this.mesh.graph.edges[i].next.next == null) {
                arrayOfNodes[i].walkable = false;
            }
        }

        //BEGING CONTRUCTING THE PATH FROM START TO END
        //========================================================================================================
        if (start == end) {
            return new NavigationPath(path);
        }
        console.log(arrayOfNodes);
        console.log(this.mesh.graph.edges[1]);
        while (arrayOfNodes[current] != undefined && arrayOfNodes[current].h_value != 0) {    //keep on going until current node h value is 0, which means we are on top of the END

            // console.log(arrayOfNodes[current]);
            // console.log("while loop");
            cheapest_h_value = this.mesh.graph.numVertices;
            cheapest_total = this.mesh.graph.numVertices;
            arrayOfNodes[current].seen = true;  //the current node we are at has been seen, dont go to it again
            arrayOfNodes[start].g_value = 0;
            arrayOfNodes[start].h_value = 0;
            arrayOfNodes[start].total = 0;
            let top_left = current - height - 1;
            let top = current - height;
            let top_right = current - height + 1;
            let left = current - 1;
            let right = current + 1;
            let bottom_left = current + height - 1;
            let bottom = current + height;
            let bottom_right = current + height + 1;
            points[0] = top_left;
            points[1] = top;
            points[2] = top_right;
            points[3] = left;
            points[4] = right;
            points[5] = bottom_left;
            points[6] = bottom;
            points[7] = bottom_right;
            
            for (let i = 0; i < 8; i++) {   //for every node surrounding the current node, get the values of it
                if (arrayOfNodes[points[i]].walkable == false) {
                    // console.log(arrayOfNodes[points[i]]);
                    if (arrayOfNodes[points[i]].index == end) {
                        path.push(this.mesh.graph.positions[i]);
                        return new NavigationPath(path);
                    }
                    continue;
                }
                let h_value = this.findDistance(arrayOfNodes[points[i]].index, end);    //find the h value, the value from the node to the end
                let g_value = this.findDistance(arrayOfNodes[points[i]].index, current) + arrayOfNodes[current].g_value;    //find the g value
                if (arrayOfNodes[points[i]].total != -1 && arrayOfNodes[points[i]].total <= h_value + g_value) {    //if the prev node total is less than or equal to the new node total, dont change it
                    // console.log(arrayOfNodes[points[i]]);
                    continue;
                }   //past this, it implies that the prev node total is greater than the new one, so we have to replace it with the new one since the new one is shorter
                arrayOfNodes[points[i]].h_value = h_value
                arrayOfNodes[points[i]].g_value = g_value;
                arrayOfNodes[points[i]].total = g_value + h_value;
                arrayOfNodes[points[i]].origin = current;
                // console.log(arrayOfNodes[points[i]]);

            }
            for (let i = 0; i < arrayOfNodes.length; i++) { //go to every node in the graph and find the node with the smallest total
                if (arrayOfNodes[i].total != -1 && arrayOfNodes[i].total <= cheapest_total && arrayOfNodes[i].seen == false) {  //if the node has been initialized, if the node total is smaller than the previous total, and it has not been seen, this node is the new cheapest one
                    //if the total is just straight up less, just set it to the cheaper one
                    if (arrayOfNodes[i].total < cheapest_total) {
                        cheapest_h_value = arrayOfNodes[i].h_value;
                        cheapest_node = arrayOfNodes[i];
                        cheapest_total = arrayOfNodes[i].total;
                    }
                    if (arrayOfNodes[i].total == cheapest_total && arrayOfNodes[i].h_value < cheapest_h_value) {   //need to check if the h value is smaller incase the total is the same
                        cheapest_h_value = arrayOfNodes[i].h_value;    //we want the node with the smallest total and the smallest h value since h represents how close it is to the end node
                        cheapest_node = arrayOfNodes[i];    //set the cheapest node to this smaller total
                        cheapest_total = arrayOfNodes[i].total; //set the new cheapest total, and compare it with the others after
                    }
                }
            }
            //give two totals that are the, if the h cost of the first one is less, then the first one is cheaper
            current = cheapest_node.index;  //aftesr finding the cheapest unseen initialized node, this is ur new current and check the ones surrounding this current one
        }
        //===================================================================================================================================================
        //AFTER WE HAVE FOUND A PATH TO THE END FROM THE START, WE NEED TO PUSH THE NODES THAT WE WANT TO GO TO TO THE STACK
        //START READING FROM END TO START
        //===================================================================================================================================================
        let current_index = end
        while (arrayOfNodes[current_index] != null && current_index != start) {
            path.push(this.mesh.graph.positions[current_index]);
            current_index = arrayOfNodes[current_index].origin;
        }

        //every block is 8 spaces away from each other
        return new NavigationPath(path);
    }

    public findDistance(currentNode: number, end: number) {
        let diagonalDistance = 0;
        //if the end area is top right of the player
        while (this.mesh.graph.positions[currentNode].x != this.mesh.graph.positions[end].x && this.mesh.graph.positions[currentNode].y != this.mesh.graph.positions[end].y) {
            if (this.mesh.graph.positions[end].x > this.mesh.graph.positions[currentNode].x) {
                if (this.mesh.graph.positions[end].y < this.mesh.graph.positions[currentNode].y) {
                    currentNode -= 64;
                    currentNode += 1;
                    diagonalDistance += 1;
                }
                if (this.mesh.graph.positions[end].y > this.mesh.graph.positions[currentNode].y) {
                    currentNode += 64;
                    currentNode += 1;
                    diagonalDistance += 1;
                }
            }
            if (this.mesh.graph.positions[end].x < this.mesh.graph.positions[currentNode].x) {
                if (this.mesh.graph.positions[end].y < this.mesh.graph.positions[currentNode].y) {
                    currentNode -= 64;
                    currentNode -= 1;
                    diagonalDistance += 1;
                }
                if (this.mesh.graph.positions[end].y > this.mesh.graph.positions[currentNode].y) {
                    currentNode += 64;
                    currentNode -= 1;
                    diagonalDistance += 1;
                }
            }
        }
        diagonalDistance *= 14;

        let straightDistance = 0;
        if (this.mesh.graph.positions[currentNode].y == this.mesh.graph.positions[end].y && this.mesh.graph.positions[currentNode].x != this.mesh.graph.positions[end].x) {
            while (this.mesh.graph.positions[currentNode].y == this.mesh.graph.positions[end].y && this.mesh.graph.positions[currentNode].x != this.mesh.graph.positions[end].x) {
                if (this.mesh.graph.positions[end].x > this.mesh.graph.positions[currentNode].x) {
                    currentNode += 1;
                    straightDistance += 1;
                }
                if (this.mesh.graph.positions[end].x < this.mesh.graph.positions[currentNode].x) {
                    currentNode -= 1;
                    straightDistance += 1;
                }
            }
        }
        if (this.mesh.graph.positions[currentNode].x == this.mesh.graph.positions[end].x && this.mesh.graph.positions[currentNode].y != this.mesh.graph.positions[end].y) {
            while (this.mesh.graph.positions[currentNode].x == this.mesh.graph.positions[end].x && this.mesh.graph.positions[currentNode].y != this.mesh.graph.positions[end].y) {
                if (this.mesh.graph.positions[end].y > this.mesh.graph.positions[currentNode].y) {
                    currentNode += 64;
                    straightDistance += 1;
                }
                if (this.mesh.graph.positions[end].y < this.mesh.graph.positions[currentNode].y) {
                    currentNode -= 64;
                    straightDistance += 1;
                }
            }
        }
        straightDistance *= 10;

        return diagonalDistance + straightDistance;
    }


}