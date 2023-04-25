(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Associates strings with elements of type T
 */
class Map {
    /** Creates a new map */
    constructor() {
        this.map = {};
    }
    /**
     * Adds a value T stored at a key.
     * @param key The key of the item to be stored
     * @param value The item to be stored
     */
    add(key, value) {
        this.map[key] = value;
    }
    /**
     * Get the value associated with a key.
     * @param key The key of the item
     * @returns The item at the key or undefined
     */
    get(key) {
        return this.map[key];
    }
    /**
     * An alias of add. Sets the value stored at key to the new specified value
     * @param key The key of the item to be stored
     * @param value The item to be stored
     */
    set(key, value) {
        this.add(key, value);
    }
    /**
     * Returns true if there is a value stored at the specified key, false otherwise.
     * @param key The key to check
     * @returns A boolean representing whether or not there is an item at the given key.
     */
    has(key) {
        return this.map[key] !== undefined;
    }
    /**
     * Returns an array of all of the keys in this map.
     * @returns An array containing all keys in the map.
     */
    keys() {
        return Object.keys(this.map);
    }
    // @implemented
    forEach(func) {
        Object.keys(this.map).forEach(key => func(key));
    }
    /**
     * Deletes an item associated with a key
     * @param key The key at which to delete an item
     */
    delete(key) {
        delete this.map[key];
    }
    // @implemented
    clear() {
        this.forEach(key => delete this.map[key]);
    }
    /**
     * Converts this map to a string representation.
     * @returns The string representation of this map.
     */
    toString() {
        let str = "";
        this.forEach((key) => str += key + " -> " + this.get(key).toString() + "\n");
        return str;
    }
}
exports.default = Map;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A FIFO queue with elements of type T
 */
class Queue {
    /**
     * Constructs a new queue
     * @param maxElements The maximum size of the stack
     */
    constructor(maxElements = 100) {
        this.MAX_ELEMENTS = maxElements;
        this.q = new Array(this.MAX_ELEMENTS);
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
    /**
     * Adds an item to the back of the queue
     * @param item The item to add to the back of the queue
     */
    enqueue(item) {
        if ((this.tail + 1) % this.MAX_ELEMENTS === this.head) {
            throw new Error("Queue full - cannot add element");
        }
        this.size += 1;
        this.q[this.tail] = item;
        this.tail = (this.tail + 1) % this.MAX_ELEMENTS;
    }
    /**
     * Retrieves an item from the front of the queue
     * @returns The item at the front of the queue
     */
    dequeue() {
        if (this.head === this.tail) {
            throw new Error("Queue empty - cannot remove element");
        }
        this.size -= 1;
        let item = this.q[this.head];
        // Now delete the item
        delete this.q[this.head];
        this.head = (this.head + 1) % this.MAX_ELEMENTS;
        return item;
    }
    /**
     * Returns the item at the front of the queue, but does not remove it
     * @returns The item at the front of the queue
     */
    peekNext() {
        if (this.head === this.tail) {
            throw "Queue empty - cannot get element";
        }
        let item = this.q[this.head];
        return item;
    }
    /**
     * Returns true if the queue has items in it, false otherwise
     * @returns A boolean representing whether or not this queue has items
     */
    hasItems() {
        return this.head !== this.tail;
    }
    /**
     * Returns the number of elements in the queue.
     * @returns The size of the queue
     */
    getSize() {
        return this.size;
    }
    // @implemented
    clear() {
        this.forEach((item, index) => delete this.q[index]);
        this.size = 0;
        this.head = this.tail;
    }
    // @implemented
    forEach(func) {
        let i = this.head;
        while (i !== this.tail) {
            func(this.q[i], i);
            i = (i + 1) % this.MAX_ELEMENTS;
        }
    }
    /**
     * Converts this queue into a string format
     * @returns A string representing this queue
     */
    toString() {
        let retval = "";
        this.forEach((item, index) => {
            let str = item.toString();
            if (index !== 0) {
                str += " -> ";
            }
            retval = str + retval;
        });
        return "Top -> " + retval;
    }
}
exports.default = Queue;

},{}],3:[function(require,module,exports){
"use strict";
// @ignorePage
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A placeholder function for No Operation. Does nothing
 */
const NullFunc = () => { };
exports.default = NullFunc;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegion = void 0;
function isRegion(arg) {
    return arg && arg.size && arg.scale && arg.boundary;
}
exports.isRegion = isRegion;

},{}],5:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("./Vec2"));
/** A 4x4 matrix0 */
class Mat4x4 {
    constructor() {
        this.mat = new Float32Array([
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ]);
    }
    // Static members
    static get IDENTITY() {
        return new Mat4x4().identity();
    }
    static get ZERO() {
        return new Mat4x4().zero();
    }
    // Accessors
    set _00(x) {
        this.mat[0] = x;
    }
    set(col, row, value) {
        if (col < 0 || col > 3 || row < 0 || row > 3) {
            throw `Error - index (${col}, ${row}) is out of bounds for Mat4x4`;
        }
        this.mat[row * 4 + col] = value;
        return this;
    }
    get(col, row) {
        return this.mat[row * 4 + col];
    }
    setAll(...items) {
        this.mat.set(items);
        return this;
    }
    identity() {
        return this.setAll(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    zero() {
        return this.setAll(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    /**
     * Makes this Mat4x4 a rotation matrix of the specified number of radians ccw
     * @param zRadians The number of radians to rotate
     * @returns this Mat4x4
     */
    rotate(zRadians) {
        return this.setAll(Math.cos(zRadians), -Math.sin(zRadians), 0, 0, Math.sin(zRadians), Math.cos(zRadians), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * Turns this Mat4x4 into a translation matrix of the specified translation
     * @param translation The translation in x and y
     * @returns this Mat4x4
     */
    translate(translation) {
        // If translation is a vec, get its array
        if (translation instanceof Vec2_1.default) {
            translation = translation.toArray();
        }
        return this.setAll(1, 0, 0, translation[0], 0, 1, 0, translation[1], 0, 0, 1, 0, 0, 0, 0, 1);
    }
    scale(scale) {
        // Make sure scale is a float32Array
        if (scale instanceof Vec2_1.default) {
            scale = scale.toArray();
        }
        else if (!(scale instanceof Float32Array)) {
            scale = new Float32Array([scale, scale]);
        }
        return this.setAll(scale[0], 0, 0, 0, 0, scale[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * Returns a new Mat4x4 that represents the right side multiplication THIS x OTHER
     * @param other The other Mat4x4 to multiply by
     * @returns a new Mat4x4 containing the product of these two Mat4x4s
     */
    mult(other, out) {
        let temp = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let value = 0;
                for (let k = 0; k < 4; k++) {
                    value += this.get(k, i) * other.get(j, k);
                }
                temp[j * 4 + i] = value;
            }
        }
        if (out !== undefined) {
            return out.setAll(...temp);
        }
        else {
            return new Mat4x4().setAll(...temp);
        }
    }
    /**
     * Multiplies all given matricies in order. e.g. MULT(A, B, C) -> A*B*C
     * @param mats A list of Mat4x4s to multiply in order
     * @returns A new Mat4x4 holding the result of the operation
     */
    static MULT(...mats) {
        // Create a new array
        let temp = Mat4x4.IDENTITY;
        // Multiply by every array in order, in place
        for (let i = 0; i < mats.length; i++) {
            temp.mult(mats[i], temp);
        }
        return temp;
    }
    toArray() {
        return this.mat;
    }
    toString() {
        return `|${this.mat[0].toFixed(2)}, ${this.mat[1].toFixed(2)}, ${this.mat[2].toFixed(2)}, ${this.mat[3].toFixed(2)}|\n` +
            `|${this.mat[4].toFixed(2)}, ${this.mat[5].toFixed(2)}, ${this.mat[6].toFixed(2)}, ${this.mat[7].toFixed(2)}|\n` +
            `|${this.mat[8].toFixed(2)}, ${this.mat[9].toFixed(2)}, ${this.mat[10].toFixed(2)}, ${this.mat[11].toFixed(2)}|\n` +
            `|${this.mat[12].toFixed(2)}, ${this.mat[13].toFixed(2)}, ${this.mat[14].toFixed(2)}, ${this.mat[15].toFixed(2)}|`;
    }
}
exports.default = Mat4x4;

},{"./Vec2":11}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../Vec2"));
/**
 * An object representing the data collected from a physics hit between two geometric objects.
 * Inspired by the helpful collision documentation @link(here)(https://noonat.github.io/intersect/).
 */
class Hit {
    constructor() {
        /** The near times of the collision */
        this.nearTimes = Vec2_1.default.ZERO;
        /** The position of the collision */
        this.pos = Vec2_1.default.ZERO;
        /** The overlap distance of the hit */
        this.delta = Vec2_1.default.ZERO;
        /** The normal vector of the hit */
        this.normal = Vec2_1.default.ZERO;
    }
}
exports.default = Hit;

},{"../Vec2":11}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A container for info about a webGL shader program */
class WebGLProgramType {
    /**
     * Deletes this shader program
     */
    delete(gl) {
        // Clean up all aspects of this program
        if (this.program) {
            gl.deleteProgram(this.program);
        }
        if (this.vertexShader) {
            gl.deleteShader(this.vertexShader);
        }
        if (this.fragmentShader) {
            gl.deleteShader(this.fragmentShader);
        }
    }
}
exports.default = WebGLProgramType;

},{}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = __importDefault(require("./Shape"));
const Vec2_1 = __importDefault(require("../Vec2"));
const MathUtils_1 = __importDefault(require("../../Utils/MathUtils"));
const Circle_1 = __importDefault(require("./Circle"));
const Hit_1 = __importDefault(require("../Physics/Hit"));
/**
 * An Axis-Aligned Bounding Box. In other words, a rectangle that is always aligned to the x-y grid.
 * Inspired by the helpful collision documentation @link(here)(https://noonat.github.io/intersect/).
 */
class AABB extends Shape_1.default {
    /**
     * Creates a new AABB
     * @param center The center of the AABB
     * @param halfSize The half size of the AABB - The distance from the center to an edge in x and y
     */
    constructor(center, halfSize) {
        super();
        this.center = center ? center : new Vec2_1.default(0, 0);
        this.halfSize = halfSize ? halfSize : new Vec2_1.default(0, 0);
    }
    /** Returns a point representing the top left corner of the AABB */
    get topLeft() {
        return new Vec2_1.default(this.left, this.top);
    }
    /** Returns a point representing the top right corner of the AABB */
    get topRight() {
        return new Vec2_1.default(this.right, this.top);
    }
    /** Returns a point representing the bottom left corner of the AABB */
    get bottomLeft() {
        return new Vec2_1.default(this.left, this.bottom);
    }
    /** Returns a point representing the bottom right corner of the AABB */
    get bottomRight() {
        return new Vec2_1.default(this.right, this.bottom);
    }
    // @override
    getBoundingRect() {
        return this.clone();
    }
    // @override
    getBoundingCircle() {
        let r = Math.max(this.hw, this.hh);
        return new Circle_1.default(this.center.clone(), r);
    }
    // @deprecated
    getHalfSize() {
        return this.halfSize;
    }
    // @deprecated
    setHalfSize(halfSize) {
        this.halfSize = halfSize;
    }
    // TODO - move these all to the Shape class
    /**
     * A simple boolean check of whether this AABB contains a point
     * @param point The point to check
     * @returns A boolean representing whether this AABB contains the specified point
     */
    containsPoint(point) {
        return point.x >= this.x - this.hw && point.x <= this.x + this.hw
            && point.y >= this.y - this.hh && point.y <= this.y + this.hh;
    }
    /**
     * A simple boolean check of whether this AABB contains a point
     * @param point The point to check
     * @returns A boolean representing whether this AABB contains the specified point
     */
    intersectPoint(point) {
        let dx = point.x - this.x;
        let px = this.hw - Math.abs(dx);
        if (px <= 0) {
            return false;
        }
        let dy = point.y - this.y;
        let py = this.hh - Math.abs(dy);
        if (py <= 0) {
            return false;
        }
        return true;
    }
    /**
     * A boolean check of whether this AABB contains a point with soft left and top boundaries.
     * In other words, if the top left is (0, 0), the point (0, 0) is not in the AABB
     * @param point The point to check
     * @returns A boolean representing whether this AABB contains the specified point
     */
    containsPointSoft(point) {
        return point.x > this.x - this.hw && point.x <= this.x + this.hw
            && point.y > this.y - this.hh && point.y <= this.y + this.hh;
    }
    /**
     * Returns the data from the intersection of this AABB with a line segment from a point in a direction
     * @param point The point that the line segment starts from
     * @param delta The direction and distance of the segment
     * @param padding Pads the AABB to make it wider for the intersection test
     * @returns The Hit object representing the intersection, or null if there was no intersection
     */
    intersectSegment(point, delta, padding) {
        let paddingX = padding ? padding.x : 0;
        let paddingY = padding ? padding.y : 0;
        let scaleX = 1 / delta.x;
        let scaleY = 1 / delta.y;
        let signX = MathUtils_1.default.sign(scaleX);
        let signY = MathUtils_1.default.sign(scaleY);
        let tnearx = scaleX * (this.x - signX * (this.hw + paddingX) - point.x);
        let tneary = scaleY * (this.y - signY * (this.hh + paddingY) - point.y);
        let tfarx = scaleX * (this.x + signX * (this.hw + paddingX) - point.x);
        let tfary = scaleY * (this.y + signY * (this.hh + paddingY) - point.y);
        if (tnearx > tfary || tneary > tfarx) {
            // We aren't colliding - we clear one axis before intersecting another
            return null;
        }
        let tnear = Math.max(tnearx, tneary);
        // Double check for NaNs
        if (tnearx !== tnearx) {
            tnear = tneary;
        }
        else if (tneary !== tneary) {
            tnear = tnearx;
        }
        let tfar = Math.min(tfarx, tfary);
        if (tnear === -Infinity) {
            return null;
        }
        if (tnear >= 1 || tfar <= 0) {
            return null;
        }
        // We are colliding
        let hit = new Hit_1.default();
        hit.time = MathUtils_1.default.clamp01(tnear);
        hit.nearTimes.x = tnearx;
        hit.nearTimes.y = tneary;
        if (tnearx > tneary) {
            // We hit on the left or right size
            hit.normal.x = -signX;
            hit.normal.y = 0;
        }
        else if (Math.abs(tnearx - tneary) < 0.0001) {
            // We hit on the corner
            hit.normal.x = -signX;
            hit.normal.y = -signY;
            hit.normal.normalize();
        }
        else {
            // We hit on the top or bottom
            hit.normal.x = 0;
            hit.normal.y = -signY;
        }
        hit.delta.x = (1.0 - hit.time) * -delta.x;
        hit.delta.y = (1.0 - hit.time) * -delta.y;
        hit.pos.x = point.x + delta.x * hit.time;
        hit.pos.y = point.y + delta.y * hit.time;
        return hit;
    }
    // @override
    overlaps(other) {
        if (other instanceof AABB) {
            return this.overlapsAABB(other);
        }
        throw "Overlap not defined between these shapes.";
    }
    /**
     * A simple boolean check of whether this AABB overlaps another
     * @param other The other AABB to check against
     * @returns True if this AABB overlaps the other, false otherwise
     */
    overlapsAABB(other) {
        let dx = other.x - this.x;
        let px = this.hw + other.hw - Math.abs(dx);
        if (px <= 0) {
            return false;
        }
        let dy = other.y - this.y;
        let py = this.hh + other.hh - Math.abs(dy);
        if (py <= 0) {
            return false;
        }
        return true;
    }
    /**
     * Determines whether these AABBs are JUST touching - not overlapping.
     * Vec2.x is -1 if the other is to the left, 1 if to the right.
     * Likewise, Vec2.y is -1 if the other is on top, 1 if on bottom.
     * @param other The other AABB to check
     * @returns The collision sides stored in a Vec2 if the AABBs are touching, null otherwise
     */
    touchesAABB(other) {
        let dx = other.x - this.x;
        let px = this.hw + other.hw - Math.abs(dx);
        let dy = other.y - this.y;
        let py = this.hh + other.hh - Math.abs(dy);
        // If one axis is just touching and the other is overlapping, true
        if ((px === 0 && py >= 0) || (py === 0 && px >= 0)) {
            let ret = new Vec2_1.default();
            if (px === 0) {
                ret.x = other.x < this.x ? -1 : 1;
            }
            if (py === 0) {
                ret.y = other.y < this.y ? -1 : 1;
            }
            return ret;
        }
        else {
            return null;
        }
    }
    /**
     * Determines whether these AABBs are JUST touching - not overlapping.
     * Also, if they are only touching corners, they are considered not touching.
     * Vec2.x is -1 if the other is to the left, 1 if to the right.
     * Likewise, Vec2.y is -1 if the other is on top, 1 if on bottom.
     * @param other The other AABB to check
     * @returns The side of the touch, stored as a Vec2, or null if there is no touch
     */
    touchesAABBWithoutCorners(other) {
        let dx = other.x - this.x;
        let px = this.hw + other.hw - Math.abs(dx);
        let dy = other.y - this.y;
        let py = this.hh + other.hh - Math.abs(dy);
        // If one axis is touching, and the other is strictly overlapping
        if ((px === 0 && py > 0) || (py === 0 && px > 0)) {
            let ret = new Vec2_1.default();
            if (px === 0) {
                ret.x = other.x < this.x ? -1 : 1;
            }
            else {
                ret.y = other.y < this.y ? -1 : 1;
            }
            return ret;
        }
        else {
            return null;
        }
    }
    /**
     * Calculates the area of the overlap between this AABB and another
     * @param other The other AABB
     * @returns The area of the overlap between the AABBs
     */
    overlapArea(other) {
        let leftx = Math.max(this.x - this.hw, other.x - other.hw);
        let rightx = Math.min(this.x + this.hw, other.x + other.hw);
        let dx = rightx - leftx;
        let lefty = Math.max(this.y - this.hh, other.y - other.hh);
        let righty = Math.min(this.y + this.hh, other.y + other.hh);
        let dy = righty - lefty;
        if (dx < 0 || dy < 0)
            return 0;
        return dx * dy;
    }
    /**
     * Moves and resizes this rect from its current position to the position specified
     * @param velocity The movement of the rect from its position
     * @param fromPosition A position specified to be the starting point of sweeping
     * @param halfSize The halfSize of the sweeping rect
     */
    sweep(velocity, fromPosition, halfSize) {
        if (!fromPosition) {
            fromPosition = this.center;
        }
        if (!halfSize) {
            halfSize = this.halfSize;
        }
        let centerX = fromPosition.x + velocity.x / 2;
        let centerY = fromPosition.y + velocity.y / 2;
        let minX = Math.min(fromPosition.x - halfSize.x, fromPosition.x + velocity.x - halfSize.x);
        let minY = Math.min(fromPosition.y - halfSize.y, fromPosition.y + velocity.y - halfSize.y);
        this.center.set(centerX, centerY);
        this.halfSize.set(centerX - minX, centerY - minY);
    }
    // @override
    clone() {
        return new AABB(this.center.clone(), this.halfSize.clone());
    }
    /**
     * Converts this AABB to a string format
     * @returns (center: (x, y), halfSize: (x, y))
     */
    toString() {
        return "(center: " + this.center.toString() + ", half-size: " + this.halfSize.toString() + ")";
    }
}
exports.default = AABB;

},{"../../Utils/MathUtils":68,"../Physics/Hit":6,"../Vec2":11,"./Circle":9,"./Shape":10}],9:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../Vec2"));
const AABB_1 = __importDefault(require("./AABB"));
const Shape_1 = __importDefault(require("./Shape"));
/**
 * A Circle
 */
class Circle extends Shape_1.default {
    /**
     * Creates a new Circle
     * @param center The center of the circle
     * @param radius The radius of the circle
     */
    constructor(center, radius) {
        super();
        this._center = center ? center : new Vec2_1.default(0, 0);
        this.radius = radius ? radius : 0;
    }
    get center() {
        return this._center;
    }
    set center(center) {
        this._center = center;
    }
    get halfSize() {
        return new Vec2_1.default(this.radius, this.radius);
    }
    get r() {
        return this.radius;
    }
    set r(radius) {
        this.radius = radius;
    }
    // @override
    /**
     * A simple boolean check of whether this AABB contains a point
     * @param point The point to check
     * @returns A boolean representing whether this AABB contains the specified point
     */
    containsPoint(point) {
        return this.center.distanceSqTo(point) <= this.radius * this.radius;
    }
    // @override
    getBoundingRect() {
        return new AABB_1.default(this._center.clone(), new Vec2_1.default(this.radius, this.radius));
    }
    // @override
    getBoundingCircle() {
        return this.clone();
    }
    // @override
    overlaps(other) {
        throw new Error("Method not implemented.");
    }
    // @override
    clone() {
        return new Circle(this._center.clone(), this.radius);
    }
    toString() {
        return "(center: " + this.center.toString() + ", radius: " + this.radius + ")";
    }
}
exports.default = Circle;

},{"../Vec2":11,"./AABB":8,"./Shape":10}],10:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../Vec2"));
const AABB_1 = __importDefault(require("./AABB"));
/**
 * An abstract Shape class that acts as an interface for better interactions with subclasses.
 */
class Shape {
    get x() {
        return this.center.x;
    }
    get y() {
        return this.center.y;
    }
    get hw() {
        return this.halfSize.x;
    }
    get hh() {
        return this.halfSize.y;
    }
    get top() {
        return this.y - this.hh;
    }
    get bottom() {
        return this.y + this.hh;
    }
    get left() {
        return this.x - this.hw;
    }
    get right() {
        return this.x + this.hw;
    }
    static getTimeOfCollision(A, velA, B, velB) {
        if (A instanceof AABB_1.default && B instanceof AABB_1.default) {
            return Shape.getTimeOfCollision_AABB_AABB(A, velA, B, velB);
        }
    }
    static getTimeOfCollision_AABB_AABB(A, velA, B, velB) {
        let posSmaller = A.center;
        let posLarger = B.center;
        let sizeSmaller = A.halfSize;
        let sizeLarger = B.halfSize;
        let firstContact = new Vec2_1.default(0, 0);
        let lastContact = new Vec2_1.default(0, 0);
        let collidingX = false;
        let collidingY = false;
        // Sort by position
        if (posLarger.x < posSmaller.x) {
            // Swap, because smaller is further right than larger
            let temp;
            temp = sizeSmaller;
            sizeSmaller = sizeLarger;
            sizeLarger = temp;
            temp = posSmaller;
            posSmaller = posLarger;
            posLarger = temp;
            temp = velA;
            velA = velB;
            velB = temp;
        }
        // A is left, B is right
        firstContact.x = Infinity;
        lastContact.x = Infinity;
        if (posLarger.x - sizeLarger.x >= posSmaller.x + sizeSmaller.x) {
            // If we aren't currently colliding
            let relVel = velA.x - velB.x;
            if (relVel > 0) {
                // If they are moving towards each other
                firstContact.x = ((posLarger.x - sizeLarger.x) - (posSmaller.x + sizeSmaller.x)) / (relVel);
                lastContact.x = ((posLarger.x + sizeLarger.x) - (posSmaller.x - sizeSmaller.x)) / (relVel);
            }
        }
        else {
            collidingX = true;
        }
        if (posLarger.y < posSmaller.y) {
            // Swap, because smaller is further up than larger
            let temp;
            temp = sizeSmaller;
            sizeSmaller = sizeLarger;
            sizeLarger = temp;
            temp = posSmaller;
            posSmaller = posLarger;
            posLarger = temp;
            temp = velA;
            velA = velB;
            velB = temp;
        }
        // A is top, B is bottom
        firstContact.y = Infinity;
        lastContact.y = Infinity;
        if (posLarger.y - sizeLarger.y >= posSmaller.y + sizeSmaller.y) {
            // If we aren't currently colliding
            let relVel = velA.y - velB.y;
            if (relVel > 0) {
                // If they are moving towards each other
                firstContact.y = ((posLarger.y - sizeLarger.y) - (posSmaller.y + sizeSmaller.y)) / (relVel);
                lastContact.y = ((posLarger.y + sizeLarger.y) - (posSmaller.y - sizeSmaller.y)) / (relVel);
            }
        }
        else {
            collidingY = true;
        }
        return [firstContact, lastContact, collidingX, collidingY];
    }
}
exports.default = Shape;

},{"../Vec2":11,"./AABB":8}],11:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __importDefault(require("../Utils/MathUtils"));
/**
 * A two-dimensional vector (x, y)
 */
class Vec2 {
    /**
     * Creates a new Vec2
     * @param x The x value of the vector
     * @param y The y value of the vector
     */
    constructor(x = 0, y = 0) {
        /**
         * When this vector changes its value, do something
         */
        this.onChange = () => { };
        this.vec = new Float32Array(2);
        this.vec[0] = x;
        this.vec[1] = y;
    }
    // Expose x and y with getters and setters
    get x() {
        return this.vec[0];
    }
    set x(x) {
        this.vec[0] = x;
        if (this.onChange) {
            this.onChange();
        }
    }
    get y() {
        return this.vec[1];
    }
    set y(y) {
        this.vec[1] = y;
        if (this.onChange) {
            this.onChange();
        }
    }
    static get ZERO() {
        return new Vec2(0, 0);
    }
    static get INF() {
        return new Vec2(Infinity, Infinity);
    }
    static get UP() {
        return new Vec2(0, -1);
    }
    static get DOWN() {
        return new Vec2(0, 1);
    }
    static get LEFT() {
        return new Vec2(-1, 0);
    }
    static get RIGHT() {
        return new Vec2(1, 0);
    }
    /**
     * The squared magnitude of the vector. This tends to be faster, so use it in situations where taking the
     * square root doesn't matter, like for comparing distances.
     * @returns The squared magnitude of the vector
     */
    magSq() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * The magnitude of the vector.
     * @returns The magnitude of the vector.
     */
    mag() {
        return Math.sqrt(this.magSq());
    }
    /**
     * Divdes x and y by the magnitude to obtain the unit vector in the direction of this vector.
     * @returns This vector as a unit vector.
     */
    normalize() {
        if (this.x === 0 && this.y === 0)
            return this;
        let mag = this.mag();
        this.x /= mag;
        this.y /= mag;
        return this;
    }
    /**
     * Works like normalize(), but returns a new Vec2
     * @returns A new vector that is the unit vector for this one
     */
    normalized() {
        if (this.isZero()) {
            return this;
        }
        let mag = this.mag();
        return new Vec2(this.x / mag, this.y / mag);
    }
    /**
     * Sets the x and y elements of this vector to zero.
     * @returns This vector, with x and y set to zero.
     */
    zero() {
        return this.set(0, 0);
    }
    /**
     * Sets the vector's x and y based on the angle provided. Goes counter clockwise.
     * @param angle The angle in radians
     * @param radius The magnitude of the vector at the specified angle
     * @returns This vector.
     */
    setToAngle(angle, radius = 1) {
        this.x = MathUtils_1.default.floorToPlace(Math.cos(angle) * radius, 5);
        this.y = MathUtils_1.default.floorToPlace(-Math.sin(angle) * radius, 5);
        return this;
    }
    /**
     * Returns a vector that point from this vector to another one
     * @param other The vector to point to
     * @returns A new Vec2 that points from this vector to the one provided
     */
    vecTo(other) {
        return new Vec2(other.x - this.x, other.y - this.y);
    }
    /**
     * Returns a vector containing the direction from this vector to another
     * @param other The vector to point to
     * @returns A new Vec2 that points from this vector to the one provided. This new Vec2 will be a unit vector.
     */
    dirTo(other) {
        return this.vecTo(other).normalize();
    }
    /**
     * Keeps the vector's direction, but sets its magnitude to be the provided magnitude
     * @param magnitude The magnitude the vector should be
     * @returns This vector with its magnitude set to the new magnitude
     */
    scaleTo(magnitude) {
        return this.normalize().scale(magnitude);
    }
    /**
     * Scales x and y by the number provided, or if two number are provided, scales them individually.
     * @param factor The scaling factor for the vector, or for only the x-component if yFactor is provided
     * @param yFactor The scaling factor for the y-component of the vector
     * @returns This vector after scaling
     */
    scale(factor, yFactor = null) {
        if (yFactor !== null) {
            this.x *= factor;
            this.y *= yFactor;
            return this;
        }
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    /**
     * Returns a scaled version of this vector without modifying it.
     * @param factor The scaling factor for the vector, or for only the x-component if yFactor is provided
     * @param yFactor The scaling factor for the y-component of the vector
     * @returns A new vector that has the values of this vector after scaling
     */
    scaled(factor, yFactor = null) {
        return this.clone().scale(factor, yFactor);
    }
    /**
     * Rotates the vector counter-clockwise by the angle amount specified
     * @param angle The angle to rotate by in radians
     * @returns This vector after rotation.
     */
    rotateCCW(angle) {
        let cs = Math.cos(angle);
        let sn = Math.sin(angle);
        let tempX = this.x * cs - this.y * sn;
        let tempY = this.x * sn + this.y * cs;
        this.x = tempX;
        this.y = tempY;
        return this;
    }
    /**
     * Sets the vectors coordinates to be the ones provided
     * @param x The new x value for this vector
     * @param y The new y value for this vector
     * @returns This vector
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Copies the values of the other Vec2 into this one.
     * @param other The Vec2 to copy
     * @returns This vector with its values set to the vector provided
     */
    copy(other) {
        return this.set(other.x, other.y);
    }
    /**
     * Adds this vector the another vector
     * @param other The Vec2 to add to this one
     * @returns This vector after adding the one provided
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    /**
     * Increments the fields of this vector. Both are incremented with a, if only a is provided.
     * @param a The first number to increment by
     * @param b The second number to increment by
     * @returnss This vector after incrementing
     */
    inc(a, b) {
        if (b === undefined) {
            this.x += a;
            this.y += a;
        }
        else {
            this.x += a;
            this.y += b;
        }
        return this;
    }
    /**
     * Subtracts another vector from this vector
     * @param other The Vec2 to subtract from this one
     * @returns This vector after subtracting the one provided
     */
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    /**
     * Multiplies this vector with another vector element-wise. In other words, this.x *= other.x and this.y *= other.y
     * @param other The Vec2 to multiply this one by
     * @returns This vector after multiplying its components by this one
     */
    mult(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    /**
     * Divides this vector with another vector element-wise. In other words, this.x /= other.x and this.y /= other.y
     * @param other The vector to divide this one by
     * @returns This vector after division
     */
    div(other) {
        if (other.x === 0 || other.y === 0)
            throw "Divide by zero error";
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }
    /**
     * Does an element wise remainder operation on this vector. this.x %= other.x and this.y %= other.y
     * @param other The other vector
     * @returns this vector
     */
    remainder(other) {
        this.x = this.x % other.x;
        this.y = this.y % other.y;
        return this;
    }
    /**
     * Returns the squared distance between this vector and another vector
     * @param other The vector to compute distance squared to
     * @returns The squared distance between this vector and the one provided
     */
    distanceSqTo(other) {
        return (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
    }
    /**
     * Returns the distance between this vector and another vector
     * @param other The vector to compute distance to
     * @returns The distance between this vector and the one provided
     */
    distanceTo(other) {
        return Math.sqrt(this.distanceSqTo(other));
    }
    /**
     * Returns the dot product of this vector and another
     * @param other The vector to compute the dot product with
     * @returns The dot product of this vector and the one provided.
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    /**
     * Returns the angle counter-clockwise in radians from this vector to another vector
     * @param other The vector to compute the angle to
     * @returns The angle, rotating CCW, from this vector to the other vector
     */
    angleToCCW(other) {
        let dot = this.dot(other);
        let det = this.x * other.y - this.y * other.x;
        let angle = -Math.atan2(det, dot);
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle;
    }
    /**
     * Returns a string representation of this vector rounded to 1 decimal point
     * @returns This vector as a string
     */
    toString() {
        return this.toFixed();
    }
    /**
     * Returns a string representation of this vector rounded to the specified number of decimal points
     * @param numDecimalPoints The number of decimal points to create a string to
     * @returns This vector as a string
     */
    toFixed(numDecimalPoints = 1) {
        return "(" + this.x.toFixed(numDecimalPoints) + ", " + this.y.toFixed(numDecimalPoints) + ")";
    }
    /**
     * Returns a new vector with the same coordinates as this one.
     * @returns A new Vec2 with the same values as this one
     */
    clone() {
        return new Vec2(this.x, this.y);
    }
    /**
     * Returns true if this vector and other have the EXACT same x and y (not assured to be safe for floats)
     * @param other The vector to check against
     * @returns A boolean representing the equality of the two vectors
     */
    strictEquals(other) {
        return this.x === other.x && this.y === other.y;
    }
    /**
     * Returns true if this vector and other have the same x and y
     * @param other The vector to check against
     * @returns A boolean representing the equality of the two vectors
     */
    equals(other) {
        let xEq = Math.abs(this.x - other.x) < 0.0000001;
        let yEq = Math.abs(this.y - other.y) < 0.0000001;
        return xEq && yEq;
    }
    /**
     * Returns true if this vector is the zero vector exactly (not assured to be safe for floats).
     * @returns A boolean representing the equality of this vector and the zero vector
     */
    strictIsZero() {
        return this.x === 0 && this.y === 0;
    }
    /**
     * Returns true if this x and y for this vector are both zero.
     * @returns A boolean representing the equality of this vector and the zero vector
     */
    isZero() {
        return Math.abs(this.x) < 0.0000001 && Math.abs(this.y) < 0.0000001;
    }
    /**
     * Sets the function that is called whenever this vector is changed.
     * @param f The function to be called
     */
    setOnChange(f) {
        this.onChange = f;
    }
    toArray() {
        return this.vec;
    }
    /**
     * Performs linear interpolation between two vectors
     * @param a The first vector
     * @param b The second vector
     * @param t The time of the lerp, with 0 being vector A, and 1 being vector B
     * @returns A new Vec2 representing the lerp between vector a and b.
     */
    static lerp(a, b, t) {
        return new Vec2(MathUtils_1.default.lerp(a.x, b.x, t), MathUtils_1.default.lerp(a.y, b.y, t));
    }
}
exports.default = Vec2;
Vec2.ZERO_STATIC = new Vec2(0, 0);

},{"../Utils/MathUtils":68}],12:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const Color_1 = __importDefault(require("../Utils/Color"));
/**
 * A util class for rendering Debug messages to the canvas.
 */
class Debug {
    /**
     * Add a message to display on the debug screen
     * @param id A unique ID for this message
     * @param messages The messages to print to the debug screen
     */
    static log(id, ...messages) {
        // let message = "";
        // for(let i = 0; i < messages.length; i++){
        // 	message += messages[i].toString();
        // }
        // Join all messages with spaces
        let message = messages.map((m) => m.toString()).join(" ");
        this.logMessages.add(id, message);
    }
    /**
     * Deletes a a key from the log and stops it from keeping up space on the screen
     * @param id The id of the log item to clear
     */
    static clearLogItem(id) {
        this.logMessages.delete(id);
    }
    /**
     * Sets the list of nodes to render with the debugger
     * @param nodes The new list of nodes
     */
    static setNodes(nodes) {
        this.nodes = nodes;
    }
    /**
     * Draws a box at the specified position
     * @param center The center of the box
     * @param halfSize The dimensions of the box
     * @param filled A boolean for whether or not the box is filled
     * @param color The color of the box to draw
     */
    static drawBox(center, halfSize, filled, color) {
        let alpha = this.debugRenderingContext.globalAlpha;
        this.debugRenderingContext.globalAlpha = color.a;
        if (filled) {
            this.debugRenderingContext.fillStyle = color.toString();
            this.debugRenderingContext.fillRect(center.x - halfSize.x, center.y - halfSize.y, halfSize.x * 2, halfSize.y * 2);
        }
        else {
            let lineWidth = 2;
            this.debugRenderingContext.lineWidth = lineWidth;
            this.debugRenderingContext.strokeStyle = color.toString();
            this.debugRenderingContext.strokeRect(center.x - halfSize.x, center.y - halfSize.y, halfSize.x * 2, halfSize.y * 2);
        }
        this.debugRenderingContext.globalAlpha = alpha;
    }
    /**
     * Draws a circle at the specified position
     * @param center The center of the circle
     * @param radius The dimensions of the box
     * @param filled A boolean for whether or not the circle is filled
     * @param color The color of the circle
     */
    static drawCircle(center, radius, filled, color) {
        let alpha = this.debugRenderingContext.globalAlpha;
        this.debugRenderingContext.globalAlpha = color.a;
        if (filled) {
            this.debugRenderingContext.fillStyle = color.toString();
            this.debugRenderingContext.beginPath();
            this.debugRenderingContext.arc(center.x, center.y, radius, 0, 2 * Math.PI);
            this.debugRenderingContext.closePath();
            this.debugRenderingContext.fill();
        }
        else {
            let lineWidth = 2;
            this.debugRenderingContext.lineWidth = lineWidth;
            this.debugRenderingContext.strokeStyle = color.toString();
            this.debugRenderingContext.beginPath();
            this.debugRenderingContext.arc(center.x, center.y, radius, 0, 2 * Math.PI);
            this.debugRenderingContext.closePath();
            this.debugRenderingContext.stroke();
        }
        this.debugRenderingContext.globalAlpha = alpha;
    }
    /**
     * Draws a ray at the specified position
     * @param from The starting position of the ray
     * @param to The ending position of the ray
     * @param color The color of the ray
     */
    static drawRay(from, to, color) {
        this.debugRenderingContext.lineWidth = 2;
        this.debugRenderingContext.strokeStyle = color.toString();
        this.debugRenderingContext.beginPath();
        this.debugRenderingContext.moveTo(from.x, from.y);
        this.debugRenderingContext.lineTo(to.x, to.y);
        this.debugRenderingContext.closePath();
        this.debugRenderingContext.stroke();
    }
    /**
     * Draws a point at the specified position
     * @param pos The position of the point
     * @param color The color of the point
     */
    static drawPoint(pos, color) {
        let pointSize = 6;
        this.debugRenderingContext.fillStyle = color.toString();
        this.debugRenderingContext.fillRect(pos.x - pointSize / 2, pos.y - pointSize / 2, pointSize, pointSize);
    }
    /**
     * Sets the default rendering color for text for the debugger
     * @param color The color to render the text
     */
    static setDefaultTextColor(color) {
        this.defaultTextColor = color;
    }
    /**
     * Performs any necessary setup operations on the Debug canvas
     * @param canvas The debug canvas
     * @param width The desired width of the canvas
     * @param height The desired height of the canvas
     * @returns The rendering context extracted from the canvas
     */
    static initializeDebugCanvas(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this.debugCanvasSize = new Vec2_1.default(width, height);
        this.debugRenderingContext = canvas.getContext("2d");
        return this.debugRenderingContext;
    }
    /** Clears the debug canvas */
    static clearCanvas() {
        this.debugRenderingContext.clearRect(0, 0, this.debugCanvasSize.x, this.debugCanvasSize.y);
    }
    /** Renders the text and nodes sent to the Debug system */
    static render() {
        this.renderText();
        this.renderNodes();
    }
    /** Renders the text sent to the Debug canvas */
    static renderText() {
        let y = 20;
        this.debugRenderingContext.font = "20px Arial";
        this.debugRenderingContext.fillStyle = this.defaultTextColor.toString();
        // Draw all of the text
        this.logMessages.forEach((key) => {
            this.debugRenderingContext.fillText(this.logMessages.get(key), 10, y);
            y += 30;
        });
    }
    /** Renders the nodes registered with the debug canvas */
    static renderNodes() {
        if (this.nodes) {
            this.nodes.forEach(node => {
                node.debugRender();
            });
        }
    }
}
exports.default = Debug;
/** A map of log messages to display on the screen */
Debug.logMessages = new Map_1.default();
/** The rendering color for text */
Debug.defaultTextColor = Color_1.default.WHITE;

},{"../DataTypes/Collections/Map":1,"../DataTypes/Vec2":11,"../Utils/Color":66}],13:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Utils/Color"));
// @ignorePage
class Stats extends Object {
    static initStats() {
        let canvas = document.getElementById("stats-canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.ctx = canvas.getContext("2d");
        this.statsDiv = document.getElementById("stats-display");
        this.prevfps = new Array();
        this.prevClearTimes = new Array();
        this.SGClearTimes = new Array();
        this.avgSGClearTime = 0;
        this.prevFillTimes = new Array();
        this.SGFillTimes = new Array();
        this.avgSGFillTime = 0;
        this.prevUpdateTimes = new Array();
        this.SGUpdateTimes = new Array();
        this.avgSGUpdateTime = 0;
        this.prevQueryTimes = new Array();
        this.SGQueryTimes = new Array();
        this.avgSGQueryTime = 0;
        let clearTime = document.createElement("span");
        clearTime.setAttribute("id", "sgclear");
        let fillTime = document.createElement("span");
        fillTime.setAttribute("id", "sgfill");
        let updateTime = document.createElement("span");
        updateTime.setAttribute("id", "sgupdate");
        let queryTime = document.createElement("span");
        queryTime.setAttribute("id", "sgquery");
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");
        this.statsDiv.append(clearTime, br1, fillTime, br2, updateTime, br3, queryTime);
        this.graphChoices = document.getElementById("chart-option");
        let option1 = document.createElement("option");
        option1.value = "prevfps";
        option1.label = "FPS";
        let option2 = document.createElement("option");
        option2.value = "prevClearTimes";
        option2.label = "Clear Time";
        let option3 = document.createElement("option");
        option3.value = "prevFillTimes";
        option3.label = "Fill time";
        let option4 = document.createElement("option");
        option4.value = "prevUpdateTimes";
        option4.label = "Update time";
        let option5 = document.createElement("option");
        option5.value = "prevQueryTimes";
        option5.label = "Query Time";
        let optionAll = document.createElement("option");
        optionAll.value = "all";
        optionAll.label = "All";
        this.graphChoices.append(option1, option2, option3, option4, option5, optionAll);
    }
    static updateFPS(fps) {
        this.prevfps.push(fps);
        if (this.prevfps.length > Stats.NUM_POINTS) {
            this.prevfps.shift();
        }
        if (this.SGClearTimes.length > 0) {
            this.prevClearTimes.push(this.avgSGClearTime);
            if (this.prevClearTimes.length > this.NUM_POINTS) {
                this.prevClearTimes.shift();
            }
        }
        if (this.SGFillTimes.length > 0) {
            this.prevFillTimes.push(this.avgSGFillTime);
            if (this.prevFillTimes.length > this.NUM_POINTS) {
                this.prevFillTimes.shift();
            }
        }
        if (this.SGUpdateTimes.length > 0) {
            this.prevUpdateTimes.push(this.avgSGUpdateTime);
            if (this.prevUpdateTimes.length > this.NUM_POINTS) {
                this.prevUpdateTimes.shift();
            }
        }
        if (this.SGQueryTimes.length > 0) {
            this.prevQueryTimes.push(this.avgSGQueryTime);
            if (this.prevQueryTimes.length > this.NUM_POINTS) {
                this.prevQueryTimes.shift();
            }
        }
        this.updateSGStats();
    }
    static log(key, data) {
        if (key === "sgclear") {
            this.SGClearTimes.push(data);
            if (this.SGClearTimes.length > 100) {
                this.SGClearTimes.shift();
            }
        }
        else if (key === "sgfill") {
            this.SGFillTimes.push(data);
            if (this.SGFillTimes.length > 100) {
                this.SGFillTimes.shift();
            }
        }
        else if (key === "sgupdate") {
            this.SGUpdateTimes.push(data);
            if (this.SGUpdateTimes.length > 100) {
                this.SGUpdateTimes.shift();
            }
        }
        else if (key === "sgquery") {
            this.SGQueryTimes.push(data);
            if (this.SGQueryTimes.length > 1000) {
                this.SGQueryTimes.shift();
            }
        }
    }
    static render() {
        // Display stats
        this.drawCharts();
    }
    static drawCharts() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        let paramString = this.graphChoices.value;
        if (paramString === "prevfps" || paramString === "all") {
            let param = this.prevfps;
            let color = Color_1.default.BLUE.toString();
            this.drawChart(param, color);
        }
        if (paramString === "prevClearTimes" || paramString === "all") {
            let param = this.prevClearTimes;
            let color = Color_1.default.RED.toString();
            this.drawChart(param, color);
        }
        if (paramString === "prevFillTimes" || paramString === "all") {
            let param = this.prevFillTimes;
            let color = Color_1.default.GREEN.toString();
            this.drawChart(param, color);
        }
        if (paramString === "prevUpdateTimes" || paramString === "all") {
            let param = this.prevUpdateTimes;
            let color = Color_1.default.CYAN.toString();
            this.drawChart(param, color);
        }
        if (paramString === "prevQueryTimes" || paramString === "all") {
            let param = this.prevQueryTimes;
            let color = Color_1.default.ORANGE.toString();
            this.drawChart(param, color);
        }
    }
    static drawChart(param, color) {
        this.ctx.strokeStyle = Color_1.default.BLACK.toString();
        this.ctx.beginPath();
        this.ctx.moveTo(10, 10);
        this.ctx.lineTo(10, this.CANVAS_HEIGHT - 10);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(10, this.CANVAS_HEIGHT - 10);
        this.ctx.lineTo(this.CANVAS_WIDTH - 10, this.CANVAS_HEIGHT - 10);
        this.ctx.closePath();
        this.ctx.stroke();
        let max = Math.max(...param);
        let prevX = 10;
        let prevY = this.CANVAS_HEIGHT - 10 - param[0] / max * (this.CANVAS_HEIGHT - 20);
        this.ctx.strokeStyle = color;
        for (let i = 1; i < param.length; i++) {
            let fps = param[i];
            let x = 10 + i * (this.CANVAS_WIDTH - 20) / this.NUM_POINTS;
            let y = this.CANVAS_HEIGHT - 10 - fps / max * (this.CANVAS_HEIGHT - 20);
            this.ctx.beginPath();
            this.ctx.moveTo(prevX, prevY);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            this.ctx.stroke();
            prevX = x;
            prevY = y;
        }
    }
    static updateSGStats() {
        if (this.SGClearTimes.length > 0) {
            this.avgSGClearTime = this.SGClearTimes.reduce((acc, val) => acc + val) / this.SGClearTimes.length;
        }
        if (this.SGFillTimes.length > 0) {
            this.avgSGFillTime = this.SGFillTimes.reduce((acc, val) => acc + val) / this.SGFillTimes.length;
        }
        if (this.SGUpdateTimes.length > 0) {
            this.avgSGUpdateTime = this.SGUpdateTimes.reduce((acc, val) => acc + val) / this.SGUpdateTimes.length;
        }
        if (this.SGQueryTimes.length > 0) {
            this.avgSGQueryTime = this.SGQueryTimes.reduce((acc, val) => acc + val) / this.SGQueryTimes.length;
        }
        document.getElementById("sgclear").innerHTML = "Avg SG clear time: " + this.avgSGClearTime;
        document.getElementById("sgfill").innerHTML = "Avg SG fill time: " + this.avgSGFillTime;
        document.getElementById("sgupdate").innerHTML = "Avg SG update time: " + this.avgSGUpdateTime;
        document.getElementById("sgquery").innerHTML = "Avg SG query time: " + this.avgSGQueryTime;
    }
}
exports.default = Stats;
Stats.NUM_POINTS = 60;
Stats.CANVAS_WIDTH = 300;
Stats.CANVAS_HEIGHT = 300;

},{"../Utils/Color":66}],14:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventQueue_1 = __importDefault(require("./EventQueue"));
const GameEvent_1 = __importDefault(require("./GameEvent"));
/**
 * An event emitter object other systems can use to hook into the EventQueue.
 * Provides an easy interface for firing off events.
 */
class Emitter {
    /** Creates a new Emitter */
    constructor() {
        this.eventQueue = EventQueue_1.default.getInstance();
    }
    /**
     * Emit and event of type eventType with the data packet data
     * @param eventType The name of the event to fire off
     * @param data A @reference[Map] or record containing any data about the event
     */
    fireEvent(eventType, data = null) {
        this.eventQueue.addEvent(new GameEvent_1.default(eventType, data));
    }
}
exports.default = Emitter;

},{"./EventQueue":15,"./GameEvent":16}],15:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = __importDefault(require("../DataTypes/Collections/Queue"));
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const GameEventType_1 = require("./GameEventType");
/**
 * The main event system of the game engine.
 * Events are sent to the EventQueue, which handles distribution to any systems that are listening for those events.
 * This allows for handling of input without having classes directly hook into javascript event handles,
 * and allows otherwise separate classes to communicate with each other cleanly, such as a Player object
 * requesting a sound be played by the audio system.
 *
 * The distribution of @reference[GameEvent]s happens as follows:
 *
 * Events are recieved throughout a frame and are queued up by the EventQueue.
 * At the beginning of the next frame, events are sent out to any receivers that are hooked into the event type.
 * @reference[Receiver]s are then free to process events as they see fit.
 *
 * Overall, the EventQueue can be considered as something similar to an email server,
 * and the @reference[Receiver]s can be considered as the client inboxes.
 *
 * See @link(Game Programming Patterns)(https://gameprogrammingpatterns.com/event-queue.html) for more discussion on EventQueues
 */
class EventQueue {
    constructor() {
        this.MAX_SIZE = 200;
        this.q = new Queue_1.default(this.MAX_SIZE);
        this.receivers = new Map_1.default();
    }
    /** Retrieves the instance of the Singleton EventQueue */
    static getInstance() {
        if (this.instance === null) {
            this.instance = new EventQueue();
        }
        return this.instance;
    }
    /** Adds an event to the EventQueue.
     * This is exposed to the rest of the game engine through the @reference[Emitter] class */
    addEvent(event) {
        this.q.enqueue(event);
    }
    /**
     * Associates a receiver with a type of event. Every time this event appears in the future,
     * it will be given to the receiver (and any others watching that type).
     * This is exposed to the rest of the game engine through the @reference[Receiver] class
     * @param receiver The event receiver
     * @param type The type or types of events to subscribe to
     */
    subscribe(receiver, type) {
        if (type instanceof Array) {
            // If it is an array, subscribe to all event types
            for (let t of type) {
                this.addListener(receiver, t);
            }
        }
        else {
            this.addListener(receiver, type);
        }
    }
    /**
     * Unsubscribes the specified receiver from all events, or from whatever events are provided
     * @param receiver The receiver to unsubscribe
     * @param keys The events to unsubscribe from. If none are provided, unsubscribe from all
     */
    unsubscribe(receiver, ...events) {
        this.receivers.forEach(eventName => {
            // If keys were provided, only continue if this key is one of them
            if (events.length > 0 && events.indexOf(eventName) === -1)
                return;
            // Find the index of our receiver for this key
            let index = this.receivers.get(eventName).indexOf(receiver);
            // If an index was found, remove the receiver
            if (index !== -1) {
                this.receivers.get(eventName).splice(index, 1);
            }
        });
    }
    // Associate the receiver and the type
    addListener(receiver, type) {
        if (this.receivers.has(type)) {
            this.receivers.get(type).push(receiver);
        }
        else {
            this.receivers.add(type, [receiver]);
        }
    }
    update(deltaT) {
        while (this.q.hasItems()) {
            // Retrieve each event
            let event = this.q.dequeue();
            // If a receiver has this event type, send it the event
            if (this.receivers.has(event.type)) {
                for (let receiver of this.receivers.get(event.type)) {
                    receiver.receive(event);
                }
            }
            // If a receiver is subscribed to all events, send it the event
            if (this.receivers.has(GameEventType_1.GameEventType.ALL)) {
                for (let receiver of this.receivers.get(GameEventType_1.GameEventType.ALL)) {
                    receiver.receive(event);
                }
            }
        }
    }
}
exports.default = EventQueue;
EventQueue.instance = null;

},{"../DataTypes/Collections/Map":1,"../DataTypes/Collections/Queue":2,"./GameEventType":17}],16:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
/**
 * A representation of an in-game event that is passed through the @reference[EventQueue]
 */
class GameEvent {
    /**
     * Creates a new GameEvent.
     * This is handled implicitly through the @reference[Emitter] class
     * @param type The type of the GameEvent
     * @param data The data contained by the GameEvent
     */
    constructor(type, data = null) {
        // Parse the game event data
        if (data === null) {
            this.data = new Map_1.default();
        }
        else if (!(data instanceof Map_1.default)) {
            // data is a raw object, unpack
            this.data = new Map_1.default();
            for (let key in data) {
                this.data.add(key, data[key]);
            }
        }
        else {
            this.data = data;
        }
        this.type = type;
        this.time = Date.now();
    }
    /**
     * Checks the type of the GameEvent
     * @param type The type to check
     * @returns True if the GameEvent is the specified type, false otherwise.
     */
    isType(type) {
        return this.type === type;
    }
    /**
     * Returns this GameEvent as a string
     * @returns The string representation of the GameEvent
     */
    toString() {
        return this.type + ": @" + this.time;
    }
}
exports.default = GameEvent;

},{"../DataTypes/Collections/Map":1}],17:[function(require,module,exports){
"use strict";
// @ignorePage
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEventType = void 0;
var GameEventType;
(function (GameEventType) {
    /**
     * Mouse Down event. Has data: {position: Vec2 - Mouse Position}
     */
    GameEventType["MOUSE_DOWN"] = "mouse_down";
    /**
     * Mouse Up event. Has data: {position: Vec2 - Mouse Position}
     */
    GameEventType["MOUSE_UP"] = "mouse_up";
    /**
     * Mouse Move event. Has data: {position: Vec2 - Mouse Position}
     */
    GameEventType["MOUSE_MOVE"] = "mouse_move";
    /**
     * Key Down event. Has data: {key: string - The key that is down}
     */
    GameEventType["KEY_DOWN"] = "key_down";
    /**
     * Key Up event. Has data: {key: string - The key that is up}
     */
    GameEventType["KEY_UP"] = "key_up";
    /**
     * Canvas Blur event. Has data: {}
     */
    GameEventType["CANVAS_BLUR"] = "canvas_blur";
    /**
     * Mouse wheel up event. Has data: {}
     */
    GameEventType["WHEEL_UP"] = "wheel_up";
    /**
     * Mouse wheel down event. Has data: {}
     */
    GameEventType["WHEEL_DOWN"] = "wheel_down";
    /**
     * Start Recording event. Has data: {recording: AbstractRecording}
     */
    GameEventType["START_RECORDING"] = "start_recording";
    /**
     * Stop Recording event. Has data: {}
     */
    GameEventType["STOP_RECORDING"] = "stop_recording";
    /**
     * Play Recording event. Has data: {}
     */
    GameEventType["PLAY_RECORDING"] = "play_recording";
    /**
     * Play Sound event. Has data: {key: string, loop: boolean, holdReference: boolean }
     */
    GameEventType["PLAY_SOUND"] = "play_sound";
    /**
     * Play Sound event. Has data: {key: string}
     */
    GameEventType["STOP_SOUND"] = "stop_sound";
    /**
     * Play Sound event. Has data: {key: string, loop: boolean, holdReference: boolean, channel: AudioChannelType }
     */
    GameEventType["PLAY_SFX"] = "play_sfx";
    /**
     * Play Sound event. Has data: {key: string, loop: boolean, holdReference: boolean }
     */
    GameEventType["PLAY_MUSIC"] = "play_music";
    /**
     * Mute audio channel event. Has data: {channel: AudioChannelType}
     */
    GameEventType["MUTE_CHANNEL"] = "mute_channel";
    /**
     * Unmute audio channel event. Has data: {channel: AudioChannelType}
     */
    GameEventType["UNMUTE_CHANNEL"] = "unmute_channel";
    /**
     * Encompasses all event types. Used for receivers only.
     */
    GameEventType["ALL"] = "all";
    /**
     * Disables reveiving input from the user for the specified inputs. Has data: {inputs: InputHanlders[]}
     */
    GameEventType["DISABLE_USER_INPUT"] = "disable_user_input";
    /**
     * Enables receiving input from the user for the specified inputs. Has data: {inputs: InputHandlers[]}
     */
    GameEventType["ENABLE_USER_INPUT"] = "enable_user_input";
    /**
     * Triggers a scene change. Has data: {scene: new (...args: any) => T extends Scene, init: Record<string, any>}
     */
    GameEventType["CHANGE_SCENE"] = "change_scene";
})(GameEventType = exports.GameEventType || (exports.GameEventType = {}));

},{}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = __importDefault(require("../DataTypes/Collections/Queue"));
const EventQueue_1 = __importDefault(require("./EventQueue"));
/**
 * Receives subscribed events from the EventQueue.
 */
class Receiver {
    /** Creates a new Receiver */
    constructor() {
        this.MAX_SIZE = 200;
        this.q = new Queue_1.default(this.MAX_SIZE);
    }
    destroy() {
        EventQueue_1.default.getInstance().unsubscribe(this);
    }
    /**
     * Adds these types of events to this receiver's queue every update.
     * @param eventTypes The types of events this receiver will be subscribed to
     */
    subscribe(eventTypes) {
        EventQueue_1.default.getInstance().subscribe(this, eventTypes);
        this.q.clear();
    }
    /**
     * Adds an event to the queue of this reciever. This is used by the @reference[EventQueue] to distribute events
     * @param event The event to receive
     */
    receive(event) {
        try {
            this.q.enqueue(event);
        }
        catch (e) {
            console.warn("Receiver overflow for event " + event.toString());
            throw e;
        }
    }
    /**
     * Retrieves the next event from the receiver's queue
     * @returns The next GameEvent
     */
    getNextEvent() {
        return this.q.dequeue();
    }
    /**
     * Looks at the next event in the receiver's queue, but doesn't remove it from the queue
     * @returns The next GameEvent
     */
    peekNextEvent() {
        return this.q.peekNext();
    }
    /**
     * Returns true if the receiver has any events in its queue
     * @returns True if the receiver has another event, false otherwise
     */
    hasNextEvent() {
        return this.q.hasItems();
    }
    /**
     * Ignore all events this frame
     */
    ignoreEvents() {
        this.q.clear();
    }
}
exports.default = Receiver;

},{"../DataTypes/Collections/Queue":2,"./EventQueue":15}],19:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Receiver_1 = __importDefault(require("../Events/Receiver"));
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const EventQueue_1 = __importDefault(require("../Events/EventQueue"));
const GameEventType_1 = require("../Events/GameEventType");
/**
 * Receives input events from the @reference[EventQueue] and allows for easy access of information about input by other systems
 */
class Input {
    /**
     * Initializes the Input object
     * @param viewport A reference to the viewport of the game
     */
    static initialize(viewport, keyMap) {
        Input.viewport = viewport;
        Input.mousePressed = false;
        Input.mouseJustPressed = false;
        Input.receiver = new Receiver_1.default();
        Input.keyJustPressed = new Map_1.default();
        Input.keyPressed = new Map_1.default();
        Input.mousePosition = new Vec2_1.default(0, 0);
        Input.mousePressPosition = new Vec2_1.default(0, 0);
        Input.scrollDirection = 0;
        Input.justScrolled = false;
        Input.keysDisabled = false;
        Input.mouseDisabled = false;
        // Initialize the keymap
        Input.keyMap = new Map_1.default();
        // Add all keys to the keymap
        for (let entry in keyMap) {
            let name = keyMap[entry].name;
            let keys = keyMap[entry].keys;
            Input.keyMap.add(name, keys);
        }
        Input.eventQueue = EventQueue_1.default.getInstance();
        // Subscribe to all input events
        Input.eventQueue.subscribe(Input.receiver, [GameEventType_1.GameEventType.MOUSE_DOWN, GameEventType_1.GameEventType.MOUSE_UP, GameEventType_1.GameEventType.MOUSE_MOVE,
            GameEventType_1.GameEventType.KEY_DOWN, GameEventType_1.GameEventType.KEY_UP, GameEventType_1.GameEventType.CANVAS_BLUR, GameEventType_1.GameEventType.WHEEL_UP, GameEventType_1.GameEventType.WHEEL_DOWN]);
    }
    static update(deltaT) {
        // Reset the justPressed values to false
        Input.mouseJustPressed = false;
        Input.keyJustPressed.forEach((key) => Input.keyJustPressed.set(key, false));
        Input.justScrolled = false;
        Input.scrollDirection = 0;
        while (Input.receiver.hasNextEvent()) {
            let event = Input.receiver.getNextEvent();
            // Handle each event type
            if (event.type === GameEventType_1.GameEventType.MOUSE_DOWN) {
                Input.mouseJustPressed = true;
                Input.mousePressed = true;
                Input.mousePressPosition = event.data.get("position");
                Input.mouseButtonPressed = event.data.get("button");
            }
            if (event.type === GameEventType_1.GameEventType.MOUSE_UP) {
                Input.mousePressed = false;
            }
            if (event.type === GameEventType_1.GameEventType.MOUSE_MOVE) {
                Input.mousePosition = event.data.get("position");
            }
            if (event.type === GameEventType_1.GameEventType.KEY_DOWN) {
                let key = event.data.get("key");
                // Handle space bar
                if (key === " ") {
                    key = "space";
                }
                if (!Input.keyPressed.get(key)) {
                    Input.keyJustPressed.set(key, true);
                    Input.keyPressed.set(key, true);
                }
            }
            if (event.type === GameEventType_1.GameEventType.KEY_UP) {
                let key = event.data.get("key");
                // Handle space bar
                if (key === " ") {
                    key = "space";
                }
                Input.keyPressed.set(key, false);
            }
            if (event.type === GameEventType_1.GameEventType.CANVAS_BLUR) {
                Input.clearKeyPresses();
            }
            if (event.type === GameEventType_1.GameEventType.WHEEL_UP) {
                Input.scrollDirection = -1;
                Input.justScrolled = true;
            }
            else if (event.type === GameEventType_1.GameEventType.WHEEL_DOWN) {
                Input.scrollDirection = 1;
                Input.justScrolled = true;
            }
        }
    }
    static clearKeyPresses() {
        Input.keyJustPressed.forEach((key) => Input.keyJustPressed.set(key, false));
        Input.keyPressed.forEach((key) => Input.keyPressed.set(key, false));
    }
    /**
     * Returns whether or not a key was newly pressed Input frame.
     * If the key is still pressed from last frame and wasn't re-pressed, Input will return false.
     * @param key The key
     * @returns True if the key was just pressed, false otherwise
     */
    static isKeyJustPressed(key) {
        if (Input.keysDisabled)
            return false;
        if (Input.keyJustPressed.has(key)) {
            return Input.keyJustPressed.get(key);
        }
        else {
            return false;
        }
    }
    /**
     * Returns an array of all of the keys that are newly pressed Input frame.
     * If a key is still pressed from last frame and wasn't re-pressed, it will not be in Input list.
     * @returns An array of all of the newly pressed keys.
     */
    static getKeysJustPressed() {
        if (Input.keysDisabled)
            return [];
        let keys = Array();
        Input.keyJustPressed.forEach(key => {
            if (Input.keyJustPressed.get(key)) {
                keys.push(key);
            }
        });
        return keys;
    }
    /**
     * Returns whether or not a key is being pressed.
     * @param key The key
     * @returns True if the key is currently pressed, false otherwise
     */
    static isKeyPressed(key) {
        if (Input.keysDisabled)
            return false;
        if (Input.keyPressed.has(key)) {
            return Input.keyPressed.get(key);
        }
        else {
            return false;
        }
    }
    /**
     * Changes the binding of an input name to keys
     * @param inputName The name of the input
     * @param keys The corresponding keys
     */
    static changeKeyBinding(inputName, keys) {
        Input.keyMap.set(inputName, keys);
    }
    /**
     * Clears all key bindings
     */
    static clearAllKeyBindings() {
        Input.keyMap.clear();
    }
    /**
     * Returns whether or not an input was just pressed this frame
     * @param inputName The name of the input
     * @returns True if the input was just pressed, false otherwise
     */
    static isJustPressed(inputName) {
        if (Input.keysDisabled)
            return false;
        if (Input.keyMap.has(inputName)) {
            const keys = Input.keyMap.get(inputName);
            let justPressed = false;
            for (let key of keys) {
                justPressed = justPressed || Input.isKeyJustPressed(key);
            }
            return justPressed;
        }
        else {
            return false;
        }
    }
    /**
     * Returns whether or not an input is currently pressed
     * @param inputName The name of the input
     * @returns True if the input is pressed, false otherwise
     */
    static isPressed(inputName) {
        if (Input.keysDisabled)
            return false;
        if (Input.keyMap.has(inputName)) {
            const keys = Input.keyMap.get(inputName);
            let pressed = false;
            for (let key of keys) {
                pressed = pressed || Input.isKeyPressed(key);
            }
            return pressed;
        }
        else {
            return false;
        }
    }
    /**
     *
     * Returns whether or not the mouse was newly pressed Input frame.
     * @param mouseButton Optionally specify which mouse click you want to know was pressed.
     * 0 for left click, 1 for middle click, 2 for right click.
     * @returns True if the mouse was just pressed, false otherwise
     */
    static isMouseJustPressed(mouseButton) {
        if (mouseButton !== undefined) {
            return Input.mouseJustPressed && !Input.mouseDisabled && mouseButton == this.mouseButtonPressed;
        }
        return Input.mouseJustPressed && !Input.mouseDisabled;
    }
    /**
     * Returns whether or not the mouse is currently pressed
     * @param mouseButton Optionally specify which mouse click you want to know was pressed.
     * 0 for left click, 1 for middle click, 2 for right click.
     * @returns True if the mouse is currently pressed, false otherwise
     */
    static isMousePressed(mouseButton) {
        if (mouseButton !== undefined) {
            return Input.mousePressed && !Input.mouseDisabled && mouseButton == this.mouseButtonPressed;
        }
        return Input.mousePressed && !Input.mouseDisabled;
    }
    /**
     * Returns whether the user scrolled or not
     * @returns True if the user just scrolled Input frame, false otherwise
     */
    static didJustScroll() {
        return Input.justScrolled && !Input.mouseDisabled;
    }
    /**
     * Gets the direction of the scroll
     * @returns -1 if the user scrolled up, 1 if they scrolled down
     */
    static getScrollDirection() {
        return Input.scrollDirection;
    }
    /**
     * Gets the position of the player's mouse
     * @returns The mouse position stored as a Vec2
     */
    static getMousePosition() {
        return Input.mousePosition.scaled(1 / this.viewport.getZoomLevel());
    }
    /**
     * Gets the position of the player's mouse in the game world,
     * taking into consideration the scrolling of the viewport
     * @returns The mouse position stored as a Vec2
     */
    static getGlobalMousePosition() {
        return Input.mousePosition.clone().scale(1 / this.viewport.getZoomLevel()).add(Input.viewport.getOrigin());
    }
    /**
     * Gets the position of the last mouse press
     * @returns The mouse position stored as a Vec2
     */
    static getMousePressPosition() {
        return Input.getMousePosition();
    }
    /**
     * Gets the position of the last mouse press in the game world,
     * taking into consideration the scrolling of the viewport
     * @returns The mouse position stored as a Vec2
     */
    static getGlobalMousePressPosition() {
        return Input.mousePressPosition.clone().add(Input.viewport.getOrigin());
    }
    /**
     * Disables all keypress and mouse click inputs
     */
    static disableInput() {
        Input.keysDisabled = true;
        Input.mouseDisabled = true;
    }
    /**
     * Enables all keypress and mouse click inputs
     */
    static enableInput() {
        Input.keysDisabled = false;
        Input.mouseDisabled = false;
    }
}
exports.default = Input;

},{"../DataTypes/Collections/Map":1,"../DataTypes/Vec2":11,"../Events/EventQueue":15,"../Events/GameEventType":17,"../Events/Receiver":18}],20:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandlers = void 0;
const EventQueue_1 = __importDefault(require("../Events/EventQueue"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const GameEvent_1 = __importDefault(require("../Events/GameEvent"));
const GameEventType_1 = require("../Events/GameEventType");
const Receiver_1 = __importDefault(require("../Events/Receiver"));
var InputHandlers;
(function (InputHandlers) {
    InputHandlers[InputHandlers["MOUSE_DOWN"] = 0] = "MOUSE_DOWN";
    InputHandlers[InputHandlers["MOUSE_UP"] = 1] = "MOUSE_UP";
    InputHandlers[InputHandlers["CONTEXT_MENU"] = 2] = "CONTEXT_MENU";
    InputHandlers[InputHandlers["MOUSE_MOVE"] = 3] = "MOUSE_MOVE";
    InputHandlers[InputHandlers["KEY_DOWN"] = 4] = "KEY_DOWN";
    InputHandlers[InputHandlers["KEY_UP"] = 5] = "KEY_UP";
    InputHandlers[InputHandlers["ON_BLUR"] = 6] = "ON_BLUR";
    InputHandlers[InputHandlers["ON_WHEEL"] = 7] = "ON_WHEEL";
})(InputHandlers = exports.InputHandlers || (exports.InputHandlers = {}));
/**
 * Handles communication with the web browser to receive asynchronous events and send them to the @reference[EventQueue]
 */
class InputHandler {
    /**
     * Creates a new InputHandler
     * @param canvas The game canvas
     */
    constructor(canvas) {
        this.handleMouseDown = (event, canvas) => {
            if (!this.enabled[InputHandlers.MOUSE_DOWN])
                return;
            let pos = this.getMousePosition(event, canvas);
            let button = event.button;
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.MOUSE_DOWN, { position: pos, button: button });
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleMouseUp = (event, canvas) => {
            if (!this.enabled[InputHandlers.MOUSE_DOWN])
                return;
            let pos = this.getMousePosition(event, canvas);
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.MOUSE_UP, { position: pos });
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleMouseMove = (event, canvas) => {
            if (!this.enabled[InputHandlers.MOUSE_MOVE])
                return;
            let pos = this.getMousePosition(event, canvas);
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.MOUSE_MOVE, { position: pos });
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleKeyDown = (event) => {
            if (!this.enabled[InputHandlers.KEY_DOWN])
                return;
            let key = this.getKey(event);
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.KEY_DOWN, { key: key });
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleKeyUp = (event) => {
            if (!this.enabled[InputHandlers.KEY_UP])
                return;
            let key = this.getKey(event);
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.KEY_UP, { key: key });
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleBlur = (event) => {
            if (!this.enabled[InputHandlers.ON_BLUR])
                return;
            let gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.CANVAS_BLUR, {});
            this.eventQueue.addEvent(gameEvent);
        };
        this.handleContextMenu = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        this.handleWheel = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!this.enabled[InputHandlers.ON_WHEEL])
                return;
            let gameEvent;
            if (event.deltaY < 0) {
                gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.WHEEL_UP, {});
            }
            else {
                gameEvent = new GameEvent_1.default(GameEventType_1.GameEventType.WHEEL_DOWN, {});
            }
            this.eventQueue.addEvent(gameEvent);
        };
        this.eventQueue = EventQueue_1.default.getInstance();
        this.enabled = new Array(...[true, true, true, true, true, true, true, true]);
        canvas.onmousedown = (event) => this.handleMouseDown(event, canvas);
        canvas.onmouseup = (event) => this.handleMouseUp(event, canvas);
        canvas.oncontextmenu = this.handleContextMenu;
        canvas.onmousemove = (event) => this.handleMouseMove(event, canvas);
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        document.onblur = this.handleBlur;
        document.oncontextmenu = this.handleBlur;
        document.onwheel = this.handleWheel;
        this.receiver = new Receiver_1.default();
        this.receiver.subscribe(GameEventType_1.GameEventType.DISABLE_USER_INPUT);
        this.receiver.subscribe(GameEventType_1.GameEventType.ENABLE_USER_INPUT);
    }
    update(deltaT) {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }
    handleEvent(event) {
        switch (event.type) {
            case GameEventType_1.GameEventType.DISABLE_USER_INPUT: {
                this.disableHandlers(event.data.get("inputs"));
                break;
            }
            case GameEventType_1.GameEventType.ENABLE_USER_INPUT: {
                this.enableHandlers(event.data.get("inputs"));
                break;
            }
            default: {
                throw new Error(`Unhandled event with type: ${event.type} caught in InputHandler.ts`);
            }
        }
    }
    enableHandlers(handlers) {
        handlers.forEach(handler => this.enabled[handler] = true);
    }
    disableHandlers(handlers) {
        handlers.forEach(handler => this.enabled[handler] = false);
    }
    getKey(keyEvent) {
        return keyEvent.key.toLowerCase();
    }
    getMousePosition(mouseEvent, canvas) {
        let rect = canvas.getBoundingClientRect();
        let x = mouseEvent.clientX - rect.left;
        let y = mouseEvent.clientY - rect.top;
        return new Vec2_1.default(x, y);
    }
}
exports.default = InputHandler;

},{"../DataTypes/Vec2":11,"../Events/EventQueue":15,"../Events/GameEvent":16,"../Events/GameEventType":17,"../Events/Receiver":18}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ignorePage
/**
 * Sets up the environment of the game engine
 */
class EnvironmentInitializer {
    static setup() {
        CanvasRenderingContext2D.prototype.roundedRect = function (x, y, w, h, r) {
            // Clamp the radius between 0 and the min of the width or height
            if (r < 0)
                r = 0;
            if (r > Math.min(w, h))
                r = Math.min(w, h);
            // Draw the rounded rect
            this.beginPath();
            // Top
            this.moveTo(x + r, y);
            this.lineTo(x + w - r, y);
            this.arcTo(x + w, y, x + w, y + r, r);
            // Right
            this.lineTo(x + w, y + h - r);
            this.arcTo(x + w, y + h, x + w - r, y + h, r);
            // Bottom
            this.lineTo(x + r, y + h);
            this.arcTo(x, y + h, x, y + h - r, r);
            // Left
            this.lineTo(x, y + r);
            this.arcTo(x, y, x + r, y, r);
            this.closePath();
        };
        CanvasRenderingContext2D.prototype.strokeRoundedRect = function (x, y, w, h, r) {
            this.roundedRect(x, y, w, h, r);
            this.stroke();
        };
        CanvasRenderingContext2D.prototype.fillRoundedRect = function (x, y, w, h, r) {
            this.roundedRect(x, y, w, h, r);
            this.fill();
        };
    }
}
exports.default = EnvironmentInitializer;

},{}],22:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameLoop_1 = __importDefault(require("./GameLoop"));
const Debug_1 = __importDefault(require("../Debug/Debug"));
const Stats_1 = __importDefault(require("../Debug/Stats"));
/**
 * A game loop with a fixed update time and a variable render time.
 * Every frame, the game updates until all time since the last frame has been processed.
 * If too much time has passed, such as if the last update was too slow,
 * or if the browser was put into the background, the loop will panic and discard time.
 * A render happens at the end of every frame. This happens as fast as possible unless specified.
 * A loop of this type allows for deterministic behavior - No matter what the frame rate is, the update should behave the same,
 * as it is occuring in a fixed interval.
 */
class FixedUpdateGameLoop extends GameLoop_1.default {
    constructor() {
        super();
        /**
         * The main loop of the game. Updates until the current time is reached. Renders once
         * @param timestamp The current time in ms
         */
        this.doFrame = (timestamp) => {
            // If a pause was executed, stop doing the loop.
            if (this.paused) {
                return;
            }
            // Request animation frame to prepare for another update or render
            window.requestAnimationFrame((t) => this.doFrame(t));
            // If we are trying to render too soon, do nothing.
            if (timestamp < this.lastFrameTime + this.minFrameDelay) {
                return;
            }
            // A frame is actually happening
            this.startFrame(timestamp);
            // Update while there is still time to make up. If we do too many update steps, panic and exit the loop.
            this.numUpdateSteps = 0;
            let panic = false;
            while (this.frameDelta >= this.updateTimestep) {
                // Do an update
                this._doUpdate(this.updateTimestep / 1000);
                // Remove the update step time from the time we have to process
                this.frameDelta -= this.updateTimestep;
                // Increment steps and check if we've done too many
                this.numUpdateSteps++;
                if (this.numUpdateSteps > 100) {
                    panic = true;
                    break;
                }
            }
            // Updates are done, render
            this._doRender();
            // Wrap up the frame
            this.finishFrame(panic);
        };
        this.maxUpdateFPS = 60;
        this.updateTimestep = Math.floor(1000 / this.maxUpdateFPS);
        this.frameDelta = 0;
        this.lastFrameTime = 0;
        this.minFrameDelay = 0;
        this.frame = 0;
        this.fps = this.maxUpdateFPS; // Initialize the fps to the max allowed fps
        this.fpsUpdateInterval = 1000;
        this.lastFpsUpdate = 0;
        this.framesSinceLastFpsUpdate = 0;
        this.started = false;
        this.paused = false;
        this.running = false;
        this.numUpdateSteps = 0;
    }
    getFPS() {
        return 0;
    }
    /**
     * Updates the frame count and sum of time for the framerate of the game
     * @param timestep The current time in ms
     */
    updateFPS(timestamp) {
        this.fps = 0.9 * this.framesSinceLastFpsUpdate * 1000 / (timestamp - this.lastFpsUpdate) + (1 - 0.9) * this.fps;
        this.lastFpsUpdate = timestamp;
        this.framesSinceLastFpsUpdate = 0;
        Debug_1.default.log("fps", "FPS: " + this.fps.toFixed(1));
        Stats_1.default.updateFPS(this.fps);
    }
    /**
 * Changes the maximum allowed physics framerate of the game
 * @param initMax The max framerate
 */
    setMaxUpdateFPS(initMax) {
        this.maxUpdateFPS = initMax;
        this.updateTimestep = Math.floor(1000 / this.maxUpdateFPS);
    }
    /**
     * Sets the maximum rendering framerate
     * @param maxFPS The max framerate
     */
    setMaxFPS(maxFPS) {
        this.minFrameDelay = 1000 / maxFPS;
    }
    /**
     * This function is called when the game loop panics, i.e. it tries to process too much time in an entire frame.
     * This will reset the amount of time back to zero.
     * @returns The amount of time we are discarding from processing.
     */
    resetFrameDelta() {
        let oldFrameDelta = this.frameDelta;
        this.frameDelta = 0;
        return oldFrameDelta;
    }
    /**
     * Starts up the game loop and calls the first requestAnimationFrame
     */
    start() {
        if (!this.started) {
            this.started = true;
            window.requestAnimationFrame((timestamp) => this.doFirstFrame(timestamp));
        }
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    /**
     * The first game frame - initializes the first frame time and begins the render
     * @param timestamp The current time in ms
     */
    doFirstFrame(timestamp) {
        this.running = true;
        this._doRender();
        this.lastFrameTime = timestamp;
        this.lastFpsUpdate = timestamp;
        this.framesSinceLastFpsUpdate = 0;
        window.requestAnimationFrame((t) => this.doFrame(t));
    }
    /**
     * Handles any processing that needs to be done at the start of the frame
     * @param timestamp The time of the frame in ms
     */
    startFrame(timestamp) {
        // Update the amount of time we need our update to process
        this.frameDelta += timestamp - this.lastFrameTime;
        // Set the new time of the last frame
        this.lastFrameTime = timestamp;
        // Update the estimate of the framerate
        if (timestamp > this.lastFpsUpdate + this.fpsUpdateInterval) {
            this.updateFPS(timestamp);
        }
        // Increment the number of frames
        this.frame++;
        this.framesSinceLastFpsUpdate++;
    }
    /**
     * Wraps up the frame and handles the panic state if there is one
     * @param panic Whether or not the loop panicked
     */
    finishFrame(panic) {
        if (panic) {
            var discardedTime = Math.round(this.resetFrameDelta());
            console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
        }
    }
}
exports.default = FixedUpdateGameLoop;

},{"../Debug/Debug":12,"../Debug/Stats":13,"./GameLoop":24}],23:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventQueue_1 = __importDefault(require("../Events/EventQueue"));
const Input_1 = __importDefault(require("../Input/Input"));
const InputHandler_1 = __importDefault(require("../Input/InputHandler"));
const Debug_1 = __importDefault(require("../Debug/Debug"));
const ResourceManager_1 = __importDefault(require("../ResourceManager/ResourceManager"));
const Viewport_1 = __importDefault(require("../SceneGraph/Viewport"));
const SceneManager_1 = __importDefault(require("../Scene/SceneManager"));
const AudioManager_1 = __importDefault(require("../Sound/AudioManager"));
const Stats_1 = __importDefault(require("../Debug/Stats"));
const CanvasRenderer_1 = __importDefault(require("../Rendering/CanvasRenderer"));
const Color_1 = __importDefault(require("../Utils/Color"));
const GameOptions_1 = __importDefault(require("./GameOptions"));
const FixedUpdateGameLoop_1 = __importDefault(require("./FixedUpdateGameLoop"));
const EnvironmentInitializer_1 = __importDefault(require("./EnvironmentInitializer"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const RegistryManager_1 = __importDefault(require("../Registry/RegistryManager"));
const WebGLRenderer_1 = __importDefault(require("../Rendering/WebGLRenderer"));
const PlaybackManager_1 = __importDefault(require("../Playback/PlaybackManager"));
/**
 * The main loop of the game engine.
 * Handles the update order, and initializes all subsystems.
 * The Game manages the update cycle, and requests animation frames to render to the browser.
 */
class Game {
    /**
     * Creates a new Game
     * @param options The options for Game initialization
     */
    constructor(options) {
        // Before anything else, build the environment
        EnvironmentInitializer_1.default.setup();
        // Typecast the config object to a GameConfig object
        this.gameOptions = GameOptions_1.default.parse(options);
        this.showDebug = this.gameOptions.showDebug;
        this.showStats = this.gameOptions.showStats;
        // Create an instance of a game loop
        this.loop = new FixedUpdateGameLoop_1.default();
        // Get the game canvas and give it a background color
        this.GAME_CANVAS = document.getElementById("game-canvas");
        this.DEBUG_CANVAS = document.getElementById("debug-canvas");
        // Give the canvas a size and get the rendering context
        this.WIDTH = this.gameOptions.canvasSize.x;
        this.HEIGHT = this.gameOptions.canvasSize.y;
        // This step MUST happen before the resource manager does anything
        if (this.gameOptions.useWebGL) {
            this.renderingManager = new WebGLRenderer_1.default();
        }
        else {
            this.renderingManager = new CanvasRenderer_1.default();
        }
        this.initializeGameWindow();
        this.ctx = this.renderingManager.initializeCanvas(this.GAME_CANVAS, this.WIDTH, this.HEIGHT);
        this.clearColor = new Color_1.default(this.gameOptions.clearColor.r, this.gameOptions.clearColor.g, this.gameOptions.clearColor.b);
        // Initialize debugging and stats
        Debug_1.default.initializeDebugCanvas(this.DEBUG_CANVAS, this.WIDTH, this.HEIGHT);
        Stats_1.default.initStats();
        if (this.gameOptions.showStats) {
            // Find the stats output and make it no longer hidden
            document.getElementById("stats").hidden = false;
        }
        // Size the viewport to the game canvas
        const canvasSize = new Vec2_1.default(this.WIDTH, this.HEIGHT);
        this.viewport = new Viewport_1.default(canvasSize, this.gameOptions.zoomLevel);
        // Initialize all necessary game subsystems
        this.eventQueue = EventQueue_1.default.getInstance();
        this.inputHandler = new InputHandler_1.default(this.GAME_CANVAS);
        Input_1.default.initialize(this.viewport, this.gameOptions.inputs);
        this.resourceManager = ResourceManager_1.default.getInstance();
        this.sceneManager = new SceneManager_1.default(this.viewport, this.renderingManager);
        this.audioManager = AudioManager_1.default.getInstance();
        this.playbackManager = new PlaybackManager_1.default();
    }
    /**
     * Set up the game window that holds the canvases
     */
    initializeGameWindow() {
        const gameWindow = document.getElementById("game-window");
        // Set the height of the game window
        gameWindow.style.width = this.WIDTH + "px";
        gameWindow.style.height = this.HEIGHT + "px";
    }
    /**
     * Retreives the SceneManager from the Game
     * @returns The SceneManager
     */
    getSceneManager() {
        return this.sceneManager;
    }
    /**
     * Starts the game
     */
    start(InitialScene, options) {
        // Set the update function of the loop
        this.loop.doUpdate = (deltaT) => this.update(deltaT);
        // Set the render function of the loop
        this.loop.doRender = () => this.render();
        // Preload registry items
        RegistryManager_1.default.preload();
        // Load the items with the resource manager
        this.resourceManager.loadResourcesFromQueue(() => {
            // When we're done loading, start the loop
            console.log("Finished Preload - loading first scene");
            this.sceneManager.changeToScene(InitialScene, {}, options);
            this.loop.start();
        });
    }
    /**
     * Updates all necessary subsystems of the game. Defers scene updates to the sceneManager
     * @param deltaT The time sine the last update
     */
    update(deltaT) {
        try {
            // Handle all events that happened since the start of the last loop
            this.eventQueue.update(deltaT);
            // Update the input handler - disabling/enabling user input
            this.inputHandler.update(deltaT);
            // Update the input data structures so game objects can see the input
            Input_1.default.update(deltaT);
            // Update the recording of the game
            this.playbackManager.update(deltaT);
            // Update all scenes
            this.sceneManager.update(deltaT);
            // Update all sounds
            this.audioManager.update(deltaT);
            // Load or unload any resources if needed
            this.resourceManager.update(deltaT);
        }
        catch (e) {
            this.loop.pause();
            console.warn("Uncaught Error in Update - Crashing gracefully");
            console.error(e);
        }
    }
    /**
     * Clears the canvas and defers scene rendering to the sceneManager. Renders the debug canvas
     */
    render() {
        try {
            // Clear the canvases
            Debug_1.default.clearCanvas();
            this.renderingManager.clear(this.clearColor);
            this.sceneManager.render();
            // Hacky debug mode
            if (Input_1.default.isKeyJustPressed("g")) {
                this.showDebug = !this.showDebug;
            }
            // Debug render
            if (this.showDebug) {
                Debug_1.default.render();
            }
            if (this.showStats) {
                Stats_1.default.render();
            }
        }
        catch (e) {
            this.loop.pause();
            console.warn("Uncaught Error in Render - Crashing gracefully");
            console.error(e);
        }
    }
}
exports.default = Game;

},{"../DataTypes/Vec2":11,"../Debug/Debug":12,"../Debug/Stats":13,"../Events/EventQueue":15,"../Input/Input":19,"../Input/InputHandler":20,"../Playback/PlaybackManager":39,"../Registry/RegistryManager":42,"../Rendering/CanvasRenderer":47,"../Rendering/WebGLRenderer":52,"../ResourceManager/ResourceManager":59,"../Scene/SceneManager":63,"../SceneGraph/Viewport":64,"../Sound/AudioManager":65,"../Utils/Color":66,"./EnvironmentInitializer":21,"./FixedUpdateGameLoop":22,"./GameOptions":25}],24:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NullFunc_1 = __importDefault(require("../DataTypes/Functions/NullFunc"));
/**
 * The main game loop of the game. Keeps track of fps and handles scheduling of updates and rendering.
 * This class is left abstract, so that a subclass can handle exactly how the loop is scheduled.
 * For an example of different types of game loop scheduling, check out @link(Game Programming Patterns)(https://gameprogrammingpatterns.com/game-loop.html)
 */
class GameLoop {
    constructor() {
        /** The function to call when an update occurs */
        this._doUpdate = NullFunc_1.default;
        /** The function to call when a render occurs */
        this._doRender = NullFunc_1.default;
    }
    set doUpdate(update) {
        this._doUpdate = update;
    }
    set doRender(render) {
        this._doRender = render;
    }
}
exports.default = GameLoop;

},{"../DataTypes/Functions/NullFunc":3}],25:[function(require,module,exports){
"use strict";
// @ignorePage
Object.defineProperty(exports, "__esModule", { value: true });
/** The options for initializing the @reference[GameLoop] */
class GameOptions {
    /**
     * Parses the data in the raw options object
     * @param options The game options as a Record
     * @returns A version of the options converted to a GameOptions object
     */
    static parse(options) {
        let gOpt = new GameOptions();
        gOpt.canvasSize = options.canvasSize ? options.canvasSize : { x: 800, y: 600 };
        gOpt.zoomLevel = options.zoomLevel ? options.zoomLevel : 1;
        gOpt.clearColor = options.clearColor ? options.clearColor : { r: 255, g: 255, b: 255 };
        gOpt.inputs = options.inputs ? options.inputs : [];
        gOpt.showDebug = !!options.showDebug;
        gOpt.showStats = !!options.showStats;
        gOpt.useWebGL = !!options.useWebGL;
        return gOpt;
    }
}
exports.default = GameOptions;

},{}],26:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = __importDefault(require("./GameNode"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const AABB_1 = __importDefault(require("../DataTypes/Shapes/AABB"));
const Debug_1 = __importDefault(require("../Debug/Debug"));
const Color_1 = __importDefault(require("../Utils/Color"));
/**
 * The representation of an object in the game world that can be drawn to the screen
 */
class CanvasNode extends GameNode_1.default {
    constructor() {
        super();
        /** A flag for whether or not the CanvasNode is visible */
        this.visible = true;
        this._size = new Vec2_1.default(0, 0);
        this._size.setOnChange(() => this.sizeChanged());
        this._scale = new Vec2_1.default(1, 1);
        this._scale.setOnChange(() => this.scaleChanged());
        this._boundary = new AABB_1.default();
        this.updateBoundary();
        this._hasCustomShader = false;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(a) {
        this._alpha = a;
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
        // Enter as a lambda to bind "this"
        this._size.setOnChange(() => this.sizeChanged());
        this.sizeChanged();
    }
    get scale() {
        return this._scale;
    }
    set scale(scale) {
        this._scale = scale;
        // Enter as a lambda to bind "this"
        this._scale.setOnChange(() => this.scaleChanged());
        this.scaleChanged();
    }
    set scaleX(value) {
        this.scale.x = value;
    }
    set scaleY(value) {
        this.scale.y = value;
    }
    get hasCustomShader() {
        return this._hasCustomShader;
    }
    get customShaderKey() {
        return this._customShaderKey;
    }
    // @override
    positionChanged() {
        super.positionChanged();
        this.updateBoundary();
    }
    /** Called if the size vector is changed or replaced. */
    sizeChanged() {
        this.updateBoundary();
    }
    /** Called if the scale vector is changed or replaced */
    scaleChanged() {
        this.updateBoundary();
    }
    // @docIgnore
    /** Called if the position, size, or scale of the CanvasNode is changed. Updates the boundary. */
    updateBoundary() {
        this._boundary.center.set(this.position.x, this.position.y);
        this._boundary.halfSize.set(this.size.x * this.scale.x / 2, this.size.y * this.scale.y / 2);
    }
    get boundary() {
        return this._boundary;
    }
    get sizeWithZoom() {
        let zoom = this.scene.getViewScale();
        return this.boundary.halfSize.clone().scaled(zoom, zoom);
    }
    /**
     * Adds a custom shader to this CanvasNode
     * @param key The registry key of the ShaderType
     */
    useCustomShader(key) {
        this._hasCustomShader = true;
        this._customShaderKey = key;
    }
    /**
     * Returns true if the point (x, y) is inside of this canvas object
     * @param x The x position of the point
     * @param y The y position of the point
     * @returns A flag representing whether or not this node contains the point.
     */
    contains(x, y) {
        return this._boundary.containsPoint(new Vec2_1.default(x, y));
    }
    // @implemented
    debugRender() {
        Debug_1.default.drawBox(this.relativePosition, this.sizeWithZoom, false, Color_1.default.BLUE);
        super.debugRender();
    }
}
exports.default = CanvasNode;

},{"../DataTypes/Shapes/AABB":8,"../DataTypes/Vec2":11,"../Debug/Debug":12,"../Utils/Color":66,"./GameNode":27}],27:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweenableProperties = void 0;
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const Receiver_1 = __importDefault(require("../Events/Receiver"));
const Emitter_1 = __importDefault(require("../Events/Emitter"));
const Region_1 = require("../DataTypes/Interfaces/Region");
const AABB_1 = __importDefault(require("../DataTypes/Shapes/AABB"));
const TweenController_1 = __importDefault(require("../Rendering/Animations/TweenController"));
const Debug_1 = __importDefault(require("../Debug/Debug"));
const Color_1 = __importDefault(require("../Utils/Color"));
const Circle_1 = __importDefault(require("../DataTypes/Shapes/Circle"));
/**
 * The representation of an object in the game world.
 * To construct GameNodes, see the @reference[Scene] documentation.
 */
class GameNode {
    // Constructor docs are ignored, as the user should NOT create new GameNodes with a raw constructor
    constructor() {
        /*---------- PHYSICAL ----------*/
        this.hasPhysics = false;
        this.moving = false;
        this.frozen = false;
        this.onGround = false;
        this.onWall = false;
        this.onCeiling = false;
        this.active = false;
        this.isColliding = false;
        this.pathfinding = false;
        this._position = new Vec2_1.default(0, 0);
        this._position.setOnChange(() => this.positionChanged());
        this.receiver = new Receiver_1.default();
        this.emitter = new Emitter_1.default();
        this.tweens = new TweenController_1.default(this);
        this.rotation = 0;
    }
    destroy() {
        this.tweens.destroy();
        this.receiver.destroy();
        if (this.hasPhysics) {
            this.removePhysics();
        }
        if (this._ai) {
            this._ai.destroy();
            delete this._ai;
            this.scene.getAIManager().removeActor(this);
        }
        this.scene.remove(this);
        this.layer.removeNode(this);
    }
    /*---------- POSITIONED ----------*/
    get position() {
        return this._position;
    }
    set position(pos) {
        this._position = pos;
        this._position.setOnChange(() => this.positionChanged());
        this.positionChanged();
    }
    get relativePosition() {
        return this.inRelativeCoordinates(this.position);
    }
    /**
     * Converts a point to coordinates relative to the zoom and origin of this node
     * @param point The point to conver
     * @returns A new Vec2 representing the point in relative coordinates
     */
    inRelativeCoordinates(point) {
        let origin = this.scene.getViewTranslation(this);
        let zoom = this.scene.getViewScale();
        return point.clone().sub(origin).scale(zoom);
    }
    /*---------- UNIQUE ----------*/
    get id() {
        return this._id;
    }
    set id(id) {
        // id can only be set once
        if (this._id === undefined) {
            this._id = id;
        }
        else {
            throw "Attempted to assign id to object that already has id.";
        }
    }
    /*---------- PHYSICAL ----------*/
    // @implemented
    /**
     * @param velocity The velocity with which to move the object.
     */
    move(velocity) {
        if (this.frozen)
            return;
        this.moving = true;
        this._velocity = velocity;
    }
    ;
    moveOnPath(speed, path) {
        if (this.frozen || path.isDone())
            return;
        this.path = path;
        let dir = path.getMoveDirection(this);
        this.moving = true;
        this.pathfinding = true;
        this._velocity = dir.scale(speed);
    }
    // @implemented
    /**
     * @param velocity The velocity with which the object will move.
     */
    finishMove() {
        this.moving = false;
        this.position.add(this._velocity);
        if (this.pathfinding) {
            this.path.handlePathProgress(this);
            this.path = null;
            this.pathfinding = false;
        }
    }
    // @implemented
    /**
     * @param collisionShape The collider for this object. If this has a region (implements Region),
     * it will be used when no collision shape is specified (or if collision shape is null).
     * @param isCollidable Whether this is collidable or not. True by default.
     * @param isStatic Whether this is static or not. False by default
     */
    addPhysics(collisionShape, colliderOffset, isCollidable = true, isStatic = false) {
        // Initialize the physics variables
        this.hasPhysics = true;
        this.moving = false;
        this.onGround = false;
        this.onWall = false;
        this.onCeiling = false;
        this.active = true;
        this.isCollidable = isCollidable;
        this.isStatic = isStatic;
        this.isTrigger = false;
        this.triggerMask = 0;
        this.triggerEnters = new Array(32);
        this.triggerExits = new Array(32);
        this._velocity = Vec2_1.default.ZERO;
        this.sweptRect = new AABB_1.default();
        this.collidedWithTilemap = false;
        this.group = -1; // The default group, collides with everything
        // Set the collision shape if provided, or simply use the the region if there is one.
        if (collisionShape) {
            this.collisionShape = collisionShape;
            this.collisionShape.center = this.position;
        }
        else if ((0, Region_1.isRegion)(this)) {
            // If the gamenode has a region and no other is specified, use that
            this.collisionShape = this.boundary.clone();
        }
        else {
            throw "No collision shape specified for physics object.";
        }
        // If we were provided with a collider offset, set it. Otherwise there is no offset, so use the zero vector
        if (colliderOffset) {
            this.colliderOffset = colliderOffset;
        }
        else {
            this.colliderOffset = Vec2_1.default.ZERO;
        }
        // Initialize the swept rect
        this.sweptRect = this.collisionShape.getBoundingRect();
        // Register the object with physics
        this.scene.getPhysicsManager().registerObject(this);
    }
    /** Removes this object from the physics system */
    removePhysics() {
        // Remove this from the physics manager
        this.scene.getPhysicsManager().deregisterObject(this);
        // Nullify all physics fields
        this.hasPhysics = false;
        this.moving = false;
        this.onGround = false;
        this.onWall = false;
        this.onCeiling = false;
        this.active = false;
        this.isCollidable = false;
        this.isStatic = false;
        this.isTrigger = false;
        this.triggerMask = 0;
        this.triggerEnters = null;
        this.triggerExits = null;
        this._velocity = Vec2_1.default.ZERO;
        this.sweptRect = null;
        this.collidedWithTilemap = false;
        this.group = -1;
        this.collisionShape = null;
        this.colliderOffset = Vec2_1.default.ZERO;
        this.sweptRect = null;
    }
    /** Disables physics movement for this node */
    freeze() {
        this.frozen = true;
    }
    /** Reenables physics movement for this node */
    unfreeze() {
        this.frozen = false;
    }
    /** Prevents this object from participating in all collisions and triggers. It can still move. */
    disablePhysics() {
        this.active = false;
    }
    /** Enables this object to participate in collisions and triggers. This is only necessary if disablePhysics was called */
    enablePhysics() {
        this.active = true;
    }
    /**
     * Sets the collider for this GameNode
     * @param collider The new collider to use
     */
    setCollisionShape(collider) {
        this.collisionShape = collider;
        this.collisionShape.center.copy(this.position);
    }
    // @implemented
    /**
     * Sets this object to be a trigger for a specific group
     * @param group The name of the group that activates the trigger
     * @param onEnter The name of the event to send when this trigger is activated
     * @param onExit The name of the event to send when this trigger stops being activated
     */
    setTrigger(group, onEnter, onExit) {
        // Make this object a trigger
        this.isTrigger = true;
        // Get the number of the physics layer
        let layerNumber = this.scene.getPhysicsManager().getGroupNumber(group);
        if (layerNumber === 0) {
            console.warn(`Trigger for GameNode ${this.id} not set - group "${group}" was not recognized by the physics manager.`);
            return;
        }
        // Add this to the trigger mask
        this.triggerMask |= layerNumber;
        // Layer numbers are bits, so get which bit it is
        let index = Math.log2(layerNumber);
        // Set the event names
        this.triggerEnters[index] = onEnter;
        this.triggerExits[index] = onExit;
    }
    ;
    // @implemented
    /**
     * @param group The physics group this node should belong to
     */
    setGroup(group) {
        this.scene.getPhysicsManager().setGroup(this, group);
    }
    // @implemened
    getLastVelocity() {
        return this._velocity;
    }
    /*---------- ACTOR ----------*/
    get ai() {
        return this._ai;
    }
    set ai(ai) {
        if (!this._ai) {
            // If we haven't been previously had an ai, register us with the ai manager
            this.scene.getAIManager().registerActor(this);
        }
        this._ai = ai;
        this.aiActive = true;
    }
    // @implemented
    addAI(ai, options, type) {
        if (!this._ai) {
            this.scene.getAIManager().registerActor(this);
        }
        if (typeof ai === "string") {
            this._ai = this.scene.getAIManager().generateAI(ai);
        }
        else {
            this._ai = new ai();
        }
        // Question, how much do we want different type of AI to be handled the same, i.e. should GoapAI and AI similar methods and signatures for the sake of unity
        this._ai.initializeAI(this, options);
        this.aiActive = true;
    }
    // @implemented
    setAIActive(active, options) {
        this.aiActive = active;
        if (this.aiActive) {
            this.ai.activate(options);
        }
    }
    /*---------- TWEENABLE PROPERTIES ----------*/
    set positionX(value) {
        this.position.x = value;
    }
    set positionY(value) {
        this.position.y = value;
    }
    /*---------- GAME NODE ----------*/
    /**
     * Sets the scene for this object.
     * @param scene The scene this object belongs to.
     */
    setScene(scene) {
        this.scene = scene;
    }
    /**
     * Gets the scene this object is in.
     * @returns The scene this object belongs to
    */
    getScene() {
        return this.scene;
    }
    /**
     * Sets the layer of this object.
     * @param layer The layer this object will be on.
     */
    setLayer(layer) {
        this.layer = layer;
    }
    /**
     * Returns the layer this object is on.
     * @returns This layer this object is on.
    */
    getLayer() {
        return this.layer;
    }
    /** Called if the position vector is modified or replaced */
    positionChanged() {
        if (this.collisionShape) {
            if (this.colliderOffset) {
                this.collisionShape.center = this.position.clone().add(this.colliderOffset);
            }
            else {
                this.collisionShape.center = this.position.clone();
            }
        }
    }
    ;
    /**
     * Updates this GameNode
     * @param deltaT The timestep of the update.
     */
    update(deltaT) {
        // Defer event handling to AI.
        while (this.receiver.hasNextEvent()) {
            this._ai.handleEvent(this.receiver.getNextEvent());
        }
    }
    // @implemented
    debugRender() {
        // Draw the position of this GameNode
        Debug_1.default.drawPoint(this.relativePosition, Color_1.default.BLUE);
        // If velocity is not zero, draw a vector for it
        if (this._velocity && !this._velocity.isZero()) {
            Debug_1.default.drawRay(this.relativePosition, this._velocity.clone().scaleTo(20).add(this.relativePosition), Color_1.default.BLUE);
        }
        // If this has a collider, draw it
        if (this.collisionShape) {
            let color = this.isColliding ? Color_1.default.RED : Color_1.default.GREEN;
            if (this.isTrigger) {
                color = Color_1.default.MAGENTA;
            }
            color.a = 0.2;
            if (this.collisionShape instanceof AABB_1.default) {
                Debug_1.default.drawBox(this.inRelativeCoordinates(this.collisionShape.center), this.collisionShape.halfSize.scaled(this.scene.getViewScale()), true, color);
            }
            else if (this.collisionShape instanceof Circle_1.default) {
                Debug_1.default.drawCircle(this.inRelativeCoordinates(this.collisionShape.center), this.collisionShape.hw * this.scene.getViewScale(), true, color);
            }
        }
    }
}
exports.default = GameNode;
var TweenableProperties;
(function (TweenableProperties) {
    TweenableProperties["posX"] = "positionX";
    TweenableProperties["posY"] = "positionY";
    TweenableProperties["scaleX"] = "scaleX";
    TweenableProperties["scaleY"] = "scaleY";
    TweenableProperties["rotation"] = "rotation";
    TweenableProperties["alpha"] = "alpha";
})(TweenableProperties = exports.TweenableProperties || (exports.TweenableProperties = {}));

},{"../DataTypes/Interfaces/Region":4,"../DataTypes/Shapes/AABB":8,"../DataTypes/Shapes/Circle":9,"../DataTypes/Vec2":11,"../Debug/Debug":12,"../Events/Emitter":14,"../Events/Receiver":18,"../Rendering/Animations/TweenController":45,"../Utils/Color":66}],28:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasNode_1 = __importDefault(require("./CanvasNode"));
const Color_1 = __importDefault(require("../Utils/Color"));
/**
 * The representation of a game object that doesn't rely on any resources to render - it is drawn to the screen by the canvas
 */
class Graphic extends CanvasNode_1.default {
    constructor() {
        super();
        this.color = Color_1.default.RED;
    }
    get alpha() {
        return this.color.a;
    }
    set alpha(a) {
        this.color.a = a;
    }
    // @deprecated
    /**
     * Sets the color of the Graphic. DEPRECATED
     * @param color The new color of the Graphic.
     */
    setColor(color) {
        this.color = color;
    }
    set colorR(r) {
        this.color.r = r;
    }
    get colorR() {
        return this.color.r;
    }
    set colorG(g) {
        this.color.g = g;
    }
    get colorG() {
        return this.color.g;
    }
    set colorB(b) {
        this.color.b = b;
    }
    get colorB() {
        return this.color.b;
    }
}
exports.default = Graphic;

},{"../Utils/Color":66,"./CanvasNode":26}],29:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graphic_1 = __importDefault(require("../Graphic"));
class Line extends Graphic_1.default {
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
        this.thickness = 2;
        // Does this really have a meaning for lines?
        this.size.set(5, 5);
    }
    set start(pos) {
        this.position = pos;
    }
    get start() {
        return this.position;
    }
    set end(pos) {
        this._end = pos;
    }
    get end() {
        return this._end;
    }
}
exports.default = Line;

},{"../Graphic":28}],30:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graphic_1 = __importDefault(require("../Graphic"));
/** A basic point to be drawn on the screen. */
class Point extends Graphic_1.default {
    constructor(position) {
        // Are we making this a circle?
        super();
        this.position = position;
        this.size.set(5, 5);
    }
}
exports.default = Point;

},{"../Graphic":28}],31:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graphic_1 = __importDefault(require("../Graphic"));
const Color_1 = __importDefault(require("../../Utils/Color"));
/** A basic rectangle to be drawn on the screen. */
class Rect extends Graphic_1.default {
    constructor(position, size) {
        super();
        this.position = position;
        this.size = size;
        this.borderColor = Color_1.default.TRANSPARENT;
        this.borderWidth = 0;
    }
    /**
     * Sets the border color of this rectangle
     * @param color The border color
     */
    setBorderColor(color) {
        this.borderColor = color;
    }
    // @deprecated
    getBorderColor() {
        return this.borderColor;
    }
    /**
     * Sets the border width of this rectangle
     * @param width The width of the rectangle in pixels
     */
    setBorderWidth(width) {
        this.borderWidth = width;
    }
    getBorderWidth() {
        return this.borderWidth;
    }
}
exports.default = Rect;

},{"../../Utils/Color":66,"../Graphic":28}],32:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sprite_1 = __importDefault(require("./Sprite"));
const AnimationManager_1 = __importDefault(require("../../Rendering/Animations/AnimationManager"));
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
/** An sprite with specified animation frames. */
class AnimatedSprite extends Sprite_1.default {
    get cols() {
        return this.numCols;
    }
    get rows() {
        return this.numRows;
    }
    constructor(spritesheet) {
        super(spritesheet.name);
        this.numCols = spritesheet.columns;
        this.numRows = spritesheet.rows;
        // Set the size of the sprite to the sprite size specified by the spritesheet
        this.size.set(spritesheet.spriteWidth, spritesheet.spriteHeight);
        this.animation = new AnimationManager_1.default(this);
        // Add the animations to the animated sprite
        for (let animation of spritesheet.animations) {
            this.animation.add(animation.name, animation);
        }
    }
    /**
     * Gets the image offset for the current index of animation
     * @param index The index we're at in the animation
     * @returns A Vec2 containing the image offset
     */
    getAnimationOffset(index) {
        return new Vec2_1.default((index % this.numCols) * this.size.x, Math.floor(index / this.numCols) * this.size.y);
    }
}
exports.default = AnimatedSprite;

},{"../../DataTypes/Vec2":11,"../../Rendering/Animations/AnimationManager":43,"./Sprite":33}],33:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasNode_1 = __importDefault(require("../CanvasNode"));
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
/**
 * The representation of a sprite - an in-game image
 */
class Sprite extends CanvasNode_1.default {
    constructor(imageId) {
        super();
        this.imageId = imageId;
        let image = ResourceManager_1.default.getInstance().getImage(this.imageId);
        this.size = new Vec2_1.default(image.width, image.height);
        this.imageOffset = Vec2_1.default.ZERO;
        this.invertX = false;
        this.invertY = false;
    }
    /**
     * Sets the offset of the sprite from (0, 0) in the image's coordinates
     * @param offset The offset of the sprite from (0, 0) in image coordinates
     */
    setImageOffset(offset) {
        this.imageOffset = offset;
    }
}
exports.default = Sprite;

},{"../../DataTypes/Vec2":11,"../../ResourceManager/ResourceManager":59,"../CanvasNode":26}],34:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasNode_1 = __importDefault(require("./CanvasNode"));
const Color_1 = __importDefault(require("../Utils/Color"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const Input_1 = __importDefault(require("../Input/Input"));
/**
 * The representation of a UIElement - the parent class of things like buttons
 */
class UIElement extends CanvasNode_1.default {
    constructor(position) {
        super();
        this.position = position;
        this.backgroundColor = new Color_1.default(0, 0, 0, 0);
        this.borderColor = new Color_1.default(0, 0, 0, 0);
        this.borderRadius = 5;
        this.borderWidth = 1;
        this.padding = Vec2_1.default.ZERO;
        this.onClick = null;
        this.onClickEventId = null;
        this.onRelease = null;
        this.onReleaseEventId = null;
        this.onEnter = null;
        this.onEnterEventId = null;
        this.onLeave = null;
        this.onLeaveEventId = null;
        this.isClicked = false;
        this.isEntered = false;
    }
    // @deprecated
    // @deprecated
    setPadding(padding) {
        this.padding.copy(padding);
    }
    update(deltaT) {
        super.update(deltaT);
        // See of this object was just clicked
        if (Input_1.default.isMouseJustPressed()) {
            let clickPos = Input_1.default.getMousePressPosition();
            if (this.contains(clickPos.x, clickPos.y) && this.visible && !this.layer.isHidden()) {
                this.isClicked = true;
                if (this.onClick !== null) {
                    this.onClick();
                }
                if (this.onClickEventId !== null) {
                    let data = {};
                    this.emitter.fireEvent(this.onClickEventId, data);
                }
            }
        }
        // If the mouse wasn't just pressed, then we definitely weren't clicked
        if (!Input_1.default.isMousePressed()) {
            if (this.isClicked) {
                this.isClicked = false;
            }
        }
        // Check if the mouse is hovering over this element
        let mousePos = Input_1.default.getMousePosition();
        if (mousePos && this.contains(mousePos.x, mousePos.y)) {
            this.isEntered = true;
            if (this.onEnter !== null) {
                this.onEnter();
            }
            if (this.onEnterEventId !== null) {
                let data = {};
                this.emitter.fireEvent(this.onEnterEventId, data);
            }
        }
        else if (this.isEntered) {
            this.isEntered = false;
            if (this.onLeave !== null) {
                this.onLeave();
            }
            if (this.onLeaveEventId !== null) {
                let data = {};
                this.emitter.fireEvent(this.onLeaveEventId, data);
            }
        }
        else if (this.isClicked) {
            // If mouse is dragged off of element while down, it is not clicked anymore
            this.isClicked = false;
        }
    }
    /**
     * Overridable method for calculating background color - useful for elements that want to be colored on different after certain events
     * @returns The background color of the UIElement
     */
    calculateBackgroundColor() {
        return this.backgroundColor;
    }
    /**
     * Overridable method for calculating border color - useful for elements that want to be colored on different after certain events
     * @returns The border color of the UIElement
     */
    calculateBorderColor() {
        return this.borderColor;
    }
}
exports.default = UIElement;

},{"../DataTypes/Vec2":11,"../Input/Input":19,"../Utils/Color":66,"./CanvasNode":26}],35:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Label_1 = __importDefault(require("./Label"));
const Color_1 = __importDefault(require("../../Utils/Color"));
/** A clickable button UIElement */
class Button extends Label_1.default {
    constructor(position, text) {
        super(position, text);
        this.backgroundColor = new Color_1.default(150, 75, 203);
        this.borderColor = new Color_1.default(41, 46, 30);
        this.textColor = new Color_1.default(255, 255, 255);
    }
    // @override
    calculateBackgroundColor() {
        // Change the background color if clicked or hovered
        if (this.isEntered && !this.isClicked) {
            return this.backgroundColor.lighten();
        }
        else if (this.isClicked) {
            return this.backgroundColor.darken();
        }
        else {
            return this.backgroundColor;
        }
    }
}
exports.default = Button;

},{"../../Utils/Color":66,"./Label":36}],36:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAlign = exports.VAlign = void 0;
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
const Color_1 = __importDefault(require("../../Utils/Color"));
const UIElement_1 = __importDefault(require("../UIElement"));
/** A basic text-containing label */
class Label extends UIElement_1.default {
    constructor(position, text) {
        super(position);
        this.text = text;
        this.textColor = new Color_1.default(0, 0, 0, 1);
        this.font = "Arial";
        this.fontSize = 30;
        this.hAlign = "center";
        this.vAlign = "center";
        this.borderWidth = 0;
        this.sizeAssigned = false;
    }
    // @deprecated
    setText(text) {
        this.text = text;
    }
    setSize(newSize) {
        this.size = newSize;
    }
    // @deprecated
    setTextColor(color) {
        this.textColor = color;
    }
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }
    setBorderWidth(num) {
        this.borderWidth = num;
    }
    setBorderColor(color) {
        this.borderColor = color;
    }
    /**
     * Gets a string containg the font details for rendering
     * @returns A string containing the font details
     */
    getFontString() {
        return this.fontSize + "px " + this.font;
    }
    /**
     * Overridable method for calculating text color - useful for elements that want to be colored on different after certain events
     * @returns a string containg the text color
     */
    calculateTextColor() {
        return this.textColor.toStringRGBA();
    }
    /**
     * Uses the canvas to calculate the width of the text
     * @param ctx The rendering context
     * @returns A number representing the rendered text width
     */
    calculateTextWidth(ctx) {
        ctx.font = this.fontSize + "px " + this.font;
        return ctx.measureText(this.text).width;
    }
    setHAlign(align) {
        this.hAlign = align;
    }
    setVAlign(align) {
        this.vAlign = align;
    }
    setFontSize(size) {
        this.fontSize = size;
    }
    setFont(font) {
        this.font = font;
    }
    /**
     * Calculate the offset of the text - this is used for rendering text with different alignments
     * @param ctx The rendering context
     * @returns The offset of the text in a Vec2
     */
    calculateTextOffset(ctx) {
        let textWidth = this.calculateTextWidth(ctx);
        let offset = new Vec2_1.default(0, 0);
        let hDiff = this.size.x - textWidth;
        if (this.hAlign === HAlign.CENTER) {
            offset.x = hDiff / 2;
        }
        else if (this.hAlign === HAlign.RIGHT) {
            offset.x = hDiff;
        }
        if (this.vAlign === VAlign.TOP) {
            ctx.textBaseline = "top";
            offset.y = 0;
        }
        else if (this.vAlign === VAlign.BOTTOM) {
            ctx.textBaseline = "bottom";
            offset.y = this.size.y;
        }
        else {
            ctx.textBaseline = "middle";
            offset.y = this.size.y / 2;
        }
        return offset;
    }
    sizeChanged() {
        super.sizeChanged();
        this.sizeAssigned = true;
    }
    /**
     * Automatically sizes the element to the text within it
     * @param ctx The rendering context
     */
    autoSize(ctx) {
        let width = this.calculateTextWidth(ctx);
        let height = this.fontSize;
        this.size.set(width + this.padding.x * 2, height + this.padding.y * 2);
        this.sizeAssigned = true;
    }
    /**
     * Initially assigns a size to the UIElement if none is provided
     * @param ctx The rendering context
     */
    handleInitialSizing(ctx) {
        if (!this.sizeAssigned) {
            this.autoSize(ctx);
        }
    }
    /** On the next render, size this element to it's current text using its current font size */
    sizeToText() {
        this.sizeAssigned = false;
    }
}
exports.default = Label;
var VAlign;
(function (VAlign) {
    VAlign["TOP"] = "top";
    VAlign["CENTER"] = "center";
    VAlign["BOTTOM"] = "bottom";
})(VAlign = exports.VAlign || (exports.VAlign = {}));
var HAlign;
(function (HAlign) {
    HAlign["LEFT"] = "left";
    HAlign["CENTER"] = "center";
    HAlign["RIGHT"] = "right";
})(HAlign = exports.HAlign || (exports.HAlign = {}));

},{"../../DataTypes/Vec2":11,"../../Utils/Color":66,"../UIElement":34}],37:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
const Input_1 = __importDefault(require("../../Input/Input"));
const Color_1 = __importDefault(require("../../Utils/Color"));
const MathUtils_1 = __importDefault(require("../../Utils/MathUtils"));
const UIElement_1 = __importDefault(require("../UIElement"));
/** A slider UIElement */
class Slider extends UIElement_1.default {
    constructor(position, initValue) {
        super(position);
        this.value = initValue;
        this.nibColor = Color_1.default.RED;
        this.sliderColor = Color_1.default.BLACK;
        this.backgroundColor = Color_1.default.TRANSPARENT;
        this.borderColor = Color_1.default.TRANSPARENT;
        this.nibSize = new Vec2_1.default(10, 20);
        // Set a default size
        this.size.set(200, 20);
    }
    /**
     * Retrieves the value of the slider
     * @returns The value of the slider
     */
    getValue() {
        return this.value;
    }
    /** A method called in response to the value changing */
    valueChanged() {
        if (this.onValueChange) {
            this.onValueChange(this.value);
        }
        if (this.onValueChangeEventId) {
            this.emitter.fireEvent(this.onValueChangeEventId, { target: this, value: this.value });
        }
    }
    update(deltaT) {
        super.update(deltaT);
        if (this.isClicked) {
            let val = MathUtils_1.default.invLerp(this.position.x - this.size.x / 2, this.position.x + this.size.x / 2, Input_1.default.getMousePosition().x);
            this.value = MathUtils_1.default.clamp01(val);
            this.valueChanged();
        }
    }
}
exports.default = Slider;

},{"../../DataTypes/Vec2":11,"../../Input/Input":19,"../../Utils/Color":66,"../../Utils/MathUtils":68,"../UIElement":34}],38:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../../Utils/Color"));
const Label_1 = __importDefault(require("./Label"));
const Input_1 = __importDefault(require("../../Input/Input"));
/** A text input UIElement */
class TextInput extends Label_1.default {
    constructor(position) {
        super(position, "");
        this.focused = false;
        this.cursorCounter = 0;
        // Give a default size to the x only
        this.size.set(200, this.fontSize);
        this.hAlign = "left";
        this.borderColor = Color_1.default.BLACK;
        this.backgroundColor = Color_1.default.WHITE;
    }
    update(deltaT) {
        super.update(deltaT);
        if (Input_1.default.isMouseJustPressed()) {
            let clickPos = Input_1.default.getMousePressPosition();
            if (this.contains(clickPos.x, clickPos.y)) {
                this.focused = true;
                this.cursorCounter = 30;
            }
            else {
                this.focused = false;
            }
        }
        if (this.focused) {
            let keys = Input_1.default.getKeysJustPressed();
            let nums = "1234567890";
            let specialChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
            let letters = "qwertyuiopasdfghjklzxcvbnm";
            let mask = nums + specialChars + letters;
            keys = keys.filter(key => mask.includes(key));
            let shiftPressed = Input_1.default.isKeyPressed("shift");
            let backspacePressed = Input_1.default.isKeyJustPressed("backspace");
            let spacePressed = Input_1.default.isKeyJustPressed("space");
            if (backspacePressed) {
                this.text = this.text.substring(0, this.text.length - 1);
            }
            else if (spacePressed) {
                this.text += " ";
            }
            else if (keys.length > 0) {
                if (shiftPressed) {
                    this.text += keys[0].toUpperCase();
                }
                else {
                    this.text += keys[0];
                }
            }
        }
    }
}
exports.default = TextInput;

},{"../../Input/Input":19,"../../Utils/Color":66,"./Label":36}],39:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameEventType_1 = require("../Events/GameEventType");
const Receiver_1 = __importDefault(require("../Events/Receiver"));
class PlaybackManager {
    constructor() {
        this.recording = false;
        this.playing = false;
        this.receiver = new Receiver_1.default();
        this.receiver.subscribe([GameEventType_1.GameEventType.START_RECORDING, GameEventType_1.GameEventType.STOP_RECORDING, GameEventType_1.GameEventType.PLAY_RECORDING]);
    }
    update(deltaT) {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
        if (this.recorder !== undefined) {
            this.recorder.update(deltaT);
            this.recording = this.recorder.active();
        }
        if (this.replayer !== undefined) {
            this.replayer.update(deltaT);
            this.playing = this.replayer.active();
        }
    }
    handleEvent(event) {
        switch (event.type) {
            case GameEventType_1.GameEventType.START_RECORDING: {
                this.handleStartRecordingEvent(event);
                break;
            }
            case GameEventType_1.GameEventType.STOP_RECORDING: {
                this.handleStopRecordingEvent();
                break;
            }
            case GameEventType_1.GameEventType.PLAY_RECORDING: {
                this.handlePlayRecordingEvent(event);
                break;
            }
        }
    }
    handleStartRecordingEvent(event) {
        let recording = event.data.get("recording");
        if (!this.playing && !this.recording && recording !== undefined) {
            this.lastRecording = recording;
            let Recorder = this.lastRecording.recorder();
            if (this.recorder === undefined || this.recorder.constructor !== Recorder) {
                this.recorder = new Recorder();
            }
            this.recorder.start(this.lastRecording);
            this.recording = this.recorder.active();
        }
    }
    handleStopRecordingEvent() {
        this.recorder.stop();
        this.recording = this.recorder.active();
    }
    handlePlayRecordingEvent(event) {
        if (!this.recording && this.lastRecording !== undefined) {
            let Replayer = this.lastRecording.replayer();
            if (this.replayer === undefined || this.replayer.constructor !== Replayer) {
                this.replayer = new Replayer();
            }
            this.replayer.start(this.lastRecording, event.data.get("onEnd"));
            this.playing = this.replayer.active();
        }
    }
}
exports.default = PlaybackManager;

},{"../Events/GameEventType":17,"../Events/Receiver":18}],40:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../../DataTypes/Collections/Map"));
/** */
class Registry extends Map_1.default {
}
exports.default = Registry;

},{"../../DataTypes/Collections/Map":1}],41:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LabelShaderType_1 = __importDefault(require("../../Rendering/WebGLRendering/ShaderTypes/LabelShaderType"));
const PointShaderType_1 = __importDefault(require("../../Rendering/WebGLRendering/ShaderTypes/PointShaderType"));
const RectShaderType_1 = __importDefault(require("../../Rendering/WebGLRendering/ShaderTypes/RectShaderType"));
const SpriteShaderType_1 = __importDefault(require("../../Rendering/WebGLRendering/ShaderTypes/SpriteShaderType"));
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
const Registry_1 = __importDefault(require("./Registry"));
/**
 * A registry that handles shaders
 */
class ShaderRegistry extends Registry_1.default {
    constructor() {
        super(...arguments);
        this.registryItems = new Array();
    }
    /**
     * Preloads all built-in shaders
     */
    preload() {
        // Get the resourceManager and queue all built-in shaders for preloading
        const rm = ResourceManager_1.default.getInstance();
        // Queue a load for the point shader
        this.registerAndPreloadItem(ShaderRegistry.POINT_SHADER, PointShaderType_1.default, "builtin/shaders/point.vshader", "builtin/shaders/point.fshader");
        // Queue a load for the rect shader
        this.registerAndPreloadItem(ShaderRegistry.RECT_SHADER, RectShaderType_1.default, "builtin/shaders/rect.vshader", "builtin/shaders/rect.fshader");
        // Queue a load for the sprite shader
        this.registerAndPreloadItem(ShaderRegistry.SPRITE_SHADER, SpriteShaderType_1.default, "builtin/shaders/sprite.vshader", "builtin/shaders/sprite.fshader");
        // Queue a load for the label shader
        this.registerAndPreloadItem(ShaderRegistry.LABEL_SHADER, LabelShaderType_1.default, "builtin/shaders/label.vshader", "builtin/shaders/label.fshader");
        // Queue a load for any preloaded items
        for (let item of this.registryItems) {
            const shader = new item.constr(item.key);
            shader.initBufferObject();
            this.add(item.key, shader);
            // Load if desired
            if (item.preload !== undefined) {
                rm.shader(item.key, item.preload.vshaderLocation, item.preload.fshaderLocation);
            }
        }
    }
    /**
     * Registers a shader in the registry and loads it before the game begins
     * @param key The key you wish to assign to the shader
     * @param constr The constructor of the ShaderType
     * @param vshaderLocation The location of the vertex shader
     * @param fshaderLocation the location of the fragment shader
     */
    registerAndPreloadItem(key, constr, vshaderLocation, fshaderLocation) {
        let shaderPreload = new ShaderPreload();
        shaderPreload.vshaderLocation = vshaderLocation;
        shaderPreload.fshaderLocation = fshaderLocation;
        let registryItem = new ShaderRegistryItem();
        registryItem.key = key;
        registryItem.constr = constr;
        registryItem.preload = shaderPreload;
        this.registryItems.push(registryItem);
    }
    /**
     * Registers a shader in the registry. NOTE: If you use this, you MUST load the shader before use.
     * If you wish to preload the shader, use registerAndPreloadItem()
     * @param key The key you wish to assign to the shader
     * @param constr The constructor of the ShaderType
     */
    registerItem(key, constr) {
        let registryItem = new ShaderRegistryItem();
        registryItem.key = key;
        registryItem.constr = constr;
        this.registryItems.push(registryItem);
    }
}
exports.default = ShaderRegistry;
// Shader names
ShaderRegistry.POINT_SHADER = "point";
ShaderRegistry.RECT_SHADER = "rect";
ShaderRegistry.SPRITE_SHADER = "sprite";
ShaderRegistry.LABEL_SHADER = "label";
class ShaderRegistryItem {
}
class ShaderPreload {
}

},{"../../Rendering/WebGLRendering/ShaderTypes/LabelShaderType":54,"../../Rendering/WebGLRendering/ShaderTypes/PointShaderType":55,"../../Rendering/WebGLRendering/ShaderTypes/RectShaderType":57,"../../Rendering/WebGLRendering/ShaderTypes/SpriteShaderType":58,"../../ResourceManager/ResourceManager":59,"./Registry":40}],42:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const ShaderRegistry_1 = __importDefault(require("./Registries/ShaderRegistry"));
/**
 * The Registry is the system's way of converting classes and types into string
 * representations for use elsewhere in the application.
 * It allows classes to be accessed without explicitly using constructors in code,
 * and for resources to be loaded at Game creation time.
 */
class RegistryManager {
    static preload() {
        this.shaders.preload();
        this.registries.forEach((key) => this.registries.get(key).preload());
    }
    static addCustomRegistry(name, registry) {
        this.registries.add(name, registry);
    }
    static getRegistry(key) {
        return this.registries.get(key);
    }
}
exports.default = RegistryManager;
RegistryManager.shaders = new ShaderRegistry_1.default();
/** Additional custom registries to add to the registry manager */
RegistryManager.registries = new Map_1.default();

},{"../DataTypes/Collections/Map":1,"./Registries/ShaderRegistry":41}],43:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../../DataTypes/Collections/Map"));
const Emitter_1 = __importDefault(require("../../Events/Emitter"));
const AnimationTypes_1 = require("./AnimationTypes");
/**
 * An animation manager class for an animated CanvasNode.
 * This class keeps track of the possible animations, as well as the current animation state,
 * and abstracts all interactions with playing, pausing, and stopping animations as well as
 * creating new animations from the CanvasNode.
 */
class AnimationManager {
    /**
     * Creates a new AnimationManager
     * @param owner The owner of the AnimationManager
     */
    constructor(owner) {
        this.owner = owner;
        this.animationState = AnimationTypes_1.AnimationState.STOPPED;
        this.currentAnimation = "";
        this.currentFrame = 0;
        this.frameProgress = 0;
        this.loop = false;
        this.animations = new Map_1.default();
        this.onEndEvent = null;
        this.emitter = new Emitter_1.default();
    }
    /**
     * Add an animation to this sprite
     * @param key The unique key of the animation
     * @param animation The animation data
     */
    add(key, animation) {
        this.animations.add(key, animation);
    }
    /**
     * Gets the index specified by the current animation and current frame
     * @returns The index in the current animation
     */
    getIndex() {
        if (this.animations.has(this.currentAnimation)) {
            return this.animations.get(this.currentAnimation).frames[this.currentFrame].index;
        }
        else {
            // No current animation, warn the user
            // console.warn(`Animation index was requested, but the current animation: ${this.currentAnimation} was invalid`);
            return 0;
        }
    }
    /**
     * Determines whether the specified animation is currently playing
     * @param key The key of the animation to check
     * @returns true if the specified animation is playing, false otherwise
     */
    isPlaying(key) {
        return this.currentAnimation === key && this.animationState === AnimationTypes_1.AnimationState.PLAYING;
    }
    /**
     * Retrieves the current animation index and advances the animation frame
     * @returns The index of the animation frame
     */
    getIndexAndAdvanceAnimation() {
        // If we aren't playing, we won't be advancing the animation
        if (!(this.animationState === AnimationTypes_1.AnimationState.PLAYING)) {
            return this.getIndex();
        }
        if (this.animations.has(this.currentAnimation)) {
            let currentAnimation = this.animations.get(this.currentAnimation);
            let index = currentAnimation.frames[this.currentFrame].index;
            // Advance the animation
            this.frameProgress += 1;
            if (this.frameProgress >= currentAnimation.frames[this.currentFrame].duration) {
                // We have been on this frame for its whole duration, go to the next one
                this.frameProgress = 0;
                this.currentFrame += 1;
                if (this.currentFrame >= currentAnimation.frames.length) {
                    // We have reached the end of this animation
                    if (this.loop) {
                        this.currentFrame = 0;
                        this.frameProgress = 0;
                    }
                    else {
                        this.endCurrentAnimation();
                    }
                }
            }
            // Return the current index
            return index;
        }
        else {
            // No current animation, can't advance. Warn the user
            console.warn(`Animation index and advance was requested, but the current animation (${this.currentAnimation}) in node with id: ${this.owner.id} was invalid`);
            return 0;
        }
    }
    /** Ends the current animation and fires any necessary events, as well as starting any new animations */
    endCurrentAnimation() {
        this.currentFrame = 0;
        this.animationState = AnimationTypes_1.AnimationState.STOPPED;
        if (this.onEndEvent !== null) {
            this.emitter.fireEvent(this.onEndEvent, { owner: this.owner.id, animation: this.currentAnimation });
        }
        // If there is a pending animation, play it
        if (this.pendingAnimation !== null) {
            this.play(this.pendingAnimation, this.pendingLoop, this.pendingOnEnd);
        }
    }
    /**
     * Plays the specified animation. Does not restart it if it is already playing
     * @param animation The name of the animation to play
     * @param loop Whether or not to loop the animation. False by default
     * @param onEnd The name of an event to send when this animation naturally stops playing. This only matters if loop is false.
     */
    playIfNotAlready(animation, loop, onEnd) {
        if (this.currentAnimation !== animation) {
            this.play(animation, loop, onEnd);
        }
    }
    /**
     * Plays the specified animation
     * @param animation The name of the animation to play
     * @param loop Whether or not to loop the animation. False by default
     * @param onEnd The name of an event to send when this animation naturally stops playing. This only matters if loop is false.
     */
    play(animation, loop, onEnd) {
        this.currentAnimation = animation;
        this.currentFrame = 0;
        this.frameProgress = 0;
        this.animationState = AnimationTypes_1.AnimationState.PLAYING;
        // If loop arg was provided, use that
        if (loop !== undefined) {
            this.loop = loop;
        }
        else {
            // Otherwise, use what the json file specified
            this.loop = this.animations.get(animation).repeat;
        }
        if (onEnd !== undefined) {
            this.onEndEvent = onEnd;
        }
        else {
            this.onEndEvent = null;
        }
        // Reset pending animation
        this.pendingAnimation = null;
    }
    /**
     * Queues a single animation to be played after the current one. Does NOT stack.
     * Queueing additional animations past 1 will just replace the queued animation
     * @param animation The animation to queue
     * @param loop Whether or not the loop the queued animation
     * @param onEnd The event to fire when the queued animation ends
     */
    queue(animation, loop = false, onEnd) {
        this.pendingAnimation = animation;
        this.pendingLoop = loop;
        if (onEnd !== undefined) {
            this.pendingOnEnd = onEnd;
        }
        else {
            this.pendingOnEnd = null;
        }
    }
    /** Pauses the current animation */
    pause() {
        this.animationState = AnimationTypes_1.AnimationState.PAUSED;
    }
    /** Resumes the current animation if possible */
    resume() {
        if (this.animationState === AnimationTypes_1.AnimationState.PAUSED) {
            this.animationState = AnimationTypes_1.AnimationState.PLAYING;
        }
    }
    /** Stops the current animation. The animation cannot be resumed after this. */
    stop() {
        this.animationState = AnimationTypes_1.AnimationState.STOPPED;
    }
}
exports.default = AnimationManager;

},{"../../DataTypes/Collections/Map":1,"../../Events/Emitter":14,"./AnimationTypes":44}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweenData = exports.TweenEffect = exports.AnimationData = exports.AnimationState = void 0;
// @ignorePage
var AnimationState;
(function (AnimationState) {
    AnimationState[AnimationState["STOPPED"] = 0] = "STOPPED";
    AnimationState[AnimationState["PAUSED"] = 1] = "PAUSED";
    AnimationState[AnimationState["PLAYING"] = 2] = "PLAYING";
})(AnimationState = exports.AnimationState || (exports.AnimationState = {}));
class AnimationData {
    constructor() {
        this.repeat = false;
    }
}
exports.AnimationData = AnimationData;
class TweenEffect {
}
exports.TweenEffect = TweenEffect;
class TweenData {
}
exports.TweenData = TweenData;

},{}],45:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../../DataTypes/Collections/Map"));
const AnimationTypes_1 = require("./AnimationTypes");
const EaseFunctions_1 = __importDefault(require("../../Utils/EaseFunctions"));
const MathUtils_1 = __importDefault(require("../../Utils/MathUtils"));
const TweenManager_1 = __importDefault(require("./TweenManager"));
const Emitter_1 = __importDefault(require("../../Events/Emitter"));
/**
 * A manager for the tweens of a GameNode.
 * Tweens are short animations played by interpolating between two properties using an easing function.
 * For a good visual representation of easing functions, check out @link(https://easings.net/)(https://easings.net/).
 * Multiple tween can be played at the same time, as long as they don't change the same property.
 * This allows for some interesting polishes or animations that may be very difficult to do with sprite work alone
 * - especially pixel art (such as rotations or scaling).
 */
class TweenController {
    /**
     * Creates a new TweenController
     * @param owner The owner of the TweenController
     */
    constructor(owner) {
        this.owner = owner;
        this.tweens = new Map_1.default();
        this.emitter = new Emitter_1.default();
        // Give ourselves to the TweenManager
        TweenManager_1.default.getInstance().registerTweenController(this);
    }
    /**
     * Destroys this TweenController
     */
    destroy() {
        // Only the gamenode and the tween manager should have a reference to this
        delete this.owner.tweens;
        TweenManager_1.default.getInstance().deregisterTweenController(this);
    }
    /**
     * Add a tween to this game node
     * @param key The name of the tween
     * @param tween The data of the tween
     */
    add(key, tween) {
        let typedTween = tween;
        // Initialize members that we need (and the user didn't provide)
        typedTween.progress = 0;
        typedTween.elapsedTime = 0;
        typedTween.animationState = AnimationTypes_1.AnimationState.STOPPED;
        this.tweens.add(key, typedTween);
    }
    /**
     * Play a tween with a certain name
     * @param key The name of the tween to play
     * @param loop Whether or not the tween should loop
     */
    play(key, loop) {
        if (this.tweens.has(key)) {
            let tween = this.tweens.get(key);
            // Set loop if needed
            if (loop !== undefined) {
                tween.loop = loop;
            }
            // Set the initial values
            for (let effect of tween.effects) {
                if (effect.resetOnComplete) {
                    effect.initialValue = this.owner[effect.property];
                }
            }
            // Start the tween running
            tween.animationState = AnimationTypes_1.AnimationState.PLAYING;
            tween.elapsedTime = 0;
            tween.progress = 0;
            tween.reversing = false;
        }
        else {
            console.warn(`Tried to play tween "${key}" on node with id ${this.owner.id}, but no such tween exists`);
        }
    }
    /**
     * Pauses a playing tween. Does not affect tweens that are stopped.
     * @param key The name of the tween to pause.
     */
    pause(key) {
        if (this.tweens.has(key)) {
            this.tweens.get(key).animationState = AnimationTypes_1.AnimationState.PAUSED;
        }
    }
    /**
     * Resumes a paused tween.
     * @param key The name of the tween to resume
     */
    resume(key) {
        if (this.tweens.has(key)) {
            let tween = this.tweens.get(key);
            if (tween.animationState === AnimationTypes_1.AnimationState.PAUSED)
                tween.animationState = AnimationTypes_1.AnimationState.PLAYING;
        }
    }
    /**
     * Stops a currently playing tween
     * @param key The key of the tween
     */
    stop(key) {
        if (this.tweens.has(key)) {
            let tween = this.tweens.get(key);
            tween.animationState = AnimationTypes_1.AnimationState.STOPPED;
            // Return to the initial values
            for (let effect of tween.effects) {
                if (effect.resetOnComplete) {
                    this.owner[effect.property] = effect.initialValue;
                }
            }
        }
    }
    /**
     * The natural stop of a currently playing tween
     * @param key The key of the tween
     */
    end(key) {
        this.stop(key);
        if (this.tweens.has(key)) {
            // Get the tween
            let tween = this.tweens.get(key);
            // If it has an onEnd, send an event
            if (tween.onEnd) {
                let data = { key: key, node: this.owner.id };
                // If it has onEnd event data, add each entry, as long as the key is not named 'key' or 'node'
                if (tween.onEndData) {
                    Object.keys(tween.onEndData).forEach(key => {
                        if (key !== "key" && key !== "node") {
                            data[key] = tween.onEndData[key];
                        }
                    });
                }
                this.emitter.fireEvent(tween.onEnd, data);
            }
        }
    }
    /**
     * Stops all currently playing tweens
     */
    stopAll() {
        this.tweens.forEach(key => this.stop(key));
    }
    update(deltaT) {
        this.tweens.forEach(key => {
            let tween = this.tweens.get(key);
            if (tween.animationState === AnimationTypes_1.AnimationState.PLAYING) {
                // Update the progress of the tween
                tween.elapsedTime += deltaT * 1000;
                // If we're past the startDelay, do the tween
                if (tween.elapsedTime >= tween.startDelay) {
                    if (!tween.reversing && tween.elapsedTime >= tween.startDelay + tween.duration) {
                        // If we're over time, stop the tween, loop, or reverse
                        if (tween.reverseOnComplete) {
                            // If we're over time and can reverse, do so
                            tween.reversing = true;
                        }
                        else if (tween.loop) {
                            // If we can't reverse and can loop, do so
                            tween.elapsedTime -= tween.duration;
                        }
                        else {
                            // We aren't looping and can't reverse, so stop
                            this.end(key);
                        }
                    }
                    // Check for the end of reversing
                    if (tween.reversing && tween.elapsedTime >= tween.startDelay + 2 * tween.duration) {
                        if (tween.loop) {
                            tween.reversing = false;
                            tween.elapsedTime -= 2 * tween.duration;
                        }
                        else {
                            this.end(key);
                        }
                    }
                    // Update the progress, make sure it is between 0 and 1. Errors from this should never be large
                    if (tween.reversing) {
                        tween.progress = MathUtils_1.default.clamp01((2 * tween.duration - (tween.elapsedTime - tween.startDelay)) / tween.duration);
                    }
                    else {
                        tween.progress = MathUtils_1.default.clamp01((tween.elapsedTime - tween.startDelay) / tween.duration);
                    }
                    for (let effect of tween.effects) {
                        // Get the value from the ease function that corresponds to our progress
                        let ease = EaseFunctions_1.default[effect.ease](tween.progress);
                        // Use the value to lerp the property
                        let value = MathUtils_1.default.lerp(effect.start, effect.end, ease);
                        // Assign the value of the property
                        this.owner[effect.property] = value;
                    }
                }
            }
        });
    }
}
exports.default = TweenController;

},{"../../DataTypes/Collections/Map":1,"../../Events/Emitter":14,"../../Utils/EaseFunctions":67,"../../Utils/MathUtils":68,"./AnimationTypes":44,"./TweenManager":46}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TweenManager {
    constructor() {
        this.tweenControllers = new Array();
    }
    static getInstance() {
        if (TweenManager.instance === null) {
            TweenManager.instance = new TweenManager();
        }
        return TweenManager.instance;
    }
    registerTweenController(controller) {
        this.tweenControllers.push(controller);
    }
    deregisterTweenController(controller) {
        let index = this.tweenControllers.indexOf(controller);
        this.tweenControllers.splice(index, 1);
    }
    clearTweenControllers() {
        this.tweenControllers = new Array();
    }
    update(deltaT) {
        for (let tweenController of this.tweenControllers) {
            tweenController.update(deltaT);
        }
    }
}
exports.default = TweenManager;
TweenManager.instance = null;

},{}],47:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graphic_1 = __importDefault(require("../Nodes/Graphic"));
const Point_1 = __importDefault(require("../Nodes/Graphics/Point"));
const Rect_1 = __importDefault(require("../Nodes/Graphics/Rect"));
const Sprite_1 = __importDefault(require("../Nodes/Sprites/Sprite"));
const UIElement_1 = __importDefault(require("../Nodes/UIElement"));
const GraphicRenderer_1 = __importDefault(require("./CanvasRendering/GraphicRenderer"));
const RenderingManager_1 = __importDefault(require("./RenderingManager"));
const TilemapRenderer_1 = __importDefault(require("./CanvasRendering/TilemapRenderer"));
const UIElementRenderer_1 = __importDefault(require("./CanvasRendering/UIElementRenderer"));
const Label_1 = __importDefault(require("../Nodes/UIElements/Label"));
const Button_1 = __importDefault(require("../Nodes/UIElements/Button"));
const Slider_1 = __importDefault(require("../Nodes/UIElements/Slider"));
const TextInput_1 = __importDefault(require("../Nodes/UIElements/TextInput"));
const AnimatedSprite_1 = __importDefault(require("../Nodes/Sprites/AnimatedSprite"));
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const Line_1 = __importDefault(require("../Nodes/Graphics/Line"));
const Debug_1 = __importDefault(require("../Debug/Debug"));
/**
 * An implementation of the RenderingManager class using CanvasRenderingContext2D.
 */
class CanvasRenderer extends RenderingManager_1.default {
    constructor() {
        super();
    }
    // @override
    setScene(scene) {
        this.scene = scene;
        this.graphicRenderer.setScene(scene);
        this.tilemapRenderer.setScene(scene);
        this.uiElementRenderer.setScene(scene);
    }
    // @override
    initializeCanvas(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this.worldSize = new Vec2_1.default(width, height);
        this.ctx = canvas.getContext("2d");
        this.graphicRenderer = new GraphicRenderer_1.default(this.ctx);
        this.tilemapRenderer = new TilemapRenderer_1.default(this.ctx);
        this.uiElementRenderer = new UIElementRenderer_1.default(this.ctx);
        // For crisp pixel art
        this.ctx.imageSmoothingEnabled = false;
        return this.ctx;
    }
    // @override
    render(visibleSet, tilemaps, uiLayers) {
        // Sort by depth, then by visible set by y-value
        visibleSet.sort((a, b) => {
            if (a.getLayer().getDepth() === b.getLayer().getDepth()) {
                return (a.boundary.bottom) - (b.boundary.bottom);
            }
            else {
                return a.getLayer().getDepth() - b.getLayer().getDepth();
            }
        });
        let tilemapIndex = 0;
        let tilemapLength = tilemaps.length;
        let visibleSetIndex = 0;
        let visibleSetLength = visibleSet.length;
        while (tilemapIndex < tilemapLength || visibleSetIndex < visibleSetLength) {
            // Check conditions where we've already reached the edge of one list
            if (tilemapIndex >= tilemapLength) {
                // Only render the remaining visible set
                let node = visibleSet[visibleSetIndex++];
                if (node.visible) {
                    this.renderNode(node);
                }
                continue;
            }
            if (visibleSetIndex >= visibleSetLength) {
                // Only render tilemaps
                this.renderTilemap(tilemaps[tilemapIndex++]);
                continue;
            }
            // Render whichever is further down
            if (tilemaps[tilemapIndex].getLayer().getDepth() <= visibleSet[visibleSetIndex].getLayer().getDepth()) {
                this.renderTilemap(tilemaps[tilemapIndex++]);
            }
            else {
                let node = visibleSet[visibleSetIndex++];
                if (node.visible) {
                    this.renderNode(node);
                }
            }
        }
        // Render the uiLayers on top of everything else
        let sortedUILayers = new Array();
        uiLayers.forEach(key => sortedUILayers.push(uiLayers.get(key)));
        sortedUILayers = sortedUILayers.sort((ui1, ui2) => ui1.getDepth() - ui2.getDepth());
        sortedUILayers.forEach(uiLayer => {
            if (!uiLayer.isHidden())
                uiLayer.getItems().forEach(node => {
                    if (node.visible) {
                        this.renderNode(node);
                    }
                });
        });
    }
    /**
     * Renders a specified CanvasNode
     * @param node The CanvasNode to render
     */
    renderNode(node) {
        // Calculate the origin of the viewport according to this sprite
        this.origin = this.scene.getViewTranslation(node);
        // Get the zoom level of the scene
        this.zoom = this.scene.getViewScale();
        // Move the canvas to the position of the node and rotate
        let xScale = 1;
        let yScale = 1;
        if (node instanceof Sprite_1.default) {
            xScale = node.invertX ? -1 : 1;
            yScale = node.invertY ? -1 : 1;
        }
        this.ctx.setTransform(xScale, 0, 0, yScale, (node.position.x - this.origin.x) * this.zoom, (node.position.y - this.origin.y) * this.zoom);
        this.ctx.rotate(-node.rotation);
        let globalAlpha = this.ctx.globalAlpha;
        if (node instanceof Rect_1.default) {
            Debug_1.default.log("node" + node.id, "Node" + node.id + " Alpha: " + node.alpha);
        }
        this.ctx.globalAlpha = node.alpha;
        if (node instanceof AnimatedSprite_1.default) {
            this.renderAnimatedSprite(node);
        }
        else if (node instanceof Sprite_1.default) {
            this.renderSprite(node);
        }
        else if (node instanceof Graphic_1.default) {
            this.renderGraphic(node);
        }
        else if (node instanceof UIElement_1.default) {
            this.renderUIElement(node);
        }
        this.ctx.globalAlpha = globalAlpha;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    // @override
    renderSprite(sprite) {
        // Get the image from the resource manager
        let image = this.resourceManager.getImage(sprite.imageId);
        /*
            Coordinates in the space of the image:
                image crop start -> x, y
                image crop size  -> w, h
            Coordinates in the space of the world
                image draw start -> x, y
                image draw size  -> w, h
        */
        this.ctx.drawImage(image, sprite.imageOffset.x, sprite.imageOffset.y, sprite.size.x, sprite.size.y, (-sprite.size.x * sprite.scale.x / 2) * this.zoom, (-sprite.size.y * sprite.scale.y / 2) * this.zoom, sprite.size.x * sprite.scale.x * this.zoom, sprite.size.y * sprite.scale.y * this.zoom);
    }
    // @override
    renderAnimatedSprite(sprite) {
        // Get the image from the resource manager
        let image = this.resourceManager.getImage(sprite.imageId);
        let animationIndex = sprite.animation.getIndexAndAdvanceAnimation();
        let animationOffset = sprite.getAnimationOffset(animationIndex);
        /*
            Coordinates in the space of the image:
                image crop start -> x, y
                image crop size  -> w, h
            Coordinates in the space of the world (given we moved)
                image draw start -> -w/2, -h/2
                image draw size  -> w, h
        */
        this.ctx.drawImage(image, sprite.imageOffset.x + animationOffset.x, sprite.imageOffset.y + animationOffset.y, sprite.size.x, sprite.size.y, (-sprite.size.x * sprite.scale.x / 2) * this.zoom, (-sprite.size.y * sprite.scale.y / 2) * this.zoom, sprite.size.x * sprite.scale.x * this.zoom, sprite.size.y * sprite.scale.y * this.zoom);
    }
    // @override
    renderGraphic(graphic) {
        if (graphic instanceof Point_1.default) {
            this.graphicRenderer.renderPoint(graphic, this.zoom);
        }
        else if (graphic instanceof Line_1.default) {
            this.graphicRenderer.renderLine(graphic, this.origin, this.zoom);
        }
        else if (graphic instanceof Rect_1.default) {
            this.graphicRenderer.renderRect(graphic, this.zoom);
        }
    }
    // @override
    renderTilemap(tilemap) {
        this.tilemapRenderer.renderTilemap(tilemap);
    }
    // @override
    renderUIElement(uiElement) {
        if (uiElement instanceof Label_1.default) {
            this.uiElementRenderer.renderLabel(uiElement);
        }
        else if (uiElement instanceof Button_1.default) {
            this.uiElementRenderer.renderButton(uiElement);
        }
        else if (uiElement instanceof Slider_1.default) {
            this.uiElementRenderer.renderSlider(uiElement);
        }
        else if (uiElement instanceof TextInput_1.default) {
            this.uiElementRenderer.renderTextInput(uiElement);
        }
    }
    clear(clearColor) {
        this.ctx.clearRect(0, 0, this.worldSize.x, this.worldSize.y);
        this.ctx.fillStyle = clearColor.toString();
        this.ctx.fillRect(0, 0, this.worldSize.x, this.worldSize.y);
    }
}
exports.default = CanvasRenderer;

},{"../DataTypes/Vec2":11,"../Debug/Debug":12,"../Nodes/Graphic":28,"../Nodes/Graphics/Line":29,"../Nodes/Graphics/Point":30,"../Nodes/Graphics/Rect":31,"../Nodes/Sprites/AnimatedSprite":32,"../Nodes/Sprites/Sprite":33,"../Nodes/UIElement":34,"../Nodes/UIElements/Button":35,"../Nodes/UIElements/Label":36,"../Nodes/UIElements/Slider":37,"../Nodes/UIElements/TextInput":38,"./CanvasRendering/GraphicRenderer":48,"./CanvasRendering/TilemapRenderer":49,"./CanvasRendering/UIElementRenderer":50,"./RenderingManager":51}],48:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
/**
 * A utility class to help the @reference[CanvasRenderer] render @reference[Graphic]s
 */
class GraphicRenderer {
    constructor(ctx) {
        this.resourceManager = ResourceManager_1.default.getInstance();
        this.ctx = ctx;
    }
    /**
     * Sets the scene of this GraphicRenderer
     * @param scene The current scene
     */
    setScene(scene) {
        this.scene = scene;
    }
    /**
     * Renders a point
     * @param point The point to render
     * @param zoom The zoom level
     */
    renderPoint(point, zoom) {
        this.ctx.fillStyle = point.color.toStringRGBA();
        this.ctx.fillRect((-point.size.x / 2) * zoom, (-point.size.y / 2) * zoom, point.size.x * zoom, point.size.y * zoom);
    }
    renderLine(line, origin, zoom) {
        this.ctx.strokeStyle = line.color.toStringRGBA();
        this.ctx.lineWidth = line.thickness;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo((line.end.x - line.start.x) * zoom, (line.end.y - line.start.y) * zoom);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    /**
     * Renders a rect
     * @param rect The rect to render
     * @param zoom The zoom level
     */
    renderRect(rect, zoom) {
        // Draw the interior of the rect
        if (rect.color.a !== 0) {
            this.ctx.fillStyle = rect.color.toStringRGB();
            this.ctx.fillRect((-rect.size.x / 2) * zoom, (-rect.size.y / 2) * zoom, rect.size.x * zoom, rect.size.y * zoom);
        }
        // Draw the border of the rect if it isn't transparent
        if (rect.borderColor.a !== 0) {
            this.ctx.strokeStyle = rect.getBorderColor().toStringRGB();
            this.ctx.lineWidth = rect.getBorderWidth();
            this.ctx.strokeRect((-rect.size.x / 2) * zoom, (-rect.size.y / 2) * zoom, rect.size.x * zoom, rect.size.y * zoom);
        }
    }
}
exports.default = GraphicRenderer;

},{"../../ResourceManager/ResourceManager":59}],49:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
/**
 * A utility class for the @reference[CanvasRenderer] to render @reference[Tilemap]s
 */
class TilemapRenderer {
    constructor(ctx) {
        this.resourceManager = ResourceManager_1.default.getInstance();
        this.ctx = ctx;
    }
    /**
     * Sets the scene of this TilemapRenderer
     * @param scene The current scene
     */
    setScene(scene) {
        this.scene = scene;
    }
    /**
     * Renders an orthogonal tilemap
     * @param tilemap The tilemap to render
     */
    renderTilemap(tilemap) {
        let previousAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = tilemap.getLayer().getAlpha();
        let origin = this.scene.getViewTranslation(tilemap);
        let size = this.scene.getViewport().getHalfSize();
        let zoom = this.scene.getViewScale();
        let bottomRight = origin.clone().add(size.scaled(2 * zoom));
        if (tilemap.visible) {
            let minColRow = tilemap.getMinColRow(this.scene.getViewport().getView());
            let maxColRow = tilemap.getMaxColRow(this.scene.getViewport().getView());
            for (let row = minColRow.y; row <= maxColRow.y; row++) {
                for (let col = minColRow.x; col <= maxColRow.x; col++) {
                    // Get the tile at this position
                    let tile = tilemap.getTile(col, row);
                    // Extract the rot/flip parameters if there are any
                    const mask = (0xE << 28);
                    const rotFlip = ((mask & tile) >> 28) & 0xF;
                    tile = tile & ~mask;
                    // Find the tileset that owns this tile index and render
                    for (let tileset of tilemap.getTilesets()) {
                        if (tileset.hasTile(tile)) {
                            this.renderTile(tilemap, tileset, tile, col, row, origin, tilemap.scale, zoom, rotFlip);
                        }
                    }
                }
            }
        }
        this.ctx.globalAlpha = previousAlpha;
    }
    /**
     * Renders a tile
     * @param tileset The tileset this tile belongs to
     * @param tileIndex The index of the tile
     * @param tilemapRow The row of the tile in the tilemap
     * @param tilemapCol The column of the tile in the tilemap
     * @param origin The origin of the viewport
     * @param scale The scale of the tilemap
     * @param zoom The zoom level of the viewport
     */
    renderTile(tilemap, tileset, tileIndex, tilemapCol, tilemapRow, origin, scale, zoom, rotFlip) {
        let image = this.resourceManager.getImage(tileset.getImageKey());
        // Get the size of the tile to render
        let tileSize = tileset.getTileSize();
        let width = tileSize.x;
        let height = tileSize.y;
        // Calculate the position to start a crop in the tileset image
        let imagePosition = tileset.getImageOffsetForTile(tileIndex);
        let left = imagePosition.x;
        let top = imagePosition.y;
        // Calculate the position in the world to render the tile
        let worldPosition = tilemap.getWorldPosition(tilemapCol, tilemapRow);
        let worldX = Math.floor((worldPosition.x - origin.x) * zoom);
        let worldY = Math.floor((worldPosition.y - origin.y) * zoom);
        // Calculate the size of the world to render the tile in
        let worldWidth = Math.ceil(width * scale.x * zoom);
        let worldHeight = Math.ceil(height * scale.y * zoom);
        if (rotFlip !== 0) {
            let scaleX = 1;
            let scaleY = 1;
            let shearX = 0;
            let shearY = 0;
            // Flip on the x-axis
            if (rotFlip & 8) {
                scaleX = -1;
            }
            // Flip on the y-axis
            if (rotFlip & 4) {
                scaleY = -1;
            }
            // Flip over the line y=x
            if (rotFlip & 2) {
                shearX = scaleY;
                shearY = scaleX;
                scaleX = 0;
                scaleY = 0;
            }
            this.ctx.setTransform(scaleX, shearX, shearY, scaleY, worldX + worldWidth / 2, worldY + worldHeight / 2);
            // Render the tile
            this.ctx.drawImage(image, left, top, width, height, -worldWidth / 2, -worldHeight / 2, worldWidth, worldHeight);
            if (rotFlip !== 0) {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        else {
            // No rotations, don't do the calculations, just render the tile
            // Render the tile
            this.ctx.drawImage(image, left, top, width, height, worldX, worldY, worldWidth, worldHeight);
        }
    }
    getOrthogonalTileDrawPos(map, set, col, row) {
        let imgsize = set.getTileSize().mult(map.scale);
        let mapsize = map.getScaledTileSize();
        return map.getWorldPosition(col, row).sub(imgsize.sub(mapsize));
    }
    getIsometricTileDrawPos(map, set, col, row) {
        let size = set.getTileSize();
        let drawPos = map.getScaledTileSize().sub(new Vec2_1.default(size.x * map.scale.x, size.y * map.scale.y));
        drawPos.inc(-size.x * map.scale.x / 2, 0);
        drawPos.add(map.getWorldPosition(col, row));
        return drawPos;
    }
}
exports.default = TilemapRenderer;

},{"../../DataTypes/Vec2":11,"../../ResourceManager/ResourceManager":59}],50:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
const MathUtils_1 = __importDefault(require("../../Utils/MathUtils"));
/**
 * A utility class to help the @reference[CanvasRenderer] render @reference[UIElement]s
 */
class UIElementRenderer {
    constructor(ctx) {
        this.resourceManager = ResourceManager_1.default.getInstance();
        this.ctx = ctx;
    }
    /**
     * Sets the scene of this UIElementRenderer
     * @param scene The current scene
     */
    setScene(scene) {
        this.scene = scene;
    }
    /**
     * Renders a label
     * @param label The label to render
     */
    renderLabel(label) {
        // If the size is unassigned (by the user or automatically) assign it
        label.handleInitialSizing(this.ctx);
        // Grab the global alpha so we can adjust it for this render
        let previousAlpha = this.ctx.globalAlpha;
        // Get the font and text position in label
        this.ctx.font = label.getFontString();
        let offset = label.calculateTextOffset(this.ctx);
        // Stroke and fill a rounded rect and give it text
        this.ctx.globalAlpha = label.backgroundColor.a;
        this.ctx.fillStyle = label.calculateBackgroundColor().toStringRGBA();
        this.ctx.fillRoundedRect(-label.size.x / 2, -label.size.y / 2, label.size.x, label.size.y, label.borderRadius);
        this.ctx.strokeStyle = label.calculateBorderColor().toStringRGBA();
        this.ctx.globalAlpha = label.borderColor.a;
        this.ctx.lineWidth = label.borderWidth;
        this.ctx.strokeRoundedRect(-label.size.x / 2, -label.size.y / 2, label.size.x, label.size.y, label.borderRadius);
        this.ctx.fillStyle = label.calculateTextColor();
        this.ctx.globalAlpha = label.textColor.a;
        this.ctx.fillText(label.text, offset.x - label.size.x / 2, offset.y - label.size.y / 2);
        this.ctx.globalAlpha = previousAlpha;
    }
    /**
     * Renders a button
     * @param button The button to render
     */
    renderButton(button) {
        this.renderLabel(button);
    }
    /**
     * Renders a slider
     * @param slider The slider to render
     */
    renderSlider(slider) {
        // Grab the global alpha so we can adjust it for this render
        let previousAlpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = slider.getLayer().getAlpha();
        // Calcualate the slider size
        let sliderSize = new Vec2_1.default(slider.size.x, 2);
        // Draw the slider
        this.ctx.fillStyle = slider.sliderColor.toString();
        this.ctx.fillRoundedRect(-sliderSize.x / 2, -sliderSize.y / 2, sliderSize.x, sliderSize.y, slider.borderRadius);
        // Calculate the nib size and position
        let x = MathUtils_1.default.lerp(-slider.size.x / 2, slider.size.x / 2, slider.getValue());
        // Draw the nib
        this.ctx.fillStyle = slider.nibColor.toString();
        this.ctx.fillRoundedRect(x - slider.nibSize.x / 2, -slider.nibSize.y / 2, slider.nibSize.x, slider.nibSize.y, slider.borderRadius);
        // Reset the alpha
        this.ctx.globalAlpha = previousAlpha;
    }
    /**
     * Renders a textInput
     * @param textInput The textInput to render
     */
    renderTextInput(textInput) {
        // Show a cursor sometimes
        if (textInput.focused && textInput.cursorCounter % 60 > 30) {
            textInput.text += "|";
        }
        this.renderLabel(textInput);
        if (textInput.focused) {
            if (textInput.cursorCounter % 60 > 30) {
                textInput.text = textInput.text.substring(0, textInput.text.length - 1);
            }
            textInput.cursorCounter += 1;
            if (textInput.cursorCounter >= 60) {
                textInput.cursorCounter = 0;
            }
        }
    }
}
exports.default = UIElementRenderer;

},{"../../DataTypes/Vec2":11,"../../ResourceManager/ResourceManager":59,"../../Utils/MathUtils":68}],51:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceManager_1 = __importDefault(require("../ResourceManager/ResourceManager"));
/**
 * An abstract framework to put all rendering in once place in the application
 */
class RenderingManager {
    constructor() {
        this.resourceManager = ResourceManager_1.default.getInstance();
    }
    /**
     * Sets the scene currently being rendered
     * @param scene The current Scene
     */
    setScene(scene) {
        this.scene = scene;
    }
}
exports.default = RenderingManager;

},{"../ResourceManager/ResourceManager":59}],52:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const Graphic_1 = __importDefault(require("../Nodes/Graphic"));
const Point_1 = __importDefault(require("../Nodes/Graphics/Point"));
const Rect_1 = __importDefault(require("../Nodes/Graphics/Rect"));
const AnimatedSprite_1 = __importDefault(require("../Nodes/Sprites/AnimatedSprite"));
const Sprite_1 = __importDefault(require("../Nodes/Sprites/Sprite"));
const UIElement_1 = __importDefault(require("../Nodes/UIElement"));
const Label_1 = __importDefault(require("../Nodes/UIElements/Label"));
const ShaderRegistry_1 = __importDefault(require("../Registry/Registries/ShaderRegistry"));
const RegistryManager_1 = __importDefault(require("../Registry/RegistryManager"));
const ResourceManager_1 = __importDefault(require("../ResourceManager/ResourceManager"));
const ParallaxLayer_1 = __importDefault(require("../Scene/Layers/ParallaxLayer"));
const RenderingManager_1 = __importDefault(require("./RenderingManager"));
class WebGLRenderer extends RenderingManager_1.default {
    initializeCanvas(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        this.worldSize = Vec2_1.default.ZERO;
        this.worldSize.x = width;
        this.worldSize.y = height;
        // Get the WebGL context
        this.gl = canvas.getContext("webgl");
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.CULL_FACE);
        // Tell the resource manager we're using WebGL
        ResourceManager_1.default.getInstance().useWebGL(true, this.gl);
        // Show the text canvas and get its context
        let textCanvas = document.getElementById("text-canvas");
        textCanvas.hidden = false;
        this.textCtx = textCanvas.getContext("2d");
        // Size the text canvas to be the same as the game canvas
        textCanvas.height = height;
        textCanvas.width = width;
        return this.gl;
    }
    render(visibleSet, tilemaps, uiLayers) {
        for (let node of visibleSet) {
            this.renderNode(node);
        }
        uiLayers.forEach(key => {
            if (!uiLayers.get(key).isHidden())
                uiLayers.get(key).getItems().forEach(node => this.renderNode(node));
        });
    }
    clear(color) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.textCtx.clearRect(0, 0, this.worldSize.x, this.worldSize.y);
    }
    renderNode(node) {
        // Calculate the origin of the viewport according to this sprite
        this.origin = this.scene.getViewTranslation(node);
        // Get the zoom level of the scene
        this.zoom = this.scene.getViewScale();
        if (node.hasCustomShader) {
            // If the node has a custom shader, render using that
            this.renderCustom(node);
        }
        else if (node instanceof Graphic_1.default) {
            this.renderGraphic(node);
        }
        else if (node instanceof Sprite_1.default) {
            if (node instanceof AnimatedSprite_1.default) {
                this.renderAnimatedSprite(node);
            }
            else {
                this.renderSprite(node);
            }
        }
        else if (node instanceof UIElement_1.default) {
            this.renderUIElement(node);
        }
    }
    renderSprite(sprite) {
        let shader = RegistryManager_1.default.shaders.get(ShaderRegistry_1.default.SPRITE_SHADER);
        let options = this.addOptions(shader.getOptions(sprite), sprite);
        shader.render(this.gl, options);
    }
    renderAnimatedSprite(sprite) {
        let shader = RegistryManager_1.default.shaders.get(ShaderRegistry_1.default.SPRITE_SHADER);
        let options = this.addOptions(shader.getOptions(sprite), sprite);
        shader.render(this.gl, options);
    }
    renderGraphic(graphic) {
        if (graphic instanceof Point_1.default) {
            let shader = RegistryManager_1.default.shaders.get(ShaderRegistry_1.default.POINT_SHADER);
            let options = this.addOptions(shader.getOptions(graphic), graphic);
            shader.render(this.gl, options);
        }
        else if (graphic instanceof Rect_1.default) {
            let shader = RegistryManager_1.default.shaders.get(ShaderRegistry_1.default.RECT_SHADER);
            let options = this.addOptions(shader.getOptions(graphic), graphic);
            shader.render(this.gl, options);
        }
    }
    renderTilemap(tilemap) {
        throw new Error("Method not implemented.");
    }
    renderUIElement(uiElement) {
        if (uiElement instanceof Label_1.default) {
            let shader = RegistryManager_1.default.shaders.get(ShaderRegistry_1.default.LABEL_SHADER);
            let options = this.addOptions(shader.getOptions(uiElement), uiElement);
            shader.render(this.gl, options);
            this.textCtx.setTransform(1, 0, 0, 1, (uiElement.position.x - this.origin.x) * this.zoom, (uiElement.position.y - this.origin.y) * this.zoom);
            this.textCtx.rotate(-uiElement.rotation);
            let globalAlpha = this.textCtx.globalAlpha;
            this.textCtx.globalAlpha = uiElement.alpha;
            // Render text
            this.textCtx.font = uiElement.getFontString();
            let offset = uiElement.calculateTextOffset(this.textCtx);
            this.textCtx.fillStyle = uiElement.calculateTextColor();
            this.textCtx.globalAlpha = uiElement.textColor.a;
            this.textCtx.fillText(uiElement.text, offset.x - uiElement.size.x / 2, offset.y - uiElement.size.y / 2);
            this.textCtx.globalAlpha = globalAlpha;
            this.textCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    renderCustom(node) {
        let shader = RegistryManager_1.default.shaders.get(node.customShaderKey);
        let options = this.addOptions(shader.getOptions(node), node);
        shader.render(this.gl, options);
    }
    addOptions(options, node) {
        // Give the shader access to the world size
        options.worldSize = this.worldSize;
        // Adjust the origin position to the parallax
        let layer = node.getLayer();
        let parallax = new Vec2_1.default(1, 1);
        if (layer instanceof ParallaxLayer_1.default) {
            parallax = layer.parallax;
        }
        options.origin = this.origin.clone().mult(parallax);
        return options;
    }
}
exports.default = WebGLRenderer;

},{"../DataTypes/Vec2":11,"../Nodes/Graphic":28,"../Nodes/Graphics/Point":30,"../Nodes/Graphics/Rect":31,"../Nodes/Sprites/AnimatedSprite":32,"../Nodes/Sprites/Sprite":33,"../Nodes/UIElement":34,"../Nodes/UIElements/Label":36,"../Registry/Registries/ShaderRegistry":41,"../Registry/RegistryManager":42,"../ResourceManager/ResourceManager":59,"../Scene/Layers/ParallaxLayer":61,"./RenderingManager":51}],53:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceManager_1 = __importDefault(require("../../ResourceManager/ResourceManager"));
/**
 * A wrapper class for WebGL shaders.
 * This class is a singleton, and there is only one for each shader type.
 * All objects that use this shader type will refer to and modify this same type.
 */
class ShaderType {
    constructor(programKey) {
        this.programKey = programKey;
        this.resourceManager = ResourceManager_1.default.getInstance();
    }
    /**
     * Extracts the options from the CanvasNode and gives them to the render function
     * @param node The node to get options from
     * @returns An object containing the options that should be passed to the render function
     */
    getOptions(node) { return {}; }
}
exports.default = ShaderType;

},{"../../ResourceManager/ResourceManager":59}],54:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mat4x4_1 = __importDefault(require("../../../DataTypes/Mat4x4"));
const Vec2_1 = __importDefault(require("../../../DataTypes/Vec2"));
const ResourceManager_1 = __importDefault(require("../../../ResourceManager/ResourceManager"));
const QuadShaderType_1 = __importDefault(require("./QuadShaderType"));
/** */
class LabelShaderType extends QuadShaderType_1.default {
    constructor(programKey) {
        super(programKey);
        this.resourceManager = ResourceManager_1.default.getInstance();
    }
    initBufferObject() {
        this.bufferObjectKey = "label";
        this.resourceManager.createBuffer(this.bufferObjectKey);
    }
    render(gl, options) {
        const backgroundColor = options.backgroundColor.toWebGL();
        const borderColor = options.borderColor.toWebGL();
        const program = this.resourceManager.getShaderProgram(this.programKey);
        const buffer = this.resourceManager.getBuffer(this.bufferObjectKey);
        gl.useProgram(program);
        const vertexData = this.getVertices(options.size.x, options.size.y);
        const FSIZE = vertexData.BYTES_PER_ELEMENT;
        // Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        // Attributes
        const a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 2 * FSIZE, 0 * FSIZE);
        gl.enableVertexAttribArray(a_Position);
        // Uniforms
        const u_BackgroundColor = gl.getUniformLocation(program, "u_BackgroundColor");
        gl.uniform4fv(u_BackgroundColor, backgroundColor);
        const u_BorderColor = gl.getUniformLocation(program, "u_BorderColor");
        gl.uniform4fv(u_BorderColor, borderColor);
        const u_MaxSize = gl.getUniformLocation(program, "u_MaxSize");
        gl.uniform2f(u_MaxSize, -vertexData[0], vertexData[1]);
        // Get transformation matrix
        // We want a square for our rendering space, so get the maximum dimension of our quad
        let maxDimension = Math.max(options.size.x, options.size.y);
        const u_BorderWidth = gl.getUniformLocation(program, "u_BorderWidth");
        gl.uniform1f(u_BorderWidth, options.borderWidth / maxDimension);
        const u_BorderRadius = gl.getUniformLocation(program, "u_BorderRadius");
        gl.uniform1f(u_BorderRadius, options.borderRadius / maxDimension);
        // The size of the rendering space will be a square with this maximum dimension
        let size = new Vec2_1.default(maxDimension, maxDimension).scale(2 / options.worldSize.x, 2 / options.worldSize.y);
        // Center our translations around (0, 0)
        const translateX = (options.position.x - options.origin.x - options.worldSize.x / 2) / maxDimension;
        const translateY = -(options.position.y - options.origin.y - options.worldSize.y / 2) / maxDimension;
        // Create our transformation matrix
        this.translation.translate(new Float32Array([translateX, translateY]));
        this.scale.scale(size);
        this.rotation.rotate(options.rotation);
        let transformation = Mat4x4_1.default.MULT(this.translation, this.scale, this.rotation);
        // Pass the translation matrix to our shader
        const u_Transform = gl.getUniformLocation(program, "u_Transform");
        gl.uniformMatrix4fv(u_Transform, false, transformation.toArray());
        // Draw the quad
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    /**
     * The rendering space always has to be a square, so make sure its square w.r.t to the largest dimension
     * @param w The width of the quad in pixels
     * @param h The height of the quad in pixels
     * @returns An array of the vertices of the quad
     */
    getVertices(w, h) {
        let x, y;
        if (h > w) {
            y = 0.5;
            x = w / (2 * h);
        }
        else {
            x = 0.5;
            y = h / (2 * w);
        }
        return new Float32Array([
            -x, y,
            -x, -y,
            x, y,
            x, -y
        ]);
    }
    getOptions(rect) {
        let options = {
            position: rect.position,
            backgroundColor: rect.calculateBackgroundColor(),
            borderColor: rect.calculateBorderColor(),
            borderWidth: rect.borderWidth,
            borderRadius: rect.borderRadius,
            size: rect.size,
            rotation: rect.rotation
        };
        return options;
    }
}
exports.default = LabelShaderType;

},{"../../../DataTypes/Mat4x4":5,"../../../DataTypes/Vec2":11,"../../../ResourceManager/ResourceManager":59,"./QuadShaderType":56}],55:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RenderingUtils_1 = __importDefault(require("../../../Utils/RenderingUtils"));
const ShaderType_1 = __importDefault(require("../ShaderType"));
class PointShaderType extends ShaderType_1.default {
    constructor(programKey) {
        super(programKey);
    }
    initBufferObject() {
        this.bufferObjectKey = "point";
        this.resourceManager.createBuffer(this.bufferObjectKey);
    }
    render(gl, options) {
        let position = RenderingUtils_1.default.toWebGLCoords(options.position, options.origin, options.worldSize);
        let color = RenderingUtils_1.default.toWebGLColor(options.color);
        const program = this.resourceManager.getShaderProgram(this.programKey);
        const buffer = this.resourceManager.getBuffer(this.bufferObjectKey);
        gl.useProgram(program);
        const vertexData = position;
        const FSIZE = vertexData.BYTES_PER_ELEMENT;
        // Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        // Attributes
        const a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 2 * FSIZE, 0 * FSIZE);
        gl.enableVertexAttribArray(a_Position);
        // Uniforms
        const u_Color = gl.getUniformLocation(program, "u_Color");
        gl.uniform4fv(u_Color, color);
        const u_PointSize = gl.getUniformLocation(program, "u_PointSize");
        gl.uniform1f(u_PointSize, options.pointSize);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
    getOptions(point) {
        let options = {
            position: point.position,
            color: point.color,
            pointSize: point.size,
        };
        return options;
    }
}
exports.default = PointShaderType;

},{"../../../Utils/RenderingUtils":69,"../ShaderType":53}],56:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mat4x4_1 = __importDefault(require("../../../DataTypes/Mat4x4"));
const ShaderType_1 = __importDefault(require("../ShaderType"));
/** Represents any WebGL objects that have a quad mesh (i.e. a rectangular game object composed of only two triangles) */
class QuadShaderType extends ShaderType_1.default {
    constructor(programKey) {
        super(programKey);
        this.scale = Mat4x4_1.default.IDENTITY;
        this.rotation = Mat4x4_1.default.IDENTITY;
        this.translation = Mat4x4_1.default.IDENTITY;
    }
}
exports.default = QuadShaderType;

},{"../../../DataTypes/Mat4x4":5,"../ShaderType":53}],57:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mat4x4_1 = __importDefault(require("../../../DataTypes/Mat4x4"));
const Vec2_1 = __importDefault(require("../../../DataTypes/Vec2"));
const ResourceManager_1 = __importDefault(require("../../../ResourceManager/ResourceManager"));
const QuadShaderType_1 = __importDefault(require("./QuadShaderType"));
/** */
class RectShaderType extends QuadShaderType_1.default {
    constructor(programKey) {
        super(programKey);
        this.resourceManager = ResourceManager_1.default.getInstance();
    }
    initBufferObject() {
        this.bufferObjectKey = "rect";
        this.resourceManager.createBuffer(this.bufferObjectKey);
    }
    render(gl, options) {
        const color = options.color.toWebGL();
        const program = this.resourceManager.getShaderProgram(this.programKey);
        const buffer = this.resourceManager.getBuffer(this.bufferObjectKey);
        gl.useProgram(program);
        const vertexData = this.getVertices(options.size.x, options.size.y);
        const FSIZE = vertexData.BYTES_PER_ELEMENT;
        // Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        // Attributes
        const a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 2 * FSIZE, 0 * FSIZE);
        gl.enableVertexAttribArray(a_Position);
        // Uniforms
        const u_Color = gl.getUniformLocation(program, "u_Color");
        gl.uniform4fv(u_Color, color);
        // Get transformation matrix
        // We want a square for our rendering space, so get the maximum dimension of our quad
        let maxDimension = Math.max(options.size.x, options.size.y);
        // The size of the rendering space will be a square with this maximum dimension
        let size = new Vec2_1.default(maxDimension, maxDimension).scale(2 / options.worldSize.x, 2 / options.worldSize.y);
        // Center our translations around (0, 0)
        const translateX = (options.position.x - options.origin.x - options.worldSize.x / 2) / maxDimension;
        const translateY = -(options.position.y - options.origin.y - options.worldSize.y / 2) / maxDimension;
        // Create our transformation matrix
        this.translation.translate(new Float32Array([translateX, translateY]));
        this.scale.scale(size);
        this.rotation.rotate(options.rotation);
        let transformation = Mat4x4_1.default.MULT(this.translation, this.scale, this.rotation);
        // Pass the translation matrix to our shader
        const u_Transform = gl.getUniformLocation(program, "u_Transform");
        gl.uniformMatrix4fv(u_Transform, false, transformation.toArray());
        // Draw the quad
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    /*
        So as it turns out, WebGL has an issue with non-square quads.
        It doesn't like when you don't have a 1-1 scale, and rotations are entirely messed up if this is not the case.
        To solve this, I used the scale of the LARGEST dimension of the quad to make a square, then adjusted the vertex coordinates inside of that.
        A diagram of the solution follows.

        There is a bounding square for the quad with dimensions hxh (in this case, since height is the largest dimension).
        The offset in the vertical direction is therefore 0.5, as it is normally.
        However, the offset in the horizontal direction is not so straightforward, but isn't conceptually hard.
        All we really have to do is a range change from [0, height/2] to [0, 0.5], where our value is t = width/2, and 0 <= t <= height/2.

        So now we have our rect, in a space scaled with respect to the largest dimension.
        Rotations work as you would expect, even for long rectangles.

                    0.5
            __ __ __ __ __ __ __
            |	|88888888888|	|
            |	|88888888888|	|
            |	|88888888888|	|
        -0.5|_ _|88888888888|_ _|0.5
            |	|88888888888|	|
            |	|88888888888|	|
            |	|88888888888|	|
            |___|88888888888|___|
                    -0.5

        The getVertices function below does as described, and converts the range
    */
    /**
     * The rendering space always has to be a square, so make sure its square w.r.t to the largest dimension
     * @param w The width of the quad in pixels
     * @param h The height of the quad in pixels
     * @returns An array of the vertices of the quad
     */
    getVertices(w, h) {
        let x, y;
        if (h > w) {
            y = 0.5;
            x = w / (2 * h);
        }
        else {
            x = 0.5;
            y = h / (2 * w);
        }
        return new Float32Array([
            -x, y,
            -x, -y,
            x, y,
            x, -y
        ]);
    }
    getOptions(rect) {
        let options = {
            position: rect.position,
            color: rect.color,
            size: rect.size,
            rotation: rect.rotation
        };
        return options;
    }
}
exports.default = RectShaderType;

},{"../../../DataTypes/Mat4x4":5,"../../../DataTypes/Vec2":11,"../../../ResourceManager/ResourceManager":59,"./QuadShaderType":56}],58:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mat4x4_1 = __importDefault(require("../../../DataTypes/Mat4x4"));
const Vec2_1 = __importDefault(require("../../../DataTypes/Vec2"));
const AnimatedSprite_1 = __importDefault(require("../../../Nodes/Sprites/AnimatedSprite"));
const ResourceManager_1 = __importDefault(require("../../../ResourceManager/ResourceManager"));
const QuadShaderType_1 = __importDefault(require("./QuadShaderType"));
/** A shader for sprites and animated sprites */
class SpriteShaderType extends QuadShaderType_1.default {
    constructor(programKey) {
        super(programKey);
        this.resourceManager = ResourceManager_1.default.getInstance();
    }
    initBufferObject() {
        this.bufferObjectKey = "sprite";
        this.resourceManager.createBuffer(this.bufferObjectKey);
    }
    render(gl, options) {
        const program = this.resourceManager.getShaderProgram(this.programKey);
        const buffer = this.resourceManager.getBuffer(this.bufferObjectKey);
        const texture = this.resourceManager.getTexture(options.imageKey);
        gl.useProgram(program);
        const vertexData = this.getVertices(options.size.x, options.size.y, options.scale);
        const FSIZE = vertexData.BYTES_PER_ELEMENT;
        // Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        // Attributes
        const a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * FSIZE, 0 * FSIZE);
        gl.enableVertexAttribArray(a_Position);
        const a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 4 * FSIZE, 2 * FSIZE);
        gl.enableVertexAttribArray(a_TexCoord);
        // Uniforms
        // Get transformation matrix
        // We want a square for our rendering space, so get the maximum dimension of our quad
        let maxDimension = Math.max(options.size.x, options.size.y);
        // The size of the rendering space will be a square with this maximum dimension
        let size = new Vec2_1.default(maxDimension, maxDimension).scale(2 / options.worldSize.x, 2 / options.worldSize.y);
        // Center our translations around (0, 0)
        const translateX = (options.position.x - options.origin.x - options.worldSize.x / 2) / maxDimension;
        const translateY = -(options.position.y - options.origin.y - options.worldSize.y / 2) / maxDimension;
        // Create our transformation matrix
        this.translation.translate(new Float32Array([translateX, translateY]));
        this.scale.scale(size);
        this.rotation.rotate(options.rotation);
        let transformation = Mat4x4_1.default.MULT(this.translation, this.scale, this.rotation);
        // Pass the translation matrix to our shader
        const u_Transform = gl.getUniformLocation(program, "u_Transform");
        gl.uniformMatrix4fv(u_Transform, false, transformation.toArray());
        // Set up our sampler with our assigned texture unit
        const u_Sampler = gl.getUniformLocation(program, "u_Sampler");
        gl.uniform1i(u_Sampler, texture);
        // Pass in texShift
        const u_texShift = gl.getUniformLocation(program, "u_texShift");
        gl.uniform2fv(u_texShift, options.texShift);
        // Pass in texScale
        const u_texScale = gl.getUniformLocation(program, "u_texScale");
        gl.uniform2fv(u_texScale, options.texScale);
        // Draw the quad
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    /**
     * The rendering space always has to be a square, so make sure its square w.r.t to the largest dimension
     * @param w The width of the quad in pixels
     * @param h The height of the quad in pixels
     * @returns An array of the vertices of the quad
     */
    getVertices(w, h, scale) {
        let x, y;
        if (h > w) {
            y = 0.5;
            x = w / (2 * h);
        }
        else {
            x = 0.5;
            y = h / (2 * w);
        }
        // Scale the rendering space if needed
        x *= scale[0];
        y *= scale[1];
        return new Float32Array([
            -x, y, 0.0, 0.0,
            -x, -y, 0.0, 1.0,
            x, y, 1.0, 0.0,
            x, -y, 1.0, 1.0
        ]);
    }
    getOptions(sprite) {
        let texShift;
        let texScale;
        if (sprite instanceof AnimatedSprite_1.default) {
            let animationIndex = sprite.animation.getIndexAndAdvanceAnimation();
            let offset = sprite.getAnimationOffset(animationIndex);
            texShift = new Float32Array([offset.x / (sprite.cols * sprite.size.x), offset.y / (sprite.rows * sprite.size.y)]);
            texScale = new Float32Array([1 / (sprite.cols), 1 / (sprite.rows)]);
        }
        else {
            texShift = new Float32Array([0, 0]);
            texScale = new Float32Array([1, 1]);
        }
        let options = {
            position: sprite.position,
            rotation: sprite.rotation,
            size: sprite.size,
            scale: sprite.scale.toArray(),
            imageKey: sprite.imageId,
            texShift,
            texScale
        };
        return options;
    }
}
exports.default = SpriteShaderType;

},{"../../../DataTypes/Mat4x4":5,"../../../DataTypes/Vec2":11,"../../../Nodes/Sprites/AnimatedSprite":32,"../../../ResourceManager/ResourceManager":59,"./QuadShaderType":56}],59:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const Queue_1 = __importDefault(require("../DataTypes/Collections/Queue"));
const StringUtils_1 = __importDefault(require("../Utils/StringUtils"));
const AudioManager_1 = __importDefault(require("../Sound/AudioManager"));
const WebGLProgramType_1 = __importDefault(require("../DataTypes/Rendering/WebGLProgramType"));
/**
 * The resource manager for the game engine.
 * The resource manager interfaces with the loadable assets of a game such as images, data files,
 * and sounds, which are all found in the dist folder.
 * This class controls loading and updates the @reference[Scene] with the loading progress, so that the scene does
 * not start before all necessary assets are loaded.
 */
class ResourceManager {
    constructor() {
        this.loading = false;
        this.justLoaded = false;
        this.loadonly_imagesLoaded = 0;
        this.loadonly_imagesToLoad = 0;
        this.loadonly_imageLoadingQueue = new Queue_1.default();
        this.images = new Map_1.default();
        this.loadonly_spritesheetsLoaded = 0;
        this.loadonly_spritesheetsToLoad = 0;
        this.loadonly_spritesheetLoadingQueue = new Queue_1.default();
        this.spritesheets = new Map_1.default();
        this.loadonly_tilemapsLoaded = 0;
        this.loadonly_tilemapsToLoad = 0;
        this.loadonly_tilemapLoadingQueue = new Queue_1.default();
        this.tilemaps = new Map_1.default();
        this.loadonly_audioLoaded = 0;
        this.loadonly_audioToLoad = 0;
        this.loadonly_audioLoadingQueue = new Queue_1.default();
        this.audioBuffers = new Map_1.default();
        this.loadonly_jsonLoaded = 0;
        this.loadonly_jsonToLoad = 0;
        this.loadonly_jsonLoadingQueue = new Queue_1.default();
        this.jsonObjects = new Map_1.default();
        this.loadonly_gl_ShaderProgramsLoaded = 0;
        this.loadonly_gl_ShaderProgramsToLoad = 0;
        this.loadonly_gl_ShaderLoadingQueue = new Queue_1.default();
        this.gl_ShaderPrograms = new Map_1.default();
        this.gl_Textures = new Map_1.default();
        this.gl_NextTextureID = 0;
        this.gl_Buffers = new Map_1.default();
        this.resourcesToUnload = new Array();
        this.resourcesToKeep = new Array();
    }
    ;
    /* ######################################## SINGLETON ########################################*/
    /**
     * Returns the current instance of this class or a new instance if none exist
     * @returns The resource manager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new ResourceManager();
        }
        return this.instance;
    }
    /* ######################################## PUBLIC FUNCTION ########################################*/
    /**
     * Activates or deactivates the use of WebGL
     * @param flag True if WebGL should be used, false otherwise
     * @param gl The instance of the graphics context, if applicable
     */
    useWebGL(flag, gl) {
        this.gl_WebGLActive = flag;
        if (this.gl_WebGLActive) {
            this.gl = gl;
        }
    }
    /**
     * Loads an image from file
     * @param key The key to associate the loaded image with
     * @param path The path to the image to load
     */
    image(key, path) {
        this.loadonly_imageLoadingQueue.enqueue({ key: key, path: path });
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepImage(key) {
        this.keepResource(key, ResourceType.IMAGE);
    }
    /**
     * Retrieves a loaded image
     * @param key The key of the loaded image
     * @returns The image element associated with this key
     */
    getImage(key) {
        let image = this.images.get(key);
        if (image === undefined) {
            throw `There is no image associated with key "${key}"`;
        }
        return image;
    }
    /**
     * Loads a spritesheet from file
     * @param key The key to associate the loaded spritesheet with
     * @param path The path to the spritesheet to load
     */
    spritesheet(key, path) {
        this.loadonly_spritesheetLoadingQueue.enqueue({ key: key, path: path });
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepSpritesheet(key) {
        this.keepResource(key, ResourceType.SPRITESHEET);
    }
    /**
     * Retrieves a loaded spritesheet
     * @param key The key of the spritesheet to load
     * @returns The loaded Spritesheet
     */
    getSpritesheet(key) {
        return this.spritesheets.get(key);
    }
    /**
     * Loads an audio file
     * @param key The key to associate with the loaded audio file
     * @param path The path to the audio file to load
     */
    audio(key, path) {
        this.loadonly_audioLoadingQueue.enqueue({ key: key, path: path });
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepAudio(key) {
        this.keepResource(key, ResourceType.AUDIO);
    }
    /**
     * Retrieves a loaded audio file
     * @param key The key of the audio file to load
     * @returns The AudioBuffer created from the loaded audio fle
     */
    getAudio(key) {
        return this.audioBuffers.get(key);
    }
    /**
     * Load a tilemap from a json file. Automatically loads related images
     * @param key The key to associate with the loaded tilemap
     * @param path The path to the tilemap to load
     */
    tilemap(key, path) {
        this.loadonly_tilemapLoadingQueue.enqueue({ key: key, path: path });
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepTilemap(key) {
        this.keepResource(key, ResourceType.TILEMAP);
    }
    /**
     * Retreives a loaded tilemap
     * @param key The key of the loaded tilemap
     * @returns The tilemap data associated with the key
     */
    getTilemap(key) {
        return this.tilemaps.get(key);
    }
    /**
     * Loads an object from a json file.
     * @param key The key to associate with the loaded object
     * @param path The path to the json file to load
     */
    object(key, path) {
        this.loadonly_jsonLoadingQueue.enqueue({ key: key, path: path });
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepObject(key) {
        this.keepResource(key, ResourceType.JSON);
    }
    /**
     * Retreives a loaded object
     * @param key The key of the loaded object
     * @returns The object data associated with the key
     */
    getObject(key) {
        return this.jsonObjects.get(key);
    }
    /* ######################################## LOAD FUNCTION ########################################*/
    /**
     * Loads all resources currently in the queue
     * @param callback The function to cal when the resources are finished loading
     */
    loadResourcesFromQueue(callback) {
        this.loadonly_typesToLoad = 5;
        this.loading = true;
        // Load everything in the queues. Tilemaps have to come before images because they will add new images to the queue
        this.loadTilemapsFromQueue(() => {
            console.log("Loaded Tilemaps");
            this.loadSpritesheetsFromQueue(() => {
                console.log("Loaded Spritesheets");
                this.loadImagesFromQueue(() => {
                    console.log("Loaded Images");
                    this.loadAudioFromQueue(() => {
                        console.log("Loaded Audio");
                        this.loadObjectsFromQueue(() => {
                            console.log("Loaded Objects");
                            if (this.gl_WebGLActive) {
                                this.gl_LoadShadersFromQueue(() => {
                                    console.log("Loaded Shaders");
                                    this.finishLoading(callback);
                                });
                            }
                            else {
                                this.finishLoading(callback);
                            }
                        });
                    });
                });
            });
        });
    }
    finishLoading(callback) {
        // Done loading
        this.loading = false;
        this.justLoaded = true;
        callback();
    }
    /* ######################################## UNLOAD FUNCTION ########################################*/
    keepResource(key, type) {
        console.log("Keep resource...");
        for (let i = 0; i < this.resourcesToUnload.length; i++) {
            let resource = this.resourcesToUnload[i];
            if (resource.key === key && resource.resourceType === type) {
                console.log("Found resource " + key + " of type " + type + ". Keeping.");
                let resourceToMove = this.resourcesToUnload.splice(i, 1);
                this.resourcesToKeep.push(...resourceToMove);
                return;
            }
        }
    }
    /**
     * Deletes references to all resources in the resource manager
     */
    unloadAllResources() {
        this.loading = false;
        this.justLoaded = false;
        for (let resource of this.resourcesToUnload) {
            // Unload the resource
            this.unloadResource(resource);
        }
    }
    unloadResource(resource) {
        // Delete the resource itself
        switch (resource.resourceType) {
            case ResourceType.IMAGE:
                this.images.delete(resource.key);
                if (this.gl_WebGLActive) {
                    this.gl_Textures.delete(resource.key);
                }
                break;
            case ResourceType.TILEMAP:
                this.tilemaps.delete(resource.key);
                break;
            case ResourceType.SPRITESHEET:
                this.spritesheets.delete(resource.key);
                break;
            case ResourceType.AUDIO:
                this.audioBuffers.delete(resource.key);
                break;
            case ResourceType.JSON:
                this.jsonObjects.delete(resource.key);
                break;
            /*case ResourceType.SHADER:
                this.gl_ShaderPrograms.get(resource.key).delete(this.gl);
                this.gl_ShaderPrograms.delete(resource.key);
                break;*/
        }
        // Delete any dependencies
        for (let dependency of resource.dependencies) {
            this.unloadResource(dependency);
        }
    }
    /* ######################################## WORK FUNCTIONS ########################################*/
    /**
     * Loads all tilemaps currently in the tilemap loading queue
     * @param onFinishLoading The function to call when loading is complete
     */
    loadTilemapsFromQueue(onFinishLoading) {
        this.loadonly_tilemapsToLoad = this.loadonly_tilemapLoadingQueue.getSize();
        this.loadonly_tilemapsLoaded = 0;
        // If no items to load, we're finished
        if (this.loadonly_tilemapsToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_tilemapLoadingQueue.hasItems()) {
            let tilemap = this.loadonly_tilemapLoadingQueue.dequeue();
            this.loadTilemap(tilemap.key, tilemap.path, onFinishLoading);
        }
    }
    /**
     * Loads a singular tilemap
     * @param key The key of the tilemap
     * @param pathToTilemapJSON The path to the tilemap JSON file
     * @param callbackIfLast The function to call if this is the last tilemap to load
     */
    loadTilemap(key, pathToTilemapJSON, callbackIfLast) {
        this.loadTextFile(pathToTilemapJSON, (fileText) => {
            let tilemapObject = JSON.parse(fileText);
            // We can parse the object later - it's much faster than loading
            this.tilemaps.add(key, tilemapObject);
            let resource = new ResourceReference(key, ResourceType.TILEMAP);
            // Grab the tileset images we need to load and add them to the imageloading queue
            for (let tileset of tilemapObject.tilesets) {
                if (tileset.image) {
                    let key = tileset.image;
                    let path = StringUtils_1.default.getPathFromFilePath(pathToTilemapJSON) + key;
                    this.loadonly_imageLoadingQueue.enqueue({ key: key, path: path, isDependency: true });
                    // Add this image as a dependency to the tilemap
                    resource.addDependency(new ResourceReference(key, ResourceType.IMAGE));
                }
                else if (tileset.tiles) {
                    for (let tile of tileset.tiles) {
                        let key = tile.image;
                        let path = StringUtils_1.default.getPathFromFilePath(pathToTilemapJSON) + key;
                        this.loadonly_imageLoadingQueue.enqueue({ key: key, path: path, isDependency: true });
                        // Add this image as a dependency to the tilemap
                        resource.addDependency(new ResourceReference(key, ResourceType.IMAGE));
                    }
                }
            }
            // Add the resource reference to the list of resource to unload
            this.resourcesToUnload.push(resource);
            // Finish loading
            this.finishLoadingTilemap(callbackIfLast);
        });
    }
    /**
     * Finish loading a tilemap. Calls the callback function if this is the last tilemap being loaded
     * @param callback The function to call if this is the last tilemap to load
     */
    finishLoadingTilemap(callback) {
        this.loadonly_tilemapsLoaded += 1;
        if (this.loadonly_tilemapsLoaded === this.loadonly_tilemapsToLoad) {
            // We're done loading tilemaps
            callback();
        }
    }
    /**
     * Loads all spritesheets currently in the spritesheet loading queue
     * @param onFinishLoading The function to call when the spritesheets are done loading
     */
    loadSpritesheetsFromQueue(onFinishLoading) {
        this.loadonly_spritesheetsToLoad = this.loadonly_spritesheetLoadingQueue.getSize();
        this.loadonly_spritesheetsLoaded = 0;
        // If no items to load, we're finished
        if (this.loadonly_spritesheetsToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_spritesheetLoadingQueue.hasItems()) {
            let spritesheet = this.loadonly_spritesheetLoadingQueue.dequeue();
            this.loadSpritesheet(spritesheet.key, spritesheet.path, onFinishLoading);
        }
    }
    /**
     * Loads a singular spritesheet
     * @param key The key of the spritesheet to load
     * @param pathToSpritesheetJSON The path to the spritesheet JSON file
     * @param callbackIfLast The function to call if this is the last spritesheet
     */
    loadSpritesheet(key, pathToSpritesheetJSON, callbackIfLast) {
        this.loadTextFile(pathToSpritesheetJSON, (fileText) => {
            let spritesheet = JSON.parse(fileText);
            // We can parse the object later - it's much faster than loading
            this.spritesheets.add(key, spritesheet);
            let resource = new ResourceReference(key, ResourceType.SPRITESHEET);
            // Grab the image we need to load and add it to the imageloading queue
            let path = StringUtils_1.default.getPathFromFilePath(pathToSpritesheetJSON) + spritesheet.spriteSheetImage;
            this.loadonly_imageLoadingQueue.enqueue({ key: spritesheet.name, path: path, isDependency: true });
            resource.addDependency(new ResourceReference(spritesheet.name, ResourceType.IMAGE));
            this.resourcesToUnload.push(resource);
            // Finish loading
            this.finishLoadingSpritesheet(callbackIfLast);
        });
    }
    /**
     * Finish loading a spritesheet. Calls the callback function if this is the last spritesheet being loaded
     * @param callback The function to call if this is the last spritesheet to load
     */
    finishLoadingSpritesheet(callback) {
        this.loadonly_spritesheetsLoaded += 1;
        if (this.loadonly_spritesheetsLoaded === this.loadonly_spritesheetsToLoad) {
            // We're done loading spritesheets
            callback();
        }
    }
    /**
     * Loads all images currently in the image loading queue
     * @param onFinishLoading The function to call when there are no more images to load
     */
    loadImagesFromQueue(onFinishLoading) {
        this.loadonly_imagesToLoad = this.loadonly_imageLoadingQueue.getSize();
        this.loadonly_imagesLoaded = 0;
        // If no items to load, we're finished
        if (this.loadonly_imagesToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_imageLoadingQueue.hasItems()) {
            let image = this.loadonly_imageLoadingQueue.dequeue();
            this.loadImage(image.key, image.path, image.isDependency, onFinishLoading);
        }
    }
    /**
     * Loads a singular image
     * @param key The key of the image to load
     * @param path The path to the image to load
     * @param callbackIfLast The function to call if this is the last image
     */
    loadImage(key, path, isDependency, callbackIfLast) {
        var image = new Image();
        image.onload = () => {
            // Add to loaded images
            this.images.add(key, image);
            // If not a dependency, push it to the unload list. Otherwise it's managed by something else
            if (!isDependency) {
                this.resourcesToUnload.push(new ResourceReference(key, ResourceType.IMAGE));
            }
            // If WebGL is active, create a texture
            if (this.gl_WebGLActive) {
                this.createWebGLTexture(key, image);
            }
            // Finish image load
            this.finishLoadingImage(callbackIfLast);
        };
        image.src = path;
    }
    /**
     * Finish loading an image. If this is the last image, it calls the callback function
     * @param callback The function to call if this is the last image
     */
    finishLoadingImage(callback) {
        this.loadonly_imagesLoaded += 1;
        if (this.loadonly_imagesLoaded === this.loadonly_imagesToLoad) {
            // We're done loading images
            callback();
        }
    }
    /**
     * Loads all audio currently in the tilemap loading queue
     * @param onFinishLoading The function to call when tilemaps are done loading
     */
    loadAudioFromQueue(onFinishLoading) {
        this.loadonly_audioToLoad = this.loadonly_audioLoadingQueue.getSize();
        this.loadonly_audioLoaded = 0;
        // If no items to load, we're finished
        if (this.loadonly_audioToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_audioLoadingQueue.hasItems()) {
            let audio = this.loadonly_audioLoadingQueue.dequeue();
            this.loadAudio(audio.key, audio.path, onFinishLoading);
        }
    }
    /**
     * Load a singular audio file
     * @param key The key to the audio file to load
     * @param path The path to the audio file to load
     * @param callbackIfLast The function to call if this is the last audio file to load
     */
    loadAudio(key, path, callbackIfLast) {
        let audioCtx = AudioManager_1.default.getInstance().getAudioContext();
        let request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            audioCtx.decodeAudioData(request.response, (buffer) => {
                // Add to list of audio buffers
                this.audioBuffers.add(key, buffer);
                this.resourcesToUnload.push(new ResourceReference(key, ResourceType.AUDIO));
                // Finish loading sound
                this.finishLoadingAudio(callbackIfLast);
            }, (error) => {
                throw "Error loading sound";
            });
        };
        request.send();
    }
    /**
     * Finish loading an audio file. Calls the callback functon if this is the last audio sample being loaded.
     * @param callback The function to call if this is the last audio file to load
     */
    finishLoadingAudio(callback) {
        this.loadonly_audioLoaded += 1;
        if (this.loadonly_audioLoaded === this.loadonly_audioToLoad) {
            // We're done loading audio
            callback();
        }
    }
    /**
     * Loads all objects currently in the object loading queue
     * @param onFinishLoading The function to call when there are no more objects to load
     */
    loadObjectsFromQueue(onFinishLoading) {
        this.loadonly_jsonToLoad = this.loadonly_jsonLoadingQueue.getSize();
        this.loadonly_jsonLoaded = 0;
        // If no items to load, we're finished
        if (this.loadonly_jsonToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_jsonLoadingQueue.hasItems()) {
            let obj = this.loadonly_jsonLoadingQueue.dequeue();
            this.loadObject(obj.key, obj.path, onFinishLoading);
        }
    }
    /**
     * Loads a singular object
     * @param key The key of the object to load
     * @param path The path to the object to load
     * @param callbackIfLast The function to call if this is the last object
     */
    loadObject(key, path, callbackIfLast) {
        this.loadTextFile(path, (fileText) => {
            let obj = JSON.parse(fileText);
            this.jsonObjects.add(key, obj);
            this.resourcesToUnload.push(new ResourceReference(key, ResourceType.JSON));
            this.finishLoadingObject(callbackIfLast);
        });
    }
    /**
     * Finish loading an object. If this is the last object, it calls the callback function
     * @param callback The function to call if this is the last object
     */
    finishLoadingObject(callback) {
        this.loadonly_jsonLoaded += 1;
        if (this.loadonly_jsonLoaded === this.loadonly_jsonToLoad) {
            // We're done loading objects
            callback();
        }
    }
    /* ########## WEBGL SPECIFIC FUNCTIONS ########## */
    getTexture(key) {
        return this.gl_Textures.get(key);
    }
    getShaderProgram(key) {
        return this.gl_ShaderPrograms.get(key).program;
    }
    getBuffer(key) {
        return this.gl_Buffers.get(key);
    }
    createWebGLTexture(imageKey, image) {
        // Get the texture ID
        const textureID = this.getTextureID(this.gl_NextTextureID);
        // Create the texture
        const texture = this.gl.createTexture();
        // Set up the texture
        // Enable texture0
        this.gl.activeTexture(textureID);
        // Bind our texture to texture 0
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        // Set the texture parameters
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        // Set the texture image
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        // Add the texture to our map with the same key as the image
        this.gl_Textures.add(imageKey, this.gl_NextTextureID);
        // Increment the key
        this.gl_NextTextureID += 1;
    }
    getTextureID(id) {
        // Start with 9 cases - this can be expanded if needed, but for the best performance,
        // Textures should be stitched into an atlas
        switch (id) {
            case 0: return this.gl.TEXTURE0;
            case 1: return this.gl.TEXTURE1;
            case 2: return this.gl.TEXTURE2;
            case 3: return this.gl.TEXTURE3;
            case 4: return this.gl.TEXTURE4;
            case 5: return this.gl.TEXTURE5;
            case 6: return this.gl.TEXTURE6;
            case 7: return this.gl.TEXTURE7;
            case 8: return this.gl.TEXTURE8;
            default: return this.gl.TEXTURE9;
        }
    }
    createBuffer(key) {
        if (this.gl_WebGLActive) {
            let buffer = this.gl.createBuffer();
            this.gl_Buffers.add(key, buffer);
        }
    }
    /**
     * Enqueues loading of a new shader program
     * @param key The key of the shader program
     * @param vShaderFilepath
     * @param fShaderFilepath
     */
    shader(key, vShaderFilepath, fShaderFilepath) {
        let splitPath = vShaderFilepath.split(".");
        let end = splitPath[splitPath.length - 1];
        if (end !== "vshader") {
            throw `${vShaderFilepath} is not a valid vertex shader - must end in ".vshader`;
        }
        splitPath = fShaderFilepath.split(".");
        end = splitPath[splitPath.length - 1];
        if (end !== "fshader") {
            throw `${fShaderFilepath} is not a valid vertex shader - must end in ".fshader`;
        }
        let paths = new KeyPath_Shader();
        paths.key = key;
        paths.vpath = vShaderFilepath;
        paths.fpath = fShaderFilepath;
        this.loadonly_gl_ShaderLoadingQueue.enqueue(paths);
    }
    /**
     * Tells the resource manager to keep this resource
     * @param key The key of the resource
     */
    keepShader(key) {
        this.keepResource(key, ResourceType.IMAGE);
    }
    gl_LoadShadersFromQueue(onFinishLoading) {
        this.loadonly_gl_ShaderProgramsToLoad = this.loadonly_gl_ShaderLoadingQueue.getSize();
        this.loadonly_gl_ShaderProgramsLoaded = 0;
        // If webGL isn'active or there are no items to load, we're finished
        if (!this.gl_WebGLActive || this.loadonly_gl_ShaderProgramsToLoad === 0) {
            onFinishLoading();
            return;
        }
        while (this.loadonly_gl_ShaderLoadingQueue.hasItems()) {
            let shader = this.loadonly_gl_ShaderLoadingQueue.dequeue();
            this.gl_LoadShader(shader.key, shader.vpath, shader.fpath, onFinishLoading);
        }
    }
    gl_LoadShader(key, vpath, fpath, callbackIfLast) {
        this.loadTextFile(vpath, (vFileText) => {
            const vShader = vFileText;
            this.loadTextFile(fpath, (fFileText) => {
                const fShader = fFileText;
                // Extract the program and shaders
                const [shaderProgram, vertexShader, fragmentShader] = this.createShaderProgram(vShader, fShader);
                // Create a wrapper type
                const programWrapper = new WebGLProgramType_1.default();
                programWrapper.program = shaderProgram;
                programWrapper.vertexShader = vertexShader;
                programWrapper.fragmentShader = fragmentShader;
                // Add to our map
                this.gl_ShaderPrograms.add(key, programWrapper);
                this.resourcesToUnload.push(new ResourceReference(key, ResourceType.SHADER));
                // Finish loading
                this.gl_FinishLoadingShader(callbackIfLast);
            });
        });
    }
    gl_FinishLoadingShader(callback) {
        this.loadonly_gl_ShaderProgramsLoaded += 1;
        if (this.loadonly_gl_ShaderProgramsLoaded === this.loadonly_gl_ShaderProgramsToLoad) {
            // We're done loading shaders
            callback();
        }
    }
    createShaderProgram(vShaderSource, fShaderSource) {
        const vertexShader = this.loadVertexShader(vShaderSource);
        const fragmentShader = this.loadFragmentShader(fShaderSource);
        if (vertexShader === null || fragmentShader === null) {
            // We had a problem intializing - error
            return null;
        }
        // Create a shader program
        const program = this.gl.createProgram();
        if (!program) {
            // Error creating
            console.warn("Failed to create program");
            return null;
        }
        // Attach our vertex and fragment shader
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        // Link
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            // Error linking
            const error = this.gl.getProgramInfoLog(program);
            console.warn("Failed to link program: " + error);
            // Clean up
            this.gl.deleteProgram(program);
            this.gl.deleteShader(vertexShader);
            this.gl.deleteShader(fragmentShader);
            return null;
        }
        // We successfully create a program
        return [program, vertexShader, fragmentShader];
    }
    loadVertexShader(shaderSource) {
        // Create a new vertex shader
        return this.loadShader(this.gl.VERTEX_SHADER, shaderSource);
    }
    loadFragmentShader(shaderSource) {
        // Create a new fragment shader
        return this.loadShader(this.gl.FRAGMENT_SHADER, shaderSource);
    }
    loadShader(type, shaderSource) {
        const shader = this.gl.createShader(type);
        // If we couldn't create the shader, error
        if (shader === null) {
            console.warn("Unable to create shader");
            return null;
        }
        // Add the source to the shader and compile
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        // Make sure there were no errors during this process
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            // Not compiled - error
            const error = this.gl.getShaderInfoLog(shader);
            console.warn("Failed to compile shader: " + error);
            // Clean up
            this.gl.deleteShader(shader);
            return null;
        }
        // Sucess, so return the shader
        return shader;
    }
    /* ########## GENERAL LOADING FUNCTIONS ########## */
    loadTextFile(textFilePath, callback) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', textFilePath, true);
        xobj.onreadystatechange = function () {
            if ((xobj.readyState == 4) && (xobj.status == 200)) {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    /* ########## LOADING BAR INFO ########## */
    getLoadPercent() {
        return (this.loadonly_tilemapsLoaded / this.loadonly_tilemapsToLoad
            + this.loadonly_spritesheetsLoaded / this.loadonly_spritesheetsToLoad
            + this.loadonly_imagesLoaded / this.loadonly_imagesToLoad
            + this.loadonly_audioLoaded / this.loadonly_audioToLoad)
            / this.loadonly_typesToLoad;
    }
    update(deltaT) {
        if (this.loading) {
            if (this.onLoadProgress) {
                this.onLoadProgress(this.getLoadPercent());
            }
        }
        else if (this.justLoaded) {
            this.justLoaded = false;
            if (this.onLoadComplete) {
                this.onLoadComplete();
            }
        }
    }
}
exports.default = ResourceManager;
/**
 * A class representing a reference to a resource.
 * This is used for the exemption list to assure assets and their dependencies don't get
 * destroyed if they are still needed.
 */
class ResourceReference {
    constructor(key, resourceType) {
        this.key = key;
        this.resourceType = resourceType;
        this.dependencies = new Array();
    }
    addDependency(resource) {
        this.dependencies.push(resource);
    }
}
var ResourceType;
(function (ResourceType) {
    ResourceType["IMAGE"] = "IMAGE";
    ResourceType["TILEMAP"] = "TILEMAP";
    ResourceType["SPRITESHEET"] = "SPRITESHEET";
    ResourceType["AUDIO"] = "AUDIO";
    ResourceType["JSON"] = "JSON";
    ResourceType["SHADER"] = "SHADER";
})(ResourceType || (ResourceType = {}));
/**
 * A pair representing a key and the path of the resource to load
 */
class KeyPathPair {
    constructor() {
        this.isDependency = false;
    }
}
class KeyPath_Shader {
}

},{"../DataTypes/Collections/Map":1,"../DataTypes/Collections/Queue":2,"../DataTypes/Rendering/WebGLProgramType":7,"../Sound/AudioManager":65,"../Utils/StringUtils":70}],60:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __importDefault(require("../Utils/MathUtils"));
/**
 * A layer in the scene. Layers are used for sorting @reference[GameNode]s by depth.
 */
class Layer {
    /**
     * Creates a new layer. To do this in a game, use the addLayer() method in @refrence[Scene]
     * @param scene The scene to add the layer to
     * @param name The name of the layer
     */
    constructor(scene, name) {
        this.scene = scene;
        this.name = name;
        this.paused = false;
        this.hidden = false;
        this.alpha = 1;
        this.items = new Array();
        this.ySort = false;
        this.depth = 0;
    }
    /**
     * Retreives the name of the layer
     * @returns The name of the layer
     */
    getName() {
        return this.name;
    }
    /**
     * Pauses/Unpauses the layer. Affects all elements in this layer
     * @param pauseValue True if the layer should be paused, false if not
     */
    setPaused(pauseValue) {
        this.paused = pauseValue;
    }
    /**
     * Returns whether or not the layer is paused
     */
    isPaused() {
        return this.paused;
    }
    /**
     * Sets the opacity of the layer
     * @param alpha The new opacity value in the range [0, 1]
     */
    setAlpha(alpha) {
        this.alpha = MathUtils_1.default.clamp(alpha, 0, 1);
    }
    /**
     * Gets the opacity of the layer
     * @returns The opacity
     */
    getAlpha() {
        return this.alpha;
    }
    /**
     * Sets the layer's hidden value. If hidden, a layer will not be rendered, but will still update
     * @param hidden The hidden value of the layer
     */
    setHidden(hidden) {
        this.hidden = hidden;
    }
    /**
     * Returns the hideen value of the lyaer
     * @returns True if the scene is hidden, false otherwise
     */
    isHidden() {
        return this.hidden;
    }
    /** Pauses this scene and hides it */
    disable() {
        this.paused = true;
        this.hidden = true;
    }
    /** Unpauses this layer and makes it visible */
    enable() {
        this.paused = false;
        this.hidden = false;
    }
    /**
     * Sets whether or not the scene will ySort automatically.
     * ySorting means that CanvasNodes on this layer will have their depth sorted depending on their y-value.
     * This means that if an object is "higher" in the scene, it will sort behind objects that are "lower".
     * This is useful for 3/4 view games, or similar situations, where you sometimes want to be in front of objects,
     * and other times want to be behind the same objects.
     * @param ySort True if ySorting should be active, false if not
     */
    setYSort(ySort) {
        this.ySort = ySort;
    }
    /**
     * Gets the ySort status of the scene
     * @returns True if ySorting is occurring, false otherwise
     */
    getYSort() {
        return this.ySort;
    }
    /**
     * Sets the depth of the layer compared to other layers. A larger number means the layer will be closer to the screen.
     * @param depth The depth of the layer.
     */
    setDepth(depth) {
        this.depth = depth;
    }
    /**
     * Retrieves the depth of the layer.
     * @returns The depth
     */
    getDepth() {
        return this.depth;
    }
    /**
     * Adds a node to this layer
     * @param node The node to add to this layer.
     */
    addNode(node) {
        this.items.push(node);
        node.setLayer(this);
    }
    /**
     * Removes a node from this layer
     * @param node The node to remove
     * @returns true if the node was removed, false otherwise
     */
    removeNode(node) {
        // Find and remove the node
        let index = this.items.indexOf(node);
        if (index !== -1) {
            this.items.splice(index, 1);
            node.setLayer(undefined);
        }
    }
    /**
     * Retreives all GameNodes from this layer
     * @returns an Array that contains all of the GameNodes in this layer.
     */
    getItems() {
        return this.items;
    }
}
exports.default = Layer;

},{"../Utils/MathUtils":68}],61:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = __importDefault(require("../Layer"));
/**
 * An extension of a Layer that has a parallax value.
 */
class ParallaxLayer extends Layer_1.default {
    /**
     * Creates a new ParallaxLayer.
     * Use addParallaxLayer() in @reference[Scene] to add a layer of this type to your game.
     * @param scene The Scene to add this ParallaxLayer to
     * @param name The name of the ParallaxLayer
     * @param parallax The parallax level
     */
    constructor(scene, name, parallax) {
        super(scene, name);
        this.parallax = parallax;
    }
}
exports.default = ParallaxLayer;

},{"../Layer":60}],62:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../../DataTypes/Vec2"));
const ParallaxLayer_1 = __importDefault(require("./ParallaxLayer"));
/**
 * A Layer strictly to be used for managing UIElements.
 * This is intended to be a Layer that always stays in the same place,
 * and thus renders things like a HUD or an inventory without taking into consideration the \reference[Viewport] scroll.
 */
class UILayer extends ParallaxLayer_1.default {
    /**
     * Creates a new UILayer.
     * Use addUILayer() in @reference[Scene] to add a layer of this type to your game.
     * @param scene The Scene to add this UILayer to
     * @param name The name of the UILayer
     */
    constructor(scene, name) {
        super(scene, name, Vec2_1.default.ZERO);
    }
}
exports.default = UILayer;

},{"../../DataTypes/Vec2":11,"./ParallaxLayer":61}],63:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceManager_1 = __importDefault(require("../ResourceManager/ResourceManager"));
const Receiver_1 = __importDefault(require("../Events/Receiver"));
const GameEventType_1 = require("../Events/GameEventType");
/**
 * The SceneManager acts as an interface to create Scenes, and handles the lifecycle methods of Scenes.
 * It gives Scenes access to information they need from the @reference[Game] class while keeping a layer of separation.
 */
class SceneManager {
    /**
     * Creates a new SceneManager
     * @param viewport The Viewport of the game
     * @param game The Game instance
     * @param renderingManager The RenderingManager of the game
     */
    constructor(viewport, renderingManager) {
        this.resourceManager = ResourceManager_1.default.getInstance();
        this.viewport = viewport;
        this.renderingManager = renderingManager;
        this.idCounter = 0;
        this.pendingScene = null;
        this.receiver = new Receiver_1.default();
        this.receiver.subscribe(GameEventType_1.GameEventType.CHANGE_SCENE);
    }
    /**
     * Add a scene as the main scene.
     * Use this method if you've created a subclass of Scene, and you want to add it as the main Scene.
     * @param constr The constructor of the scene to add
     * @param init An object to pass to the init function of the new scene
     */
    changeToScene(constr, init, options) {
        console.log("Creating the new scene - change is pending until next update");
        this.pendingScene = new constr(this.viewport, this, this.renderingManager, options);
        this.pendingSceneInit = init;
    }
    doSceneChange() {
        console.log("Performing scene change");
        this.viewport.setCenter(this.viewport.getHalfSize().x, this.viewport.getHalfSize().y);
        if (this.currentScene) {
            console.log("Unloading old scene");
            this.currentScene.unloadScene();
            console.log("Destroying old scene");
            this.currentScene.destroy();
        }
        console.log("Unloading old resources...");
        this.resourceManager.unloadAllResources();
        // Make the pending scene the current one
        this.currentScene = this.pendingScene;
        // Make the pending scene null
        this.pendingScene = null;
        // Init the scene
        this.currentScene.initScene(this.pendingSceneInit);
        // Enqueue all scene asset loads
        this.currentScene.loadScene();
        // Load all assets
        console.log("Starting Scene Load");
        this.resourceManager.loadResourcesFromQueue(() => {
            console.log("Starting Scene");
            this.currentScene.startScene();
            this.currentScene.setRunning(true);
        });
        this.renderingManager.setScene(this.currentScene);
    }
    /**
     * Generates a unique ID
     * @returns A new ID
     */
    generateId() {
        return this.idCounter++;
    }
    /**
     * Renders the current Scene
     */
    render() {
        if (this.currentScene) {
            this.currentScene.render();
        }
    }
    /**
     * Updates the current Scene
     * @param deltaT The timestep of the Scene
     */
    update(deltaT) {
        while (this.receiver.hasNextEvent()) {
            let ev = this.receiver.getNextEvent();
            if (ev.type === GameEventType_1.GameEventType.CHANGE_SCENE)
                this.changeToScene(ev.data.get("scene"), ev.data.get("init"));
        }
        if (this.pendingScene !== null) {
            this.doSceneChange();
        }
        if (this.currentScene && this.currentScene.isRunning()) {
            this.currentScene.update(deltaT);
        }
    }
}
exports.default = SceneManager;

},{"../Events/GameEventType":17,"../Events/Receiver":18,"../ResourceManager/ResourceManager":59}],64:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = __importDefault(require("../DataTypes/Vec2"));
const MathUtils_1 = __importDefault(require("../Utils/MathUtils"));
const Queue_1 = __importDefault(require("../DataTypes/Collections/Queue"));
const AABB_1 = __importDefault(require("../DataTypes/Shapes/AABB"));
const Input_1 = __importDefault(require("../Input/Input"));
const ParallaxLayer_1 = __importDefault(require("../Scene/Layers/ParallaxLayer"));
const UILayer_1 = __importDefault(require("../Scene/Layers/UILayer"));
/**
 * The viewport of the game. Corresponds to the visible window displayed in the browser.
 * The viewport keeps track of its position in the game world, and can act as a camera to follow objects.
 */
class Viewport {
    constructor(canvasSize, zoomLevel) {
        /** The amount that is zoomed in or out. */
        this.ZOOM_FACTOR = 1.2;
        let postion = new Vec2_1.default(25, 450);
        this.view = new AABB_1.default(postion);
        this.boundary = new AABB_1.default(Vec2_1.default.ZERO, Vec2_1.default.ZERO);
        this.lastPositions = new Queue_1.default();
        this.smoothingFactor = 10;
        this.scrollZoomEnabled = false;
        this.canvasSize = Vec2_1.default.ZERO;
        this.focus = Vec2_1.default.ZERO;
        // Set the size of the canvas
        this.setCanvasSize(canvasSize);
        // Set the size of the viewport
        this.setSize(canvasSize);
        this.setZoomLevel(zoomLevel);
        // Set the center (and make the viewport stay there)
        this.setCenter(this.view.halfSize.clone());
        this.setFocus(this.view.halfSize.clone());
    }
    /** Enables the viewport to zoom in and out */
    enableZoom() {
        this.scrollZoomEnabled = true;
    }
    /**
     * Returns the position of the viewport
     * @returns The center of the viewport as a Vec2
     */
    getCenter() {
        return this.view.center;
    }
    /**
     * Returns a new Vec2 with the origin of the viewport
     * @returns The top left cornder of the Vieport as a Vec2
     */
    getOrigin() {
        return new Vec2_1.default(this.view.left, this.view.top);
    }
    /**
     * Returns the region visible to this viewport
     * @returns The AABB containing the region visible to the viewport
     */
    getView() {
        return this.view;
    }
    /**
     * Set the position of the viewport
     * @param vecOrX The new position or the x-coordinate of the new position
     * @param y The y-coordinate of the new position
     */
    setCenter(vecOrX, y = null) {
        let pos;
        if (vecOrX instanceof Vec2_1.default) {
            pos = vecOrX;
        }
        else {
            pos = new Vec2_1.default(vecOrX, y);
        }
        this.view.center = pos;
    }
    /**
     * Returns the size of the viewport as a Vec2
     * @returns The half-size of the viewport as a Vec2
     */
    getHalfSize() {
        return this.view.getHalfSize();
    }
    /**
     * Sets the size of the viewport
     * @param vecOrX The new width of the viewport or the new size as a Vec2
     * @param y The new height of the viewport
     */
    setSize(vecOrX, y = null) {
        if (vecOrX instanceof Vec2_1.default) {
            this.view.setHalfSize(vecOrX.scaled(1 / 2));
        }
        else {
            this.view.setHalfSize(new Vec2_1.default(vecOrX / 2, y / 2));
        }
    }
    /**
     * Sets the half-size of the viewport
     * @param vecOrX The new half-width of the viewport or the new half-size as a Vec2
     * @param y The new height of the viewport
     */
    setHalfSize(vecOrX, y = null) {
        if (vecOrX instanceof Vec2_1.default) {
            this.view.setHalfSize(vecOrX.clone());
        }
        else {
            this.view.setHalfSize(new Vec2_1.default(vecOrX, y));
        }
    }
    /**
     * Updates the viewport with the size of the current Canvas
     * @param vecOrX The width of the canvas, or the canvas size as a Vec2
     * @param y The height of the canvas
     */
    setCanvasSize(vecOrX, y = null) {
        if (vecOrX instanceof Vec2_1.default) {
            this.canvasSize = vecOrX.clone();
        }
        else {
            this.canvasSize = new Vec2_1.default(vecOrX, y);
        }
    }
    /**
     * Sets the zoom level of the viewport
     * @param zoom The zoom level
     */
    setZoomLevel(zoom) {
        this.view.halfSize.copy(this.canvasSize.scaled(1 / zoom / 2));
    }
    /**
     * Gets the zoom level of the viewport
     * @returns The zoom level
     */
    getZoomLevel() {
        return this.canvasSize.x / this.view.hw / 2;
    }
    /**
     * Sets the smoothing factor for the viewport movement.
     * @param smoothingFactor The smoothing factor for the viewport
     */
    setSmoothingFactor(smoothingFactor) {
        if (smoothingFactor < 1)
            smoothingFactor = 1;
        this.smoothingFactor = smoothingFactor;
    }
    /**
     * Tells the viewport to focus on a point. Overidden by "following".
     * @param focus The point the  viewport should focus on
     */
    setFocus(focus) {
        this.focus.copy(focus);
    }
    /**
     * Returns true if the CanvasNode is inside of the viewport
     * @param node The node to check
     * @returns True if the node is currently visible in the viewport, false if not
     */
    includes(node) {
        let parallax = node.getLayer() instanceof ParallaxLayer_1.default || node.getLayer() instanceof UILayer_1.default ? node.getLayer().parallax : new Vec2_1.default(1, 1);
        let center = this.view.center.clone();
        this.view.center.mult(parallax);
        let overlaps = this.view.overlaps(node.boundary);
        this.view.center = center;
        return overlaps;
    }
    // TODO: Put some error handling on this for trying to make the bounds too small for the viewport
    // TODO: This should probably be done automatically, or should consider the aspect ratio or something
    /**
     * Sets the bounds of the viewport
     * @param lowerX The left edge of the viewport
     * @param lowerY The top edge of the viewport
     * @param upperX The right edge of the viewport
     * @param upperY The bottom edge of the viewport
     */
    setBounds(lowerX, lowerY, upperX, upperY) {
        let hwidth = (upperX - lowerX) / 2;
        let hheight = (upperY - lowerY) / 2;
        let x = lowerX + hwidth;
        let y = lowerY + hheight;
        this.boundary.center.set(x, y);
        this.boundary.halfSize.set(hwidth, hheight);
    }
    /**
     * Make the viewport follow the specified GameNode
     * @param node The GameNode to follow
     */
    follow(node) {
        this.following = node;
    }
    updateView() {
        if (this.lastPositions.getSize() > this.smoothingFactor) {
            this.lastPositions.dequeue();
        }
        // Get the average of the last 10 positions
        let pos = Vec2_1.default.ZERO;
        this.lastPositions.forEach(position => pos.add(position));
        pos.scale(1 / this.lastPositions.getSize());
        // Set this position either to the object or to its bounds
        pos.x = MathUtils_1.default.clamp(pos.x, this.boundary.left + this.view.hw, this.boundary.right - this.view.hw);
        pos.y = MathUtils_1.default.clamp(pos.y, this.boundary.top + this.view.hh, this.boundary.bottom - this.view.hh);
        // Assure there are no lines in the tilemap
        pos.x = Math.floor(pos.x);
        pos.y = Math.floor(pos.y);
        this.view.center.copy(pos);
    }
    update(deltaT) {
        // If zoom is enabled
        if (this.scrollZoomEnabled) {
            if (Input_1.default.didJustScroll()) {
                let currentSize = this.view.getHalfSize().clone();
                if (Input_1.default.getScrollDirection() < 0) {
                    // Zoom in
                    currentSize.scale(1 / this.ZOOM_FACTOR);
                }
                else {
                    // Zoom out
                    currentSize.scale(this.ZOOM_FACTOR);
                }
                if (currentSize.x > this.boundary.hw) {
                    let factor = this.boundary.hw / currentSize.x;
                    currentSize.x = this.boundary.hw;
                    currentSize.y *= factor;
                }
                if (currentSize.y > this.boundary.hh) {
                    let factor = this.boundary.hh / currentSize.y;
                    currentSize.y = this.boundary.hh;
                    currentSize.x *= factor;
                }
                this.view.setHalfSize(currentSize);
            }
        }
        // If viewport is following an object
        if (this.following) {
            // Update our list of previous positions
            this.lastPositions.enqueue(this.following.position.clone());
        }
        else {
            this.lastPositions.enqueue(this.focus);
        }
        this.updateView();
    }
}
exports.default = Viewport;

},{"../DataTypes/Collections/Queue":2,"../DataTypes/Shapes/AABB":8,"../DataTypes/Vec2":11,"../Input/Input":19,"../Scene/Layers/ParallaxLayer":61,"../Scene/Layers/UILayer":62,"../Utils/MathUtils":68}],65:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_AUDIO_CHANNELS = exports.AudioChannelType = void 0;
const Map_1 = __importDefault(require("../DataTypes/Collections/Map"));
const Receiver_1 = __importDefault(require("../Events/Receiver"));
const ResourceManager_1 = __importDefault(require("../ResourceManager/ResourceManager"));
const GameEventType_1 = require("../Events/GameEventType");
/**
 * Manages any sounds or music needed for the game.
 * Through the EventQueue, exposes interface to play sounds so GameNodes can activate sounds without
 * needing direct references to the audio system
 */
class AudioManager {
    constructor() {
        this.initAudio();
        this.receiver = new Receiver_1.default();
        this.receiver.subscribe([
            GameEventType_1.GameEventType.PLAY_SOUND,
            GameEventType_1.GameEventType.STOP_SOUND,
            GameEventType_1.GameEventType.PLAY_MUSIC,
            GameEventType_1.GameEventType.PLAY_SFX,
            GameEventType_1.GameEventType.MUTE_CHANNEL,
            GameEventType_1.GameEventType.UNMUTE_CHANNEL
        ]);
        this.currentSounds = new Map_1.default();
        this.gainNodes = new Array(exports.MAX_AUDIO_CHANNELS);
        this.initGainNodes();
    }
    /**
     * Get the instance of the AudioManager class or create a new one if none exists
     * @returns The AudioManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new AudioManager();
        }
        return this.instance;
    }
    /**
     * Initializes the webAudio context
     */
    initAudio() {
        try {
            window.AudioContext = window.AudioContext; // || window.webkitAudioContext; 
            this.audioCtx = new AudioContext();
            console.log('Web Audio API successfully loaded');
        }
        catch (e) {
            console.warn('Web Audio API is not supported in this browser');
        }
    }
    initGainNodes() {
        for (let i = 0; i < exports.MAX_AUDIO_CHANNELS; i++) {
            this.gainNodes[i] = this.audioCtx.createGain();
        }
    }
    /**
     * Returns the current audio context
     * @returns The AudioContext
     */
    getAudioContext() {
        return this.audioCtx;
    }
    /*
        According to the MDN, create a new sound for every call:

        An AudioBufferSourceNode can only be played once; after each call to start(), you have to create a new node
        if you want to play the same sound again. Fortunately, these nodes are very inexpensive to create, and the
        actual AudioBuffers can be reused for multiple plays of the sound. Indeed, you can use these nodes in a
        "fire and forget" manner: create the node, call start() to begin playing the sound, and don't even bother to
        hold a reference to it. It will automatically be garbage-collected at an appropriate time, which won't be
        until sometime after the sound has finished playing.
    */
    /**
     * Creates a new sound from the key of a loaded audio file
     * @param key The key of the loaded audio file to create a new sound for
     * @returns The newly created AudioBuffer
     */
    createSound(key, holdReference, channel, options) {
        // Get audio buffer
        let buffer = ResourceManager_1.default.getInstance().getAudio(key);
        // Create a sound source
        var source = this.audioCtx.createBufferSource();
        // Tell the source which sound to play
        source.buffer = buffer;
        // Add any additional nodes
        const nodes = [source];
        // Do any additional nodes here?
        // Of course, there aren't any supported yet...
        // Add the gain node for this channel
        nodes.push(this.gainNodes[channel]);
        // Connect any nodes along the path
        for (let i = 1; i < nodes.length; i++) {
            nodes[i - 1].connect(nodes[i]);
        }
        // Connect the source to the context's destination
        nodes[nodes.length - 1].connect(this.audioCtx.destination);
        return source;
    }
    /**
     * Play the sound specified by the key
     * @param key The key of the sound to play
     * @param loop A boolean for whether or not to loop the sound
     * @param holdReference A boolean for whether or not we want to hold on to a reference of the audio node. This is good for playing music on a loop that will eventually need to be stopped.
     */
    playSound(key, loop, holdReference, channel, options) {
        let sound = this.createSound(key, holdReference, channel, options);
        if (loop) {
            sound.loop = true;
        }
        // Add a reference of the new sound to a map. This will allow us to stop a looping or long sound at a later time
        if (holdReference) {
            this.currentSounds.add(key, sound);
        }
        sound.start();
    }
    /**
     * Stop the sound specified by the key
     */
    stopSound(key) {
        let sound = this.currentSounds.get(key);
        if (sound) {
            sound.stop();
            this.currentSounds.delete(key);
        }
    }
    muteChannel(channel) {
        this.gainNodes[channel].gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
    unmuteChannel(channel) {
        this.gainNodes[channel].gain.setValueAtTime(1, this.audioCtx.currentTime);
    }
    /**
     * Sets the volume of a channel using the GainNode for that channel. For more
     * information on GainNodes, see https://developer.mozilla.org/en-US/docs/Web/API/GainNode
     * @param channel The audio channel to set the volume for
     * @param volume The volume of the channel. 0 is muted. Values below zero will be set to zero.
     */
    static setVolume(channel, volume) {
        if (volume < 0) {
            volume = 0;
        }
        const am = AudioManager.getInstance();
        am.gainNodes[channel].gain.setValueAtTime(volume, am.audioCtx.currentTime);
    }
    /**
     * Returns the GainNode for this channel.
     * Learn more about GainNodes here https://developer.mozilla.org/en-US/docs/Web/API/GainNode
     * DON'T USE THIS UNLESS YOU KNOW WHAT YOU'RE DOING
     * @param channel The channel
     * @returns The GainNode for the specified channel
     */
    getChannelGainNode(channel) {
        return this.gainNodes[channel];
    }
    update(deltaT) {
        // Play each audio clip requested
        // TODO - Add logic to merge sounds if there are multiple of the same key
        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
            if (event.type === GameEventType_1.GameEventType.PLAY_SOUND || event.type === GameEventType_1.GameEventType.PLAY_MUSIC || event.type === GameEventType_1.GameEventType.PLAY_SFX) {
                let soundKey = event.data.get("key");
                let loop = event.data.get("loop");
                let holdReference = event.data.get("holdReference");
                let channel = AudioChannelType.DEFAULT;
                if (event.type === GameEventType_1.GameEventType.PLAY_MUSIC) {
                    channel = AudioChannelType.MUSIC;
                }
                else if (GameEventType_1.GameEventType.PLAY_SFX) {
                    channel = AudioChannelType.SFX;
                }
                else if (event.data.has("channel")) {
                    channel = event.data.get("channel");
                }
                this.playSound(soundKey, loop, holdReference, channel, event.data);
            }
            if (event.type === GameEventType_1.GameEventType.STOP_SOUND) {
                let soundKey = event.data.get("key");
                this.stopSound(soundKey);
            }
            if (event.type === GameEventType_1.GameEventType.MUTE_CHANNEL) {
                this.muteChannel(event.data.get("channel"));
            }
            if (event.type === GameEventType_1.GameEventType.UNMUTE_CHANNEL) {
                this.unmuteChannel(event.data.get("channel"));
            }
        }
    }
}
exports.default = AudioManager;
var AudioChannelType;
(function (AudioChannelType) {
    AudioChannelType[AudioChannelType["DEFAULT"] = 0] = "DEFAULT";
    AudioChannelType[AudioChannelType["SFX"] = 1] = "SFX";
    AudioChannelType[AudioChannelType["MUSIC"] = 2] = "MUSIC";
    AudioChannelType[AudioChannelType["CUSTOM_1"] = 3] = "CUSTOM_1";
    AudioChannelType[AudioChannelType["CUSTOM_2"] = 4] = "CUSTOM_2";
    AudioChannelType[AudioChannelType["CUSTOM_3"] = 5] = "CUSTOM_3";
    AudioChannelType[AudioChannelType["CUSTOM_4"] = 6] = "CUSTOM_4";
    AudioChannelType[AudioChannelType["CUSTOM_5"] = 7] = "CUSTOM_5";
    AudioChannelType[AudioChannelType["CUSTOM_6"] = 8] = "CUSTOM_6";
    AudioChannelType[AudioChannelType["CUSTOM_7"] = 9] = "CUSTOM_7";
    AudioChannelType[AudioChannelType["CUSTOM_8"] = 10] = "CUSTOM_8";
    AudioChannelType[AudioChannelType["CUSTOM_9"] = 11] = "CUSTOM_9";
})(AudioChannelType = exports.AudioChannelType || (exports.AudioChannelType = {}));
exports.MAX_AUDIO_CHANNELS = 12;

},{"../DataTypes/Collections/Map":1,"../Events/GameEventType":17,"../Events/Receiver":18,"../ResourceManager/ResourceManager":59}],66:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __importDefault(require("./MathUtils"));
// TODO: This should be moved to the datatypes folder
/**
 * A Color util class that keeps track of colors like a vector, but can be converted into a string format
 */
class Color {
    /**
     * Creates a new color
     * @param r Red
     * @param g Green
     * @param b Blue
     * @param a Alpha
     */
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Transparent color
     * @returns rgba(0, 0, 0, 0)
     */
    static get TRANSPARENT() {
        return new Color(0, 0, 0, 0);
    }
    static get FOG_OF_WAR_TRANSPARENT() {
        return new Color(0, 0, 0, 0.01);
    }
    static get FOG_OF_WAR_BLACK() {
        return new Color(0, 0, 0, 0.99);
    }
    /**
     * Red color
     * @returns rgb(255, 0, 0)
     */
    static get RED() {
        return new Color(255, 0, 0, 1);
    }
    /**
     * Green color
     * @returns rgb(0, 255, 0)
     */
    static get GREEN() {
        return new Color(0, 255, 0, 1);
    }
    /**
     * Blue color
     * @returns rgb(0, 0, 255)
     */
    static get BLUE() {
        return new Color(0, 0, 255, 1);
    }
    /**
     * Yellow color
     * @returns rgb(255, 255, 0)
     */
    static get YELLOW() {
        return new Color(255, 255, 0, 1);
    }
    /**
     * Magenta color
     * @returns rgb(255, 0, 255)
     */
    static get MAGENTA() {
        return new Color(255, 0, 255, 1);
    }
    /**
     * Cyan color
     * @returns rgb(0, 255, 255)
     */
    static get CYAN() {
        return new Color(0, 255, 255, 1);
    }
    /**
     * White color
     * @returns rgb(255, 255, 255)
     */
    static get WHITE() {
        return new Color(255, 255, 255, 1);
    }
    /**
     * Black color
     * @returns rgb(0, 0, 0)
     */
    static get BLACK() {
        return new Color(0, 0, 0, 1);
    }
    /**
     * Orange color
     * @returns rgb(255, 100, 0)
     */
    static get ORANGE() {
        return new Color(255, 100, 0, 1);
    }
    static get PURPLE() {
        return new Color(112, 90, 248, 1);
    }
    /**
     * Sets the color to the values provided
     * @param r Red
     * @param g Green
     * @param b Blue
     * @param a Alpha
     */
    set(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Returns a new color slightly lighter than the current color
     * @returns A new lighter Color
     */
    lighten() {
        return new Color(MathUtils_1.default.clamp(this.r + 40, 0, 255), MathUtils_1.default.clamp(this.g + 40, 0, 255), MathUtils_1.default.clamp(this.b + 40, 0, 255), MathUtils_1.default.clamp(this.a + 10, 0, 255));
    }
    /**
     * Returns a new color slightly darker than the current color
     * @returns A new darker Color
     */
    darken() {
        return new Color(MathUtils_1.default.clamp(this.r - 40, 0, 255), MathUtils_1.default.clamp(this.g - 40, 0, 255), MathUtils_1.default.clamp(this.b - 40, 0, 255), MathUtils_1.default.clamp(this.a + 10, 0, 255));
    }
    /**
     * Returns this color as an array
     * @returns [r, g, b, a]
     */
    toArray() {
        return [this.r, this.g, this.b, this.a];
    }
    isEqual(color) {
        if (color.a == this.a && color.r == this.r && color.g == this.g && color.b == this.b)
            return true;
        else
            false;
    }
    /**
     * Returns the color as a string of the form #RRGGBB
     * @returns #RRGGBB
     */
    toString() {
        return "#" + MathUtils_1.default.toHex(this.r, 2) + MathUtils_1.default.toHex(this.g, 2) + MathUtils_1.default.toHex(this.b, 2);
    }
    /**
     * Returns the color as a string of the form rgb(r, g, b)
     * @returns rgb(r, g, b)
     */
    toStringRGB() {
        return "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + ")";
    }
    /**
     * Returns the color as a string of the form rgba(r, g, b, a)
     * @returns rgba(r, g, b, a)
     */
    toStringRGBA() {
        if (this.a === 0) {
            return this.toStringRGB();
        }
        return "rgba(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + ", " + this.a.toString() + ")";
    }
    /**
     * Turns this color into a float32Array and changes color range to [0.0, 1.0]
     * @returns a Float32Array containing the color
     */
    toWebGL() {
        return new Float32Array([
            this.r / 255,
            this.g / 255,
            this.b / 255,
            this.a
        ]);
    }
    static fromStringHex(str) {
        let i = 0;
        if (str.charAt(0) == "#")
            i += 1;
        let r = MathUtils_1.default.fromHex(str.substring(i, i + 2));
        let g = MathUtils_1.default.fromHex(str.substring(i + 2, i + 4));
        let b = MathUtils_1.default.fromHex(str.substring(i + 4, i + 6));
        return new Color(r, g, b);
    }
}
exports.default = Color;

},{"./MathUtils":68}],67:[function(require,module,exports){
"use strict";
// @ignorePage
Object.defineProperty(exports, "__esModule", { value: true });
exports.EaseFunctionType = void 0;
class EaseFunctions {
    static easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }
    static easeOutInSine(x) {
        return x < 0.5 ? -Math.cos(Math.PI * (x + 0.5)) / 2 : -Math.cos(Math.PI * (x - 0.5)) / 2 + 1;
    }
    static easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
    }
    static easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
    }
    static easeInOutQuint(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    }
    static easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
    static easeOutInQuad(x) {
        return x < 0.5 ? this.easeOutIn_OutPow(x, 2) : this.easeOutIn_InPow(x, 2);
    }
    static easeOutIn_OutPow(x, pow) {
        return 0.5 - Math.pow(-2 * x + 1, pow) / 2;
    }
    static easeOutIn_InPow(x, pow) {
        return 0.5 + Math.pow(2 * x - 1, pow) / 2;
    }
}
exports.default = EaseFunctions;
var EaseFunctionType;
(function (EaseFunctionType) {
    // SINE
    EaseFunctionType["IN_OUT_SINE"] = "easeInOutSine";
    EaseFunctionType["OUT_IN_SINE"] = "easeOutInSine";
    EaseFunctionType["IN_SINE"] = "easeInSine";
    EaseFunctionType["OUT_SINE"] = "easeOutSine";
    // QUAD
    EaseFunctionType["IN_OUT_QUAD"] = "easeInOutQuad";
    EaseFunctionType["OUT_IN_QUAD"] = "easeOutInQuad";
    // QUINT
    EaseFunctionType["IN_OUT_QUINT"] = "easeInOutQuint";
})(EaseFunctionType = exports.EaseFunctionType || (exports.EaseFunctionType = {}));

},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A class containing some utility functions for math operations */
class MathUtils {
    /**
     * Returns the sign of the value provided
     * @param x The value to extract the sign from
     * @returns -1 if the number is less than 0, 1 otherwise
     */
    static sign(x) {
        return x < 0 ? -1 : 1;
    }
    /**
     * Returns whether or not x is between a and b
     * @param a The min bound
     * @param b The max bound
     * @param x The value to check
     * @param exclusive Whether or not a and b are exclusive bounds
     * @returns True if x is between a and b, false otherwise
     */
    static between(a, b, x, exclusive) {
        if (exclusive) {
            return (a < x) && (x < b);
        }
        else {
            return (a <= x) && (x <= b);
        }
    }
    /**
     * Clamps the value x to the range [min, max], rounding up or down if needed
     * @param x The value to be clamped
     * @param min The min of the range
     * @param max The max of the range
     * @returns x, if it is between min and max, or min/max if it exceeds their bounds
     */
    static clamp(x, min, max) {
        if (x < min)
            return min;
        if (x > max)
            return max;
        return x;
    }
    /**
     * Clamps the value x to the range between 0 and 1
     * @param x The value to be clamped
     * @returns x, if it is between 0 and 1, or 0/1 if it exceeds their bounds
     */
    static clamp01(x) {
        return MathUtils.clamp(x, 0, 1);
    }
    /**
     * Clamps the lower end of the value of x to the range to min
     * @param x The value to be clamped
     * @param min The minimum allowed value of x
     * @returns x, if it is greater than min, otherwise min
     */
    static clampLow(x, min) {
        return x < min ? min : x;
    }
    /**
     * Clamps the lower end of the value of x to zero
     * @param x The value to be clamped
     * @returns x, if it is greater than 0, otherwise 0
     */
    static clampLow0(x) {
        return MathUtils.clampLow(x, 0);
    }
    static clampMagnitude(v, m) {
        if (v.magSq() > m * m) {
            return v.scaleTo(m);
        }
        else {
            return v;
        }
    }
    static changeRange(x, min, max, newMin, newMax) {
        return this.lerp(newMin, newMax, this.invLerp(min, max, x));
    }
    /**
     * Linear Interpolation
     * @param a The first value for the interpolation bound
     * @param b The second value for the interpolation bound
     * @param t The time we are interpolating to
     * @returns The value between a and b at time t
     */
    static lerp(a, b, t) {
        return a + t * (b - a);
    }
    /**
     * Inverse Linear Interpolation. Finds the time at which a value between a and b would occur
     * @param a The first value for the interpolation bound
     * @param b The second value for the interpolation bound
     * @param value The current value
     * @returns The time at which the current value occurs between a and b
     */
    static invLerp(a, b, value) {
        return (value - a) / (b - a);
    }
    /**
     * Cuts off decimal points of a number after a specified place
     * @param num The number to floor
     * @param place The last decimal place of the new number
     * @returns The floored number
     */
    static floorToPlace(num, place) {
        if (place === 0) {
            return Math.floor(num);
        }
        let factor = 10;
        while (place > 1) {
            factor != 10;
            place--;
        }
        return Math.floor(num * factor) / factor;
    }
    /**
     * Returns a number from a hex string
     * @param str the string containing the hex number
     * @returns the number in decimal represented by the hex string
     */
    static fromHex(str) {
        return parseInt(str, 16);
    }
    /**
     * Returns the number as a hexadecimal
     * @param num The number to convert to hex
     * @param minLength The length of the returned hex string (adds zero padding if needed)
     * @returns The hex representation of the number as a string
     */
    static toHex(num, minLength = null) {
        let factor = 1;
        while (factor * 16 < num) {
            factor *= 16;
        }
        let hexStr = "";
        while (factor >= 1) {
            let digit = Math.floor(num / factor);
            hexStr += MathUtils.toHexDigit(digit);
            num -= digit * factor;
            factor /= 16;
        }
        if (minLength !== null) {
            while (hexStr.length < minLength) {
                hexStr = "0" + hexStr;
            }
        }
        return hexStr;
    }
    /**
     * Converts a digit to hexadecimal. In this case, a digit is between 0 and 15 inclusive
     * @param num The digit to convert to hexadecimal
     * @returns The hex representation of the digit as a string
     */
    static toHexDigit(num) {
        if (num < 10) {
            return "" + num;
        }
        else {
            return String.fromCharCode(65 + num - 10);
        }
    }
}
exports.default = MathUtils;

},{}],69:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = __importDefault(require("./MathUtils"));
class RenderingUtils {
    static toWebGLCoords(point, origin, worldSize) {
        return new Float32Array([
            MathUtils_1.default.changeRange(point.x, origin.x, origin.x + worldSize.x, -1, 1),
            MathUtils_1.default.changeRange(point.y, origin.y, origin.y + worldSize.y, 1, -1)
        ]);
    }
    static toWebGLScale(size, worldSize) {
        return new Float32Array([
            2 * size.x / worldSize.x,
            2 * size.y / worldSize.y,
        ]);
    }
    static toWebGLColor(color) {
        return new Float32Array([
            MathUtils_1.default.changeRange(color.r, 0, 255, 0, 1),
            MathUtils_1.default.changeRange(color.g, 0, 255, 0, 1),
            MathUtils_1.default.changeRange(color.b, 0, 255, 0, 1),
            color.a
        ]);
    }
}
exports.default = RenderingUtils;

},{"./MathUtils":68}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Some utility functions for dealing with strings */
class StringUtils {
    /**
     * Extracts the path from a filepath that includes the file
     * @param filePath the filepath to extract the path from
     * @returns The path portion of the filepath provided
     */
    static getPathFromFilePath(filePath) {
        let splitPath = filePath.split("/");
        splitPath.pop();
        splitPath.push("");
        return splitPath.join("/");
    }
}
exports.default = StringUtils;

},{}],71:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerAnimations = exports.UseItemInput = exports.PlayerInput = void 0;
const Vec2_1 = __importDefault(require("../../../Wolfie2D/DataTypes/Vec2"));
const Input_1 = __importDefault(require("../../../Wolfie2D/Input/Input"));
/**
 * Strings used in the key binding for the player
 */
var PlayerInput;
(function (PlayerInput) {
    PlayerInput["MOVE_UP"] = "MOVE_UP";
    PlayerInput["MOVE_DOWN"] = "MOVE_DOWN";
    PlayerInput["MOVE_LEFT"] = "MOVE_LEFT";
    PlayerInput["MOVE_RIGHT"] = "MOVE_RIGHT";
    PlayerInput["ATTACKING"] = "ATTACKING";
    PlayerInput["SHIELDING"] = "SHIELDING";
    PlayerInput["ULTIMATE"] = "ULTIMATE";
    PlayerInput["PICKUP_ITEM"] = "PICKUP_ITEM";
    PlayerInput["DROP_ITEM"] = "DROP_ITEM";
})(PlayerInput = exports.PlayerInput || (exports.PlayerInput = {}));
var UseItemInput;
(function (UseItemInput) {
    UseItemInput["USE_ITEM1"] = "USE_ITEM1";
    UseItemInput["USE_ITEM2"] = "USE_ITEM2";
    UseItemInput["USE_ITEM3"] = "USE_ITEM3";
    UseItemInput["USE_ITEM4"] = "USE_ITEM4";
    UseItemInput["USE_ITEM5"] = "USE_ITEM5";
})(UseItemInput = exports.UseItemInput || (exports.UseItemInput = {}));
exports.PlayerAnimations = {
    IDLE: "IDLE",
    ATTACKING: "ATTACKING",
    MOVING: "MOVING",
    SHIELDING: "SHIELDING"
};
/**
 * The PlayerController class handles processing the input recieved from the user and exposes
 * a set of methods to make dealing with the user input a bit simpler.
 */
class PlayerController {
    constructor(owner) {
        this.owner = owner;
    }
    /**
     * Gets the direction the player should move based on input from the keyboard.
     * @returns a Vec2 indicating the direction the player should move.
     */
    get moveDir() {
        let dir = Vec2_1.default.ZERO;
        dir.y = (Input_1.default.isPressed(PlayerInput.MOVE_UP) ? -1 : 0) + (Input_1.default.isPressed(PlayerInput.MOVE_DOWN) ? 1 : 0);
        dir.x = (Input_1.default.isPressed(PlayerInput.MOVE_LEFT) ? -1 : 0) + (Input_1.default.isPressed(PlayerInput.MOVE_RIGHT) ? 1 : 0);
        return dir.normalize();
    }
    /**
     * Gets the direction the player should be facing based on the position of the
     * mouse around the player
     * @return a Vec2 representing the direction the player should face.
     */
    get faceDir() { return this.owner.position.dirTo(Input_1.default.getGlobalMousePosition()); }
    /**
     * Gets the rotation of the players sprite based on the direction the player
     * should be facing.
     * @return a number representing how much the player should be rotated
     */
    get rotation() { return Vec2_1.default.UP.angleToCCW(this.faceDir); }
    /**
     * Checks if the player is attempting to use a held item or not.
     * @return true if the player is attempting to use a held item; false otherwise
     */
    get useItem() { return Input_1.default.isMouseJustPressed(); }
    /**
     * Checks if the player is attempting to pick up an item or not.
     * @return true if the player is attempting to pick up an item; false otherwise.
     */
    get pickingUp() { return Input_1.default.isJustPressed(PlayerInput.PICKUP_ITEM); }
    get attacking() { return Input_1.default.isJustPressed(PlayerInput.ATTACKING); }
    get shielding() { return Input_1.default.isJustPressed(PlayerInput.SHIELDING); }
    get ultimate() { return Input_1.default.isJustPressed(PlayerInput.ULTIMATE); }
    /**
     * Checks if the player is attempting to drop their held item or not.
     * @return true if the player is attempting to drop their held item; false otherwise.
     */
    get dropping() { return Input_1.default.isJustPressed(PlayerInput.DROP_ITEM); }
}
exports.default = PlayerController;

},{"../../../Wolfie2D/DataTypes/Vec2":11,"../../../Wolfie2D/Input/Input":19}],72:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./Wolfie2D/Loop/Game"));
const PlayerController_1 = require("./demoGame/AI/Player/PlayerController");
// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main() {
    // Run any tests
    runTests();
    // Set up options for our game
    let options = {
        canvasSize: { x: 1024, y: 1024 },
        clearColor: { r: 0.1, g: 0.1, b: 0.1 },
        inputs: [
            { name: PlayerController_1.PlayerInput.MOVE_UP, keys: ["w"] },
            { name: PlayerController_1.PlayerInput.MOVE_DOWN, keys: ["s"] },
            { name: PlayerController_1.PlayerInput.MOVE_LEFT, keys: ["a"] },
            { name: PlayerController_1.PlayerInput.MOVE_RIGHT, keys: ["d"] },
            { name: PlayerController_1.PlayerInput.PICKUP_ITEM, keys: ["e"] },
            { name: PlayerController_1.PlayerInput.DROP_ITEM, keys: ["q"] },
            { name: PlayerController_1.PlayerInput.ATTACKING, keys: ["j"] },
            { name: PlayerController_1.PlayerInput.SHIELDING, keys: ["k"] },
            { name: PlayerController_1.PlayerInput.ULTIMATE, keys: ["u"] },
            { name: "slot2", keys: ["2"] },
        ],
        // useWebGL: true,   
        useWebGL: false,
        showDebug: false, // Whether to show debug messages. You can change this to true if you want
    };
    // Set up custom registries
    // RegistryManager.shaders.registerAndPreloadItem(
    //     BubbleShaderType.KEY,   // The key of the shader program
    //     BubbleShaderType,           // The constructor of the shader program
    //     BubbleShaderType.VSHADER,   // The path to the vertex shader
    //     BubbleShaderType.FSHADER);  // the path to the fragment shader*/
    // RegistryManager.shaders.registerAndPreloadItem(
    //     LaserShaderType.KEY,
    //     LaserShaderType,
    //     LaserShaderType.VSHADER,
    //     LaserShaderType.FSHADER
    // );
    // Create a game with the options specified
    const game = new Game_1.default(options);
    // Start our game
    // game.start(IntroLevelScene, {});
    // game.start(HelpScene, {});
    // game.start(ControlScene,{});
    // game.start(StartScene, {});
    // game.start(CheatCodeMenuScene,{});
    // game.start(SelectLevelMenuScene,{});
    // game.start(MainMenu, {});
})();
function runTests() { }
;

},{"./Wolfie2D/Loop/Game":23,"./demoGame/AI/Player/PlayerController":71}]},{},[72])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvV29sZmllMkQvRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcC50cyIsInNyYy9Xb2xmaWUyRC9EYXRhVHlwZXMvQ29sbGVjdGlvbnMvUXVldWUudHMiLCJzcmMvV29sZmllMkQvRGF0YVR5cGVzL0Z1bmN0aW9ucy9OdWxsRnVuYy50cyIsInNyYy9Xb2xmaWUyRC9EYXRhVHlwZXMvSW50ZXJmYWNlcy9SZWdpb24udHMiLCJzcmMvV29sZmllMkQvRGF0YVR5cGVzL01hdDR4NC50cyIsInNyYy9Xb2xmaWUyRC9EYXRhVHlwZXMvUGh5c2ljcy9IaXQudHMiLCJzcmMvV29sZmllMkQvRGF0YVR5cGVzL1JlbmRlcmluZy9XZWJHTFByb2dyYW1UeXBlLnRzIiwic3JjL1dvbGZpZTJEL0RhdGFUeXBlcy9TaGFwZXMvQUFCQi50cyIsInNyYy9Xb2xmaWUyRC9EYXRhVHlwZXMvU2hhcGVzL0NpcmNsZS50cyIsInNyYy9Xb2xmaWUyRC9EYXRhVHlwZXMvU2hhcGVzL1NoYXBlLnRzIiwic3JjL1dvbGZpZTJEL0RhdGFUeXBlcy9WZWMyLnRzIiwic3JjL1dvbGZpZTJEL0RlYnVnL0RlYnVnLnRzIiwic3JjL1dvbGZpZTJEL0RlYnVnL1N0YXRzLnRzIiwic3JjL1dvbGZpZTJEL0V2ZW50cy9FbWl0dGVyLnRzIiwic3JjL1dvbGZpZTJEL0V2ZW50cy9FdmVudFF1ZXVlLnRzIiwic3JjL1dvbGZpZTJEL0V2ZW50cy9HYW1lRXZlbnQudHMiLCJzcmMvV29sZmllMkQvRXZlbnRzL0dhbWVFdmVudFR5cGUudHMiLCJzcmMvV29sZmllMkQvRXZlbnRzL1JlY2VpdmVyLnRzIiwic3JjL1dvbGZpZTJEL0lucHV0L0lucHV0LnRzIiwic3JjL1dvbGZpZTJEL0lucHV0L0lucHV0SGFuZGxlci50cyIsInNyYy9Xb2xmaWUyRC9Mb29wL0Vudmlyb25tZW50SW5pdGlhbGl6ZXIudHMiLCJzcmMvV29sZmllMkQvTG9vcC9GaXhlZFVwZGF0ZUdhbWVMb29wLnRzIiwic3JjL1dvbGZpZTJEL0xvb3AvR2FtZS50cyIsInNyYy9Xb2xmaWUyRC9Mb29wL0dhbWVMb29wLnRzIiwic3JjL1dvbGZpZTJEL0xvb3AvR2FtZU9wdGlvbnMudHMiLCJzcmMvV29sZmllMkQvTm9kZXMvQ2FudmFzTm9kZS50cyIsInNyYy9Xb2xmaWUyRC9Ob2Rlcy9HYW1lTm9kZS50cyIsInNyYy9Xb2xmaWUyRC9Ob2Rlcy9HcmFwaGljLnRzIiwic3JjL1dvbGZpZTJEL05vZGVzL0dyYXBoaWNzL0xpbmUudHMiLCJzcmMvV29sZmllMkQvTm9kZXMvR3JhcGhpY3MvUG9pbnQudHMiLCJzcmMvV29sZmllMkQvTm9kZXMvR3JhcGhpY3MvUmVjdC50cyIsInNyYy9Xb2xmaWUyRC9Ob2Rlcy9TcHJpdGVzL0FuaW1hdGVkU3ByaXRlLnRzIiwic3JjL1dvbGZpZTJEL05vZGVzL1Nwcml0ZXMvU3ByaXRlLnRzIiwic3JjL1dvbGZpZTJEL05vZGVzL1VJRWxlbWVudC50cyIsInNyYy9Xb2xmaWUyRC9Ob2Rlcy9VSUVsZW1lbnRzL0J1dHRvbi50cyIsInNyYy9Xb2xmaWUyRC9Ob2Rlcy9VSUVsZW1lbnRzL0xhYmVsLnRzIiwic3JjL1dvbGZpZTJEL05vZGVzL1VJRWxlbWVudHMvU2xpZGVyLnRzIiwic3JjL1dvbGZpZTJEL05vZGVzL1VJRWxlbWVudHMvVGV4dElucHV0LnRzIiwic3JjL1dvbGZpZTJEL1BsYXliYWNrL1BsYXliYWNrTWFuYWdlci50cyIsInNyYy9Xb2xmaWUyRC9SZWdpc3RyeS9SZWdpc3RyaWVzL1JlZ2lzdHJ5LnRzIiwic3JjL1dvbGZpZTJEL1JlZ2lzdHJ5L1JlZ2lzdHJpZXMvU2hhZGVyUmVnaXN0cnkudHMiLCJzcmMvV29sZmllMkQvUmVnaXN0cnkvUmVnaXN0cnlNYW5hZ2VyLnRzIiwic3JjL1dvbGZpZTJEL1JlbmRlcmluZy9BbmltYXRpb25zL0FuaW1hdGlvbk1hbmFnZXIudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL0FuaW1hdGlvbnMvQW5pbWF0aW9uVHlwZXMudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL0FuaW1hdGlvbnMvVHdlZW5Db250cm9sbGVyLnRzIiwic3JjL1dvbGZpZTJEL1JlbmRlcmluZy9BbmltYXRpb25zL1R3ZWVuTWFuYWdlci50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvQ2FudmFzUmVuZGVyZXIudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL0NhbnZhc1JlbmRlcmluZy9HcmFwaGljUmVuZGVyZXIudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL0NhbnZhc1JlbmRlcmluZy9UaWxlbWFwUmVuZGVyZXIudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL0NhbnZhc1JlbmRlcmluZy9VSUVsZW1lbnRSZW5kZXJlci50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvUmVuZGVyaW5nTWFuYWdlci50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvV2ViR0xSZW5kZXJlci50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvV2ViR0xSZW5kZXJpbmcvU2hhZGVyVHlwZS50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvV2ViR0xSZW5kZXJpbmcvU2hhZGVyVHlwZXMvTGFiZWxTaGFkZXJUeXBlLnRzIiwic3JjL1dvbGZpZTJEL1JlbmRlcmluZy9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlcy9Qb2ludFNoYWRlclR5cGUudHMiLCJzcmMvV29sZmllMkQvUmVuZGVyaW5nL1dlYkdMUmVuZGVyaW5nL1NoYWRlclR5cGVzL1F1YWRTaGFkZXJUeXBlLnRzIiwic3JjL1dvbGZpZTJEL1JlbmRlcmluZy9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlcy9SZWN0U2hhZGVyVHlwZS50cyIsInNyYy9Xb2xmaWUyRC9SZW5kZXJpbmcvV2ViR0xSZW5kZXJpbmcvU2hhZGVyVHlwZXMvU3ByaXRlU2hhZGVyVHlwZS50cyIsInNyYy9Xb2xmaWUyRC9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyLnRzIiwic3JjL1dvbGZpZTJEL1NjZW5lL0xheWVyLnRzIiwic3JjL1dvbGZpZTJEL1NjZW5lL0xheWVycy9QYXJhbGxheExheWVyLnRzIiwic3JjL1dvbGZpZTJEL1NjZW5lL0xheWVycy9VSUxheWVyLnRzIiwic3JjL1dvbGZpZTJEL1NjZW5lL1NjZW5lTWFuYWdlci50cyIsInNyYy9Xb2xmaWUyRC9TY2VuZUdyYXBoL1ZpZXdwb3J0LnRzIiwic3JjL1dvbGZpZTJEL1NvdW5kL0F1ZGlvTWFuYWdlci50cyIsInNyYy9Xb2xmaWUyRC9VdGlscy9Db2xvci50cyIsInNyYy9Xb2xmaWUyRC9VdGlscy9FYXNlRnVuY3Rpb25zLnRzIiwic3JjL1dvbGZpZTJEL1V0aWxzL01hdGhVdGlscy50cyIsInNyYy9Xb2xmaWUyRC9VdGlscy9SZW5kZXJpbmdVdGlscy50cyIsInNyYy9Xb2xmaWUyRC9VdGlscy9TdHJpbmdVdGlscy50cyIsInNyYy9kZW1vR2FtZS9BSS9QbGF5ZXIvUGxheWVyQ29udHJvbGxlci50cyIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7R0FFRztBQUNILE1BQXFCLEdBQUc7SUFHdkIsd0JBQXdCO0lBQ3hCO1FBQ0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBUTtRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxHQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFRO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gs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LENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBQ3BFLENBQUM7SUFHRDs7Ozs7O09BTUc7SUFDSCxnQkFBZ0IsQ0FBQyxLQUFXLEVBQUUsS0FBVyxFQUFFLE9BQWM7UUFDckQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFdkIsSUFBSSxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksS0FBSyxHQUFHLE1BQU0sR0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMs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QUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSw4QkFBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7U0FDakM7UUFDRCxxQkFBcUI7UUFDckIsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsS0FBSyxFQUFxQiwwRUFBMEU7S0FDbEgsQ0FBQTtJQUVELDJCQUEyQjtJQUMzQixrREFBa0Q7SUFDbEQsK0RBQStEO0lBQy9ELDJFQUEyRTtJQUMzRSxtRUFBbUU7SUFDbkUsdUVBQXVFO0lBRXZFLGtEQUFrRDtJQUNsRCwyQkFBMkI7SUFDM0IsdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQiw4QkFBOEI7SUFDOUIsS0FBSztJQUNMLDJDQUEyQztJQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixpQkFBaUI7SUFDakIsbUNBQW1DO0lBQ25DLDZCQUE2QjtJQUM3QiwrQkFBK0I7SUFDL0IsOEJBQThCO0lBQzlCLHFDQUFxQztJQUNyQyx1Q0FBdUM7SUFDdkMsNEJBQTRCO0FBQ2hDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxTQUFTLFFBQVEsS0FBSyxDQUFDO0FBQUEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gXCIuLi9JbnRlcmZhY2VzL0NvbGxlY3Rpb25cIjtcblxuLyoqXG4gKiBBc3NvY2lhdGVzIHN0cmluZ3Mgd2l0aCBlbGVtZW50cyBvZiB0eXBlIFRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwPFQ+IGltcGxlbWVudHMgQ29sbGVjdGlvbiB7XG5cdHByaXZhdGUgbWFwOiBSZWNvcmQ8c3RyaW5nLCBUPjtcblxuXHQvKiogQ3JlYXRlcyBhIG5ldyBtYXAgKi9cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLm1hcCA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSB2YWx1ZSBUIHN0b3JlZCBhdCBhIGtleS5cblx0ICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBpdGVtIHRvIGJlIHN0b3JlZFxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGl0ZW0gdG8gYmUgc3RvcmVkXG5cdCAqL1xuXHRhZGQoa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZCB7XG5cdFx0dGhpcy5tYXBba2V5XSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEga2V5LlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIGl0ZW1cblx0ICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGtleSBvciB1bmRlZmluZWRcblx0ICovXG5cdGdldChrZXk6IHN0cmluZyk6IFQge1xuXHRcdHJldHVybiB0aGlzLm1hcFtrZXldO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGFsaWFzIG9mIGFkZC4gU2V0cyB0aGUgdmFsdWUgc3RvcmVkIGF0IGtleSB0byB0aGUgbmV3IHNwZWNpZmllZCB2YWx1ZVxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIGl0ZW0gdG8gYmUgc3RvcmVkXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgaXRlbSB0byBiZSBzdG9yZWRcblx0ICovXG5cdHNldChrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkIHtcblx0XHR0aGlzLmFkZChrZXksIHZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYSB2YWx1ZSBzdG9yZWQgYXQgdGhlIHNwZWNpZmllZCBrZXksIGZhbHNlIG90aGVyd2lzZS5cblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGNoZWNrXG5cdCAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3QgdGhlcmUgaXMgYW4gaXRlbSBhdCB0aGUgZ2l2ZW4ga2V5LlxuXHQgKi9cblx0aGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMubWFwW2tleV0gIT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBvZiB0aGUga2V5cyBpbiB0aGlzIG1hcC5cblx0ICogQHJldHVybnMgQW4gYXJyYXkgY29udGFpbmluZyBhbGwga2V5cyBpbiB0aGUgbWFwLlxuXHQgKi9cblx0a2V5cygpOiBBcnJheTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXApO1xuXHR9XG5cdFxuXHQvLyBAaW1wbGVtZW50ZWRcblx0Zm9yRWFjaChmdW5jOiAoa2V5OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzLm1hcCkuZm9yRWFjaChrZXkgPT4gZnVuYyhrZXkpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWxldGVzIGFuIGl0ZW0gYXNzb2NpYXRlZCB3aXRoIGEga2V5XG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSBhdCB3aGljaCB0byBkZWxldGUgYW4gaXRlbVxuXHQgKi9cblx0ZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG5cdFx0ZGVsZXRlIHRoaXMubWFwW2tleV07XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcblx0Y2xlYXIoKTogdm9pZCB7XG5cdFx0dGhpcy5mb3JFYWNoKGtleSA9PiBkZWxldGUgdGhpcy5tYXBba2V5XSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhpcyBtYXAgdG8gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG5cdCAqIEByZXR1cm5zIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBtYXAuXG5cdCAqL1xuXHR0b1N0cmluZygpOiBzdHJpbmcge1xuXHRcdGxldCBzdHIgPSBcIlwiO1xuXG5cdFx0dGhpcy5mb3JFYWNoKChrZXkpID0+IHN0ciArPSBrZXkgKyBcIiAtPiBcIiArIHRoaXMuZ2V0KGtleSkudG9TdHJpbmcoKSArIFwiXFxuXCIpO1xuXG5cdFx0cmV0dXJuIHN0cjtcblx0fVxufSIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gXCIuLi9JbnRlcmZhY2VzL0NvbGxlY3Rpb25cIjtcblxuLyoqXG4gKiBBIEZJRk8gcXVldWUgd2l0aCBlbGVtZW50cyBvZiB0eXBlIFRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVldWU8VD4gaW1wbGVtZW50cyBDb2xsZWN0aW9uIHtcbiAgICAvKiogVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBRdWV1ZSAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgTUFYX0VMRU1FTlRTOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBxdWV1ZSAqL1xuICAgIHByaXZhdGUgcTogQXJyYXk8VD47XG4gICAgXG4gICAgLyoqIFRoZSBoZWFkIG9mIHRoZSBxdWV1ZSAqL1xuICAgIHByaXZhdGUgaGVhZDogbnVtYmVyO1xuICAgIFxuICAgIC8qKiBUaGUgdGFpbCBvZiB0aGUgcXVldWUgKi9cbiAgICBwcml2YXRlIHRhaWw6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgY3VycmVudCBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIHF1ZXVlICovXG4gICAgcHJpdmF0ZSBzaXplOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IHF1ZXVlXG4gICAgICogQHBhcmFtIG1heEVsZW1lbnRzIFRoZSBtYXhpbXVtIHNpemUgb2YgdGhlIHN0YWNrXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWF4RWxlbWVudHM6IG51bWJlciA9IDEwMCl7XG4gICAgICAgIHRoaXMuTUFYX0VMRU1FTlRTID0gbWF4RWxlbWVudHM7XG4gICAgICAgIHRoaXMucSA9IG5ldyBBcnJheSh0aGlzLk1BWF9FTEVNRU5UUyk7XG4gICAgICAgIHRoaXMuaGVhZCA9IDA7XG4gICAgICAgIHRoaXMudGFpbCA9IDA7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBpdGVtIHRvIHRoZSBiYWNrIG9mIHRoZSBxdWV1ZVxuICAgICAqIEBwYXJhbSBpdGVtIFRoZSBpdGVtIHRvIGFkZCB0byB0aGUgYmFjayBvZiB0aGUgcXVldWVcbiAgICAgKi9cbiAgICBlbnF1ZXVlKGl0ZW06IFQpOiB2b2lke1xuICAgICAgICBpZigodGhpcy50YWlsICsgMSkgJSB0aGlzLk1BWF9FTEVNRU5UUyA9PT0gdGhpcy5oZWFkKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlF1ZXVlIGZ1bGwgLSBjYW5ub3QgYWRkIGVsZW1lbnRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpemUgKz0gMTtcbiAgICAgICAgdGhpcy5xW3RoaXMudGFpbF0gPSBpdGVtO1xuICAgICAgICB0aGlzLnRhaWwgPSAodGhpcy50YWlsICsgMSkgJSB0aGlzLk1BWF9FTEVNRU5UUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW4gaXRlbSBmcm9tIHRoZSBmcm9udCBvZiB0aGUgcXVldWVcbiAgICAgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlXG4gICAgICovXG4gICAgZGVxdWV1ZSgpOiBUIHtcbiAgICAgICAgaWYodGhpcy5oZWFkID09PSB0aGlzLnRhaWwpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUXVldWUgZW1wdHkgLSBjYW5ub3QgcmVtb3ZlIGVsZW1lbnRcIik7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc2l6ZSAtPSAxO1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucVt0aGlzLmhlYWRdO1xuICAgICAgICAvLyBOb3cgZGVsZXRlIHRoZSBpdGVtXG4gICAgICAgIGRlbGV0ZSB0aGlzLnFbdGhpcy5oZWFkXTtcbiAgICAgICAgdGhpcy5oZWFkID0gKHRoaXMuaGVhZCArIDEpICUgdGhpcy5NQVhfRUxFTUVOVFM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpdGVtIGF0IHRoZSBmcm9udCBvZiB0aGUgcXVldWUsIGJ1dCBkb2VzIG5vdCByZW1vdmUgaXRcbiAgICAgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlXG4gICAgICovXG4gICAgcGVla05leHQoKTogVCB7XG4gICAgICAgIGlmKHRoaXMuaGVhZCA9PT0gdGhpcy50YWlsKXtcbiAgICAgICAgICAgIHRocm93IFwiUXVldWUgZW1wdHkgLSBjYW5ub3QgZ2V0IGVsZW1lbnRcIlxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnFbdGhpcy5oZWFkXTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcXVldWUgaGFzIGl0ZW1zIGluIGl0LCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKiBAcmV0dXJucyBBIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoaXMgcXVldWUgaGFzIGl0ZW1zXG4gICAgICovXG4gICAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQgIT09IHRoaXMudGFpbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHF1ZXVlLlxuICAgICAqIEByZXR1cm5zIFRoZSBzaXplIG9mIHRoZSBxdWV1ZVxuICAgICAqL1xuICAgIGdldFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgICB9XG5cbiAgICAvLyBAaW1wbGVtZW50ZWRcbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gZGVsZXRlIHRoaXMucVtpbmRleF0pO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWw7XG4gICAgfVxuXG4gICAgLy8gQGltcGxlbWVudGVkXG4gICAgZm9yRWFjaChmdW5jOiAoaXRlbTogVCwgaW5kZXg/OiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLmhlYWQ7XG4gICAgICAgIHdoaWxlKGkgIT09IHRoaXMudGFpbCl7XG4gICAgICAgICAgICBmdW5jKHRoaXMucVtpXSwgaSk7XG4gICAgICAgICAgICBpID0gKGkgKyAxKSAlIHRoaXMuTUFYX0VMRU1FTlRTO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBxdWV1ZSBpbnRvIGEgc3RyaW5nIGZvcm1hdFxuICAgICAqIEByZXR1cm5zIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGlzIHF1ZXVlXG4gICAgICovXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJldHZhbCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBpdGVtLnRvU3RyaW5nKClcbiAgICAgICAgICAgIGlmKGluZGV4ICE9PSAwKXtcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCIgLT4gXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHZhbCA9IHN0ciArIHJldHZhbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFwiVG9wIC0+IFwiICsgcmV0dmFsO1xuICAgIH1cbn0iLCIvLyBAaWdub3JlUGFnZVxuXG4vKipcbiAqIEEgcGxhY2Vob2xkZXIgZnVuY3Rpb24gZm9yIE5vIE9wZXJhdGlvbi4gRG9lcyBub3RoaW5nXG4gKi9cbmNvbnN0IE51bGxGdW5jID0gKCkgPT4ge307XG5cbmV4cG9ydCBkZWZhdWx0IE51bGxGdW5jOyIsImltcG9ydCBWZWMyIGZyb20gXCIuLi9WZWMyXCI7XG5pbXBvcnQgQUFCQiBmcm9tIFwiLi4vU2hhcGVzL0FBQkJcIjtcblxuLyoqIEFuIG9iamVjdCB0aGF0IGlzIGEgcmVnaW9uLCB3aXRoIGEgc2l6ZSwgc2NhbGUsIGFuZCBib3VuZGFyeS4gKi9cbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBSZWdpb24ge1xuICAgIC8qKiBUaGUgc2l6ZSBvZiB0aGlzIG9iamVjdC4gKi9cbiAgICBzaXplOiBWZWMyO1xuXG4gICAgLyoqIFRoZSBzY2FsZSBvZiB0aGlzIG9iamVjdC4gKi9cbiAgICBzY2FsZTogVmVjMjtcblxuICAgIC8qKiBUaGUgc2l6ZSBvZiB0aGUgb2JqZWN0IHRha2luZyBpbnRvIGFjY291bnQgdGhlIHpvb20gYW5kIHNjYWxlICovXG4gICAgcmVhZG9ubHkgc2l6ZVdpdGhab29tOiBWZWMyO1xuXG4gICAgLyoqIFRoZSBib3VuZGluZyBib3ggb2YgdGhpcyBvYmplY3QuICovXG4gICAgYm91bmRhcnk6IEFBQkI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ2lvbihhcmc6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhcmcgJiYgYXJnLnNpemUgJiYgYXJnLnNjYWxlICYmIGFyZy5ib3VuZGFyeTtcbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi9WZWMyXCI7XG5cbi8qKiBBIDR4NCBtYXRyaXgwICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXQ0eDQge1xuXHRwcml2YXRlIG1hdDogRmxvYXQzMkFycmF5O1xuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy5tYXQgPSBuZXcgRmxvYXQzMkFycmF5KFtcblx0XHRcdDAsIDAsIDAsIDAsXG5cdFx0XHQwLCAwLCAwLCAwLFxuXHRcdFx0MCwgMCwgMCwgMCxcblx0XHRcdDAsIDAsIDAsIDBcblx0XHRdKTtcblx0fVxuXG5cdC8vIFN0YXRpYyBtZW1iZXJzXG5cdHN0YXRpYyBnZXQgSURFTlRJVFkoKTogTWF0NHg0IHtcblx0XHRyZXR1cm4gbmV3IE1hdDR4NCgpLmlkZW50aXR5KCk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IFpFUk8oKTogTWF0NHg0IHtcblx0XHRyZXR1cm4gbmV3IE1hdDR4NCgpLnplcm8oKTtcblx0fVxuXG5cdC8vIEFjY2Vzc29yc1xuXHRzZXQgXzAwKHg6IG51bWJlcikge1xuXHRcdHRoaXMubWF0WzBdID0geDtcblx0fVxuXG5cdHNldChjb2w6IG51bWJlciwgcm93OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiBNYXQ0eDQge1xuXHRcdGlmKGNvbCA8IDAgfHwgY29sID4gMyB8fCByb3cgPCAwIHx8IHJvdyA+IDMpe1xuXHRcdFx0dGhyb3cgYEVycm9yIC0gaW5kZXggKCR7Y29sfSwgJHtyb3d9KSBpcyBvdXQgb2YgYm91bmRzIGZvciBNYXQ0eDRgXG5cdFx0fVxuXHRcdHRoaXMubWF0W3Jvdyo0ICsgY29sXSA9IHZhbHVlO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXQoY29sOiBudW1iZXIsIHJvdzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5tYXRbcm93KjQgKyBjb2xdO1xuXHR9XG5cblx0c2V0QWxsKC4uLml0ZW1zOiBBcnJheTxudW1iZXI+KTogTWF0NHg0IHtcblx0XHR0aGlzLm1hdC5zZXQoaXRlbXMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aWRlbnRpdHkoKTogTWF0NHg0IHtcblx0XHRyZXR1cm4gdGhpcy5zZXRBbGwoXG5cdFx0XHQxLCAwLCAwLCAwLFxuXHRcdFx0MCwgMSwgMCwgMCxcblx0XHRcdDAsIDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cdFx0KVxuXHR9XG5cblx0emVybygpOiBNYXQ0eDQge1xuXHRcdHJldHVybiB0aGlzLnNldEFsbChcblx0XHRcdDAsIDAsIDAsIDAsXG5cdFx0XHQwLCAwLCAwLCAwLFxuXHRcdFx0MCwgMCwgMCwgMCxcblx0XHRcdDAsIDAsIDAsIDBcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIHRoaXMgTWF0NHg0IGEgcm90YXRpb24gbWF0cml4IG9mIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHJhZGlhbnMgY2N3XG5cdCAqIEBwYXJhbSB6UmFkaWFucyBUaGUgbnVtYmVyIG9mIHJhZGlhbnMgdG8gcm90YXRlXG5cdCAqIEByZXR1cm5zIHRoaXMgTWF0NHg0XG5cdCAqL1xuXHRyb3RhdGUoelJhZGlhbnM6IG51bWJlcik6IE1hdDR4NCB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0QWxsKFxuXHRcdFx0TWF0aC5jb3MoelJhZGlhbnMpLCAtTWF0aC5zaW4oelJhZGlhbnMpLCBcdDAsIDAsXG5cdFx0XHRNYXRoLnNpbih6UmFkaWFucyksIE1hdGguY29zKHpSYWRpYW5zKSwgXHQwLCAwLFxuXHRcdFx0MCwgXHRcdFx0XHRcdDAsIFx0XHRcdFx0XHRcdDEsIDAsXG5cdFx0XHQwLCBcdFx0XHRcdFx0MCwgXHRcdFx0XHRcdFx0MCwgMVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogVHVybnMgdGhpcyBNYXQ0eDQgaW50byBhIHRyYW5zbGF0aW9uIG1hdHJpeCBvZiB0aGUgc3BlY2lmaWVkIHRyYW5zbGF0aW9uXG5cdCAqIEBwYXJhbSB0cmFuc2xhdGlvbiBUaGUgdHJhbnNsYXRpb24gaW4geCBhbmQgeVxuXHQgKiBAcmV0dXJucyB0aGlzIE1hdDR4NFxuXHQgKi9cblx0dHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBWZWMyIHwgRmxvYXQzMkFycmF5KTogTWF0NHg0IHtcblx0XHQvLyBJZiB0cmFuc2xhdGlvbiBpcyBhIHZlYywgZ2V0IGl0cyBhcnJheVxuXHRcdGlmKHRyYW5zbGF0aW9uIGluc3RhbmNlb2YgVmVjMil7XG5cdFx0XHR0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uLnRvQXJyYXkoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRBbGwoXG5cdFx0XHQxLCAwLCAwLCB0cmFuc2xhdGlvblswXSxcblx0XHRcdDAsIDEsIDAsIHRyYW5zbGF0aW9uWzFdLFxuXHRcdFx0MCwgMCwgMSwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblx0XHQpO1xuXHR9XG5cblx0c2NhbGUoc2NhbGU6IFZlYzIgfCBGbG9hdDMyQXJyYXkgfCBudW1iZXIpOiBNYXQ0eDQge1xuXHRcdC8vIE1ha2Ugc3VyZSBzY2FsZSBpcyBhIGZsb2F0MzJBcnJheVxuXHRcdGlmKHNjYWxlIGluc3RhbmNlb2YgVmVjMil7XG5cdFx0XHRzY2FsZSA9IHNjYWxlLnRvQXJyYXkoKTtcblx0XHR9IGVsc2UgaWYoIShzY2FsZSBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSkpe1xuXHRcdFx0c2NhbGUgPSBuZXcgRmxvYXQzMkFycmF5KFtzY2FsZSwgc2NhbGVdKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRBbGwoXG5cdFx0XHRzY2FsZVswXSwgMCwgXHRcdDAsIDAsXG5cdFx0XHQwLCBcdFx0ICBzY2FsZVsxXSwgMCwgMCxcblx0XHRcdDAsIFx0XHQgIDAsXHRcdDEsIDAsXG5cdFx0XHQwLCBcdFx0ICAwLFx0XHQwLCAxXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IE1hdDR4NCB0aGF0IHJlcHJlc2VudHMgdGhlIHJpZ2h0IHNpZGUgbXVsdGlwbGljYXRpb24gVEhJUyB4IE9USEVSXG5cdCAqIEBwYXJhbSBvdGhlciBUaGUgb3RoZXIgTWF0NHg0IHRvIG11bHRpcGx5IGJ5XG5cdCAqIEByZXR1cm5zIGEgbmV3IE1hdDR4NCBjb250YWluaW5nIHRoZSBwcm9kdWN0IG9mIHRoZXNlIHR3byBNYXQ0eDRzXG5cdCAqL1xuXHRtdWx0KG90aGVyOiBNYXQ0eDQsIG91dD86IE1hdDR4NCk6IE1hdDR4NCB7XG5cdFx0bGV0IHRlbXAgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG5cdFx0XHRcdGxldCB2YWx1ZSA9IDA7XG5cdFx0XHRcdGZvcihsZXQgayA9IDA7IGsgPCA0OyBrKyspe1xuXHRcdFx0XHRcdHZhbHVlICs9IHRoaXMuZ2V0KGssIGkpICogb3RoZXIuZ2V0KGosIGspO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRlbXBbaio0ICsgaV0gID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYob3V0ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuIG91dC5zZXRBbGwoLi4udGVtcCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBuZXcgTWF0NHg0KCkuc2V0QWxsKC4uLnRlbXApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNdWx0aXBsaWVzIGFsbCBnaXZlbiBtYXRyaWNpZXMgaW4gb3JkZXIuIGUuZy4gTVVMVChBLCBCLCBDKSAtPiBBKkIqQ1xuXHQgKiBAcGFyYW0gbWF0cyBBIGxpc3Qgb2YgTWF0NHg0cyB0byBtdWx0aXBseSBpbiBvcmRlclxuXHQgKiBAcmV0dXJucyBBIG5ldyBNYXQ0eDQgaG9sZGluZyB0aGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBNVUxUKC4uLm1hdHM6IEFycmF5PE1hdDR4ND4pOiBNYXQ0eDQge1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBhcnJheVxuXHRcdGxldCB0ZW1wID0gTWF0NHg0LklERU5USVRZO1xuXG5cdFx0Ly8gTXVsdGlwbHkgYnkgZXZlcnkgYXJyYXkgaW4gb3JkZXIsIGluIHBsYWNlXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1hdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGVtcC5tdWx0KG1hdHNbaV0sIHRlbXApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZW1wO1xuXHR9XG5cblx0dG9BcnJheSgpOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiB0aGlzLm1hdDtcblx0fVxuXG5cdHRvU3RyaW5nKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuICBgfCR7dGhpcy5tYXRbMF0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbMV0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbMl0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbM10udG9GaXhlZCgyKX18XFxuYCArIFxuXHRcdFx0XHRgfCR7dGhpcy5tYXRbNF0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbNV0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbNl0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbN10udG9GaXhlZCgyKX18XFxuYCArXG5cdFx0XHRcdGB8JHt0aGlzLm1hdFs4XS50b0ZpeGVkKDIpfSwgJHt0aGlzLm1hdFs5XS50b0ZpeGVkKDIpfSwgJHt0aGlzLm1hdFsxMF0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbMTFdLnRvRml4ZWQoMil9fFxcbmAgK1xuXHRcdFx0XHRgfCR7dGhpcy5tYXRbMTJdLnRvRml4ZWQoMil9LCAke3RoaXMubWF0WzEzXS50b0ZpeGVkKDIpfSwgJHt0aGlzLm1hdFsxNF0udG9GaXhlZCgyKX0sICR7dGhpcy5tYXRbMTVdLnRvRml4ZWQoMil9fGA7XG5cdH1cbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi4vVmVjMlwiO1xuXG4vKipcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGRhdGEgY29sbGVjdGVkIGZyb20gYSBwaHlzaWNzIGhpdCBiZXR3ZWVuIHR3byBnZW9tZXRyaWMgb2JqZWN0cy5cbiAqIEluc3BpcmVkIGJ5IHRoZSBoZWxwZnVsIGNvbGxpc2lvbiBkb2N1bWVudGF0aW9uIEBsaW5rKGhlcmUpKGh0dHBzOi8vbm9vbmF0LmdpdGh1Yi5pby9pbnRlcnNlY3QvKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGl0IHtcbiAgICAvKiogVGhlIHRpbWUgb2YgdGhlIGNvbGxpc2lvbi4gT25seSBudW1iZXJzIDAgdGhyb3VnaCAxIGhhcHBlbiBpbiB0aGlzIGZyYW1lLiAqL1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICAvKiogVGhlIG5lYXIgdGltZXMgb2YgdGhlIGNvbGxpc2lvbiAqL1xuICAgIG5lYXJUaW1lczogVmVjMiA9IFZlYzIuWkVSTztcbiAgICAvKiogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2xsaXNpb24gKi9cbiAgICBwb3M6IFZlYzIgPSBWZWMyLlpFUk87XG4gICAgLyoqIFRoZSBvdmVybGFwIGRpc3RhbmNlIG9mIHRoZSBoaXQgKi9cbiAgICBkZWx0YTogVmVjMiA9IFZlYzIuWkVSTztcbiAgICAvKiogVGhlIG5vcm1hbCB2ZWN0b3Igb2YgdGhlIGhpdCAqL1xuICAgIG5vcm1hbDogVmVjMiA9IFZlYzIuWkVSTztcbn0iLCIvKiogQSBjb250YWluZXIgZm9yIGluZm8gYWJvdXQgYSB3ZWJHTCBzaGFkZXIgcHJvZ3JhbSAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0xQcm9ncmFtVHlwZSB7XG5cdC8qKiBBIHdlYkdMIHByb2dyYW0gKi9cblx0cHJvZ3JhbTogV2ViR0xQcm9ncmFtO1xuXHRcblx0LyoqIEEgdmVydGV4IHNoYWRlciAqL1xuXHR2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyO1xuXG5cdC8qKiBBIGZyYWdtZW50IHNoYWRlciAqL1xuXHRmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXI7XG5cblx0LyoqXG5cdCAqIERlbGV0ZXMgdGhpcyBzaGFkZXIgcHJvZ3JhbVxuXHQgKi9cblx0ZGVsZXRlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiB2b2lkIHtcblx0XHQvLyBDbGVhbiB1cCBhbGwgYXNwZWN0cyBvZiB0aGlzIHByb2dyYW1cblx0XHRpZih0aGlzLnByb2dyYW0pe1xuXHRcdFx0Z2wuZGVsZXRlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuXHRcdH1cblx0XHRcdFxuXHRcdGlmKHRoaXMudmVydGV4U2hhZGVyKXtcblx0XHRcdGdsLmRlbGV0ZVNoYWRlcih0aGlzLnZlcnRleFNoYWRlcik7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5mcmFnbWVudFNoYWRlcil7XG5cdFx0XHRnbC5kZWxldGVTaGFkZXIodGhpcy5mcmFnbWVudFNoYWRlcik7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFNoYXBlIGZyb20gXCIuL1NoYXBlXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vVmVjMlwiO1xuaW1wb3J0IE1hdGhVdGlscyBmcm9tIFwiLi4vLi4vVXRpbHMvTWF0aFV0aWxzXCI7XG5pbXBvcnQgQ2lyY2xlIGZyb20gXCIuL0NpcmNsZVwiO1xuaW1wb3J0IEhpdCBmcm9tIFwiLi4vUGh5c2ljcy9IaXRcIjtcblxuLyoqXG4gKiBBbiBBeGlzLUFsaWduZWQgQm91bmRpbmcgQm94LiBJbiBvdGhlciB3b3JkcywgYSByZWN0YW5nbGUgdGhhdCBpcyBhbHdheXMgYWxpZ25lZCB0byB0aGUgeC15IGdyaWQuXG4gKiBJbnNwaXJlZCBieSB0aGUgaGVscGZ1bCBjb2xsaXNpb24gZG9jdW1lbnRhdGlvbiBAbGluayhoZXJlKShodHRwczovL25vb25hdC5naXRodWIuaW8vaW50ZXJzZWN0LykuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFBQkIgZXh0ZW5kcyBTaGFwZSB7XG4gICAgY2VudGVyOiBWZWMyO1xuICAgIGhhbGZTaXplOiBWZWMyO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBBQUJCXG4gICAgICogQHBhcmFtIGNlbnRlciBUaGUgY2VudGVyIG9mIHRoZSBBQUJCXG4gICAgICogQHBhcmFtIGhhbGZTaXplIFRoZSBoYWxmIHNpemUgb2YgdGhlIEFBQkIgLSBUaGUgZGlzdGFuY2UgZnJvbSB0aGUgY2VudGVyIHRvIGFuIGVkZ2UgaW4geCBhbmQgeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNlbnRlcj86IFZlYzIsIGhhbGZTaXplPzogVmVjMil7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY2VudGVyID0gY2VudGVyID8gY2VudGVyIDogbmV3IFZlYzIoMCwgMCk7XG4gICAgICAgIHRoaXMuaGFsZlNpemUgPSBoYWxmU2l6ZSA/IGhhbGZTaXplIDogbmV3IFZlYzIoMCwgMCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSBwb2ludCByZXByZXNlbnRpbmcgdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiB0aGUgQUFCQiAqL1xuICAgIGdldCB0b3BMZWZ0KCk6IFZlYzIge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy5sZWZ0LCB0aGlzLnRvcClcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHBvaW50IHJlcHJlc2VudGluZyB0aGUgdG9wIHJpZ2h0IGNvcm5lciBvZiB0aGUgQUFCQiAqL1xuICAgIGdldCB0b3BSaWdodCgpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMucmlnaHQsIHRoaXMudG9wKVxuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgcG9pbnQgcmVwcmVzZW50aW5nIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgb2YgdGhlIEFBQkIgKi9cbiAgICBnZXQgYm90dG9tTGVmdCgpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMubGVmdCwgdGhpcy5ib3R0b20pXG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSBwb2ludCByZXByZXNlbnRpbmcgdGhlIGJvdHRvbSByaWdodCBjb3JuZXIgb2YgdGhlIEFBQkIgKi9cbiAgICBnZXQgYm90dG9tUmlnaHQoKTogVmVjMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSlcbiAgICB9XG5cbiAgICAvLyBAb3ZlcnJpZGVcbiAgICBnZXRCb3VuZGluZ1JlY3QoKTogQUFCQiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCk7XG4gICAgfVxuXG4gICAgLy8gQG92ZXJyaWRlXG4gICAgZ2V0Qm91bmRpbmdDaXJjbGUoKTogQ2lyY2xlIHtcbiAgICAgICAgbGV0IHIgPSBNYXRoLm1heCh0aGlzLmh3LCB0aGlzLmhoKVxuICAgICAgICByZXR1cm4gbmV3IENpcmNsZSh0aGlzLmNlbnRlci5jbG9uZSgpLCByKTtcbiAgICB9XG5cbiAgICAvLyBAZGVwcmVjYXRlZFxuICAgIGdldEhhbGZTaXplKCk6IFZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy5oYWxmU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBAZGVwcmVjYXRlZFxuICAgIHNldEhhbGZTaXplKGhhbGZTaXplOiBWZWMyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGFsZlNpemUgPSBoYWxmU2l6ZTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC0gbW92ZSB0aGVzZSBhbGwgdG8gdGhlIFNoYXBlIGNsYXNzXG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgYm9vbGVhbiBjaGVjayBvZiB3aGV0aGVyIHRoaXMgQUFCQiBjb250YWlucyBhIHBvaW50XG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciB0aGlzIEFBQkIgY29udGFpbnMgdGhlIHNwZWNpZmllZCBwb2ludFxuICAgICAqL1xuICAgIGNvbnRhaW5zUG9pbnQocG9pbnQ6IFZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvaW50LnggPj0gdGhpcy54IC0gdGhpcy5odyAmJiBwb2ludC54IDw9IHRoaXMueCArIHRoaXMuaHdcbiAgICAgICAgICAgICYmIHBvaW50LnkgPj0gdGhpcy55IC0gdGhpcy5oaCAmJiBwb2ludC55IDw9IHRoaXMueSArIHRoaXMuaGhcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgYm9vbGVhbiBjaGVjayBvZiB3aGV0aGVyIHRoaXMgQUFCQiBjb250YWlucyBhIHBvaW50XG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciB0aGlzIEFBQkIgY29udGFpbnMgdGhlIHNwZWNpZmllZCBwb2ludFxuICAgICAqL1xuICAgIGludGVyc2VjdFBvaW50KHBvaW50OiBWZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkeCA9IHBvaW50LnggLSB0aGlzLng7XG4gICAgICAgIGxldCBweCA9IHRoaXMuaHcgLSBNYXRoLmFicyhkeCk7XG4gICAgICAgIFxuICAgICAgICBpZihweCA8PSAwKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkeSA9IHBvaW50LnkgLSB0aGlzLnk7XG4gICAgICAgIGxldCBweSA9IHRoaXMuaGggLSBNYXRoLmFicyhkeSk7XG5cbiAgICAgICAgaWYocHkgPD0gMCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGJvb2xlYW4gY2hlY2sgb2Ygd2hldGhlciB0aGlzIEFBQkIgY29udGFpbnMgYSBwb2ludCB3aXRoIHNvZnQgbGVmdCBhbmQgdG9wIGJvdW5kYXJpZXMuXG4gICAgICogSW4gb3RoZXIgd29yZHMsIGlmIHRoZSB0b3AgbGVmdCBpcyAoMCwgMCksIHRoZSBwb2ludCAoMCwgMCkgaXMgbm90IGluIHRoZSBBQUJCXG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgd2hldGhlciB0aGlzIEFBQkIgY29udGFpbnMgdGhlIHNwZWNpZmllZCBwb2ludFxuICAgICAqL1xuICAgIGNvbnRhaW5zUG9pbnRTb2Z0KHBvaW50OiBWZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwb2ludC54ID4gdGhpcy54IC0gdGhpcy5odyAmJiBwb2ludC54IDw9IHRoaXMueCArIHRoaXMuaHdcbiAgICAgICAgICAgICYmIHBvaW50LnkgPiB0aGlzLnkgLSB0aGlzLmhoICYmIHBvaW50LnkgPD0gdGhpcy55ICsgdGhpcy5oaFxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGF0YSBmcm9tIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhpcyBBQUJCIHdpdGggYSBsaW5lIHNlZ21lbnQgZnJvbSBhIHBvaW50IGluIGEgZGlyZWN0aW9uXG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCB0aGF0IHRoZSBsaW5lIHNlZ21lbnQgc3RhcnRzIGZyb21cbiAgICAgKiBAcGFyYW0gZGVsdGEgVGhlIGRpcmVjdGlvbiBhbmQgZGlzdGFuY2Ugb2YgdGhlIHNlZ21lbnRcbiAgICAgKiBAcGFyYW0gcGFkZGluZyBQYWRzIHRoZSBBQUJCIHRvIG1ha2UgaXQgd2lkZXIgZm9yIHRoZSBpbnRlcnNlY3Rpb24gdGVzdFxuICAgICAqIEByZXR1cm5zIFRoZSBIaXQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW50ZXJzZWN0aW9uLCBvciBudWxsIGlmIHRoZXJlIHdhcyBubyBpbnRlcnNlY3Rpb25cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RTZWdtZW50KHBvaW50OiBWZWMyLCBkZWx0YTogVmVjMiwgcGFkZGluZz86IFZlYzIpOiBIaXQge1xuICAgICAgICBsZXQgcGFkZGluZ1ggPSBwYWRkaW5nID8gcGFkZGluZy54IDogMDtcbiAgICAgICAgbGV0IHBhZGRpbmdZID0gcGFkZGluZyA/IHBhZGRpbmcueSA6IDA7XG5cbiAgICAgICAgbGV0IHNjYWxlWCA9IDEvZGVsdGEueDtcbiAgICAgICAgbGV0IHNjYWxlWSA9IDEvZGVsdGEueTtcblxuICAgICAgICBsZXQgc2lnblggPSBNYXRoVXRpbHMuc2lnbihzY2FsZVgpO1xuICAgICAgICBsZXQgc2lnblkgPSBNYXRoVXRpbHMuc2lnbihzY2FsZVkpO1xuXG4gICAgICAgIGxldCB0bmVhcnggPSBzY2FsZVgqKHRoaXMueCAtIHNpZ25YKih0aGlzLmh3ICsgcGFkZGluZ1gpIC0gcG9pbnQueCk7XG4gICAgICAgIGxldCB0bmVhcnkgPSBzY2FsZVkqKHRoaXMueSAtIHNpZ25ZKih0aGlzLmhoICsgcGFkZGluZ1kpIC0gcG9pbnQueSk7XG4gICAgICAgIGxldCB0ZmFyeCA9IHNjYWxlWCoodGhpcy54ICsgc2lnblgqKHRoaXMuaHcgKyBwYWRkaW5nWCkgLSBwb2ludC54KTtcbiAgICAgICAgbGV0IHRmYXJ5ID0gc2NhbGVZKih0aGlzLnkgKyBzaWduWSoodGhpcy5oaCArIHBhZGRpbmdZKSAtIHBvaW50LnkpO1xuICAgICAgICBcbiAgICAgICAgaWYodG5lYXJ4ID4gdGZhcnkgfHwgdG5lYXJ5ID4gdGZhcngpe1xuICAgICAgICAgICAgLy8gV2UgYXJlbid0IGNvbGxpZGluZyAtIHdlIGNsZWFyIG9uZSBheGlzIGJlZm9yZSBpbnRlcnNlY3RpbmcgYW5vdGhlclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG5lYXIgPSBNYXRoLm1heCh0bmVhcngsIHRuZWFyeSk7XG5cbiAgICAgICAgLy8gRG91YmxlIGNoZWNrIGZvciBOYU5zXG4gICAgICAgIGlmKHRuZWFyeCAhPT0gdG5lYXJ4KXtcbiAgICAgICAgICAgIHRuZWFyID0gdG5lYXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKHRuZWFyeSAhPT0gdG5lYXJ5KXtcbiAgICAgICAgICAgIHRuZWFyID0gdG5lYXJ4O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRmYXIgPSBNYXRoLm1pbih0ZmFyeCwgdGZhcnkpO1xuXG4gICAgICAgIGlmKHRuZWFyID09PSAtSW5maW5pdHkpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0bmVhciA+PSAxIHx8IHRmYXIgPD0gMCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGFyZSBjb2xsaWRpbmdcbiAgICAgICAgbGV0IGhpdCA9IG5ldyBIaXQoKTtcbiAgICAgICAgaGl0LnRpbWUgPSBNYXRoVXRpbHMuY2xhbXAwMSh0bmVhcik7XG4gICAgICAgIGhpdC5uZWFyVGltZXMueCA9IHRuZWFyeDtcbiAgICAgICAgaGl0Lm5lYXJUaW1lcy55ID0gdG5lYXJ5O1xuXG4gICAgICAgIGlmKHRuZWFyeCA+IHRuZWFyeSl7XG4gICAgICAgICAgICAvLyBXZSBoaXQgb24gdGhlIGxlZnQgb3IgcmlnaHQgc2l6ZVxuICAgICAgICAgICAgaGl0Lm5vcm1hbC54ID0gLXNpZ25YO1xuICAgICAgICAgICAgaGl0Lm5vcm1hbC55ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmKE1hdGguYWJzKHRuZWFyeCAtIHRuZWFyeSkgPCAwLjAwMDEpe1xuICAgICAgICAgICAgLy8gV2UgaGl0IG9uIHRoZSBjb3JuZXJcbiAgICAgICAgICAgIGhpdC5ub3JtYWwueCA9IC1zaWduWDtcbiAgICAgICAgICAgIGhpdC5ub3JtYWwueSA9IC1zaWduWTtcbiAgICAgICAgICAgIGhpdC5ub3JtYWwubm9ybWFsaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBoaXQgb24gdGhlIHRvcCBvciBib3R0b21cbiAgICAgICAgICAgIGhpdC5ub3JtYWwueCA9IDA7XG4gICAgICAgICAgICBoaXQubm9ybWFsLnkgPSAtc2lnblk7XG4gICAgICAgIH1cblxuICAgICAgICBoaXQuZGVsdGEueCA9ICgxLjAgLSBoaXQudGltZSkgKiAtZGVsdGEueDtcbiAgICAgICAgaGl0LmRlbHRhLnkgPSAoMS4wIC0gaGl0LnRpbWUpICogLWRlbHRhLnk7XG4gICAgICAgIGhpdC5wb3MueCA9IHBvaW50LnggKyBkZWx0YS54ICogaGl0LnRpbWU7XG4gICAgICAgIGhpdC5wb3MueSA9IHBvaW50LnkgKyBkZWx0YS55ICogaGl0LnRpbWU7XG5cbiAgICAgICAgcmV0dXJuIGhpdDtcbiAgICB9XG5cbiAgICAvLyBAb3ZlcnJpZGVcbiAgICBvdmVybGFwcyhvdGhlcjogU2hhcGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYob3RoZXIgaW5zdGFuY2VvZiBBQUJCKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXBzQUFCQihvdGhlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgXCJPdmVybGFwIG5vdCBkZWZpbmVkIGJldHdlZW4gdGhlc2Ugc2hhcGVzLlwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgYm9vbGVhbiBjaGVjayBvZiB3aGV0aGVyIHRoaXMgQUFCQiBvdmVybGFwcyBhbm90aGVyXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBvdGhlciBBQUJCIHRvIGNoZWNrIGFnYWluc3RcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoaXMgQUFCQiBvdmVybGFwcyB0aGUgb3RoZXIsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVybGFwc0FBQkIob3RoZXI6IEFBQkIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGR4ID0gb3RoZXIueCAtIHRoaXMueDtcbiAgICAgICAgbGV0IHB4ID0gdGhpcy5odyArIG90aGVyLmh3IC0gTWF0aC5hYnMoZHgpO1xuICAgICAgICBcbiAgICAgICAgaWYocHggPD0gMCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHkgPSBvdGhlci55IC0gdGhpcy55O1xuICAgICAgICBsZXQgcHkgPSB0aGlzLmhoICsgb3RoZXIuaGggLSBNYXRoLmFicyhkeSk7XG5cbiAgICAgICAgaWYocHkgPD0gMCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlc2UgQUFCQnMgYXJlIEpVU1QgdG91Y2hpbmcgLSBub3Qgb3ZlcmxhcHBpbmcuXG4gICAgICogVmVjMi54IGlzIC0xIGlmIHRoZSBvdGhlciBpcyB0byB0aGUgbGVmdCwgMSBpZiB0byB0aGUgcmlnaHQuXG4gICAgICogTGlrZXdpc2UsIFZlYzIueSBpcyAtMSBpZiB0aGUgb3RoZXIgaXMgb24gdG9wLCAxIGlmIG9uIGJvdHRvbS5cbiAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIG90aGVyIEFBQkIgdG8gY2hlY2tcbiAgICAgKiBAcmV0dXJucyBUaGUgY29sbGlzaW9uIHNpZGVzIHN0b3JlZCBpbiBhIFZlYzIgaWYgdGhlIEFBQkJzIGFyZSB0b3VjaGluZywgbnVsbCBvdGhlcndpc2VcbiAgICAgKi9cbiAgICB0b3VjaGVzQUFCQihvdGhlcjogQUFCQik6IFZlYzIge1xuICAgICAgICBsZXQgZHggPSBvdGhlci54IC0gdGhpcy54O1xuICAgICAgICBsZXQgcHggPSB0aGlzLmh3ICsgb3RoZXIuaHcgLSBNYXRoLmFicyhkeCk7XG5cbiAgICAgICAgbGV0IGR5ID0gb3RoZXIueSAtIHRoaXMueTtcbiAgICAgICAgbGV0IHB5ID0gdGhpcy5oaCArIG90aGVyLmhoIC0gTWF0aC5hYnMoZHkpO1xuXG4gICAgICAgIC8vIElmIG9uZSBheGlzIGlzIGp1c3QgdG91Y2hpbmcgYW5kIHRoZSBvdGhlciBpcyBvdmVybGFwcGluZywgdHJ1ZVxuICAgICAgICBpZigocHggPT09IDAgJiYgcHkgPj0gMCkgfHwgKHB5ID09PSAwICYmIHB4ID49IDApKXtcbiAgICAgICAgICAgIGxldCByZXQgPSBuZXcgVmVjMigpO1xuXG4gICAgICAgICAgICBpZihweCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0LnggPSBvdGhlci54IDwgdGhpcy54ID8gLTEgOiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihweSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0LnkgPSBvdGhlci55IDwgdGhpcy55ID8gLTEgOiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlc2UgQUFCQnMgYXJlIEpVU1QgdG91Y2hpbmcgLSBub3Qgb3ZlcmxhcHBpbmcuXG4gICAgICogQWxzbywgaWYgdGhleSBhcmUgb25seSB0b3VjaGluZyBjb3JuZXJzLCB0aGV5IGFyZSBjb25zaWRlcmVkIG5vdCB0b3VjaGluZy5cbiAgICAgKiBWZWMyLnggaXMgLTEgaWYgdGhlIG90aGVyIGlzIHRvIHRoZSBsZWZ0LCAxIGlmIHRvIHRoZSByaWdodC5cbiAgICAgKiBMaWtld2lzZSwgVmVjMi55IGlzIC0xIGlmIHRoZSBvdGhlciBpcyBvbiB0b3AsIDEgaWYgb24gYm90dG9tLlxuICAgICAqIEBwYXJhbSBvdGhlciBUaGUgb3RoZXIgQUFCQiB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIFRoZSBzaWRlIG9mIHRoZSB0b3VjaCwgc3RvcmVkIGFzIGEgVmVjMiwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyB0b3VjaFxuICAgICAqL1xuICAgIHRvdWNoZXNBQUJCV2l0aG91dENvcm5lcnMob3RoZXI6IEFBQkIpOiBWZWMyIHtcbiAgICAgICAgbGV0IGR4ID0gb3RoZXIueCAtIHRoaXMueDtcbiAgICAgICAgbGV0IHB4ID0gdGhpcy5odyArIG90aGVyLmh3IC0gTWF0aC5hYnMoZHgpO1xuXG4gICAgICAgIGxldCBkeSA9IG90aGVyLnkgLSB0aGlzLnk7XG4gICAgICAgIGxldCBweSA9IHRoaXMuaGggKyBvdGhlci5oaCAtIE1hdGguYWJzKGR5KTtcblxuICAgICAgICAvLyBJZiBvbmUgYXhpcyBpcyB0b3VjaGluZywgYW5kIHRoZSBvdGhlciBpcyBzdHJpY3RseSBvdmVybGFwcGluZ1xuICAgICAgICBpZigocHggPT09IDAgJiYgcHkgPiAwKSB8fCAocHkgPT09IDAgJiYgcHggPiAwKSl7XG4gICAgICAgICAgICBsZXQgcmV0ID0gbmV3IFZlYzIoKTtcblxuICAgICAgICAgICAgaWYocHggPT09IDApe1xuICAgICAgICAgICAgICAgIHJldC54ID0gb3RoZXIueCA8IHRoaXMueCA/IC0xIDogMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0LnkgPSBvdGhlci55IDwgdGhpcy55ID8gLTEgOiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFyZWEgb2YgdGhlIG92ZXJsYXAgYmV0d2VlbiB0aGlzIEFBQkIgYW5kIGFub3RoZXJcbiAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIG90aGVyIEFBQkJcbiAgICAgKiBAcmV0dXJucyBUaGUgYXJlYSBvZiB0aGUgb3ZlcmxhcCBiZXR3ZWVuIHRoZSBBQUJCc1xuICAgICAqL1xuICAgIG92ZXJsYXBBcmVhKG90aGVyOiBBQUJCKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGxlZnR4ID0gTWF0aC5tYXgodGhpcy54IC0gdGhpcy5odywgb3RoZXIueCAtIG90aGVyLmh3KTtcbiAgICAgICAgbGV0IHJpZ2h0eCA9IE1hdGgubWluKHRoaXMueCArIHRoaXMuaHcsIG90aGVyLnggKyBvdGhlci5odyk7XG4gICAgICAgIGxldCBkeCA9IHJpZ2h0eCAtIGxlZnR4O1xuXG4gICAgICAgIGxldCBsZWZ0eSA9IE1hdGgubWF4KHRoaXMueSAtIHRoaXMuaGgsIG90aGVyLnkgLSBvdGhlci5oaCk7XG4gICAgICAgIGxldCByaWdodHkgPSBNYXRoLm1pbih0aGlzLnkgKyB0aGlzLmhoLCBvdGhlci55ICsgb3RoZXIuaGgpO1xuICAgICAgICBsZXQgZHkgPSByaWdodHkgLSBsZWZ0eTtcblxuICAgICAgICBpZihkeCA8IDAgfHwgZHkgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBkeCpkeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhbmQgcmVzaXplcyB0aGlzIHJlY3QgZnJvbSBpdHMgY3VycmVudCBwb3NpdGlvbiB0byB0aGUgcG9zaXRpb24gc3BlY2lmaWVkXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSBtb3ZlbWVudCBvZiB0aGUgcmVjdCBmcm9tIGl0cyBwb3NpdGlvblxuICAgICAqIEBwYXJhbSBmcm9tUG9zaXRpb24gQSBwb3NpdGlvbiBzcGVjaWZpZWQgdG8gYmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHN3ZWVwaW5nXG4gICAgICogQHBhcmFtIGhhbGZTaXplIFRoZSBoYWxmU2l6ZSBvZiB0aGUgc3dlZXBpbmcgcmVjdCBcbiAgICAgKi9cbiAgICBzd2VlcCh2ZWxvY2l0eTogVmVjMiwgZnJvbVBvc2l0aW9uPzogVmVjMiwgaGFsZlNpemU/OiBWZWMyKTogdm9pZCB7XG4gICAgICAgIGlmKCFmcm9tUG9zaXRpb24pe1xuICAgICAgICAgICAgZnJvbVBvc2l0aW9uID0gdGhpcy5jZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZighaGFsZlNpemUpe1xuICAgICAgICAgICAgaGFsZlNpemUgPSB0aGlzLmhhbGZTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNlbnRlclggPSBmcm9tUG9zaXRpb24ueCArIHZlbG9jaXR5LngvMjtcbiAgICAgICAgbGV0IGNlbnRlclkgPSBmcm9tUG9zaXRpb24ueSArIHZlbG9jaXR5LnkvMjtcblxuICAgICAgICBsZXQgbWluWCA9IE1hdGgubWluKGZyb21Qb3NpdGlvbi54IC0gaGFsZlNpemUueCwgZnJvbVBvc2l0aW9uLnggKyB2ZWxvY2l0eS54IC0gaGFsZlNpemUueCk7XG4gICAgICAgIGxldCBtaW5ZID0gTWF0aC5taW4oZnJvbVBvc2l0aW9uLnkgLSBoYWxmU2l6ZS55LCBmcm9tUG9zaXRpb24ueSArIHZlbG9jaXR5LnkgLSBoYWxmU2l6ZS55KTtcblxuICAgICAgICB0aGlzLmNlbnRlci5zZXQoY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICAgIHRoaXMuaGFsZlNpemUuc2V0KGNlbnRlclggLSBtaW5YLCBjZW50ZXJZIC0gbWluWSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEBvdmVycmlkZVxuICAgIGNsb25lKCk6IEFBQkIge1xuICAgICAgICByZXR1cm4gbmV3IEFBQkIodGhpcy5jZW50ZXIuY2xvbmUoKSwgdGhpcy5oYWxmU2l6ZS5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIEFBQkIgdG8gYSBzdHJpbmcgZm9ybWF0XG4gICAgICogQHJldHVybnMgKGNlbnRlcjogKHgsIHkpLCBoYWxmU2l6ZTogKHgsIHkpKVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIihjZW50ZXI6IFwiICsgdGhpcy5jZW50ZXIudG9TdHJpbmcoKSArIFwiLCBoYWxmLXNpemU6IFwiICsgdGhpcy5oYWxmU2l6ZS50b1N0cmluZygpICsgXCIpXCJcbiAgICB9XG59IiwiaW1wb3J0IFZlYzIgZnJvbSBcIi4uL1ZlYzJcIjtcbmltcG9ydCBBQUJCIGZyb20gXCIuL0FBQkJcIjtcbmltcG9ydCBTaGFwZSBmcm9tIFwiLi9TaGFwZVwiO1xuXG4vKipcbiAqIEEgQ2lyY2xlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZSBleHRlbmRzIFNoYXBlIHtcblx0cHJpdmF0ZSBfY2VudGVyOiBWZWMyO1xuXHRyYWRpdXM6IG51bWJlcjtcblx0XG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IENpcmNsZVxuXHQgKiBAcGFyYW0gY2VudGVyIFRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZVxuXHQgKiBAcGFyYW0gcmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoY2VudGVyOiBWZWMyLCByYWRpdXM6IG51bWJlcikge1xuXHRcdHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlciA/IGNlbnRlciA6IG5ldyBWZWMyKDAsIDApO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyA/IHJhZGl1cyA6IDA7XG5cdH1cblxuXHRnZXQgY2VudGVyKCk6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLl9jZW50ZXI7XG5cdH1cblxuXHRzZXQgY2VudGVyKGNlbnRlcjogVmVjMikge1xuXHRcdHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblx0fVxuXG5cdGdldCBoYWxmU2l6ZSgpOiBWZWMyIHtcblx0XHRyZXR1cm4gbmV3IFZlYzIodGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcblx0fVxuXG5cdGdldCByKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMucmFkaXVzO1xuXHR9XG5cblx0c2V0IHIocmFkaXVzOiBudW1iZXIpIHtcblx0XHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcblx0fVxuXG5cdC8vIEBvdmVycmlkZVxuXHQvKipcbiAgICAgKiBBIHNpbXBsZSBib29sZWFuIGNoZWNrIG9mIHdoZXRoZXIgdGhpcyBBQUJCIGNvbnRhaW5zIGEgcG9pbnRcbiAgICAgKiBAcGFyYW0gcG9pbnQgVGhlIHBvaW50IHRvIGNoZWNrXG4gICAgICogQHJldHVybnMgQSBib29sZWFuIHJlcHJlc2VudGluZyB3aGV0aGVyIHRoaXMgQUFCQiBjb250YWlucyB0aGUgc3BlY2lmaWVkIHBvaW50XG4gICAgICovXG4gICAgY29udGFpbnNQb2ludChwb2ludDogVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jZW50ZXIuZGlzdGFuY2VTcVRvKHBvaW50KSA8PSB0aGlzLnJhZGl1cyp0aGlzLnJhZGl1cztcbiAgICB9XG5cblx0Ly8gQG92ZXJyaWRlXG5cdGdldEJvdW5kaW5nUmVjdCgpOiBBQUJCIHtcblx0XHRyZXR1cm4gbmV3IEFBQkIodGhpcy5fY2VudGVyLmNsb25lKCksIG5ldyBWZWMyKHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cykpO1xuXHR9XG5cblx0Ly8gQG92ZXJyaWRlXG5cdGdldEJvdW5kaW5nQ2lyY2xlKCk6IENpcmNsZSB7XG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKTtcblx0fVxuXG5cdC8vIEBvdmVycmlkZVxuXHRvdmVybGFwcyhvdGhlcjogU2hhcGUpOiBib29sZWFuIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcblx0fVxuXG5cdC8vIEBvdmVycmlkZVxuXHRjbG9uZSgpOiBDaXJjbGUge1xuXHRcdHJldHVybiBuZXcgQ2lyY2xlKHRoaXMuX2NlbnRlci5jbG9uZSgpLCB0aGlzLnJhZGl1cyk7XG5cdH1cblxuXHR0b1N0cmluZygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBcIihjZW50ZXI6IFwiICsgdGhpcy5jZW50ZXIudG9TdHJpbmcoKSArIFwiLCByYWRpdXM6IFwiICsgdGhpcy5yYWRpdXMgKyBcIilcIjtcblx0fVxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi9WZWMyXCI7XG5pbXBvcnQgQUFCQiBmcm9tIFwiLi9BQUJCXCI7XG5pbXBvcnQgQ2lyY2xlIGZyb20gXCIuL0NpcmNsZVwiO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IFNoYXBlIGNsYXNzIHRoYXQgYWN0cyBhcyBhbiBpbnRlcmZhY2UgZm9yIGJldHRlciBpbnRlcmFjdGlvbnMgd2l0aCBzdWJjbGFzc2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTaGFwZSB7XG4gICAgYWJzdHJhY3QgZ2V0IGNlbnRlcigpOiBWZWMyO1xuXG4gICAgYWJzdHJhY3Qgc2V0IGNlbnRlcihjZW50ZXI6IFZlYzIpO1xuXG4gICAgYWJzdHJhY3QgZ2V0IGhhbGZTaXplKCk6IFZlYzI7XG5cbiAgICBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jZW50ZXIueDtcbiAgICB9XG5cbiAgICBnZXQgeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jZW50ZXIueTtcbiAgICB9XG5cbiAgICBnZXQgaHcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFsZlNpemUueDtcbiAgICB9XG5cbiAgICBnZXQgaGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFsZlNpemUueTtcbiAgICB9XG5cbiAgICBnZXQgdG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgLSB0aGlzLmhoO1xuICAgIH1cblxuICAgIGdldCBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGg7XG4gICAgfVxuXG4gICAgZ2V0IGxlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMuaHc7XG4gICAgfVxuXG4gICAgZ2V0IHJpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLmh3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBib3VuZGluZyByZWN0YW5nbGUgZm9yIHRoaXMgc2hhcGUuIFdhcm5pbmcgLSBtYXkgYmUgdGhlIHNhbWUgYXMgdGhpcyBTaGFwZS5cbiAgICAgKiBGb3IgaW5zdGFuY2UsIHRoZSBib3VuZGluZyBjaXJjbGUgb2YgYW4gQUFCQiBpcyBpdHNlbGYuIFVzZSBjbG9uZSgpIGlmIHlvdSBuZWVkIGEgbmV3IHNoYXBlLlxuICAgICAqIEByZXR1cm5zIEFuIEFBQkIgdGhhdCBib3VuZHMgdGhpcyBzaGFwZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEJvdW5kaW5nUmVjdCgpOiBBQUJCO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGJvdW5kaW5nIGNpcmNsZSBmb3IgdGhpcyBzaGFwZS4gV2FybmluZyAtIG1heSBiZSB0aGUgc2FtZSBhcyB0aGlzIFNoYXBlLlxuICAgICAqIEZvciBpbnN0YW5jZSwgdGhlIGJvdW5kaW5nIGNpcmNsZSBvZiBhIENpcmNsZSBpcyBpdHNlbGYuIFVzZSBjbG9uZSgpIGlmIHlvdSBuZWVkIGEgbmV3IHNoYXBlLlxuICAgICAqIEByZXR1cm5zIEEgQ2lyY2xlIHRoYXQgYm91bmRzIHRoaXMgc2hhcGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRCb3VuZGluZ0NpcmNsZSgpOiBDaXJjbGU7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGlzIFNoYXBlXG4gICAgICogQHJldHVybnMgQSBuZXcgY29weSBvZiB0aGlzIHNoYXBlXG4gICAgICovXG4gICAgYWJzdHJhY3QgY2xvbmUoKTogU2hhcGU7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBzaGFwZSBvdmVybGFwcyBhbm90aGVyXG4gICAgICogQHBhcmFtIG90aGVyIFRoZSBvdGhlciBzaGFwZSB0byBjaGVjayBhZ2FpbnN0XG4gICAgICogQHJldHVybnMgYSBib29sZWFuIHRoYXQgcmVwcmVzZW50cyB3aGV0aGVyIHRoaXMgU2hhcGUgb3ZlcmxhcHMgdGhlIG90aGVyIG9uZVxuICAgICAqL1xuICAgIGFic3RyYWN0IG92ZXJsYXBzKG90aGVyOiBTaGFwZSk6IGJvb2xlYW47XG5cbiAgICAgLyoqXG4gICAgICogQSBzaW1wbGUgYm9vbGVhbiBjaGVjayBvZiB3aGV0aGVyIHRoaXMgU2hhcGUgY29udGFpbnMgYSBwb2ludFxuICAgICAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgdG8gY2hlY2tcbiAgICAgKiBAcmV0dXJucyBBIGJvb2xlYW4gcmVwcmVzZW50aW5nIHdoZXRoZXIgdGhpcyBTaGFwZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIHBvaW50XG4gICAgICovXG4gICAgYWJzdHJhY3QgY29udGFpbnNQb2ludChwb2ludDogVmVjMik6IGJvb2xlYW47XG5cbiAgICBzdGF0aWMgZ2V0VGltZU9mQ29sbGlzaW9uKEE6IFNoYXBlLCB2ZWxBOiBWZWMyLCBCOiBTaGFwZSwgdmVsQjogVmVjMik6IFtWZWMyLCBWZWMyLCBib29sZWFuLCBib29sZWFuXSB7XG5cdFx0aWYoQSBpbnN0YW5jZW9mIEFBQkIgJiYgQiBpbnN0YW5jZW9mIEFBQkIpe1xuXHRcdFx0cmV0dXJuIFNoYXBlLmdldFRpbWVPZkNvbGxpc2lvbl9BQUJCX0FBQkIoQSwgdmVsQSwgQiwgdmVsQik7XG5cdFx0fVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUaW1lT2ZDb2xsaXNpb25fQUFCQl9BQUJCKEE6IEFBQkIsIHZlbEE6IFZlYzIsIEI6IFNoYXBlLCB2ZWxCOiBWZWMyKTogW1ZlYzIsIFZlYzIsIGJvb2xlYW4sIGJvb2xlYW5dIHtcbiAgICAgICAgbGV0IHBvc1NtYWxsZXIgPSBBLmNlbnRlcjtcbiAgICAgICAgbGV0IHBvc0xhcmdlciA9IEIuY2VudGVyO1xuICAgICAgICBcbiAgICAgICAgbGV0IHNpemVTbWFsbGVyID0gQS5oYWxmU2l6ZTtcbiAgICAgICAgbGV0IHNpemVMYXJnZXIgPSBCLmhhbGZTaXplO1xuICAgIFxuICAgICAgICBsZXQgZmlyc3RDb250YWN0ID0gbmV3IFZlYzIoMCwgMCk7XG4gICAgICAgIGxldCBsYXN0Q29udGFjdCA9IG5ldyBWZWMyKDAsIDApO1xuICAgIFxuICAgICAgICBsZXQgY29sbGlkaW5nWCA9IGZhbHNlO1xuICAgICAgICBsZXQgY29sbGlkaW5nWSA9IGZhbHNlO1xuICAgIFxuICAgICAgICAvLyBTb3J0IGJ5IHBvc2l0aW9uXG4gICAgICAgIGlmKHBvc0xhcmdlci54IDwgcG9zU21hbGxlci54KXtcbiAgICAgICAgICAgIC8vIFN3YXAsIGJlY2F1c2Ugc21hbGxlciBpcyBmdXJ0aGVyIHJpZ2h0IHRoYW4gbGFyZ2VyXG4gICAgICAgICAgICBsZXQgdGVtcDogVmVjMjtcbiAgICAgICAgICAgIHRlbXAgPSBzaXplU21hbGxlcjtcbiAgICAgICAgICAgIHNpemVTbWFsbGVyID0gc2l6ZUxhcmdlcjtcbiAgICAgICAgICAgIHNpemVMYXJnZXIgPSB0ZW1wO1xuICAgIFxuICAgICAgICAgICAgdGVtcCA9IHBvc1NtYWxsZXI7XG4gICAgICAgICAgICBwb3NTbWFsbGVyID0gcG9zTGFyZ2VyO1xuICAgICAgICAgICAgcG9zTGFyZ2VyID0gdGVtcDtcbiAgICBcbiAgICAgICAgICAgIHRlbXAgPSB2ZWxBO1xuICAgICAgICAgICAgdmVsQSA9IHZlbEI7XG4gICAgICAgICAgICB2ZWxCID0gdGVtcDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBBIGlzIGxlZnQsIEIgaXMgcmlnaHRcbiAgICAgICAgZmlyc3RDb250YWN0LnggPSBJbmZpbml0eTtcbiAgICAgICAgbGFzdENvbnRhY3QueCA9IEluZmluaXR5O1xuICAgIFxuICAgICAgICBpZiAocG9zTGFyZ2VyLnggLSBzaXplTGFyZ2VyLnggPj0gcG9zU21hbGxlci54ICsgc2l6ZVNtYWxsZXIueCl7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgY3VycmVudGx5IGNvbGxpZGluZ1xuICAgICAgICAgICAgbGV0IHJlbFZlbCA9IHZlbEEueCAtIHZlbEIueDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocmVsVmVsID4gMCl7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhleSBhcmUgbW92aW5nIHRvd2FyZHMgZWFjaCBvdGhlclxuICAgICAgICAgICAgICAgIGZpcnN0Q29udGFjdC54ID0gKChwb3NMYXJnZXIueCAtIHNpemVMYXJnZXIueCkgLSAocG9zU21hbGxlci54ICsgc2l6ZVNtYWxsZXIueCkpLyhyZWxWZWwpO1xuICAgICAgICAgICAgICAgIGxhc3RDb250YWN0LnggPSAoKHBvc0xhcmdlci54ICsgc2l6ZUxhcmdlci54KSAtIChwb3NTbWFsbGVyLnggLSBzaXplU21hbGxlci54KSkvKHJlbFZlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsaWRpbmdYID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZihwb3NMYXJnZXIueSA8IHBvc1NtYWxsZXIueSl7XG4gICAgICAgICAgICAvLyBTd2FwLCBiZWNhdXNlIHNtYWxsZXIgaXMgZnVydGhlciB1cCB0aGFuIGxhcmdlclxuICAgICAgICAgICAgbGV0IHRlbXA6IFZlYzI7XG4gICAgICAgICAgICB0ZW1wID0gc2l6ZVNtYWxsZXI7XG4gICAgICAgICAgICBzaXplU21hbGxlciA9IHNpemVMYXJnZXI7XG4gICAgICAgICAgICBzaXplTGFyZ2VyID0gdGVtcDtcbiAgICBcbiAgICAgICAgICAgIHRlbXAgPSBwb3NTbWFsbGVyO1xuICAgICAgICAgICAgcG9zU21hbGxlciA9IHBvc0xhcmdlcjtcbiAgICAgICAgICAgIHBvc0xhcmdlciA9IHRlbXA7XG4gICAgXG4gICAgICAgICAgICB0ZW1wID0gdmVsQTtcbiAgICAgICAgICAgIHZlbEEgPSB2ZWxCO1xuICAgICAgICAgICAgdmVsQiA9IHRlbXA7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gQSBpcyB0b3AsIEIgaXMgYm90dG9tXG4gICAgICAgIGZpcnN0Q29udGFjdC55ID0gSW5maW5pdHk7XG4gICAgICAgIGxhc3RDb250YWN0LnkgPSBJbmZpbml0eTtcbiAgICBcbiAgICAgICAgaWYgKHBvc0xhcmdlci55IC0gc2l6ZUxhcmdlci55ID49IHBvc1NtYWxsZXIueSArIHNpemVTbWFsbGVyLnkpe1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlbid0IGN1cnJlbnRseSBjb2xsaWRpbmdcbiAgICAgICAgICAgIGxldCByZWxWZWwgPSB2ZWxBLnkgLSB2ZWxCLnk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJlbFZlbCA+IDApe1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXkgYXJlIG1vdmluZyB0b3dhcmRzIGVhY2ggb3RoZXJcbiAgICAgICAgICAgICAgICBmaXJzdENvbnRhY3QueSA9ICgocG9zTGFyZ2VyLnkgLSBzaXplTGFyZ2VyLnkpIC0gKHBvc1NtYWxsZXIueSArIHNpemVTbWFsbGVyLnkpKS8ocmVsVmVsKTtcbiAgICAgICAgICAgICAgICBsYXN0Q29udGFjdC55ID0gKChwb3NMYXJnZXIueSArIHNpemVMYXJnZXIueSkgLSAocG9zU21hbGxlci55IC0gc2l6ZVNtYWxsZXIueSkpLyhyZWxWZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGlkaW5nWSA9IHRydWU7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIFtmaXJzdENvbnRhY3QsIGxhc3RDb250YWN0LCBjb2xsaWRpbmdYLCBjb2xsaWRpbmdZXTtcbiAgICB9XG59IiwiaW1wb3J0IE1hdGhVdGlscyBmcm9tIFwiLi4vVXRpbHMvTWF0aFV0aWxzXCI7XG5cbi8qKlxuICogQSB0d28tZGltZW5zaW9uYWwgdmVjdG9yICh4LCB5KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWMyIHtcblxuXHQvLyBTdG9yZSB4IGFuZCB5IGluIGFuIGFycmF5XG5cdC8qKiBUaGUgYXJyYXkgdGhhdCBzdG9yZXMgdGhlIGFjdHVhbCB2ZWN0b3IgdmFsdWVzIHggYW5kIHkgKi9cblx0cHJpdmF0ZSB2ZWM6IEZsb2F0MzJBcnJheTtcblxuXHQvKipcdFxuXHQgKiBXaGVuIHRoaXMgdmVjdG9yIGNoYW5nZXMgaXRzIHZhbHVlLCBkbyBzb21ldGhpbmdcblx0ICovXG5cdHByaXZhdGUgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVmVjMlxuXHQgKiBAcGFyYW0geCBUaGUgeCB2YWx1ZSBvZiB0aGUgdmVjdG9yXG5cdCAqIEBwYXJhbSB5IFRoZSB5IHZhbHVlIG9mIHRoZSB2ZWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcblx0XHR0aGlzLnZlYyA9IG5ldyBGbG9hdDMyQXJyYXkoMik7XG5cdFx0dGhpcy52ZWNbMF0gPSB4O1xuXHRcdHRoaXMudmVjWzFdID0geTtcblx0fVxuXG5cdC8vIEV4cG9zZSB4IGFuZCB5IHdpdGggZ2V0dGVycyBhbmQgc2V0dGVyc1xuXHRnZXQgeCgpIHtcblx0XHRyZXR1cm4gdGhpcy52ZWNbMF07XG5cdH1cblxuXHRzZXQgeCh4OiBudW1iZXIpIHtcblx0XHR0aGlzLnZlY1swXSA9IHg7XG5cblx0XHRpZih0aGlzLm9uQ2hhbmdlKXtcblx0XHRcdHRoaXMub25DaGFuZ2UoKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgeSgpIHtcblx0XHRyZXR1cm4gdGhpcy52ZWNbMV07XG5cdH1cblxuXHRzZXQgeSh5OiBudW1iZXIpIHtcblx0XHR0aGlzLnZlY1sxXSA9IHk7XG5cblx0XHRpZih0aGlzLm9uQ2hhbmdlKXtcblx0XHRcdHRoaXMub25DaGFuZ2UoKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IFpFUk8oKSB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKDAsIDApO1xuXHR9XG5cblx0c3RhdGljIHJlYWRvbmx5IFpFUk9fU1RBVElDID0gbmV3IFZlYzIoMCwgMCk7XG5cblx0c3RhdGljIGdldCBJTkYoKSB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKEluZmluaXR5LCBJbmZpbml0eSk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IFVQKCkge1xuXHRcdHJldHVybiBuZXcgVmVjMigwLCAtMSk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IERPV04oKSB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKDAsIDEpO1xuXHR9XG5cblx0c3RhdGljIGdldCBMRUZUKCkge1xuXHRcdHJldHVybiBuZXcgVmVjMigtMSwgMCk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IFJJR0hUKCkge1xuXHRcdHJldHVybiBuZXcgVmVjMigxLCAwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc3F1YXJlZCBtYWduaXR1ZGUgb2YgdGhlIHZlY3Rvci4gVGhpcyB0ZW5kcyB0byBiZSBmYXN0ZXIsIHNvIHVzZSBpdCBpbiBzaXR1YXRpb25zIHdoZXJlIHRha2luZyB0aGVcblx0ICogc3F1YXJlIHJvb3QgZG9lc24ndCBtYXR0ZXIsIGxpa2UgZm9yIGNvbXBhcmluZyBkaXN0YW5jZXMuXG5cdCAqIEByZXR1cm5zIFRoZSBzcXVhcmVkIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yXG5cdCAqL1xuXHRtYWdTcSgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3IuXG5cdCAqIEByZXR1cm5zIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHZlY3Rvci5cblx0ICovXG5cdG1hZygpOiBudW1iZXIge1xuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy5tYWdTcSgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXZkZXMgeCBhbmQgeSBieSB0aGUgbWFnbml0dWRlIHRvIG9idGFpbiB0aGUgdW5pdCB2ZWN0b3IgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGlzIHZlY3Rvci5cblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3IgYXMgYSB1bml0IHZlY3Rvci5cblx0ICovXG5cdG5vcm1hbGl6ZSgpOiBWZWMyIHtcblx0XHRpZih0aGlzLnggPT09IDAgJiYgdGhpcy55ID09PSAwKSByZXR1cm4gdGhpcztcblx0XHRsZXQgbWFnID0gdGhpcy5tYWcoKTtcblx0XHR0aGlzLnggLz0gbWFnO1xuXHRcdHRoaXMueSAvPSBtYWc7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogV29ya3MgbGlrZSBub3JtYWxpemUoKSwgYnV0IHJldHVybnMgYSBuZXcgVmVjMlxuXHQgKiBAcmV0dXJucyBBIG5ldyB2ZWN0b3IgdGhhdCBpcyB0aGUgdW5pdCB2ZWN0b3IgZm9yIHRoaXMgb25lXG5cdCAqL1xuXHRub3JtYWxpemVkKCk6IFZlYzIge1xuXHRcdGlmKHRoaXMuaXNaZXJvKCkpe1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBtYWcgPSB0aGlzLm1hZygpO1xuXHRcdHJldHVybiBuZXcgVmVjMih0aGlzLngvbWFnLCB0aGlzLnkvbWFnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB4IGFuZCB5IGVsZW1lbnRzIG9mIHRoaXMgdmVjdG9yIHRvIHplcm8uXG5cdCAqIEByZXR1cm5zIFRoaXMgdmVjdG9yLCB3aXRoIHggYW5kIHkgc2V0IHRvIHplcm8uXG5cdCAqL1xuXHR6ZXJvKCk6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLnNldCgwLCAwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB2ZWN0b3IncyB4IGFuZCB5IGJhc2VkIG9uIHRoZSBhbmdsZSBwcm92aWRlZC4gR29lcyBjb3VudGVyIGNsb2Nrd2lzZS5cblx0ICogQHBhcmFtIGFuZ2xlIFRoZSBhbmdsZSBpbiByYWRpYW5zXG5cdCAqIEBwYXJhbSByYWRpdXMgVGhlIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yIGF0IHRoZSBzcGVjaWZpZWQgYW5nbGVcblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3IuXG5cdCAqL1xuXHRzZXRUb0FuZ2xlKGFuZ2xlOiBudW1iZXIsIHJhZGl1czogbnVtYmVyID0gMSk6IFZlYzIge1xuXHRcdHRoaXMueCA9IE1hdGhVdGlscy5mbG9vclRvUGxhY2UoTWF0aC5jb3MoYW5nbGUpKnJhZGl1cywgNSk7XG5cdFx0dGhpcy55ID0gTWF0aFV0aWxzLmZsb29yVG9QbGFjZSgtTWF0aC5zaW4oYW5nbGUpKnJhZGl1cywgNSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHZlY3RvciB0aGF0IHBvaW50IGZyb20gdGhpcyB2ZWN0b3IgdG8gYW5vdGhlciBvbmVcblx0ICogQHBhcmFtIG90aGVyIFRoZSB2ZWN0b3IgdG8gcG9pbnQgdG9cblx0ICogQHJldHVybnMgQSBuZXcgVmVjMiB0aGF0IHBvaW50cyBmcm9tIHRoaXMgdmVjdG9yIHRvIHRoZSBvbmUgcHJvdmlkZWRcblx0ICovXG5cdHZlY1RvKG90aGVyOiBWZWMyKTogVmVjMiB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKG90aGVyLnggLSB0aGlzLngsIG90aGVyLnkgLSB0aGlzLnkpO1xuXHR9XG5cdFxuXHQvKipcblx0ICogUmV0dXJucyBhIHZlY3RvciBjb250YWluaW5nIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGlzIHZlY3RvciB0byBhbm90aGVyXG5cdCAqIEBwYXJhbSBvdGhlciBUaGUgdmVjdG9yIHRvIHBvaW50IHRvXG5cdCAqIEByZXR1cm5zIEEgbmV3IFZlYzIgdGhhdCBwb2ludHMgZnJvbSB0aGlzIHZlY3RvciB0byB0aGUgb25lIHByb3ZpZGVkLiBUaGlzIG5ldyBWZWMyIHdpbGwgYmUgYSB1bml0IHZlY3Rvci5cblx0ICovXG5cdGRpclRvKG90aGVyOiBWZWMyKTogVmVjMiB7XG5cdFx0cmV0dXJuIHRoaXMudmVjVG8ob3RoZXIpLm5vcm1hbGl6ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEtlZXBzIHRoZSB2ZWN0b3IncyBkaXJlY3Rpb24sIGJ1dCBzZXRzIGl0cyBtYWduaXR1ZGUgdG8gYmUgdGhlIHByb3ZpZGVkIG1hZ25pdHVkZVxuXHQgKiBAcGFyYW0gbWFnbml0dWRlIFRoZSBtYWduaXR1ZGUgdGhlIHZlY3RvciBzaG91bGQgYmVcblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3Igd2l0aCBpdHMgbWFnbml0dWRlIHNldCB0byB0aGUgbmV3IG1hZ25pdHVkZVxuXHQgKi9cblx0c2NhbGVUbyhtYWduaXR1ZGU6IG51bWJlcik6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpLnNjYWxlKG1hZ25pdHVkZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2NhbGVzIHggYW5kIHkgYnkgdGhlIG51bWJlciBwcm92aWRlZCwgb3IgaWYgdHdvIG51bWJlciBhcmUgcHJvdmlkZWQsIHNjYWxlcyB0aGVtIGluZGl2aWR1YWxseS5cblx0ICogQHBhcmFtIGZhY3RvciBUaGUgc2NhbGluZyBmYWN0b3IgZm9yIHRoZSB2ZWN0b3IsIG9yIGZvciBvbmx5IHRoZSB4LWNvbXBvbmVudCBpZiB5RmFjdG9yIGlzIHByb3ZpZGVkXG5cdCAqIEBwYXJhbSB5RmFjdG9yIFRoZSBzY2FsaW5nIGZhY3RvciBmb3IgdGhlIHktY29tcG9uZW50IG9mIHRoZSB2ZWN0b3Jcblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3IgYWZ0ZXIgc2NhbGluZ1xuXHQgKi9cblx0c2NhbGUoZmFjdG9yOiBudW1iZXIsIHlGYWN0b3I6IG51bWJlciA9IG51bGwpOiBWZWMyIHtcblx0XHRpZih5RmFjdG9yICE9PSBudWxsKXtcblx0XHRcdHRoaXMueCAqPSBmYWN0b3I7XG5cdFx0XHR0aGlzLnkgKj0geUZhY3Rvcjtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHR0aGlzLnggKj0gZmFjdG9yO1xuXHRcdHRoaXMueSAqPSBmYWN0b3I7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHNjYWxlZCB2ZXJzaW9uIG9mIHRoaXMgdmVjdG9yIHdpdGhvdXQgbW9kaWZ5aW5nIGl0LlxuXHQgKiBAcGFyYW0gZmFjdG9yIFRoZSBzY2FsaW5nIGZhY3RvciBmb3IgdGhlIHZlY3Rvciwgb3IgZm9yIG9ubHkgdGhlIHgtY29tcG9uZW50IGlmIHlGYWN0b3IgaXMgcHJvdmlkZWRcblx0ICogQHBhcmFtIHlGYWN0b3IgVGhlIHNjYWxpbmcgZmFjdG9yIGZvciB0aGUgeS1jb21wb25lbnQgb2YgdGhlIHZlY3RvclxuXHQgKiBAcmV0dXJucyBBIG5ldyB2ZWN0b3IgdGhhdCBoYXMgdGhlIHZhbHVlcyBvZiB0aGlzIHZlY3RvciBhZnRlciBzY2FsaW5nXG5cdCAqL1xuXHRzY2FsZWQoZmFjdG9yOiBudW1iZXIsIHlGYWN0b3I6IG51bWJlciA9IG51bGwpOiBWZWMyIHtcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLnNjYWxlKGZhY3RvciwgeUZhY3Rvcik7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgdmVjdG9yIGNvdW50ZXItY2xvY2t3aXNlIGJ5IHRoZSBhbmdsZSBhbW91bnQgc3BlY2lmaWVkXG5cdCAqIEBwYXJhbSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIGJ5IGluIHJhZGlhbnNcblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3IgYWZ0ZXIgcm90YXRpb24uXG5cdCAqL1xuXHRyb3RhdGVDQ1coYW5nbGU6IG51bWJlcik6IFZlYzIge1xuXHRcdGxldCBjcyA9IE1hdGguY29zKGFuZ2xlKTtcblx0XHRsZXQgc24gPSBNYXRoLnNpbihhbmdsZSk7XG5cdFx0bGV0IHRlbXBYID0gdGhpcy54KmNzIC0gdGhpcy55KnNuO1xuXHRcdGxldCB0ZW1wWSA9IHRoaXMueCpzbiArIHRoaXMueSpjcztcblx0XHR0aGlzLnggPSB0ZW1wWDtcblx0XHR0aGlzLnkgPSB0ZW1wWTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB2ZWN0b3JzIGNvb3JkaW5hdGVzIHRvIGJlIHRoZSBvbmVzIHByb3ZpZGVkXG5cdCAqIEBwYXJhbSB4IFRoZSBuZXcgeCB2YWx1ZSBmb3IgdGhpcyB2ZWN0b3Jcblx0ICogQHBhcmFtIHkgVGhlIG5ldyB5IHZhbHVlIGZvciB0aGlzIHZlY3RvclxuXHQgKiBAcmV0dXJucyBUaGlzIHZlY3RvclxuXHQgKi9cblx0c2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjMiB7XG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvcGllcyB0aGUgdmFsdWVzIG9mIHRoZSBvdGhlciBWZWMyIGludG8gdGhpcyBvbmUuXG5cdCAqIEBwYXJhbSBvdGhlciBUaGUgVmVjMiB0byBjb3B5XG5cdCAqIEByZXR1cm5zIFRoaXMgdmVjdG9yIHdpdGggaXRzIHZhbHVlcyBzZXQgdG8gdGhlIHZlY3RvciBwcm92aWRlZFxuXHQgKi9cblx0Y29weShvdGhlcjogVmVjMik6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLnNldChvdGhlci54LCBvdGhlci55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHRoaXMgdmVjdG9yIHRoZSBhbm90aGVyIHZlY3RvclxuXHQgKiBAcGFyYW0gb3RoZXIgVGhlIFZlYzIgdG8gYWRkIHRvIHRoaXMgb25lXG5cdCAqIEByZXR1cm5zIFRoaXMgdmVjdG9yIGFmdGVyIGFkZGluZyB0aGUgb25lIHByb3ZpZGVkXG5cdCAqL1xuXHRhZGQob3RoZXI6IFZlYzIpOiBWZWMyIHtcblx0XHR0aGlzLnggKz0gb3RoZXIueDtcblx0XHR0aGlzLnkgKz0gb3RoZXIueTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZW1lbnRzIHRoZSBmaWVsZHMgb2YgdGhpcyB2ZWN0b3IuIEJvdGggYXJlIGluY3JlbWVudGVkIHdpdGggYSwgaWYgb25seSBhIGlzIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0gYSBUaGUgZmlyc3QgbnVtYmVyIHRvIGluY3JlbWVudCBieVxuXHQgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIG51bWJlciB0byBpbmNyZW1lbnQgYnlcblx0ICogQHJldHVybnNzIFRoaXMgdmVjdG9yIGFmdGVyIGluY3JlbWVudGluZ1xuXHQgKi9cblx0aW5jKGE6IG51bWJlciwgYj86IG51bWJlcik6IFZlYzIge1xuXHRcdGlmKGIgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLnggKz0gYTtcblx0XHRcdHRoaXMueSArPSBhO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnggKz0gYTtcblx0XHRcdHRoaXMueSArPSBiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIHZlY3RvclxuXHQgKiBAcGFyYW0gb3RoZXIgVGhlIFZlYzIgdG8gc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuXHQgKiBAcmV0dXJucyBUaGlzIHZlY3RvciBhZnRlciBzdWJ0cmFjdGluZyB0aGUgb25lIHByb3ZpZGVkXG5cdCAqL1xuXHRzdWIob3RoZXI6IFZlYzIpOiBWZWMyIHtcblx0XHR0aGlzLnggLT0gb3RoZXIueDtcblx0XHR0aGlzLnkgLT0gb3RoZXIueTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBNdWx0aXBsaWVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3IgZWxlbWVudC13aXNlLiBJbiBvdGhlciB3b3JkcywgdGhpcy54ICo9IG90aGVyLnggYW5kIHRoaXMueSAqPSBvdGhlci55XG5cdCAqIEBwYXJhbSBvdGhlciBUaGUgVmVjMiB0byBtdWx0aXBseSB0aGlzIG9uZSBieVxuXHQgKiBAcmV0dXJucyBUaGlzIHZlY3RvciBhZnRlciBtdWx0aXBseWluZyBpdHMgY29tcG9uZW50cyBieSB0aGlzIG9uZVxuXHQgKi9cblx0bXVsdChvdGhlcjogVmVjMik6IFZlYzIge1xuXHRcdHRoaXMueCAqPSBvdGhlci54O1xuXHRcdHRoaXMueSAqPSBvdGhlci55O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpdmlkZXMgdGhpcyB2ZWN0b3Igd2l0aCBhbm90aGVyIHZlY3RvciBlbGVtZW50LXdpc2UuIEluIG90aGVyIHdvcmRzLCB0aGlzLnggLz0gb3RoZXIueCBhbmQgdGhpcy55IC89IG90aGVyLnlcblx0ICogQHBhcmFtIG90aGVyIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIHRoaXMgb25lIGJ5XG5cdCAqIEByZXR1cm5zIFRoaXMgdmVjdG9yIGFmdGVyIGRpdmlzaW9uXG5cdCAqL1xuXHRkaXYob3RoZXI6IFZlYzIpOiBWZWMyIHtcblx0XHRpZihvdGhlci54ID09PSAwIHx8IG90aGVyLnkgPT09IDApIHRocm93IFwiRGl2aWRlIGJ5IHplcm8gZXJyb3JcIjtcblx0XHR0aGlzLnggLz0gb3RoZXIueDtcblx0XHR0aGlzLnkgLz0gb3RoZXIueTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBEb2VzIGFuIGVsZW1lbnQgd2lzZSByZW1haW5kZXIgb3BlcmF0aW9uIG9uIHRoaXMgdmVjdG9yLiB0aGlzLnggJT0gb3RoZXIueCBhbmQgdGhpcy55ICU9IG90aGVyLnlcblx0ICogQHBhcmFtIG90aGVyIFRoZSBvdGhlciB2ZWN0b3Jcblx0ICogQHJldHVybnMgdGhpcyB2ZWN0b3Jcblx0ICovXG5cdHJlbWFpbmRlcihvdGhlcjogVmVjMik6IFZlYzIge1xuXHRcdHRoaXMueCA9IHRoaXMueCAlIG90aGVyLng7XG5cdFx0dGhpcy55ID0gdGhpcy55ICUgb3RoZXIueTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgdmVjdG9yXG5cdCAqIEBwYXJhbSBvdGhlciBUaGUgdmVjdG9yIHRvIGNvbXB1dGUgZGlzdGFuY2Ugc3F1YXJlZCB0b1xuXHQgKiBAcmV0dXJucyBUaGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCB0aGUgb25lIHByb3ZpZGVkXG5cdCAqL1xuXHRkaXN0YW5jZVNxVG8ob3RoZXI6IFZlYzIpOiBudW1iZXIge1xuXHRcdHJldHVybiAodGhpcy54IC0gb3RoZXIueCkqKHRoaXMueCAtIG90aGVyLngpICsgKHRoaXMueSAtIG90aGVyLnkpKih0aGlzLnkgLSBvdGhlci55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3RvclxuXHQgKiBAcGFyYW0gb3RoZXIgVGhlIHZlY3RvciB0byBjb21wdXRlIGRpc3RhbmNlIHRvXG5cdCAqIEByZXR1cm5zIFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCB0aGUgb25lIHByb3ZpZGVkXG5cdCAqL1xuXHRkaXN0YW5jZVRvKG90aGVyOiBWZWMyKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcVRvKG90aGVyKSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcblx0ICogQHBhcmFtIG90aGVyIFRoZSB2ZWN0b3IgdG8gY29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgd2l0aFxuXHQgKiBAcmV0dXJucyBUaGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIHRoZSBvbmUgcHJvdmlkZWQuXG5cdCAqL1xuXHRkb3Qob3RoZXI6IFZlYzIpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLngqb3RoZXIueCArIHRoaXMueSpvdGhlci55O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGFuZ2xlIGNvdW50ZXItY2xvY2t3aXNlIGluIHJhZGlhbnMgZnJvbSB0aGlzIHZlY3RvciB0byBhbm90aGVyIHZlY3RvclxuXHQgKiBAcGFyYW0gb3RoZXIgVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBhbmdsZSB0b1xuXHQgKiBAcmV0dXJucyBUaGUgYW5nbGUsIHJvdGF0aW5nIENDVywgZnJvbSB0aGlzIHZlY3RvciB0byB0aGUgb3RoZXIgdmVjdG9yXG5cdCAqL1xuXHRhbmdsZVRvQ0NXKG90aGVyOiBWZWMyKTogbnVtYmVyIHtcblx0XHRsZXQgZG90ID0gdGhpcy5kb3Qob3RoZXIpO1xuXHRcdGxldCBkZXQgPSB0aGlzLngqb3RoZXIueSAtIHRoaXMueSpvdGhlci54O1xuXHRcdGxldCBhbmdsZSA9IC1NYXRoLmF0YW4yKGRldCwgZG90KTtcblxuXHRcdGlmKGFuZ2xlIDwgMCl7XG5cdFx0XHRhbmdsZSArPSAyKk1hdGguUEk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFuZ2xlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB2ZWN0b3Igcm91bmRlZCB0byAxIGRlY2ltYWwgcG9pbnRcblx0ICogQHJldHVybnMgVGhpcyB2ZWN0b3IgYXMgYSBzdHJpbmdcblx0ICovXG5cdHRvU3RyaW5nKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudG9GaXhlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB2ZWN0b3Igcm91bmRlZCB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkZWNpbWFsIHBvaW50c1xuXHQgKiBAcGFyYW0gbnVtRGVjaW1hbFBvaW50cyBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcG9pbnRzIHRvIGNyZWF0ZSBhIHN0cmluZyB0b1xuXHQgKiBAcmV0dXJucyBUaGlzIHZlY3RvciBhcyBhIHN0cmluZ1xuXHQgKi9cblx0dG9GaXhlZChudW1EZWNpbWFsUG9pbnRzOiBudW1iZXIgPSAxKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gXCIoXCIgKyB0aGlzLngudG9GaXhlZChudW1EZWNpbWFsUG9pbnRzKSArIFwiLCBcIiArIHRoaXMueS50b0ZpeGVkKG51bURlY2ltYWxQb2ludHMpICsgXCIpXCI7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyB2ZWN0b3Igd2l0aCB0aGUgc2FtZSBjb29yZGluYXRlcyBhcyB0aGlzIG9uZS5cblx0ICogQHJldHVybnMgQSBuZXcgVmVjMiB3aXRoIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGlzIG9uZVxuXHQgKi9cblx0Y2xvbmUoKTogVmVjMiB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKHRoaXMueCwgdGhpcy55KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgYW5kIG90aGVyIGhhdmUgdGhlIEVYQUNUIHNhbWUgeCBhbmQgeSAobm90IGFzc3VyZWQgdG8gYmUgc2FmZSBmb3IgZmxvYXRzKVxuXHQgKiBAcGFyYW0gb3RoZXIgVGhlIHZlY3RvciB0byBjaGVjayBhZ2FpbnN0XG5cdCAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgdGhlIGVxdWFsaXR5IG9mIHRoZSB0d28gdmVjdG9yc1xuXHQgKi9cblx0c3RyaWN0RXF1YWxzKG90aGVyOiBWZWMyKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoaXMgdmVjdG9yIGFuZCBvdGhlciBoYXZlIHRoZSBzYW1lIHggYW5kIHlcblx0ICogQHBhcmFtIG90aGVyIFRoZSB2ZWN0b3IgdG8gY2hlY2sgYWdhaW5zdFxuXHQgKiBAcmV0dXJucyBBIGJvb2xlYW4gcmVwcmVzZW50aW5nIHRoZSBlcXVhbGl0eSBvZiB0aGUgdHdvIHZlY3RvcnNcblx0ICovXG5cdGVxdWFscyhvdGhlcjogVmVjMik6IGJvb2xlYW4ge1xuXHRcdGxldCB4RXEgPSBNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KSA8IDAuMDAwMDAwMTtcblx0XHRsZXQgeUVxID0gTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSkgPCAwLjAwMDAwMDE7XG5cblx0XHRyZXR1cm4geEVxICYmIHlFcTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgdGhlIHplcm8gdmVjdG9yIGV4YWN0bHkgKG5vdCBhc3N1cmVkIHRvIGJlIHNhZmUgZm9yIGZsb2F0cykuXG5cdCAqIEByZXR1cm5zIEEgYm9vbGVhbiByZXByZXNlbnRpbmcgdGhlIGVxdWFsaXR5IG9mIHRoaXMgdmVjdG9yIGFuZCB0aGUgemVybyB2ZWN0b3Jcblx0ICovXG5cdHN0cmljdElzWmVybygpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB4IGFuZCB5IGZvciB0aGlzIHZlY3RvciBhcmUgYm90aCB6ZXJvLlxuXHQgKiBAcmV0dXJucyBBIGJvb2xlYW4gcmVwcmVzZW50aW5nIHRoZSBlcXVhbGl0eSBvZiB0aGlzIHZlY3RvciBhbmQgdGhlIHplcm8gdmVjdG9yXG5cdCAqL1xuXHRpc1plcm8oKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHRoaXMueCkgPCAwLjAwMDAwMDEgJiYgTWF0aC5hYnModGhpcy55KSA8IDAuMDAwMDAwMTtcblx0fVxuXHRcblx0LyoqXG5cdCAqIFNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW5ldmVyIHRoaXMgdmVjdG9yIGlzIGNoYW5nZWQuXG5cdCAqIEBwYXJhbSBmIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWRcblx0ICovXG5cdHNldE9uQ2hhbmdlKGY6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdFx0dGhpcy5vbkNoYW5nZSA9IGY7XG5cdH1cblxuXHR0b0FycmF5KCk6IEZsb2F0MzJBcnJheSB7XG5cdFx0cmV0dXJuIHRoaXMudmVjO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm1zIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlY3RvcnNcblx0ICogQHBhcmFtIGEgVGhlIGZpcnN0IHZlY3RvclxuXHQgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZlY3RvclxuXHQgKiBAcGFyYW0gdCBUaGUgdGltZSBvZiB0aGUgbGVycCwgd2l0aCAwIGJlaW5nIHZlY3RvciBBLCBhbmQgMSBiZWluZyB2ZWN0b3IgQlxuXHQgKiBAcmV0dXJucyBBIG5ldyBWZWMyIHJlcHJlc2VudGluZyB0aGUgbGVycCBiZXR3ZWVuIHZlY3RvciBhIGFuZCBiLlxuXHQgKi9cblx0c3RhdGljIGxlcnAoYTogVmVjMiwgYjogVmVjMiwgdDogbnVtYmVyKTogVmVjMiB7XG5cdFx0cmV0dXJuIG5ldyBWZWMyKE1hdGhVdGlscy5sZXJwKGEueCwgYi54LCB0KSwgTWF0aFV0aWxzLmxlcnAoYS55LCBiLnksIHQpKTtcblx0fVxufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IEdhbWVOb2RlIGZyb20gXCIuLi9Ob2Rlcy9HYW1lTm9kZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9VdGlscy9Db2xvclwiO1xuXG4vKipcbiAqIEEgdXRpbCBjbGFzcyBmb3IgcmVuZGVyaW5nIERlYnVnIG1lc3NhZ2VzIHRvIHRoZSBjYW52YXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYnVnIHtcblxuXHQvKiogQSBtYXAgb2YgbG9nIG1lc3NhZ2VzIHRvIGRpc3BsYXkgb24gdGhlIHNjcmVlbiAqLyBcblx0cHJpdmF0ZSBzdGF0aWMgbG9nTWVzc2FnZXM6IE1hcDxzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG5cdC8qKiBBbiBhcnJheSBvZiBnYW1lIG5vZGVzIHRvIHJlbmRlciBkZWJ1ZyBpbmZvIGZvciAqL1xuXHRwcml2YXRlIHN0YXRpYyBub2RlczogQXJyYXk8R2FtZU5vZGU+O1xuXG5cdC8qKiBUaGUgcmVuZGVyaW5nIGNvbnRleHQgZm9yIGFueSBkZWJ1ZyBtZXNzYWdlcyAqL1xuXHRwcml2YXRlIHN0YXRpYyBkZWJ1Z1JlbmRlcmluZ0NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuXHQvKipcdFRoZSBzaXplIG9mIHRoZSBkZWJ1ZyBjYW52YXMgKi9cblx0cHJpdmF0ZSBzdGF0aWMgZGVidWdDYW52YXNTaXplOiBWZWMyO1xuXG5cdC8qKiBUaGUgcmVuZGVyaW5nIGNvbG9yIGZvciB0ZXh0ICovXG5cdHByaXZhdGUgc3RhdGljIGRlZmF1bHRUZXh0Q29sb3I6IENvbG9yID0gQ29sb3IuV0hJVEU7XG5cblx0LyoqXG5cdCAqIEFkZCBhIG1lc3NhZ2UgdG8gZGlzcGxheSBvbiB0aGUgZGVidWcgc2NyZWVuXG5cdCAqIEBwYXJhbSBpZCBBIHVuaXF1ZSBJRCBmb3IgdGhpcyBtZXNzYWdlXG5cdCAqIEBwYXJhbSBtZXNzYWdlcyBUaGUgbWVzc2FnZXMgdG8gcHJpbnQgdG8gdGhlIGRlYnVnIHNjcmVlblxuXHQgKi9cblx0c3RhdGljIGxvZyhpZDogc3RyaW5nLCAuLi5tZXNzYWdlczogYW55KTogdm9pZCB7XG5cdFx0Ly8gbGV0IG1lc3NhZ2UgPSBcIlwiO1xuXHRcdC8vIGZvcihsZXQgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKyl7XG5cdFx0Ly8gXHRtZXNzYWdlICs9IG1lc3NhZ2VzW2ldLnRvU3RyaW5nKCk7XG5cdFx0Ly8gfVxuXHRcdC8vIEpvaW4gYWxsIG1lc3NhZ2VzIHdpdGggc3BhY2VzXG5cdFx0bGV0IG1lc3NhZ2UgPSBtZXNzYWdlcy5tYXAoKG06IGFueSkgPT4gbS50b1N0cmluZygpKS5qb2luKFwiIFwiKTtcblx0XHR0aGlzLmxvZ01lc3NhZ2VzLmFkZChpZCwgbWVzc2FnZSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVsZXRlcyBhIGEga2V5IGZyb20gdGhlIGxvZyBhbmQgc3RvcHMgaXQgZnJvbSBrZWVwaW5nIHVwIHNwYWNlIG9uIHRoZSBzY3JlZW5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgbG9nIGl0ZW0gdG8gY2xlYXJcblx0ICovXG5cdHN0YXRpYyBjbGVhckxvZ0l0ZW0oaWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMubG9nTWVzc2FnZXMuZGVsZXRlKGlkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBsaXN0IG9mIG5vZGVzIHRvIHJlbmRlciB3aXRoIHRoZSBkZWJ1Z2dlclxuXHQgKiBAcGFyYW0gbm9kZXMgVGhlIG5ldyBsaXN0IG9mIG5vZGVzXG5cdCAqL1xuXHRzdGF0aWMgc2V0Tm9kZXMobm9kZXM6IEFycmF5PEdhbWVOb2RlPik6IHZvaWQge1xuXHRcdHRoaXMubm9kZXMgPSBub2Rlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBEcmF3cyBhIGJveCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uXG5cdCAqIEBwYXJhbSBjZW50ZXIgVGhlIGNlbnRlciBvZiB0aGUgYm94XG5cdCAqIEBwYXJhbSBoYWxmU2l6ZSBUaGUgZGltZW5zaW9ucyBvZiB0aGUgYm94XG5cdCAqIEBwYXJhbSBmaWxsZWQgQSBib29sZWFuIGZvciB3aGV0aGVyIG9yIG5vdCB0aGUgYm94IGlzIGZpbGxlZFxuXHQgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSBib3ggdG8gZHJhd1xuXHQgKi9cblx0c3RhdGljIGRyYXdCb3goY2VudGVyOiBWZWMyLCBoYWxmU2l6ZTogVmVjMiwgZmlsbGVkOiBib29sZWFuLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcblx0XHRsZXQgYWxwaGEgPSB0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5nbG9iYWxBbHBoYTtcblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5nbG9iYWxBbHBoYSA9IGNvbG9yLmE7XG5cblx0XHRpZihmaWxsZWQpe1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuZmlsbFN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcblx0XHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmZpbGxSZWN0KGNlbnRlci54IC0gaGFsZlNpemUueCwgY2VudGVyLnkgLSBoYWxmU2l6ZS55LCBoYWxmU2l6ZS54KjIsIGhhbGZTaXplLnkqMik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBsaW5lV2lkdGggPSAyO1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuc3Ryb2tlUmVjdChjZW50ZXIueCAtIGhhbGZTaXplLngsIGNlbnRlci55IC0gaGFsZlNpemUueSwgaGFsZlNpemUueCoyLCBoYWxmU2l6ZS55KjIpO1xuXHRcdH1cblxuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0Lmdsb2JhbEFscGhhID0gYWxwaGE7XG5cdH1cblxuXHQvKipcblx0ICogRHJhd3MgYSBjaXJjbGUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvblxuXHQgKiBAcGFyYW0gY2VudGVyIFRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZVxuXHQgKiBAcGFyYW0gcmFkaXVzIFRoZSBkaW1lbnNpb25zIG9mIHRoZSBib3hcblx0ICogQHBhcmFtIGZpbGxlZCBBIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90IHRoZSBjaXJjbGUgaXMgZmlsbGVkXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIGNpcmNsZVxuXHQgKi9cblx0c3RhdGljIGRyYXdDaXJjbGUoY2VudGVyOiBWZWMyLCByYWRpdXM6IG51bWJlciwgZmlsbGVkOiBib29sZWFuLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcblx0XHRsZXQgYWxwaGEgPSB0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5nbG9iYWxBbHBoYTtcblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5nbG9iYWxBbHBoYSA9IGNvbG9yLmE7XG5cblx0XHRpZihmaWxsZWQpe1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuZmlsbFN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcblx0XHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5jbG9zZVBhdGgoKTtcblx0XHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmZpbGwoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGxpbmVXaWR0aCA9IDI7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yLnRvU3RyaW5nKCk7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmFyYyhjZW50ZXIueCwgY2VudGVyLnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuXHRcdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuY2xvc2VQYXRoKCk7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5zdHJva2UoKTtcblx0XHR9XG5cblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5nbG9iYWxBbHBoYSA9IGFscGhhO1xuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgcmF5IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb25cblx0ICogQHBhcmFtIGZyb20gVGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSByYXlcblx0ICogQHBhcmFtIHRvIFRoZSBlbmRpbmcgcG9zaXRpb24gb2YgdGhlIHJheVxuXHQgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSByYXlcblx0ICovXG5cdHN0YXRpYyBkcmF3UmF5KGZyb206IFZlYzIsIHRvOiBWZWMyLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5saW5lV2lkdGggPSAyO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3IudG9TdHJpbmcoKTtcblxuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0Lm1vdmVUbyhmcm9tLngsIGZyb20ueSk7XG5cdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQubGluZVRvKHRvLngsIHRvLnkpO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmNsb3NlUGF0aCgpO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LnN0cm9rZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdzIGEgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvblxuXHQgKiBAcGFyYW0gcG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnRcblx0ICogQHBhcmFtIGNvbG9yIFRoZSBjb2xvciBvZiB0aGUgcG9pbnRcblx0ICovXG5cdHN0YXRpYyBkcmF3UG9pbnQocG9zOiBWZWMyLCBjb2xvcjogQ29sb3IpOiB2b2lkIHtcblx0XHRsZXQgcG9pbnRTaXplID0gNjtcblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5maWxsU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmZpbGxSZWN0KHBvcy54IC0gcG9pbnRTaXplLzIsIHBvcy55IC0gcG9pbnRTaXplLzIsIHBvaW50U2l6ZSwgcG9pbnRTaXplKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBjb2xvciBmb3IgdGV4dCBmb3IgdGhlIGRlYnVnZ2VyXG5cdCAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3IgdG8gcmVuZGVyIHRoZSB0ZXh0XG5cdCAqL1xuXHRzdGF0aWMgc2V0RGVmYXVsdFRleHRDb2xvcihjb2xvcjogQ29sb3IpOiB2b2lkIHtcblx0XHR0aGlzLmRlZmF1bHRUZXh0Q29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtcyBhbnkgbmVjZXNzYXJ5IHNldHVwIG9wZXJhdGlvbnMgb24gdGhlIERlYnVnIGNhbnZhc1xuXHQgKiBAcGFyYW0gY2FudmFzIFRoZSBkZWJ1ZyBjYW52YXNcblx0ICogQHBhcmFtIHdpZHRoIFRoZSBkZXNpcmVkIHdpZHRoIG9mIHRoZSBjYW52YXNcblx0ICogQHBhcmFtIGhlaWdodCBUaGUgZGVzaXJlZCBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuXHQgKiBAcmV0dXJucyBUaGUgcmVuZGVyaW5nIGNvbnRleHQgZXh0cmFjdGVkIGZyb20gdGhlIGNhbnZhc1xuXHQgKi9cblx0c3RhdGljIGluaXRpYWxpemVEZWJ1Z0NhbnZhcyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuXHRcdGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0XG5cdFx0dGhpcy5kZWJ1Z0NhbnZhc1NpemUgPSBuZXcgVmVjMih3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0O1xuXHR9XG5cblx0LyoqIENsZWFycyB0aGUgZGVidWcgY2FudmFzICovXG5cdHN0YXRpYyBjbGVhckNhbnZhcygpOiB2b2lkIHtcblx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5kZWJ1Z0NhbnZhc1NpemUueCwgdGhpcy5kZWJ1Z0NhbnZhc1NpemUueSk7XG5cdH1cblxuXHQvKiogUmVuZGVycyB0aGUgdGV4dCBhbmQgbm9kZXMgc2VudCB0byB0aGUgRGVidWcgc3lzdGVtICovXG5cdHN0YXRpYyByZW5kZXIoKTogdm9pZCB7XG5cdFx0dGhpcy5yZW5kZXJUZXh0KCk7XG5cdFx0dGhpcy5yZW5kZXJOb2RlcygpO1xuXHR9XG5cblx0LyoqIFJlbmRlcnMgdGhlIHRleHQgc2VudCB0byB0aGUgRGVidWcgY2FudmFzICovXG5cdHN0YXRpYyByZW5kZXJUZXh0KCk6IHZvaWQge1xuXHRcdGxldCB5ID0gMjA7XG5cdFx0dGhpcy5kZWJ1Z1JlbmRlcmluZ0NvbnRleHQuZm9udCA9IFwiMjBweCBBcmlhbFwiO1xuXHRcdHRoaXMuZGVidWdSZW5kZXJpbmdDb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZGVmYXVsdFRleHRDb2xvci50b1N0cmluZygpO1xuXG5cdFx0Ly8gRHJhdyBhbGwgb2YgdGhlIHRleHRcblx0XHR0aGlzLmxvZ01lc3NhZ2VzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG5cdFx0XHR0aGlzLmRlYnVnUmVuZGVyaW5nQ29udGV4dC5maWxsVGV4dCh0aGlzLmxvZ01lc3NhZ2VzLmdldChrZXkpLCAxMCwgeSlcblx0XHRcdHkgKz0gMzA7XHRcblx0XHR9KTtcblx0fVxuXG5cdC8qKiBSZW5kZXJzIHRoZSBub2RlcyByZWdpc3RlcmVkIHdpdGggdGhlIGRlYnVnIGNhbnZhcyAqL1xuXHRzdGF0aWMgcmVuZGVyTm9kZXMoKTogdm9pZCB7XG5cdFx0aWYodGhpcy5ub2Rlcyl7XG5cdFx0XHR0aGlzLm5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG5cdFx0XHRcdG5vZGUuZGVidWdSZW5kZXIoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBDb2xvciBmcm9tIFwiLi4vVXRpbHMvQ29sb3JcIjtcblxuLy8gQGlnbm9yZVBhZ2VcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzIGV4dGVuZHMgT2JqZWN0IHtcbiAgICAvLyBUaGUgZnBzIG9mIHRoZSBnYW1lLlxuICAgIHByaXZhdGUgc3RhdGljIHByZXZmcHM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTlVNX1BPSU5UUzogbnVtYmVyID0gNjA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBzdGF0aWMgQ0FOVkFTX1dJRFRIOiBudW1iZXIgPSAzMDA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgQ0FOVkFTX0hFSUdIVDogbnVtYmVyID0gMzAwO1xuICAgIHByaXZhdGUgc3RhdGljIHN0YXRzRGl2OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHN0YXRpYyBncmFwaENob2ljZXM6IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgLy8gUXVhZHRyZWUgc3RhdHNcbiAgICBwcml2YXRlIHN0YXRpYyBwcmV2Q2xlYXJUaW1lczogQXJyYXk8bnVtYmVyPjtcbiAgICBwcml2YXRlIHN0YXRpYyBTR0NsZWFyVGltZXM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXZnU0dDbGVhclRpbWU6IG51bWJlcjtcblxuICAgIHByaXZhdGUgc3RhdGljIHByZXZGaWxsVGltZXM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgU0dGaWxsVGltZXM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXZnU0dGaWxsVGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJldlVwZGF0ZVRpbWVzOiBBcnJheTxudW1iZXI+O1xuICAgIHByaXZhdGUgc3RhdGljIFNHVXBkYXRlVGltZXM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXZnU0dVcGRhdGVUaW1lOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBwcmV2UXVlcnlUaW1lczogQXJyYXk8bnVtYmVyPjtcbiAgICBwcml2YXRlIHN0YXRpYyBTR1F1ZXJ5VGltZXM6IEFycmF5PG51bWJlcj47XG4gICAgcHJpdmF0ZSBzdGF0aWMgYXZnU0dRdWVyeVRpbWU6IG51bWJlcjtcblxuICAgIHN0YXRpYyBpbml0U3RhdHMoKTogdm9pZCB7XG4gICAgICAgIGxldCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1jYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuQ0FOVkFTX1dJRFRIO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy5zdGF0c0RpdiA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWRpc3BsYXlcIik7XG5cbiAgICAgICAgdGhpcy5wcmV2ZnBzID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5wcmV2Q2xlYXJUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLlNHQ2xlYXJUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmF2Z1NHQ2xlYXJUaW1lID0gMDtcblxuICAgICAgICB0aGlzLnByZXZGaWxsVGltZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5TR0ZpbGxUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmF2Z1NHRmlsbFRpbWUgPSAwO1xuXG4gICAgICAgIHRoaXMucHJldlVwZGF0ZVRpbWVzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuU0dVcGRhdGVUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmF2Z1NHVXBkYXRlVGltZSA9IDA7XG5cbiAgICAgICAgdGhpcy5wcmV2UXVlcnlUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLlNHUXVlcnlUaW1lcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmF2Z1NHUXVlcnlUaW1lID0gMDtcblxuICAgICAgICBsZXQgY2xlYXJUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNsZWFyVGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNnY2xlYXJcIik7XG4gICAgICAgIGxldCBmaWxsVGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBmaWxsVGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNnZmlsbFwiKTtcbiAgICAgICAgbGV0IHVwZGF0ZVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgdXBkYXRlVGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNndXBkYXRlXCIpO1xuICAgICAgICBsZXQgcXVlcnlUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHF1ZXJ5VGltZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNncXVlcnlcIik7XG4gICAgICAgIGxldCBicjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgIGxldCBicjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgIGxldCBicjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG5cbiAgICAgICAgdGhpcy5zdGF0c0Rpdi5hcHBlbmQoY2xlYXJUaW1lLCBicjEsIGZpbGxUaW1lLCBicjIsIHVwZGF0ZVRpbWUsIGJyMywgcXVlcnlUaW1lKTtcblxuICAgICAgICB0aGlzLmdyYXBoQ2hvaWNlcyA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJ0LW9wdGlvblwiKTtcbiAgICAgICAgbGV0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICBvcHRpb24xLnZhbHVlID0gXCJwcmV2ZnBzXCI7XG4gICAgICAgIG9wdGlvbjEubGFiZWwgPSBcIkZQU1wiO1xuICAgICAgICBsZXQgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbjIudmFsdWUgPSBcInByZXZDbGVhclRpbWVzXCI7XG4gICAgICAgIG9wdGlvbjIubGFiZWwgPSBcIkNsZWFyIFRpbWVcIjtcbiAgICAgICAgbGV0IG9wdGlvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICBvcHRpb24zLnZhbHVlID0gXCJwcmV2RmlsbFRpbWVzXCI7XG4gICAgICAgIG9wdGlvbjMubGFiZWwgPSBcIkZpbGwgdGltZVwiO1xuICAgICAgICBsZXQgb3B0aW9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbjQudmFsdWUgPSBcInByZXZVcGRhdGVUaW1lc1wiO1xuICAgICAgICBvcHRpb240LmxhYmVsID0gXCJVcGRhdGUgdGltZVwiO1xuICAgICAgICBsZXQgb3B0aW9uNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbjUudmFsdWUgPSBcInByZXZRdWVyeVRpbWVzXCI7XG4gICAgICAgIG9wdGlvbjUubGFiZWwgPSBcIlF1ZXJ5IFRpbWVcIjtcbiAgICAgICAgbGV0IG9wdGlvbkFsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbkFsbC52YWx1ZSA9IFwiYWxsXCI7XG4gICAgICAgIG9wdGlvbkFsbC5sYWJlbCA9IFwiQWxsXCI7XG4gICAgICAgIHRoaXMuZ3JhcGhDaG9pY2VzLmFwcGVuZChvcHRpb24xLCBvcHRpb24yLCBvcHRpb24zLCBvcHRpb240LCBvcHRpb241LCBvcHRpb25BbGwpO1xuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVGUFMoZnBzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2ZnBzLnB1c2goZnBzKTtcbiAgICAgICAgaWYodGhpcy5wcmV2ZnBzLmxlbmd0aCA+IFN0YXRzLk5VTV9QT0lOVFMpe1xuICAgICAgICAgICAgdGhpcy5wcmV2ZnBzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLlNHQ2xlYXJUaW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucHJldkNsZWFyVGltZXMucHVzaCh0aGlzLmF2Z1NHQ2xlYXJUaW1lKTtcbiAgICAgICAgICAgIGlmKHRoaXMucHJldkNsZWFyVGltZXMubGVuZ3RoID4gdGhpcy5OVU1fUE9JTlRTKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZDbGVhclRpbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5TR0ZpbGxUaW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucHJldkZpbGxUaW1lcy5wdXNoKHRoaXMuYXZnU0dGaWxsVGltZSk7XG4gICAgICAgICAgICBpZih0aGlzLnByZXZGaWxsVGltZXMubGVuZ3RoID4gdGhpcy5OVU1fUE9JTlRTKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZGaWxsVGltZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLlNHVXBkYXRlVGltZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB0aGlzLnByZXZVcGRhdGVUaW1lcy5wdXNoKHRoaXMuYXZnU0dVcGRhdGVUaW1lKTtcbiAgICAgICAgICAgIGlmKHRoaXMucHJldlVwZGF0ZVRpbWVzLmxlbmd0aCA+IHRoaXMuTlVNX1BPSU5UUyl7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2VXBkYXRlVGltZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLlNHUXVlcnlUaW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucHJldlF1ZXJ5VGltZXMucHVzaCh0aGlzLmF2Z1NHUXVlcnlUaW1lKTtcbiAgICAgICAgICAgIGlmKHRoaXMucHJldlF1ZXJ5VGltZXMubGVuZ3RoID4gdGhpcy5OVU1fUE9JTlRTKXtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZRdWVyeVRpbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVNHU3RhdHMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYoa2V5ID09PSBcInNnY2xlYXJcIil7XG4gICAgICAgICAgICB0aGlzLlNHQ2xlYXJUaW1lcy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgaWYodGhpcy5TR0NsZWFyVGltZXMubGVuZ3RoID4gMTAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLlNHQ2xlYXJUaW1lcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoa2V5ID09PSBcInNnZmlsbFwiKXtcbiAgICAgICAgICAgIHRoaXMuU0dGaWxsVGltZXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgIGlmKHRoaXMuU0dGaWxsVGltZXMubGVuZ3RoID4gMTAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLlNHRmlsbFRpbWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihrZXkgPT09IFwic2d1cGRhdGVcIil7XG4gICAgICAgICAgICB0aGlzLlNHVXBkYXRlVGltZXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgIGlmKHRoaXMuU0dVcGRhdGVUaW1lcy5sZW5ndGggPiAxMDApe1xuICAgICAgICAgICAgICAgIHRoaXMuU0dVcGRhdGVUaW1lcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoa2V5ID09PSBcInNncXVlcnlcIil7XG4gICAgICAgICAgICB0aGlzLlNHUXVlcnlUaW1lcy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgaWYodGhpcy5TR1F1ZXJ5VGltZXMubGVuZ3RoID4gMTAwMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5TR1F1ZXJ5VGltZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gRGlzcGxheSBzdGF0c1xuICAgICAgICB0aGlzLmRyYXdDaGFydHMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZHJhd0NoYXJ0cygpe1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5DQU5WQVNfV0lEVEgsIHRoaXMuQ0FOVkFTX0hFSUdIVCk7XG5cbiAgICAgICAgbGV0IHBhcmFtU3RyaW5nID0gdGhpcy5ncmFwaENob2ljZXMudmFsdWU7XG5cbiAgICAgICAgaWYocGFyYW1TdHJpbmcgPT09IFwicHJldmZwc1wiIHx8IHBhcmFtU3RyaW5nID09PSBcImFsbFwiKXtcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IHRoaXMucHJldmZwcztcbiAgICAgICAgICAgIGxldCBjb2xvciA9IENvbG9yLkJMVUUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KHBhcmFtLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGFyYW1TdHJpbmcgPT09IFwicHJldkNsZWFyVGltZXNcIiB8fCBwYXJhbVN0cmluZyA9PT0gXCJhbGxcIil7XG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLnByZXZDbGVhclRpbWVzO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gQ29sb3IuUkVELnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdDaGFydChwYXJhbSwgY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBhcmFtU3RyaW5nID09PSBcInByZXZGaWxsVGltZXNcIiB8fCBwYXJhbVN0cmluZyA9PT0gXCJhbGxcIil7XG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLnByZXZGaWxsVGltZXM7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBDb2xvci5HUkVFTi50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kcmF3Q2hhcnQocGFyYW0sIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwYXJhbVN0cmluZyA9PT0gXCJwcmV2VXBkYXRlVGltZXNcIiB8fCBwYXJhbVN0cmluZyA9PT0gXCJhbGxcIil7XG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLnByZXZVcGRhdGVUaW1lcztcbiAgICAgICAgICAgIGxldCBjb2xvciA9IENvbG9yLkNZQU4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0NoYXJ0KHBhcmFtLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGFyYW1TdHJpbmcgPT09IFwicHJldlF1ZXJ5VGltZXNcIiB8fCBwYXJhbVN0cmluZyA9PT0gXCJhbGxcIil7XG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLnByZXZRdWVyeVRpbWVzO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gQ29sb3IuT1JBTkdFLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdDaGFydChwYXJhbSwgY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGRyYXdDaGFydChwYXJhbTogQXJyYXk8bnVtYmVyPiwgY29sb3I6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gQ29sb3IuQkxBQ0sudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbygxMCwgMTApO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oMTAsIHRoaXMuQ0FOVkFTX0hFSUdIVCAtIDEwKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKDEwLCB0aGlzLkNBTlZBU19IRUlHSFQgLSAxMCk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLkNBTlZBU19XSURUSCAtIDEwLCB0aGlzLkNBTlZBU19IRUlHSFQgLSAxMCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcblxuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgoLi4ucGFyYW0pO1xuICAgICAgICBsZXQgcHJldlggPSAxMDtcbiAgICAgICAgbGV0IHByZXZZID0gdGhpcy5DQU5WQVNfSEVJR0hUIC0gMTAgLSBwYXJhbVswXS9tYXgqKHRoaXMuQ0FOVkFTX0hFSUdIVC0yMCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHBhcmFtLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBmcHMgPSBwYXJhbVtpXTtcbiAgICAgICAgICAgIGxldCB4ID0gMTAgKyBpKih0aGlzLkNBTlZBU19XSURUSCAtIDIwKS90aGlzLk5VTV9QT0lOVFM7XG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuQ0FOVkFTX0hFSUdIVCAtIDEwIC0gZnBzL21heCoodGhpcy5DQU5WQVNfSEVJR0hULTIwKVxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocHJldlgsIHByZXZZKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgIHByZXZYID0geDtcbiAgICAgICAgICAgIHByZXZZID0geTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVTR1N0YXRzKCl7XG4gICAgICAgIGlmKHRoaXMuU0dDbGVhclRpbWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGhpcy5hdmdTR0NsZWFyVGltZSA9IHRoaXMuU0dDbGVhclRpbWVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCkvdGhpcy5TR0NsZWFyVGltZXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5TR0ZpbGxUaW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMuYXZnU0dGaWxsVGltZSA9IHRoaXMuU0dGaWxsVGltZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsKS90aGlzLlNHRmlsbFRpbWVzLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuU0dVcGRhdGVUaW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgdGhpcy5hdmdTR1VwZGF0ZVRpbWUgPSB0aGlzLlNHVXBkYXRlVGltZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsKS90aGlzLlNHVXBkYXRlVGltZXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5TR1F1ZXJ5VGltZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB0aGlzLmF2Z1NHUXVlcnlUaW1lID0gdGhpcy5TR1F1ZXJ5VGltZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsKS90aGlzLlNHUXVlcnlUaW1lcy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNnY2xlYXJcIikuaW5uZXJIVE1MID0gXCJBdmcgU0cgY2xlYXIgdGltZTogXCIgKyB0aGlzLmF2Z1NHQ2xlYXJUaW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNnZmlsbFwiKS5pbm5lckhUTUwgPSBcIkF2ZyBTRyBmaWxsIHRpbWU6IFwiICsgdGhpcy5hdmdTR0ZpbGxUaW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNndXBkYXRlXCIpLmlubmVySFRNTCA9IFwiQXZnIFNHIHVwZGF0ZSB0aW1lOiBcIiArIHRoaXMuYXZnU0dVcGRhdGVUaW1lO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNncXVlcnlcIikuaW5uZXJIVE1MID0gXCJBdmcgU0cgcXVlcnkgdGltZTogXCIgKyB0aGlzLmF2Z1NHUXVlcnlUaW1lO1xuICAgIH1cbn0iLCJpbXBvcnQgTWFwIGZyb20gXCIuLi9EYXRhVHlwZXMvQ29sbGVjdGlvbnMvTWFwXCI7XG5pbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi9FdmVudFF1ZXVlXCI7XG5pbXBvcnQgR2FtZUV2ZW50IGZyb20gXCIuL0dhbWVFdmVudFwiO1xuXG4vKipcbiAqIEFuIGV2ZW50IGVtaXR0ZXIgb2JqZWN0IG90aGVyIHN5c3RlbXMgY2FuIHVzZSB0byBob29rIGludG8gdGhlIEV2ZW50UXVldWUuXG4gKiBQcm92aWRlcyBhbiBlYXN5IGludGVyZmFjZSBmb3IgZmlyaW5nIG9mZiBldmVudHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIge1xuXHQvKiogQSByZWZlcmVuY2UgdG8gdGhlIEV2ZW50UXVldWUgKi9cblx0cHJpdmF0ZSBldmVudFF1ZXVlOiBFdmVudFF1ZXVlO1xuXG5cdC8qKiBDcmVhdGVzIGEgbmV3IEVtaXR0ZXIgKi9cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLmV2ZW50UXVldWUgPSBFdmVudFF1ZXVlLmdldEluc3RhbmNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRW1pdCBhbmQgZXZlbnQgb2YgdHlwZSBldmVudFR5cGUgd2l0aCB0aGUgZGF0YSBwYWNrZXQgZGF0YVxuXHQgKiBAcGFyYW0gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBmaXJlIG9mZlxuXHQgKiBAcGFyYW0gZGF0YSBBIEByZWZlcmVuY2VbTWFwXSBvciByZWNvcmQgY29udGFpbmluZyBhbnkgZGF0YSBhYm91dCB0aGUgZXZlbnRcblx0ICovXG5cdGZpcmVFdmVudChldmVudFR5cGU6IHN0cmluZywgZGF0YTogTWFwPGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0gbnVsbCk6IHZvaWQge1xuXHRcdHRoaXMuZXZlbnRRdWV1ZS5hZGRFdmVudChuZXcgR2FtZUV2ZW50KGV2ZW50VHlwZSwgZGF0YSkpO1xuXHR9XG59IiwiaW1wb3J0IFF1ZXVlIGZyb20gXCIuLi9EYXRhVHlwZXMvQ29sbGVjdGlvbnMvUXVldWVcIjtcbmltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBHYW1lRXZlbnQgZnJvbSBcIi4vR2FtZUV2ZW50XCI7XG5pbXBvcnQgUmVjZWl2ZXIgZnJvbSBcIi4vUmVjZWl2ZXJcIjtcbmltcG9ydCB7IEdhbWVFdmVudFR5cGUgfSBmcm9tIFwiLi9HYW1lRXZlbnRUeXBlXCI7XG5cbi8qKlxuICogVGhlIG1haW4gZXZlbnQgc3lzdGVtIG9mIHRoZSBnYW1lIGVuZ2luZS5cbiAqIEV2ZW50cyBhcmUgc2VudCB0byB0aGUgRXZlbnRRdWV1ZSwgd2hpY2ggaGFuZGxlcyBkaXN0cmlidXRpb24gdG8gYW55IHN5c3RlbXMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciB0aG9zZSBldmVudHMuXG4gKiBUaGlzIGFsbG93cyBmb3IgaGFuZGxpbmcgb2YgaW5wdXQgd2l0aG91dCBoYXZpbmcgY2xhc3NlcyBkaXJlY3RseSBob29rIGludG8gamF2YXNjcmlwdCBldmVudCBoYW5kbGVzLCBcbiAqIGFuZCBhbGxvd3Mgb3RoZXJ3aXNlIHNlcGFyYXRlIGNsYXNzZXMgdG8gY29tbXVuaWNhdGUgd2l0aCBlYWNoIG90aGVyIGNsZWFubHksIHN1Y2ggYXMgYSBQbGF5ZXIgb2JqZWN0IFxuICogcmVxdWVzdGluZyBhIHNvdW5kIGJlIHBsYXllZCBieSB0aGUgYXVkaW8gc3lzdGVtLlxuICogXG4gKiBUaGUgZGlzdHJpYnV0aW9uIG9mIEByZWZlcmVuY2VbR2FtZUV2ZW50XXMgaGFwcGVucyBhcyBmb2xsb3dzOlxuICogXG4gKiBFdmVudHMgYXJlIHJlY2lldmVkIHRocm91Z2hvdXQgYSBmcmFtZSBhbmQgYXJlIHF1ZXVlZCB1cCBieSB0aGUgRXZlbnRRdWV1ZS5cbiAqIEF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5leHQgZnJhbWUsIGV2ZW50cyBhcmUgc2VudCBvdXQgdG8gYW55IHJlY2VpdmVycyB0aGF0IGFyZSBob29rZWQgaW50byB0aGUgZXZlbnQgdHlwZS5cbiAqIEByZWZlcmVuY2VbUmVjZWl2ZXJdcyBhcmUgdGhlbiBmcmVlIHRvIHByb2Nlc3MgZXZlbnRzIGFzIHRoZXkgc2VlIGZpdC5cbiAqIFxuICogT3ZlcmFsbCwgdGhlIEV2ZW50UXVldWUgY2FuIGJlIGNvbnNpZGVyZWQgYXMgc29tZXRoaW5nIHNpbWlsYXIgdG8gYW4gZW1haWwgc2VydmVyLFxuICogYW5kIHRoZSBAcmVmZXJlbmNlW1JlY2VpdmVyXXMgY2FuIGJlIGNvbnNpZGVyZWQgYXMgdGhlIGNsaWVudCBpbmJveGVzLlxuICogXG4gKiBTZWUgQGxpbmsoR2FtZSBQcm9ncmFtbWluZyBQYXR0ZXJucykoaHR0cHM6Ly9nYW1lcHJvZ3JhbW1pbmdwYXR0ZXJucy5jb20vZXZlbnQtcXVldWUuaHRtbCkgZm9yIG1vcmUgZGlzY3Vzc2lvbiBvbiBFdmVudFF1ZXVlc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFF1ZXVlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRXZlbnRRdWV1ZSA9IG51bGw7XG4gICAgXG4gICAgLyoqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBldmVudHMgdmlzaWJsZSAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgTUFYX1NJWkU6IG51bWJlcjtcbiAgICBcbiAgICAvKiogVGhlIGFjdHVhbCBxdWV1ZSBvZiBldmVudHMgKi9cbiAgICBwcml2YXRlIHE6IFF1ZXVlPEdhbWVFdmVudD47XG4gICAgXG4gICAgLyoqIFRoZSBtYXAgb2YgcmVjZWl2ZXJzIHJlZ2lzdGVyZWQgZm9yIGFuIGV2ZW50IG5hbWUgKi9cblx0cHJpdmF0ZSByZWNlaXZlcnM6IE1hcDxBcnJheTxSZWNlaXZlcj4+O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLk1BWF9TSVpFID0gMjAwO1xuICAgICAgICB0aGlzLnEgPSBuZXcgUXVldWU8R2FtZUV2ZW50Pih0aGlzLk1BWF9TSVpFKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlcnMgPSBuZXcgTWFwPEFycmF5PFJlY2VpdmVyPj4oKTtcblx0fVxuICAgIFxuICAgIC8qKiBSZXRyaWV2ZXMgdGhlIGluc3RhbmNlIG9mIHRoZSBTaW5nbGV0b24gRXZlbnRRdWV1ZSAqL1xuXHRzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRXZlbnRRdWV1ZSB7XG5cdFx0aWYodGhpcy5pbnN0YW5jZSA9PT0gbnVsbCl7XG5cdFx0XHR0aGlzLmluc3RhbmNlID0gbmV3IEV2ZW50UXVldWUoKTtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2U7XG5cdH1cblxuICAgIC8qKiBBZGRzIGFuIGV2ZW50IHRvIHRoZSBFdmVudFF1ZXVlLlxuICAgICAqIFRoaXMgaXMgZXhwb3NlZCB0byB0aGUgcmVzdCBvZiB0aGUgZ2FtZSBlbmdpbmUgdGhyb3VnaCB0aGUgQHJlZmVyZW5jZVtFbWl0dGVyXSBjbGFzcyAqL1xuICAgIGFkZEV2ZW50KGV2ZW50OiBHYW1lRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xLmVucXVldWUoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc29jaWF0ZXMgYSByZWNlaXZlciB3aXRoIGEgdHlwZSBvZiBldmVudC4gRXZlcnkgdGltZSB0aGlzIGV2ZW50IGFwcGVhcnMgaW4gdGhlIGZ1dHVyZSxcbiAgICAgKiBpdCB3aWxsIGJlIGdpdmVuIHRvIHRoZSByZWNlaXZlciAoYW5kIGFueSBvdGhlcnMgd2F0Y2hpbmcgdGhhdCB0eXBlKS5cbiAgICAgKiBUaGlzIGlzIGV4cG9zZWQgdG8gdGhlIHJlc3Qgb2YgdGhlIGdhbWUgZW5naW5lIHRocm91Z2ggdGhlIEByZWZlcmVuY2VbUmVjZWl2ZXJdIGNsYXNzXG4gICAgICogQHBhcmFtIHJlY2VpdmVyIFRoZSBldmVudCByZWNlaXZlclxuICAgICAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9yIHR5cGVzIG9mIGV2ZW50cyB0byBzdWJzY3JpYmUgdG9cbiAgICAgKi9cbiAgICBzdWJzY3JpYmUocmVjZWl2ZXI6IFJlY2VpdmVyLCB0eXBlOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgICAgIGlmKHR5cGUgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAvLyBJZiBpdCBpcyBhbiBhcnJheSwgc3Vic2NyaWJlIHRvIGFsbCBldmVudCB0eXBlc1xuICAgICAgICAgICAgZm9yKGxldCB0IG9mIHR5cGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIocmVjZWl2ZXIsIHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihyZWNlaXZlciwgdHlwZSk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIHRoZSBzcGVjaWZpZWQgcmVjZWl2ZXIgZnJvbSBhbGwgZXZlbnRzLCBvciBmcm9tIHdoYXRldmVyIGV2ZW50cyBhcmUgcHJvdmlkZWRcbiAgICAgKiBAcGFyYW0gcmVjZWl2ZXIgVGhlIHJlY2VpdmVyIHRvIHVuc3Vic2NyaWJlXG4gICAgICogQHBhcmFtIGtleXMgVGhlIGV2ZW50cyB0byB1bnN1YnNjcmliZSBmcm9tLiBJZiBub25lIGFyZSBwcm92aWRlZCwgdW5zdWJzY3JpYmUgZnJvbSBhbGxcbiAgICAgKi9cbiAgICB1bnN1YnNjcmliZShyZWNlaXZlcjogUmVjZWl2ZXIsIC4uLmV2ZW50czogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICB0aGlzLnJlY2VpdmVycy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBrZXlzIHdlcmUgcHJvdmlkZWQsIG9ubHkgY29udGludWUgaWYgdGhpcyBrZXkgaXMgb25lIG9mIHRoZW1cbiAgICAgICAgICAgIGlmKGV2ZW50cy5sZW5ndGggPiAwICYmIGV2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgPT09IC0xKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGluZGV4IG9mIG91ciByZWNlaXZlciBmb3IgdGhpcyBrZXlcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucmVjZWl2ZXJzLmdldChldmVudE5hbWUpLmluZGV4T2YocmVjZWl2ZXIpO1xuXG4gICAgICAgICAgICAvLyBJZiBhbiBpbmRleCB3YXMgZm91bmQsIHJlbW92ZSB0aGUgcmVjZWl2ZXJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlcnMuZ2V0KGV2ZW50TmFtZSkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQXNzb2NpYXRlIHRoZSByZWNlaXZlciBhbmQgdGhlIHR5cGVcblx0cHJpdmF0ZSBhZGRMaXN0ZW5lcihyZWNlaXZlcjogUmVjZWl2ZXIsIHR5cGU6IHN0cmluZyk6IHZvaWQge1xuXHRcdGlmKHRoaXMucmVjZWl2ZXJzLmhhcyh0eXBlKSl7XG5cdFx0XHR0aGlzLnJlY2VpdmVycy5nZXQodHlwZSkucHVzaChyZWNlaXZlcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVjZWl2ZXJzLmFkZCh0eXBlLCBbcmVjZWl2ZXJdKTtcblx0XHR9XG5cdH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGFUOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgd2hpbGUodGhpcy5xLmhhc0l0ZW1zKCkpe1xuICAgICAgICAgICAgLy8gUmV0cmlldmUgZWFjaCBldmVudFxuXHRcdFx0bGV0IGV2ZW50ID0gdGhpcy5xLmRlcXVldWUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgYSByZWNlaXZlciBoYXMgdGhpcyBldmVudCB0eXBlLCBzZW5kIGl0IHRoZSBldmVudFxuICAgICAgICAgICAgaWYodGhpcy5yZWNlaXZlcnMuaGFzKGV2ZW50LnR5cGUpKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHJlY2VpdmVyIG9mIHRoaXMucmVjZWl2ZXJzLmdldChldmVudC50eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLnJlY2VpdmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgYSByZWNlaXZlciBpcyBzdWJzY3JpYmVkIHRvIGFsbCBldmVudHMsIHNlbmQgaXQgdGhlIGV2ZW50XG4gICAgICAgICAgICBpZih0aGlzLnJlY2VpdmVycy5oYXMoR2FtZUV2ZW50VHlwZS5BTEwpKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHJlY2VpdmVyIG9mIHRoaXMucmVjZWl2ZXJzLmdldChHYW1lRXZlbnRUeXBlLkFMTCkpe1xuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5yZWNlaXZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IE1hcCBmcm9tIFwiLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiXG5cbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhbiBpbi1nYW1lIGV2ZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlIEByZWZlcmVuY2VbRXZlbnRRdWV1ZV1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUV2ZW50IHtcbiAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGV2ZW50ICovXG4gICAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgICAvKiogVGhlIGRhdGEgY29udGFpbmVkIGJ5IHRoZSBldmVudCAqL1xuICAgIHB1YmxpYyBkYXRhOiBNYXA8YW55PjtcbiAgICAvKiogVGhlIHRpbWUgb2YgdGhlIGV2ZW50IGluIG1zICovXG5cdHB1YmxpYyB0aW1lOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEdhbWVFdmVudC5cbiAgICAgKiBUaGlzIGlzIGhhbmRsZWQgaW1wbGljaXRseSB0aHJvdWdoIHRoZSBAcmVmZXJlbmNlW0VtaXR0ZXJdIGNsYXNzXG4gICAgICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIEdhbWVFdmVudFxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIGNvbnRhaW5lZCBieSB0aGUgR2FtZUV2ZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhOiBNYXA8YW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT4gPSBudWxsKSB7XG4gICAgICAgIC8vIFBhcnNlIHRoZSBnYW1lIGV2ZW50IGRhdGFcbiAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBNYXA8YW55PigpO1xuICAgICAgICB9IGVsc2UgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIE1hcCkpe1xuICAgICAgICAgICAgLy8gZGF0YSBpcyBhIHJhdyBvYmplY3QsIHVucGFja1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hcDxhbnk+KCk7XG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYWRkKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgdHlwZSBvZiB0aGUgR2FtZUV2ZW50XG4gICAgICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgdG8gY2hlY2tcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBHYW1lRXZlbnQgaXMgdGhlIHNwZWNpZmllZCB0eXBlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgaXNUeXBlKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhpcyBHYW1lRXZlbnQgYXMgYSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBHYW1lRXZlbnRcbiAgICAgKi9cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlICsgXCI6IEBcIiArIHRoaXMudGltZTtcbiAgICB9XG59IiwiLy8gQGlnbm9yZVBhZ2VcblxuZXhwb3J0IGVudW0gR2FtZUV2ZW50VHlwZSB7XG5cdC8qKlxuXHQgKiBNb3VzZSBEb3duIGV2ZW50LiBIYXMgZGF0YToge3Bvc2l0aW9uOiBWZWMyIC0gTW91c2UgUG9zaXRpb259XG5cdCAqL1xuXHRNT1VTRV9ET1dOID0gXCJtb3VzZV9kb3duXCIsXG5cdC8qKlxuXHQgKiBNb3VzZSBVcCBldmVudC4gSGFzIGRhdGE6IHtwb3NpdGlvbjogVmVjMiAtIE1vdXNlIFBvc2l0aW9ufVxuXHQgKi9cblx0TU9VU0VfVVAgPSBcIm1vdXNlX3VwXCIsXG5cdC8qKlxuXHQgKiBNb3VzZSBNb3ZlIGV2ZW50LiBIYXMgZGF0YToge3Bvc2l0aW9uOiBWZWMyIC0gTW91c2UgUG9zaXRpb259XG5cdCAqL1xuXHRNT1VTRV9NT1ZFID0gXCJtb3VzZV9tb3ZlXCIsXG5cblx0LyoqXG5cdCAqIEtleSBEb3duIGV2ZW50LiBIYXMgZGF0YToge2tleTogc3RyaW5nIC0gVGhlIGtleSB0aGF0IGlzIGRvd259XG5cdCAqL1xuXHRLRVlfRE9XTiA9IFwia2V5X2Rvd25cIixcblxuXHQvKipcblx0ICogS2V5IFVwIGV2ZW50LiBIYXMgZGF0YToge2tleTogc3RyaW5nIC0gVGhlIGtleSB0aGF0IGlzIHVwfVxuXHQgKi9cblx0S0VZX1VQID0gXCJrZXlfdXBcIixcblxuXHQvKipcblx0ICogQ2FudmFzIEJsdXIgZXZlbnQuIEhhcyBkYXRhOiB7fVxuXHQgKi9cblx0Q0FOVkFTX0JMVVIgPSBcImNhbnZhc19ibHVyXCIsXG5cblx0LyoqXG5cdCAqIE1vdXNlIHdoZWVsIHVwIGV2ZW50LiBIYXMgZGF0YToge31cblx0ICovXG5cdFdIRUVMX1VQID0gXCJ3aGVlbF91cFwiLFxuXG5cdC8qKlxuXHQgKiBNb3VzZSB3aGVlbCBkb3duIGV2ZW50LiBIYXMgZGF0YToge31cblx0ICovXG5cdFdIRUVMX0RPV04gPSBcIndoZWVsX2Rvd25cIixcblxuXHQvKipcblx0ICogU3RhcnQgUmVjb3JkaW5nIGV2ZW50LiBIYXMgZGF0YToge3JlY29yZGluZzogQWJzdHJhY3RSZWNvcmRpbmd9XG5cdCAqL1xuXHRTVEFSVF9SRUNPUkRJTkcgPSBcInN0YXJ0X3JlY29yZGluZ1wiLFxuXG5cdC8qKlxuXHQgKiBTdG9wIFJlY29yZGluZyBldmVudC4gSGFzIGRhdGE6IHt9XG5cdCAqL1xuXHRTVE9QX1JFQ09SRElORyA9IFwic3RvcF9yZWNvcmRpbmdcIixcblx0XG5cdC8qKlxuXHQgKiBQbGF5IFJlY29yZGluZyBldmVudC4gSGFzIGRhdGE6IHt9XG5cdCAqL1xuXHRQTEFZX1JFQ09SRElORyA9IFwicGxheV9yZWNvcmRpbmdcIixcblxuXHQvKipcblx0ICogUGxheSBTb3VuZCBldmVudC4gSGFzIGRhdGE6IHtrZXk6IHN0cmluZywgbG9vcDogYm9vbGVhbiwgaG9sZFJlZmVyZW5jZTogYm9vbGVhbiB9XG5cdCAqL1xuXHRQTEFZX1NPVU5EID0gXCJwbGF5X3NvdW5kXCIsXG5cblx0LyoqXG5cdCAqIFBsYXkgU291bmQgZXZlbnQuIEhhcyBkYXRhOiB7a2V5OiBzdHJpbmd9XG5cdCAqL1xuXHRTVE9QX1NPVU5EID0gXCJzdG9wX3NvdW5kXCIsXG5cblx0LyoqXG5cdCAqIFBsYXkgU291bmQgZXZlbnQuIEhhcyBkYXRhOiB7a2V5OiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIGhvbGRSZWZlcmVuY2U6IGJvb2xlYW4sIGNoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGUgfVxuXHQgKi9cbiBcdFBMQVlfU0ZYID0gXCJwbGF5X3NmeFwiLFxuXG4gXHQvKipcblx0ICogUGxheSBTb3VuZCBldmVudC4gSGFzIGRhdGE6IHtrZXk6IHN0cmluZywgbG9vcDogYm9vbGVhbiwgaG9sZFJlZmVyZW5jZTogYm9vbGVhbiB9XG5cdCAqL1xuICBcdFBMQVlfTVVTSUMgPSBcInBsYXlfbXVzaWNcIixcblxuXHQvKipcblx0ICogTXV0ZSBhdWRpbyBjaGFubmVsIGV2ZW50LiBIYXMgZGF0YToge2NoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGV9XG5cdCAqL1xuXHRNVVRFX0NIQU5ORUwgPSBcIm11dGVfY2hhbm5lbFwiLFxuXG5cdC8qKlxuXHQgKiBVbm11dGUgYXVkaW8gY2hhbm5lbCBldmVudC4gSGFzIGRhdGE6IHtjaGFubmVsOiBBdWRpb0NoYW5uZWxUeXBlfVxuXHQgKi9cblx0VU5NVVRFX0NIQU5ORUwgPSBcInVubXV0ZV9jaGFubmVsXCIsXG5cblx0LyoqXG5cdCAqIEVuY29tcGFzc2VzIGFsbCBldmVudCB0eXBlcy4gVXNlZCBmb3IgcmVjZWl2ZXJzIG9ubHkuXG5cdCAqL1xuXHRBTEwgPSBcImFsbFwiLFxuXG5cdC8qKiBcblx0ICogRGlzYWJsZXMgcmV2ZWl2aW5nIGlucHV0IGZyb20gdGhlIHVzZXIgZm9yIHRoZSBzcGVjaWZpZWQgaW5wdXRzLiBIYXMgZGF0YToge2lucHV0czogSW5wdXRIYW5sZGVyc1tdfVxuXHQgKi9cblx0RElTQUJMRV9VU0VSX0lOUFVUID0gXCJkaXNhYmxlX3VzZXJfaW5wdXRcIixcblxuXHQvKiogXG5cdCAqIEVuYWJsZXMgcmVjZWl2aW5nIGlucHV0IGZyb20gdGhlIHVzZXIgZm9yIHRoZSBzcGVjaWZpZWQgaW5wdXRzLiBIYXMgZGF0YToge2lucHV0czogSW5wdXRIYW5kbGVyc1tdfVxuXHQgKi9cblx0RU5BQkxFX1VTRVJfSU5QVVQgPSBcImVuYWJsZV91c2VyX2lucHV0XCIsXG5cblx0LyoqXG5cdCAqIFRyaWdnZXJzIGEgc2NlbmUgY2hhbmdlLiBIYXMgZGF0YToge3NjZW5lOiBuZXcgKC4uLmFyZ3M6IGFueSkgPT4gVCBleHRlbmRzIFNjZW5lLCBpbml0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+fVxuXHQgKi9cblx0Q0hBTkdFX1NDRU5FID0gXCJjaGFuZ2Vfc2NlbmVcIlxufSIsImltcG9ydCBRdWV1ZSBmcm9tIFwiLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL1F1ZXVlXCI7XG5pbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi9FdmVudFF1ZXVlXCI7XG5pbXBvcnQgR2FtZUV2ZW50IGZyb20gXCIuL0dhbWVFdmVudFwiO1xuXG4vKipcbiAqIFJlY2VpdmVzIHN1YnNjcmliZWQgZXZlbnRzIGZyb20gdGhlIEV2ZW50UXVldWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2VpdmVyIHtcblx0LyoqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBldmVudHMgdGhpcyBSZWNlaXZlciBjYW4gaG9sZCBhdCBvbmUgdGltZSAqL1xuXHRyZWFkb25seSBNQVhfU0laRTogbnVtYmVyO1xuXG5cdC8qKiBUaGUgaW5ib3ggb2YgdGhlIFJlY2VpdmVyICovXG5cdHByaXZhdGUgcTogUXVldWU8R2FtZUV2ZW50PjtcblxuXHQvKiogQ3JlYXRlcyBhIG5ldyBSZWNlaXZlciAqL1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuTUFYX1NJWkUgPSAyMDA7XG4gICAgICAgIHRoaXMucSA9IG5ldyBRdWV1ZSh0aGlzLk1BWF9TSVpFKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHRFdmVudFF1ZXVlLmdldEluc3RhbmNlKCkudW5zdWJzY3JpYmUodGhpcyk7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBBZGRzIHRoZXNlIHR5cGVzIG9mIGV2ZW50cyB0byB0aGlzIHJlY2VpdmVyJ3MgcXVldWUgZXZlcnkgdXBkYXRlLlxuXHQgKiBAcGFyYW0gZXZlbnRUeXBlcyBUaGUgdHlwZXMgb2YgZXZlbnRzIHRoaXMgcmVjZWl2ZXIgd2lsbCBiZSBzdWJzY3JpYmVkIHRvXG5cdCAqL1xuXHRzdWJzY3JpYmUoZXZlbnRUeXBlczogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuXHRcdEV2ZW50UXVldWUuZ2V0SW5zdGFuY2UoKS5zdWJzY3JpYmUodGhpcywgZXZlbnRUeXBlcyk7XG5cdFx0dGhpcy5xLmNsZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhbiBldmVudCB0byB0aGUgcXVldWUgb2YgdGhpcyByZWNpZXZlci4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBAcmVmZXJlbmNlW0V2ZW50UXVldWVdIHRvIGRpc3RyaWJ1dGUgZXZlbnRzXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgdG8gcmVjZWl2ZVxuXHQgKi9cblx0cmVjZWl2ZShldmVudDogR2FtZUV2ZW50KTogdm9pZCB7XG5cdFx0dHJ5e1xuXHRcdHRoaXMucS5lbnF1ZXVlKGV2ZW50KTtcblx0XHR9IGNhdGNoKGUpe1xuXHRcdFx0Y29uc29sZS53YXJuKFwiUmVjZWl2ZXIgb3ZlcmZsb3cgZm9yIGV2ZW50IFwiICsgZXZlbnQudG9TdHJpbmcoKSk7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIG5leHQgZXZlbnQgZnJvbSB0aGUgcmVjZWl2ZXIncyBxdWV1ZVxuXHQgKiBAcmV0dXJucyBUaGUgbmV4dCBHYW1lRXZlbnRcblx0ICovXG5cdGdldE5leHRFdmVudCgpOiBHYW1lRXZlbnQge1xuXHRcdHJldHVybiB0aGlzLnEuZGVxdWV1ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvb2tzIGF0IHRoZSBuZXh0IGV2ZW50IGluIHRoZSByZWNlaXZlcidzIHF1ZXVlLCBidXQgZG9lc24ndCByZW1vdmUgaXQgZnJvbSB0aGUgcXVldWVcblx0ICogQHJldHVybnMgVGhlIG5leHQgR2FtZUV2ZW50XG5cdCAqL1xuXHRwZWVrTmV4dEV2ZW50KCk6IEdhbWVFdmVudCB7XG5cdFx0cmV0dXJuIHRoaXMucS5wZWVrTmV4dCgpXG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZSByZWNlaXZlciBoYXMgYW55IGV2ZW50cyBpbiBpdHMgcXVldWVcblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcmVjZWl2ZXIgaGFzIGFub3RoZXIgZXZlbnQsIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0aGFzTmV4dEV2ZW50KCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnEuaGFzSXRlbXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZ25vcmUgYWxsIGV2ZW50cyB0aGlzIGZyYW1lXG5cdCAqL1xuXHRpZ25vcmVFdmVudHMoKTogdm9pZCB7XG5cdFx0dGhpcy5xLmNsZWFyKCk7XG5cdH1cbn0iLCJpbXBvcnQgUmVjZWl2ZXIgZnJvbSBcIi4uL0V2ZW50cy9SZWNlaXZlclwiO1xuaW1wb3J0IE1hcCBmcm9tIFwiLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi4vRXZlbnRzL0V2ZW50UXVldWVcIjtcbmltcG9ydCBWaWV3cG9ydCBmcm9tIFwiLi4vU2NlbmVHcmFwaC9WaWV3cG9ydFwiO1xuaW1wb3J0IEdhbWVFdmVudCBmcm9tIFwiLi4vRXZlbnRzL0dhbWVFdmVudFwiO1xuaW1wb3J0IHsgR2FtZUV2ZW50VHlwZSB9IGZyb20gXCIuLi9FdmVudHMvR2FtZUV2ZW50VHlwZVwiO1xuXG4vKipcbiAqIFJlY2VpdmVzIGlucHV0IGV2ZW50cyBmcm9tIHRoZSBAcmVmZXJlbmNlW0V2ZW50UXVldWVdIGFuZCBhbGxvd3MgZm9yIGVhc3kgYWNjZXNzIG9mIGluZm9ybWF0aW9uIGFib3V0IGlucHV0IGJ5IG90aGVyIHN5c3RlbXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xuXHRwcml2YXRlIHN0YXRpYyBtb3VzZVByZXNzZWQ6IGJvb2xlYW47XG5cdHByaXZhdGUgc3RhdGljIG1vdXNlSnVzdFByZXNzZWQ6IGJvb2xlYW47XG5cdHByaXZhdGUgc3RhdGljIG1vdXNlQnV0dG9uUHJlc3NlZDogbnVtYmVyO1xuXG5cdHByaXZhdGUgc3RhdGljIGtleUp1c3RQcmVzc2VkOiBNYXA8Ym9vbGVhbj47XG5cdHByaXZhdGUgc3RhdGljIGtleVByZXNzZWQ6IE1hcDxib29sZWFuPjtcblxuXHRwcml2YXRlIHN0YXRpYyBtb3VzZVBvc2l0aW9uOiBWZWMyO1xuXHRwcml2YXRlIHN0YXRpYyBtb3VzZVByZXNzUG9zaXRpb246IFZlYzI7XG5cblx0cHJpdmF0ZSBzdGF0aWMgc2Nyb2xsRGlyZWN0aW9uOiBudW1iZXI7XG5cdHByaXZhdGUgc3RhdGljIGp1c3RTY3JvbGxlZDogYm9vbGVhbjtcblxuXHRwcml2YXRlIHN0YXRpYyBldmVudFF1ZXVlOiBFdmVudFF1ZXVlO1xuXHRwcml2YXRlIHN0YXRpYyByZWNlaXZlcjogUmVjZWl2ZXI7XG5cdHByaXZhdGUgc3RhdGljIHZpZXdwb3J0OiBWaWV3cG9ydDtcblxuXHRwcml2YXRlIHN0YXRpYyBrZXlNYXA6IE1hcDxBcnJheTxzdHJpbmc+PjtcblxuXHRwcml2YXRlIHN0YXRpYyBrZXlzRGlzYWJsZWQ6IGJvb2xlYW47XG5cdHByaXZhdGUgc3RhdGljIG1vdXNlRGlzYWJsZWQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIHRoZSBJbnB1dCBvYmplY3Rcblx0ICogQHBhcmFtIHZpZXdwb3J0IEEgcmVmZXJlbmNlIHRvIHRoZSB2aWV3cG9ydCBvZiB0aGUgZ2FtZVxuXHQgKi9cblx0c3RhdGljIGluaXRpYWxpemUodmlld3BvcnQ6IFZpZXdwb3J0LCBrZXlNYXA6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+KSB7XG5cdFx0SW5wdXQudmlld3BvcnQgPSB2aWV3cG9ydDtcblx0XHRJbnB1dC5tb3VzZVByZXNzZWQgPSBmYWxzZTtcblx0XHRJbnB1dC5tb3VzZUp1c3RQcmVzc2VkID0gZmFsc2U7XG5cdFx0SW5wdXQucmVjZWl2ZXIgPSBuZXcgUmVjZWl2ZXIoKTtcblx0XHRJbnB1dC5rZXlKdXN0UHJlc3NlZCA9IG5ldyBNYXA8Ym9vbGVhbj4oKTtcblx0XHRJbnB1dC5rZXlQcmVzc2VkID0gbmV3IE1hcDxib29sZWFuPigpO1xuXHRcdElucHV0Lm1vdXNlUG9zaXRpb24gPSBuZXcgVmVjMigwLCAwKTtcblx0XHRJbnB1dC5tb3VzZVByZXNzUG9zaXRpb24gPSBuZXcgVmVjMigwLCAwKTtcblx0XHRJbnB1dC5zY3JvbGxEaXJlY3Rpb24gPSAwO1xuXHRcdElucHV0Lmp1c3RTY3JvbGxlZCA9IGZhbHNlO1xuXHRcdElucHV0LmtleXNEaXNhYmxlZCA9IGZhbHNlO1xuXHRcdElucHV0Lm1vdXNlRGlzYWJsZWQgPSBmYWxzZTtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIGtleW1hcFxuXHRcdElucHV0LmtleU1hcCA9IG5ldyBNYXAoKTtcblxuXHRcdC8vIEFkZCBhbGwga2V5cyB0byB0aGUga2V5bWFwXG5cdFx0Zm9yIChsZXQgZW50cnkgaW4ga2V5TWFwKSB7XG5cdFx0XHRsZXQgbmFtZSA9IGtleU1hcFtlbnRyeV0ubmFtZTtcblx0XHRcdGxldCBrZXlzID0ga2V5TWFwW2VudHJ5XS5rZXlzO1xuXHRcdFx0SW5wdXQua2V5TWFwLmFkZChuYW1lLCBrZXlzKTtcblx0XHR9XG5cblx0XHRJbnB1dC5ldmVudFF1ZXVlID0gRXZlbnRRdWV1ZS5nZXRJbnN0YW5jZSgpO1xuXHRcdC8vIFN1YnNjcmliZSB0byBhbGwgaW5wdXQgZXZlbnRzXG5cdFx0SW5wdXQuZXZlbnRRdWV1ZS5zdWJzY3JpYmUoSW5wdXQucmVjZWl2ZXIsIFtHYW1lRXZlbnRUeXBlLk1PVVNFX0RPV04sIEdhbWVFdmVudFR5cGUuTU9VU0VfVVAsIEdhbWVFdmVudFR5cGUuTU9VU0VfTU9WRSxcblx0XHRHYW1lRXZlbnRUeXBlLktFWV9ET1dOLCBHYW1lRXZlbnRUeXBlLktFWV9VUCwgR2FtZUV2ZW50VHlwZS5DQU5WQVNfQkxVUiwgR2FtZUV2ZW50VHlwZS5XSEVFTF9VUCwgR2FtZUV2ZW50VHlwZS5XSEVFTF9ET1dOXSk7XG5cdH1cblxuXHRzdGF0aWMgdXBkYXRlKGRlbHRhVDogbnVtYmVyKTogdm9pZCB7XG5cdFx0Ly8gUmVzZXQgdGhlIGp1c3RQcmVzc2VkIHZhbHVlcyB0byBmYWxzZVxuXHRcdElucHV0Lm1vdXNlSnVzdFByZXNzZWQgPSBmYWxzZTtcblx0XHRJbnB1dC5rZXlKdXN0UHJlc3NlZC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4gSW5wdXQua2V5SnVzdFByZXNzZWQuc2V0KGtleSwgZmFsc2UpKTtcblx0XHRJbnB1dC5qdXN0U2Nyb2xsZWQgPSBmYWxzZTtcblx0XHRJbnB1dC5zY3JvbGxEaXJlY3Rpb24gPSAwO1xuXG5cdFx0d2hpbGUgKElucHV0LnJlY2VpdmVyLmhhc05leHRFdmVudCgpKSB7XG5cdFx0XHRsZXQgZXZlbnQgPSBJbnB1dC5yZWNlaXZlci5nZXROZXh0RXZlbnQoKTtcblxuXHRcdFx0Ly8gSGFuZGxlIGVhY2ggZXZlbnQgdHlwZVxuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09IEdhbWVFdmVudFR5cGUuTU9VU0VfRE9XTikge1xuXHRcdFx0XHRJbnB1dC5tb3VzZUp1c3RQcmVzc2VkID0gdHJ1ZTtcblx0XHRcdFx0SW5wdXQubW91c2VQcmVzc2VkID0gdHJ1ZTtcblx0XHRcdFx0SW5wdXQubW91c2VQcmVzc1Bvc2l0aW9uID0gZXZlbnQuZGF0YS5nZXQoXCJwb3NpdGlvblwiKTtcblx0XHRcdFx0SW5wdXQubW91c2VCdXR0b25QcmVzc2VkID0gZXZlbnQuZGF0YS5nZXQoXCJidXR0b25cIik7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChldmVudC50eXBlID09PSBHYW1lRXZlbnRUeXBlLk1PVVNFX1VQKSB7XG5cdFx0XHRcdElucHV0Lm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5NT1VTRV9NT1ZFKSB7XG5cdFx0XHRcdElucHV0Lm1vdXNlUG9zaXRpb24gPSBldmVudC5kYXRhLmdldChcInBvc2l0aW9uXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5LRVlfRE9XTikge1xuXHRcdFx0XHRsZXQga2V5ID0gZXZlbnQuZGF0YS5nZXQoXCJrZXlcIik7XG5cdFx0XHRcdC8vIEhhbmRsZSBzcGFjZSBiYXJcblx0XHRcdFx0aWYgKGtleSA9PT0gXCIgXCIpIHtcblx0XHRcdFx0XHRrZXkgPSBcInNwYWNlXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFJbnB1dC5rZXlQcmVzc2VkLmdldChrZXkpKSB7XG5cdFx0XHRcdFx0SW5wdXQua2V5SnVzdFByZXNzZWQuc2V0KGtleSwgdHJ1ZSk7XG5cdFx0XHRcdFx0SW5wdXQua2V5UHJlc3NlZC5zZXQoa2V5LCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5LRVlfVVApIHtcblx0XHRcdFx0bGV0IGtleSA9IGV2ZW50LmRhdGEuZ2V0KFwia2V5XCIpO1xuXHRcdFx0XHQvLyBIYW5kbGUgc3BhY2UgYmFyXG5cdFx0XHRcdGlmIChrZXkgPT09IFwiIFwiKSB7XG5cdFx0XHRcdFx0a2V5ID0gXCJzcGFjZVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdElucHV0LmtleVByZXNzZWQuc2V0KGtleSwgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5DQU5WQVNfQkxVUikge1xuXHRcdFx0XHRJbnB1dC5jbGVhcktleVByZXNzZXMoKVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5XSEVFTF9VUCkge1xuXHRcdFx0XHRJbnB1dC5zY3JvbGxEaXJlY3Rpb24gPSAtMTtcblx0XHRcdFx0SW5wdXQuanVzdFNjcm9sbGVkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5XSEVFTF9ET1dOKSB7XG5cdFx0XHRcdElucHV0LnNjcm9sbERpcmVjdGlvbiA9IDE7XG5cdFx0XHRcdElucHV0Lmp1c3RTY3JvbGxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgY2xlYXJLZXlQcmVzc2VzKCk6IHZvaWQge1xuXHRcdElucHV0LmtleUp1c3RQcmVzc2VkLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiBJbnB1dC5rZXlKdXN0UHJlc3NlZC5zZXQoa2V5LCBmYWxzZSkpO1xuXHRcdElucHV0LmtleVByZXNzZWQuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IElucHV0LmtleVByZXNzZWQuc2V0KGtleSwgZmFsc2UpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGEga2V5IHdhcyBuZXdseSBwcmVzc2VkIElucHV0IGZyYW1lLlxuXHQgKiBJZiB0aGUga2V5IGlzIHN0aWxsIHByZXNzZWQgZnJvbSBsYXN0IGZyYW1lIGFuZCB3YXNuJ3QgcmUtcHJlc3NlZCwgSW5wdXQgd2lsbCByZXR1cm4gZmFsc2UuXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleVxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBrZXkgd2FzIGp1c3QgcHJlc3NlZCwgZmFsc2Ugb3RoZXJ3aXNlXG5cdCAqL1xuXHRzdGF0aWMgaXNLZXlKdXN0UHJlc3NlZChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGlmIChJbnB1dC5rZXlzRGlzYWJsZWQpIHJldHVybiBmYWxzZTtcblxuXHRcdGlmIChJbnB1dC5rZXlKdXN0UHJlc3NlZC5oYXMoa2V5KSkge1xuXHRcdFx0cmV0dXJuIElucHV0LmtleUp1c3RQcmVzc2VkLmdldChrZXkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgb2YgdGhlIGtleXMgdGhhdCBhcmUgbmV3bHkgcHJlc3NlZCBJbnB1dCBmcmFtZS5cblx0ICogSWYgYSBrZXkgaXMgc3RpbGwgcHJlc3NlZCBmcm9tIGxhc3QgZnJhbWUgYW5kIHdhc24ndCByZS1wcmVzc2VkLCBpdCB3aWxsIG5vdCBiZSBpbiBJbnB1dCBsaXN0LlxuXHQgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBhbGwgb2YgdGhlIG5ld2x5IHByZXNzZWQga2V5cy5cblx0ICovXG5cdHN0YXRpYyBnZXRLZXlzSnVzdFByZXNzZWQoKTogQXJyYXk8c3RyaW5nPiB7XG5cdFx0aWYgKElucHV0LmtleXNEaXNhYmxlZCkgcmV0dXJuIFtdO1xuXG5cdFx0bGV0IGtleXMgPSBBcnJheTxzdHJpbmc+KCk7XG5cdFx0SW5wdXQua2V5SnVzdFByZXNzZWQuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0aWYgKElucHV0LmtleUp1c3RQcmVzc2VkLmdldChrZXkpKSB7XG5cdFx0XHRcdGtleXMucHVzaChrZXkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBrZXlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgYSBrZXkgaXMgYmVpbmcgcHJlc3NlZC5cblx0ICogQHBhcmFtIGtleSBUaGUga2V5XG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGtleSBpcyBjdXJyZW50bHkgcHJlc3NlZCwgZmFsc2Ugb3RoZXJ3aXNlXG5cdCAqL1xuXHRzdGF0aWMgaXNLZXlQcmVzc2VkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0aWYgKElucHV0LmtleXNEaXNhYmxlZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0aWYgKElucHV0LmtleVByZXNzZWQuaGFzKGtleSkpIHtcblx0XHRcdHJldHVybiBJbnB1dC5rZXlQcmVzc2VkLmdldChrZXkpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2hhbmdlcyB0aGUgYmluZGluZyBvZiBhbiBpbnB1dCBuYW1lIHRvIGtleXNcblx0ICogQHBhcmFtIGlucHV0TmFtZSBUaGUgbmFtZSBvZiB0aGUgaW5wdXRcblx0ICogQHBhcmFtIGtleXMgVGhlIGNvcnJlc3BvbmRpbmcga2V5c1xuXHQgKi9cblx0c3RhdGljIGNoYW5nZUtleUJpbmRpbmcoaW5wdXROYW1lOiBzdHJpbmcsIGtleXM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcblx0XHRJbnB1dC5rZXlNYXAuc2V0KGlucHV0TmFtZSwga2V5cyk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xlYXJzIGFsbCBrZXkgYmluZGluZ3Ncblx0ICovXG5cdHN0YXRpYyBjbGVhckFsbEtleUJpbmRpbmdzKCk6IHZvaWQge1xuXHRcdElucHV0LmtleU1hcC5jbGVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gaW5wdXQgd2FzIGp1c3QgcHJlc3NlZCB0aGlzIGZyYW1lXG5cdCAqIEBwYXJhbSBpbnB1dE5hbWUgVGhlIG5hbWUgb2YgdGhlIGlucHV0XG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGlucHV0IHdhcyBqdXN0IHByZXNzZWQsIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0c3RhdGljIGlzSnVzdFByZXNzZWQoaW5wdXROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRpZiAoSW5wdXQua2V5c0Rpc2FibGVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRpZiAoSW5wdXQua2V5TWFwLmhhcyhpbnB1dE5hbWUpKSB7XG5cdFx0XHRjb25zdCBrZXlzID0gSW5wdXQua2V5TWFwLmdldChpbnB1dE5hbWUpO1xuXHRcdFx0bGV0IGp1c3RQcmVzc2VkID0gZmFsc2U7XG5cblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGp1c3RQcmVzc2VkID0ganVzdFByZXNzZWQgfHwgSW5wdXQuaXNLZXlKdXN0UHJlc3NlZChrZXkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ganVzdFByZXNzZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbiBpbnB1dCBpcyBjdXJyZW50bHkgcHJlc3NlZFxuXHQgKiBAcGFyYW0gaW5wdXROYW1lIFRoZSBuYW1lIG9mIHRoZSBpbnB1dFxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbnB1dCBpcyBwcmVzc2VkLCBmYWxzZSBvdGhlcndpc2Vcblx0ICovXG5cdHN0YXRpYyBpc1ByZXNzZWQoaW5wdXROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRpZiAoSW5wdXQua2V5c0Rpc2FibGVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRpZiAoSW5wdXQua2V5TWFwLmhhcyhpbnB1dE5hbWUpKSB7XG5cdFx0XHRjb25zdCBrZXlzID0gSW5wdXQua2V5TWFwLmdldChpbnB1dE5hbWUpO1xuXHRcdFx0bGV0IHByZXNzZWQgPSBmYWxzZTtcblxuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0cHJlc3NlZCA9IHByZXNzZWQgfHwgSW5wdXQuaXNLZXlQcmVzc2VkKGtleSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcmVzc2VkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQgKiBcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbW91c2Ugd2FzIG5ld2x5IHByZXNzZWQgSW5wdXQgZnJhbWUuXG5cdCAqIEBwYXJhbSBtb3VzZUJ1dHRvbiBPcHRpb25hbGx5IHNwZWNpZnkgd2hpY2ggbW91c2UgY2xpY2sgeW91IHdhbnQgdG8ga25vdyB3YXMgcHJlc3NlZC4gXG5cdCAqIDAgZm9yIGxlZnQgY2xpY2ssIDEgZm9yIG1pZGRsZSBjbGljaywgMiBmb3IgcmlnaHQgY2xpY2suXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG1vdXNlIHdhcyBqdXN0IHByZXNzZWQsIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0c3RhdGljIGlzTW91c2VKdXN0UHJlc3NlZChtb3VzZUJ1dHRvbj86IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGlmIChtb3VzZUJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gSW5wdXQubW91c2VKdXN0UHJlc3NlZCAmJiAhSW5wdXQubW91c2VEaXNhYmxlZCAmJiBtb3VzZUJ1dHRvbiA9PSB0aGlzLm1vdXNlQnV0dG9uUHJlc3NlZDtcblx0XHR9XG5cdFx0cmV0dXJuIElucHV0Lm1vdXNlSnVzdFByZXNzZWQgJiYgIUlucHV0Lm1vdXNlRGlzYWJsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbW91c2UgaXMgY3VycmVudGx5IHByZXNzZWRcblx0ICogQHBhcmFtIG1vdXNlQnV0dG9uIE9wdGlvbmFsbHkgc3BlY2lmeSB3aGljaCBtb3VzZSBjbGljayB5b3Ugd2FudCB0byBrbm93IHdhcyBwcmVzc2VkLiBcblx0ICogMCBmb3IgbGVmdCBjbGljaywgMSBmb3IgbWlkZGxlIGNsaWNrLCAyIGZvciByaWdodCBjbGljay5cblx0ICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbW91c2UgaXMgY3VycmVudGx5IHByZXNzZWQsIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0c3RhdGljIGlzTW91c2VQcmVzc2VkKG1vdXNlQnV0dG9uPzogbnVtYmVyKTogYm9vbGVhbiB7XG5cdFx0aWYgKG1vdXNlQnV0dG9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBJbnB1dC5tb3VzZVByZXNzZWQgJiYgIUlucHV0Lm1vdXNlRGlzYWJsZWQgJiYgbW91c2VCdXR0b24gPT0gdGhpcy5tb3VzZUJ1dHRvblByZXNzZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBJbnB1dC5tb3VzZVByZXNzZWQgJiYgIUlucHV0Lm1vdXNlRGlzYWJsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSB1c2VyIHNjcm9sbGVkIG9yIG5vdFxuXHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB1c2VyIGp1c3Qgc2Nyb2xsZWQgSW5wdXQgZnJhbWUsIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0c3RhdGljIGRpZEp1c3RTY3JvbGwoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIElucHV0Lmp1c3RTY3JvbGxlZCAmJiAhSW5wdXQubW91c2VEaXNhYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHNjcm9sbFxuXHQgKiBAcmV0dXJucyAtMSBpZiB0aGUgdXNlciBzY3JvbGxlZCB1cCwgMSBpZiB0aGV5IHNjcm9sbGVkIGRvd25cblx0ICovXG5cdHN0YXRpYyBnZXRTY3JvbGxEaXJlY3Rpb24oKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gSW5wdXQuc2Nyb2xsRGlyZWN0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGF5ZXIncyBtb3VzZVxuXHQgKiBAcmV0dXJucyBUaGUgbW91c2UgcG9zaXRpb24gc3RvcmVkIGFzIGEgVmVjMlxuXHQgKi9cblx0c3RhdGljIGdldE1vdXNlUG9zaXRpb24oKTogVmVjMiB7XG5cdFx0cmV0dXJuIElucHV0Lm1vdXNlUG9zaXRpb24uc2NhbGVkKDEgLyB0aGlzLnZpZXdwb3J0LmdldFpvb21MZXZlbCgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGxheWVyJ3MgbW91c2UgaW4gdGhlIGdhbWUgd29ybGQsXG5cdCAqIHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gdGhlIHNjcm9sbGluZyBvZiB0aGUgdmlld3BvcnRcblx0ICogQHJldHVybnMgVGhlIG1vdXNlIHBvc2l0aW9uIHN0b3JlZCBhcyBhIFZlYzJcblx0ICovXG5cdHN0YXRpYyBnZXRHbG9iYWxNb3VzZVBvc2l0aW9uKCk6IFZlYzIge1xuXHRcdHJldHVybiBJbnB1dC5tb3VzZVBvc2l0aW9uLmNsb25lKCkuc2NhbGUoMSAvIHRoaXMudmlld3BvcnQuZ2V0Wm9vbUxldmVsKCkpLmFkZChJbnB1dC52aWV3cG9ydC5nZXRPcmlnaW4oKSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3QgbW91c2UgcHJlc3Ncblx0ICogQHJldHVybnMgVGhlIG1vdXNlIHBvc2l0aW9uIHN0b3JlZCBhcyBhIFZlYzJcblx0ICovXG5cdHN0YXRpYyBnZXRNb3VzZVByZXNzUG9zaXRpb24oKTogVmVjMiB7XG5cdFx0cmV0dXJuIElucHV0LmdldE1vdXNlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBtb3VzZSBwcmVzcyBpbiB0aGUgZ2FtZSB3b3JsZCxcblx0ICogdGFraW5nIGludG8gY29uc2lkZXJhdGlvbiB0aGUgc2Nyb2xsaW5nIG9mIHRoZSB2aWV3cG9ydFxuXHQgKiBAcmV0dXJucyBUaGUgbW91c2UgcG9zaXRpb24gc3RvcmVkIGFzIGEgVmVjMlxuXHQgKi9cblx0c3RhdGljIGdldEdsb2JhbE1vdXNlUHJlc3NQb3NpdGlvbigpOiBWZWMyIHtcblx0XHRyZXR1cm4gSW5wdXQubW91c2VQcmVzc1Bvc2l0aW9uLmNsb25lKCkuYWRkKElucHV0LnZpZXdwb3J0LmdldE9yaWdpbigpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlcyBhbGwga2V5cHJlc3MgYW5kIG1vdXNlIGNsaWNrIGlucHV0c1xuXHQgKi9cblx0c3RhdGljIGRpc2FibGVJbnB1dCgpOiB2b2lkIHtcblx0XHRJbnB1dC5rZXlzRGlzYWJsZWQgPSB0cnVlO1xuXHRcdElucHV0Lm1vdXNlRGlzYWJsZWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgYWxsIGtleXByZXNzIGFuZCBtb3VzZSBjbGljayBpbnB1dHNcblx0ICovXG5cdHN0YXRpYyBlbmFibGVJbnB1dCgpOiB2b2lkIHtcblx0XHRJbnB1dC5rZXlzRGlzYWJsZWQgPSBmYWxzZTtcblx0XHRJbnB1dC5tb3VzZURpc2FibGVkID0gZmFsc2U7XG5cdH1cbn0iLCJpbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi4vRXZlbnRzL0V2ZW50UXVldWVcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IEdhbWVFdmVudCBmcm9tIFwiLi4vRXZlbnRzL0dhbWVFdmVudFwiO1xuaW1wb3J0IHsgR2FtZUV2ZW50VHlwZSB9IGZyb20gXCIuLi9FdmVudHMvR2FtZUV2ZW50VHlwZVwiO1xuaW1wb3J0IFVwZGF0ZWFibGUgZnJvbSBcIi4uL0RhdGFUeXBlcy9JbnRlcmZhY2VzL1VwZGF0ZWFibGVcIjtcbmltcG9ydCBSZWNlaXZlciBmcm9tIFwiLi4vRXZlbnRzL1JlY2VpdmVyXCI7XG5cbmV4cG9ydCBlbnVtIElucHV0SGFuZGxlcnMge1xuICAgIE1PVVNFX0RPV04gPSAwLFxuICAgIE1PVVNFX1VQID0gMSxcbiAgICBDT05URVhUX01FTlUgPSAyLFxuICAgIE1PVVNFX01PVkUgPSAzLFxuICAgIEtFWV9ET1dOID0gNCxcbiAgICBLRVlfVVAgPSA1LCBcbiAgICBPTl9CTFVSID0gNixcbiAgICBPTl9XSEVFTCA9IDdcbn1cblxuLyoqXG4gKiBIYW5kbGVzIGNvbW11bmljYXRpb24gd2l0aCB0aGUgd2ViIGJyb3dzZXIgdG8gcmVjZWl2ZSBhc3luY2hyb25vdXMgZXZlbnRzIGFuZCBzZW5kIHRoZW0gdG8gdGhlIEByZWZlcmVuY2VbRXZlbnRRdWV1ZV1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRIYW5kbGVyIGltcGxlbWVudHMgVXBkYXRlYWJsZSB7XG5cdHByaXZhdGUgZXZlbnRRdWV1ZTogRXZlbnRRdWV1ZTtcbiAgICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW5bXTtcbiAgICBwcml2YXRlIHJlY2VpdmVyOiBSZWNlaXZlcjtcbiAgICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBJbnB1dEhhbmRsZXJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBnYW1lIGNhbnZhc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xuXHRcdHRoaXMuZXZlbnRRdWV1ZSA9IEV2ZW50UXVldWUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3IEFycmF5PGJvb2xlYW4+KC4uLlt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXSk7XG5cdFx0XG4gICAgICAgIGNhbnZhcy5vbm1vdXNlZG93biA9IChldmVudCkgPT4gdGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQsIGNhbnZhcyk7XG4gICAgICAgIGNhbnZhcy5vbm1vdXNldXAgPSAoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VVcChldmVudCwgY2FudmFzKTtcbiAgICAgICAgY2FudmFzLm9uY29udGV4dG1lbnUgPSB0aGlzLmhhbmRsZUNvbnRleHRNZW51O1xuICAgICAgICBjYW52YXMub25tb3VzZW1vdmUgPSAoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VNb3ZlKGV2ZW50LCBjYW52YXMpO1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSB0aGlzLmhhbmRsZUtleURvd247XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSB0aGlzLmhhbmRsZUtleVVwO1xuICAgICAgICBkb2N1bWVudC5vbmJsdXIgPSB0aGlzLmhhbmRsZUJsdXI7XG4gICAgICAgIGRvY3VtZW50Lm9uY29udGV4dG1lbnUgPSB0aGlzLmhhbmRsZUJsdXI7XG4gICAgICAgIGRvY3VtZW50Lm9ud2hlZWwgPSB0aGlzLmhhbmRsZVdoZWVsO1xuXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSBuZXcgUmVjZWl2ZXIoKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlci5zdWJzY3JpYmUoR2FtZUV2ZW50VHlwZS5ESVNBQkxFX1VTRVJfSU5QVVQpO1xuICAgICAgICB0aGlzLnJlY2VpdmVyLnN1YnNjcmliZShHYW1lRXZlbnRUeXBlLkVOQUJMRV9VU0VSX0lOUFVUKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhVDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHdoaWxlKHRoaXMucmVjZWl2ZXIuaGFzTmV4dEV2ZW50KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXZlbnQodGhpcy5yZWNlaXZlci5nZXROZXh0RXZlbnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIGhhbmRsZUV2ZW50KGV2ZW50OiBHYW1lRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgR2FtZUV2ZW50VHlwZS5ESVNBQkxFX1VTRVJfSU5QVVQ6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVIYW5kbGVycyhldmVudC5kYXRhLmdldChcImlucHV0c1wiKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEdhbWVFdmVudFR5cGUuRU5BQkxFX1VTRVJfSU5QVVQ6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUhhbmRsZXJzKGV2ZW50LmRhdGEuZ2V0KFwiaW5wdXRzXCIpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaGFuZGxlZCBldmVudCB3aXRoIHR5cGU6ICR7ZXZlbnQudHlwZX0gY2F1Z2h0IGluIElucHV0SGFuZGxlci50c2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZUhhbmRsZXJzKGhhbmRsZXJzOiBJbnB1dEhhbmRsZXJzW10pOiB2b2lkIHtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHRoaXMuZW5hYmxlZFtoYW5kbGVyXSA9IHRydWUpO1xuICAgIH1cbiAgICBwdWJsaWMgZGlzYWJsZUhhbmRsZXJzKGhhbmRsZXJzOiBJbnB1dEhhbmRsZXJzW10pOiB2b2lkIHtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHRoaXMuZW5hYmxlZFtoYW5kbGVyXSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlRG93biA9IChldmVudDogTW91c2VFdmVudCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZFtJbnB1dEhhbmRsZXJzLk1PVVNFX0RPV05dKSByZXR1cm47XG5cdFx0bGV0IHBvcyA9IHRoaXMuZ2V0TW91c2VQb3NpdGlvbihldmVudCwgY2FudmFzKTtcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcbiAgICAgICAgbGV0IGdhbWVFdmVudCA9IG5ldyBHYW1lRXZlbnQoR2FtZUV2ZW50VHlwZS5NT1VTRV9ET1dOLCB7cG9zaXRpb246IHBvcywgYnV0dG9uOiBidXR0b259KTtcbiAgICAgICAgdGhpcy5ldmVudFF1ZXVlLmFkZEV2ZW50KGdhbWVFdmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3VzZVVwID0gKGV2ZW50OiBNb3VzZUV2ZW50LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkW0lucHV0SGFuZGxlcnMuTU9VU0VfRE9XTl0pIHJldHVybjtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0TW91c2VQb3NpdGlvbihldmVudCwgY2FudmFzKTtcbiAgICAgICAgbGV0IGdhbWVFdmVudCA9IG5ldyBHYW1lRXZlbnQoR2FtZUV2ZW50VHlwZS5NT1VTRV9VUCwge3Bvc2l0aW9uOiBwb3N9KTtcbiAgICAgICAgdGhpcy5ldmVudFF1ZXVlLmFkZEV2ZW50KGdhbWVFdmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRbSW5wdXRIYW5kbGVycy5NT1VTRV9NT1ZFXSkgcmV0dXJuO1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRNb3VzZVBvc2l0aW9uKGV2ZW50LCBjYW52YXMpO1xuICAgICAgICBsZXQgZ2FtZUV2ZW50ID0gbmV3IEdhbWVFdmVudChHYW1lRXZlbnRUeXBlLk1PVVNFX01PVkUsIHtwb3NpdGlvbjogcG9zfSk7XG4gICAgICAgIHRoaXMuZXZlbnRRdWV1ZS5hZGRFdmVudChnYW1lRXZlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZFtJbnB1dEhhbmRsZXJzLktFWV9ET1dOXSkgcmV0dXJuO1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5nZXRLZXkoZXZlbnQpO1xuICAgICAgICBsZXQgZ2FtZUV2ZW50ID0gbmV3IEdhbWVFdmVudChHYW1lRXZlbnRUeXBlLktFWV9ET1dOLCB7a2V5OiBrZXl9KTtcbiAgICAgICAgdGhpcy5ldmVudFF1ZXVlLmFkZEV2ZW50KGdhbWVFdmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlVcCA9IChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZFtJbnB1dEhhbmRsZXJzLktFWV9VUF0pIHJldHVybjtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuZ2V0S2V5KGV2ZW50KTtcbiAgICAgICAgbGV0IGdhbWVFdmVudCA9IG5ldyBHYW1lRXZlbnQoR2FtZUV2ZW50VHlwZS5LRVlfVVAsIHtrZXk6IGtleX0pO1xuICAgICAgICB0aGlzLmV2ZW50UXVldWUuYWRkRXZlbnQoZ2FtZUV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUJsdXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkW0lucHV0SGFuZGxlcnMuT05fQkxVUl0pIHJldHVybjtcbiAgICAgICAgbGV0IGdhbWVFdmVudCA9IG5ldyBHYW1lRXZlbnQoR2FtZUV2ZW50VHlwZS5DQU5WQVNfQkxVUiwge30pO1xuICAgICAgICB0aGlzLmV2ZW50UXVldWUuYWRkRXZlbnQoZ2FtZUV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNvbnRleHRNZW51ID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVdoZWVsID0gKGV2ZW50OiBXaGVlbEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkW0lucHV0SGFuZGxlcnMuT05fV0hFRUxdKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBsZXQgZ2FtZUV2ZW50OiBHYW1lRXZlbnQ7XG4gICAgICAgIGlmKGV2ZW50LmRlbHRhWSA8IDApe1xuICAgICAgICAgICAgZ2FtZUV2ZW50ID0gbmV3IEdhbWVFdmVudChHYW1lRXZlbnRUeXBlLldIRUVMX1VQLCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lRXZlbnQgPSBuZXcgR2FtZUV2ZW50KEdhbWVFdmVudFR5cGUuV0hFRUxfRE9XTiwge30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ldmVudFF1ZXVlLmFkZEV2ZW50KGdhbWVFdmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRLZXkoa2V5RXZlbnQ6IEtleWJvYXJkRXZlbnQpe1xuICAgICAgICByZXR1cm4ga2V5RXZlbnQua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb3VzZVBvc2l0aW9uKG1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiBWZWMyIHtcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCB4ID0gbW91c2VFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBsZXQgeSA9IG1vdXNlRXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIoeCwgeSk7XG4gICAgfVxufSIsImltcG9ydCB7fSBmcm9tIFwiLi4vLi4vaW5kZXhcIjsgIC8vIFRoaXMgaW1wb3J0IGFsbG93cyB1cyB0byBtb2RpZnkgdGhlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB0byBhZGQgZXh0cmEgZnVuY3Rpb25hbGl0eVxuLy8gQGlnbm9yZVBhZ2VcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBlbnZpcm9ubWVudCBvZiB0aGUgZ2FtZSBlbmdpbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW52aXJvbm1lbnRJbml0aWFsaXplciB7XG4gICAgc3RhdGljIHNldHVwKCl7XG4gICAgICAgIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5wcm90b3R5cGUucm91bmRlZFJlY3QgPSBmdW5jdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgLy8gQ2xhbXAgdGhlIHJhZGl1cyBiZXR3ZWVuIDAgYW5kIHRoZSBtaW4gb2YgdGhlIHdpZHRoIG9yIGhlaWdodFxuICAgICAgICAgICAgaWYociA8IDApIHIgPSAwO1xuICAgICAgICAgICAgaWYociA+IE1hdGgubWluKHcsIGgpKSByID0gTWF0aC5taW4odywgaCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRHJhdyB0aGUgcm91bmRlZCByZWN0XG4gICAgICAgICAgICB0aGlzLmJlZ2luUGF0aCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRvcFxuICAgICAgICAgICAgdGhpcy5tb3ZlVG8oeCArIHIsIHkpO1xuICAgICAgICAgICAgdGhpcy5saW5lVG8oeCArIHcgLSByLCB5KTtcbiAgICAgICAgICAgIHRoaXMuYXJjVG8oeCArIHcsIHksIHggKyB3LCB5ICsgciwgcik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUmlnaHRcbiAgICAgICAgICAgIHRoaXMubGluZVRvKHggKyB3LCB5ICsgaCAtIHIpO1xuICAgICAgICAgICAgdGhpcy5hcmNUbyh4ICsgdywgeSArIGgsIHggKyB3IC0gciwgeSArIGgsIHIpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIEJvdHRvbVxuICAgICAgICAgICAgdGhpcy5saW5lVG8oeCArIHIsIHkgKyBoKTtcbiAgICAgICAgICAgIHRoaXMuYXJjVG8oeCwgeSArIGgsIHgsIHkgKyBoIC0gciwgcik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTGVmdFxuICAgICAgICAgICAgdGhpcy5saW5lVG8oeCwgeSArIHIpO1xuICAgICAgICAgICAgdGhpcy5hcmNUbyh4LCB5LCB4ICsgciwgeSwgcilcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLnN0cm9rZVJvdW5kZWRSZWN0ID0gZnVuY3Rpb24oeCwgeSwgdywgaCwgcil7XG4gICAgICAgICAgICB0aGlzLnJvdW5kZWRSZWN0KHgsIHksIHcsIGgsIHIpO1xuICAgICAgICAgICAgdGhpcy5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5maWxsUm91bmRlZFJlY3QgPSBmdW5jdGlvbih4LCB5LCB3LCBoLCByKXtcbiAgICAgICAgICAgIHRoaXMucm91bmRlZFJlY3QoeCwgeSwgdywgaCwgcik7XG4gICAgICAgICAgICB0aGlzLmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgR2FtZUxvb3AgZnJvbSBcIi4vR2FtZUxvb3BcIjtcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi4vRGVidWcvRGVidWdcIjtcbmltcG9ydCBTdGF0cyBmcm9tIFwiLi4vRGVidWcvU3RhdHNcIjtcblxuLyoqXG4gKiBBIGdhbWUgbG9vcCB3aXRoIGEgZml4ZWQgdXBkYXRlIHRpbWUgYW5kIGEgdmFyaWFibGUgcmVuZGVyIHRpbWUuXG4gKiBFdmVyeSBmcmFtZSwgdGhlIGdhbWUgdXBkYXRlcyB1bnRpbCBhbGwgdGltZSBzaW5jZSB0aGUgbGFzdCBmcmFtZSBoYXMgYmVlbiBwcm9jZXNzZWQuXG4gKiBJZiB0b28gbXVjaCB0aW1lIGhhcyBwYXNzZWQsIHN1Y2ggYXMgaWYgdGhlIGxhc3QgdXBkYXRlIHdhcyB0b28gc2xvdywgXG4gKiBvciBpZiB0aGUgYnJvd3NlciB3YXMgcHV0IGludG8gdGhlIGJhY2tncm91bmQsIHRoZSBsb29wIHdpbGwgcGFuaWMgYW5kIGRpc2NhcmQgdGltZS5cbiAqIEEgcmVuZGVyIGhhcHBlbnMgYXQgdGhlIGVuZCBvZiBldmVyeSBmcmFtZS4gVGhpcyBoYXBwZW5zIGFzIGZhc3QgYXMgcG9zc2libGUgdW5sZXNzIHNwZWNpZmllZC5cbiAqIEEgbG9vcCBvZiB0aGlzIHR5cGUgYWxsb3dzIGZvciBkZXRlcm1pbmlzdGljIGJlaGF2aW9yIC0gTm8gbWF0dGVyIHdoYXQgdGhlIGZyYW1lIHJhdGUgaXMsIHRoZSB1cGRhdGUgc2hvdWxkIGJlaGF2ZSB0aGUgc2FtZSwgXG4gKiBhcyBpdCBpcyBvY2N1cmluZyBpbiBhIGZpeGVkIGludGVydmFsLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhlZFVwZGF0ZUdhbWVMb29wIGV4dGVuZHMgR2FtZUxvb3Age1xuXG5cdC8qKiBUaGUgbWF4IGFsbG93ZWQgdXBkYXRlIGZwcy4qL1xuICAgIHByaXZhdGUgbWF4VXBkYXRlRlBTOiBudW1iZXI7XG4gICAgXG4gICAgLyoqIFRoZSB0aW1lc3RlcCBmb3IgZWFjaCB1cGRhdGUuIFRoaXMgaXMgdGhlIGRlbHRhVCBwYXNzZWQgdG8gdXBkYXRlIGNhbGxzLiAqL1xuXHRwcml2YXRlIHVwZGF0ZVRpbWVzdGVwOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIGFtb3VudCBvZiB0aW1lIHdlIGFyZSB5ZXQgdG8gc2ltdWxhdGUuICovXG4gICAgcHJpdmF0ZSBmcmFtZURlbHRhOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIHRpbWUgd2hlbiB0aGUgbGFzdCBmcmFtZSB3YXMgZHJhd24uICovXG4gICAgcHJpdmF0ZSBsYXN0RnJhbWVUaW1lOiBudW1iZXI7XG4gICAgXG4gICAgLyoqIFRoZSBtaW5pbXVtIHRpbWUgd2Ugd2FudCB0byB3YWl0IGJldHdlZW4gZ2FtZSBmcmFtZXMuICovXG4gICAgcHJpdmF0ZSBtaW5GcmFtZURlbGF5OiBudW1iZXI7XG5cblx0LyoqIFRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBnYW1lLiAqL1xuXHRwcml2YXRlIGZyYW1lOiBudW1iZXI7XG5cblx0LyoqIFRoZSBhY3R1YWwgZnBzIG9mIHRoZSBnYW1lLiAqL1xuICAgIHByaXZhdGUgZnBzOiBudW1iZXI7XG4gICAgXG4gICAgLyoqIFRoZSB0aW1lIGJldHdlZW4gZnBzIG1lYXN1cmVtZW50IHVwZGF0ZXMuICovXG4gICAgcHJpdmF0ZSBmcHNVcGRhdGVJbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSB0aW1lIG9mIHRoZSBsYXN0IGZwcyB1cGRhdGUuICovXG4gICAgcHJpdmF0ZSBsYXN0RnBzVXBkYXRlOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIG51bWJlciBvZiBmcmFtZXMgc2luY2UgdGhlIGxhc3QgZnBzIHVwZGF0ZSB3YXMgZG9uZS4gKi9cbiAgICBwcml2YXRlIGZyYW1lc1NpbmNlTGFzdEZwc1VwZGF0ZTogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBzdGF0dXMgb2Ygd2hldGhlciBvciBub3QgdGhlIGdhbWUgbG9vcCBoYXMgc3RhcnRlZC4gKi9cbiAgICBwcml2YXRlIHN0YXJ0ZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogVGhlIHN0YXR1cyBvZiB3aGV0aGVyIG9yIG5vdCB0aGUgZ2FtZSBsb29wIGlzIHBhdXNlZCAqL1xuICAgIHByaXZhdGUgcGF1c2VkOiBib29sZWFuO1xuICAgIFxuICAgIC8qKiBUaGUgc3RhdHVzIG9mIHdoZXRoZXIgb3Igbm90IHRoZSBnYW1lIGxvb3AgaXMgY3VycmVudGx5IHJ1bm5pbmcuICovXG4gICAgcHJpdmF0ZSBydW5uaW5nOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBudW1iZXIgb2YgdXBkYXRlIHN0ZXBzIHRoaXMgaXRlcmF0aW9uIG9mIHRoZSBnYW1lIGxvb3AuICovXG4gICAgcHJpdmF0ZSBudW1VcGRhdGVTdGVwczogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG4gICAgICAgIHRoaXMubWF4VXBkYXRlRlBTID0gNjA7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0ZXAgPSBNYXRoLmZsb29yKDEwMDAvdGhpcy5tYXhVcGRhdGVGUFMpO1xuICAgICAgICB0aGlzLmZyYW1lRGVsdGEgPSAwO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLm1pbkZyYW1lRGVsYXkgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5mcHMgPSB0aGlzLm1heFVwZGF0ZUZQUzsgICAvLyBJbml0aWFsaXplIHRoZSBmcHMgdG8gdGhlIG1heCBhbGxvd2VkIGZwc1xuICAgICAgICB0aGlzLmZwc1VwZGF0ZUludGVydmFsID0gMTAwMDtcbiAgICAgICAgdGhpcy5sYXN0RnBzVXBkYXRlID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZXNTaW5jZUxhc3RGcHNVcGRhdGUgPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubnVtVXBkYXRlU3RlcHMgPSAwO1xuXHR9XG5cblx0Z2V0RlBTKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBmcmFtZSBjb3VudCBhbmQgc3VtIG9mIHRpbWUgZm9yIHRoZSBmcmFtZXJhdGUgb2YgdGhlIGdhbWVcbiAgICAgKiBAcGFyYW0gdGltZXN0ZXAgVGhlIGN1cnJlbnQgdGltZSBpbiBtc1xuICAgICAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVGUFModGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcHMgPSAwLjkgKiB0aGlzLmZyYW1lc1NpbmNlTGFzdEZwc1VwZGF0ZSAqIDEwMDAgLyAodGltZXN0YW1wIC0gdGhpcy5sYXN0RnBzVXBkYXRlKSArKDEgLSAwLjkpICogdGhpcy5mcHM7XG4gICAgICAgIHRoaXMubGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5mcmFtZXNTaW5jZUxhc3RGcHNVcGRhdGUgPSAwO1xuXG4gICAgICAgIERlYnVnLmxvZyhcImZwc1wiLCBcIkZQUzogXCIgKyB0aGlzLmZwcy50b0ZpeGVkKDEpKTtcbiAgICAgICAgU3RhdHMudXBkYXRlRlBTKHRoaXMuZnBzKTtcbiAgICB9XG5cblx0ICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIG1heGltdW0gYWxsb3dlZCBwaHlzaWNzIGZyYW1lcmF0ZSBvZiB0aGUgZ2FtZVxuICAgICAqIEBwYXJhbSBpbml0TWF4IFRoZSBtYXggZnJhbWVyYXRlXG4gICAgICovXG4gICAgc2V0TWF4VXBkYXRlRlBTKGluaXRNYXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1heFVwZGF0ZUZQUyA9IGluaXRNYXg7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZXN0ZXAgPSBNYXRoLmZsb29yKDEwMDAvdGhpcy5tYXhVcGRhdGVGUFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1heGltdW0gcmVuZGVyaW5nIGZyYW1lcmF0ZVxuICAgICAqIEBwYXJhbSBtYXhGUFMgVGhlIG1heCBmcmFtZXJhdGVcbiAgICAgKi9cbiAgICBzZXRNYXhGUFMobWF4RlBTOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5taW5GcmFtZURlbGF5ID0gMTAwMC9tYXhGUFM7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBnYW1lIGxvb3AgcGFuaWNzLCBpLmUuIGl0IHRyaWVzIHRvIHByb2Nlc3MgdG9vIG11Y2ggdGltZSBpbiBhbiBlbnRpcmUgZnJhbWUuXG5cdCAqIFRoaXMgd2lsbCByZXNldCB0aGUgYW1vdW50IG9mIHRpbWUgYmFjayB0byB6ZXJvLlxuXHQgKiBAcmV0dXJucyBUaGUgYW1vdW50IG9mIHRpbWUgd2UgYXJlIGRpc2NhcmRpbmcgZnJvbSBwcm9jZXNzaW5nLlxuXHQgKi9cblx0cmVzZXRGcmFtZURlbHRhKCkgOiBudW1iZXIge1xuICAgICAgICBsZXQgb2xkRnJhbWVEZWx0YSA9IHRoaXMuZnJhbWVEZWx0YTtcbiAgICAgICAgdGhpcy5mcmFtZURlbHRhID0gMDtcbiAgICAgICAgcmV0dXJuIG9sZEZyYW1lRGVsdGE7XG4gICAgfVxuXG5cdC8qKlxuICAgICAqIFN0YXJ0cyB1cCB0aGUgZ2FtZSBsb29wIGFuZCBjYWxscyB0aGUgZmlyc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICovXG5cdHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBpZighdGhpcy5zdGFydGVkKXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4gdGhpcy5kb0ZpcnN0RnJhbWUodGltZXN0YW1wKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlc3VtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG5cblx0LyoqXG4gICAgICogVGhlIGZpcnN0IGdhbWUgZnJhbWUgLSBpbml0aWFsaXplcyB0aGUgZmlyc3QgZnJhbWUgdGltZSBhbmQgYmVnaW5zIHRoZSByZW5kZXJcbiAgICAgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSBjdXJyZW50IHRpbWUgaW4gbXNcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZG9GaXJzdEZyYW1lKHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZCAge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2RvUmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLmxhc3RGcHNVcGRhdGUgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMuZnJhbWVzU2luY2VMYXN0RnBzVXBkYXRlID0gMDtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0KSA9PiB0aGlzLmRvRnJhbWUodCkpO1xuICAgIH1cblxuXHQvKipcblx0ICogSGFuZGxlcyBhbnkgcHJvY2Vzc2luZyB0aGF0IG5lZWRzIHRvIGJlIGRvbmUgYXQgdGhlIHN0YXJ0IG9mIHRoZSBmcmFtZVxuXHQgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSB0aW1lIG9mIHRoZSBmcmFtZSBpbiBtc1xuXHQgKi9cblx0cHJvdGVjdGVkIHN0YXJ0RnJhbWUodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcblx0XHQvLyBVcGRhdGUgdGhlIGFtb3VudCBvZiB0aW1lIHdlIG5lZWQgb3VyIHVwZGF0ZSB0byBwcm9jZXNzXG5cdFx0dGhpcy5mcmFtZURlbHRhICs9IHRpbWVzdGFtcCAtIHRoaXMubGFzdEZyYW1lVGltZTtcblxuXHRcdC8vIFNldCB0aGUgbmV3IHRpbWUgb2YgdGhlIGxhc3QgZnJhbWVcbiAgICAgICAgdGhpcy5sYXN0RnJhbWVUaW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZXN0aW1hdGUgb2YgdGhlIGZyYW1lcmF0ZVxuICAgICAgICBpZih0aW1lc3RhbXAgPiB0aGlzLmxhc3RGcHNVcGRhdGUgKyB0aGlzLmZwc1VwZGF0ZUludGVydmFsKXtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRlBTKHRpbWVzdGFtcCk7XG4gICAgICAgIH1cblxuXHRcdC8vIEluY3JlbWVudCB0aGUgbnVtYmVyIG9mIGZyYW1lc1xuICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgIHRoaXMuZnJhbWVzU2luY2VMYXN0RnBzVXBkYXRlKys7XG5cdH1cblxuXHQvKipcbiAgICAgKiBUaGUgbWFpbiBsb29wIG9mIHRoZSBnYW1lLiBVcGRhdGVzIHVudGlsIHRoZSBjdXJyZW50IHRpbWUgaXMgcmVhY2hlZC4gUmVuZGVycyBvbmNlXG4gICAgICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgY3VycmVudCB0aW1lIGluIG1zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGRvRnJhbWUgPSAodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICAgICAgLy8gSWYgYSBwYXVzZSB3YXMgZXhlY3V0ZWQsIHN0b3AgZG9pbmcgdGhlIGxvb3AuXG4gICAgICAgIGlmKHRoaXMucGF1c2VkKXsgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSB0byBwcmVwYXJlIGZvciBhbm90aGVyIHVwZGF0ZSBvciByZW5kZXJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodCkgPT4gdGhpcy5kb0ZyYW1lKHQpKTtcblxuICAgICAgICAvLyBJZiB3ZSBhcmUgdHJ5aW5nIHRvIHJlbmRlciB0b28gc29vbiwgZG8gbm90aGluZy5cbiAgICAgICAgaWYodGltZXN0YW1wIDwgdGhpcy5sYXN0RnJhbWVUaW1lICsgdGhpcy5taW5GcmFtZURlbGF5KXtcbiAgICAgICAgICAgIHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0Ly8gQSBmcmFtZSBpcyBhY3R1YWxseSBoYXBwZW5pbmdcblx0XHR0aGlzLnN0YXJ0RnJhbWUodGltZXN0YW1wKTtcblxuXHRcdC8vIFVwZGF0ZSB3aGlsZSB0aGVyZSBpcyBzdGlsbCB0aW1lIHRvIG1ha2UgdXAuIElmIHdlIGRvIHRvbyBtYW55IHVwZGF0ZSBzdGVwcywgcGFuaWMgYW5kIGV4aXQgdGhlIGxvb3AuXG5cdFx0dGhpcy5udW1VcGRhdGVTdGVwcyA9IDA7XG5cdFx0bGV0IHBhbmljID0gZmFsc2U7XG5cbiAgICAgICAgd2hpbGUodGhpcy5mcmFtZURlbHRhID49IHRoaXMudXBkYXRlVGltZXN0ZXApe1xuXHRcdFx0Ly8gRG8gYW4gdXBkYXRlXG5cdFx0XHR0aGlzLl9kb1VwZGF0ZSh0aGlzLnVwZGF0ZVRpbWVzdGVwLzEwMDApO1xuXHRcdFx0XG5cdFx0XHQvLyBSZW1vdmUgdGhlIHVwZGF0ZSBzdGVwIHRpbWUgZnJvbSB0aGUgdGltZSB3ZSBoYXZlIHRvIHByb2Nlc3NcbiAgICAgICAgICAgIHRoaXMuZnJhbWVEZWx0YSAtPSB0aGlzLnVwZGF0ZVRpbWVzdGVwO1xuXG5cdFx0XHQvLyBJbmNyZW1lbnQgc3RlcHMgYW5kIGNoZWNrIGlmIHdlJ3ZlIGRvbmUgdG9vIG1hbnlcbiAgICAgICAgICAgIHRoaXMubnVtVXBkYXRlU3RlcHMrKztcbiAgICAgICAgICAgIGlmKHRoaXMubnVtVXBkYXRlU3RlcHMgPiAxMDApe1xuICAgICAgICAgICAgICAgIHBhbmljID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZXMgYXJlIGRvbmUsIHJlbmRlclxuICAgICAgICB0aGlzLl9kb1JlbmRlcigpO1xuXG4gICAgICAgIC8vIFdyYXAgdXAgdGhlIGZyYW1lXG4gICAgICAgIHRoaXMuZmluaXNoRnJhbWUocGFuaWMpO1xuICAgIH1cblxuXHQvKipcblx0ICogV3JhcHMgdXAgdGhlIGZyYW1lIGFuZCBoYW5kbGVzIHRoZSBwYW5pYyBzdGF0ZSBpZiB0aGVyZSBpcyBvbmVcblx0ICogQHBhcmFtIHBhbmljIFdoZXRoZXIgb3Igbm90IHRoZSBsb29wIHBhbmlja2VkXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZmluaXNoRnJhbWUocGFuaWM6IGJvb2xlYW4pOiB2b2lkIHtcblx0XHRpZihwYW5pYykge1xuICAgICAgICAgICAgdmFyIGRpc2NhcmRlZFRpbWUgPSBNYXRoLnJvdW5kKHRoaXMucmVzZXRGcmFtZURlbHRhKCkpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdNYWluIGxvb3AgcGFuaWNrZWQsIHByb2JhYmx5IGJlY2F1c2UgdGhlIGJyb3dzZXIgdGFiIHdhcyBwdXQgaW4gdGhlIGJhY2tncm91bmQuIERpc2NhcmRpbmcgJyArIGRpc2NhcmRlZFRpbWUgKyAnbXMnKTtcbiAgICAgICAgfVxuXHR9XG5cbn0iLCJpbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi4vRXZlbnRzL0V2ZW50UXVldWVcIjtcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi4vSW5wdXQvSW5wdXRcIjtcbmltcG9ydCBJbnB1dEhhbmRsZXIgZnJvbSBcIi4uL0lucHV0L0lucHV0SGFuZGxlclwiO1xuaW1wb3J0IFJlY29yZGVyIGZyb20gXCIuLi9QbGF5YmFjay9FdmVudFJlY29yZGVyXCI7XG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4uL1NjZW5lR3JhcGgvVmlld3BvcnRcIjtcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL1NjZW5lTWFuYWdlclwiO1xuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vU291bmQvQXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgU3RhdHMgZnJvbSBcIi4uL0RlYnVnL1N0YXRzXCI7XG5pbXBvcnQgUmVuZGVyaW5nTWFuYWdlciBmcm9tIFwiLi4vUmVuZGVyaW5nL1JlbmRlcmluZ01hbmFnZXJcIjtcbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tIFwiLi4vUmVuZGVyaW5nL0NhbnZhc1JlbmRlcmVyXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4uL1V0aWxzL0NvbG9yXCI7XG5pbXBvcnQgR2FtZU9wdGlvbnMgZnJvbSBcIi4vR2FtZU9wdGlvbnNcIjtcbmltcG9ydCBHYW1lTG9vcCBmcm9tIFwiLi9HYW1lTG9vcFwiO1xuaW1wb3J0IEZpeGVkVXBkYXRlR2FtZUxvb3AgZnJvbSBcIi4vRml4ZWRVcGRhdGVHYW1lTG9vcFwiO1xuaW1wb3J0IEVudmlyb25tZW50SW5pdGlhbGl6ZXIgZnJvbSBcIi4vRW52aXJvbm1lbnRJbml0aWFsaXplclwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgUmVnaXN0cnlNYW5hZ2VyIGZyb20gXCIuLi9SZWdpc3RyeS9SZWdpc3RyeU1hbmFnZXJcIjtcbmltcG9ydCBXZWJHTFJlbmRlcmVyIGZyb20gXCIuLi9SZW5kZXJpbmcvV2ViR0xSZW5kZXJlclwiO1xuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9TY2VuZS9TY2VuZVwiO1xuaW1wb3J0IFJlY29yZGluZ01hbmFnZXIgZnJvbSBcIi4uL1BsYXliYWNrL1BsYXliYWNrTWFuYWdlclwiO1xuaW1wb3J0IElucHV0UmVwbGF5ZXIgZnJvbSBcIi4uL1BsYXliYWNrL0V2ZW50UmVwbGF5ZXJcIjtcbmltcG9ydCB7IFRpbWVyU3RhdGUgfSBmcm9tIFwiLi4vVGltaW5nL1RpbWVyXCI7XG5pbXBvcnQgUGxheWJhY2tNYW5hZ2VyIGZyb20gXCIuLi9QbGF5YmFjay9QbGF5YmFja01hbmFnZXJcIjtcblxuLyoqXG4gKiBUaGUgbWFpbiBsb29wIG9mIHRoZSBnYW1lIGVuZ2luZS5cbiAqIEhhbmRsZXMgdGhlIHVwZGF0ZSBvcmRlciwgYW5kIGluaXRpYWxpemVzIGFsbCBzdWJzeXN0ZW1zLlxuICogVGhlIEdhbWUgbWFuYWdlcyB0aGUgdXBkYXRlIGN5Y2xlLCBhbmQgcmVxdWVzdHMgYW5pbWF0aW9uIGZyYW1lcyB0byByZW5kZXIgdG8gdGhlIGJyb3dzZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGdhbWVPcHRpb25zOiBHYW1lT3B0aW9ucztcbiAgICBwcml2YXRlIHNob3dEZWJ1ZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIHNob3dTdGF0czogYm9vbGVhbjtcblxuICAgIC8vIFRoZSBnYW1lIGxvb3BcbiAgICBwcml2YXRlIGxvb3A6IEdhbWVMb29wO1xuXG4gICAgLy8gR2FtZSBjYW52YXMgYW5kIGl0cyB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgcmVhZG9ubHkgR0FNRV9DQU5WQVM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHJlYWRvbmx5IERFQlVHX0NBTlZBUzogSFRNTENhbnZhc0VsZW1lbnQ7XG5cdHJlYWRvbmx5IFdJRFRIOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgSEVJR0hUOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB2aWV3cG9ydDogVmlld3BvcnQ7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICBwcml2YXRlIGNsZWFyQ29sb3I6IENvbG9yO1xuICAgIFxuICAgIC8vIEFsbCBvZiB0aGUgbmVjZXNzYXJ5IHN1YnN5c3RlbXMgdGhhdCBuZWVkIHRvIHJ1biBoZXJlXG5cdHByaXZhdGUgZXZlbnRRdWV1ZTogRXZlbnRRdWV1ZTtcblx0cHJpdmF0ZSBpbnB1dEhhbmRsZXI6IElucHV0SGFuZGxlcjtcblx0cHJpdmF0ZSBwbGF5YmFja01hbmFnZXI6IFBsYXliYWNrTWFuYWdlcjtcbiAgICBwcml2YXRlIHJlc291cmNlTWFuYWdlcjogUmVzb3VyY2VNYW5hZ2VyO1xuICAgIHByaXZhdGUgc2NlbmVNYW5hZ2VyOiBTY2VuZU1hbmFnZXI7XG4gICAgcHJpdmF0ZSBhdWRpb01hbmFnZXI6IEF1ZGlvTWFuYWdlcjtcbiAgICBwcml2YXRlIHJlbmRlcmluZ01hbmFnZXI6IFJlbmRlcmluZ01hbmFnZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEdhbWVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgR2FtZSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KXtcbiAgICAgICAgLy8gQmVmb3JlIGFueXRoaW5nIGVsc2UsIGJ1aWxkIHRoZSBlbnZpcm9ubWVudFxuICAgICAgICBFbnZpcm9ubWVudEluaXRpYWxpemVyLnNldHVwKCk7XG5cbiAgICAgICAgLy8gVHlwZWNhc3QgdGhlIGNvbmZpZyBvYmplY3QgdG8gYSBHYW1lQ29uZmlnIG9iamVjdFxuICAgICAgICB0aGlzLmdhbWVPcHRpb25zID0gR2FtZU9wdGlvbnMucGFyc2Uob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5zaG93RGVidWcgPSB0aGlzLmdhbWVPcHRpb25zLnNob3dEZWJ1ZztcbiAgICAgICAgdGhpcy5zaG93U3RhdHMgPSB0aGlzLmdhbWVPcHRpb25zLnNob3dTdGF0cztcblxuICAgICAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYSBnYW1lIGxvb3BcbiAgICAgICAgdGhpcy5sb29wID0gbmV3IEZpeGVkVXBkYXRlR2FtZUxvb3AoKTtcblxuICAgICAgICAvLyBHZXQgdGhlIGdhbWUgY2FudmFzIGFuZCBnaXZlIGl0IGEgYmFja2dyb3VuZCBjb2xvclxuICAgICAgICB0aGlzLkdBTUVfQ0FOVkFTID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1jYW52YXNcIik7XG4gICAgICAgIHRoaXMuREVCVUdfQ0FOVkFTID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWctY2FudmFzXCIpO1xuICAgIFxuICAgICAgICAvLyBHaXZlIHRoZSBjYW52YXMgYSBzaXplIGFuZCBnZXQgdGhlIHJlbmRlcmluZyBjb250ZXh0XG4gICAgICAgIHRoaXMuV0lEVEggPSB0aGlzLmdhbWVPcHRpb25zLmNhbnZhc1NpemUueDtcbiAgICAgICAgdGhpcy5IRUlHSFQgPSB0aGlzLmdhbWVPcHRpb25zLmNhbnZhc1NpemUueTtcblxuICAgICAgICAvLyBUaGlzIHN0ZXAgTVVTVCBoYXBwZW4gYmVmb3JlIHRoZSByZXNvdXJjZSBtYW5hZ2VyIGRvZXMgYW55dGhpbmdcbiAgICAgICAgaWYodGhpcy5nYW1lT3B0aW9ucy51c2VXZWJHTCl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmluZ01hbmFnZXIgPSBuZXcgV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJpbmdNYW5hZ2VyID0gbmV3IENhbnZhc1JlbmRlcmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZVdpbmRvdygpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMucmVuZGVyaW5nTWFuYWdlci5pbml0aWFsaXplQ2FudmFzKHRoaXMuR0FNRV9DQU5WQVMsIHRoaXMuV0lEVEgsIHRoaXMuSEVJR0hUKTtcbiAgICAgICAgdGhpcy5jbGVhckNvbG9yID0gbmV3IENvbG9yKHRoaXMuZ2FtZU9wdGlvbnMuY2xlYXJDb2xvci5yLCB0aGlzLmdhbWVPcHRpb25zLmNsZWFyQ29sb3IuZywgdGhpcy5nYW1lT3B0aW9ucy5jbGVhckNvbG9yLmIpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgZGVidWdnaW5nIGFuZCBzdGF0c1xuICAgICAgICBEZWJ1Zy5pbml0aWFsaXplRGVidWdDYW52YXModGhpcy5ERUJVR19DQU5WQVMsIHRoaXMuV0lEVEgsIHRoaXMuSEVJR0hUKTtcbiAgICAgICAgU3RhdHMuaW5pdFN0YXRzKCk7XG5cbiAgICAgICAgaWYodGhpcy5nYW1lT3B0aW9ucy5zaG93U3RhdHMpIHtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHN0YXRzIG91dHB1dCBhbmQgbWFrZSBpdCBubyBsb25nZXIgaGlkZGVuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzXCIpLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2l6ZSB0aGUgdmlld3BvcnQgdG8gdGhlIGdhbWUgY2FudmFzXG4gICAgICAgIGNvbnN0IGNhbnZhc1NpemUgPSBuZXcgVmVjMih0aGlzLldJRFRILCB0aGlzLkhFSUdIVCk7XG4gICAgICAgIHRoaXMudmlld3BvcnQgPSBuZXcgVmlld3BvcnQoY2FudmFzU2l6ZSwgdGhpcy5nYW1lT3B0aW9ucy56b29tTGV2ZWwpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYWxsIG5lY2Vzc2FyeSBnYW1lIHN1YnN5c3RlbXNcbiAgICAgICAgdGhpcy5ldmVudFF1ZXVlID0gRXZlbnRRdWV1ZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIodGhpcy5HQU1FX0NBTlZBUyk7XG4gICAgICAgIElucHV0LmluaXRpYWxpemUodGhpcy52aWV3cG9ydCwgdGhpcy5nYW1lT3B0aW9ucy5pbnB1dHMpO1xuICAgICAgICB0aGlzLnJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLnNjZW5lTWFuYWdlciA9IG5ldyBTY2VuZU1hbmFnZXIodGhpcy52aWV3cG9ydCwgdGhpcy5yZW5kZXJpbmdNYW5hZ2VyKTtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIgPSBBdWRpb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5wbGF5YmFja01hbmFnZXIgPSBuZXcgUGxheWJhY2tNYW5hZ2VyKCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB1cCB0aGUgZ2FtZSB3aW5kb3cgdGhhdCBob2xkcyB0aGUgY2FudmFzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRpYWxpemVHYW1lV2luZG93KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBnYW1lV2luZG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXdpbmRvd1wiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBnYW1lIHdpbmRvd1xuICAgICAgICBnYW1lV2luZG93LnN0eWxlLndpZHRoID0gdGhpcy5XSURUSCArIFwicHhcIjtcbiAgICAgICAgZ2FtZVdpbmRvdy5zdHlsZS5oZWlnaHQgPSB0aGlzLkhFSUdIVCArIFwicHhcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyZWl2ZXMgdGhlIFNjZW5lTWFuYWdlciBmcm9tIHRoZSBHYW1lXG4gICAgICogQHJldHVybnMgVGhlIFNjZW5lTWFuYWdlclxuICAgICAqL1xuICAgIGdldFNjZW5lTWFuYWdlcigpOiBTY2VuZU1hbmFnZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZU1hbmFnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSBnYW1lXG4gICAgICovXG4gICAgc3RhcnQoSW5pdGlhbFNjZW5lOiBuZXcgKC4uLmFyZ3M6IGFueSkgPT4gU2NlbmUsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgLy8gU2V0IHRoZSB1cGRhdGUgZnVuY3Rpb24gb2YgdGhlIGxvb3BcbiAgICAgICAgdGhpcy5sb29wLmRvVXBkYXRlID0gKGRlbHRhVDogbnVtYmVyKSA9PiB0aGlzLnVwZGF0ZShkZWx0YVQpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcmVuZGVyIGZ1bmN0aW9uIG9mIHRoZSBsb29wXG4gICAgICAgIHRoaXMubG9vcC5kb1JlbmRlciA9ICgpID0+IHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgLy8gUHJlbG9hZCByZWdpc3RyeSBpdGVtc1xuICAgICAgICBSZWdpc3RyeU1hbmFnZXIucHJlbG9hZCgpO1xuXG4gICAgICAgIC8vIExvYWQgdGhlIGl0ZW1zIHdpdGggdGhlIHJlc291cmNlIG1hbmFnZXJcbiAgICAgICAgdGhpcy5yZXNvdXJjZU1hbmFnZXIubG9hZFJlc291cmNlc0Zyb21RdWV1ZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlJ3JlIGRvbmUgbG9hZGluZywgc3RhcnQgdGhlIGxvb3BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmluaXNoZWQgUHJlbG9hZCAtIGxvYWRpbmcgZmlyc3Qgc2NlbmVcIik7XG4gICAgICAgICAgICB0aGlzLnNjZW5lTWFuYWdlci5jaGFuZ2VUb1NjZW5lKEluaXRpYWxTY2VuZSwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5sb29wLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgYWxsIG5lY2Vzc2FyeSBzdWJzeXN0ZW1zIG9mIHRoZSBnYW1lLiBEZWZlcnMgc2NlbmUgdXBkYXRlcyB0byB0aGUgc2NlbmVNYW5hZ2VyXG4gICAgICogQHBhcmFtIGRlbHRhVCBUaGUgdGltZSBzaW5lIHRoZSBsYXN0IHVwZGF0ZVxuICAgICAqL1xuICAgIHVwZGF0ZShkZWx0YVQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICAvLyBIYW5kbGUgYWxsIGV2ZW50cyB0aGF0IGhhcHBlbmVkIHNpbmNlIHRoZSBzdGFydCBvZiB0aGUgbGFzdCBsb29wXG4gICAgICAgICAgICB0aGlzLmV2ZW50UXVldWUudXBkYXRlKGRlbHRhVCk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgaGFuZGxlciAtIGRpc2FibGluZy9lbmFibGluZyB1c2VyIGlucHV0XG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci51cGRhdGUoZGVsdGFUKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbnB1dCBkYXRhIHN0cnVjdHVyZXMgc28gZ2FtZSBvYmplY3RzIGNhbiBzZWUgdGhlIGlucHV0XG4gICAgICAgICAgICBJbnB1dC51cGRhdGUoZGVsdGFUKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZWNvcmRpbmcgb2YgdGhlIGdhbWVcbiAgICAgICAgICAgIHRoaXMucGxheWJhY2tNYW5hZ2VyLnVwZGF0ZShkZWx0YVQpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWxsIHNjZW5lc1xuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIudXBkYXRlKGRlbHRhVCk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhbGwgc291bmRzXG4gICAgICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci51cGRhdGUoZGVsdGFUKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gTG9hZCBvciB1bmxvYWQgYW55IHJlc291cmNlcyBpZiBuZWVkZWRcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VNYW5hZ2VyLnVwZGF0ZShkZWx0YVQpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgdGhpcy5sb29wLnBhdXNlKCk7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVbmNhdWdodCBFcnJvciBpbiBVcGRhdGUgLSBDcmFzaGluZyBncmFjZWZ1bGx5XCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgY2FudmFzIGFuZCBkZWZlcnMgc2NlbmUgcmVuZGVyaW5nIHRvIHRoZSBzY2VuZU1hbmFnZXIuIFJlbmRlcnMgdGhlIGRlYnVnIGNhbnZhc1xuICAgICAqL1xuICAgIHJlbmRlcigpOiB2b2lkIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGNhbnZhc2VzXG4gICAgICAgICAgICBEZWJ1Zy5jbGVhckNhbnZhcygpO1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmluZ01hbmFnZXIuY2xlYXIodGhpcy5jbGVhckNvbG9yKTtcblxuICAgICAgICAgICAgdGhpcy5zY2VuZU1hbmFnZXIucmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vIEhhY2t5IGRlYnVnIG1vZGVcbiAgICAgICAgICAgIGlmKElucHV0LmlzS2V5SnVzdFByZXNzZWQoXCJnXCIpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEZWJ1ZyA9ICF0aGlzLnNob3dEZWJ1ZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVidWcgcmVuZGVyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dEZWJ1Zyl7XG4gICAgICAgICAgICAgICAgRGVidWcucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc2hvd1N0YXRzKXtcbiAgICAgICAgICAgICAgICBTdGF0cy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIHRoaXMubG9vcC5wYXVzZSgpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5jYXVnaHQgRXJyb3IgaW4gUmVuZGVyIC0gQ3Jhc2hpbmcgZ3JhY2VmdWxseVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IE51bGxGdW5jIGZyb20gXCIuLi9EYXRhVHlwZXMvRnVuY3Rpb25zL051bGxGdW5jXCI7XG5cbi8qKlxuICogVGhlIG1haW4gZ2FtZSBsb29wIG9mIHRoZSBnYW1lLiBLZWVwcyB0cmFjayBvZiBmcHMgYW5kIGhhbmRsZXMgc2NoZWR1bGluZyBvZiB1cGRhdGVzIGFuZCByZW5kZXJpbmcuXG4gKiBUaGlzIGNsYXNzIGlzIGxlZnQgYWJzdHJhY3QsIHNvIHRoYXQgYSBzdWJjbGFzcyBjYW4gaGFuZGxlIGV4YWN0bHkgaG93IHRoZSBsb29wIGlzIHNjaGVkdWxlZC5cbiAqIEZvciBhbiBleGFtcGxlIG9mIGRpZmZlcmVudCB0eXBlcyBvZiBnYW1lIGxvb3Agc2NoZWR1bGluZywgY2hlY2sgb3V0IEBsaW5rKEdhbWUgUHJvZ3JhbW1pbmcgUGF0dGVybnMpKGh0dHBzOi8vZ2FtZXByb2dyYW1taW5ncGF0dGVybnMuY29tL2dhbWUtbG9vcC5odG1sKVxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBHYW1lTG9vcCB7XG5cblx0LyoqIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gYW4gdXBkYXRlIG9jY3VycyAqL1xuXHRwcm90ZWN0ZWQgX2RvVXBkYXRlOiBGdW5jdGlvbiA9IE51bGxGdW5jO1xuXG5cdHNldCBkb1VwZGF0ZSh1cGRhdGU6IEZ1bmN0aW9uKXtcblx0XHR0aGlzLl9kb1VwZGF0ZSA9IHVwZGF0ZTtcblx0fVxuXG5cdC8qKiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIGEgcmVuZGVyIG9jY3VycyAqL1xuXHRwcm90ZWN0ZWQgX2RvUmVuZGVyOiBGdW5jdGlvbiA9IE51bGxGdW5jO1xuXG5cblx0c2V0IGRvUmVuZGVyKHJlbmRlcjogRnVuY3Rpb24pe1xuXHRcdHRoaXMuX2RvUmVuZGVyID0gcmVuZGVyO1xuXHR9XG5cdFxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBjdXJyZW50IEZQUyBvZiB0aGUgZ2FtZVxuXHQgKi9cblx0YWJzdHJhY3QgZ2V0RlBTKCk6IG51bWJlcjtcblxuXHQvKipcbiAgICAgKiBTdGFydHMgdXAgdGhlIGdhbWUgbG9vcFxuICAgICAqL1xuXHRhYnN0cmFjdCBzdGFydCgpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBQYXVzZXMgdGhlIGdhbWUgbG9vcCwgdXN1YWxseSBmb3IgYW4gZXJyb3IgY29uZGl0aW9uLlxuXHQgKi9cblx0YWJzdHJhY3QgcGF1c2UoKTogdm9pZDtcblxuXHQvKipcblx0ICogUmVzdW1lcyB0aGUgZ2FtZSBsb29wLlxuXHQgKi9cblx0YWJzdHJhY3QgcmVzdW1lKCk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFJ1bnMgdGhlIGZpcnN0IGZyYW1lIG9mIHRoZSBnYW1lLiBObyB1cGRhdGUgb2NjdXJzIGhlcmUsIG9ubHkgYSByZW5kZXIuXG5cdCAqIFRoaXMgaXMgbmVlZGVkIHRvIGluaXRpYWxpemUgZGVsdGEgdGltZSB2YWx1ZXNcblx0ICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIG9mIHRoZSBmcmFtZS4gVGhpcyBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm93c2VyXG5cdCAqL1xuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgZG9GaXJzdEZyYW1lKHRpbWVzdGFtcDogbnVtYmVyKTogdm9pZDtcblxuXHQvKipcblx0ICogUnVuIGJlZm9yZSBhbnkgdXBkYXRlcyBvciB0aGUgcmVuZGVyIG9mIGEgZnJhbWUuXG5cdCAqIEBwYXJhbSB0aW1lc3RhbXAgVGhlIHRpbWVzdGFtcCBvZiB0aGUgZnJhbWUuIFRoaXMgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgYnJvd3NlclxuXHQgKi9cblx0cHJvdGVjdGVkIGFic3RyYWN0IHN0YXJ0RnJhbWUodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29yZSBvZiB0aGUgZnJhbWUsIHdoZXJlIGFueSBuZWNlc3NhcnkgdXBkYXRlcyBvY2N1ciwgYW5kIHdoZXJlIGEgcmVuZGVyIGhhcHBlbnNcblx0ICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIG9mIHRoZSBmcmFtZS4gVGhpcyBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm93c2VyXG5cdCAqL1xuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgZG9GcmFtZSh0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFdyYXBzIHVwIHRoZSBmcmFtZVxuXHQgKiBAcGFyYW0gcGFuaWMgV2hldGhlciBvciBub3QgdGhlIHVwZGF0ZSBjeWNsZSBwYW5pY2tlZC4gVGhpcyBoYXBwZW5zIHdoZW4gdG9vIG1hbnkgdXBkYXRlcyB0cnkgdG8gaGFwcGVuIGluIGEgc2luZ2xlIGZyYW1lXG5cdCAqL1xuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgZmluaXNoRnJhbWUocGFuaWM6IGJvb2xlYW4pOiB2b2lkO1xufSIsIi8vIEBpZ25vcmVQYWdlXG5cbi8qKiBUaGUgb3B0aW9ucyBmb3IgaW5pdGlhbGl6aW5nIHRoZSBAcmVmZXJlbmNlW0dhbWVMb29wXSAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9wdGlvbnMge1xuICAgIC8qKiBUaGUgc2l6ZSBvZiB0aGUgdmlld3BvcnQgKi9cbiAgICBjYW52YXNTaXplOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9O1xuXG4gICAgLyogVGhlIGRlZmF1bHQgbGV2ZWwgb2Ygem9vbSAqL1xuICAgIHpvb21MZXZlbDogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBjb2xvciB0byBjbGVhciB0aGUgY2FudmFzIHRvIGVhY2ggZnJhbWUgKi9cbiAgICBjbGVhckNvbG9yOiB7cjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcn1cblxuICAgIC8qIEEgbGlzdCBvZiBpbnB1dCBiaW5kaW5ncyAqL1xuICAgIGlucHV0czogQXJyYXk8e25hbWU6IHN0cmluZywga2V5czogQXJyYXk8c3RyaW5nPn0+O1xuXG4gICAgLyogV2hldGhlciBvciBub3QgdGhlIGRlYnVnIHJlbmRlcmluZyBzaG91bGQgb2NjdXIgKi9cbiAgICBzaG93RGVidWc6IGJvb2xlYW47XG5cbiAgICAvKiBXaGV0aGVyIG9yIG5vdCB0aGUgc3RhdHMgcmVuZGVyaW5nIHNob3VsZCBvY2N1ciAqL1xuICAgIHNob3dTdGF0czogYm9vbGVhbjtcblxuICAgIC8qIFdoZXRoZXIgb3Igbm90IHRvIHVzZSB3ZWJHTCAqL1xuICAgIHVzZVdlYkdMOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBkYXRhIGluIHRoZSByYXcgb3B0aW9ucyBvYmplY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZ2FtZSBvcHRpb25zIGFzIGEgUmVjb3JkXG4gICAgICogQHJldHVybnMgQSB2ZXJzaW9uIG9mIHRoZSBvcHRpb25zIGNvbnZlcnRlZCB0byBhIEdhbWVPcHRpb25zIG9iamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZShvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogR2FtZU9wdGlvbnMge1xuICAgICAgICBsZXQgZ09wdCA9IG5ldyBHYW1lT3B0aW9ucygpO1xuXG4gICAgICAgIGdPcHQuY2FudmFzU2l6ZSA9IG9wdGlvbnMuY2FudmFzU2l6ZSA/IG9wdGlvbnMuY2FudmFzU2l6ZSA6IHt4OiA4MDAsIHk6IDYwMH07XG4gICAgICAgIGdPcHQuem9vbUxldmVsID0gb3B0aW9ucy56b29tTGV2ZWwgPyBvcHRpb25zLnpvb21MZXZlbCA6IDE7XG4gICAgICAgIGdPcHQuY2xlYXJDb2xvciA9IG9wdGlvbnMuY2xlYXJDb2xvciA/IG9wdGlvbnMuY2xlYXJDb2xvciA6IHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1fTtcbiAgICAgICAgZ09wdC5pbnB1dHMgPSBvcHRpb25zLmlucHV0cyA/IG9wdGlvbnMuaW5wdXRzIDogW107XG4gICAgICAgIGdPcHQuc2hvd0RlYnVnID0gISFvcHRpb25zLnNob3dEZWJ1ZztcbiAgICAgICAgZ09wdC5zaG93U3RhdHMgPSAhIW9wdGlvbnMuc2hvd1N0YXRzO1xuICAgICAgICBnT3B0LnVzZVdlYkdMID0gISFvcHRpb25zLnVzZVdlYkdMO1xuXG4gICAgICAgIHJldHVybiBnT3B0O1xuICAgIH1cbn0iLCJpbXBvcnQgR2FtZU5vZGUgZnJvbSBcIi4vR2FtZU5vZGVcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IFJlZ2lvbiBmcm9tIFwiLi4vRGF0YVR5cGVzL0ludGVyZmFjZXMvUmVnaW9uXCI7XG5pbXBvcnQgQUFCQiBmcm9tIFwiLi4vRGF0YVR5cGVzL1NoYXBlcy9BQUJCXCI7XG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4uL1V0aWxzL0NvbG9yXCI7XG5pbXBvcnQgQ2lyY2xlIGZyb20gXCIuLi9EYXRhVHlwZXMvU2hhcGVzL0NpcmNsZVwiO1xuLyoqXG4gKiBUaGUgcmVwcmVzZW50YXRpb24gb2YgYW4gb2JqZWN0IGluIHRoZSBnYW1lIHdvcmxkIHRoYXQgY2FuIGJlIGRyYXduIHRvIHRoZSBzY3JlZW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ2FudmFzTm9kZSBleHRlbmRzIEdhbWVOb2RlIGltcGxlbWVudHMgUmVnaW9uIHtcblx0cHJpdmF0ZSBfc2l6ZTogVmVjMjtcblx0cHJpdmF0ZSBfc2NhbGU6IFZlYzI7XG5cdHByaXZhdGUgX2JvdW5kYXJ5OiBBQUJCO1xuXHRwcml2YXRlIF9oYXNDdXN0b21TaGFkZXI6IGJvb2xlYW47XG5cdHByaXZhdGUgX2N1c3RvbVNoYWRlcktleTogc3RyaW5nO1xuXHRwcml2YXRlIF9hbHBoYTogbnVtYmVyO1xuXG5cdC8qKiBBIGZsYWcgZm9yIHdoZXRoZXIgb3Igbm90IHRoZSBDYW52YXNOb2RlIGlzIHZpc2libGUgKi9cblx0dmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fc2l6ZSA9IG5ldyBWZWMyKDAsIDApO1xuXHRcdHRoaXMuX3NpemUuc2V0T25DaGFuZ2UoKCkgPT4gdGhpcy5zaXplQ2hhbmdlZCgpKTtcblx0XHR0aGlzLl9zY2FsZSA9IG5ldyBWZWMyKDEsIDEpO1xuXHRcdHRoaXMuX3NjYWxlLnNldE9uQ2hhbmdlKCgpID0+IHRoaXMuc2NhbGVDaGFuZ2VkKCkpO1xuXHRcdHRoaXMuX2JvdW5kYXJ5ID0gbmV3IEFBQkIoKTtcblx0XHR0aGlzLnVwZGF0ZUJvdW5kYXJ5KCk7XG5cdFx0dGhpcy5faGFzQ3VzdG9tU2hhZGVyID0gZmFsc2U7XG5cdH1cblxuXHRnZXQgYWxwaGEoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fYWxwaGE7XG5cdH1cblxuXHRzZXQgYWxwaGEoYTogbnVtYmVyKSB7XG5cdFx0dGhpcy5fYWxwaGEgPSBhO1xuXHR9XG5cblx0Z2V0IHNpemUoKTogVmVjMiB7XG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XG5cdH1cblxuXHRzZXQgc2l6ZShzaXplOiBWZWMyKXtcblx0XHR0aGlzLl9zaXplID0gc2l6ZTtcblx0XHQvLyBFbnRlciBhcyBhIGxhbWJkYSB0byBiaW5kIFwidGhpc1wiXG5cdFx0dGhpcy5fc2l6ZS5zZXRPbkNoYW5nZSgoKSA9PiB0aGlzLnNpemVDaGFuZ2VkKCkpO1xuXHRcdHRoaXMuc2l6ZUNoYW5nZWQoKTtcblx0fVxuXHRcblx0Z2V0IHNjYWxlKCk6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLl9zY2FsZTtcblx0fVxuXG5cdHNldCBzY2FsZShzY2FsZTogVmVjMil7XG5cdFx0dGhpcy5fc2NhbGUgPSBzY2FsZTtcblx0XHQvLyBFbnRlciBhcyBhIGxhbWJkYSB0byBiaW5kIFwidGhpc1wiXG5cdFx0dGhpcy5fc2NhbGUuc2V0T25DaGFuZ2UoKCkgPT4gdGhpcy5zY2FsZUNoYW5nZWQoKSk7XG5cdFx0dGhpcy5zY2FsZUNoYW5nZWQoKTtcblx0fVxuXG5cdHNldCBzY2FsZVgodmFsdWU6IG51bWJlcikge1xuXHRcdHRoaXMuc2NhbGUueCA9IHZhbHVlO1xuXHR9XG5cblx0c2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5zY2FsZS55ID0gdmFsdWU7XG5cdH1cblxuXHRnZXQgaGFzQ3VzdG9tU2hhZGVyKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9oYXNDdXN0b21TaGFkZXI7XG5cdH1cblxuXHRnZXQgY3VzdG9tU2hhZGVyS2V5KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX2N1c3RvbVNoYWRlcktleTtcblx0fVxuXG5cdC8vIEBvdmVycmlkZVxuXHRwcm90ZWN0ZWQgcG9zaXRpb25DaGFuZ2VkKCk6IHZvaWQge1xuXHRcdHN1cGVyLnBvc2l0aW9uQ2hhbmdlZCgpO1xuXHRcdHRoaXMudXBkYXRlQm91bmRhcnkoKTtcblx0fVxuXG5cdC8qKiBDYWxsZWQgaWYgdGhlIHNpemUgdmVjdG9yIGlzIGNoYW5nZWQgb3IgcmVwbGFjZWQuICovXG5cdHByb3RlY3RlZCBzaXplQ2hhbmdlZCgpOiB2b2lkIHtcblx0XHR0aGlzLnVwZGF0ZUJvdW5kYXJ5KCk7XG5cdH1cblxuXHQvKiogQ2FsbGVkIGlmIHRoZSBzY2FsZSB2ZWN0b3IgaXMgY2hhbmdlZCBvciByZXBsYWNlZCAqL1xuXHRwcm90ZWN0ZWQgc2NhbGVDaGFuZ2VkKCk6IHZvaWQge1xuXHRcdHRoaXMudXBkYXRlQm91bmRhcnkoKTtcblx0fVxuXG5cdC8vIEBkb2NJZ25vcmVcblx0LyoqIENhbGxlZCBpZiB0aGUgcG9zaXRpb24sIHNpemUsIG9yIHNjYWxlIG9mIHRoZSBDYW52YXNOb2RlIGlzIGNoYW5nZWQuIFVwZGF0ZXMgdGhlIGJvdW5kYXJ5LiAqL1xuXHRwcml2YXRlIHVwZGF0ZUJvdW5kYXJ5KCk6IHZvaWQge1xuXHRcdHRoaXMuX2JvdW5kYXJ5LmNlbnRlci5zZXQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xuXHRcdHRoaXMuX2JvdW5kYXJ5LmhhbGZTaXplLnNldCh0aGlzLnNpemUueCp0aGlzLnNjYWxlLngvMiwgdGhpcy5zaXplLnkqdGhpcy5zY2FsZS55LzIpO1xuXHR9XG5cdFxuXHRnZXQgYm91bmRhcnkoKTogQUFCQiB7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kYXJ5O1xuXHR9XG5cblx0Z2V0IHNpemVXaXRoWm9vbSgpOiBWZWMyIHtcblx0XHRsZXQgem9vbSA9IHRoaXMuc2NlbmUuZ2V0Vmlld1NjYWxlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5ib3VuZGFyeS5oYWxmU2l6ZS5jbG9uZSgpLnNjYWxlZCh6b29tLCB6b29tKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgY3VzdG9tIHNoYWRlciB0byB0aGlzIENhbnZhc05vZGVcblx0ICogQHBhcmFtIGtleSBUaGUgcmVnaXN0cnkga2V5IG9mIHRoZSBTaGFkZXJUeXBlXG5cdCAqL1xuXHR1c2VDdXN0b21TaGFkZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcblx0XHR0aGlzLl9oYXNDdXN0b21TaGFkZXIgPSB0cnVlO1xuXHRcdHRoaXMuX2N1c3RvbVNoYWRlcktleSA9IGtleTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50ICh4LCB5KSBpcyBpbnNpZGUgb2YgdGhpcyBjYW52YXMgb2JqZWN0XG5cdCAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBwb2ludFxuXHQgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgcG9pbnRcblx0ICogQHJldHVybnMgQSBmbGFnIHJlcHJlc2VudGluZyB3aGV0aGVyIG9yIG5vdCB0aGlzIG5vZGUgY29udGFpbnMgdGhlIHBvaW50LlxuXHQgKi9cblx0Y29udGFpbnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRhcnkuY29udGFpbnNQb2ludChuZXcgVmVjMih4LCB5KSk7XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcblx0ZGVidWdSZW5kZXIoKTogdm9pZCB7XG5cdFx0RGVidWcuZHJhd0JveCh0aGlzLnJlbGF0aXZlUG9zaXRpb24sIHRoaXMuc2l6ZVdpdGhab29tLCBmYWxzZSwgQ29sb3IuQkxVRSk7XG5cdFx0c3VwZXIuZGVidWdSZW5kZXIoKTtcblx0fVxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IFJlY2VpdmVyIGZyb20gXCIuLi9FdmVudHMvUmVjZWl2ZXJcIjtcbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuLi9FdmVudHMvRW1pdHRlclwiO1xuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9TY2VuZS9TY2VuZVwiO1xuaW1wb3J0IExheWVyIGZyb20gXCIuLi9TY2VuZS9MYXllclwiO1xuaW1wb3J0IEFJIGZyb20gXCIuLi9EYXRhVHlwZXMvSW50ZXJmYWNlcy9BSVwiO1xuaW1wb3J0IFBoeXNpY2FsIGZyb20gXCIuLi9EYXRhVHlwZXMvSW50ZXJmYWNlcy9QaHlzaWNhbFwiO1xuaW1wb3J0IFBvc2l0aW9uZWQgZnJvbSBcIi4uL0RhdGFUeXBlcy9JbnRlcmZhY2VzL1Bvc2l0aW9uZWRcIjtcbmltcG9ydCB7IGlzUmVnaW9uIH0gZnJvbSBcIi4uL0RhdGFUeXBlcy9JbnRlcmZhY2VzL1JlZ2lvblwiO1xuaW1wb3J0IFVuaXF1ZSBmcm9tIFwiLi4vRGF0YVR5cGVzL0ludGVyZmFjZXMvVW5pcXVlXCI7XG5pbXBvcnQgVXBkYXRlYWJsZSBmcm9tIFwiLi4vRGF0YVR5cGVzL0ludGVyZmFjZXMvVXBkYXRlYWJsZVwiO1xuaW1wb3J0IERlYnVnUmVuZGVyYWJsZSBmcm9tIFwiLi4vRGF0YVR5cGVzL0ludGVyZmFjZXMvRGVidWdSZW5kZXJhYmxlXCI7XG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0RhdGFUeXBlcy9JbnRlcmZhY2VzL0FjdG9yXCI7XG5pbXBvcnQgU2hhcGUgZnJvbSBcIi4uL0RhdGFUeXBlcy9TaGFwZXMvU2hhcGVcIjtcbmltcG9ydCBBQUJCIGZyb20gXCIuLi9EYXRhVHlwZXMvU2hhcGVzL0FBQkJcIjtcbmltcG9ydCBOYXZpZ2F0aW9uUGF0aCBmcm9tIFwiLi4vUGF0aGZpbmRpbmcvTmF2aWdhdGlvblBhdGhcIjtcbmltcG9ydCBUd2VlbkNvbnRyb2xsZXIgZnJvbSBcIi4uL1JlbmRlcmluZy9BbmltYXRpb25zL1R3ZWVuQ29udHJvbGxlclwiO1xuaW1wb3J0IERlYnVnIGZyb20gXCIuLi9EZWJ1Zy9EZWJ1Z1wiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9VdGlscy9Db2xvclwiO1xuaW1wb3J0IENpcmNsZSBmcm9tIFwiLi4vRGF0YVR5cGVzL1NoYXBlcy9DaXJjbGVcIjtcbmltcG9ydCBHb2FwQUkgZnJvbSBcIi4uL0RhdGFUeXBlcy9Hb2FwL0dvYXBBSVwiO1xuXG4vKipcbiAqIFRoZSByZXByZXNlbnRhdGlvbiBvZiBhbiBvYmplY3QgaW4gdGhlIGdhbWUgd29ybGQuXG4gKiBUbyBjb25zdHJ1Y3QgR2FtZU5vZGVzLCBzZWUgdGhlIEByZWZlcmVuY2VbU2NlbmVdIGRvY3VtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVOb2RlIGltcGxlbWVudHMgUG9zaXRpb25lZCwgVW5pcXVlLCBVcGRhdGVhYmxlLCBQaHlzaWNhbCwgQWN0b3IsIERlYnVnUmVuZGVyYWJsZSB7XG5cdC8qLS0tLS0tLS0tLSBQT1NJVElPTkVEIC0tLS0tLS0tLS0qL1xuXHRwcml2YXRlIF9wb3NpdGlvbjogVmVjMjtcblxuXHQvKi0tLS0tLS0tLS0gVU5JUVVFIC0tLS0tLS0tLS0qL1xuXHRwcml2YXRlIF9pZDogbnVtYmVyO1xuXG5cdC8qLS0tLS0tLS0tLSBQSFlTSUNBTCAtLS0tLS0tLS0tKi9cblx0aGFzUGh5c2ljczogYm9vbGVhbiA9IGZhbHNlO1xuXHRtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblx0ZnJvemVuOiBib29sZWFuID0gZmFsc2U7XG5cdG9uR3JvdW5kOiBib29sZWFuID0gZmFsc2U7XG5cdG9uV2FsbDogYm9vbGVhbiA9IGZhbHNlO1xuXHRvbkNlaWxpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblx0YWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cdGNvbGxpc2lvblNoYXBlOiBTaGFwZTtcblx0Y29sbGlkZXJPZmZzZXQ6IFZlYzI7XG5cdGlzU3RhdGljOiBib29sZWFuO1xuXHRpc0NvbGxpZGFibGU6IGJvb2xlYW47XG5cdGlzVHJpZ2dlcjogYm9vbGVhbjtcblx0dHJpZ2dlck1hc2s6IG51bWJlcjtcblx0dHJpZ2dlckVudGVyczogQXJyYXk8c3RyaW5nPjtcblx0dHJpZ2dlckV4aXRzOiBBcnJheTxzdHJpbmc+O1xuXHRfdmVsb2NpdHk6IFZlYzI7XG5cdHN3ZXB0UmVjdDogQUFCQjtcblx0Y29sbGlkZWRXaXRoVGlsZW1hcDogYm9vbGVhbjtcblx0Z3JvdXA6IG51bWJlcjtcblx0aXNQbGF5ZXI6IGJvb2xlYW47XG5cdGlzQ29sbGlkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0LyotLS0tLS0tLS0tIEFDVE9SIC0tLS0tLS0tLS0qL1xuXHRfYWk6IEFJIHwgR29hcEFJO1xuXHRhaUFjdGl2ZTogYm9vbGVhbjtcblx0cGF0aDogTmF2aWdhdGlvblBhdGg7XG5cdHBhdGhmaW5kaW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0LyotLS0tLS0tLS0tIEdFTkVSQUwgLS0tLS0tLS0tLSovXG5cdC8qKiBBbiBldmVudCByZWNlaXZlci4gKi9cblx0cHJvdGVjdGVkIHJlY2VpdmVyOiBSZWNlaXZlcjtcblx0LyoqIEFuIGV2ZW50IGVtaXR0ZXIuICovXG5cdHByb3RlY3RlZCBlbWl0dGVyOiBFbWl0dGVyO1xuXHQvKiogQSByZWZlcmVuY2UgdG8gdGhlIHNjZW5lIHRoaXMgR2FtZU5vZGUgaXMgYSBwYXJ0IG9mLiAqL1xuXHRwcm90ZWN0ZWQgc2NlbmU6IFNjZW5lO1xuXHQvKiogVGhlIHZpc3VhbCBsYXllciB0aGlzIEdhbWVOb2RlIHJlc2lkZXMgaW4uICovXG5cdHByb3RlY3RlZCBsYXllcjogTGF5ZXI7XG5cdC8qKiBBIHV0aWxpdHkgdGhhdCBhbGxvd3MgdGhlIHVzZSBvZiB0d2VlbnMgb24gdGhpcyBHYW1lTm9kZSAqL1xuXHR0d2VlbnM6IFR3ZWVuQ29udHJvbGxlcjtcblx0LyoqIEEgdHdlZW5hYmxlIHByb3BlcnR5IGZvciByb3RhdGlvbi4gRG9lcyBub3QgYWZmZWN0IHRoZSBib3VuZGluZyBib3ggb2YgdGhpcyBHYW1lTm9kZSAtIE9ubHkgcmVuZGVyaW5nLiAqL1xuXHRyb3RhdGlvbjogbnVtYmVyO1xuXHQvKiogVGhlIG9wYWNpdHkgdmFsdWUgb2YgdGhpcyBHYW1lTm9kZSAqL1xuXHRhYnN0cmFjdCBzZXQgYWxwaGEoYTogbnVtYmVyKTtcblxuXHRhYnN0cmFjdCBnZXQgYWxwaGEoKTogbnVtYmVyO1xuXG5cdC8vIENvbnN0cnVjdG9yIGRvY3MgYXJlIGlnbm9yZWQsIGFzIHRoZSB1c2VyIHNob3VsZCBOT1QgY3JlYXRlIG5ldyBHYW1lTm9kZXMgd2l0aCBhIHJhdyBjb25zdHJ1Y3RvclxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX3Bvc2l0aW9uID0gbmV3IFZlYzIoMCwgMCk7XG5cdFx0dGhpcy5fcG9zaXRpb24uc2V0T25DaGFuZ2UoKCkgPT4gdGhpcy5wb3NpdGlvbkNoYW5nZWQoKSk7XG5cdFx0dGhpcy5yZWNlaXZlciA9IG5ldyBSZWNlaXZlcigpO1xuXHRcdHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cdFx0dGhpcy50d2VlbnMgPSBuZXcgVHdlZW5Db250cm9sbGVyKHRoaXMpO1xuXHRcdHRoaXMucm90YXRpb24gPSAwO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMudHdlZW5zLmRlc3Ryb3koKTtcblx0XHR0aGlzLnJlY2VpdmVyLmRlc3Ryb3koKTtcblxuXHRcdGlmKHRoaXMuaGFzUGh5c2ljcyl7XG5cdFx0XHR0aGlzLnJlbW92ZVBoeXNpY3MoKTtcblx0XHR9XG5cblx0XHRpZih0aGlzLl9haSl7XG5cdFx0XHR0aGlzLl9haS5kZXN0cm95KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fYWk7XG5cdFx0XHR0aGlzLnNjZW5lLmdldEFJTWFuYWdlcigpLnJlbW92ZUFjdG9yKHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMpO1xuXG5cdFx0dGhpcy5sYXllci5yZW1vdmVOb2RlKHRoaXMpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tIFBPU0lUSU9ORUQgLS0tLS0tLS0tLSovXG5cdGdldCBwb3NpdGlvbigpOiBWZWMyIHtcblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb247XG5cdH1cblxuXHRzZXQgcG9zaXRpb24ocG9zOiBWZWMyKSB7XG5cdFx0dGhpcy5fcG9zaXRpb24gPSBwb3M7XG5cdFx0dGhpcy5fcG9zaXRpb24uc2V0T25DaGFuZ2UoKCkgPT4gdGhpcy5wb3NpdGlvbkNoYW5nZWQoKSk7XG5cdFx0dGhpcy5wb3NpdGlvbkNoYW5nZWQoKTtcblx0fVxuXG5cdGdldCByZWxhdGl2ZVBvc2l0aW9uKCk6IFZlYzIge1xuXHRcdHJldHVybiB0aGlzLmluUmVsYXRpdmVDb29yZGluYXRlcyh0aGlzLnBvc2l0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHBvaW50IHRvIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSB6b29tIGFuZCBvcmlnaW4gb2YgdGhpcyBub2RlXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgdG8gY29udmVyXG5cdCAqIEByZXR1cm5zIEEgbmV3IFZlYzIgcmVwcmVzZW50aW5nIHRoZSBwb2ludCBpbiByZWxhdGl2ZSBjb29yZGluYXRlc1xuXHQgKi9cblx0aW5SZWxhdGl2ZUNvb3JkaW5hdGVzKHBvaW50OiBWZWMyKTogVmVjMiB7XG5cdFx0bGV0IG9yaWdpbiA9IHRoaXMuc2NlbmUuZ2V0Vmlld1RyYW5zbGF0aW9uKHRoaXMpO1xuXHRcdGxldCB6b29tID0gdGhpcy5zY2VuZS5nZXRWaWV3U2NhbGUoKTtcblx0XHRyZXR1cm4gcG9pbnQuY2xvbmUoKS5zdWIob3JpZ2luKS5zY2FsZSh6b29tKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLSBVTklRVUUgLS0tLS0tLS0tLSovXG5cdGdldCBpZCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fVxuXG5cdHNldCBpZChpZDogbnVtYmVyKSB7XG5cdFx0Ly8gaWQgY2FuIG9ubHkgYmUgc2V0IG9uY2Vcblx0XHRpZih0aGlzLl9pZCA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IFwiQXR0ZW1wdGVkIHRvIGFzc2lnbiBpZCB0byBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBpZC5cIlxuXHRcdH1cblx0fVxuXG5cdC8qLS0tLS0tLS0tLSBQSFlTSUNBTCAtLS0tLS0tLS0tKi9cblx0Ly8gQGltcGxlbWVudGVkXG5cdC8qKlxuICAgICAqIEBwYXJhbSB2ZWxvY2l0eSBUaGUgdmVsb2NpdHkgd2l0aCB3aGljaCB0byBtb3ZlIHRoZSBvYmplY3QuXG4gICAgICovXG5cdG1vdmUodmVsb2NpdHk6IFZlYzIpOiB2b2lkIHtcblx0XHRpZih0aGlzLmZyb3plbikgcmV0dXJuO1xuXHRcdHRoaXMubW92aW5nID0gdHJ1ZTtcblx0XHR0aGlzLl92ZWxvY2l0eSA9IHZlbG9jaXR5O1xuXHR9O1xuXG5cdG1vdmVPblBhdGgoc3BlZWQ6IG51bWJlciwgcGF0aDogTmF2aWdhdGlvblBhdGgpOiB2b2lkIHtcblx0XHRpZih0aGlzLmZyb3plbiB8fCBwYXRoLmlzRG9uZSgpKSByZXR1cm47XG5cdFx0dGhpcy5wYXRoID0gcGF0aDtcblx0XHRsZXQgZGlyID0gcGF0aC5nZXRNb3ZlRGlyZWN0aW9uKHRoaXMpO1xuXHRcdHRoaXMubW92aW5nID0gdHJ1ZTtcblx0XHR0aGlzLnBhdGhmaW5kaW5nID0gdHJ1ZTtcblx0XHR0aGlzLl92ZWxvY2l0eSA9IGRpci5zY2FsZShzcGVlZCk7XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmVsb2NpdHkgVGhlIHZlbG9jaXR5IHdpdGggd2hpY2ggdGhlIG9iamVjdCB3aWxsIG1vdmUuXG4gICAgICovXG5cdGZpbmlzaE1vdmUoKTogdm9pZCB7XG5cdFx0dGhpcy5tb3ZpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnBvc2l0aW9uLmFkZCh0aGlzLl92ZWxvY2l0eSk7XG5cdFx0aWYodGhpcy5wYXRoZmluZGluZyl7XG5cdFx0XHR0aGlzLnBhdGguaGFuZGxlUGF0aFByb2dyZXNzKHRoaXMpO1xuXHRcdFx0dGhpcy5wYXRoID0gbnVsbDtcblx0XHRcdHRoaXMucGF0aGZpbmRpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcblx0LyoqXG5cdCAqIEBwYXJhbSBjb2xsaXNpb25TaGFwZSBUaGUgY29sbGlkZXIgZm9yIHRoaXMgb2JqZWN0LiBJZiB0aGlzIGhhcyBhIHJlZ2lvbiAoaW1wbGVtZW50cyBSZWdpb24pLFxuXHQgKiBpdCB3aWxsIGJlIHVzZWQgd2hlbiBubyBjb2xsaXNpb24gc2hhcGUgaXMgc3BlY2lmaWVkIChvciBpZiBjb2xsaXNpb24gc2hhcGUgaXMgbnVsbCkuXG5cdCAqIEBwYXJhbSBpc0NvbGxpZGFibGUgV2hldGhlciB0aGlzIGlzIGNvbGxpZGFibGUgb3Igbm90LiBUcnVlIGJ5IGRlZmF1bHQuXG5cdCAqIEBwYXJhbSBpc1N0YXRpYyBXaGV0aGVyIHRoaXMgaXMgc3RhdGljIG9yIG5vdC4gRmFsc2UgYnkgZGVmYXVsdFxuXHQgKi9cblx0YWRkUGh5c2ljcyhjb2xsaXNpb25TaGFwZT86IFNoYXBlLCBjb2xsaWRlck9mZnNldD86IFZlYzIsIGlzQ29sbGlkYWJsZTogYm9vbGVhbiA9IHRydWUsIGlzU3RhdGljOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblx0XHQvLyBJbml0aWFsaXplIHRoZSBwaHlzaWNzIHZhcmlhYmxlc1xuXHRcdHRoaXMuaGFzUGh5c2ljcyA9IHRydWU7XG5cdFx0dGhpcy5tb3ZpbmcgPSBmYWxzZTtcblx0XHR0aGlzLm9uR3JvdW5kID0gZmFsc2U7XG5cdFx0dGhpcy5vbldhbGwgPSBmYWxzZTtcblx0XHR0aGlzLm9uQ2VpbGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuYWN0aXZlID0gdHJ1ZTtcblx0XHR0aGlzLmlzQ29sbGlkYWJsZSA9IGlzQ29sbGlkYWJsZTtcblx0XHR0aGlzLmlzU3RhdGljID0gaXNTdGF0aWM7XG5cdFx0dGhpcy5pc1RyaWdnZXIgPSBmYWxzZTtcblx0XHR0aGlzLnRyaWdnZXJNYXNrID0gMDtcblx0XHR0aGlzLnRyaWdnZXJFbnRlcnMgPSBuZXcgQXJyYXkoMzIpO1xuXHRcdHRoaXMudHJpZ2dlckV4aXRzID0gbmV3IEFycmF5KDMyKTtcblx0XHR0aGlzLl92ZWxvY2l0eSA9IFZlYzIuWkVSTztcblx0XHR0aGlzLnN3ZXB0UmVjdCA9IG5ldyBBQUJCKCk7XG5cdFx0dGhpcy5jb2xsaWRlZFdpdGhUaWxlbWFwID0gZmFsc2U7XG5cdFx0dGhpcy5ncm91cCA9IC0xO1x0XHRcdFx0XHQvLyBUaGUgZGVmYXVsdCBncm91cCwgY29sbGlkZXMgd2l0aCBldmVyeXRoaW5nXG5cblx0XHQvLyBTZXQgdGhlIGNvbGxpc2lvbiBzaGFwZSBpZiBwcm92aWRlZCwgb3Igc2ltcGx5IHVzZSB0aGUgdGhlIHJlZ2lvbiBpZiB0aGVyZSBpcyBvbmUuXG5cdFx0aWYoY29sbGlzaW9uU2hhcGUpe1xuXHRcdFx0dGhpcy5jb2xsaXNpb25TaGFwZSA9IGNvbGxpc2lvblNoYXBlO1xuXHRcdFx0dGhpcy5jb2xsaXNpb25TaGFwZS5jZW50ZXIgPSB0aGlzLnBvc2l0aW9uO1xuXHRcdH0gZWxzZSBpZiAoaXNSZWdpb24odGhpcykpIHtcblx0XHRcdC8vIElmIHRoZSBnYW1lbm9kZSBoYXMgYSByZWdpb24gYW5kIG5vIG90aGVyIGlzIHNwZWNpZmllZCwgdXNlIHRoYXRcblx0XHRcdHRoaXMuY29sbGlzaW9uU2hhcGUgPSAoPGFueT50aGlzKS5ib3VuZGFyeS5jbG9uZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBcIk5vIGNvbGxpc2lvbiBzaGFwZSBzcGVjaWZpZWQgZm9yIHBoeXNpY3Mgb2JqZWN0LlwiXG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2Ugd2VyZSBwcm92aWRlZCB3aXRoIGEgY29sbGlkZXIgb2Zmc2V0LCBzZXQgaXQuIE90aGVyd2lzZSB0aGVyZSBpcyBubyBvZmZzZXQsIHNvIHVzZSB0aGUgemVybyB2ZWN0b3Jcblx0XHRpZihjb2xsaWRlck9mZnNldCl7XG5cdFx0XHR0aGlzLmNvbGxpZGVyT2Zmc2V0ID0gY29sbGlkZXJPZmZzZXQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY29sbGlkZXJPZmZzZXQgPSBWZWMyLlpFUk87XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3dlcHQgcmVjdFxuXHRcdHRoaXMuc3dlcHRSZWN0ID0gdGhpcy5jb2xsaXNpb25TaGFwZS5nZXRCb3VuZGluZ1JlY3QoKTtcblxuXHRcdC8vIFJlZ2lzdGVyIHRoZSBvYmplY3Qgd2l0aCBwaHlzaWNzXG5cdFx0dGhpcy5zY2VuZS5nZXRQaHlzaWNzTWFuYWdlcigpLnJlZ2lzdGVyT2JqZWN0KHRoaXMpO1xuXHR9XG5cblx0LyoqIFJlbW92ZXMgdGhpcyBvYmplY3QgZnJvbSB0aGUgcGh5c2ljcyBzeXN0ZW0gKi9cbiAgICByZW1vdmVQaHlzaWNzKCk6IHZvaWQge1xuXHRcdC8vIFJlbW92ZSB0aGlzIGZyb20gdGhlIHBoeXNpY3MgbWFuYWdlclxuXHRcdHRoaXMuc2NlbmUuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZXJlZ2lzdGVyT2JqZWN0KHRoaXMpO1xuXG5cdFx0Ly8gTnVsbGlmeSBhbGwgcGh5c2ljcyBmaWVsZHNcblx0XHR0aGlzLmhhc1BoeXNpY3MgPSBmYWxzZTtcblx0XHR0aGlzLm1vdmluZyA9IGZhbHNlO1xuXHRcdHRoaXMub25Hcm91bmQgPSBmYWxzZTtcblx0XHR0aGlzLm9uV2FsbCA9IGZhbHNlO1xuXHRcdHRoaXMub25DZWlsaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0XHR0aGlzLmlzQ29sbGlkYWJsZSA9IGZhbHNlO1xuXHRcdHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcblx0XHR0aGlzLmlzVHJpZ2dlciA9IGZhbHNlO1xuXHRcdHRoaXMudHJpZ2dlck1hc2sgPSAwO1xuXHRcdHRoaXMudHJpZ2dlckVudGVycyA9IG51bGw7XG5cdFx0dGhpcy50cmlnZ2VyRXhpdHMgPSBudWxsO1xuXHRcdHRoaXMuX3ZlbG9jaXR5ID0gVmVjMi5aRVJPO1xuXHRcdHRoaXMuc3dlcHRSZWN0ID0gbnVsbDtcblx0XHR0aGlzLmNvbGxpZGVkV2l0aFRpbGVtYXAgPSBmYWxzZTtcblx0XHR0aGlzLmdyb3VwID0gLTE7XG5cdFx0dGhpcy5jb2xsaXNpb25TaGFwZSA9IG51bGw7XG5cdFx0dGhpcy5jb2xsaWRlck9mZnNldCA9IFZlYzIuWkVSTztcblx0XHR0aGlzLnN3ZXB0UmVjdCA9IG51bGw7XG5cdH1cblxuXHQvKiogRGlzYWJsZXMgcGh5c2ljcyBtb3ZlbWVudCBmb3IgdGhpcyBub2RlICovXG5cdGZyZWV6ZSgpOiB2b2lkIHtcblx0XHR0aGlzLmZyb3plbiA9IHRydWU7XG5cdH1cblxuXHQvKiogUmVlbmFibGVzIHBoeXNpY3MgbW92ZW1lbnQgZm9yIHRoaXMgbm9kZSAqL1xuXHR1bmZyZWV6ZSgpOiB2b2lkIHtcblx0XHR0aGlzLmZyb3plbiA9IGZhbHNlO1xuXHR9XG5cbiAgICAvKiogUHJldmVudHMgdGhpcyBvYmplY3QgZnJvbSBwYXJ0aWNpcGF0aW5nIGluIGFsbCBjb2xsaXNpb25zIGFuZCB0cmlnZ2Vycy4gSXQgY2FuIHN0aWxsIG1vdmUuICovXG4gICAgZGlzYWJsZVBoeXNpY3MoKTogdm9pZCB7XG5cdFx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0fVxuXG4gICAgLyoqIEVuYWJsZXMgdGhpcyBvYmplY3QgdG8gcGFydGljaXBhdGUgaW4gY29sbGlzaW9ucyBhbmQgdHJpZ2dlcnMuIFRoaXMgaXMgb25seSBuZWNlc3NhcnkgaWYgZGlzYWJsZVBoeXNpY3Mgd2FzIGNhbGxlZCAqL1xuICAgIGVuYWJsZVBoeXNpY3MoKTogdm9pZCB7XG5cdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGNvbGxpZGVyIGZvciB0aGlzIEdhbWVOb2RlXG5cdCAqIEBwYXJhbSBjb2xsaWRlciBUaGUgbmV3IGNvbGxpZGVyIHRvIHVzZVxuXHQgKi9cblx0c2V0Q29sbGlzaW9uU2hhcGUoY29sbGlkZXI6IFNoYXBlKTogdm9pZCB7XG5cdFx0dGhpcy5jb2xsaXNpb25TaGFwZSA9IGNvbGxpZGVyO1xuXHRcdHRoaXMuY29sbGlzaW9uU2hhcGUuY2VudGVyLmNvcHkodGhpcy5wb3NpdGlvbik7XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcblx0LyoqXG4gICAgICogU2V0cyB0aGlzIG9iamVjdCB0byBiZSBhIHRyaWdnZXIgZm9yIGEgc3BlY2lmaWMgZ3JvdXBcbiAgICAgKiBAcGFyYW0gZ3JvdXAgVGhlIG5hbWUgb2YgdGhlIGdyb3VwIHRoYXQgYWN0aXZhdGVzIHRoZSB0cmlnZ2VyXG4gICAgICogQHBhcmFtIG9uRW50ZXIgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHNlbmQgd2hlbiB0aGlzIHRyaWdnZXIgaXMgYWN0aXZhdGVkXG4gICAgICogQHBhcmFtIG9uRXhpdCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gc2VuZCB3aGVuIHRoaXMgdHJpZ2dlciBzdG9wcyBiZWluZyBhY3RpdmF0ZWRcbiAgICAgKi9cbiAgICBzZXRUcmlnZ2VyKGdyb3VwOiBzdHJpbmcsIG9uRW50ZXI6IHN0cmluZywgb25FeGl0OiBzdHJpbmcpOiB2b2lkIHtcblx0XHQvLyBNYWtlIHRoaXMgb2JqZWN0IGEgdHJpZ2dlclxuXHRcdHRoaXMuaXNUcmlnZ2VyID0gdHJ1ZTtcblxuXHRcdC8vIEdldCB0aGUgbnVtYmVyIG9mIHRoZSBwaHlzaWNzIGxheWVyXG5cdFx0bGV0IGxheWVyTnVtYmVyID0gdGhpcy5zY2VuZS5nZXRQaHlzaWNzTWFuYWdlcigpLmdldEdyb3VwTnVtYmVyKGdyb3VwKTtcblxuXHRcdGlmKGxheWVyTnVtYmVyID09PSAwKXtcblx0XHRcdGNvbnNvbGUud2FybihgVHJpZ2dlciBmb3IgR2FtZU5vZGUgJHt0aGlzLmlkfSBub3Qgc2V0IC0gZ3JvdXAgXCIke2dyb3VwfVwiIHdhcyBub3QgcmVjb2duaXplZCBieSB0aGUgcGh5c2ljcyBtYW5hZ2VyLmApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGlzIHRvIHRoZSB0cmlnZ2VyIG1hc2tcblx0XHR0aGlzLnRyaWdnZXJNYXNrIHw9IGxheWVyTnVtYmVyO1xuXG5cdFx0Ly8gTGF5ZXIgbnVtYmVycyBhcmUgYml0cywgc28gZ2V0IHdoaWNoIGJpdCBpdCBpc1xuXHRcdGxldCBpbmRleCA9IE1hdGgubG9nMihsYXllck51bWJlcik7XG5cblx0XHQvLyBTZXQgdGhlIGV2ZW50IG5hbWVzXG5cdFx0dGhpcy50cmlnZ2VyRW50ZXJzW2luZGV4XSA9IG9uRW50ZXI7XG5cdFx0dGhpcy50cmlnZ2VyRXhpdHNbaW5kZXhdID0gb25FeGl0O1xuXHR9O1xuXG5cdC8vIEBpbXBsZW1lbnRlZFxuXHQvKipcblx0ICogQHBhcmFtIGdyb3VwIFRoZSBwaHlzaWNzIGdyb3VwIHRoaXMgbm9kZSBzaG91bGQgYmVsb25nIHRvXG5cdCAqL1xuXHRzZXRHcm91cChncm91cDogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy5zY2VuZS5nZXRQaHlzaWNzTWFuYWdlcigpLnNldEdyb3VwKHRoaXMsIGdyb3VwKTtcblx0fVxuXG5cdC8vIEBpbXBsZW1lbmVkXG5cdGdldExhc3RWZWxvY2l0eSgpOiBWZWMyIHtcblx0XHRyZXR1cm4gdGhpcy5fdmVsb2NpdHk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0gQUNUT1IgLS0tLS0tLS0tLSovXG5cdGdldCBhaSgpOiBBSSB8IEdvYXBBSSB7XG5cdFx0cmV0dXJuIHRoaXMuX2FpO1xuXHR9XG5cblx0c2V0IGFpKGFpOiBBSSB8IEdvYXBBSSkge1xuXHRcdGlmKCF0aGlzLl9haSl7XG5cdFx0XHQvLyBJZiB3ZSBoYXZlbid0IGJlZW4gcHJldmlvdXNseSBoYWQgYW4gYWksIHJlZ2lzdGVyIHVzIHdpdGggdGhlIGFpIG1hbmFnZXJcblx0XHRcdHRoaXMuc2NlbmUuZ2V0QUlNYW5hZ2VyKCkucmVnaXN0ZXJBY3Rvcih0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLl9haSA9IGFpO1xuXHRcdHRoaXMuYWlBY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0Ly8gQGltcGxlbWVudGVkXG5cdGFkZEFJPFQgZXh0ZW5kcyBBSSB8IEdvYXBBST4oYWk6IHN0cmluZyB8IChuZXcgKCkgPT4gVCksIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCB0eXBlPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0aWYoIXRoaXMuX2FpKXtcblx0XHRcdHRoaXMuc2NlbmUuZ2V0QUlNYW5hZ2VyKCkucmVnaXN0ZXJBY3Rvcih0aGlzKTtcblx0XHR9XG5cblx0XHRpZih0eXBlb2YgYWkgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0dGhpcy5fYWkgPSB0aGlzLnNjZW5lLmdldEFJTWFuYWdlcigpLmdlbmVyYXRlQUkoYWkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9haSA9IG5ldyBhaSgpO1xuXHRcdH1cblxuXHRcdC8vIFF1ZXN0aW9uLCBob3cgbXVjaCBkbyB3ZSB3YW50IGRpZmZlcmVudCB0eXBlIG9mIEFJIHRvIGJlIGhhbmRsZWQgdGhlIHNhbWUsIGkuZS4gc2hvdWxkIEdvYXBBSSBhbmQgQUkgc2ltaWxhciBtZXRob2RzIGFuZCBzaWduYXR1cmVzIGZvciB0aGUgc2FrZSBvZiB1bml0eVxuXHRcdHRoaXMuX2FpLmluaXRpYWxpemVBSSh0aGlzLCBvcHRpb25zKTtcblxuXHRcdHRoaXMuYWlBY3RpdmUgPSB0cnVlO1xuXHR9XG5cblx0Ly8gQGltcGxlbWVudGVkXG5cdHNldEFJQWN0aXZlKGFjdGl2ZTogYm9vbGVhbiwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuXHRcdHRoaXMuYWlBY3RpdmUgPSBhY3RpdmU7XG5cdFx0aWYodGhpcy5haUFjdGl2ZSl7XG5cdFx0XHR0aGlzLmFpLmFjdGl2YXRlKG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdC8qLS0tLS0tLS0tLSBUV0VFTkFCTEUgUFJPUEVSVElFUyAtLS0tLS0tLS0tKi9cblx0c2V0IHBvc2l0aW9uWCh2YWx1ZTogbnVtYmVyKSB7XG5cdFx0dGhpcy5wb3NpdGlvbi54ID0gdmFsdWU7XG5cdH1cblxuXHRzZXQgcG9zaXRpb25ZKHZhbHVlOiBudW1iZXIpIHtcblx0XHR0aGlzLnBvc2l0aW9uLnkgPSB2YWx1ZTtcblx0fVxuXG5cdGFic3RyYWN0IHNldCBzY2FsZVgodmFsdWU6IG51bWJlcik7XG5cblx0YWJzdHJhY3Qgc2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKTtcblxuXHQvKi0tLS0tLS0tLS0gR0FNRSBOT0RFIC0tLS0tLS0tLS0qL1xuXHQvKipcblx0ICogU2V0cyB0aGUgc2NlbmUgZm9yIHRoaXMgb2JqZWN0LlxuXHQgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRoaXMgb2JqZWN0IGJlbG9uZ3MgdG8uXG5cdCAqL1xuXHRzZXRTY2VuZShzY2VuZTogU2NlbmUpOiB2b2lkIHtcblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgc2NlbmUgdGhpcyBvYmplY3QgaXMgaW4uIFxuXHQgKiBAcmV0dXJucyBUaGUgc2NlbmUgdGhpcyBvYmplY3QgYmVsb25ncyB0b1xuXHQqL1xuXHRnZXRTY2VuZSgpOiBTY2VuZSB7XG5cdFx0cmV0dXJuIHRoaXMuc2NlbmU7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgbGF5ZXIgb2YgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSBsYXllciBUaGUgbGF5ZXIgdGhpcyBvYmplY3Qgd2lsbCBiZSBvbi5cblx0ICovXG5cdHNldExheWVyKGxheWVyOiBMYXllcik6IHZvaWQge1xuXHRcdHRoaXMubGF5ZXIgPSBsYXllcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBsYXllciB0aGlzIG9iamVjdCBpcyBvbi5cblx0ICogQHJldHVybnMgVGhpcyBsYXllciB0aGlzIG9iamVjdCBpcyBvbi5cblx0Ki9cblx0Z2V0TGF5ZXIoKTogTGF5ZXIge1xuXHRcdHJldHVybiB0aGlzLmxheWVyO1xuXHR9XG5cblx0LyoqIENhbGxlZCBpZiB0aGUgcG9zaXRpb24gdmVjdG9yIGlzIG1vZGlmaWVkIG9yIHJlcGxhY2VkICovXG5cdHByb3RlY3RlZCBwb3NpdGlvbkNoYW5nZWQoKTogdm9pZCB7XG5cdFx0aWYodGhpcy5jb2xsaXNpb25TaGFwZSl7XG5cdFx0XHRpZih0aGlzLmNvbGxpZGVyT2Zmc2V0KXtcblx0XHRcdFx0dGhpcy5jb2xsaXNpb25TaGFwZS5jZW50ZXIgPSB0aGlzLnBvc2l0aW9uLmNsb25lKCkuYWRkKHRoaXMuY29sbGlkZXJPZmZzZXQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jb2xsaXNpb25TaGFwZS5jZW50ZXIgPSB0aGlzLnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhpcyBHYW1lTm9kZVxuXHQgKiBAcGFyYW0gZGVsdGFUIFRoZSB0aW1lc3RlcCBvZiB0aGUgdXBkYXRlLlxuXHQgKi9cblx0dXBkYXRlKGRlbHRhVDogbnVtYmVyKTogdm9pZCB7XG5cdFx0Ly8gRGVmZXIgZXZlbnQgaGFuZGxpbmcgdG8gQUkuXG5cdFx0d2hpbGUodGhpcy5yZWNlaXZlci5oYXNOZXh0RXZlbnQoKSl7XG5cdFx0XHR0aGlzLl9haS5oYW5kbGVFdmVudCh0aGlzLnJlY2VpdmVyLmdldE5leHRFdmVudCgpKTtcblx0XHR9XG5cdH1cblxuXHQvLyBAaW1wbGVtZW50ZWRcblx0ZGVidWdSZW5kZXIoKTogdm9pZCB7XG5cdFx0Ly8gRHJhdyB0aGUgcG9zaXRpb24gb2YgdGhpcyBHYW1lTm9kZVxuXHRcdERlYnVnLmRyYXdQb2ludCh0aGlzLnJlbGF0aXZlUG9zaXRpb24sIENvbG9yLkJMVUUpO1xuXG5cdFx0Ly8gSWYgdmVsb2NpdHkgaXMgbm90IHplcm8sIGRyYXcgYSB2ZWN0b3IgZm9yIGl0XG5cdFx0aWYodGhpcy5fdmVsb2NpdHkgJiYgIXRoaXMuX3ZlbG9jaXR5LmlzWmVybygpKXtcblx0XHRcdERlYnVnLmRyYXdSYXkodGhpcy5yZWxhdGl2ZVBvc2l0aW9uLCB0aGlzLl92ZWxvY2l0eS5jbG9uZSgpLnNjYWxlVG8oMjApLmFkZCh0aGlzLnJlbGF0aXZlUG9zaXRpb24pLCBDb2xvci5CTFVFKTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGlzIGhhcyBhIGNvbGxpZGVyLCBkcmF3IGl0XG5cdFx0aWYodGhpcy5jb2xsaXNpb25TaGFwZSl7XG5cdFx0XHRsZXQgY29sb3IgPSB0aGlzLmlzQ29sbGlkaW5nID8gQ29sb3IuUkVEIDogQ29sb3IuR1JFRU47XG5cblx0XHRcdGlmKHRoaXMuaXNUcmlnZ2VyKXtcblx0XHRcdFx0Y29sb3IgPSBDb2xvci5NQUdFTlRBO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRjb2xvci5hID0gMC4yO1xuXG5cdFx0XHRpZih0aGlzLmNvbGxpc2lvblNoYXBlIGluc3RhbmNlb2YgQUFCQil7XG5cdFx0XHRcdERlYnVnLmRyYXdCb3godGhpcy5pblJlbGF0aXZlQ29vcmRpbmF0ZXModGhpcy5jb2xsaXNpb25TaGFwZS5jZW50ZXIpLCB0aGlzLmNvbGxpc2lvblNoYXBlLmhhbGZTaXplLnNjYWxlZCh0aGlzLnNjZW5lLmdldFZpZXdTY2FsZSgpKSwgdHJ1ZSwgY29sb3IpO1xuXHRcdFx0fSBlbHNlIGlmKHRoaXMuY29sbGlzaW9uU2hhcGUgaW5zdGFuY2VvZiBDaXJjbGUpe1xuXHRcdFx0XHREZWJ1Zy5kcmF3Q2lyY2xlKHRoaXMuaW5SZWxhdGl2ZUNvb3JkaW5hdGVzKHRoaXMuY29sbGlzaW9uU2hhcGUuY2VudGVyKSwgdGhpcy5jb2xsaXNpb25TaGFwZS5odyp0aGlzLnNjZW5lLmdldFZpZXdTY2FsZSgpLCB0cnVlLCBjb2xvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBlbnVtIFR3ZWVuYWJsZVByb3BlcnRpZXN7XG5cdHBvc1ggPSBcInBvc2l0aW9uWFwiLFxuXHRwb3NZID0gXCJwb3NpdGlvbllcIixcblx0c2NhbGVYID0gXCJzY2FsZVhcIixcblx0c2NhbGVZID0gXCJzY2FsZVlcIixcblx0cm90YXRpb24gPSBcInJvdGF0aW9uXCIsXG5cdGFscGhhID0gXCJhbHBoYVwiXG59IiwiaW1wb3J0IENhbnZhc05vZGUgZnJvbSBcIi4vQ2FudmFzTm9kZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9VdGlscy9Db2xvclwiO1xuXG4vKipcbiAqIFRoZSByZXByZXNlbnRhdGlvbiBvZiBhIGdhbWUgb2JqZWN0IHRoYXQgZG9lc24ndCByZWx5IG9uIGFueSByZXNvdXJjZXMgdG8gcmVuZGVyIC0gaXQgaXMgZHJhd24gdG8gdGhlIHNjcmVlbiBieSB0aGUgY2FudmFzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdyYXBoaWMgZXh0ZW5kcyBDYW52YXNOb2RlIHtcbiAgICAvKiogVGhlIGNvbG9yIG9mIHRoZSBHcmFwaGljICovXG4gICAgY29sb3I6IENvbG9yO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IENvbG9yLlJFRDtcbiAgICB9XG5cbiAgICBnZXQgYWxwaGEoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5jb2xvci5hO1xuXHR9XG5cblx0c2V0IGFscGhhKGE6IG51bWJlcikge1xuXHRcdHRoaXMuY29sb3IuYSA9IGE7XG5cdH1cblxuICAgIC8vIEBkZXByZWNhdGVkXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29sb3Igb2YgdGhlIEdyYXBoaWMuIERFUFJFQ0FURURcbiAgICAgKiBAcGFyYW0gY29sb3IgVGhlIG5ldyBjb2xvciBvZiB0aGUgR3JhcGhpYy5cbiAgICAgKi9cbiAgICBzZXRDb2xvcihjb2xvcjogQ29sb3Ipe1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgc2V0IGNvbG9yUihyOiBudW1iZXIpe1xuICAgICAgICB0aGlzLmNvbG9yLnIgPSByO1xuICAgIH1cblxuICAgIGdldCBjb2xvclIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3IucjtcbiAgICB9XG5cbiAgICBzZXQgY29sb3JHKGc6IG51bWJlcil7XG4gICAgICAgIHRoaXMuY29sb3IuZyA9IGc7XG4gICAgfVxuXG4gICAgZ2V0IGNvbG9yRygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvci5nO1xuICAgIH1cblxuICAgIHNldCBjb2xvckIoYjogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jb2xvci5iID0gYjtcbiAgICB9XG5cbiAgICBnZXQgY29sb3JCKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yLmI7XG4gICAgfVxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IEdyYXBoaWMgZnJvbSBcIi4uL0dyYXBoaWNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSBleHRlbmRzIEdyYXBoaWMge1xuICAgIHByb3RlY3RlZCBfZW5kOiBWZWMyO1xuICAgIHRoaWNrbmVzczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFZlYzIsIGVuZDogVmVjMil7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gMjtcblxuICAgICAgICAvLyBEb2VzIHRoaXMgcmVhbGx5IGhhdmUgYSBtZWFuaW5nIGZvciBsaW5lcz9cbiAgICAgICAgdGhpcy5zaXplLnNldCg1LCA1KTtcbiAgICB9XG5cbiAgICBzZXQgc3RhcnQocG9zOiBWZWMyKXtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcbiAgICB9XG5cbiAgICBnZXQgc3RhcnQoKTogVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCBlbmQocG9zOiBWZWMyKXtcbiAgICAgICAgdGhpcy5fZW5kID0gcG9zO1xuICAgIH1cblxuICAgIGdldCBlbmQoKTogVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmQ7XG4gICAgfVxufSIsImltcG9ydCBHcmFwaGljIGZyb20gXCIuLi9HcmFwaGljXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcblxuLyoqIEEgYmFzaWMgcG9pbnQgdG8gYmUgZHJhd24gb24gdGhlIHNjcmVlbi4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IGV4dGVuZHMgR3JhcGhpYyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjMikge1xuICAgICAgICAvLyBBcmUgd2UgbWFraW5nIHRoaXMgYSBjaXJjbGU/XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5zaXplLnNldCg1LCA1KTtcbiAgICB9XG59IiwiaW1wb3J0IEdyYXBoaWMgZnJvbSBcIi4uL0dyYXBoaWNcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi8uLi9VdGlscy9Db2xvclwiO1xuXG4vKiogQSBiYXNpYyByZWN0YW5nbGUgdG8gYmUgZHJhd24gb24gdGhlIHNjcmVlbi4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3QgZXh0ZW5kcyBHcmFwaGljIHtcblxuICAgIC8qKiBUaGUgYm9yZGVyIGNvbG9yIG9mIHRoZSBSZWN0ICovXG4gICAgYm9yZGVyQ29sb3I6IENvbG9yO1xuXG4gICAgLyoqIFRoZSB3aWR0aCBvZiB0aGUgYm9yZGVyICovXG4gICAgYm9yZGVyV2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWMyLCBzaXplOiBWZWMyKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmJvcmRlckNvbG9yID0gQ29sb3IuVFJBTlNQQVJFTlQ7XG4gICAgICAgIHRoaXMuYm9yZGVyV2lkdGggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJvcmRlciBjb2xvciBvZiB0aGlzIHJlY3RhbmdsZVxuICAgICAqIEBwYXJhbSBjb2xvciBUaGUgYm9yZGVyIGNvbG9yXG4gICAgICovXG4gICAgc2V0Qm9yZGVyQ29sb3IoY29sb3I6IENvbG9yKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYm9yZGVyQ29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICAvLyBAZGVwcmVjYXRlZFxuICAgIGdldEJvcmRlckNvbG9yKCk6IENvbG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9yZGVyQ29sb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYm9yZGVyIHdpZHRoIG9mIHRoaXMgcmVjdGFuZ2xlXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgcmVjdGFuZ2xlIGluIHBpeGVsc1xuICAgICAqL1xuICAgIHNldEJvcmRlcldpZHRoKHdpZHRoOiBudW1iZXIpe1xuICAgICAgICB0aGlzLmJvcmRlcldpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0Qm9yZGVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9yZGVyV2lkdGg7XG4gICAgfVxufSIsImltcG9ydCBTcHJpdGUgZnJvbSBcIi4vU3ByaXRlXCI7XG5pbXBvcnQgQW5pbWF0aW9uTWFuYWdlciBmcm9tIFwiLi4vLi4vUmVuZGVyaW5nL0FuaW1hdGlvbnMvQW5pbWF0aW9uTWFuYWdlclwiO1xuaW1wb3J0IFNwcml0ZXNoZWV0IGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvU3ByaXRlc2hlZXRcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuXG4vKiogQW4gc3ByaXRlIHdpdGggc3BlY2lmaWVkIGFuaW1hdGlvbiBmcmFtZXMuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRlZFNwcml0ZSBleHRlbmRzIFNwcml0ZSB7XG4gICAgLyoqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGlzIHNwcml0ZSBzaGVldCAqL1xuICAgIHByb3RlY3RlZCBudW1Db2xzOiBudW1iZXI7XG5cbiAgICBnZXQgY29scygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1Db2xzO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhpcyBzcHJpdGUgc2hlZXQgKi9cbiAgICBwcm90ZWN0ZWQgbnVtUm93czogbnVtYmVyO1xuXG4gICAgZ2V0IHJvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtUm93cztcbiAgICB9XG5cbiAgICAvKiogVGhlIGFuaW1hdGlvbk1hbmFnZXIgZm9yIHRoaXMgc3ByaXRlICovXG4gICAgYW5pbWF0aW9uOiBBbmltYXRpb25NYW5hZ2VyO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlc2hlZXQ6IFNwcml0ZXNoZWV0KXtcbiAgICAgICAgc3VwZXIoc3ByaXRlc2hlZXQubmFtZSk7XG4gICAgICAgIHRoaXMubnVtQ29scyA9IHNwcml0ZXNoZWV0LmNvbHVtbnM7XG4gICAgICAgIHRoaXMubnVtUm93cyA9IHNwcml0ZXNoZWV0LnJvd3M7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBzaXplIG9mIHRoZSBzcHJpdGUgdG8gdGhlIHNwcml0ZSBzaXplIHNwZWNpZmllZCBieSB0aGUgc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zaXplLnNldChzcHJpdGVzaGVldC5zcHJpdGVXaWR0aCwgc3ByaXRlc2hlZXQuc3ByaXRlSGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb25NYW5hZ2VyKHRoaXMpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgYW5pbWF0aW9ucyB0byB0aGUgYW5pbWF0ZWQgc3ByaXRlXG4gICAgICAgIGZvcihsZXQgYW5pbWF0aW9uIG9mIHNwcml0ZXNoZWV0LmFuaW1hdGlvbnMpe1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uYWRkKGFuaW1hdGlvbi5uYW1lLCBhbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW1hZ2Ugb2Zmc2V0IGZvciB0aGUgY3VycmVudCBpbmRleCBvZiBhbmltYXRpb25cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IHdlJ3JlIGF0IGluIHRoZSBhbmltYXRpb25cbiAgICAgKiBAcmV0dXJucyBBIFZlYzIgY29udGFpbmluZyB0aGUgaW1hZ2Ugb2Zmc2V0XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uT2Zmc2V0KGluZGV4OiBudW1iZXIpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKChpbmRleCAlIHRoaXMubnVtQ29scykgKiB0aGlzLnNpemUueCwgTWF0aC5mbG9vcihpbmRleCAvIHRoaXMubnVtQ29scykgKiB0aGlzLnNpemUueSk7XG4gICAgfVxufSIsImltcG9ydCBDYW52YXNOb2RlIGZyb20gXCIuLi9DYW52YXNOb2RlXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcblxuLyoqXG4gKiBUaGUgcmVwcmVzZW50YXRpb24gb2YgYSBzcHJpdGUgLSBhbiBpbi1nYW1lIGltYWdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIENhbnZhc05vZGUge1xuICAgIC8qKiBUaGUgaWQgb2YgdGhlIGltYWdlIGZyb20gdGhlIHJlc291cmNlTWFuYWdlciAqL1xuICAgIGltYWdlSWQ6IHN0cmluZztcbiAgICAvKiogVGhlIG9mZnNldCBvZiB0aGUgc3ByaXRlIGluIGFuIGF0bGFzIGltYWdlICovXG4gICAgaW1hZ2VPZmZzZXQ6IFZlYzI7XG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSB4LWF4aXMgc2hvdWxkIGJlIGludmVydGVkIG9uIHJlbmRlciAqL1xuICAgIGludmVydFg6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSB5LWF4aXMgc2hvdWxkIGJlIGludmVydGVkIG9uIHJlbmRlciAqL1xuICAgIGludmVydFk6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihpbWFnZUlkOiBzdHJpbmcpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmltYWdlSWQgPSBpbWFnZUlkO1xuICAgICAgICBsZXQgaW1hZ2UgPSBSZXNvdXJjZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbWFnZSh0aGlzLmltYWdlSWQpO1xuICAgICAgICB0aGlzLnNpemUgPSBuZXcgVmVjMihpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5pbWFnZU9mZnNldCA9IFZlYzIuWkVSTztcbiAgICAgICAgdGhpcy5pbnZlcnRYID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW52ZXJ0WSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9mZnNldCBvZiB0aGUgc3ByaXRlIGZyb20gKDAsIDApIGluIHRoZSBpbWFnZSdzIGNvb3JkaW5hdGVzXG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgb2Zmc2V0IG9mIHRoZSBzcHJpdGUgZnJvbSAoMCwgMCkgaW4gaW1hZ2UgY29vcmRpbmF0ZXNcbiAgICAgKi9cbiAgICBzZXRJbWFnZU9mZnNldChvZmZzZXQ6IFZlYzIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZU9mZnNldCA9IG9mZnNldDtcbiAgICB9XG59IiwiaW1wb3J0IENhbnZhc05vZGUgZnJvbSBcIi4vQ2FudmFzTm9kZVwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9VdGlscy9Db2xvclwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4uL0lucHV0L0lucHV0XCI7XG5cbi8qKlxuICogVGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgVUlFbGVtZW50IC0gdGhlIHBhcmVudCBjbGFzcyBvZiB0aGluZ3MgbGlrZSBidXR0b25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFVJRWxlbWVudCBleHRlbmRzIENhbnZhc05vZGUge1xuXHQvLyBTdHlsZSBhdHRyaWJ1dGVzIC0gVE9ETyAtIGFic3RyYWN0IHRoaXMgaW50byBhIHN0eWxlIG9iamVjdC9pbnRlcmZhY2Vcblx0LyoqIFRoZSBiYWNrZ291bmQgY29sb3IgKi9cblx0YmFja2dyb3VuZENvbG9yOiBDb2xvcjtcblx0LyoqIFRoZSBib3JkZXIgY29sb3IgKi9cblx0Ym9yZGVyQ29sb3I6IENvbG9yO1xuXHQvKiogVGhlIGJvcmRlciByYWRpdXMgKi9cblx0Ym9yZGVyUmFkaXVzOiBudW1iZXI7XG5cdC8qKiBUaGUgYm9yZGVyIHdpZHRoICovXG5cdGJvcmRlcldpZHRoOiBudW1iZXI7XG5cdC8qKiBUaGUgcGFkZGluZyAqL1xuXHRwYWRkaW5nOiBWZWMyO1xuXG5cdC8vIEV2ZW50QXR0cmlidXRlc1xuXHQvKiogVGhlIHJlYWN0aW9uIG9mIHRoaXMgVUlFbGVtZW50IG9uIGEgY2xpY2sgKi9cblx0b25DbGljazogRnVuY3Rpb247XG5cdC8qKiBUaGUgZXZlbnQgcHJvcGFnYXRlZCBvbiBjbGljayAqL1xuXHRvbkNsaWNrRXZlbnRJZDogc3RyaW5nO1xuXHQvKiogVGhlIHJlYWN0aW9uIHRvIHRoZSByZWxlYXNlIG9mIGEgY2xpY2sgKi9cblx0b25SZWxlYXNlOiBGdW5jdGlvbjtcblx0LyoqIFRoZSBldmVudCBwcm9wYWdhdGVkIG9uIHRoZSByZWxlYXNlIG9mIGEgY2xpY2sgKi9cblx0b25SZWxlYXNlRXZlbnRJZDogc3RyaW5nO1xuXHQvKiogVGhlIHJlYWN0aW9uIHdoZW4gYSBtb3VzZSBlbnRlcnMgdGhpcyBVSUVsZW1lbnQgKi9cblx0b25FbnRlcjogRnVuY3Rpb247XG5cdC8qKiBUaGUgZXZlbnQgcHJvcGFnYXRlZCB3aGVuIGEgbW91c2UgZW50ZXJzIHRoaXMgVUlFbGVtZW50ICovXG5cdG9uRW50ZXJFdmVudElkOiBzdHJpbmc7XG5cdC8qKiBUaGUgcmVhY3Rpb24gd2hlbiBhIG1vdXNlIGxlYXZlcyB0aGlzIFVJRWxlbWVudCAqL1xuXHRvbkxlYXZlOiBGdW5jdGlvbjtcblx0LyoqIFRoZSBldmVudCBwcm9wb2dhdGVkIHdoZW4gYSBtb3VzZSBsZWF2ZXMgdGhpcyBVSUVsZW1lbnQgKi9cblx0b25MZWF2ZUV2ZW50SWQ6IHN0cmluZztcblxuXHQvKiogV2hldGhlciBvciBub3QgdGhpcyBVSUVsZW1lbnQgaXMgY3VycmVudGx5IGNsaWNrZWQgb24gKi9cblx0cHJvdGVjdGVkIGlzQ2xpY2tlZDogYm9vbGVhbjtcblx0LyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgVUlFbGVtZW50IGlzIGN1cnJlbnRseSBob3ZlcmVkIG92ZXIgKi9cblx0cHJvdGVjdGVkIGlzRW50ZXJlZDogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjMil7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cdFx0XG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgMCk7XG5cdFx0dGhpcy5ib3JkZXJDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCAwKTtcblx0XHR0aGlzLmJvcmRlclJhZGl1cyA9IDU7XG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IDE7XG5cdFx0dGhpcy5wYWRkaW5nID0gVmVjMi5aRVJPO1xuXG5cdFx0dGhpcy5vbkNsaWNrID0gbnVsbDtcblx0XHR0aGlzLm9uQ2xpY2tFdmVudElkID0gbnVsbDtcblx0XHR0aGlzLm9uUmVsZWFzZSA9IG51bGw7XG5cdFx0dGhpcy5vblJlbGVhc2VFdmVudElkID0gbnVsbDtcblxuXHRcdHRoaXMub25FbnRlciA9IG51bGw7XG5cdFx0dGhpcy5vbkVudGVyRXZlbnRJZCA9IG51bGw7XG5cdFx0dGhpcy5vbkxlYXZlID0gbnVsbDtcblx0XHR0aGlzLm9uTGVhdmVFdmVudElkID0gbnVsbDtcblxuXHRcdHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG5cdFx0dGhpcy5pc0VudGVyZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEBkZXByZWNhdGVkXG5cdFxuXHQvLyBAZGVwcmVjYXRlZFxuXHRzZXRQYWRkaW5nKHBhZGRpbmc6IFZlYzIpOiB2b2lkIHtcblx0XHR0aGlzLnBhZGRpbmcuY29weShwYWRkaW5nKTtcblx0fVxuXG5cdHVwZGF0ZShkZWx0YVQ6IG51bWJlcik6IHZvaWQge1xuXHRcdHN1cGVyLnVwZGF0ZShkZWx0YVQpO1xuXG5cdFx0Ly8gU2VlIG9mIHRoaXMgb2JqZWN0IHdhcyBqdXN0IGNsaWNrZWRcblx0XHRpZihJbnB1dC5pc01vdXNlSnVzdFByZXNzZWQoKSl7XG5cdFx0XHRsZXQgY2xpY2tQb3MgPSBJbnB1dC5nZXRNb3VzZVByZXNzUG9zaXRpb24oKTtcblx0XHRcdGlmKHRoaXMuY29udGFpbnMoY2xpY2tQb3MueCwgY2xpY2tQb3MueSkgJiYgdGhpcy52aXNpYmxlICYmICF0aGlzLmxheWVyLmlzSGlkZGVuKCkpe1xuXHRcdFx0XHR0aGlzLmlzQ2xpY2tlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYodGhpcy5vbkNsaWNrICE9PSBudWxsKXtcblx0XHRcdFx0XHR0aGlzLm9uQ2xpY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLm9uQ2xpY2tFdmVudElkICE9PSBudWxsKXtcblx0XHRcdFx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdFx0XHRcdHRoaXMuZW1pdHRlci5maXJlRXZlbnQodGhpcy5vbkNsaWNrRXZlbnRJZCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbW91c2Ugd2Fzbid0IGp1c3QgcHJlc3NlZCwgdGhlbiB3ZSBkZWZpbml0ZWx5IHdlcmVuJ3QgY2xpY2tlZFxuXHRcdGlmKCFJbnB1dC5pc01vdXNlUHJlc3NlZCgpKXtcblx0XHRcdGlmKHRoaXMuaXNDbGlja2VkKXtcblx0XHRcdFx0dGhpcy5pc0NsaWNrZWQgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgbW91c2UgaXMgaG92ZXJpbmcgb3ZlciB0aGlzIGVsZW1lbnRcblx0XHRsZXQgbW91c2VQb3MgPSBJbnB1dC5nZXRNb3VzZVBvc2l0aW9uKCk7XG5cdFx0aWYobW91c2VQb3MgJiYgdGhpcy5jb250YWlucyhtb3VzZVBvcy54LCBtb3VzZVBvcy55KSl7XG5cdFx0XHR0aGlzLmlzRW50ZXJlZCA9IHRydWU7XG5cblx0XHRcdGlmKHRoaXMub25FbnRlciAhPT0gbnVsbCl7XG5cdFx0XHRcdHRoaXMub25FbnRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5vbkVudGVyRXZlbnRJZCAhPT0gbnVsbCl7XG5cdFx0XHRcdGxldCBkYXRhID0ge307XG5cdFx0XHRcdHRoaXMuZW1pdHRlci5maXJlRXZlbnQodGhpcy5vbkVudGVyRXZlbnRJZCwgZGF0YSk7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYodGhpcy5pc0VudGVyZWQpIHtcblx0XHRcdHRoaXMuaXNFbnRlcmVkID0gZmFsc2U7XG5cblx0XHRcdGlmKHRoaXMub25MZWF2ZSAhPT0gbnVsbCl7XG5cdFx0XHRcdHRoaXMub25MZWF2ZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5vbkxlYXZlRXZlbnRJZCAhPT0gbnVsbCl7XG5cdFx0XHRcdGxldCBkYXRhID0ge307XG5cdFx0XHRcdHRoaXMuZW1pdHRlci5maXJlRXZlbnQodGhpcy5vbkxlYXZlRXZlbnRJZCwgZGF0YSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKHRoaXMuaXNDbGlja2VkKSB7XG5cdFx0XHQvLyBJZiBtb3VzZSBpcyBkcmFnZ2VkIG9mZiBvZiBlbGVtZW50IHdoaWxlIGRvd24sIGl0IGlzIG5vdCBjbGlja2VkIGFueW1vcmVcblx0XHRcdHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE92ZXJyaWRhYmxlIG1ldGhvZCBmb3IgY2FsY3VsYXRpbmcgYmFja2dyb3VuZCBjb2xvciAtIHVzZWZ1bCBmb3IgZWxlbWVudHMgdGhhdCB3YW50IHRvIGJlIGNvbG9yZWQgb24gZGlmZmVyZW50IGFmdGVyIGNlcnRhaW4gZXZlbnRzXG5cdCAqIEByZXR1cm5zIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBVSUVsZW1lbnRcblx0ICovXG5cdGNhbGN1bGF0ZUJhY2tncm91bmRDb2xvcigpOiBDb2xvciB7XG5cdFx0cmV0dXJuIHRoaXMuYmFja2dyb3VuZENvbG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIE92ZXJyaWRhYmxlIG1ldGhvZCBmb3IgY2FsY3VsYXRpbmcgYm9yZGVyIGNvbG9yIC0gdXNlZnVsIGZvciBlbGVtZW50cyB0aGF0IHdhbnQgdG8gYmUgY29sb3JlZCBvbiBkaWZmZXJlbnQgYWZ0ZXIgY2VydGFpbiBldmVudHNcblx0ICogQHJldHVybnMgVGhlIGJvcmRlciBjb2xvciBvZiB0aGUgVUlFbGVtZW50XG5cdCAqL1xuXHRjYWxjdWxhdGVCb3JkZXJDb2xvcigpOiBDb2xvciB7XG5cdFx0cmV0dXJuIHRoaXMuYm9yZGVyQ29sb3I7XG5cdH1cbn0iLCJpbXBvcnQgTGFiZWwgZnJvbSBcIi4vTGFiZWxcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi4vLi4vVXRpbHMvQ29sb3JcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuXG4vKiogQSBjbGlja2FibGUgYnV0dG9uIFVJRWxlbWVudCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgTGFiZWwge1xuXG5cdGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWMyLCB0ZXh0OiBzdHJpbmcpe1xuXHRcdHN1cGVyKHBvc2l0aW9uLCB0ZXh0KTtcblx0XHRcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcigxNTAsIDc1LCAyMDMpO1xuXHRcdHRoaXMuYm9yZGVyQ29sb3IgPSBuZXcgQ29sb3IoNDEsIDQ2LCAzMCk7XG5cdFx0dGhpcy50ZXh0Q29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG5cdH1cblxuXHQvLyBAb3ZlcnJpZGVcblx0Y2FsY3VsYXRlQmFja2dyb3VuZENvbG9yKCk6IENvbG9yIHtcblx0XHQvLyBDaGFuZ2UgdGhlIGJhY2tncm91bmQgY29sb3IgaWYgY2xpY2tlZCBvciBob3ZlcmVkXG5cdFx0aWYodGhpcy5pc0VudGVyZWQgJiYgIXRoaXMuaXNDbGlja2VkKXtcblx0XHRcdHJldHVybiB0aGlzLmJhY2tncm91bmRDb2xvci5saWdodGVuKCk7XG5cdFx0fSBlbHNlIGlmKHRoaXMuaXNDbGlja2VkKXtcblx0XHRcdHJldHVybiB0aGlzLmJhY2tncm91bmRDb2xvci5kYXJrZW4oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuYmFja2dyb3VuZENvbG9yO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi8uLi9VdGlscy9Db2xvclwiO1xuaW1wb3J0IFVJRWxlbWVudCBmcm9tIFwiLi4vVUlFbGVtZW50XCI7XG5cbi8qKiBBIGJhc2ljIHRleHQtY29udGFpbmluZyBsYWJlbCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWwgZXh0ZW5kcyBVSUVsZW1lbnQge1xuXHQvKiogVGhlIGNvbG9yIG9mIHRoZSB0ZXh0IG9mIHRoaXMgVUlFbGVtZW50ICovXG5cdHRleHRDb2xvcjogQ29sb3I7XG5cdC8qKiBUaGUgdmFsdWUgb2YgdGhlIHRleHQgb2YgdGhpcyBVSUVsZW1lbnQgKi9cblx0dGV4dDogc3RyaW5nO1xuXHQvKiogVGhlIG5hbWUgb2YgdGhlIGZvbnQgKi9cblx0Zm9udDogc3RyaW5nO1xuXHQvKiogVGhlIHNpemUgb2YgdGhlIGZvbnQgKi9cblx0Zm9udFNpemU6IG51bWJlcjtcblx0LyoqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGV4dCB3aXRoaW4gdGhlIGxhYmVsICovXG5cdHByb3RlY3RlZCBoQWxpZ246IHN0cmluZztcblx0LyoqIFRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGV4dCB3aXRoaW4gdGhlIGxhYmVsICovXG5cdHByb3RlY3RlZCB2QWxpZ246IHN0cmluZztcblxuXHQvKiogQSBmbGFnIGZvciBpZiB0aGUgd2lkdGggb2YgdGhlIHRleHQgaGFzIGJlZW4gbWVhc3VyZWQgb24gdGhlIGNhbnZhcyBmb3IgYXV0byB3aWR0aCBhc3NpZ25tZW50ICovXG5cdHByb3RlY3RlZCBzaXplQXNzaWduZWQ6IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IocG9zaXRpb246IFZlYzIsIHRleHQ6IHN0cmluZykge1xuXHRcdHN1cGVyKHBvc2l0aW9uKTtcblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdHRoaXMudGV4dENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDEpO1xuXHRcdHRoaXMuZm9udCA9IFwiQXJpYWxcIjtcblx0XHR0aGlzLmZvbnRTaXplID0gMzA7XG5cdFx0dGhpcy5oQWxpZ24gPSBcImNlbnRlclwiO1xuXHRcdHRoaXMudkFsaWduID0gXCJjZW50ZXJcIjtcblx0XHR0aGlzLmJvcmRlcldpZHRoID0gMDtcblx0XHR0aGlzLnNpemVBc3NpZ25lZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gQGRlcHJlY2F0ZWRcblx0c2V0VGV4dCh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHR9XG5cdHNldFNpemUobmV3U2l6ZTpWZWMyKTp2b2lke1xuXHRcdHRoaXMuc2l6ZSA9IG5ld1NpemU7XG5cdH1cblx0Ly8gQGRlcHJlY2F0ZWRcblx0c2V0VGV4dENvbG9yKGNvbG9yOiBDb2xvcik6IHZvaWQge1xuXHRcdHRoaXMudGV4dENvbG9yID0gY29sb3I7XG5cdH1cblx0c2V0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBDb2xvcik6IHZvaWQge1xuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG5cdH1cblx0c2V0Qm9yZGVyV2lkdGgobnVtOm51bWJlcik6dm9pZHtcblx0XHR0aGlzLmJvcmRlcldpZHRoPW51bTtcblx0fVxuXHRzZXRCb3JkZXJDb2xvcihjb2xvcjogQ29sb3IpOnZvaWQge1xuXHRcdHRoaXMuYm9yZGVyQ29sb3IgPSBjb2xvcjtcblx0fVxuXHQvKipcblx0ICogR2V0cyBhIHN0cmluZyBjb250YWluZyB0aGUgZm9udCBkZXRhaWxzIGZvciByZW5kZXJpbmdcblx0ICogQHJldHVybnMgQSBzdHJpbmcgY29udGFpbmluZyB0aGUgZm9udCBkZXRhaWxzXG5cdCAqL1xuXHRnZXRGb250U3RyaW5nKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuZm9udFNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xuXHR9XG5cblx0LyoqXG5cdCAqIE92ZXJyaWRhYmxlIG1ldGhvZCBmb3IgY2FsY3VsYXRpbmcgdGV4dCBjb2xvciAtIHVzZWZ1bCBmb3IgZWxlbWVudHMgdGhhdCB3YW50IHRvIGJlIGNvbG9yZWQgb24gZGlmZmVyZW50IGFmdGVyIGNlcnRhaW4gZXZlbnRzXG5cdCAqIEByZXR1cm5zIGEgc3RyaW5nIGNvbnRhaW5nIHRoZSB0ZXh0IGNvbG9yXG5cdCAqL1xuXHRjYWxjdWxhdGVUZXh0Q29sb3IoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy50ZXh0Q29sb3IudG9TdHJpbmdSR0JBKCk7XG5cdH1cblxuXHQvKipcblx0ICogVXNlcyB0aGUgY2FudmFzIHRvIGNhbGN1bGF0ZSB0aGUgd2lkdGggb2YgdGhlIHRleHRcblx0ICogQHBhcmFtIGN0eCBUaGUgcmVuZGVyaW5nIGNvbnRleHRcblx0ICogQHJldHVybnMgQSBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSByZW5kZXJlZCB0ZXh0IHdpZHRoXG5cdCAqL1xuXHRwcm90ZWN0ZWQgY2FsY3VsYXRlVGV4dFdpZHRoKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogbnVtYmVyIHtcblx0XHRjdHguZm9udCA9IHRoaXMuZm9udFNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xuXHRcdHJldHVybiBjdHgubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aDtcblx0fVxuXG5cdHNldEhBbGlnbihhbGlnbjogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy5oQWxpZ24gPSBhbGlnbjtcblx0fVxuXG5cdHNldFZBbGlnbihhbGlnbjogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy52QWxpZ24gPSBhbGlnbjtcblx0fVxuXHRzZXRGb250U2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcblx0XHR0aGlzLmZvbnRTaXplID0gc2l6ZTtcblx0fVxuXHRzZXRGb250KGZvbnQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuZm9udCA9IGZvbnQ7XG5cdH1cblx0LyoqXG5cdCAqIENhbGN1bGF0ZSB0aGUgb2Zmc2V0IG9mIHRoZSB0ZXh0IC0gdGhpcyBpcyB1c2VkIGZvciByZW5kZXJpbmcgdGV4dCB3aXRoIGRpZmZlcmVudCBhbGlnbm1lbnRzXG5cdCAqIEBwYXJhbSBjdHggVGhlIHJlbmRlcmluZyBjb250ZXh0XG5cdCAqIEByZXR1cm5zIFRoZSBvZmZzZXQgb2YgdGhlIHRleHQgaW4gYSBWZWMyXG5cdCAqL1xuXHRjYWxjdWxhdGVUZXh0T2Zmc2V0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogVmVjMiB7XG5cdFx0bGV0IHRleHRXaWR0aCA9IHRoaXMuY2FsY3VsYXRlVGV4dFdpZHRoKGN0eCk7XG5cblx0XHRsZXQgb2Zmc2V0ID0gbmV3IFZlYzIoMCwgMCk7XG5cblx0XHRsZXQgaERpZmYgPSB0aGlzLnNpemUueCAtIHRleHRXaWR0aDtcblx0XHRpZiAodGhpcy5oQWxpZ24gPT09IEhBbGlnbi5DRU5URVIpIHtcblx0XHRcdG9mZnNldC54ID0gaERpZmYgLyAyO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5oQWxpZ24gPT09IEhBbGlnbi5SSUdIVCkge1xuXHRcdFx0b2Zmc2V0LnggPSBoRGlmZjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy52QWxpZ24gPT09IFZBbGlnbi5UT1ApIHtcblx0XHRcdGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuXHRcdFx0b2Zmc2V0LnkgPSAwO1xuXHRcdH0gZWxzZSBpZiAodGhpcy52QWxpZ24gPT09IFZBbGlnbi5CT1RUT00pIHtcblx0XHRcdGN0eC50ZXh0QmFzZWxpbmUgPSBcImJvdHRvbVwiO1xuXHRcdFx0b2Zmc2V0LnkgPSB0aGlzLnNpemUueTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG5cdFx0XHRvZmZzZXQueSA9IHRoaXMuc2l6ZS55IC8gMjtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2Zmc2V0O1xuXHR9XG5cblx0cHJvdGVjdGVkIHNpemVDaGFuZ2VkKCk6IHZvaWQge1xuXHRcdHN1cGVyLnNpemVDaGFuZ2VkKCk7XG5cdFx0dGhpcy5zaXplQXNzaWduZWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEF1dG9tYXRpY2FsbHkgc2l6ZXMgdGhlIGVsZW1lbnQgdG8gdGhlIHRleHQgd2l0aGluIGl0XG5cdCAqIEBwYXJhbSBjdHggVGhlIHJlbmRlcmluZyBjb250ZXh0XG5cdCAqL1xuXHRwcm90ZWN0ZWQgYXV0b1NpemUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcblx0XHRsZXQgd2lkdGggPSB0aGlzLmNhbGN1bGF0ZVRleHRXaWR0aChjdHgpO1xuXHRcdGxldCBoZWlnaHQgPSB0aGlzLmZvbnRTaXplO1xuXHRcdHRoaXMuc2l6ZS5zZXQod2lkdGggKyB0aGlzLnBhZGRpbmcueCAqIDIsIGhlaWdodCArIHRoaXMucGFkZGluZy55ICogMik7XG5cdFx0dGhpcy5zaXplQXNzaWduZWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxseSBhc3NpZ25zIGEgc2l6ZSB0byB0aGUgVUlFbGVtZW50IGlmIG5vbmUgaXMgcHJvdmlkZWRcblx0ICogQHBhcmFtIGN0eCBUaGUgcmVuZGVyaW5nIGNvbnRleHRcblx0ICovXG5cdGhhbmRsZUluaXRpYWxTaXppbmcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuc2l6ZUFzc2lnbmVkKSB7XG5cdFx0XHR0aGlzLmF1dG9TaXplKGN0eCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIE9uIHRoZSBuZXh0IHJlbmRlciwgc2l6ZSB0aGlzIGVsZW1lbnQgdG8gaXQncyBjdXJyZW50IHRleHQgdXNpbmcgaXRzIGN1cnJlbnQgZm9udCBzaXplICovXG5cdHNpemVUb1RleHQoKTogdm9pZCB7XG5cdFx0dGhpcy5zaXplQXNzaWduZWQgPSBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZW51bSBWQWxpZ24ge1xuXHRUT1AgPSBcInRvcFwiLFxuXHRDRU5URVIgPSBcImNlbnRlclwiLFxuXHRCT1RUT00gPSBcImJvdHRvbVwiXG59XG5cbmV4cG9ydCBlbnVtIEhBbGlnbiB7XG5cdExFRlQgPSBcImxlZnRcIixcblx0Q0VOVEVSID0gXCJjZW50ZXJcIixcblx0UklHSFQgPSBcInJpZ2h0XCJcbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi4vLi4vSW5wdXQvSW5wdXRcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi4vLi4vVXRpbHMvQ29sb3JcIjtcbmltcG9ydCBNYXRoVXRpbHMgZnJvbSBcIi4uLy4uL1V0aWxzL01hdGhVdGlsc1wiO1xuaW1wb3J0IFVJRWxlbWVudCBmcm9tIFwiLi4vVUlFbGVtZW50XCI7XG5cbi8qKiBBIHNsaWRlciBVSUVsZW1lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIFVJRWxlbWVudCB7XG4gICAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyIGZyb20gWzAsIDFdICovXG4gICAgcHJvdGVjdGVkIHZhbHVlOiBudW1iZXI7XG4gICAgLyoqIFRoZSBjb2xvciBvZiB0aGUgc2xpZGVyIG5pYiAqL1xuICAgIHB1YmxpYyBuaWJDb2xvcjogQ29sb3I7XG4gICAgLyoqIFRoZSBzaXplIG9mIHRoZSBuaWIgKi9cbiAgICBwdWJsaWMgbmliU2l6ZTogVmVjMjtcbiAgICAvKiogVGhlIGNvbG9yIG9mIHRoZSBzbGlkZXIgdHJhY2sgKi9cbiAgICBwdWJsaWMgc2xpZGVyQ29sb3I6IENvbG9yO1xuICAgIC8qKiBUaGUgcmVhY3Rpb24gb2YgdGhpcyBVSUVsZW1lbnQgdG8gYSB2YWx1ZSBjaGFuZ2UgKi9cbiAgICBwdWJsaWMgb25WYWx1ZUNoYW5nZTogRnVuY3Rpb247XG4gICAgLyoqIFRoZSBldmVudCBwcm9wYWdhdGVkIGJ5IHRoaXMgVUlFbGVtZW50IHdoZW4gdmFsdWUgY2hhbmdlcyAqL1xuICAgIHB1YmxpYyBvblZhbHVlQ2hhbmdlRXZlbnRJZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IFZlYzIsIGluaXRWYWx1ZTogbnVtYmVyKXtcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBpbml0VmFsdWU7XG4gICAgICAgIHRoaXMubmliQ29sb3IgPSBDb2xvci5SRUQ7XG4gICAgICAgIHRoaXMuc2xpZGVyQ29sb3IgPSBDb2xvci5CTEFDSztcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5UUkFOU1BBUkVOVDtcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9IENvbG9yLlRSQU5TUEFSRU5UO1xuICAgICAgICB0aGlzLm5pYlNpemUgPSBuZXcgVmVjMigxMCwgMjApO1xuXG4gICAgICAgIC8vIFNldCBhIGRlZmF1bHQgc2l6ZVxuICAgICAgICB0aGlzLnNpemUuc2V0KDIwMCwgMjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlclxuICAgICAqIEByZXR1cm5zIFRoZSB2YWx1ZSBvZiB0aGUgc2xpZGVyXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEEgbWV0aG9kIGNhbGxlZCBpbiByZXNwb25zZSB0byB0aGUgdmFsdWUgY2hhbmdpbmcgKi9cbiAgICBwcm90ZWN0ZWQgdmFsdWVDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLm9uVmFsdWVDaGFuZ2Upe1xuICAgICAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5vblZhbHVlQ2hhbmdlRXZlbnRJZCl7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZmlyZUV2ZW50KHRoaXMub25WYWx1ZUNoYW5nZUV2ZW50SWQsIHt0YXJnZXQ6IHRoaXMsIHZhbHVlOiB0aGlzLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZGVsdGFUOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlKGRlbHRhVCk7XG5cbiAgICAgICAgaWYodGhpcy5pc0NsaWNrZWQpe1xuICAgICAgICAgICAgbGV0IHZhbCA9IE1hdGhVdGlscy5pbnZMZXJwKHRoaXMucG9zaXRpb24ueCAtIHRoaXMuc2l6ZS54LzIsIHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54LzIsIElucHV0LmdldE1vdXNlUG9zaXRpb24oKS54KTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNYXRoVXRpbHMuY2xhbXAwMSh2YWwpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi4vLi4vVXRpbHMvQ29sb3JcIjtcbmltcG9ydCBMYWJlbCBmcm9tIFwiLi9MYWJlbFwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuLi8uLi9JbnB1dC9JbnB1dFwiO1xuXG4vKiogQSB0ZXh0IGlucHV0IFVJRWxlbWVudCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgTGFiZWwge1xuICAgIC8qKiBBIGZsYWcgdGhlIHJlcHJlc2VudHMgd2hldGhlciB0aGUgdXNlciBjYW4gdHlwZSBpbiB0aGlzIFRleHRJbnB1dCAqL1xuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG4gICAgLyoqIFRoZSBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yIGluIHRoaXMgVGV4dElucHV0ICovXG4gICAgY3Vyc29yQ291bnRlcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IFZlYzIpe1xuICAgICAgICBzdXBlcihwb3NpdGlvbiwgXCJcIik7XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3Vyc29yQ291bnRlciA9IDA7XG5cbiAgICAgICAgLy8gR2l2ZSBhIGRlZmF1bHQgc2l6ZSB0byB0aGUgeCBvbmx5XG4gICAgICAgIHRoaXMuc2l6ZS5zZXQoMjAwLCB0aGlzLmZvbnRTaXplKTtcbiAgICAgICAgdGhpcy5oQWxpZ24gPSBcImxlZnRcIjtcblxuICAgICAgICB0aGlzLmJvcmRlckNvbG9yID0gQ29sb3IuQkxBQ0s7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IuV0hJVEU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGRlbHRhVDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZShkZWx0YVQpO1xuXG4gICAgICAgIGlmKElucHV0LmlzTW91c2VKdXN0UHJlc3NlZCgpKXtcblx0XHRcdGxldCBjbGlja1BvcyA9IElucHV0LmdldE1vdXNlUHJlc3NQb3NpdGlvbigpO1xuXHRcdFx0aWYodGhpcy5jb250YWlucyhjbGlja1Bvcy54LCBjbGlja1Bvcy55KSl7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvckNvdW50ZXIgPSAzMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmZvY3VzZWQpe1xuICAgICAgICAgICAgbGV0IGtleXMgPSBJbnB1dC5nZXRLZXlzSnVzdFByZXNzZWQoKTtcbiAgICAgICAgICAgIGxldCBudW1zID0gXCIxMjM0NTY3ODkwXCI7XG4gICAgICAgICAgICBsZXQgc3BlY2lhbENoYXJzID0gXCJgfiFAIyQlXiYqKCktXz0rW3tdfVxcXFx8OzonXFxcIiw8Lj4vP1wiO1xuICAgICAgICAgICAgbGV0IGxldHRlcnMgPSBcInF3ZXJ0eXVpb3Bhc2RmZ2hqa2x6eGN2Ym5tXCI7XG4gICAgICAgICAgICBsZXQgbWFzayA9IG51bXMgKyBzcGVjaWFsQ2hhcnMgKyBsZXR0ZXJzO1xuICAgICAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiBtYXNrLmluY2x1ZGVzKGtleSkpO1xuICAgICAgICAgICAgbGV0IHNoaWZ0UHJlc3NlZCA9IElucHV0LmlzS2V5UHJlc3NlZChcInNoaWZ0XCIpO1xuICAgICAgICAgICAgbGV0IGJhY2tzcGFjZVByZXNzZWQgPSBJbnB1dC5pc0tleUp1c3RQcmVzc2VkKFwiYmFja3NwYWNlXCIpO1xuICAgICAgICAgICAgbGV0IHNwYWNlUHJlc3NlZCA9IElucHV0LmlzS2V5SnVzdFByZXNzZWQoXCJzcGFjZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYmFja3NwYWNlUHJlc3NlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0LnN1YnN0cmluZygwLCB0aGlzLnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoc3BhY2VQcmVzc2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgKz0gXCIgXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYoc2hpZnRQcmVzc2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0ICs9IGtleXNbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQgKz0ga2V5c1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IFVwZGF0ZWFibGUgZnJvbSBcIi4uL0RhdGFUeXBlcy9JbnRlcmZhY2VzL1VwZGF0ZWFibGVcIjtcbmltcG9ydCBHYW1lRXZlbnQgZnJvbSBcIi4uL0V2ZW50cy9HYW1lRXZlbnRcIjtcbmltcG9ydCB7IEdhbWVFdmVudFR5cGUgfSBmcm9tIFwiLi4vRXZlbnRzL0dhbWVFdmVudFR5cGVcIjtcbmltcG9ydCBSZWNlaXZlciBmcm9tIFwiLi4vRXZlbnRzL1JlY2VpdmVyXCI7XG5cbmltcG9ydCBBYnN0cmFjdFJlcGxheWVyIGZyb20gXCIuLi9EYXRhVHlwZXMvUGxheWJhY2svQWJzdHJhY3QvQWJzdHJhY3RSZXBsYXllclwiO1xuaW1wb3J0IEFic3RyYWN0TG9nSXRlbSBmcm9tIFwiLi4vRGF0YVR5cGVzL1BsYXliYWNrL0Fic3RyYWN0L0Fic3RyYWN0TG9nSXRlbVwiO1xuaW1wb3J0IEFic3RyYWN0UmVjb3JkaW5nIGZyb20gXCIuLi9EYXRhVHlwZXMvUGxheWJhY2svQWJzdHJhY3QvQWJzdHJhY3RSZWNvcmRpbmdcIjtcbmltcG9ydCBBYnN0cmFjdFJlY29yZGVyIGZyb20gXCIuLi9EYXRhVHlwZXMvUGxheWJhY2svQWJzdHJhY3QvQWJzdHJhY3RSZWNvcmRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5YmFja01hbmFnZXIgaW1wbGVtZW50cyBVcGRhdGVhYmxlIHtcblxuICAgIHByb3RlY3RlZCByZWNvcmRlcjogQWJzdHJhY3RSZWNvcmRlcjxBYnN0cmFjdFJlY29yZGluZzxBYnN0cmFjdExvZ0l0ZW0+LCBBYnN0cmFjdExvZ0l0ZW0+O1xuICAgIHByb3RlY3RlZCByZWNvcmRpbmc6IGJvb2xlYW47XG5cbiAgICBwcm90ZWN0ZWQgcmVwbGF5ZXI6IEFic3RyYWN0UmVwbGF5ZXI8QWJzdHJhY3RSZWNvcmRpbmc8QWJzdHJhY3RMb2dJdGVtPiwgQWJzdHJhY3RMb2dJdGVtPjtcbiAgICBwcm90ZWN0ZWQgcGxheWluZzogYm9vbGVhbjtcblxuICAgIHByb3RlY3RlZCBsYXN0UmVjb3JkaW5nOiBBYnN0cmFjdFJlY29yZGluZzxBYnN0cmFjdExvZ0l0ZW0+O1xuXG4gICAgcHJvdGVjdGVkIHJlY2VpdmVyOiBSZWNlaXZlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSBuZXcgUmVjZWl2ZXIoKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlci5zdWJzY3JpYmUoW0dhbWVFdmVudFR5cGUuU1RBUlRfUkVDT1JESU5HLCBHYW1lRXZlbnRUeXBlLlNUT1BfUkVDT1JESU5HLCBHYW1lRXZlbnRUeXBlLlBMQVlfUkVDT1JESU5HXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YVQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5yZWNlaXZlci5oYXNOZXh0RXZlbnQoKSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudCh0aGlzLnJlY2VpdmVyLmdldE5leHRFdmVudCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIudXBkYXRlKGRlbHRhVCk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZGluZyA9IHRoaXMucmVjb3JkZXIuYWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVwbGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXBsYXllci51cGRhdGUoZGVsdGFUKTtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRoaXMucmVwbGF5ZXIuYWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlRXZlbnQoZXZlbnQ6IEdhbWVFdmVudCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2goZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBHYW1lRXZlbnRUeXBlLlNUQVJUX1JFQ09SRElORzoge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RhcnRSZWNvcmRpbmdFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEdhbWVFdmVudFR5cGUuU1RPUF9SRUNPUkRJTkc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3BSZWNvcmRpbmdFdmVudCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBHYW1lRXZlbnRUeXBlLlBMQVlfUkVDT1JESU5HOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVQbGF5UmVjb3JkaW5nRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBoYW5kbGVTdGFydFJlY29yZGluZ0V2ZW50KGV2ZW50OiBHYW1lRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlY29yZGluZyA9IGV2ZW50LmRhdGEuZ2V0KFwicmVjb3JkaW5nXCIpO1xuICAgICAgICBpZiAoIXRoaXMucGxheWluZyAmJiAhdGhpcy5yZWNvcmRpbmcgJiYgcmVjb3JkaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFJlY29yZGluZyA9IHJlY29yZGluZztcbiAgICAgICAgICAgIGxldCBSZWNvcmRlcjogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gQWJzdHJhY3RSZWNvcmRlcjxBYnN0cmFjdFJlY29yZGluZzxBYnN0cmFjdExvZ0l0ZW0+LCBBYnN0cmFjdExvZ0l0ZW0+ID0gdGhpcy5sYXN0UmVjb3JkaW5nLnJlY29yZGVyKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWNvcmRlciA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucmVjb3JkZXIuY29uc3RydWN0b3IgIT09IFJlY29yZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IG5ldyBSZWNvcmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydCh0aGlzLmxhc3RSZWNvcmRpbmcpO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSB0aGlzLnJlY29yZGVyLmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBoYW5kbGVTdG9wUmVjb3JkaW5nRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xuICAgICAgICB0aGlzLnJlY29yZGluZyA9IHRoaXMucmVjb3JkZXIuYWN0aXZlKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBoYW5kbGVQbGF5UmVjb3JkaW5nRXZlbnQoZXZlbnQ6IEdhbWVFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucmVjb3JkaW5nICYmIHRoaXMubGFzdFJlY29yZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgUmVwbGF5ZXI6IG5ldyAoLi4uYXJnczogYW55W10pID0+IEFic3RyYWN0UmVwbGF5ZXI8QWJzdHJhY3RSZWNvcmRpbmc8QWJzdHJhY3RMb2dJdGVtPiwgQWJzdHJhY3RMb2dJdGVtPiA9IHRoaXMubGFzdFJlY29yZGluZy5yZXBsYXllcigpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVwbGF5ZXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnJlcGxheWVyLmNvbnN0cnVjdG9yICE9PSBSZXBsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVwbGF5ZXIgPSBuZXcgUmVwbGF5ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVwbGF5ZXIuc3RhcnQodGhpcy5sYXN0UmVjb3JkaW5nLCBldmVudC5kYXRhLmdldChcIm9uRW5kXCIpKTtcbiAgICAgICAgICAgIHRoaXMucGxheWluZyA9IHRoaXMucmVwbGF5ZXIuYWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvQ29sbGVjdGlvbnMvTWFwXCI7XG5cbi8qKiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUmVnaXN0cnk8VD4gZXh0ZW5kcyBNYXA8VD57XG5cbiAgICAvKiogUHJlbG9hZHMgcmVnaXN0cnkgZGF0YSAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBwcmVsb2FkKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gaXRlbSBhbmQgcHJlbG9hZHMgYW55IG5lY2Vzc2FyeSBmaWxlc1xuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byByZWdpc3RlciB0aGlzIGl0ZW0gd2l0aFxuICAgICAqIEBwYXJhbSBhcmdzIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBuZWVkZWQgZm9yIHJlZ2lzdHJhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCByZWdpc3RlckFuZFByZWxvYWRJdGVtKGtleTogc3RyaW5nLCAuLi5hcmdzOiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGl0ZW0gYW5kIHByZWxvYWRzIGFueSBuZWNlc3NhcnkgZmlsZXNcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmVnaXN0ZXIgdGhpcyBpdGVtIHdpdGhcbiAgICAgKiBAcGFyYW0gYXJncyBBbnkgYWRpdGlvbmFsIGFyZ3VtZW50cyBuZWVkZWQgZm9yIHJlZ2lzdHJhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCByZWdpc3Rlckl0ZW0oa2V5OiBzdHJpbmcsIC4uLmFyZ3M6IGFueSk6IHZvaWQ7XG59IiwiaW1wb3J0IE1hcCBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiO1xuaW1wb3J0IFNoYWRlclR5cGUgZnJvbSBcIi4uLy4uL1JlbmRlcmluZy9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlXCI7XG5pbXBvcnQgTGFiZWxTaGFkZXJUeXBlIGZyb20gXCIuLi8uLi9SZW5kZXJpbmcvV2ViR0xSZW5kZXJpbmcvU2hhZGVyVHlwZXMvTGFiZWxTaGFkZXJUeXBlXCI7XG5pbXBvcnQgUG9pbnRTaGFkZXJUeXBlIGZyb20gXCIuLi8uLi9SZW5kZXJpbmcvV2ViR0xSZW5kZXJpbmcvU2hhZGVyVHlwZXMvUG9pbnRTaGFkZXJUeXBlXCI7XG5pbXBvcnQgUmVjdFNoYWRlclR5cGUgZnJvbSBcIi4uLy4uL1JlbmRlcmluZy9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlcy9SZWN0U2hhZGVyVHlwZVwiO1xuaW1wb3J0IFNwcml0ZVNoYWRlclR5cGUgZnJvbSBcIi4uLy4uL1JlbmRlcmluZy9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlcy9TcHJpdGVTaGFkZXJUeXBlXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgUmVnaXN0cnkgZnJvbSBcIi4vUmVnaXN0cnlcIjtcblxuLyoqXG4gKiBBIHJlZ2lzdHJ5IHRoYXQgaGFuZGxlcyBzaGFkZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRlclJlZ2lzdHJ5IGV4dGVuZHMgUmVnaXN0cnk8U2hhZGVyVHlwZT4ge1xuXG5cdC8vIFNoYWRlciBuYW1lc1xuXHRwdWJsaWMgc3RhdGljIFBPSU5UX1NIQURFUiA9IFwicG9pbnRcIjtcblx0cHVibGljIHN0YXRpYyBSRUNUX1NIQURFUiA9IFwicmVjdFwiO1xuXHRwdWJsaWMgc3RhdGljIFNQUklURV9TSEFERVIgPSBcInNwcml0ZVwiO1xuXHRwdWJsaWMgc3RhdGljIExBQkVMX1NIQURFUiA9IFwibGFiZWxcIjtcblxuXHRwcml2YXRlIHJlZ2lzdHJ5SXRlbXM6IEFycmF5PFNoYWRlclJlZ2lzdHJ5SXRlbT4gPSBuZXcgQXJyYXkoKTtcblxuXHQvKipcblx0ICogUHJlbG9hZHMgYWxsIGJ1aWx0LWluIHNoYWRlcnNcblx0ICovXG5cdHB1YmxpYyBwcmVsb2FkKCl7XG5cdFx0Ly8gR2V0IHRoZSByZXNvdXJjZU1hbmFnZXIgYW5kIHF1ZXVlIGFsbCBidWlsdC1pbiBzaGFkZXJzIGZvciBwcmVsb2FkaW5nXG5cdFx0Y29uc3Qgcm0gPSBSZXNvdXJjZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuXHRcdC8vIFF1ZXVlIGEgbG9hZCBmb3IgdGhlIHBvaW50IHNoYWRlclxuXHRcdHRoaXMucmVnaXN0ZXJBbmRQcmVsb2FkSXRlbShTaGFkZXJSZWdpc3RyeS5QT0lOVF9TSEFERVIsIFBvaW50U2hhZGVyVHlwZSwgXCJidWlsdGluL3NoYWRlcnMvcG9pbnQudnNoYWRlclwiLCBcImJ1aWx0aW4vc2hhZGVycy9wb2ludC5mc2hhZGVyXCIpO1xuXG5cdFx0Ly8gUXVldWUgYSBsb2FkIGZvciB0aGUgcmVjdCBzaGFkZXJcblx0XHR0aGlzLnJlZ2lzdGVyQW5kUHJlbG9hZEl0ZW0oU2hhZGVyUmVnaXN0cnkuUkVDVF9TSEFERVIsIFJlY3RTaGFkZXJUeXBlLCBcImJ1aWx0aW4vc2hhZGVycy9yZWN0LnZzaGFkZXJcIiwgXCJidWlsdGluL3NoYWRlcnMvcmVjdC5mc2hhZGVyXCIpO1xuXG5cdFx0Ly8gUXVldWUgYSBsb2FkIGZvciB0aGUgc3ByaXRlIHNoYWRlclxuXHRcdHRoaXMucmVnaXN0ZXJBbmRQcmVsb2FkSXRlbShTaGFkZXJSZWdpc3RyeS5TUFJJVEVfU0hBREVSLCBTcHJpdGVTaGFkZXJUeXBlLCBcImJ1aWx0aW4vc2hhZGVycy9zcHJpdGUudnNoYWRlclwiLCBcImJ1aWx0aW4vc2hhZGVycy9zcHJpdGUuZnNoYWRlclwiKTtcblx0XG5cdFx0Ly8gUXVldWUgYSBsb2FkIGZvciB0aGUgbGFiZWwgc2hhZGVyXG5cdFx0dGhpcy5yZWdpc3RlckFuZFByZWxvYWRJdGVtKFNoYWRlclJlZ2lzdHJ5LkxBQkVMX1NIQURFUiwgTGFiZWxTaGFkZXJUeXBlLCBcImJ1aWx0aW4vc2hhZGVycy9sYWJlbC52c2hhZGVyXCIsIFwiYnVpbHRpbi9zaGFkZXJzL2xhYmVsLmZzaGFkZXJcIik7XG5cblx0XHQvLyBRdWV1ZSBhIGxvYWQgZm9yIGFueSBwcmVsb2FkZWQgaXRlbXNcblx0XHRmb3IobGV0IGl0ZW0gb2YgdGhpcy5yZWdpc3RyeUl0ZW1zKXtcblx0XHRcdGNvbnN0IHNoYWRlciA9IG5ldyBpdGVtLmNvbnN0cihpdGVtLmtleSk7XG5cdFx0XHRzaGFkZXIuaW5pdEJ1ZmZlck9iamVjdCgpO1xuXHRcdFx0dGhpcy5hZGQoaXRlbS5rZXksIHNoYWRlcik7XG5cblx0XHRcdC8vIExvYWQgaWYgZGVzaXJlZFxuXHRcdFx0aWYoaXRlbS5wcmVsb2FkICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0XHRybS5zaGFkZXIoaXRlbS5rZXksIGl0ZW0ucHJlbG9hZC52c2hhZGVyTG9jYXRpb24sIGl0ZW0ucHJlbG9hZC5mc2hhZGVyTG9jYXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYSBzaGFkZXIgaW4gdGhlIHJlZ2lzdHJ5IGFuZCBsb2FkcyBpdCBiZWZvcmUgdGhlIGdhbWUgYmVnaW5zXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB5b3Ugd2lzaCB0byBhc3NpZ24gdG8gdGhlIHNoYWRlclxuXHQgKiBAcGFyYW0gY29uc3RyIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgU2hhZGVyVHlwZVxuXHQgKiBAcGFyYW0gdnNoYWRlckxvY2F0aW9uIFRoZSBsb2NhdGlvbiBvZiB0aGUgdmVydGV4IHNoYWRlclxuXHQgKiBAcGFyYW0gZnNoYWRlckxvY2F0aW9uIHRoZSBsb2NhdGlvbiBvZiB0aGUgZnJhZ21lbnQgc2hhZGVyXG5cdCAqL1xuXHRwdWJsaWMgcmVnaXN0ZXJBbmRQcmVsb2FkSXRlbShrZXk6IHN0cmluZywgY29uc3RyOiBuZXcgKHByb2dyYW1LZXk6IHN0cmluZykgPT4gU2hhZGVyVHlwZSwgdnNoYWRlckxvY2F0aW9uOiBzdHJpbmcsIGZzaGFkZXJMb2NhdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cdFx0bGV0IHNoYWRlclByZWxvYWQgPSBuZXcgU2hhZGVyUHJlbG9hZCgpO1xuXHRcdHNoYWRlclByZWxvYWQudnNoYWRlckxvY2F0aW9uID0gdnNoYWRlckxvY2F0aW9uO1xuXHRcdHNoYWRlclByZWxvYWQuZnNoYWRlckxvY2F0aW9uID0gZnNoYWRlckxvY2F0aW9uO1xuXG5cdFx0bGV0IHJlZ2lzdHJ5SXRlbSA9IG5ldyBTaGFkZXJSZWdpc3RyeUl0ZW0oKTtcblx0XHRyZWdpc3RyeUl0ZW0ua2V5ID0ga2V5O1xuXHRcdHJlZ2lzdHJ5SXRlbS5jb25zdHIgPSBjb25zdHI7XG5cdFx0cmVnaXN0cnlJdGVtLnByZWxvYWQgPSBzaGFkZXJQcmVsb2FkO1xuXG5cdFx0dGhpcy5yZWdpc3RyeUl0ZW1zLnB1c2gocmVnaXN0cnlJdGVtKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYSBzaGFkZXIgaW4gdGhlIHJlZ2lzdHJ5LiBOT1RFOiBJZiB5b3UgdXNlIHRoaXMsIHlvdSBNVVNUIGxvYWQgdGhlIHNoYWRlciBiZWZvcmUgdXNlLlxuXHQgKiBJZiB5b3Ugd2lzaCB0byBwcmVsb2FkIHRoZSBzaGFkZXIsIHVzZSByZWdpc3RlckFuZFByZWxvYWRJdGVtKClcblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHlvdSB3aXNoIHRvIGFzc2lnbiB0byB0aGUgc2hhZGVyXG5cdCAqIEBwYXJhbSBjb25zdHIgVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBTaGFkZXJUeXBlXG5cdCAqL1xuXHRwdWJsaWMgcmVnaXN0ZXJJdGVtKGtleTogc3RyaW5nLCBjb25zdHI6IG5ldyAocHJvZ3JhbUtleTogc3RyaW5nKSA9PiBTaGFkZXJUeXBlKTogdm9pZCB7XG5cdFx0bGV0IHJlZ2lzdHJ5SXRlbSA9IG5ldyBTaGFkZXJSZWdpc3RyeUl0ZW0oKTtcblx0XHRyZWdpc3RyeUl0ZW0ua2V5ID0ga2V5O1xuXHRcdHJlZ2lzdHJ5SXRlbS5jb25zdHIgPSBjb25zdHI7XG5cblx0XHR0aGlzLnJlZ2lzdHJ5SXRlbXMucHVzaChyZWdpc3RyeUl0ZW0pO1xuXHR9XG59XG5cbmNsYXNzIFNoYWRlclJlZ2lzdHJ5SXRlbSB7XG5cdGtleTogc3RyaW5nO1xuXHRjb25zdHI6IG5ldyAocHJvZ3JhbUtleTogc3RyaW5nKSA9PiBTaGFkZXJUeXBlO1xuXHRwcmVsb2FkOiBTaGFkZXJQcmVsb2FkO1xufVxuXG5jbGFzcyBTaGFkZXJQcmVsb2FkIHtcblx0dnNoYWRlckxvY2F0aW9uOiBzdHJpbmc7XG5cdGZzaGFkZXJMb2NhdGlvbjogc3RyaW5nO1xufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBSZWdpc3RyeSBmcm9tIFwiLi9SZWdpc3RyaWVzL1JlZ2lzdHJ5XCI7XG5pbXBvcnQgU2hhZGVyUmVnaXN0cnkgZnJvbSBcIi4vUmVnaXN0cmllcy9TaGFkZXJSZWdpc3RyeVwiO1xuXG4vKipcbiAqIFRoZSBSZWdpc3RyeSBpcyB0aGUgc3lzdGVtJ3Mgd2F5IG9mIGNvbnZlcnRpbmcgY2xhc3NlcyBhbmQgdHlwZXMgaW50byBzdHJpbmdcbiAqIHJlcHJlc2VudGF0aW9ucyBmb3IgdXNlIGVsc2V3aGVyZSBpbiB0aGUgYXBwbGljYXRpb24uXG4gKiBJdCBhbGxvd3MgY2xhc3NlcyB0byBiZSBhY2Nlc3NlZCB3aXRob3V0IGV4cGxpY2l0bHkgdXNpbmcgY29uc3RydWN0b3JzIGluIGNvZGUsXG4gKiBhbmQgZm9yIHJlc291cmNlcyB0byBiZSBsb2FkZWQgYXQgR2FtZSBjcmVhdGlvbiB0aW1lLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RyeU1hbmFnZXIge1xuXG5cdHB1YmxpYyBzdGF0aWMgc2hhZGVycyA9IG5ldyBTaGFkZXJSZWdpc3RyeSgpO1xuXG5cdC8qKiBBZGRpdGlvbmFsIGN1c3RvbSByZWdpc3RyaWVzIHRvIGFkZCB0byB0aGUgcmVnaXN0cnkgbWFuYWdlciAqL1xuXHRwcm90ZWN0ZWQgc3RhdGljIHJlZ2lzdHJpZXM6IE1hcDxSZWdpc3RyeTxhbnk+PiA9IG5ldyBNYXAoKTtcblxuXHRzdGF0aWMgcHJlbG9hZCgpe1xuXHRcdHRoaXMuc2hhZGVycy5wcmVsb2FkKCk7XG5cblx0XHR0aGlzLnJlZ2lzdHJpZXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHRoaXMucmVnaXN0cmllcy5nZXQoa2V5KS5wcmVsb2FkKCkpO1xuXHR9XG5cblx0c3RhdGljIGFkZEN1c3RvbVJlZ2lzdHJ5KG5hbWU6IHN0cmluZywgcmVnaXN0cnk6IFJlZ2lzdHJ5PGFueT4pe1xuXHRcdHRoaXMucmVnaXN0cmllcy5hZGQobmFtZSwgcmVnaXN0cnkpO1xuXHR9XG5cblx0c3RhdGljIGdldFJlZ2lzdHJ5KGtleTogc3RyaW5nKXtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyaWVzLmdldChrZXkpO1xuXHR9XG59IiwiaW1wb3J0IE1hcCBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4uLy4uL0V2ZW50cy9FbWl0dGVyXCI7XG5pbXBvcnQgQ2FudmFzTm9kZSBmcm9tIFwiLi4vLi4vTm9kZXMvQ2FudmFzTm9kZVwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uRGF0YSwgQW5pbWF0aW9uU3RhdGUgfSBmcm9tIFwiLi9BbmltYXRpb25UeXBlc1wiO1xuXG4vKipcbiAqIEFuIGFuaW1hdGlvbiBtYW5hZ2VyIGNsYXNzIGZvciBhbiBhbmltYXRlZCBDYW52YXNOb2RlLlxuICogVGhpcyBjbGFzcyBrZWVwcyB0cmFjayBvZiB0aGUgcG9zc2libGUgYW5pbWF0aW9ucywgYXMgd2VsbCBhcyB0aGUgY3VycmVudCBhbmltYXRpb24gc3RhdGUsXG4gKiBhbmQgYWJzdHJhY3RzIGFsbCBpbnRlcmFjdGlvbnMgd2l0aCBwbGF5aW5nLCBwYXVzaW5nLCBhbmQgc3RvcHBpbmcgYW5pbWF0aW9ucyBhcyB3ZWxsIGFzIFxuICogY3JlYXRpbmcgbmV3IGFuaW1hdGlvbnMgZnJvbSB0aGUgQ2FudmFzTm9kZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0aW9uTWFuYWdlciB7XG4gICAgLyoqIFRoZSBvd25lciBvZiB0aGlzIGFuaW1hdGlvbiBtYW5hZ2VyICovXG4gICAgcHJvdGVjdGVkIG93bmVyOiBDYW52YXNOb2RlO1xuICAgIFxuICAgIC8qKiBUaGUgY3VycmVudCBhbmltYXRpb24gc3RhdGUgb2YgdGhpcyBzcHJpdGUgKi9cbiAgICBwcm90ZWN0ZWQgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuXG4gICAgLyoqIFRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBvZiB0aGlzIHNwcml0ZSAqL1xuICAgIHByb3RlY3RlZCBjdXJyZW50QW5pbWF0aW9uOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhpcyBhbmltYXRpb24gKi9cbiAgICBwcm90ZWN0ZWQgY3VycmVudEZyYW1lOiBudW1iZXI7XG5cbiAgICAvKiogVGhlIHByb2dyZXNzIG9mIHRoZSBjdXJyZW50IGFuaW1hdGlvbiB0aHJvdWdoIHRoZSBjdXJyZW50IGZyYW1lICovXG4gICAgcHJvdGVjdGVkIGZyYW1lUHJvZ3Jlc3M6IG51bWJlcjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBpcyBsb29waW5nIG9yIG5vdCAqL1xuICAgIHByb3RlY3RlZCBsb29wOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBtYXAgb2YgYW5pbWF0aW9ucyAqL1xuICAgIHByb3RlY3RlZCBhbmltYXRpb25zOiBNYXA8QW5pbWF0aW9uRGF0YT47XG5cbiAgICAvKiogVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChpZiBhbnkpIHRvIHNlbmQgd2hlbiB0aGUgY3VycmVudCBhbmltYXRpb24gc3RvcHMgcGxheWluZy4gKi9cbiAgICBwcm90ZWN0ZWQgb25FbmRFdmVudDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBldmVudCBlbWl0dGVyIGZvciB0aGlzIGFuaW1hdGlvbiBtYW5hZ2VyICovXG4gICAgcHJvdGVjdGVkIGVtaXR0ZXI6IEVtaXR0ZXI7XG5cbiAgICAvKiogQSBxdWV1ZWQgYW5pbWF0aW9uICovXG4gICAgcHJvdGVjdGVkIHBlbmRpbmdBbmltYXRpb246IHN0cmluZztcblxuICAgIC8qKiBUaGUgbG9vcCBzdGF0dXMgb2YgYSBwZW5kaW5nIGFuaW1hdGlvbiAqL1xuICAgIHByb3RlY3RlZCBwZW5kaW5nTG9vcDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgb25FbmQgZXZlbnQgb2YgYSBwZW5kaW5nIGFuaW1hdGlvbiAqL1xuICAgIHByb3RlY3RlZCBwZW5kaW5nT25FbmQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQW5pbWF0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSBvd25lciBUaGUgb3duZXIgb2YgdGhlIEFuaW1hdGlvbk1hbmFnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihvd25lcjogQ2FudmFzTm9kZSl7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IEFuaW1hdGlvblN0YXRlLlNUT1BQRUQ7XG4gICAgICAgIHRoaXMuY3VycmVudEFuaW1hdGlvbiA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZVByb2dyZXNzID0gMDtcbiAgICAgICAgdGhpcy5sb29wID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5vbkVuZEV2ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYW5pbWF0aW9uIHRvIHRoaXMgc3ByaXRlXG4gICAgICogQHBhcmFtIGtleSBUaGUgdW5pcXVlIGtleSBvZiB0aGUgYW5pbWF0aW9uXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgYW5pbWF0aW9uIGRhdGFcbiAgICAgKi9cbiAgICBhZGQoa2V5OiBzdHJpbmcsIGFuaW1hdGlvbjogQW5pbWF0aW9uRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKGtleSwgYW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBzcGVjaWZpZWQgYnkgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFuZCBjdXJyZW50IGZyYW1lXG4gICAgICogQHJldHVybnMgVGhlIGluZGV4IGluIHRoZSBjdXJyZW50IGFuaW1hdGlvblxuICAgICAqL1xuICAgIGdldEluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIGlmKHRoaXMuYW5pbWF0aW9ucy5oYXModGhpcy5jdXJyZW50QW5pbWF0aW9uKSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRpb25zLmdldCh0aGlzLmN1cnJlbnRBbmltYXRpb24pLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV0uaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBObyBjdXJyZW50IGFuaW1hdGlvbiwgd2FybiB0aGUgdXNlclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKGBBbmltYXRpb24gaW5kZXggd2FzIHJlcXVlc3RlZCwgYnV0IHRoZSBjdXJyZW50IGFuaW1hdGlvbjogJHt0aGlzLmN1cnJlbnRBbmltYXRpb259IHdhcyBpbnZhbGlkYCk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIGFuaW1hdGlvbiBpcyBjdXJyZW50bHkgcGxheWluZ1xuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgYW5pbWF0aW9uIHRvIGNoZWNrXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFuaW1hdGlvbiBpcyBwbGF5aW5nLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc1BsYXlpbmcoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEFuaW1hdGlvbiA9PT0ga2V5ICYmIHRoaXMuYW5pbWF0aW9uU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLlBMQVlJTkc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBpbmRleCBhbmQgYWR2YW5jZXMgdGhlIGFuaW1hdGlvbiBmcmFtZVxuICAgICAqIEByZXR1cm5zIFRoZSBpbmRleCBvZiB0aGUgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZ2V0SW5kZXhBbmRBZHZhbmNlQW5pbWF0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCBwbGF5aW5nLCB3ZSB3b24ndCBiZSBhZHZhbmNpbmcgdGhlIGFuaW1hdGlvblxuICAgICAgICBpZighKHRoaXMuYW5pbWF0aW9uU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLlBMQVlJTkcpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEluZGV4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmFuaW1hdGlvbnMuaGFzKHRoaXMuY3VycmVudEFuaW1hdGlvbikpe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZ2V0KHRoaXMuY3VycmVudEFuaW1hdGlvbik7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50QW5pbWF0aW9uLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV0uaW5kZXg7XG5cbiAgICAgICAgICAgIC8vIEFkdmFuY2UgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgdGhpcy5mcmFtZVByb2dyZXNzICs9IDE7XG4gICAgICAgICAgICBpZih0aGlzLmZyYW1lUHJvZ3Jlc3MgPj0gY3VycmVudEFuaW1hdGlvbi5mcmFtZXNbdGhpcy5jdXJyZW50RnJhbWVdLmR1cmF0aW9uKXtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGJlZW4gb24gdGhpcyBmcmFtZSBmb3IgaXRzIHdob2xlIGR1cmF0aW9uLCBnbyB0byB0aGUgbmV4dCBvbmVcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lUHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZyYW1lICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRGcmFtZSA+PSBjdXJyZW50QW5pbWF0aW9uLmZyYW1lcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGlzIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kQ3VycmVudEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIGN1cnJlbnQgYW5pbWF0aW9uLCBjYW4ndCBhZHZhbmNlLiBXYXJuIHRoZSB1c2VyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEFuaW1hdGlvbiBpbmRleCBhbmQgYWR2YW5jZSB3YXMgcmVxdWVzdGVkLCBidXQgdGhlIGN1cnJlbnQgYW5pbWF0aW9uICgke3RoaXMuY3VycmVudEFuaW1hdGlvbn0pIGluIG5vZGUgd2l0aCBpZDogJHt0aGlzLm93bmVyLmlkfSB3YXMgaW52YWxpZGApO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW5kcyB0aGUgY3VycmVudCBhbmltYXRpb24gYW5kIGZpcmVzIGFueSBuZWNlc3NhcnkgZXZlbnRzLCBhcyB3ZWxsIGFzIHN0YXJ0aW5nIGFueSBuZXcgYW5pbWF0aW9ucyAqL1xuICAgIHByb3RlY3RlZCBlbmRDdXJyZW50QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5TVE9QUEVEO1xuXG4gICAgICAgIGlmKHRoaXMub25FbmRFdmVudCAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZmlyZUV2ZW50KHRoaXMub25FbmRFdmVudCwge293bmVyOiB0aGlzLm93bmVyLmlkLCBhbmltYXRpb246IHRoaXMuY3VycmVudEFuaW1hdGlvbn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBwZW5kaW5nIGFuaW1hdGlvbiwgcGxheSBpdFxuICAgICAgICBpZih0aGlzLnBlbmRpbmdBbmltYXRpb24gIT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5wbGF5KHRoaXMucGVuZGluZ0FuaW1hdGlvbiwgdGhpcy5wZW5kaW5nTG9vcCwgdGhpcy5wZW5kaW5nT25FbmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxheXMgdGhlIHNwZWNpZmllZCBhbmltYXRpb24uIERvZXMgbm90IHJlc3RhcnQgaXQgaWYgaXQgaXMgYWxyZWFkeSBwbGF5aW5nXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgbmFtZSBvZiB0aGUgYW5pbWF0aW9uIHRvIHBsYXlcbiAgICAgKiBAcGFyYW0gbG9vcCBXaGV0aGVyIG9yIG5vdCB0byBsb29wIHRoZSBhbmltYXRpb24uIEZhbHNlIGJ5IGRlZmF1bHRcbiAgICAgKiBAcGFyYW0gb25FbmQgVGhlIG5hbWUgb2YgYW4gZXZlbnQgdG8gc2VuZCB3aGVuIHRoaXMgYW5pbWF0aW9uIG5hdHVyYWxseSBzdG9wcyBwbGF5aW5nLiBUaGlzIG9ubHkgbWF0dGVycyBpZiBsb29wIGlzIGZhbHNlLlxuICAgICAqL1xuICAgIHBsYXlJZk5vdEFscmVhZHkoYW5pbWF0aW9uOiBzdHJpbmcsIGxvb3A/OiBib29sZWFuLCBvbkVuZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRBbmltYXRpb24gIT09IGFuaW1hdGlvbil7XG4gICAgICAgICAgICB0aGlzLnBsYXkoYW5pbWF0aW9uLCBsb29wLCBvbkVuZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGF5cyB0aGUgc3BlY2lmaWVkIGFuaW1hdGlvblxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gVGhlIG5hbWUgb2YgdGhlIGFuaW1hdGlvbiB0byBwbGF5XG4gICAgICogQHBhcmFtIGxvb3AgV2hldGhlciBvciBub3QgdG8gbG9vcCB0aGUgYW5pbWF0aW9uLiBGYWxzZSBieSBkZWZhdWx0XG4gICAgICogQHBhcmFtIG9uRW5kIFRoZSBuYW1lIG9mIGFuIGV2ZW50IHRvIHNlbmQgd2hlbiB0aGlzIGFuaW1hdGlvbiBuYXR1cmFsbHkgc3RvcHMgcGxheWluZy4gVGhpcyBvbmx5IG1hdHRlcnMgaWYgbG9vcCBpcyBmYWxzZS5cbiAgICAgKi9cbiAgICBwbGF5KGFuaW1hdGlvbjogc3RyaW5nLCBsb29wPzogYm9vbGVhbiwgb25FbmQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uID0gYW5pbWF0aW9uO1xuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVQcm9ncmVzcyA9IDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5QTEFZSU5HO1xuXG4gICAgICAgIC8vIElmIGxvb3AgYXJnIHdhcyBwcm92aWRlZCwgdXNlIHRoYXRcbiAgICAgICAgaWYobG9vcCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMubG9vcCA9IGxvb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHVzZSB3aGF0IHRoZSBqc29uIGZpbGUgc3BlY2lmaWVkXG4gICAgICAgICAgICB0aGlzLmxvb3AgPSB0aGlzLmFuaW1hdGlvbnMuZ2V0KGFuaW1hdGlvbikucmVwZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob25FbmQgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLm9uRW5kRXZlbnQgPSBvbkVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25FbmRFdmVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBwZW5kaW5nIGFuaW1hdGlvblxuICAgICAgICB0aGlzLnBlbmRpbmdBbmltYXRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFF1ZXVlcyBhIHNpbmdsZSBhbmltYXRpb24gdG8gYmUgcGxheWVkIGFmdGVyIHRoZSBjdXJyZW50IG9uZS4gRG9lcyBOT1Qgc3RhY2suXG4gICAgICogUXVldWVpbmcgYWRkaXRpb25hbCBhbmltYXRpb25zIHBhc3QgMSB3aWxsIGp1c3QgcmVwbGFjZSB0aGUgcXVldWVkIGFuaW1hdGlvblxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gVGhlIGFuaW1hdGlvbiB0byBxdWV1ZVxuICAgICAqIEBwYXJhbSBsb29wIFdoZXRoZXIgb3Igbm90IHRoZSBsb29wIHRoZSBxdWV1ZWQgYW5pbWF0aW9uXG4gICAgICogQHBhcmFtIG9uRW5kIFRoZSBldmVudCB0byBmaXJlIHdoZW4gdGhlIHF1ZXVlZCBhbmltYXRpb24gZW5kc1xuICAgICAqL1xuICAgIHF1ZXVlKGFuaW1hdGlvbjogc3RyaW5nLCBsb29wOiBib29sZWFuID0gZmFsc2UsIG9uRW5kPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGVuZGluZ0FuaW1hdGlvbiA9IGFuaW1hdGlvbjtcbiAgICAgICAgdGhpcy5wZW5kaW5nTG9vcCA9IGxvb3A7XG4gICAgICAgIGlmKG9uRW5kICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nT25FbmQgPSBvbkVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ09uRW5kID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQYXVzZXMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uICovXG4gICAgcGF1c2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5QQVVTRUQ7XG4gICAgfVxuXG4gICAgLyoqIFJlc3VtZXMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGlmIHBvc3NpYmxlICovXG4gICAgcmVzdW1lKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmFuaW1hdGlvblN0YXRlID09PSBBbmltYXRpb25TdGF0ZS5QQVVTRUQpe1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IEFuaW1hdGlvblN0YXRlLlBMQVlJTkc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU3RvcHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uLiBUaGUgYW5pbWF0aW9uIGNhbm5vdCBiZSByZXN1bWVkIGFmdGVyIHRoaXMuICovXG4gICAgc3RvcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IEFuaW1hdGlvblN0YXRlLlNUT1BQRUQ7XG4gICAgfVxufSIsImltcG9ydCB7IFR3ZWVuYWJsZVByb3BlcnRpZXMgfSBmcm9tIFwiLi4vLi4vTm9kZXMvR2FtZU5vZGVcIjtcbmltcG9ydCB7IEVhc2VGdW5jdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vVXRpbHMvRWFzZUZ1bmN0aW9uc1wiO1xuXG4vLyBAaWdub3JlUGFnZVxuXG5leHBvcnQgZW51bSBBbmltYXRpb25TdGF0ZSB7XG4gICAgU1RPUFBFRCA9IDAsXG4gICAgUEFVU0VEID0gMSxcbiAgICBQTEFZSU5HID0gMixcbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkRhdGEge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBmcmFtZXM6IEFycmF5PHtpbmRleDogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyfT47XG4gICAgcmVwZWF0OiBib29sZWFuID0gZmFsc2U7XG59XG5cbmV4cG9ydCBjbGFzcyBUd2VlbkVmZmVjdCB7XG4gICAgLyoqIFRoZSBwcm9wZXJ0eSB0byB0d2VlbiAqL1xuICAgIHByb3BlcnR5OiBUd2VlbmFibGVQcm9wZXJ0aWVzO1xuXG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBUd2VlbiBzaG91bGQgcmVzZXQgdGhlIHByb3BlcnR5IHRvIGl0cyBvcmlnaW5hbCB2YWx1ZSBhZnRlciBwbGF5aW5nICovXG4gICAgcmVzZXRPbkNvbXBsZXRlOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBzdGFydGluZyB2YWx1ZSBmb3IgdGhlIHR3ZWVuICovXG4gICAgc3RhcnQ6IGFueTtcblxuICAgIC8qKiBUaGUgZW5kaW5nIHZhbHVlIGZvciB0aGUgdHdlZW4gKi9cbiAgICBlbmQ6IGFueTtcblxuICAgIC8qKiBUaGUgZWFzZSBmdW5jdGlvbiB0byB1c2UgKi9cbiAgICBlYXNlOiBFYXNlRnVuY3Rpb25UeXBlO1xuXG4gICAgLyoqIERPIE5PVCBNT0RJRlkgLSBUaGUgb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHByb3BlcnR5IC0gc2V0IGF1dG9tYXRpY2FsbHkgKi9cbiAgICBpbml0aWFsVmFsdWU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFR3ZWVuRGF0YSB7XG4gICAgLy8gTWVtYmVycyBmb3IgaW5pdGlhbGl6YXRpb24gYnkgdGhlIHVzZXJcbiAgICAvKiogVGhlIGFtb3VudCBvZiB0aW1lIGluIG1zIHRvIHdhaXQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgdHdlZW4gKi9cbiAgICBzdGFydERlbGF5OiBudW1iZXI7XG4gICAgLyoqIFRoZSBkdXJhdGlvbiBvZiB0aW1lIG92ZXIgd2hpY2ggdGhlIHZhbHVlIHdpdGggY2hhbmdlIGZyb20gc3RhcnQgdG8gZW5kICovXG4gICAgZHVyYXRpb246IG51bWJlcjtcbiAgICAvKiogQW4gYXJyYXkgb2YgdGhlIGVmZmVjdHMgb24gdGhlIHByb3BlcnRpZXMgb2YgdGhlIG9iamVjdCAqL1xuICAgIGVmZmVjdHM6IEFycmF5PFR3ZWVuRWZmZWN0PjtcbiAgICAvKiogV2hldGhlciBvciBub3QgdGhpcyB0d2VlbiBzaG91bGQgcmV2ZXJzZSBmcm9tIGVuZCB0byBzdGFydCBmb3IgZWFjaCBwcm9wZXJ0eSB3aGVuIGl0IGZpbmlzaGVzICovXG4gICAgcmV2ZXJzZU9uQ29tcGxldGU6IGJvb2xlYW47XG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdHdlZW4gc2hvdWxkIGxvb3Agd2hlbiBpdCBjb21wbGV0ZXMgKi9cbiAgICBsb29wOiBib29sZWFuO1xuICAgIC8qKiBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gc2VuZCAoaWYgYW55KSB3aGVuIHRoZSB0d2VlbiBmaW5pc2hlcyBwbGF5aW5nICovXG4gICAgb25FbmQ6IHN0cmluZ1xuXG4gICAgLyoqIEV4dHJhIGRhdGEgdG8gYmUgc2VudCB3aGVuIHRoZSBvbkVuZCBldmVudCBpcyBmaXJlZC4gS2V5cyB3aXRoIHRoZSBuYW1lICdrZXknIG9yICdub2RlJyBhcmUgcmVzZXJ2ZWQgYW5kIGNhbid0IGJlIHVzZWQgYXMgbmFtZXMgZm9yIHlvdXIgZXh0cmEgZGF0YSAqL1xuICAgIG9uRW5kRGF0YTogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICBcbiAgICAvLyBNZW1iZXJzIGZvciBtYW5hZ2VtZW50IGJ5IHRoZSB0d2VlbiBtYW5hZ2VyXG4gICAgLyoqIFRoZSBwcm9ncmVzcyBvZiB0aGlzIHR3ZWVuIHRocm91Z2ggaXRzIGVmZmVjdHMgKi9cbiAgICBwcm9ncmVzczogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtcyB0aGF0IGhhcyBwYXNzZWQgZnJvbSB3aGVuIHRoaXMgdHdlZW4gc3RhcnRlZCBydW5uaW5nICovXG4gICAgZWxhcHNlZFRpbWU6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgc3RhdGUgb2YgdGhpcyB0d2VlbiAqL1xuICAgIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZTtcblxuICAgIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHR3ZWVuIGlzIGN1cnJlbnRseSByZXZlcnNpbmcgKi9cbiAgICByZXZlcnNpbmc6IGJvb2xlYW47XG59IiwiaW1wb3J0IE1hcCBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiO1xuaW1wb3J0IEdhbWVOb2RlIGZyb20gXCIuLi8uLi9Ob2Rlcy9HYW1lTm9kZVwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uU3RhdGUsIFR3ZWVuRGF0YSB9IGZyb20gXCIuL0FuaW1hdGlvblR5cGVzXCI7XG5pbXBvcnQgRWFzZUZ1bmN0aW9ucyBmcm9tIFwiLi4vLi4vVXRpbHMvRWFzZUZ1bmN0aW9uc1wiO1xuaW1wb3J0IE1hdGhVdGlscyBmcm9tIFwiLi4vLi4vVXRpbHMvTWF0aFV0aWxzXCI7XG5pbXBvcnQgVHdlZW5NYW5hZ2VyIGZyb20gXCIuL1R3ZWVuTWFuYWdlclwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4uLy4uL0V2ZW50cy9FbWl0dGVyXCI7XG5cbi8qKlxuICogQSBtYW5hZ2VyIGZvciB0aGUgdHdlZW5zIG9mIGEgR2FtZU5vZGUuXG4gKiBUd2VlbnMgYXJlIHNob3J0IGFuaW1hdGlvbnMgcGxheWVkIGJ5IGludGVycG9sYXRpbmcgYmV0d2VlbiB0d28gcHJvcGVydGllcyB1c2luZyBhbiBlYXNpbmcgZnVuY3Rpb24uXG4gKiBGb3IgYSBnb29kIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiBlYXNpbmcgZnVuY3Rpb25zLCBjaGVjayBvdXQgQGxpbmsoaHR0cHM6Ly9lYXNpbmdzLm5ldC8pKGh0dHBzOi8vZWFzaW5ncy5uZXQvKS5cbiAqIE11bHRpcGxlIHR3ZWVuIGNhbiBiZSBwbGF5ZWQgYXQgdGhlIHNhbWUgdGltZSwgYXMgbG9uZyBhcyB0aGV5IGRvbid0IGNoYW5nZSB0aGUgc2FtZSBwcm9wZXJ0eS5cbiAqIFRoaXMgYWxsb3dzIGZvciBzb21lIGludGVyZXN0aW5nIHBvbGlzaGVzIG9yIGFuaW1hdGlvbnMgdGhhdCBtYXkgYmUgdmVyeSBkaWZmaWN1bHQgdG8gZG8gd2l0aCBzcHJpdGUgd29yayBhbG9uZVxuICogLSBlc3BlY2lhbGx5IHBpeGVsIGFydCAoc3VjaCBhcyByb3RhdGlvbnMgb3Igc2NhbGluZykuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3ZWVuQ29udHJvbGxlciB7XG4gICAgLyoqIFRoZSBHYW1lTm9kZSB0aGlzIFR3ZWVuQ29udHJvbGxlciBhY3RzIHVwb24gKi9cbiAgICBwcm90ZWN0ZWQgb3duZXI6IEdhbWVOb2RlO1xuICAgIC8qKiBUaGUgbGlzdCBvZiBjcmVhdGVkIHR3ZWVucyAqL1xuICAgIHByb3RlY3RlZCB0d2VlbnM6IE1hcDxUd2VlbkRhdGE+O1xuICAgIC8qKiBBbiBldmVudCBlbWl0dGVyICovXG4gICAgcHJvdGVjdGVkIGVtaXR0ZXI6IEVtaXR0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFR3ZWVuQ29udHJvbGxlclxuICAgICAqIEBwYXJhbSBvd25lciBUaGUgb3duZXIgb2YgdGhlIFR3ZWVuQ29udHJvbGxlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG93bmVyOiBHYW1lTm9kZSl7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy50d2VlbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICAgICAgLy8gR2l2ZSBvdXJzZWx2ZXMgdG8gdGhlIFR3ZWVuTWFuYWdlclxuICAgICAgICBUd2Vlbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlclR3ZWVuQ29udHJvbGxlcih0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95cyB0aGlzIFR3ZWVuQ29udHJvbGxlclxuICAgICAqL1xuICAgIGRlc3Ryb3koKXtcbiAgICAgICAgLy8gT25seSB0aGUgZ2FtZW5vZGUgYW5kIHRoZSB0d2VlbiBtYW5hZ2VyIHNob3VsZCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICAgICAgZGVsZXRlIHRoaXMub3duZXIudHdlZW5zO1xuICAgICAgICBUd2Vlbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXJlZ2lzdGVyVHdlZW5Db250cm9sbGVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHR3ZWVuIHRvIHRoaXMgZ2FtZSBub2RlXG4gICAgICogQHBhcmFtIGtleSBUaGUgbmFtZSBvZiB0aGUgdHdlZW5cbiAgICAgKiBAcGFyYW0gdHdlZW4gVGhlIGRhdGEgb2YgdGhlIHR3ZWVuXG4gICAgICovXG4gICAgYWRkKGtleTogc3RyaW5nLCB0d2VlbjogUmVjb3JkPHN0cmluZywgYW55PiB8IFR3ZWVuRGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgdHlwZWRUd2VlbiA9IDxUd2VlbkRhdGE+dHdlZW47XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBtZW1iZXJzIHRoYXQgd2UgbmVlZCAoYW5kIHRoZSB1c2VyIGRpZG4ndCBwcm92aWRlKVxuICAgICAgICB0eXBlZFR3ZWVuLnByb2dyZXNzID0gMDtcbiAgICAgICAgdHlwZWRUd2Vlbi5lbGFwc2VkVGltZSA9IDA7XG4gICAgICAgIHR5cGVkVHdlZW4uYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5TVE9QUEVEO1xuXG4gICAgICAgIHRoaXMudHdlZW5zLmFkZChrZXksIHR5cGVkVHdlZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYXkgYSB0d2VlbiB3aXRoIGEgY2VydGFpbiBuYW1lXG4gICAgICogQHBhcmFtIGtleSBUaGUgbmFtZSBvZiB0aGUgdHdlZW4gdG8gcGxheVxuICAgICAqIEBwYXJhbSBsb29wIFdoZXRoZXIgb3Igbm90IHRoZSB0d2VlbiBzaG91bGQgbG9vcFxuICAgICAqL1xuICAgIHBsYXkoa2V5OiBzdHJpbmcsIGxvb3A/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMudHdlZW5zLmhhcyhrZXkpKXtcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IHRoaXMudHdlZW5zLmdldChrZXkpO1xuXG4gICAgICAgICAgICAvLyBTZXQgbG9vcCBpZiBuZWVkZWRcbiAgICAgICAgICAgIGlmKGxvb3AgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgdHdlZW4ubG9vcCA9IGxvb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgICAgIGZvcihsZXQgZWZmZWN0IG9mIHR3ZWVuLmVmZmVjdHMpe1xuICAgICAgICAgICAgICAgIGlmKGVmZmVjdC5yZXNldE9uQ29tcGxldGUpe1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QuaW5pdGlhbFZhbHVlID0gdGhpcy5vd25lcltlZmZlY3QucHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIHR3ZWVuIHJ1bm5pbmdcbiAgICAgICAgICAgIHR3ZWVuLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuUExBWUlORztcbiAgICAgICAgICAgIHR3ZWVuLmVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgICAgIHR3ZWVuLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIHR3ZWVuLnJldmVyc2luZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUcmllZCB0byBwbGF5IHR3ZWVuIFwiJHtrZXl9XCIgb24gbm9kZSB3aXRoIGlkICR7dGhpcy5vd25lci5pZH0sIGJ1dCBubyBzdWNoIHR3ZWVuIGV4aXN0c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGF1c2VzIGEgcGxheWluZyB0d2Vlbi4gRG9lcyBub3QgYWZmZWN0IHR3ZWVucyB0aGF0IGFyZSBzdG9wcGVkLlxuICAgICAqIEBwYXJhbSBrZXkgVGhlIG5hbWUgb2YgdGhlIHR3ZWVuIHRvIHBhdXNlLlxuICAgICAqL1xuICAgIHBhdXNlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMudHdlZW5zLmhhcyhrZXkpKXtcbiAgICAgICAgICAgIHRoaXMudHdlZW5zLmdldChrZXkpLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuUEFVU0VEO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzdW1lcyBhIHBhdXNlZCB0d2Vlbi5cbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBuYW1lIG9mIHRoZSB0d2VlbiB0byByZXN1bWVcbiAgICAgKi9cbiAgICByZXN1bWUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy50d2VlbnMuaGFzKGtleSkpe1xuICAgICAgICAgICAgbGV0IHR3ZWVuID0gdGhpcy50d2VlbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZih0d2Vlbi5hbmltYXRpb25TdGF0ZSA9PT0gQW5pbWF0aW9uU3RhdGUuUEFVU0VEKVxuICAgICAgICAgICAgICAgIHR3ZWVuLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuUExBWUlORztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGEgY3VycmVudGx5IHBsYXlpbmcgdHdlZW5cbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIHR3ZWVuXG4gICAgICovXG4gICAgc3RvcChrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLnR3ZWVucy5oYXMoa2V5KSl7XG4gICAgICAgICAgICBsZXQgdHdlZW4gPSB0aGlzLnR3ZWVucy5nZXQoa2V5KTtcbiAgICAgICAgICAgIHR3ZWVuLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuU1RPUFBFRDtcblxuICAgICAgICAgICAgLy8gUmV0dXJuIHRvIHRoZSBpbml0aWFsIHZhbHVlc1xuICAgICAgICAgICAgZm9yKGxldCBlZmZlY3Qgb2YgdHdlZW4uZWZmZWN0cyl7XG4gICAgICAgICAgICAgICAgaWYoZWZmZWN0LnJlc2V0T25Db21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXJbZWZmZWN0LnByb3BlcnR5XSA9IGVmZmVjdC5pbml0aWFsVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG5hdHVyYWwgc3RvcCBvZiBhIGN1cnJlbnRseSBwbGF5aW5nIHR3ZWVuXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSB0d2VlblxuICAgICAqL1xuICAgIHByb3RlY3RlZCBlbmQoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wKGtleSk7XG4gICAgICAgIGlmKHRoaXMudHdlZW5zLmhhcyhrZXkpKXtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdHdlZW5cbiAgICAgICAgICAgIGxldCB0d2VlbiA9IHRoaXMudHdlZW5zLmdldChrZXkpO1xuXG4gICAgICAgICAgICAvLyBJZiBpdCBoYXMgYW4gb25FbmQsIHNlbmQgYW4gZXZlbnRcbiAgICAgICAgICAgIGlmKHR3ZWVuLm9uRW5kKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTogUmVjb3JkPHN0cmluZywgYW55PiA9IHtrZXk6IGtleSwgbm9kZTogdGhpcy5vd25lci5pZH1cbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBoYXMgb25FbmQgZXZlbnQgZGF0YSwgYWRkIGVhY2ggZW50cnksIGFzIGxvbmcgYXMgdGhlIGtleSBpcyBub3QgbmFtZWQgJ2tleScgb3IgJ25vZGUnXG4gICAgICAgICAgICAgICAgaWYgKHR3ZWVuLm9uRW5kRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0d2Vlbi5vbkVuZERhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09IFwia2V5XCIgJiYga2V5ICE9PSBcIm5vZGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHR3ZWVuLm9uRW5kRGF0YVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZmlyZUV2ZW50KHR3ZWVuLm9uRW5kLCBkYXRhKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhbGwgY3VycmVudGx5IHBsYXlpbmcgdHdlZW5zXG4gICAgICovXG4gICAgc3RvcEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50d2VlbnMuZm9yRWFjaChrZXkgPT4gdGhpcy5zdG9wKGtleSkpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGFUOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50d2VlbnMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHR3ZWVuID0gdGhpcy50d2VlbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZih0d2Vlbi5hbmltYXRpb25TdGF0ZSA9PT0gQW5pbWF0aW9uU3RhdGUuUExBWUlORyl7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBwcm9ncmVzcyBvZiB0aGUgdHdlZW5cbiAgICAgICAgICAgICAgICB0d2Vlbi5lbGFwc2VkVGltZSArPSBkZWx0YVQqMTAwMDtcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIHBhc3QgdGhlIHN0YXJ0RGVsYXksIGRvIHRoZSB0d2VlblxuICAgICAgICAgICAgICAgIGlmKHR3ZWVuLmVsYXBzZWRUaW1lID49IHR3ZWVuLnN0YXJ0RGVsYXkpe1xuICAgICAgICAgICAgICAgICAgICBpZighdHdlZW4ucmV2ZXJzaW5nICYmIHR3ZWVuLmVsYXBzZWRUaW1lID49IHR3ZWVuLnN0YXJ0RGVsYXkgKyB0d2Vlbi5kdXJhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBvdmVyIHRpbWUsIHN0b3AgdGhlIHR3ZWVuLCBsb29wLCBvciByZXZlcnNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0d2Vlbi5yZXZlcnNlT25Db21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UncmUgb3ZlciB0aW1lIGFuZCBjYW4gcmV2ZXJzZSwgZG8gc29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbi5yZXZlcnNpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHR3ZWVuLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGNhbid0IHJldmVyc2UgYW5kIGNhbiBsb29wLCBkbyBzb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLmVsYXBzZWRUaW1lIC09IHR3ZWVuLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBhcmVuJ3QgbG9vcGluZyBhbmQgY2FuJ3QgcmV2ZXJzZSwgc28gc3RvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGVuZCBvZiByZXZlcnNpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYodHdlZW4ucmV2ZXJzaW5nICYmIHR3ZWVuLmVsYXBzZWRUaW1lID49IHR3ZWVuLnN0YXJ0RGVsYXkgKyAyKnR3ZWVuLmR1cmF0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3ZWVuLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLnJldmVyc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLmVsYXBzZWRUaW1lIC09IDIqdHdlZW4uZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHByb2dyZXNzLCBtYWtlIHN1cmUgaXQgaXMgYmV0d2VlbiAwIGFuZCAxLiBFcnJvcnMgZnJvbSB0aGlzIHNob3VsZCBuZXZlciBiZSBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBpZih0d2Vlbi5yZXZlcnNpbmcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW4ucHJvZ3Jlc3MgPSBNYXRoVXRpbHMuY2xhbXAwMSgoMip0d2Vlbi5kdXJhdGlvbiAtICh0d2Vlbi5lbGFwc2VkVGltZS0gdHdlZW4uc3RhcnREZWxheSkpL3R3ZWVuLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLnByb2dyZXNzID0gTWF0aFV0aWxzLmNsYW1wMDEoKHR3ZWVuLmVsYXBzZWRUaW1lIC0gdHdlZW4uc3RhcnREZWxheSkvdHdlZW4uZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBlZmZlY3Qgb2YgdHdlZW4uZWZmZWN0cyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgZWFzZSBmdW5jdGlvbiB0aGF0IGNvcnJlc3BvbmRzIHRvIG91ciBwcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVhc2UgPSBFYXNlRnVuY3Rpb25zW2VmZmVjdC5lYXNlXSh0d2Vlbi5wcm9ncmVzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgdmFsdWUgdG8gbGVycCB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IE1hdGhVdGlscy5sZXJwKGVmZmVjdC5zdGFydCwgZWZmZWN0LmVuZCwgZWFzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyW2VmZmVjdC5wcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCBVcGRhdGVhYmxlIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvSW50ZXJmYWNlcy9VcGRhdGVhYmxlXCI7XG5pbXBvcnQgVHdlZW5Db250cm9sbGVyIGZyb20gXCIuL1R3ZWVuQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2Vlbk1hbmFnZXIgaW1wbGVtZW50cyBVcGRhdGVhYmxlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBUd2Vlbk1hbmFnZXIgPSBudWxsO1xuICAgIFxuICAgIHByb3RlY3RlZCB0d2VlbkNvbnRyb2xsZXJzOiBBcnJheTxUd2VlbkNvbnRyb2xsZXI+O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnR3ZWVuQ29udHJvbGxlcnMgPSBuZXcgQXJyYXkoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVHdlZW5NYW5hZ2VyIHtcbiAgICAgICAgaWYoVHdlZW5NYW5hZ2VyLmluc3RhbmNlID09PSBudWxsKXtcbiAgICAgICAgICAgIFR3ZWVuTWFuYWdlci5pbnN0YW5jZSA9IG5ldyBUd2Vlbk1hbmFnZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBUd2Vlbk1hbmFnZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJUd2VlbkNvbnRyb2xsZXIoY29udHJvbGxlcjogVHdlZW5Db250cm9sbGVyKXtcbiAgICAgICAgdGhpcy50d2VlbkNvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgfVxuXG4gICAgZGVyZWdpc3RlclR3ZWVuQ29udHJvbGxlcihjb250cm9sbGVyOiBUd2VlbkNvbnRyb2xsZXIpe1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnR3ZWVuQ29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy50d2VlbkNvbnRyb2xsZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgY2xlYXJUd2VlbkNvbnRyb2xsZXJzKCl7XG4gICAgICAgIHRoaXMudHdlZW5Db250cm9sbGVycyA9IG5ldyBBcnJheSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkZWx0YVQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBmb3IobGV0IHR3ZWVuQ29udHJvbGxlciBvZiB0aGlzLnR3ZWVuQ29udHJvbGxlcnMpe1xuICAgICAgICAgICAgdHdlZW5Db250cm9sbGVyLnVwZGF0ZShkZWx0YVQpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBDYW52YXNOb2RlIGZyb20gXCIuLi9Ob2Rlcy9DYW52YXNOb2RlXCI7XG5pbXBvcnQgR3JhcGhpYyBmcm9tIFwiLi4vTm9kZXMvR3JhcGhpY1wiO1xuaW1wb3J0IFBvaW50IGZyb20gXCIuLi9Ob2Rlcy9HcmFwaGljcy9Qb2ludFwiO1xuaW1wb3J0IFJlY3QgZnJvbSBcIi4uL05vZGVzL0dyYXBoaWNzL1JlY3RcIjtcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4uL05vZGVzL1Nwcml0ZXMvU3ByaXRlXCI7XG5pbXBvcnQgVGlsZW1hcCBmcm9tIFwiLi4vTm9kZXMvVGlsZW1hcFwiO1xuaW1wb3J0IE9ydGhvZ29uYWxUaWxlbWFwIGZyb20gXCIuLi9Ob2Rlcy9UaWxlbWFwcy9PcnRob2dvbmFsVGlsZW1hcFwiO1xuaW1wb3J0IFVJRWxlbWVudCBmcm9tIFwiLi4vTm9kZXMvVUlFbGVtZW50XCI7XG5pbXBvcnQgVUlMYXllciBmcm9tIFwiLi4vU2NlbmUvTGF5ZXJzL1VJTGF5ZXJcIjtcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vU2NlbmUvU2NlbmVcIjtcbmltcG9ydCBHcmFwaGljUmVuZGVyZXIgZnJvbSBcIi4vQ2FudmFzUmVuZGVyaW5nL0dyYXBoaWNSZW5kZXJlclwiO1xuaW1wb3J0IFJlbmRlcmluZ01hbmFnZXIgZnJvbSBcIi4vUmVuZGVyaW5nTWFuYWdlclwiXG5pbXBvcnQgVGlsZW1hcFJlbmRlcmVyIGZyb20gXCIuL0NhbnZhc1JlbmRlcmluZy9UaWxlbWFwUmVuZGVyZXJcIjtcbmltcG9ydCBVSUVsZW1lbnRSZW5kZXJlciBmcm9tIFwiLi9DYW52YXNSZW5kZXJpbmcvVUlFbGVtZW50UmVuZGVyZXJcIjtcbmltcG9ydCBMYWJlbCBmcm9tIFwiLi4vTm9kZXMvVUlFbGVtZW50cy9MYWJlbFwiO1xuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi4vTm9kZXMvVUlFbGVtZW50cy9CdXR0b25cIjtcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL05vZGVzL1VJRWxlbWVudHMvU2xpZGVyXCI7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gXCIuLi9Ob2Rlcy9VSUVsZW1lbnRzL1RleHRJbnB1dFwiO1xuaW1wb3J0IEFuaW1hdGVkU3ByaXRlIGZyb20gXCIuLi9Ob2Rlcy9TcHJpdGVzL0FuaW1hdGVkU3ByaXRlXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi4vVXRpbHMvQ29sb3JcIjtcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9Ob2Rlcy9HcmFwaGljcy9MaW5lXCI7XG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgSXNvbWV0cmljVGlsZW1hcCBmcm9tIFwiLi4vTm9kZXMvVGlsZW1hcHMvSXNvbWV0cmljVGlsZW1hcFwiO1xuaW1wb3J0IFN0YWdnZXJlZElzb21ldHJpY1RpbGVtYXAgZnJvbSBcIi4uL05vZGVzL1RpbGVtYXBzL1N0YWdnZXJlZElzb21ldHJpY1RpbGVtYXBcIjtcblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUmVuZGVyaW5nTWFuYWdlciBjbGFzcyB1c2luZyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyaW5nTWFuYWdlciB7XG4gICAgcHJvdGVjdGVkIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByb3RlY3RlZCBncmFwaGljUmVuZGVyZXI6IEdyYXBoaWNSZW5kZXJlcjtcbiAgICBwcm90ZWN0ZWQgdGlsZW1hcFJlbmRlcmVyOiBUaWxlbWFwUmVuZGVyZXI7XG4gICAgcHJvdGVjdGVkIHVpRWxlbWVudFJlbmRlcmVyOiBVSUVsZW1lbnRSZW5kZXJlcjtcblxuICAgIHByb3RlY3RlZCBvcmlnaW46IFZlYzI7XG4gICAgcHJvdGVjdGVkIHpvb206IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCB3b3JsZFNpemU6IFZlYzI7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIHNldFNjZW5lKHNjZW5lOiBTY2VuZSl7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICAgICAgdGhpcy5ncmFwaGljUmVuZGVyZXIuc2V0U2NlbmUoc2NlbmUpO1xuICAgICAgICB0aGlzLnRpbGVtYXBSZW5kZXJlci5zZXRTY2VuZShzY2VuZSk7XG4gICAgICAgIHRoaXMudWlFbGVtZW50UmVuZGVyZXIuc2V0U2NlbmUoc2NlbmUpO1xuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIGluaXRpYWxpemVDYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLndvcmxkU2l6ZSA9IG5ldyBWZWMyKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICB0aGlzLmdyYXBoaWNSZW5kZXJlciA9IG5ldyBHcmFwaGljUmVuZGVyZXIodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLnRpbGVtYXBSZW5kZXJlciA9IG5ldyBUaWxlbWFwUmVuZGVyZXIodGhpcy5jdHgpO1xuICAgICAgICB0aGlzLnVpRWxlbWVudFJlbmRlcmVyID0gbmV3IFVJRWxlbWVudFJlbmRlcmVyKHRoaXMuY3R4KVxuXG4gICAgICAgIC8vIEZvciBjcmlzcCBwaXhlbCBhcnRcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIHJlbmRlcih2aXNpYmxlU2V0OiBDYW52YXNOb2RlW10sIHRpbGVtYXBzOiBUaWxlbWFwW10sIHVpTGF5ZXJzOiBNYXA8VUlMYXllcj4pOiB2b2lkIHtcbiAgICAgICAgLy8gU29ydCBieSBkZXB0aCwgdGhlbiBieSB2aXNpYmxlIHNldCBieSB5LXZhbHVlXG4gICAgICAgIHZpc2libGVTZXQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYoYS5nZXRMYXllcigpLmdldERlcHRoKCkgPT09IGIuZ2V0TGF5ZXIoKS5nZXREZXB0aCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEuYm91bmRhcnkuYm90dG9tKSAtIChiLmJvdW5kYXJ5LmJvdHRvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLmdldExheWVyKCkuZ2V0RGVwdGgoKSAtIGIuZ2V0TGF5ZXIoKS5nZXREZXB0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdGlsZW1hcEluZGV4ID0gMDtcbiAgICAgICAgbGV0IHRpbGVtYXBMZW5ndGggPSB0aWxlbWFwcy5sZW5ndGg7XG5cbiAgICAgICAgbGV0IHZpc2libGVTZXRJbmRleCA9IDA7XG4gICAgICAgIGxldCB2aXNpYmxlU2V0TGVuZ3RoID0gdmlzaWJsZVNldC5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUodGlsZW1hcEluZGV4IDwgdGlsZW1hcExlbmd0aCB8fCB2aXNpYmxlU2V0SW5kZXggPCB2aXNpYmxlU2V0TGVuZ3RoKXtcbiAgICAgICAgICAgIC8vIENoZWNrIGNvbmRpdGlvbnMgd2hlcmUgd2UndmUgYWxyZWFkeSByZWFjaGVkIHRoZSBlZGdlIG9mIG9uZSBsaXN0XG4gICAgICAgICAgICBpZih0aWxlbWFwSW5kZXggPj0gdGlsZW1hcExlbmd0aCl7XG4gICAgICAgICAgICAgICAgLy8gT25seSByZW5kZXIgdGhlIHJlbWFpbmluZyB2aXNpYmxlIHNldFxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gdmlzaWJsZVNldFt2aXNpYmxlU2V0SW5kZXgrK107XG4gICAgICAgICAgICAgICAgaWYobm9kZS52aXNpYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmlzaWJsZVNldEluZGV4ID49IHZpc2libGVTZXRMZW5ndGgpe1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgcmVuZGVyIHRpbGVtYXBzXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUaWxlbWFwKHRpbGVtYXBzW3RpbGVtYXBJbmRleCsrXSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciB3aGljaGV2ZXIgaXMgZnVydGhlciBkb3duXG4gICAgICAgICAgICBpZih0aWxlbWFwc1t0aWxlbWFwSW5kZXhdLmdldExheWVyKCkuZ2V0RGVwdGgoKSA8PSB2aXNpYmxlU2V0W3Zpc2libGVTZXRJbmRleF0uZ2V0TGF5ZXIoKS5nZXREZXB0aCgpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRpbGVtYXAodGlsZW1hcHNbdGlsZW1hcEluZGV4KytdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSB2aXNpYmxlU2V0W3Zpc2libGVTZXRJbmRleCsrXTtcbiAgICAgICAgICAgICAgICBpZihub2RlLnZpc2libGUpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSB1aUxheWVycyBvbiB0b3Agb2YgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGxldCBzb3J0ZWRVSUxheWVycyA9IG5ldyBBcnJheTxVSUxheWVyPigpO1xuXG4gICAgICAgIHVpTGF5ZXJzLmZvckVhY2goa2V5ID0+IHNvcnRlZFVJTGF5ZXJzLnB1c2godWlMYXllcnMuZ2V0KGtleSkpKTtcblxuICAgICAgICBzb3J0ZWRVSUxheWVycyA9IHNvcnRlZFVJTGF5ZXJzLnNvcnQoKHVpMSwgdWkyKSA9PiB1aTEuZ2V0RGVwdGgoKSAtIHVpMi5nZXREZXB0aCgpKTtcblxuICAgICAgICBzb3J0ZWRVSUxheWVycy5mb3JFYWNoKHVpTGF5ZXIgPT4ge1xuXHRcdFx0aWYoIXVpTGF5ZXIuaXNIaWRkZW4oKSlcblx0XHRcdFx0dWlMYXllci5nZXRJdGVtcygpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCg8Q2FudmFzTm9kZT5ub2RlKS52aXNpYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTm9kZSg8Q2FudmFzTm9kZT5ub2RlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblx0XHR9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgc3BlY2lmaWVkIENhbnZhc05vZGVcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgQ2FudmFzTm9kZSB0byByZW5kZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVuZGVyTm9kZShub2RlOiBDYW52YXNOb2RlKTogdm9pZCB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgb3JpZ2luIG9mIHRoZSB2aWV3cG9ydCBhY2NvcmRpbmcgdG8gdGhpcyBzcHJpdGVcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnNjZW5lLmdldFZpZXdUcmFuc2xhdGlvbihub2RlKTtcblxuICAgICAgICAvLyBHZXQgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIHNjZW5lXG4gICAgICAgIHRoaXMuem9vbSA9IHRoaXMuc2NlbmUuZ2V0Vmlld1NjYWxlKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBNb3ZlIHRoZSBjYW52YXMgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBub2RlIGFuZCByb3RhdGVcbiAgICAgICAgbGV0IHhTY2FsZSA9IDE7XG4gICAgICAgIGxldCB5U2NhbGUgPSAxO1xuICAgICAgICBcbiAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIFNwcml0ZSl7XG4gICAgICAgICAgICB4U2NhbGUgPSBub2RlLmludmVydFggPyAtMSA6IDE7XG4gICAgICAgICAgICB5U2NhbGUgPSBub2RlLmludmVydFkgPyAtMSA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oeFNjYWxlLCAwLCAwLCB5U2NhbGUsIChub2RlLnBvc2l0aW9uLnggLSB0aGlzLm9yaWdpbi54KSp0aGlzLnpvb20sIChub2RlLnBvc2l0aW9uLnkgLSB0aGlzLm9yaWdpbi55KSp0aGlzLnpvb20pO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUoLW5vZGUucm90YXRpb24pO1xuICAgICAgICBsZXQgZ2xvYmFsQWxwaGEgPSB0aGlzLmN0eC5nbG9iYWxBbHBoYTtcbiAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIFJlY3Qpe1xuICAgICAgICAgICAgRGVidWcubG9nKFwibm9kZVwiICsgbm9kZS5pZCwgXCJOb2RlXCIgKyBub2RlLmlkICsgXCIgQWxwaGE6IFwiICsgbm9kZS5hbHBoYSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBub2RlLmFscGhhO1xuICAgICAgICBcbiAgICAgICAgaWYobm9kZSBpbnN0YW5jZW9mIEFuaW1hdGVkU3ByaXRlKXtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQW5pbWF0ZWRTcHJpdGUoPEFuaW1hdGVkU3ByaXRlPm5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIFNwcml0ZSl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNwcml0ZSg8U3ByaXRlPm5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIEdyYXBoaWMpe1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJHcmFwaGljKDxHcmFwaGljPm5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIFVJRWxlbWVudCl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclVJRWxlbWVudCg8VUlFbGVtZW50Pm5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBnbG9iYWxBbHBoYTtcbiAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIHByb3RlY3RlZCByZW5kZXJTcHJpdGUoc3ByaXRlOiBTcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgLy8gR2V0IHRoZSBpbWFnZSBmcm9tIHRoZSByZXNvdXJjZSBtYW5hZ2VyXG4gICAgICAgIGxldCBpbWFnZSA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldEltYWdlKHNwcml0ZS5pbWFnZUlkKTtcblxuICAgICAgICAvKlxuICAgICAgICAgICAgQ29vcmRpbmF0ZXMgaW4gdGhlIHNwYWNlIG9mIHRoZSBpbWFnZTpcbiAgICAgICAgICAgICAgICBpbWFnZSBjcm9wIHN0YXJ0IC0+IHgsIHlcbiAgICAgICAgICAgICAgICBpbWFnZSBjcm9wIHNpemUgIC0+IHcsIGhcbiAgICAgICAgICAgIENvb3JkaW5hdGVzIGluIHRoZSBzcGFjZSBvZiB0aGUgd29ybGRcbiAgICAgICAgICAgICAgICBpbWFnZSBkcmF3IHN0YXJ0IC0+IHgsIHlcbiAgICAgICAgICAgICAgICBpbWFnZSBkcmF3IHNpemUgIC0+IHcsIGhcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLFxuICAgICAgICAgICAgc3ByaXRlLmltYWdlT2Zmc2V0LngsIHNwcml0ZS5pbWFnZU9mZnNldC55LFxuICAgICAgICAgICAgc3ByaXRlLnNpemUueCwgc3ByaXRlLnNpemUueSxcbiAgICAgICAgICAgICgtc3ByaXRlLnNpemUueCpzcHJpdGUuc2NhbGUueC8yKSp0aGlzLnpvb20sICgtc3ByaXRlLnNpemUueSpzcHJpdGUuc2NhbGUueS8yKSp0aGlzLnpvb20sXG4gICAgICAgICAgICBzcHJpdGUuc2l6ZS54ICogc3ByaXRlLnNjYWxlLngqdGhpcy56b29tLCBzcHJpdGUuc2l6ZS55ICogc3ByaXRlLnNjYWxlLnkqdGhpcy56b29tKTtcbiAgICB9XG5cbiAgICAvLyBAb3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQW5pbWF0ZWRTcHJpdGUoc3ByaXRlOiBBbmltYXRlZFNwcml0ZSk6IHZvaWQge1xuICAgICAgICAvLyBHZXQgdGhlIGltYWdlIGZyb20gdGhlIHJlc291cmNlIG1hbmFnZXJcbiAgICAgICAgbGV0IGltYWdlID0gdGhpcy5yZXNvdXJjZU1hbmFnZXIuZ2V0SW1hZ2Uoc3ByaXRlLmltYWdlSWQpO1xuXG4gICAgICAgIGxldCBhbmltYXRpb25JbmRleCA9IHNwcml0ZS5hbmltYXRpb24uZ2V0SW5kZXhBbmRBZHZhbmNlQW5pbWF0aW9uKCk7XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbk9mZnNldCA9IHNwcml0ZS5nZXRBbmltYXRpb25PZmZzZXQoYW5pbWF0aW9uSW5kZXgpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBDb29yZGluYXRlcyBpbiB0aGUgc3BhY2Ugb2YgdGhlIGltYWdlOlxuICAgICAgICAgICAgICAgIGltYWdlIGNyb3Agc3RhcnQgLT4geCwgeVxuICAgICAgICAgICAgICAgIGltYWdlIGNyb3Agc2l6ZSAgLT4gdywgaFxuICAgICAgICAgICAgQ29vcmRpbmF0ZXMgaW4gdGhlIHNwYWNlIG9mIHRoZSB3b3JsZCAoZ2l2ZW4gd2UgbW92ZWQpXG4gICAgICAgICAgICAgICAgaW1hZ2UgZHJhdyBzdGFydCAtPiAtdy8yLCAtaC8yXG4gICAgICAgICAgICAgICAgaW1hZ2UgZHJhdyBzaXplICAtPiB3LCBoXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSxcbiAgICAgICAgICAgIHNwcml0ZS5pbWFnZU9mZnNldC54ICsgYW5pbWF0aW9uT2Zmc2V0LngsIHNwcml0ZS5pbWFnZU9mZnNldC55ICsgYW5pbWF0aW9uT2Zmc2V0LnksXG4gICAgICAgICAgICBzcHJpdGUuc2l6ZS54LCBzcHJpdGUuc2l6ZS55LFxuICAgICAgICAgICAgKC1zcHJpdGUuc2l6ZS54KnNwcml0ZS5zY2FsZS54LzIpKnRoaXMuem9vbSwgKC1zcHJpdGUuc2l6ZS55KnNwcml0ZS5zY2FsZS55LzIpKnRoaXMuem9vbSxcbiAgICAgICAgICAgIHNwcml0ZS5zaXplLnggKiBzcHJpdGUuc2NhbGUueCp0aGlzLnpvb20sIHNwcml0ZS5zaXplLnkgKiBzcHJpdGUuc2NhbGUueSp0aGlzLnpvb20pO1xuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIHByb3RlY3RlZCByZW5kZXJHcmFwaGljKGdyYXBoaWM6IEdyYXBoaWMpOiB2b2lkIHtcbiAgICAgICAgaWYoZ3JhcGhpYyBpbnN0YW5jZW9mIFBvaW50KXtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY1JlbmRlcmVyLnJlbmRlclBvaW50KDxQb2ludD5ncmFwaGljLCB0aGlzLnpvb20pO1xuICAgICAgICB9IGVsc2UgaWYoZ3JhcGhpYyBpbnN0YW5jZW9mIExpbmUpe1xuICAgICAgICAgICAgdGhpcy5ncmFwaGljUmVuZGVyZXIucmVuZGVyTGluZSg8TGluZT5ncmFwaGljLCB0aGlzLm9yaWdpbiwgdGhpcy56b29tKTtcbiAgICAgICAgfSBlbHNlIGlmKGdyYXBoaWMgaW5zdGFuY2VvZiBSZWN0KXtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGhpY1JlbmRlcmVyLnJlbmRlclJlY3QoPFJlY3Q+Z3JhcGhpYywgdGhpcy56b29tKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEBvdmVycmlkZVxuICAgIHByb3RlY3RlZCByZW5kZXJUaWxlbWFwKHRpbGVtYXA6IFRpbGVtYXApOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aWxlbWFwUmVuZGVyZXIucmVuZGVyVGlsZW1hcCh0aWxlbWFwKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gQG92ZXJyaWRlXG4gICAgcHJvdGVjdGVkIHJlbmRlclVJRWxlbWVudCh1aUVsZW1lbnQ6IFVJRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZih1aUVsZW1lbnQgaW5zdGFuY2VvZiBMYWJlbCl7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudFJlbmRlcmVyLnJlbmRlckxhYmVsKHVpRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZih1aUVsZW1lbnQgaW5zdGFuY2VvZiBCdXR0b24pe1xuICAgICAgICAgICAgdGhpcy51aUVsZW1lbnRSZW5kZXJlci5yZW5kZXJCdXR0b24odWlFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmKHVpRWxlbWVudCBpbnN0YW5jZW9mIFNsaWRlcil7XG4gICAgICAgICAgICB0aGlzLnVpRWxlbWVudFJlbmRlcmVyLnJlbmRlclNsaWRlcih1aUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYodWlFbGVtZW50IGluc3RhbmNlb2YgVGV4dElucHV0KXtcbiAgICAgICAgICAgIHRoaXMudWlFbGVtZW50UmVuZGVyZXIucmVuZGVyVGV4dElucHV0KHVpRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcihjbGVhckNvbG9yOiBDb2xvcik6IHZvaWQge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53b3JsZFNpemUueCwgdGhpcy53b3JsZFNpemUueSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNsZWFyQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53b3JsZFNpemUueCwgdGhpcy53b3JsZFNpemUueSk7XG4gICAgfVxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IExpbmUgZnJvbSBcIi4uLy4uL05vZGVzL0dyYXBoaWNzL0xpbmVcIjtcbmltcG9ydCBQb2ludCBmcm9tIFwiLi4vLi4vTm9kZXMvR3JhcGhpY3MvUG9pbnRcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuLi8uLi9Ob2Rlcy9HcmFwaGljcy9SZWN0XCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4uLy4uL1NjZW5lL1NjZW5lXCI7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNsYXNzIHRvIGhlbHAgdGhlIEByZWZlcmVuY2VbQ2FudmFzUmVuZGVyZXJdIHJlbmRlciBAcmVmZXJlbmNlW0dyYXBoaWNdc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljUmVuZGVyZXIge1xuICAgIC8qKiBUaGUgcmVzb3VyY2UgbWFuYWdlciBvZiB0aGUgZ2FtZSBlbmdpbmUgKi9cbiAgICBwcm90ZWN0ZWQgcmVzb3VyY2VNYW5hZ2VyOiBSZXNvdXJjZU1hbmFnZXI7XG4gICAgLyoqIFRoZSBjdXJyZW50IHNjZW5lICovXG4gICAgcHJvdGVjdGVkIHNjZW5lOiBTY2VuZTtcbiAgICAvKiogVGhlIHJlbmRlcmluZyBjb250ZXh0ICovXG4gICAgcHJvdGVjdGVkIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgICAgICB0aGlzLnJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzY2VuZSBvZiB0aGlzIEdyYXBoaWNSZW5kZXJlclxuICAgICAqIEBwYXJhbSBzY2VuZSBUaGUgY3VycmVudCBzY2VuZVxuICAgICAqL1xuICAgIHNldFNjZW5lKHNjZW5lOiBTY2VuZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHBvaW50XG4gICAgICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0gem9vbSBUaGUgem9vbSBsZXZlbFxuICAgICAqL1xuICAgIHJlbmRlclBvaW50KHBvaW50OiBQb2ludCwgem9vbTogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gcG9pbnQuY29sb3IudG9TdHJpbmdSR0JBKCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KCgtcG9pbnQuc2l6ZS54LzIpKnpvb20sICgtcG9pbnQuc2l6ZS55LzIpKnpvb20sXG4gICAgICAgIHBvaW50LnNpemUueCp6b29tLCBwb2ludC5zaXplLnkqem9vbSk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGluZShsaW5lOiBMaW5lLCBvcmlnaW46IFZlYzIsIHpvb206IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGxpbmUuY29sb3IudG9TdHJpbmdSR0JBKCk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IGxpbmUudGhpY2tuZXNzO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIDApO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oKGxpbmUuZW5kLnggLSBsaW5lLnN0YXJ0LngpKnpvb20sIChsaW5lLmVuZC55IC0gbGluZS5zdGFydC55KSp6b29tKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSByZWN0XG4gICAgICogQHBhcmFtIHJlY3QgVGhlIHJlY3QgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHpvb20gVGhlIHpvb20gbGV2ZWxcbiAgICAgKi9cbiAgICByZW5kZXJSZWN0KHJlY3Q6IFJlY3QsIHpvb206IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBEcmF3IHRoZSBpbnRlcmlvciBvZiB0aGUgcmVjdFxuICAgICAgICBpZihyZWN0LmNvbG9yLmEgIT09IDApe1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcmVjdC5jb2xvci50b1N0cmluZ1JHQigpO1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoKC1yZWN0LnNpemUueC8yKSp6b29tLCAoLXJlY3Quc2l6ZS55LzIpKnpvb20sIHJlY3Quc2l6ZS54Knpvb20sIHJlY3Quc2l6ZS55Knpvb20pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRHJhdyB0aGUgYm9yZGVyIG9mIHRoZSByZWN0IGlmIGl0IGlzbid0IHRyYW5zcGFyZW50XG4gICAgICAgIGlmKHJlY3QuYm9yZGVyQ29sb3IuYSAhPT0gMCl7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHJlY3QuZ2V0Qm9yZGVyQ29sb3IoKS50b1N0cmluZ1JHQigpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gcmVjdC5nZXRCb3JkZXJXaWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCgoLXJlY3Quc2l6ZS54LzIpKnpvb20sICgtcmVjdC5zaXplLnkvMikqem9vbSwgcmVjdC5zaXplLngqem9vbSwgcmVjdC5zaXplLnkqem9vbSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi8uLi9TY2VuZS9TY2VuZVwiO1xuaW1wb3J0IE9ydGhvZ29uYWxUaWxlbWFwIGZyb20gXCIuLi8uLi9Ob2Rlcy9UaWxlbWFwcy9PcnRob2dvbmFsVGlsZW1hcFwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uLy4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgVGlsZXNldCBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1RpbGVzZXRzL1RpbGVzZXRcIjtcbmltcG9ydCBUaWxlbWFwIGZyb20gXCIuLi8uLi9Ob2Rlcy9UaWxlbWFwXCI7XG5pbXBvcnQgSXNvbWV0cmljVGlsZW1hcCBmcm9tIFwiLi4vLi4vTm9kZXMvVGlsZW1hcHMvSXNvbWV0cmljVGlsZW1hcFwiO1xuaW1wb3J0IFN0YWdnZXJlZElzb21ldHJpY1RpbGVtYXAgZnJvbSBcIi4uLy4uL05vZGVzL1RpbGVtYXBzL1N0YWdnZXJlZElzb21ldHJpY1RpbGVtYXBcIjtcblxuLyoqXG4gKiBBIHV0aWxpdHkgY2xhc3MgZm9yIHRoZSBAcmVmZXJlbmNlW0NhbnZhc1JlbmRlcmVyXSB0byByZW5kZXIgQHJlZmVyZW5jZVtUaWxlbWFwXXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZW1hcFJlbmRlcmVyIHtcbiAgICBwcm90ZWN0ZWQgcmVzb3VyY2VNYW5hZ2VyOiBSZXNvdXJjZU1hbmFnZXI7XG4gICAgcHJvdGVjdGVkIHNjZW5lOiBTY2VuZTtcbiAgICBwcm90ZWN0ZWQgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBjb25zdHJ1Y3RvcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgICAgIHRoaXMucmVzb3VyY2VNYW5hZ2VyID0gUmVzb3VyY2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNjZW5lIG9mIHRoaXMgVGlsZW1hcFJlbmRlcmVyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBjdXJyZW50IHNjZW5lXG4gICAgICovXG4gICAgc2V0U2NlbmUoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFuIG9ydGhvZ29uYWwgdGlsZW1hcFxuICAgICAqIEBwYXJhbSB0aWxlbWFwIFRoZSB0aWxlbWFwIHRvIHJlbmRlclxuICAgICAqL1xuICAgIHJlbmRlclRpbGVtYXAodGlsZW1hcDogVGlsZW1hcCk6IHZvaWQge1xuICAgICAgICBsZXQgcHJldmlvdXNBbHBoYSA9IHRoaXMuY3R4Lmdsb2JhbEFscGhhO1xuICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHRpbGVtYXAuZ2V0TGF5ZXIoKS5nZXRBbHBoYSgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG9yaWdpbiA9IHRoaXMuc2NlbmUuZ2V0Vmlld1RyYW5zbGF0aW9uKHRpbGVtYXApO1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuc2NlbmUuZ2V0Vmlld3BvcnQoKS5nZXRIYWxmU2l6ZSgpO1xuICAgICAgICBsZXQgem9vbSA9IHRoaXMuc2NlbmUuZ2V0Vmlld1NjYWxlKCk7XG4gICAgICAgIGxldCBib3R0b21SaWdodCA9IG9yaWdpbi5jbG9uZSgpLmFkZChzaXplLnNjYWxlZCgyKnpvb20pKTtcblxuICAgICAgICBpZih0aWxlbWFwLnZpc2libGUpe1xuICAgICAgICAgICAgbGV0IG1pbkNvbFJvdyA9IHRpbGVtYXAuZ2V0TWluQ29sUm93KHRoaXMuc2NlbmUuZ2V0Vmlld3BvcnQoKS5nZXRWaWV3KCkpO1xuICAgICAgICAgICAgbGV0IG1heENvbFJvdyA9IHRpbGVtYXAuZ2V0TWF4Q29sUm93KHRoaXMuc2NlbmUuZ2V0Vmlld3BvcnQoKS5nZXRWaWV3KCkpO1xuICAgICAgICAgICAgZm9yKGxldCByb3cgPSBtaW5Db2xSb3cueTsgcm93IDw9IG1heENvbFJvdy55OyByb3crKyl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBjb2wgPSBtaW5Db2xSb3cueDsgY29sIDw9IG1heENvbFJvdy54OyBjb2wrKyl7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdGlsZSBhdCB0aGlzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGlsZW1hcC5nZXRUaWxlKGNvbCwgcm93KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IHRoZSByb3QvZmxpcCBwYXJhbWV0ZXJzIGlmIHRoZXJlIGFyZSBhbnlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFzayA9ICgweEUgPDwgMjgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RGbGlwID0gKChtYXNrICYgdGlsZSkgPj4gMjgpICYgMHhGO1xuICAgICAgICAgICAgICAgICAgICB0aWxlID0gdGlsZSAmIH5tYXNrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIHRpbGVzZXQgdGhhdCBvd25zIHRoaXMgdGlsZSBpbmRleCBhbmQgcmVuZGVyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdGlsZXNldCBvZiB0aWxlbWFwLmdldFRpbGVzZXRzKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGlsZXNldC5oYXNUaWxlKHRpbGUpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRpbGUodGlsZW1hcCwgdGlsZXNldCwgdGlsZSwgY29sLCByb3csIG9yaWdpbiwgdGlsZW1hcC5zY2FsZSwgem9vbSwgcm90RmxpcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHByZXZpb3VzQWxwaGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHRpbGVcbiAgICAgKiBAcGFyYW0gdGlsZXNldCBUaGUgdGlsZXNldCB0aGlzIHRpbGUgYmVsb25ncyB0byBcbiAgICAgKiBAcGFyYW0gdGlsZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgdGlsZVxuICAgICAqIEBwYXJhbSB0aWxlbWFwUm93IFRoZSByb3cgb2YgdGhlIHRpbGUgaW4gdGhlIHRpbGVtYXBcbiAgICAgKiBAcGFyYW0gdGlsZW1hcENvbCBUaGUgY29sdW1uIG9mIHRoZSB0aWxlIGluIHRoZSB0aWxlbWFwXG4gICAgICogQHBhcmFtIG9yaWdpbiBUaGUgb3JpZ2luIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSBzY2FsZSBUaGUgc2NhbGUgb2YgdGhlIHRpbGVtYXBcbiAgICAgKiBAcGFyYW0gem9vbSBUaGUgem9vbSBsZXZlbCBvZiB0aGUgdmlld3BvcnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVuZGVyVGlsZSh0aWxlbWFwOiBUaWxlbWFwLCB0aWxlc2V0OiBUaWxlc2V0LCB0aWxlSW5kZXg6IG51bWJlciwgdGlsZW1hcENvbDogbnVtYmVyLCB0aWxlbWFwUm93OiBudW1iZXIsIG9yaWdpbjogVmVjMiwgc2NhbGU6IFZlYzIsIHpvb206IG51bWJlciwgcm90RmxpcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBpbWFnZSA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldEltYWdlKHRpbGVzZXQuZ2V0SW1hZ2VLZXkoKSk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBzaXplIG9mIHRoZSB0aWxlIHRvIHJlbmRlclxuICAgICAgICBsZXQgdGlsZVNpemUgPSB0aWxlc2V0LmdldFRpbGVTaXplKCk7XG4gICAgICAgIGxldCB3aWR0aCA9IHRpbGVTaXplLng7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aWxlU2l6ZS55O1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gdG8gc3RhcnQgYSBjcm9wIGluIHRoZSB0aWxlc2V0IGltYWdlXG4gICAgICAgIGxldCBpbWFnZVBvc2l0aW9uID0gdGlsZXNldC5nZXRJbWFnZU9mZnNldEZvclRpbGUodGlsZUluZGV4KTtcbiAgICAgICAgbGV0IGxlZnQgPSBpbWFnZVBvc2l0aW9uLnhcbiAgICAgICAgbGV0IHRvcCA9IGltYWdlUG9zaXRpb24ueTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIGluIHRoZSB3b3JsZCB0byByZW5kZXIgdGhlIHRpbGVcbiAgICAgICAgbGV0IHdvcmxkUG9zaXRpb24gPSB0aWxlbWFwLmdldFdvcmxkUG9zaXRpb24odGlsZW1hcENvbCwgdGlsZW1hcFJvdyk7XG5cbiAgICAgICAgbGV0IHdvcmxkWCA9IE1hdGguZmxvb3IoKHdvcmxkUG9zaXRpb24ueCAtIG9yaWdpbi54KSp6b29tKTtcbiAgICAgICAgbGV0IHdvcmxkWSA9IE1hdGguZmxvb3IoKHdvcmxkUG9zaXRpb24ueSAtIG9yaWdpbi55KSp6b29tKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNpemUgb2YgdGhlIHdvcmxkIHRvIHJlbmRlciB0aGUgdGlsZSBpblxuICAgICAgICBsZXQgd29ybGRXaWR0aCA9IE1hdGguY2VpbCh3aWR0aCAqIHNjYWxlLnggKiB6b29tKTtcbiAgICAgICAgbGV0IHdvcmxkSGVpZ2h0ID0gTWF0aC5jZWlsKGhlaWdodCAqIHNjYWxlLnkgKiB6b29tKTtcblxuICAgICAgICBpZihyb3RGbGlwICE9PSAwKXtcbiAgICAgICAgICAgIGxldCBzY2FsZVggPSAxO1xuICAgICAgICAgICAgbGV0IHNjYWxlWSA9IDE7XG4gICAgICAgICAgICBsZXQgc2hlYXJYID0gMDtcbiAgICAgICAgICAgIGxldCBzaGVhclkgPSAwO1xuXG4gICAgICAgICAgICAvLyBGbGlwIG9uIHRoZSB4LWF4aXNcbiAgICAgICAgICAgIGlmKHJvdEZsaXAgJiA4KXtcbiAgICAgICAgICAgICAgICBzY2FsZVggPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmxpcCBvbiB0aGUgeS1heGlzXG4gICAgICAgICAgICBpZihyb3RGbGlwICYgNCl7XG4gICAgICAgICAgICAgICAgc2NhbGVZID0gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZsaXAgb3ZlciB0aGUgbGluZSB5PXhcbiAgICAgICAgICAgIGlmKHJvdEZsaXAgJiAyKXtcbiAgICAgICAgICAgICAgICBzaGVhclggPSBzY2FsZVk7XG4gICAgICAgICAgICAgICAgc2hlYXJZID0gc2NhbGVYO1xuICAgICAgICAgICAgICAgIHNjYWxlWCA9IDA7XG4gICAgICAgICAgICAgICAgc2NhbGVZID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKHNjYWxlWCwgc2hlYXJYLCBzaGVhclksIHNjYWxlWSwgd29ybGRYICsgd29ybGRXaWR0aC8yLCB3b3JsZFkgKyB3b3JsZEhlaWdodC8yKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBSZW5kZXIgdGhlIHRpbGVcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSxcbiAgICAgICAgICAgICAgICBsZWZ0LCB0b3AsXG4gICAgICAgICAgICAgICAgd2lkdGgsIGhlaWdodCxcbiAgICAgICAgICAgICAgICAtd29ybGRXaWR0aC8yLCAtd29ybGRIZWlnaHQvMixcbiAgICAgICAgICAgICAgICB3b3JsZFdpZHRoLCB3b3JsZEhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmKHJvdEZsaXAgIT09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIHJvdGF0aW9ucywgZG9uJ3QgZG8gdGhlIGNhbGN1bGF0aW9ucywganVzdCByZW5kZXIgdGhlIHRpbGVcbiAgICAgICAgICAgIC8vIFJlbmRlciB0aGUgdGlsZVxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLFxuICAgICAgICAgICAgICAgIGxlZnQsIHRvcCxcbiAgICAgICAgICAgICAgICB3aWR0aCwgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdvcmxkWCwgd29ybGRZLFxuICAgICAgICAgICAgICAgIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGdldE9ydGhvZ29uYWxUaWxlRHJhd1BvcyhtYXA6IE9ydGhvZ29uYWxUaWxlbWFwLCBzZXQ6IFRpbGVzZXQsIGNvbDogbnVtYmVyLCByb3c6IG51bWJlcik6IFZlYzIge1xuICAgICAgICBsZXQgaW1nc2l6ZTogVmVjMiA9IHNldC5nZXRUaWxlU2l6ZSgpLm11bHQobWFwLnNjYWxlKTtcbiAgICAgICAgbGV0IG1hcHNpemU6IFZlYzIgPSBtYXAuZ2V0U2NhbGVkVGlsZVNpemUoKTtcbiAgICAgICAgcmV0dXJuIG1hcC5nZXRXb3JsZFBvc2l0aW9uKGNvbCwgcm93KS5zdWIoaW1nc2l6ZS5zdWIobWFwc2l6ZSkpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0SXNvbWV0cmljVGlsZURyYXdQb3MobWFwOiBUaWxlbWFwLCBzZXQ6IFRpbGVzZXQsIGNvbDogbnVtYmVyLCByb3c6IG51bWJlcik6IFZlYzIge1xuICAgICAgICBsZXQgc2l6ZTogVmVjMiA9IHNldC5nZXRUaWxlU2l6ZSgpO1xuICAgICAgICBsZXQgZHJhd1BvczogVmVjMiA9IG1hcC5nZXRTY2FsZWRUaWxlU2l6ZSgpLnN1YihuZXcgVmVjMihzaXplLngqbWFwLnNjYWxlLngsIHNpemUueSptYXAuc2NhbGUueSkpO1xuICAgICAgICBkcmF3UG9zLmluYygtc2l6ZS54Km1hcC5zY2FsZS54LzIsIDApO1xuICAgICAgICBkcmF3UG9zLmFkZChtYXAuZ2V0V29ybGRQb3NpdGlvbihjb2wsIHJvdykpO1xuICAgICAgICByZXR1cm4gZHJhd1BvcztcbiAgICB9XG59IiwiaW1wb3J0IFZlYzIgZnJvbSBcIi4uLy4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLi8uLi9Ob2Rlcy9VSUVsZW1lbnRzL0J1dHRvblwiO1xuaW1wb3J0IExhYmVsIGZyb20gXCIuLi8uLi9Ob2Rlcy9VSUVsZW1lbnRzL0xhYmVsXCI7XG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi8uLi9Ob2Rlcy9VSUVsZW1lbnRzL1NsaWRlclwiO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tIFwiLi4vLi4vTm9kZXMvVUlFbGVtZW50cy9UZXh0SW5wdXRcIjtcbmltcG9ydCBSZXNvdXJjZU1hbmFnZXIgZnJvbSBcIi4uLy4uL1Jlc291cmNlTWFuYWdlci9SZXNvdXJjZU1hbmFnZXJcIjtcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vLi4vU2NlbmUvU2NlbmVcIjtcbmltcG9ydCBNYXRoVXRpbHMgZnJvbSBcIi4uLy4uL1V0aWxzL01hdGhVdGlsc1wiO1xuXG4vKipcbiAqIEEgdXRpbGl0eSBjbGFzcyB0byBoZWxwIHRoZSBAcmVmZXJlbmNlW0NhbnZhc1JlbmRlcmVyXSByZW5kZXIgQHJlZmVyZW5jZVtVSUVsZW1lbnRdc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUVsZW1lbnRSZW5kZXJlciB7XG4gICAgcHJvdGVjdGVkIHJlc291cmNlTWFuYWdlcjogUmVzb3VyY2VNYW5hZ2VyO1xuICAgIHByb3RlY3RlZCBzY2VuZTogU2NlbmU7XG4gICAgcHJvdGVjdGVkIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgICAgICB0aGlzLnJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzY2VuZSBvZiB0aGlzIFVJRWxlbWVudFJlbmRlcmVyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBjdXJyZW50IHNjZW5lXG4gICAgICovXG4gICAgc2V0U2NlbmUoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgbGFiZWxcbiAgICAgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIHRvIHJlbmRlclxuICAgICAqL1xuICAgIHJlbmRlckxhYmVsKGxhYmVsOiBMYWJlbCk6IHZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgc2l6ZSBpcyB1bmFzc2lnbmVkIChieSB0aGUgdXNlciBvciBhdXRvbWF0aWNhbGx5KSBhc3NpZ24gaXRcbiAgICAgICAgbGFiZWwuaGFuZGxlSW5pdGlhbFNpemluZyh0aGlzLmN0eCk7XG5cdFx0XG5cdFx0Ly8gR3JhYiB0aGUgZ2xvYmFsIGFscGhhIHNvIHdlIGNhbiBhZGp1c3QgaXQgZm9yIHRoaXMgcmVuZGVyXG5cdFx0bGV0IHByZXZpb3VzQWxwaGEgPSB0aGlzLmN0eC5nbG9iYWxBbHBoYTtcblxuICAgICAgICAvLyBHZXQgdGhlIGZvbnQgYW5kIHRleHQgcG9zaXRpb24gaW4gbGFiZWxcblx0XHR0aGlzLmN0eC5mb250ID0gbGFiZWwuZ2V0Rm9udFN0cmluZygpO1xuXHRcdGxldCBvZmZzZXQgPSBsYWJlbC5jYWxjdWxhdGVUZXh0T2Zmc2V0KHRoaXMuY3R4KTtcblxuXHRcdC8vIFN0cm9rZSBhbmQgZmlsbCBhIHJvdW5kZWQgcmVjdCBhbmQgZ2l2ZSBpdCB0ZXh0XG5cdFx0dGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBsYWJlbC5iYWNrZ3JvdW5kQ29sb3IuYTtcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBsYWJlbC5jYWxjdWxhdGVCYWNrZ3JvdW5kQ29sb3IoKS50b1N0cmluZ1JHQkEoKTtcblx0XHR0aGlzLmN0eC5maWxsUm91bmRlZFJlY3QoLWxhYmVsLnNpemUueC8yLCAtbGFiZWwuc2l6ZS55LzIsXG5cdFx0XHRsYWJlbC5zaXplLngsIGxhYmVsLnNpemUueSwgbGFiZWwuYm9yZGVyUmFkaXVzKTtcblx0XHRcblx0XHR0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGxhYmVsLmNhbGN1bGF0ZUJvcmRlckNvbG9yKCkudG9TdHJpbmdSR0JBKCk7XG5cdFx0dGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBsYWJlbC5ib3JkZXJDb2xvci5hO1xuXHRcdHRoaXMuY3R4LmxpbmVXaWR0aCA9IGxhYmVsLmJvcmRlcldpZHRoO1xuXHRcdHRoaXMuY3R4LnN0cm9rZVJvdW5kZWRSZWN0KC1sYWJlbC5zaXplLngvMiwgLWxhYmVsLnNpemUueS8yLFxuXHRcdFx0bGFiZWwuc2l6ZS54LCBsYWJlbC5zaXplLnksIGxhYmVsLmJvcmRlclJhZGl1cyk7XG5cblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBsYWJlbC5jYWxjdWxhdGVUZXh0Q29sb3IoKTtcblx0XHR0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IGxhYmVsLnRleHRDb2xvci5hO1xuXHRcdHRoaXMuY3R4LmZpbGxUZXh0KGxhYmVsLnRleHQsIG9mZnNldC54IC0gbGFiZWwuc2l6ZS54LzIsIG9mZnNldC55IC0gbGFiZWwuc2l6ZS55LzIpO1xuXHRcblx0XHR0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHByZXZpb3VzQWxwaGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGJ1dHRvblxuICAgICAqIEBwYXJhbSBidXR0b24gVGhlIGJ1dHRvbiB0byByZW5kZXJcbiAgICAgKi9cbiAgICByZW5kZXJCdXR0b24oYnV0dG9uOiBCdXR0b24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJMYWJlbChidXR0b24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBzbGlkZXJcbiAgICAgKiBAcGFyYW0gc2xpZGVyIFRoZSBzbGlkZXIgdG8gcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyU2xpZGVyKHNsaWRlcjogU2xpZGVyKTogdm9pZCB7XG5cdFx0Ly8gR3JhYiB0aGUgZ2xvYmFsIGFscGhhIHNvIHdlIGNhbiBhZGp1c3QgaXQgZm9yIHRoaXMgcmVuZGVyXG5cdFx0bGV0IHByZXZpb3VzQWxwaGEgPSB0aGlzLmN0eC5nbG9iYWxBbHBoYTtcblx0XHR0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHNsaWRlci5nZXRMYXllcigpLmdldEFscGhhKCk7XG5cbiAgICAgICAgLy8gQ2FsY3VhbGF0ZSB0aGUgc2xpZGVyIHNpemVcbiAgICAgICAgbGV0IHNsaWRlclNpemUgPSBuZXcgVmVjMihzbGlkZXIuc2l6ZS54LCAyKTtcblxuICAgICAgICAvLyBEcmF3IHRoZSBzbGlkZXJcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBzbGlkZXIuc2xpZGVyQ29sb3IudG9TdHJpbmcoKTtcblx0XHR0aGlzLmN0eC5maWxsUm91bmRlZFJlY3QoLXNsaWRlclNpemUueC8yLCAtc2xpZGVyU2l6ZS55LzIsXG4gICAgICAgICAgICBzbGlkZXJTaXplLngsIHNsaWRlclNpemUueSwgc2xpZGVyLmJvcmRlclJhZGl1cyk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBuaWIgc2l6ZSBhbmQgcG9zaXRpb25cbiAgICAgICAgbGV0IHggPSBNYXRoVXRpbHMubGVycCgtc2xpZGVyLnNpemUueC8yLCBzbGlkZXIuc2l6ZS54LzIsIHNsaWRlci5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAvLyBEcmF3IHRoZSBuaWJcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBzbGlkZXIubmliQ29sb3IudG9TdHJpbmcoKTtcblx0XHR0aGlzLmN0eC5maWxsUm91bmRlZFJlY3QoeC1zbGlkZXIubmliU2l6ZS54LzIsIC1zbGlkZXIubmliU2l6ZS55LzIsXG4gICAgICAgICAgICBzbGlkZXIubmliU2l6ZS54LCBzbGlkZXIubmliU2l6ZS55LCBzbGlkZXIuYm9yZGVyUmFkaXVzKTtcblxuICAgICAgICAvLyBSZXNldCB0aGUgYWxwaGFcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSBwcmV2aW91c0FscGhhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSB0ZXh0SW5wdXRcbiAgICAgKiBAcGFyYW0gdGV4dElucHV0IFRoZSB0ZXh0SW5wdXQgdG8gcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyVGV4dElucHV0KHRleHRJbnB1dDogVGV4dElucHV0KTogdm9pZCB7XG4gICAgICAgIC8vIFNob3cgYSBjdXJzb3Igc29tZXRpbWVzXG4gICAgICAgIGlmKHRleHRJbnB1dC5mb2N1c2VkICYmIHRleHRJbnB1dC5jdXJzb3JDb3VudGVyICUgNjAgPiAzMCl7XG4gICAgICAgICAgICB0ZXh0SW5wdXQudGV4dCArPSBcInxcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyTGFiZWwodGV4dElucHV0KTtcblxuICAgICAgICBpZih0ZXh0SW5wdXQuZm9jdXNlZCl7XG4gICAgICAgICAgICBpZih0ZXh0SW5wdXQuY3Vyc29yQ291bnRlciAlIDYwID4gMzApe1xuICAgICAgICAgICAgICAgIHRleHRJbnB1dC50ZXh0ID0gdGV4dElucHV0LnRleHQuc3Vic3RyaW5nKDAsIHRleHRJbnB1dC50ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0SW5wdXQuY3Vyc29yQ291bnRlciArPSAxO1xuICAgICAgICAgICAgaWYodGV4dElucHV0LmN1cnNvckNvdW50ZXIgPj0gNjApe1xuICAgICAgICAgICAgICAgIHRleHRJbnB1dC5jdXJzb3JDb3VudGVyID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBDYW52YXNOb2RlIGZyb20gXCIuLi9Ob2Rlcy9DYW52YXNOb2RlXCI7XG5pbXBvcnQgR3JhcGhpYyBmcm9tIFwiLi4vTm9kZXMvR3JhcGhpY1wiO1xuaW1wb3J0IEFuaW1hdGVkU3ByaXRlIGZyb20gXCIuLi9Ob2Rlcy9TcHJpdGVzL0FuaW1hdGVkU3ByaXRlXCI7XG5pbXBvcnQgU3ByaXRlIGZyb20gXCIuLi9Ob2Rlcy9TcHJpdGVzL1Nwcml0ZVwiO1xuaW1wb3J0IFRpbGVtYXAgZnJvbSBcIi4uL05vZGVzL1RpbGVtYXBcIjtcbmltcG9ydCBVSUVsZW1lbnQgZnJvbSBcIi4uL05vZGVzL1VJRWxlbWVudFwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IFVJTGF5ZXIgZnJvbSBcIi4uL1NjZW5lL0xheWVycy9VSUxheWVyXCI7XG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4uL1NjZW5lL1NjZW5lXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4uL1V0aWxzL0NvbG9yXCI7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgZnJhbWV3b3JrIHRvIHB1dCBhbGwgcmVuZGVyaW5nIGluIG9uY2UgcGxhY2UgaW4gdGhlIGFwcGxpY2F0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmluZ01hbmFnZXIge1xuICAgIC8qKiBUaGUgUmVzb3VyY2VNYW5hZ2VyICovXG4gICAgcHJvdGVjdGVkIHJlc291cmNlTWFuYWdlcjogUmVzb3VyY2VNYW5hZ2VyO1xuXG4gICAgLyoqIFRoZSBzY2VuZSBjdXJyZW50bHkgYmVpbmcgcmVuZGVyZWQgKi9cbiAgICBwcm90ZWN0ZWQgc2NlbmU6IFNjZW5lO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5yZXNvdXJjZU1hbmFnZXIgPSBSZXNvdXJjZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzY2VuZSBjdXJyZW50bHkgYmVpbmcgcmVuZGVyZWRcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIGN1cnJlbnQgU2NlbmVcbiAgICAgKi9cbiAgICBzZXRTY2VuZShzY2VuZTogU2NlbmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGNhbnZhcyBmb3IgdGhlIGdhbWVcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgZGVzaXJlZCB3aWR0aCBvZiB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgZGVzaXJlZCBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICAgICAqIEByZXR1cm5zIFRoZSByZW5kZXJpbmcgY29udGV4dCBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgYWJzdHJhY3QgaW5pdGlhbGl6ZUNhbnZhcyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgdGhlIHZpc2libGUgc2V0IG9mIENhbnZhc05vZGVzIGFuZCB2aXNpYmxlIHBvcnRpb25zIG9mIHRpbGVtYXBzLCBhcyB3ZWxsIGFzIGFueSBVSUVsZW1lbnQgaW4gVUlMYXllcnNcbiAgICAgKiBAcGFyYW0gdmlzaWJsZVNldCBUaGUgdmlzaWJsZSBzZXQgb2YgQ2FudmFzTm9kZXNcbiAgICAgKiBAcGFyYW0gdGlsZW1hcHMgVGhlIHRpbGVtYXBzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uXG4gICAgICogQHBhcmFtIHVpTGF5ZXJzIFRoZSB1c2VyIGludGVyZmFjZSBsYXllcnNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZW5kZXIodmlzaWJsZVNldDogQXJyYXk8Q2FudmFzTm9kZT4sIHRpbGVtYXBzOiBBcnJheTxUaWxlbWFwPiwgdWlMYXllcnM6IE1hcDxVSUxheWVyPik6IHZvaWQ7XG5cbiAgICAvKiogQ2xlYXJzIHRoZSBjYW52YXMgKi9cbiAgICBhYnN0cmFjdCBjbGVhcihjb2xvcjogQ29sb3IpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIHNwcml0ZVxuICAgICAqIEBwYXJhbSBzcHJpdGUgVGhlIHNwcml0ZSB0byByZW5kZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVuZGVyU3ByaXRlKHNwcml0ZTogU3ByaXRlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYW4gYW5pbWF0ZWQgc3ByaXRlXG4gICAgICogQHBhcmFtIHNwcml0ZSBUaGUgYW5pbWF0ZWQgc3ByaXRlIHRvIHJlbmRlclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW5kZXJBbmltYXRlZFNwcml0ZShzcHJpdGU6IEFuaW1hdGVkU3ByaXRlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBncmFwaGljXG4gICAgICogQHBhcmFtIGdyYXBoaWMgVGhlIGdyYXBoaWMgdG8gcmVuZGVyXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbmRlckdyYXBoaWMoZ3JhcGhpYzogR3JhcGhpYyk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgdGlsZW1hcFxuICAgICAqIEBwYXJhbSB0aWxlbWFwIFRoZSB0aWxlbWFwIHRvIHJlbmRlclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW5kZXJUaWxlbWFwKHRpbGVtYXA6IFRpbGVtYXApOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgVUlFbGVtZW50XG4gICAgICogQHBhcmFtIHVpRWxlbWVudCBUaGUgVUlFbGVtZW50IHRvIHJlbmRlclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW5kZXJVSUVsZW1lbnQodWlFbGVtZW50OiBVSUVsZW1lbnQpOiB2b2lkO1xufSIsImltcG9ydCBHcmFwaCBmcm9tIFwiLi4vRGF0YVR5cGVzL0dyYXBocy9HcmFwaFwiO1xuaW1wb3J0IE1hcCBmcm9tIFwiLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL01hcFwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgQ2FudmFzTm9kZSBmcm9tIFwiLi4vTm9kZXMvQ2FudmFzTm9kZVwiO1xuaW1wb3J0IEdyYXBoaWMgZnJvbSBcIi4uL05vZGVzL0dyYXBoaWNcIjtcbmltcG9ydCB7IEdyYXBoaWNUeXBlIH0gZnJvbSBcIi4uL05vZGVzL0dyYXBoaWNzL0dyYXBoaWNUeXBlc1wiO1xuaW1wb3J0IFBvaW50IGZyb20gXCIuLi9Ob2Rlcy9HcmFwaGljcy9Qb2ludFwiO1xuaW1wb3J0IFJlY3QgZnJvbSBcIi4uL05vZGVzL0dyYXBoaWNzL1JlY3RcIjtcbmltcG9ydCBBbmltYXRlZFNwcml0ZSBmcm9tIFwiLi4vTm9kZXMvU3ByaXRlcy9BbmltYXRlZFNwcml0ZVwiO1xuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi4vTm9kZXMvU3ByaXRlcy9TcHJpdGVcIjtcbmltcG9ydCBUaWxlbWFwIGZyb20gXCIuLi9Ob2Rlcy9UaWxlbWFwXCI7XG5pbXBvcnQgVUlFbGVtZW50IGZyb20gXCIuLi9Ob2Rlcy9VSUVsZW1lbnRcIjtcbmltcG9ydCBMYWJlbCBmcm9tIFwiLi4vTm9kZXMvVUlFbGVtZW50cy9MYWJlbFwiO1xuaW1wb3J0IFNoYWRlclJlZ2lzdHJ5IGZyb20gXCIuLi9SZWdpc3RyeS9SZWdpc3RyaWVzL1NoYWRlclJlZ2lzdHJ5XCI7XG5pbXBvcnQgUmVnaXN0cnlNYW5hZ2VyIGZyb20gXCIuLi9SZWdpc3RyeS9SZWdpc3RyeU1hbmFnZXJcIjtcbmltcG9ydCBSZXNvdXJjZU1hbmFnZXIgZnJvbSBcIi4uL1Jlc291cmNlTWFuYWdlci9SZXNvdXJjZU1hbmFnZXJcIjtcbmltcG9ydCBQYXJhbGxheExheWVyIGZyb20gXCIuLi9TY2VuZS9MYXllcnMvUGFyYWxsYXhMYXllclwiO1xuaW1wb3J0IFVJTGF5ZXIgZnJvbSBcIi4uL1NjZW5lL0xheWVycy9VSUxheWVyXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4uL1V0aWxzL0NvbG9yXCI7XG5pbXBvcnQgUmVuZGVyaW5nVXRpbHMgZnJvbSBcIi4uL1V0aWxzL1JlbmRlcmluZ1V0aWxzXCI7XG5pbXBvcnQgUmVuZGVyaW5nTWFuYWdlciBmcm9tIFwiLi9SZW5kZXJpbmdNYW5hZ2VyXCI7XG5pbXBvcnQgU2hhZGVyVHlwZSBmcm9tIFwiLi9XZWJHTFJlbmRlcmluZy9TaGFkZXJUeXBlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJpbmdNYW5hZ2VyIHtcblxuXHRwcm90ZWN0ZWQgb3JpZ2luOiBWZWMyO1xuXHRwcm90ZWN0ZWQgem9vbTogbnVtYmVyO1xuXHRwcm90ZWN0ZWQgd29ybGRTaXplOiBWZWMyO1xuXG5cdHByb3RlY3RlZCBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuXHRwcm90ZWN0ZWQgdGV4dEN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5cdGluaXRpYWxpemVDYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQge1xuXHRcdGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0dGhpcy53b3JsZFNpemUgPSBWZWMyLlpFUk87XG5cdFx0dGhpcy53b3JsZFNpemUueCA9IHdpZHRoO1xuXHRcdHRoaXMud29ybGRTaXplLnkgPSBoZWlnaHQ7XG5cblx0XHQvLyBHZXQgdGhlIFdlYkdMIGNvbnRleHRcbiAgICAgICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIik7XG5cblx0XHR0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cblx0XHR0aGlzLmdsLmRpc2FibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcbiAgICAgICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5CTEVORCk7XG4gICAgICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkNVTExfRkFDRSk7XG5cblx0XHQvLyBUZWxsIHRoZSByZXNvdXJjZSBtYW5hZ2VyIHdlJ3JlIHVzaW5nIFdlYkdMXG5cdFx0UmVzb3VyY2VNYW5hZ2VyLmdldEluc3RhbmNlKCkudXNlV2ViR0wodHJ1ZSwgdGhpcy5nbCk7XG5cblx0XHQvLyBTaG93IHRoZSB0ZXh0IGNhbnZhcyBhbmQgZ2V0IGl0cyBjb250ZXh0XG5cdFx0bGV0IHRleHRDYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0LWNhbnZhc1wiKTtcblx0XHR0ZXh0Q2FudmFzLmhpZGRlbiA9IGZhbHNlO1xuXHRcdHRoaXMudGV4dEN0eCA9IHRleHRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cdFx0Ly8gU2l6ZSB0aGUgdGV4dCBjYW52YXMgdG8gYmUgdGhlIHNhbWUgYXMgdGhlIGdhbWUgY2FudmFzXG5cdFx0dGV4dENhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGV4dENhbnZhcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdsO1xuXHR9XG5cblx0cmVuZGVyKHZpc2libGVTZXQ6IENhbnZhc05vZGVbXSwgdGlsZW1hcHM6IFRpbGVtYXBbXSwgdWlMYXllcnM6IE1hcDxVSUxheWVyPik6IHZvaWQge1xuXHRcdGZvcihsZXQgbm9kZSBvZiB2aXNpYmxlU2V0KXtcblx0XHRcdHRoaXMucmVuZGVyTm9kZShub2RlKTtcblx0XHR9XG5cblx0XHR1aUxheWVycy5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRpZighdWlMYXllcnMuZ2V0KGtleSkuaXNIaWRkZW4oKSlcblx0XHRcdFx0dWlMYXllcnMuZ2V0KGtleSkuZ2V0SXRlbXMoKS5mb3JFYWNoKG5vZGUgPT4gdGhpcy5yZW5kZXJOb2RlKDxDYW52YXNOb2RlPm5vZGUpKVxuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXIoY29sb3I6IENvbG9yKTogdm9pZCB7XG5cdFx0dGhpcy5nbC5jbGVhckNvbG9yKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmEpO1xuXHRcdHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuXHRcdHRoaXMudGV4dEN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53b3JsZFNpemUueCwgdGhpcy53b3JsZFNpemUueSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyTm9kZShub2RlOiBDYW52YXNOb2RlKTogdm9pZCB7XG5cdFx0Ly8gQ2FsY3VsYXRlIHRoZSBvcmlnaW4gb2YgdGhlIHZpZXdwb3J0IGFjY29yZGluZyB0byB0aGlzIHNwcml0ZVxuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMuc2NlbmUuZ2V0Vmlld1RyYW5zbGF0aW9uKG5vZGUpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgem9vbSBsZXZlbCBvZiB0aGUgc2NlbmVcbiAgICAgICAgdGhpcy56b29tID0gdGhpcy5zY2VuZS5nZXRWaWV3U2NhbGUoKTtcblx0XHRcblx0XHRpZihub2RlLmhhc0N1c3RvbVNoYWRlcil7XG5cdFx0XHQvLyBJZiB0aGUgbm9kZSBoYXMgYSBjdXN0b20gc2hhZGVyLCByZW5kZXIgdXNpbmcgdGhhdFxuXHRcdFx0dGhpcy5yZW5kZXJDdXN0b20obm9kZSk7XG5cdFx0fSBlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBHcmFwaGljKXtcblx0XHRcdHRoaXMucmVuZGVyR3JhcGhpYyhub2RlKTtcblx0XHR9IGVsc2UgaWYobm9kZSBpbnN0YW5jZW9mIFNwcml0ZSl7XG5cdFx0XHRpZihub2RlIGluc3RhbmNlb2YgQW5pbWF0ZWRTcHJpdGUpe1xuXHRcdFx0XHR0aGlzLnJlbmRlckFuaW1hdGVkU3ByaXRlKG5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTcHJpdGUobm9kZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKG5vZGUgaW5zdGFuY2VvZiBVSUVsZW1lbnQpe1xuXHRcdFx0dGhpcy5yZW5kZXJVSUVsZW1lbnQobm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlclNwcml0ZShzcHJpdGU6IFNwcml0ZSk6IHZvaWQge1xuXHRcdGxldCBzaGFkZXIgPSBSZWdpc3RyeU1hbmFnZXIuc2hhZGVycy5nZXQoU2hhZGVyUmVnaXN0cnkuU1BSSVRFX1NIQURFUik7XG5cdFx0bGV0IG9wdGlvbnMgPSB0aGlzLmFkZE9wdGlvbnMoc2hhZGVyLmdldE9wdGlvbnMoc3ByaXRlKSwgc3ByaXRlKTtcblx0XHRzaGFkZXIucmVuZGVyKHRoaXMuZ2wsIG9wdGlvbnMpO1xuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlckFuaW1hdGVkU3ByaXRlKHNwcml0ZTogQW5pbWF0ZWRTcHJpdGUpOiB2b2lkIHtcblx0XHRsZXQgc2hhZGVyID0gUmVnaXN0cnlNYW5hZ2VyLnNoYWRlcnMuZ2V0KFNoYWRlclJlZ2lzdHJ5LlNQUklURV9TSEFERVIpO1xuXHRcdGxldCBvcHRpb25zID0gdGhpcy5hZGRPcHRpb25zKHNoYWRlci5nZXRPcHRpb25zKHNwcml0ZSksIHNwcml0ZSk7XG5cdFx0c2hhZGVyLnJlbmRlcih0aGlzLmdsLCBvcHRpb25zKTtcblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXJHcmFwaGljKGdyYXBoaWM6IEdyYXBoaWMpOiB2b2lkIHtcblxuXHRcdGlmKGdyYXBoaWMgaW5zdGFuY2VvZiBQb2ludCl7XG5cdFx0XHRsZXQgc2hhZGVyID0gUmVnaXN0cnlNYW5hZ2VyLnNoYWRlcnMuZ2V0KFNoYWRlclJlZ2lzdHJ5LlBPSU5UX1NIQURFUik7XG5cdFx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuYWRkT3B0aW9ucyhzaGFkZXIuZ2V0T3B0aW9ucyhncmFwaGljKSwgZ3JhcGhpYyk7XG5cdFx0XHRzaGFkZXIucmVuZGVyKHRoaXMuZ2wsIG9wdGlvbnMpO1xuXHRcdH0gZWxzZSBpZihncmFwaGljIGluc3RhbmNlb2YgUmVjdCkge1xuXHRcdFx0bGV0IHNoYWRlciA9IFJlZ2lzdHJ5TWFuYWdlci5zaGFkZXJzLmdldChTaGFkZXJSZWdpc3RyeS5SRUNUX1NIQURFUik7XG5cdFx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuYWRkT3B0aW9ucyhzaGFkZXIuZ2V0T3B0aW9ucyhncmFwaGljKSwgZ3JhcGhpYyk7XG5cdFx0XHRzaGFkZXIucmVuZGVyKHRoaXMuZ2wsIG9wdGlvbnMpO1xuXHRcdH0gXG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyVGlsZW1hcCh0aWxlbWFwOiBUaWxlbWFwKTogdm9pZCB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyVUlFbGVtZW50KHVpRWxlbWVudDogVUlFbGVtZW50KTogdm9pZCB7XG5cdFx0aWYodWlFbGVtZW50IGluc3RhbmNlb2YgTGFiZWwpe1xuXHRcdFx0bGV0IHNoYWRlciA9IFJlZ2lzdHJ5TWFuYWdlci5zaGFkZXJzLmdldChTaGFkZXJSZWdpc3RyeS5MQUJFTF9TSEFERVIpO1xuXHRcdFx0bGV0IG9wdGlvbnMgPSB0aGlzLmFkZE9wdGlvbnMoc2hhZGVyLmdldE9wdGlvbnModWlFbGVtZW50KSwgdWlFbGVtZW50KTtcblx0XHRcdHNoYWRlci5yZW5kZXIodGhpcy5nbCwgb3B0aW9ucyk7XG5cblx0XHRcdHRoaXMudGV4dEN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgKHVpRWxlbWVudC5wb3NpdGlvbi54IC0gdGhpcy5vcmlnaW4ueCkqdGhpcy56b29tLCAodWlFbGVtZW50LnBvc2l0aW9uLnkgLSB0aGlzLm9yaWdpbi55KSp0aGlzLnpvb20pO1xuXHRcdFx0dGhpcy50ZXh0Q3R4LnJvdGF0ZSgtdWlFbGVtZW50LnJvdGF0aW9uKTtcblx0XHRcdGxldCBnbG9iYWxBbHBoYSA9IHRoaXMudGV4dEN0eC5nbG9iYWxBbHBoYTtcblx0XHRcdHRoaXMudGV4dEN0eC5nbG9iYWxBbHBoYSA9IHVpRWxlbWVudC5hbHBoYTtcblxuXHRcdFx0Ly8gUmVuZGVyIHRleHRcblx0XHRcdHRoaXMudGV4dEN0eC5mb250ID0gdWlFbGVtZW50LmdldEZvbnRTdHJpbmcoKTtcblx0XHRcdGxldCBvZmZzZXQgPSB1aUVsZW1lbnQuY2FsY3VsYXRlVGV4dE9mZnNldCh0aGlzLnRleHRDdHgpO1xuXHRcdFx0dGhpcy50ZXh0Q3R4LmZpbGxTdHlsZSA9IHVpRWxlbWVudC5jYWxjdWxhdGVUZXh0Q29sb3IoKTtcblx0XHRcdHRoaXMudGV4dEN0eC5nbG9iYWxBbHBoYSA9IHVpRWxlbWVudC50ZXh0Q29sb3IuYTtcblx0XHRcdHRoaXMudGV4dEN0eC5maWxsVGV4dCh1aUVsZW1lbnQudGV4dCwgb2Zmc2V0LnggLSB1aUVsZW1lbnQuc2l6ZS54LzIsIG9mZnNldC55IC0gdWlFbGVtZW50LnNpemUueS8yKTtcblxuXHRcdFx0dGhpcy50ZXh0Q3R4Lmdsb2JhbEFscGhhID0gZ2xvYmFsQWxwaGE7XG4gICAgICAgIFx0dGhpcy50ZXh0Q3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyQ3VzdG9tKG5vZGU6IENhbnZhc05vZGUpOiB2b2lkIHtcblx0XHRsZXQgc2hhZGVyID0gUmVnaXN0cnlNYW5hZ2VyLnNoYWRlcnMuZ2V0KG5vZGUuY3VzdG9tU2hhZGVyS2V5KTtcblx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuYWRkT3B0aW9ucyhzaGFkZXIuZ2V0T3B0aW9ucyhub2RlKSwgbm9kZSk7XG5cdFx0c2hhZGVyLnJlbmRlcih0aGlzLmdsLCBvcHRpb25zKTtcblx0fVxuXG5cdHByb3RlY3RlZCBhZGRPcHRpb25zKG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG5vZGU6IENhbnZhc05vZGUpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcblx0XHQvLyBHaXZlIHRoZSBzaGFkZXIgYWNjZXNzIHRvIHRoZSB3b3JsZCBzaXplXG5cdFx0b3B0aW9ucy53b3JsZFNpemUgPSB0aGlzLndvcmxkU2l6ZTtcblxuXHRcdC8vIEFkanVzdCB0aGUgb3JpZ2luIHBvc2l0aW9uIHRvIHRoZSBwYXJhbGxheFxuXHRcdGxldCBsYXllciA9IG5vZGUuZ2V0TGF5ZXIoKTtcblx0XHRsZXQgcGFyYWxsYXggPSBuZXcgVmVjMigxLCAxKTtcblx0XHRpZihsYXllciBpbnN0YW5jZW9mIFBhcmFsbGF4TGF5ZXIpe1xuXHRcdFx0cGFyYWxsYXggPSAoPFBhcmFsbGF4TGF5ZXI+bGF5ZXIpLnBhcmFsbGF4O1xuXHRcdH1cblxuXHRcdG9wdGlvbnMub3JpZ2luID0gdGhpcy5vcmlnaW4uY2xvbmUoKS5tdWx0KHBhcmFsbGF4KTtcblxuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cbn0iLCJpbXBvcnQgTWFwIGZyb20gXCIuLi8uLi9EYXRhVHlwZXMvQ29sbGVjdGlvbnMvTWFwXCI7XG5pbXBvcnQgQ2FudmFzTm9kZSBmcm9tIFwiLi4vLi4vTm9kZXMvQ2FudmFzTm9kZVwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuXG4vKipcbiAqIEEgd3JhcHBlciBjbGFzcyBmb3IgV2ViR0wgc2hhZGVycy5cbiAqIFRoaXMgY2xhc3MgaXMgYSBzaW5nbGV0b24sIGFuZCB0aGVyZSBpcyBvbmx5IG9uZSBmb3IgZWFjaCBzaGFkZXIgdHlwZS5cbiAqIEFsbCBvYmplY3RzIHRoYXQgdXNlIHRoaXMgc2hhZGVyIHR5cGUgd2lsbCByZWZlciB0byBhbmQgbW9kaWZ5IHRoaXMgc2FtZSB0eXBlLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTaGFkZXJUeXBlIHtcblx0LyoqIFRoZSBuYW1lIG9mIHRoaXMgc2hhZGVyICovXG5cdHByb3RlY3RlZCBuYW1lOiBzdHJpbmc7XG5cblx0LyoqIFRoZSBrZXkgdG8gdGhlIFdlYkdMUHJvZ3JhbSBpbiB0aGUgUmVzb3VyY2VNYW5hZ2VyICovXG5cdHByb3RlY3RlZCBwcm9ncmFtS2V5OiBzdHJpbmc7XG5cblx0LyoqIEEgcmVmZXJlbmNlIHRvIHRoZSByZXNvdXJjZSBtYW5hZ2VyICovXG5cdHByb3RlY3RlZCByZXNvdXJjZU1hbmFnZXI6IFJlc291cmNlTWFuYWdlcjtcblxuXHRjb25zdHJ1Y3Rvcihwcm9ncmFtS2V5OiBzdHJpbmcpe1xuXHRcdHRoaXMucHJvZ3JhbUtleSA9IHByb2dyYW1LZXk7XG5cdFx0dGhpcy5yZXNvdXJjZU1hbmFnZXIgPSBSZXNvdXJjZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplcyBhbnkgYnVmZmVyIG9iamVjdHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc2hhZGVyIHR5cGUuXG5cdCAqIEBwYXJhbSBnbCBUaGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHRcblx0ICovXG5cdGFic3RyYWN0IGluaXRCdWZmZXJPYmplY3QoKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9hZHMgYW55IHVuaWZvcm1zXG5cdCAqIEBwYXJhbSBnbCBUaGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHRcblx0ICogQHBhcmFtIG9wdGlvbnMgSW5mb3JtYXRpb24gYWJvdXQgdGhlIG9iamVjdCB3ZSdyZSBjdXJyZW50bHkgcmVuZGVyaW5nXG5cdCAqL1xuXHRhYnN0cmFjdCByZW5kZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIEV4dHJhY3RzIHRoZSBvcHRpb25zIGZyb20gdGhlIENhbnZhc05vZGUgYW5kIGdpdmVzIHRoZW0gdG8gdGhlIHJlbmRlciBmdW5jdGlvblxuXHQgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBnZXQgb3B0aW9ucyBmcm9tXG5cdCAqIEByZXR1cm5zIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcmVuZGVyIGZ1bmN0aW9uXG5cdCAqL1xuXHRnZXRPcHRpb25zKG5vZGU6IENhbnZhc05vZGUpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtyZXR1cm4ge307fVxufSIsImltcG9ydCBNYXQ0eDQgZnJvbSBcIi4uLy4uLy4uL0RhdGFUeXBlcy9NYXQ0eDRcIjtcbmltcG9ydCBWZWMyIGZyb20gXCIuLi8uLi8uLi9EYXRhVHlwZXMvVmVjMlwiO1xuaW1wb3J0IERlYnVnIGZyb20gXCIuLi8uLi8uLi9EZWJ1Zy9EZWJ1Z1wiO1xuaW1wb3J0IFJlY3QgZnJvbSBcIi4uLy4uLy4uL05vZGVzL0dyYXBoaWNzL1JlY3RcIjtcbmltcG9ydCBMYWJlbCBmcm9tIFwiLi4vLi4vLi4vTm9kZXMvVUlFbGVtZW50cy9MYWJlbFwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IFF1YWRTaGFkZXJUeXBlIGZyb20gXCIuL1F1YWRTaGFkZXJUeXBlXCI7XG5cbi8qKiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWxTaGFkZXJUeXBlIGV4dGVuZHMgUXVhZFNoYWRlclR5cGUge1xuXG5cdGNvbnN0cnVjdG9yKHByb2dyYW1LZXk6IHN0cmluZyl7XG5cdFx0c3VwZXIocHJvZ3JhbUtleSk7XG5cdFx0dGhpcy5yZXNvdXJjZU1hbmFnZXIgPSBSZXNvdXJjZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblx0fVxuXG5cdGluaXRCdWZmZXJPYmplY3QoKTogdm9pZCB7XG5cdFx0dGhpcy5idWZmZXJPYmplY3RLZXkgPSBcImxhYmVsXCI7XG5cdFx0dGhpcy5yZXNvdXJjZU1hbmFnZXIuY3JlYXRlQnVmZmVyKHRoaXMuYnVmZmVyT2JqZWN0S2V5KTtcblx0fVxuXG5cdHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZCB7XG5cdFx0Y29uc3QgYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IudG9XZWJHTCgpO1xuXHRcdGNvbnN0IGJvcmRlckNvbG9yID0gb3B0aW9ucy5ib3JkZXJDb2xvci50b1dlYkdMKCk7XG5cblx0XHRjb25zdCBwcm9ncmFtID0gdGhpcy5yZXNvdXJjZU1hbmFnZXIuZ2V0U2hhZGVyUHJvZ3JhbSh0aGlzLnByb2dyYW1LZXkpO1xuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldEJ1ZmZlcih0aGlzLmJ1ZmZlck9iamVjdEtleSk7XG5cblx0XHRnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG5cdFx0Y29uc3QgdmVydGV4RGF0YSA9IHRoaXMuZ2V0VmVydGljZXMob3B0aW9ucy5zaXplLngsIG9wdGlvbnMuc2l6ZS55KTtcblxuXHRcdGNvbnN0IEZTSVpFID0gdmVydGV4RGF0YS5CWVRFU19QRVJfRUxFTUVOVDtcblxuXHRcdC8vIEJpbmQgdGhlIGJ1ZmZlclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhEYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG5cblx0XHQvLyBBdHRyaWJ1dGVzXG5cdFx0Y29uc3QgYV9Qb3NpdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIFwiYV9Qb3NpdGlvblwiKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGFfUG9zaXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMiAqIEZTSVpFLCAwICogRlNJWkUpO1xuXHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFfUG9zaXRpb24pO1xuXG5cdFx0Ly8gVW5pZm9ybXNcblx0XHRjb25zdCB1X0JhY2tncm91bmRDb2xvciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfQmFja2dyb3VuZENvbG9yXCIpO1xuXHRcdGdsLnVuaWZvcm00ZnYodV9CYWNrZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRDb2xvcik7XG5cbiAgICAgICAgY29uc3QgdV9Cb3JkZXJDb2xvciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfQm9yZGVyQ29sb3JcIik7XG5cdFx0Z2wudW5pZm9ybTRmdih1X0JvcmRlckNvbG9yLCBib3JkZXJDb2xvcik7XG5cbiAgICAgICAgY29uc3QgdV9NYXhTaXplID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidV9NYXhTaXplXCIpO1xuICAgICAgICBnbC51bmlmb3JtMmYodV9NYXhTaXplLCAtdmVydGV4RGF0YVswXSwgdmVydGV4RGF0YVsxXSk7XG5cblx0XHQvLyBHZXQgdHJhbnNmb3JtYXRpb24gbWF0cml4XG5cdFx0Ly8gV2Ugd2FudCBhIHNxdWFyZSBmb3Igb3VyIHJlbmRlcmluZyBzcGFjZSwgc28gZ2V0IHRoZSBtYXhpbXVtIGRpbWVuc2lvbiBvZiBvdXIgcXVhZFxuXHRcdGxldCBtYXhEaW1lbnNpb24gPSBNYXRoLm1heChvcHRpb25zLnNpemUueCwgb3B0aW9ucy5zaXplLnkpO1xuXG4gICAgICAgIGNvbnN0IHVfQm9yZGVyV2lkdGggPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X0JvcmRlcldpZHRoXCIpO1xuXHRcdGdsLnVuaWZvcm0xZih1X0JvcmRlcldpZHRoLCBvcHRpb25zLmJvcmRlcldpZHRoL21heERpbWVuc2lvbik7XG5cbiAgICAgICAgY29uc3QgdV9Cb3JkZXJSYWRpdXMgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X0JvcmRlclJhZGl1c1wiKTtcblx0XHRnbC51bmlmb3JtMWYodV9Cb3JkZXJSYWRpdXMsIG9wdGlvbnMuYm9yZGVyUmFkaXVzL21heERpbWVuc2lvbik7XG5cblx0XHQvLyBUaGUgc2l6ZSBvZiB0aGUgcmVuZGVyaW5nIHNwYWNlIHdpbGwgYmUgYSBzcXVhcmUgd2l0aCB0aGlzIG1heGltdW0gZGltZW5zaW9uXG5cdFx0bGV0IHNpemUgPSBuZXcgVmVjMihtYXhEaW1lbnNpb24sIG1heERpbWVuc2lvbikuc2NhbGUoMi9vcHRpb25zLndvcmxkU2l6ZS54LCAyL29wdGlvbnMud29ybGRTaXplLnkpO1xuXG5cdFx0Ly8gQ2VudGVyIG91ciB0cmFuc2xhdGlvbnMgYXJvdW5kICgwLCAwKVxuXHRcdGNvbnN0IHRyYW5zbGF0ZVggPSAob3B0aW9ucy5wb3NpdGlvbi54IC0gb3B0aW9ucy5vcmlnaW4ueCAtIG9wdGlvbnMud29ybGRTaXplLngvMikvbWF4RGltZW5zaW9uO1xuXHRcdGNvbnN0IHRyYW5zbGF0ZVkgPSAtKG9wdGlvbnMucG9zaXRpb24ueSAtIG9wdGlvbnMub3JpZ2luLnkgLSBvcHRpb25zLndvcmxkU2l6ZS55LzIpL21heERpbWVuc2lvbjtcblxuXHRcdC8vIENyZWF0ZSBvdXIgdHJhbnNmb3JtYXRpb24gbWF0cml4XG5cdFx0dGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUobmV3IEZsb2F0MzJBcnJheShbdHJhbnNsYXRlWCwgdHJhbnNsYXRlWV0pKTtcblx0XHR0aGlzLnNjYWxlLnNjYWxlKHNpemUpO1xuXHRcdHRoaXMucm90YXRpb24ucm90YXRlKG9wdGlvbnMucm90YXRpb24pO1xuXHRcdGxldCB0cmFuc2Zvcm1hdGlvbiA9IE1hdDR4NC5NVUxUKHRoaXMudHJhbnNsYXRpb24sIHRoaXMuc2NhbGUsIHRoaXMucm90YXRpb24pO1xuXG5cdFx0Ly8gUGFzcyB0aGUgdHJhbnNsYXRpb24gbWF0cml4IHRvIG91ciBzaGFkZXJcblx0XHRjb25zdCB1X1RyYW5zZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfVHJhbnNmb3JtXCIpO1xuXHRcdGdsLnVuaWZvcm1NYXRyaXg0ZnYodV9UcmFuc2Zvcm0sIGZhbHNlLCB0cmFuc2Zvcm1hdGlvbi50b0FycmF5KCkpO1xuXG5cdFx0Ly8gRHJhdyB0aGUgcXVhZFxuXHRcdGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByZW5kZXJpbmcgc3BhY2UgYWx3YXlzIGhhcyB0byBiZSBhIHNxdWFyZSwgc28gbWFrZSBzdXJlIGl0cyBzcXVhcmUgdy5yLnQgdG8gdGhlIGxhcmdlc3QgZGltZW5zaW9uXG5cdCAqIEBwYXJhbSB3IFRoZSB3aWR0aCBvZiB0aGUgcXVhZCBpbiBwaXhlbHNcblx0ICogQHBhcmFtIGggVGhlIGhlaWdodCBvZiB0aGUgcXVhZCBpbiBwaXhlbHNcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2YgdGhlIHZlcnRpY2VzIG9mIHRoZSBxdWFkXG5cdCAqL1xuXHRnZXRWZXJ0aWNlcyh3OiBudW1iZXIsIGg6IG51bWJlcik6IEZsb2F0MzJBcnJheSB7XG5cdFx0bGV0IHgsIHk7XG5cblx0XHRpZihoID4gdyl7XG5cdFx0XHR5ID0gMC41O1xuXHRcdFx0eCA9IHcvKDIqaCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHggPSAwLjU7XG5cdFx0XHR5ID0gaC8oMip3KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG5cdFx0XHQteCwgIHksXG5cdFx0XHQteCwgLXksXG5cdFx0XHQgeCwgIHksXG5cdFx0XHQgeCwgLXlcblx0XHRdKTtcblx0fVxuXG5cdGdldE9wdGlvbnMocmVjdDogTGFiZWwpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcblx0XHRsZXQgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcblx0XHRcdHBvc2l0aW9uOiByZWN0LnBvc2l0aW9uLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiByZWN0LmNhbGN1bGF0ZUJhY2tncm91bmRDb2xvcigpLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHJlY3QuY2FsY3VsYXRlQm9yZGVyQ29sb3IoKSxcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiByZWN0LmJvcmRlcldpZHRoLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiByZWN0LmJvcmRlclJhZGl1cyxcblx0XHRcdHNpemU6IHJlY3Quc2l6ZSxcblx0XHRcdHJvdGF0aW9uOiByZWN0LnJvdGF0aW9uXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9wdGlvbnM7XG5cdH1cbn0iLCJpbXBvcnQgRGVidWcgZnJvbSBcIi4uLy4uLy4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIi4uLy4uLy4uL05vZGVzL0dyYXBoaWNzL1BvaW50XCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgUmVuZGVyaW5nVXRpbHMgZnJvbSBcIi4uLy4uLy4uL1V0aWxzL1JlbmRlcmluZ1V0aWxzXCI7XG5pbXBvcnQgU2hhZGVyVHlwZSBmcm9tIFwiLi4vU2hhZGVyVHlwZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludFNoYWRlclR5cGUgZXh0ZW5kcyBTaGFkZXJUeXBlIHtcblxuXHRwcm90ZWN0ZWQgYnVmZmVyT2JqZWN0S2V5OiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IocHJvZ3JhbUtleTogc3RyaW5nKXtcblx0XHRzdXBlcihwcm9ncmFtS2V5KTtcblx0fVxuXG5cdGluaXRCdWZmZXJPYmplY3QoKTogdm9pZCB7XG5cdFx0dGhpcy5idWZmZXJPYmplY3RLZXkgPSBcInBvaW50XCI7XG5cdFx0dGhpcy5yZXNvdXJjZU1hbmFnZXIuY3JlYXRlQnVmZmVyKHRoaXMuYnVmZmVyT2JqZWN0S2V5KTtcblx0fVxuXG5cdHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZCB7XG5cdFx0bGV0IHBvc2l0aW9uID0gUmVuZGVyaW5nVXRpbHMudG9XZWJHTENvb3JkcyhvcHRpb25zLnBvc2l0aW9uLCBvcHRpb25zLm9yaWdpbiwgb3B0aW9ucy53b3JsZFNpemUpO1xuXHRcdGxldCBjb2xvciA9IFJlbmRlcmluZ1V0aWxzLnRvV2ViR0xDb2xvcihvcHRpb25zLmNvbG9yKTtcblxuXHRcdGNvbnN0IHByb2dyYW0gPSB0aGlzLnJlc291cmNlTWFuYWdlci5nZXRTaGFkZXJQcm9ncmFtKHRoaXMucHJvZ3JhbUtleSk7XG5cdFx0Y29uc3QgYnVmZmVyID0gdGhpcy5yZXNvdXJjZU1hbmFnZXIuZ2V0QnVmZmVyKHRoaXMuYnVmZmVyT2JqZWN0S2V5KTtcblxuXHRcdGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cblx0XHRjb25zdCB2ZXJ0ZXhEYXRhID0gcG9zaXRpb247XG5cblx0XHRjb25zdCBGU0laRSA9IHZlcnRleERhdGEuQllURVNfUEVSX0VMRU1FTlQ7XG5cblx0XHQvLyBCaW5kIHRoZSBidWZmZXJcblx0XHRnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcblx0XHRnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4RGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuXG5cdFx0Ly8gQXR0cmlidXRlc1xuXHRcdGNvbnN0IGFfUG9zaXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfUG9zaXRpb25cIik7XG5cdFx0Z2wudmVydGV4QXR0cmliUG9pbnRlcihhX1Bvc2l0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDIgKiBGU0laRSwgMCAqIEZTSVpFKTtcblx0XHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhX1Bvc2l0aW9uKTtcblxuXHRcdC8vIFVuaWZvcm1zXG5cdFx0Y29uc3QgdV9Db2xvciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfQ29sb3JcIik7XG5cdFx0Z2wudW5pZm9ybTRmdih1X0NvbG9yLCBjb2xvcik7XG5cblx0XHRjb25zdCB1X1BvaW50U2l6ZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfUG9pbnRTaXplXCIpO1xuXHRcdGdsLnVuaWZvcm0xZih1X1BvaW50U2l6ZSwgb3B0aW9ucy5wb2ludFNpemUpO1xuXG5cdFx0Z2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIDEpO1xuXHR9XG5cblx0Z2V0T3B0aW9ucyhwb2ludDogUG9pbnQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcblx0XHRsZXQgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcblx0XHRcdHBvc2l0aW9uOiBwb2ludC5wb3NpdGlvbixcblx0XHRcdGNvbG9yOiBwb2ludC5jb2xvcixcblx0XHRcdHBvaW50U2l6ZTogcG9pbnQuc2l6ZSxcblx0XHR9XG5cblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxufSIsImltcG9ydCBNYXQ0eDQgZnJvbSBcIi4uLy4uLy4uL0RhdGFUeXBlcy9NYXQ0eDRcIjtcbmltcG9ydCBTaGFkZXJUeXBlIGZyb20gXCIuLi9TaGFkZXJUeXBlXCI7XG5cbi8qKiBSZXByZXNlbnRzIGFueSBXZWJHTCBvYmplY3RzIHRoYXQgaGF2ZSBhIHF1YWQgbWVzaCAoaS5lLiBhIHJlY3Rhbmd1bGFyIGdhbWUgb2JqZWN0IGNvbXBvc2VkIG9mIG9ubHkgdHdvIHRyaWFuZ2xlcykgKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFF1YWRTaGFkZXJUeXBlIGV4dGVuZHMgU2hhZGVyVHlwZSB7XG5cdC8qKiBUaGUga2V5IHRvIHRoZSBidWZmZXIgb2JqZWN0IGZvciB0aGlzIHNoYWRlciAqL1xuXHRwcm90ZWN0ZWQgYnVmZmVyT2JqZWN0S2V5OiBzdHJpbmc7XG5cblx0LyoqIFRoZSBzY2FsZSBtYXRyaWMgKi9cblx0cHJvdGVjdGVkIHNjYWxlOiBNYXQ0eDQ7XG5cblx0LyoqIFRoZSByb3RhdGlvbiBtYXRyaXggKi9cblx0cHJvdGVjdGVkIHJvdGF0aW9uOiBNYXQ0eDQ7XG5cblx0LyoqIFRoZSB0cmFuc2xhdGlvbiBtYXRyaXggKi9cblx0cHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBNYXQ0eDQ7XG5cblx0Y29uc3RydWN0b3IocHJvZ3JhbUtleTogc3RyaW5nKXtcblx0XHRzdXBlcihwcm9ncmFtS2V5KTtcblxuXHRcdHRoaXMuc2NhbGUgPSBNYXQ0eDQuSURFTlRJVFk7XG5cdFx0dGhpcy5yb3RhdGlvbiA9IE1hdDR4NC5JREVOVElUWTtcblx0XHR0aGlzLnRyYW5zbGF0aW9uID0gTWF0NHg0LklERU5USVRZO1xuXHR9XG59IiwiaW1wb3J0IE1hdDR4NCBmcm9tIFwiLi4vLi4vLi4vRGF0YVR5cGVzL01hdDR4NFwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uLy4uLy4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgUmVjdCBmcm9tIFwiLi4vLi4vLi4vTm9kZXMvR3JhcGhpY3MvUmVjdFwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IFF1YWRTaGFkZXJUeXBlIGZyb20gXCIuL1F1YWRTaGFkZXJUeXBlXCI7XG5cbi8qKiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdFNoYWRlclR5cGUgZXh0ZW5kcyBRdWFkU2hhZGVyVHlwZSB7XG5cblx0Y29uc3RydWN0b3IocHJvZ3JhbUtleTogc3RyaW5nKXtcblx0XHRzdXBlcihwcm9ncmFtS2V5KTtcblx0XHR0aGlzLnJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXHR9XG5cblx0aW5pdEJ1ZmZlck9iamVjdCgpOiB2b2lkIHtcblx0XHR0aGlzLmJ1ZmZlck9iamVjdEtleSA9IFwicmVjdFwiO1xuXHRcdHRoaXMucmVzb3VyY2VNYW5hZ2VyLmNyZWF0ZUJ1ZmZlcih0aGlzLmJ1ZmZlck9iamVjdEtleSk7XG5cdH1cblxuXHRyZW5kZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuXHRcdGNvbnN0IGNvbG9yID0gb3B0aW9ucy5jb2xvci50b1dlYkdMKCk7XG5cblx0XHRjb25zdCBwcm9ncmFtID0gdGhpcy5yZXNvdXJjZU1hbmFnZXIuZ2V0U2hhZGVyUHJvZ3JhbSh0aGlzLnByb2dyYW1LZXkpO1xuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldEJ1ZmZlcih0aGlzLmJ1ZmZlck9iamVjdEtleSk7XG5cblx0XHRnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG5cdFx0Y29uc3QgdmVydGV4RGF0YSA9IHRoaXMuZ2V0VmVydGljZXMob3B0aW9ucy5zaXplLngsIG9wdGlvbnMuc2l6ZS55KTtcblxuXHRcdGNvbnN0IEZTSVpFID0gdmVydGV4RGF0YS5CWVRFU19QRVJfRUxFTUVOVDtcblxuXHRcdC8vIEJpbmQgdGhlIGJ1ZmZlclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhEYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG5cblx0XHQvLyBBdHRyaWJ1dGVzXG5cdFx0Y29uc3QgYV9Qb3NpdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIFwiYV9Qb3NpdGlvblwiKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGFfUG9zaXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMiAqIEZTSVpFLCAwICogRlNJWkUpO1xuXHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFfUG9zaXRpb24pO1xuXG5cdFx0Ly8gVW5pZm9ybXNcblx0XHRjb25zdCB1X0NvbG9yID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidV9Db2xvclwiKTtcblx0XHRnbC51bmlmb3JtNGZ2KHVfQ29sb3IsIGNvbG9yKTtcblxuXHRcdC8vIEdldCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcblx0XHQvLyBXZSB3YW50IGEgc3F1YXJlIGZvciBvdXIgcmVuZGVyaW5nIHNwYWNlLCBzbyBnZXQgdGhlIG1heGltdW0gZGltZW5zaW9uIG9mIG91ciBxdWFkXG5cdFx0bGV0IG1heERpbWVuc2lvbiA9IE1hdGgubWF4KG9wdGlvbnMuc2l6ZS54LCBvcHRpb25zLnNpemUueSk7XG5cblx0XHQvLyBUaGUgc2l6ZSBvZiB0aGUgcmVuZGVyaW5nIHNwYWNlIHdpbGwgYmUgYSBzcXVhcmUgd2l0aCB0aGlzIG1heGltdW0gZGltZW5zaW9uXG5cdFx0bGV0IHNpemUgPSBuZXcgVmVjMihtYXhEaW1lbnNpb24sIG1heERpbWVuc2lvbikuc2NhbGUoMi9vcHRpb25zLndvcmxkU2l6ZS54LCAyL29wdGlvbnMud29ybGRTaXplLnkpO1xuXG5cdFx0Ly8gQ2VudGVyIG91ciB0cmFuc2xhdGlvbnMgYXJvdW5kICgwLCAwKVxuXHRcdGNvbnN0IHRyYW5zbGF0ZVggPSAob3B0aW9ucy5wb3NpdGlvbi54IC0gb3B0aW9ucy5vcmlnaW4ueCAtIG9wdGlvbnMud29ybGRTaXplLngvMikvbWF4RGltZW5zaW9uO1xuXHRcdGNvbnN0IHRyYW5zbGF0ZVkgPSAtKG9wdGlvbnMucG9zaXRpb24ueSAtIG9wdGlvbnMub3JpZ2luLnkgLSBvcHRpb25zLndvcmxkU2l6ZS55LzIpL21heERpbWVuc2lvbjtcblxuXHRcdC8vIENyZWF0ZSBvdXIgdHJhbnNmb3JtYXRpb24gbWF0cml4XG5cdFx0dGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUobmV3IEZsb2F0MzJBcnJheShbdHJhbnNsYXRlWCwgdHJhbnNsYXRlWV0pKTtcblx0XHR0aGlzLnNjYWxlLnNjYWxlKHNpemUpO1xuXHRcdHRoaXMucm90YXRpb24ucm90YXRlKG9wdGlvbnMucm90YXRpb24pO1xuXHRcdGxldCB0cmFuc2Zvcm1hdGlvbiA9IE1hdDR4NC5NVUxUKHRoaXMudHJhbnNsYXRpb24sIHRoaXMuc2NhbGUsIHRoaXMucm90YXRpb24pO1xuXG5cdFx0Ly8gUGFzcyB0aGUgdHJhbnNsYXRpb24gbWF0cml4IHRvIG91ciBzaGFkZXJcblx0XHRjb25zdCB1X1RyYW5zZm9ybSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfVHJhbnNmb3JtXCIpO1xuXHRcdGdsLnVuaWZvcm1NYXRyaXg0ZnYodV9UcmFuc2Zvcm0sIGZhbHNlLCB0cmFuc2Zvcm1hdGlvbi50b0FycmF5KCkpO1xuXG5cdFx0Ly8gRHJhdyB0aGUgcXVhZFxuXHRcdGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuXHR9XG5cblxuXHQvKlxuXHRcdFNvIGFzIGl0IHR1cm5zIG91dCwgV2ViR0wgaGFzIGFuIGlzc3VlIHdpdGggbm9uLXNxdWFyZSBxdWFkcy5cblx0XHRJdCBkb2Vzbid0IGxpa2Ugd2hlbiB5b3UgZG9uJ3QgaGF2ZSBhIDEtMSBzY2FsZSwgYW5kIHJvdGF0aW9ucyBhcmUgZW50aXJlbHkgbWVzc2VkIHVwIGlmIHRoaXMgaXMgbm90IHRoZSBjYXNlLlxuXHRcdFRvIHNvbHZlIHRoaXMsIEkgdXNlZCB0aGUgc2NhbGUgb2YgdGhlIExBUkdFU1QgZGltZW5zaW9uIG9mIHRoZSBxdWFkIHRvIG1ha2UgYSBzcXVhcmUsIHRoZW4gYWRqdXN0ZWQgdGhlIHZlcnRleCBjb29yZGluYXRlcyBpbnNpZGUgb2YgdGhhdC5cblx0XHRBIGRpYWdyYW0gb2YgdGhlIHNvbHV0aW9uIGZvbGxvd3MuXG5cblx0XHRUaGVyZSBpcyBhIGJvdW5kaW5nIHNxdWFyZSBmb3IgdGhlIHF1YWQgd2l0aCBkaW1lbnNpb25zIGh4aCAoaW4gdGhpcyBjYXNlLCBzaW5jZSBoZWlnaHQgaXMgdGhlIGxhcmdlc3QgZGltZW5zaW9uKS5cblx0XHRUaGUgb2Zmc2V0IGluIHRoZSB2ZXJ0aWNhbCBkaXJlY3Rpb24gaXMgdGhlcmVmb3JlIDAuNSwgYXMgaXQgaXMgbm9ybWFsbHkuXG5cdFx0SG93ZXZlciwgdGhlIG9mZnNldCBpbiB0aGUgaG9yaXpvbnRhbCBkaXJlY3Rpb24gaXMgbm90IHNvIHN0cmFpZ2h0Zm9yd2FyZCwgYnV0IGlzbid0IGNvbmNlcHR1YWxseSBoYXJkLlxuXHRcdEFsbCB3ZSByZWFsbHkgaGF2ZSB0byBkbyBpcyBhIHJhbmdlIGNoYW5nZSBmcm9tIFswLCBoZWlnaHQvMl0gdG8gWzAsIDAuNV0sIHdoZXJlIG91ciB2YWx1ZSBpcyB0ID0gd2lkdGgvMiwgYW5kIDAgPD0gdCA8PSBoZWlnaHQvMi5cblxuXHRcdFNvIG5vdyB3ZSBoYXZlIG91ciByZWN0LCBpbiBhIHNwYWNlIHNjYWxlZCB3aXRoIHJlc3BlY3QgdG8gdGhlIGxhcmdlc3QgZGltZW5zaW9uLlxuXHRcdFJvdGF0aW9ucyB3b3JrIGFzIHlvdSB3b3VsZCBleHBlY3QsIGV2ZW4gZm9yIGxvbmcgcmVjdGFuZ2xlcy5cblxuXHRcdFx0XHRcdDAuNVxuXHRcdFx0X18gX18gX18gX18gX18gX18gX19cblx0XHRcdHxcdHw4ODg4ODg4ODg4OHxcdHxcblx0XHRcdHxcdHw4ODg4ODg4ODg4OHxcdHxcblx0XHRcdHxcdHw4ODg4ODg4ODg4OHxcdHxcblx0XHQtMC41fF8gX3w4ODg4ODg4ODg4OHxfIF98MC41XG5cdFx0XHR8XHR8ODg4ODg4ODg4ODh8XHR8XG5cdFx0XHR8XHR8ODg4ODg4ODg4ODh8XHR8XG5cdFx0XHR8XHR8ODg4ODg4ODg4ODh8XHR8XG5cdCAgXHRcdHxfX198ODg4ODg4ODg4ODh8X19ffFxuXHRcdFx0ICBcdFx0LTAuNVxuXG5cdFx0VGhlIGdldFZlcnRpY2VzIGZ1bmN0aW9uIGJlbG93IGRvZXMgYXMgZGVzY3JpYmVkLCBhbmQgY29udmVydHMgdGhlIHJhbmdlXG5cdCovXG5cdC8qKlxuXHQgKiBUaGUgcmVuZGVyaW5nIHNwYWNlIGFsd2F5cyBoYXMgdG8gYmUgYSBzcXVhcmUsIHNvIG1ha2Ugc3VyZSBpdHMgc3F1YXJlIHcuci50IHRvIHRoZSBsYXJnZXN0IGRpbWVuc2lvblxuXHQgKiBAcGFyYW0gdyBUaGUgd2lkdGggb2YgdGhlIHF1YWQgaW4gcGl4ZWxzXG5cdCAqIEBwYXJhbSBoIFRoZSBoZWlnaHQgb2YgdGhlIHF1YWQgaW4gcGl4ZWxzXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHRoZSB2ZXJ0aWNlcyBvZiB0aGUgcXVhZFxuXHQgKi9cblx0Z2V0VmVydGljZXModzogbnVtYmVyLCBoOiBudW1iZXIpOiBGbG9hdDMyQXJyYXkge1xuXHRcdGxldCB4LCB5O1xuXG5cdFx0aWYoaCA+IHcpe1xuXHRcdFx0eSA9IDAuNTtcblx0XHRcdHggPSB3LygyKmgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR4ID0gMC41O1xuXHRcdFx0eSA9IGgvKDIqdyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW1xuXHRcdFx0LXgsICB5LFxuXHRcdFx0LXgsIC15LFxuXHRcdFx0IHgsICB5LFxuXHRcdFx0IHgsIC15XG5cdFx0XSk7XG5cdH1cblxuXHRnZXRPcHRpb25zKHJlY3Q6IFJlY3QpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcblx0XHRsZXQgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcblx0XHRcdHBvc2l0aW9uOiByZWN0LnBvc2l0aW9uLFxuXHRcdFx0Y29sb3I6IHJlY3QuY29sb3IsXG5cdFx0XHRzaXplOiByZWN0LnNpemUsXG5cdFx0XHRyb3RhdGlvbjogcmVjdC5yb3RhdGlvblxuXHRcdH1cblxuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG59IiwiaW1wb3J0IE1hdDR4NCBmcm9tIFwiLi4vLi4vLi4vRGF0YVR5cGVzL01hdDR4NFwiO1xuaW1wb3J0IFZlYzIgZnJvbSBcIi4uLy4uLy4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uLy4uLy4uL0RlYnVnL0RlYnVnXCI7XG5pbXBvcnQgQW5pbWF0ZWRTcHJpdGUgZnJvbSBcIi4uLy4uLy4uL05vZGVzL1Nwcml0ZXMvQW5pbWF0ZWRTcHJpdGVcIjtcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4uLy4uLy4uL05vZGVzL1Nwcml0ZXMvU3ByaXRlXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgUXVhZFNoYWRlclR5cGUgZnJvbSBcIi4vUXVhZFNoYWRlclR5cGVcIjtcblxuLyoqIEEgc2hhZGVyIGZvciBzcHJpdGVzIGFuZCBhbmltYXRlZCBzcHJpdGVzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVTaGFkZXJUeXBlIGV4dGVuZHMgUXVhZFNoYWRlclR5cGUge1xuXHRjb25zdHJ1Y3Rvcihwcm9ncmFtS2V5OiBzdHJpbmcpe1xuXHRcdHN1cGVyKHByb2dyYW1LZXkpO1xuXHRcdHRoaXMucmVzb3VyY2VNYW5hZ2VyID0gUmVzb3VyY2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cdH1cblxuXHRpbml0QnVmZmVyT2JqZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuYnVmZmVyT2JqZWN0S2V5ID0gXCJzcHJpdGVcIjtcblx0XHR0aGlzLnJlc291cmNlTWFuYWdlci5jcmVhdGVCdWZmZXIodGhpcy5idWZmZXJPYmplY3RLZXkpO1xuXHR9XG5cblx0cmVuZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcblx0XHRjb25zdCBwcm9ncmFtID0gdGhpcy5yZXNvdXJjZU1hbmFnZXIuZ2V0U2hhZGVyUHJvZ3JhbSh0aGlzLnByb2dyYW1LZXkpO1xuXHRcdGNvbnN0IGJ1ZmZlciA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldEJ1ZmZlcih0aGlzLmJ1ZmZlck9iamVjdEtleSk7XG5cdFx0Y29uc3QgdGV4dHVyZSA9IHRoaXMucmVzb3VyY2VNYW5hZ2VyLmdldFRleHR1cmUob3B0aW9ucy5pbWFnZUtleSk7XG5cblx0XHRnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG5cdFx0Y29uc3QgdmVydGV4RGF0YSA9IHRoaXMuZ2V0VmVydGljZXMob3B0aW9ucy5zaXplLngsIG9wdGlvbnMuc2l6ZS55LCBvcHRpb25zLnNjYWxlKTtcblxuXHRcdGNvbnN0IEZTSVpFID0gdmVydGV4RGF0YS5CWVRFU19QRVJfRUxFTUVOVDtcblxuXHRcdC8vIEJpbmQgdGhlIGJ1ZmZlclxuXHRcdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuXHRcdGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhEYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG5cblx0XHQvLyBBdHRyaWJ1dGVzXG5cdFx0Y29uc3QgYV9Qb3NpdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIFwiYV9Qb3NpdGlvblwiKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGFfUG9zaXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgNCAqIEZTSVpFLCAwICogRlNJWkUpO1xuXHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFfUG9zaXRpb24pO1xuXG5cdFx0Y29uc3QgYV9UZXhDb29yZCA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIFwiYV9UZXhDb29yZFwiKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGFfVGV4Q29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgNCAqIEZTSVpFLCAyKkZTSVpFKTtcblx0XHRnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhX1RleENvb3JkKTtcblxuXHRcdC8vIFVuaWZvcm1zXG5cdFx0Ly8gR2V0IHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxuXHRcdC8vIFdlIHdhbnQgYSBzcXVhcmUgZm9yIG91ciByZW5kZXJpbmcgc3BhY2UsIHNvIGdldCB0aGUgbWF4aW11bSBkaW1lbnNpb24gb2Ygb3VyIHF1YWRcblx0XHRsZXQgbWF4RGltZW5zaW9uID0gTWF0aC5tYXgob3B0aW9ucy5zaXplLngsIG9wdGlvbnMuc2l6ZS55KTtcblxuXHRcdC8vIFRoZSBzaXplIG9mIHRoZSByZW5kZXJpbmcgc3BhY2Ugd2lsbCBiZSBhIHNxdWFyZSB3aXRoIHRoaXMgbWF4aW11bSBkaW1lbnNpb25cblx0XHRsZXQgc2l6ZSA9IG5ldyBWZWMyKG1heERpbWVuc2lvbiwgbWF4RGltZW5zaW9uKS5zY2FsZSgyL29wdGlvbnMud29ybGRTaXplLngsIDIvb3B0aW9ucy53b3JsZFNpemUueSk7XG5cblx0XHQvLyBDZW50ZXIgb3VyIHRyYW5zbGF0aW9ucyBhcm91bmQgKDAsIDApXG5cdFx0Y29uc3QgdHJhbnNsYXRlWCA9IChvcHRpb25zLnBvc2l0aW9uLnggLSBvcHRpb25zLm9yaWdpbi54IC0gb3B0aW9ucy53b3JsZFNpemUueC8yKS9tYXhEaW1lbnNpb247XG5cdFx0Y29uc3QgdHJhbnNsYXRlWSA9IC0ob3B0aW9ucy5wb3NpdGlvbi55IC0gb3B0aW9ucy5vcmlnaW4ueSAtIG9wdGlvbnMud29ybGRTaXplLnkvMikvbWF4RGltZW5zaW9uO1xuXG5cdFx0Ly8gQ3JlYXRlIG91ciB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcblx0XHR0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZShuZXcgRmxvYXQzMkFycmF5KFt0cmFuc2xhdGVYLCB0cmFuc2xhdGVZXSkpO1xuXHRcdHRoaXMuc2NhbGUuc2NhbGUoc2l6ZSk7XG5cdFx0dGhpcy5yb3RhdGlvbi5yb3RhdGUob3B0aW9ucy5yb3RhdGlvbik7XG5cdFx0bGV0IHRyYW5zZm9ybWF0aW9uID0gTWF0NHg0Lk1VTFQodGhpcy50cmFuc2xhdGlvbiwgdGhpcy5zY2FsZSwgdGhpcy5yb3RhdGlvbik7XG5cblx0XHQvLyBQYXNzIHRoZSB0cmFuc2xhdGlvbiBtYXRyaXggdG8gb3VyIHNoYWRlclxuXHRcdGNvbnN0IHVfVHJhbnNmb3JtID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidV9UcmFuc2Zvcm1cIik7XG5cdFx0Z2wudW5pZm9ybU1hdHJpeDRmdih1X1RyYW5zZm9ybSwgZmFsc2UsIHRyYW5zZm9ybWF0aW9uLnRvQXJyYXkoKSk7XG5cblx0XHQvLyBTZXQgdXAgb3VyIHNhbXBsZXIgd2l0aCBvdXIgYXNzaWduZWQgdGV4dHVyZSB1bml0XG5cdFx0Y29uc3QgdV9TYW1wbGVyID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidV9TYW1wbGVyXCIpO1xuXHRcdGdsLnVuaWZvcm0xaSh1X1NhbXBsZXIsIHRleHR1cmUpO1xuXG5cdFx0Ly8gUGFzcyBpbiB0ZXhTaGlmdFxuXHRcdGNvbnN0IHVfdGV4U2hpZnQgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X3RleFNoaWZ0XCIpO1xuXHRcdGdsLnVuaWZvcm0yZnYodV90ZXhTaGlmdCwgb3B0aW9ucy50ZXhTaGlmdCk7XG5cblx0XHQvLyBQYXNzIGluIHRleFNjYWxlXG5cdFx0Y29uc3QgdV90ZXhTY2FsZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfdGV4U2NhbGVcIik7XG5cdFx0Z2wudW5pZm9ybTJmdih1X3RleFNjYWxlLCBvcHRpb25zLnRleFNjYWxlKTtcblxuXHRcdC8vIERyYXcgdGhlIHF1YWRcblx0XHRnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmVuZGVyaW5nIHNwYWNlIGFsd2F5cyBoYXMgdG8gYmUgYSBzcXVhcmUsIHNvIG1ha2Ugc3VyZSBpdHMgc3F1YXJlIHcuci50IHRvIHRoZSBsYXJnZXN0IGRpbWVuc2lvblxuXHQgKiBAcGFyYW0gdyBUaGUgd2lkdGggb2YgdGhlIHF1YWQgaW4gcGl4ZWxzXG5cdCAqIEBwYXJhbSBoIFRoZSBoZWlnaHQgb2YgdGhlIHF1YWQgaW4gcGl4ZWxzXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHRoZSB2ZXJ0aWNlcyBvZiB0aGUgcXVhZFxuXHQgKi9cblx0Z2V0VmVydGljZXModzogbnVtYmVyLCBoOiBudW1iZXIsIHNjYWxlOiBGbG9hdDMyQXJyYXkpOiBGbG9hdDMyQXJyYXkge1xuXHRcdGxldCB4LCB5O1xuXG5cdFx0aWYoaCA+IHcpe1xuXHRcdFx0eSA9IDAuNTtcblx0XHRcdHggPSB3LygyKmgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR4ID0gMC41O1xuXHRcdFx0eSA9IGgvKDIqdyk7XG5cdFx0fVxuXG5cdFx0Ly8gU2NhbGUgdGhlIHJlbmRlcmluZyBzcGFjZSBpZiBuZWVkZWRcblx0XHR4ICo9IHNjYWxlWzBdO1xuXHRcdHkgKj0gc2NhbGVbMV07XG5cblx0XHRyZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG5cdFx0XHQteCwgIHksIDAuMCwgMC4wLFxuXHRcdFx0LXgsIC15LCAwLjAsIDEuMCxcblx0XHRcdCB4LCAgeSwgMS4wLCAwLjAsXG5cdFx0XHQgeCwgLXksIDEuMCwgMS4wXG5cdFx0XSk7XG5cdH1cblxuXHRnZXRPcHRpb25zKHNwcml0ZTogU3ByaXRlKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG5cdFx0bGV0IHRleFNoaWZ0O1xuXHRcdGxldCB0ZXhTY2FsZTtcblxuXHRcdGlmKHNwcml0ZSBpbnN0YW5jZW9mIEFuaW1hdGVkU3ByaXRlKXtcblx0XHRcdGxldCBhbmltYXRpb25JbmRleCA9IHNwcml0ZS5hbmltYXRpb24uZ2V0SW5kZXhBbmRBZHZhbmNlQW5pbWF0aW9uKCk7XG5cdFx0XHRsZXQgb2Zmc2V0ID0gc3ByaXRlLmdldEFuaW1hdGlvbk9mZnNldChhbmltYXRpb25JbmRleCk7XG5cdFx0XHR0ZXhTaGlmdCA9IG5ldyBGbG9hdDMyQXJyYXkoW29mZnNldC54IC8gKHNwcml0ZS5jb2xzICogc3ByaXRlLnNpemUueCksIG9mZnNldC55IC8gKHNwcml0ZS5yb3dzICogc3ByaXRlLnNpemUueSldKTtcblx0XHRcdHRleFNjYWxlID0gbmV3IEZsb2F0MzJBcnJheShbMS8oc3ByaXRlLmNvbHMpLCAxLyhzcHJpdGUucm93cyldKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGV4U2hpZnQgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwXSk7XG5cdFx0XHR0ZXhTY2FsZSA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDFdKTtcblx0XHR9XG5cblx0XHRsZXQgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcblx0XHRcdHBvc2l0aW9uOiBzcHJpdGUucG9zaXRpb24sXG5cdFx0XHRyb3RhdGlvbjogc3ByaXRlLnJvdGF0aW9uLFxuXHRcdFx0c2l6ZTogc3ByaXRlLnNpemUsXG5cdFx0XHRzY2FsZTogc3ByaXRlLnNjYWxlLnRvQXJyYXkoKSxcblx0XHRcdGltYWdlS2V5OiBzcHJpdGUuaW1hZ2VJZCxcblx0XHRcdHRleFNoaWZ0LFxuXHRcdFx0dGV4U2NhbGVcblx0XHR9XG5cblx0XHRyZXR1cm4gb3B0aW9ucztcblx0fVxufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBRdWV1ZSBmcm9tIFwiLi4vRGF0YVR5cGVzL0NvbGxlY3Rpb25zL1F1ZXVlXCI7XG5pbXBvcnQgeyBUaWxlZFRpbGVtYXBEYXRhIH0gZnJvbSBcIi4uL0RhdGFUeXBlcy9UaWxlc2V0cy9UaWxlZERhdGFcIjtcbmltcG9ydCBTdHJpbmdVdGlscyBmcm9tIFwiLi4vVXRpbHMvU3RyaW5nVXRpbHNcIjtcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4uL1NvdW5kL0F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IFNwcml0ZXNoZWV0IGZyb20gXCIuLi9EYXRhVHlwZXMvU3ByaXRlc2hlZXRcIjtcbmltcG9ydCBXZWJHTFByb2dyYW1UeXBlIGZyb20gXCIuLi9EYXRhVHlwZXMvUmVuZGVyaW5nL1dlYkdMUHJvZ3JhbVR5cGVcIjtcblxuLyoqXG4gKiBUaGUgcmVzb3VyY2UgbWFuYWdlciBmb3IgdGhlIGdhbWUgZW5naW5lLlxuICogVGhlIHJlc291cmNlIG1hbmFnZXIgaW50ZXJmYWNlcyB3aXRoIHRoZSBsb2FkYWJsZSBhc3NldHMgb2YgYSBnYW1lIHN1Y2ggYXMgaW1hZ2VzLCBkYXRhIGZpbGVzLFxuICogYW5kIHNvdW5kcywgd2hpY2ggYXJlIGFsbCBmb3VuZCBpbiB0aGUgZGlzdCBmb2xkZXIuXG4gKiBUaGlzIGNsYXNzIGNvbnRyb2xzIGxvYWRpbmcgYW5kIHVwZGF0ZXMgdGhlIEByZWZlcmVuY2VbU2NlbmVdIHdpdGggdGhlIGxvYWRpbmcgcHJvZ3Jlc3MsIHNvIHRoYXQgdGhlIHNjZW5lIGRvZXMgXG4gKiBub3Qgc3RhcnQgYmVmb3JlIGFsbCBuZWNlc3NhcnkgYXNzZXRzIGFyZSBsb2FkZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlTWFuYWdlciB7XG4gICAgLy8gSW5zdGFuY2UgZm9yIHRoZSBzaW5nbGV0b24gY2xhc3NcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUmVzb3VyY2VNYW5hZ2VyO1xuICAgIFxuICAgIC8vIEJvb2xlYW5zIHRvIGtlZXAgdHJhY2sgb2Ygd2hldGhlciBvciBub3QgdGhlIFJlc291cmNlTWFuYWdlciBpcyBjdXJyZW50bHkgbG9hZGluZyBzb21ldGhpbmdcbiAgICAvKiogV2hldGhlciBvciBub3QgYW55IHJlc291cmNlcyBhcmUgbG9hZGluZyAqL1xuICAgIHByaXZhdGUgbG9hZGluZzogYm9vbGVhbjtcbiAgICAvKiogQSBib29sZWFuIHRvIGluZGljYXRlIHRoYXQgdGhlIGFzc2V0cyBqdXN0IGZpbmlzaGVkIGxvYWRpbmcgKi9cbiAgICBwcml2YXRlIGp1c3RMb2FkZWQ6IGJvb2xlYW47XG5cbiAgICAvLyBGdW5jdGlvbnMgdG8gZG8gc29tZXRoaW5nIHdoZW4gbG9hZGluZyBwcm9ncmVzc2VzIG9yIGlzIGNvbXBsZXRlZCBzdWNoIGFzIHJlbmRlciBhIGxvYWRpbmcgc2NyZWVuXG4gICAgLyoqIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiBsb2FkaW5nIHByb2dyZXNzZXMgKi9cbiAgICBwdWJsaWMgb25Mb2FkUHJvZ3Jlc3M6IEZ1bmN0aW9uO1xuICAgIC8qKiBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gbG9hZGluZyBjb21wbGV0ZXMgKi9cbiAgICBwdWJsaWMgb25Mb2FkQ29tcGxldGU6IEZ1bmN0aW9uO1xuXG5cbiAgICAvKiogTnVtYmVyIHRvIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgaW1hZ2VzIG5lZWQgdG8gYmUgbG9hZGVkKi9cbiAgICBwcml2YXRlIGxvYWRvbmx5X2ltYWdlc0xvYWRlZDogbnVtYmVyO1xuICAgIC8qKiBOdW1iZXIgdG8ga2VlcCB0cmFjayBvZiBob3cgbWFueSBpbWFnZXMgYXJlIGxvYWRlZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfaW1hZ2VzVG9Mb2FkOiBudW1iZXI7XG4gICAgLyoqIFRoZSBxdWV1ZSBvZiBpbWFnZXMgd2UgbXVzdCBsb2FkICovXG4gICAgcHJpdmF0ZSBsb2Fkb25seV9pbWFnZUxvYWRpbmdRdWV1ZTogUXVldWU8S2V5UGF0aFBhaXI+O1xuICAgIC8qKiBBIG1hcCBvZiB0aGUgaW1hZ2VzIHRoYXQgYXJlIGN1cnJlbnRseSBsb2FkZWQgYW5kIGJlaW5nIHVzZWQgYnkgdGhlIHNjZW5lLiBUaGUgcmVmZXJlbmNlIHRvIHRoZXNlIGltYWdlcyBvbmx5IGV4aXN0IGhlcmUgZm9yIGVhc3kgY2xlYW51cC4gKi9cbiAgICBwcml2YXRlIGltYWdlczogTWFwPEhUTUxJbWFnZUVsZW1lbnQ+O1xuXG4gICAgLyoqIE51bWJlciB0byBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IHRpbGVtYXBzIG5lZWQgdG8gYmUgbG9hZGVkICovXG4gICAgcHJpdmF0ZSBsb2Fkb25seV9zcHJpdGVzaGVldHNMb2FkZWQ6IG51bWJlcjtcbiAgICAvKiogTnVtYmVyIHRvIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgdGlsZW1hcHMgYXJlIGxvYWRlZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfc3ByaXRlc2hlZXRzVG9Mb2FkOiBudW1iZXI7XG4gICAgLyoqIFRoZSBxdWV1ZSBvZiB0aWxlbWFwcyB3ZSBtdXN0IGxvYWQgKi9cbiAgICBwcml2YXRlIGxvYWRvbmx5X3Nwcml0ZXNoZWV0TG9hZGluZ1F1ZXVlOiBRdWV1ZTxLZXlQYXRoUGFpcj47XG4gICAgLyoqIEEgbWFwIG9mIHRoZSB0aWxlbWFwcyB0aGF0IGFyZSBjdXJyZW50bHkgbG9hZGVkIGFuZCAocHJlc3VtYWJseSkgYmVpbmcgdXNlZCBieSB0aGUgc2NlbmUgKi9cbiAgICBwcml2YXRlIHNwcml0ZXNoZWV0czogTWFwPFNwcml0ZXNoZWV0PjtcblxuICAgIC8qKiBOdW1iZXIgdG8ga2VlcCB0cmFjayBvZiBob3cgbWFueSB0aWxlbWFwcyBuZWVkIHRvIGJlIGxvYWRlZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfdGlsZW1hcHNMb2FkZWQ6IG51bWJlcjtcbiAgICAvKiogTnVtYmVyIHRvIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgdGlsZW1hcHMgYXJlIGxvYWRlZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfdGlsZW1hcHNUb0xvYWQ6IG51bWJlcjtcbiAgICAvKiogVGhlIHF1ZXVlIG9mIHRpbGVtYXBzIHdlIG11c3QgbG9hZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfdGlsZW1hcExvYWRpbmdRdWV1ZTogUXVldWU8S2V5UGF0aFBhaXI+O1xuICAgIC8qKiBBIG1hcCBvZiB0aGUgdGlsZW1hcHMgdGhhdCBhcmUgY3VycmVudGx5IGxvYWRlZCBhbmQgKHByZXN1bWFibHkpIGJlaW5nIHVzZWQgYnkgdGhlIHNjZW5lICovXG4gICAgcHJpdmF0ZSB0aWxlbWFwczogTWFwPFRpbGVkVGlsZW1hcERhdGE+O1xuXG4gICAgLyoqIE51bWJlciB0byBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IHNvdW5kcyBuZWVkIHRvIGJlIGxvYWRlZCAqL1xuICAgIHByaXZhdGUgbG9hZG9ubHlfYXVkaW9Mb2FkZWQ6IG51bWJlcjtcbiAgICAvKiogTnVtYmVyIHRvIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgc291bmRzIGFyZSBsb2FkZWQgKi9cbiAgICBwcml2YXRlIGxvYWRvbmx5X2F1ZGlvVG9Mb2FkOiBudW1iZXI7XG4gICAgLyoqIFRoZSBxdWV1ZSBvZiBzb3VuZHMgd2UgbXVzdCBsb2FkICovXG4gICAgcHJpdmF0ZSBsb2Fkb25seV9hdWRpb0xvYWRpbmdRdWV1ZTogUXVldWU8S2V5UGF0aFBhaXI+O1xuICAgIC8qKiBBIG1hcCBvZiB0aGUgc291bmRzIHRoYXQgYXJlIGN1cnJlbnRseSBsb2FkZWQgYW5kIChwcmVzdW1hYmx5KSBiZWluZyB1c2VkIGJ5IHRoZSBzY2VuZSAqL1xuICAgIHByaXZhdGUgYXVkaW9CdWZmZXJzOiBNYXA8QXVkaW9CdWZmZXI+O1xuXG4gICAgLyoqIFRoZSB0b3RhbCBudW1iZXIgb2YgXCJ0eXBlc1wiIG9mIHRoaW5ncyB0aGF0IG5lZWQgdG8gYmUgbG9hZGVkIChpLmUuIGltYWdlcyBhbmQgdGlsZW1hcHMpICovXG4gICAgcHJpdmF0ZSBsb2Fkb25seV90eXBlc1RvTG9hZDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBsb2Fkb25seV9qc29uTG9hZGVkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBsb2Fkb25seV9qc29uVG9Mb2FkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBsb2Fkb25seV9qc29uTG9hZGluZ1F1ZXVlOiBRdWV1ZTxLZXlQYXRoUGFpcj47XG4gICAgcHJpdmF0ZSBqc29uT2JqZWN0czogTWFwPFJlY29yZDxzdHJpbmcsIGFueT4+O1xuXG4gICAgLyogIyMjIyMjIyMjIyBJTkZPUk1BVElPTiBTUEVDSUFMIFRPIFdFQkdMICMjIyMjIyMjIyMgKi9cbiAgICBwcml2YXRlIGdsX1dlYkdMQWN0aXZlOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBsb2Fkb25seV9nbF9TaGFkZXJQcm9ncmFtc0xvYWRlZDogbnVtYmVyO1xuICAgIHByaXZhdGUgbG9hZG9ubHlfZ2xfU2hhZGVyUHJvZ3JhbXNUb0xvYWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGxvYWRvbmx5X2dsX1NoYWRlckxvYWRpbmdRdWV1ZTogUXVldWU8S2V5UGF0aF9TaGFkZXI+O1xuXG4gICAgcHJpdmF0ZSBnbF9TaGFkZXJQcm9ncmFtczogTWFwPFdlYkdMUHJvZ3JhbVR5cGU+O1xuXG4gICAgcHJpdmF0ZSBnbF9UZXh0dXJlczogTWFwPG51bWJlcj47XG4gICAgcHJpdmF0ZSBnbF9OZXh0VGV4dHVyZUlEOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBnbF9CdWZmZXJzOiBNYXA8V2ViR0xCdWZmZXI+OyBcblxuICAgIHByaXZhdGUgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcblxuICAgIC8qICMjIyMjIyMjIyMgVU5MT0FESU5HIEFORCBFWENMVVNJT04gTElTVCAjIyMjIyMjIyMjICovXG4gICAgLyoqIEEgbGlzdCBvZiByZXNvdXJjZXMgdGhhdCB3aWxsIGJlIHVubG9hZGVkIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgc2NlbmUgKi9cbiAgICBwcml2YXRlIHJlc291cmNlc1RvVW5sb2FkOiBBcnJheTxSZXNvdXJjZVJlZmVyZW5jZT47XG5cbiAgICAvKiogQSBsaXN0IG9mIHJlc291cmNlcyB0byBrZWVwIHVudGlsIGZ1cnRoZXIgbm90aWNlICovXG4gICAgcHJpdmF0ZSByZXNvdXJjZXNUb0tlZXA6IEFycmF5PFJlc291cmNlUmVmZXJlbmNlPjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuanVzdExvYWRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfaW1hZ2VzTG9hZGVkID0gMDtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9pbWFnZXNUb0xvYWQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2ltYWdlTG9hZGluZ1F1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfc3ByaXRlc2hlZXRzTG9hZGVkID0gMDtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9zcHJpdGVzaGVldHNUb0xvYWQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0TG9hZGluZ1F1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlc2hlZXRzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfdGlsZW1hcHNMb2FkZWQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X3RpbGVtYXBzVG9Mb2FkID0gMDtcbiAgICAgICAgdGhpcy5sb2Fkb25seV90aWxlbWFwTG9hZGluZ1F1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIHRoaXMudGlsZW1hcHMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgdGhpcy5sb2Fkb25seV9hdWRpb0xvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfYXVkaW9Ub0xvYWQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2F1ZGlvTG9hZGluZ1F1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIHRoaXMuYXVkaW9CdWZmZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfanNvbkxvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfanNvblRvTG9hZCA9IDA7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfanNvbkxvYWRpbmdRdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuICAgICAgICB0aGlzLmpzb25PYmplY3RzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfZ2xfU2hhZGVyUHJvZ3JhbXNMb2FkZWQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zVG9Mb2FkID0gMDtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9nbF9TaGFkZXJMb2FkaW5nUXVldWUgPSBuZXcgUXVldWUoKTtcblxuICAgICAgICB0aGlzLmdsX1NoYWRlclByb2dyYW1zID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMuZ2xfVGV4dHVyZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZ2xfTmV4dFRleHR1cmVJRCA9IDA7XG4gICAgICAgIHRoaXMuZ2xfQnVmZmVycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlc1RvVW5sb2FkID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzVG9LZWVwID0gbmV3IEFycmF5KCk7XG4gICAgfTtcblxuICAgIC8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgU0lOR0xFVE9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBvciBhIG5ldyBpbnN0YW5jZSBpZiBub25lIGV4aXN0XG4gICAgICogQHJldHVybnMgVGhlIHJlc291cmNlIG1hbmFnZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUmVzb3VyY2VNYW5hZ2VyIHtcbiAgICAgICAgaWYoIXRoaXMuaW5zdGFuY2Upe1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBSZXNvdXJjZU1hbmFnZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgUFVCTElDIEZVTkNUSU9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyBvciBkZWFjdGl2YXRlcyB0aGUgdXNlIG9mIFdlYkdMXG4gICAgICogQHBhcmFtIGZsYWcgVHJ1ZSBpZiBXZWJHTCBzaG91bGQgYmUgdXNlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICogQHBhcmFtIGdsIFRoZSBpbnN0YW5jZSBvZiB0aGUgZ3JhcGhpY3MgY29udGV4dCwgaWYgYXBwbGljYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyB1c2VXZWJHTChmbGFnOiBib29sZWFuLCBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2xfV2ViR0xBY3RpdmUgPSBmbGFnO1xuXG4gICAgICAgIGlmKHRoaXMuZ2xfV2ViR0xBY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5nbCA9IGdsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYW4gaW1hZ2UgZnJvbSBmaWxlXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGFzc29jaWF0ZSB0aGUgbG9hZGVkIGltYWdlIHdpdGhcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgaW1hZ2UgdG8gbG9hZFxuICAgICAqL1xuICAgIHB1YmxpYyBpbWFnZShrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfaW1hZ2VMb2FkaW5nUXVldWUuZW5xdWV1ZSh7a2V5OiBrZXksIHBhdGg6IHBhdGh9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB0aGUgcmVzb3VyY2UgbWFuYWdlciB0byBrZWVwIHRoaXMgcmVzb3VyY2VcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIHJlc291cmNlXG4gICAgICovXG4gICAgcHVibGljIGtlZXBJbWFnZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmtlZXBSZXNvdXJjZShrZXksIFJlc291cmNlVHlwZS5JTUFHRSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGEgbG9hZGVkIGltYWdlXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBsb2FkZWQgaW1hZ2VcbiAgICAgKiBAcmV0dXJucyBUaGUgaW1hZ2UgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SW1hZ2Uoa2V5OiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgbGV0IGltYWdlID0gdGhpcy5pbWFnZXMuZ2V0KGtleSk7XG4gICAgICAgIGlmKGltYWdlID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhyb3cgYFRoZXJlIGlzIG5vIGltYWdlIGFzc29jaWF0ZWQgd2l0aCBrZXkgXCIke2tleX1cImBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSBzcHJpdGVzaGVldCBmcm9tIGZpbGVcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gYXNzb2NpYXRlIHRoZSBsb2FkZWQgc3ByaXRlc2hlZXQgd2l0aFxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBzcHJpdGVzaGVldCB0byBsb2FkXG4gICAgICovXG4gICAgcHVibGljIHNwcml0ZXNoZWV0KGtleTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9zcHJpdGVzaGVldExvYWRpbmdRdWV1ZS5lbnF1ZXVlKHtrZXk6IGtleSwgcGF0aDogcGF0aH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSByZXNvdXJjZSBtYW5hZ2VyIHRvIGtlZXAgdGhpcyByZXNvdXJjZVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgcmVzb3VyY2VcbiAgICAgKi9cbiAgICBwdWJsaWMga2VlcFNwcml0ZXNoZWV0KGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2VlcFJlc291cmNlKGtleSwgUmVzb3VyY2VUeXBlLlNQUklURVNIRUVUKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYSBsb2FkZWQgc3ByaXRlc2hlZXRcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIHNwcml0ZXNoZWV0IHRvIGxvYWRcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9hZGVkIFNwcml0ZXNoZWV0XG4gICAgICovXG4gICAgcHVibGljIGdldFNwcml0ZXNoZWV0KGtleTogc3RyaW5nKTogU3ByaXRlc2hlZXQge1xuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVzaGVldHMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYW4gYXVkaW8gZmlsZVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgbG9hZGVkIGF1ZGlvIGZpbGVcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXVkaW8gZmlsZSB0byBsb2FkXG4gICAgICovXG4gICAgcHVibGljIGF1ZGlvKGtleTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9hdWRpb0xvYWRpbmdRdWV1ZS5lbnF1ZXVlKHtrZXk6IGtleSwgcGF0aDogcGF0aH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSByZXNvdXJjZSBtYW5hZ2VyIHRvIGtlZXAgdGhpcyByZXNvdXJjZVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgcmVzb3VyY2VcbiAgICAgKi9cbiAgICAgcHVibGljIGtlZXBBdWRpbyhrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmtlZXBSZXNvdXJjZShrZXksIFJlc291cmNlVHlwZS5BVURJTyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGEgbG9hZGVkIGF1ZGlvIGZpbGVcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIGF1ZGlvIGZpbGUgdG8gbG9hZFxuICAgICAqIEByZXR1cm5zIFRoZSBBdWRpb0J1ZmZlciBjcmVhdGVkIGZyb20gdGhlIGxvYWRlZCBhdWRpbyBmbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QXVkaW8oa2V5OiBzdHJpbmcpOiBBdWRpb0J1ZmZlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1ZGlvQnVmZmVycy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgdGlsZW1hcCBmcm9tIGEganNvbiBmaWxlLiBBdXRvbWF0aWNhbGx5IGxvYWRzIHJlbGF0ZWQgaW1hZ2VzXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBsb2FkZWQgdGlsZW1hcFxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSB0aWxlbWFwIHRvIGxvYWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdGlsZW1hcChrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfdGlsZW1hcExvYWRpbmdRdWV1ZS5lbnF1ZXVlKHtrZXk6IGtleSwgcGF0aDogcGF0aH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSByZXNvdXJjZSBtYW5hZ2VyIHRvIGtlZXAgdGhpcyByZXNvdXJjZVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgcmVzb3VyY2VcbiAgICAgKi9cbiAgICAgcHVibGljIGtlZXBUaWxlbWFwKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2VlcFJlc291cmNlKGtleSwgUmVzb3VyY2VUeXBlLlRJTEVNQVApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJlaXZlcyBhIGxvYWRlZCB0aWxlbWFwXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBsb2FkZWQgdGlsZW1hcFxuICAgICAqIEByZXR1cm5zIFRoZSB0aWxlbWFwIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VGlsZW1hcChrZXk6IHN0cmluZyk6IFRpbGVkVGlsZW1hcERhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlbWFwcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhbiBvYmplY3QgZnJvbSBhIGpzb24gZmlsZS5cbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGxvYWRlZCBvYmplY3RcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUganNvbiBmaWxlIHRvIGxvYWRcbiAgICAgKi9cbiAgICBwdWJsaWMgb2JqZWN0KGtleTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2pzb25Mb2FkaW5nUXVldWUuZW5xdWV1ZSh7a2V5OiBrZXksIHBhdGg6IHBhdGh9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZWxscyB0aGUgcmVzb3VyY2UgbWFuYWdlciB0byBrZWVwIHRoaXMgcmVzb3VyY2VcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIHJlc291cmNlXG4gICAgICovXG4gICAgIHB1YmxpYyBrZWVwT2JqZWN0KGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2VlcFJlc291cmNlKGtleSwgUmVzb3VyY2VUeXBlLkpTT04pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJlaXZlcyBhIGxvYWRlZCBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIGxvYWRlZCBvYmplY3RcbiAgICAgKiBAcmV0dXJucyBUaGUgb2JqZWN0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T2JqZWN0KGtleTogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuanNvbk9iamVjdHMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBMT0FEIEZVTkNUSU9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuICAgIC8qKlxuICAgICAqIExvYWRzIGFsbCByZXNvdXJjZXMgY3VycmVudGx5IGluIHRoZSBxdWV1ZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsIHdoZW4gdGhlIHJlc291cmNlcyBhcmUgZmluaXNoZWQgbG9hZGluZ1xuICAgICAqL1xuICAgIGxvYWRSZXNvdXJjZXNGcm9tUXVldWUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfdHlwZXNUb0xvYWQgPSA1O1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gTG9hZCBldmVyeXRoaW5nIGluIHRoZSBxdWV1ZXMuIFRpbGVtYXBzIGhhdmUgdG8gY29tZSBiZWZvcmUgaW1hZ2VzIGJlY2F1c2UgdGhleSB3aWxsIGFkZCBuZXcgaW1hZ2VzIHRvIHRoZSBxdWV1ZVxuICAgICAgICB0aGlzLmxvYWRUaWxlbWFwc0Zyb21RdWV1ZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRlZCBUaWxlbWFwc1wiKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZXNoZWV0c0Zyb21RdWV1ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkZWQgU3ByaXRlc2hlZXRzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEltYWdlc0Zyb21RdWV1ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIEltYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQXVkaW9Gcm9tUXVldWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkZWQgQXVkaW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRPYmplY3RzRnJvbVF1ZXVlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRlZCBPYmplY3RzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2xfV2ViR0xBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsX0xvYWRTaGFkZXJzRnJvbVF1ZXVlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIFNoYWRlcnNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaExvYWRpbmcoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaExvYWRpbmcoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluaXNoTG9hZGluZyhjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgLy8gRG9uZSBsb2FkaW5nXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmp1c3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8qICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMgVU5MT0FEIEZVTkNUSU9OICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuICAgIFxuICAgIHByaXZhdGUga2VlcFJlc291cmNlKGtleTogc3RyaW5nLCB0eXBlOiBSZXNvdXJjZVR5cGUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJLZWVwIHJlc291cmNlLi4uXCIpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXNvdXJjZXNUb1VubG9hZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlc1RvVW5sb2FkW2ldO1xuICAgICAgICAgICAgaWYocmVzb3VyY2Uua2V5ID09PSBrZXkgJiYgcmVzb3VyY2UucmVzb3VyY2VUeXBlID09PSB0eXBlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIHJlc291cmNlIFwiICsga2V5ICsgXCIgb2YgdHlwZSBcIiArIHR5cGUgKyBcIi4gS2VlcGluZy5cIik7XG4gICAgICAgICAgICAgICAgbGV0IHJlc291cmNlVG9Nb3ZlID0gdGhpcy5yZXNvdXJjZXNUb1VubG9hZC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUb0tlZXAucHVzaCguLi5yZXNvdXJjZVRvTW92ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgcmVmZXJlbmNlcyB0byBhbGwgcmVzb3VyY2VzIGluIHRoZSByZXNvdXJjZSBtYW5hZ2VyXG4gICAgICovXG4gICAgdW5sb2FkQWxsUmVzb3VyY2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5qdXN0TG9hZGVkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yKGxldCByZXNvdXJjZSBvZiB0aGlzLnJlc291cmNlc1RvVW5sb2FkKXtcbiAgICAgICAgICAgIC8vIFVubG9hZCB0aGUgcmVzb3VyY2VcbiAgICAgICAgICAgIHRoaXMudW5sb2FkUmVzb3VyY2UocmVzb3VyY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmxvYWRSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2VSZWZlcmVuY2UpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVsZXRlIHRoZSByZXNvdXJjZSBpdHNlbGZcbiAgICAgICAgc3dpdGNoKHJlc291cmNlLnJlc291cmNlVHlwZSl7XG4gICAgICAgICAgICBjYXNlIFJlc291cmNlVHlwZS5JTUFHRTpcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlcy5kZWxldGUocmVzb3VyY2Uua2V5KTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdsX1dlYkdMQWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbF9UZXh0dXJlcy5kZWxldGUocmVzb3VyY2Uua2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlc291cmNlVHlwZS5USUxFTUFQOlxuICAgICAgICAgICAgICAgIHRoaXMudGlsZW1hcHMuZGVsZXRlKHJlc291cmNlLmtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlc291cmNlVHlwZS5TUFJJVEVTSEVFVDpcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXNoZWV0cy5kZWxldGUocmVzb3VyY2Uua2V5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VUeXBlLkFVRElPOlxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9CdWZmZXJzLmRlbGV0ZShyZXNvdXJjZS5rZXkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZXNvdXJjZVR5cGUuSlNPTjpcbiAgICAgICAgICAgICAgICB0aGlzLmpzb25PYmplY3RzLmRlbGV0ZShyZXNvdXJjZS5rZXkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLypjYXNlIFJlc291cmNlVHlwZS5TSEFERVI6XG4gICAgICAgICAgICAgICAgdGhpcy5nbF9TaGFkZXJQcm9ncmFtcy5nZXQocmVzb3VyY2Uua2V5KS5kZWxldGUodGhpcy5nbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nbF9TaGFkZXJQcm9ncmFtcy5kZWxldGUocmVzb3VyY2Uua2V5KTtcbiAgICAgICAgICAgICAgICBicmVhazsqL1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIGFueSBkZXBlbmRlbmNpZXNcbiAgICAgICAgZm9yKGxldCBkZXBlbmRlbmN5IG9mIHJlc291cmNlLmRlcGVuZGVuY2llcyl7XG4gICAgICAgICAgICB0aGlzLnVubG9hZFJlc291cmNlKGRlcGVuZGVuY3kpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBXT1JLIEZVTkNUSU9OUyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjKi9cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhbGwgdGlsZW1hcHMgY3VycmVudGx5IGluIHRoZSB0aWxlbWFwIGxvYWRpbmcgcXVldWVcbiAgICAgKiBAcGFyYW0gb25GaW5pc2hMb2FkaW5nIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gbG9hZGluZyBpcyBjb21wbGV0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZFRpbGVtYXBzRnJvbVF1ZXVlKG9uRmluaXNoTG9hZGluZzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV90aWxlbWFwc1RvTG9hZCA9IHRoaXMubG9hZG9ubHlfdGlsZW1hcExvYWRpbmdRdWV1ZS5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfdGlsZW1hcHNMb2FkZWQgPSAwO1xuXG4gICAgICAgIC8vIElmIG5vIGl0ZW1zIHRvIGxvYWQsIHdlJ3JlIGZpbmlzaGVkXG4gICAgICAgIGlmKHRoaXMubG9hZG9ubHlfdGlsZW1hcHNUb0xvYWQgPT09IDApe1xuICAgICAgICAgICAgb25GaW5pc2hMb2FkaW5nKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSh0aGlzLmxvYWRvbmx5X3RpbGVtYXBMb2FkaW5nUXVldWUuaGFzSXRlbXMoKSl7XG4gICAgICAgICAgICBsZXQgdGlsZW1hcCA9IHRoaXMubG9hZG9ubHlfdGlsZW1hcExvYWRpbmdRdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRUaWxlbWFwKHRpbGVtYXAua2V5LCB0aWxlbWFwLnBhdGgsIG9uRmluaXNoTG9hZGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHNpbmd1bGFyIHRpbGVtYXAgXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSB0aWxlbWFwXG4gICAgICogQHBhcmFtIHBhdGhUb1RpbGVtYXBKU09OIFRoZSBwYXRoIHRvIHRoZSB0aWxlbWFwIEpTT04gZmlsZVxuICAgICAqIEBwYXJhbSBjYWxsYmFja0lmTGFzdCBUaGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGlzIGlzIHRoZSBsYXN0IHRpbGVtYXAgdG8gbG9hZFxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZFRpbGVtYXAoa2V5OiBzdHJpbmcsIHBhdGhUb1RpbGVtYXBKU09OOiBzdHJpbmcsIGNhbGxiYWNrSWZMYXN0OiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRUZXh0RmlsZShwYXRoVG9UaWxlbWFwSlNPTiwgKGZpbGVUZXh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCB0aWxlbWFwT2JqZWN0ID0gPFRpbGVkVGlsZW1hcERhdGE+SlNPTi5wYXJzZShmaWxlVGV4dCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFdlIGNhbiBwYXJzZSB0aGUgb2JqZWN0IGxhdGVyIC0gaXQncyBtdWNoIGZhc3RlciB0aGFuIGxvYWRpbmdcbiAgICAgICAgICAgIHRoaXMudGlsZW1hcHMuYWRkKGtleSwgdGlsZW1hcE9iamVjdCk7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBuZXcgUmVzb3VyY2VSZWZlcmVuY2Uoa2V5LCBSZXNvdXJjZVR5cGUuVElMRU1BUCk7XG5cbiAgICAgICAgICAgIC8vIEdyYWIgdGhlIHRpbGVzZXQgaW1hZ2VzIHdlIG5lZWQgdG8gbG9hZCBhbmQgYWRkIHRoZW0gdG8gdGhlIGltYWdlbG9hZGluZyBxdWV1ZVxuICAgICAgICAgICAgZm9yKGxldCB0aWxlc2V0IG9mIHRpbGVtYXBPYmplY3QudGlsZXNldHMpe1xuICAgICAgICAgICAgICAgIGlmKHRpbGVzZXQuaW1hZ2Upe1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gdGlsZXNldC5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBTdHJpbmdVdGlscy5nZXRQYXRoRnJvbUZpbGVQYXRoKHBhdGhUb1RpbGVtYXBKU09OKSArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2Fkb25seV9pbWFnZUxvYWRpbmdRdWV1ZS5lbnF1ZXVlKHtrZXk6IGtleSwgcGF0aDogcGF0aCwgaXNEZXBlbmRlbmN5OiB0cnVlfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoaXMgaW1hZ2UgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSB0aWxlbWFwXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlLmFkZERlcGVuZGVuY3kobmV3IFJlc291cmNlUmVmZXJlbmNlKGtleSwgUmVzb3VyY2VUeXBlLklNQUdFKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRpbGVzZXQudGlsZXMpe1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHRpbGUgb2YgdGlsZXNldC50aWxlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gdGlsZS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gU3RyaW5nVXRpbHMuZ2V0UGF0aEZyb21GaWxlUGF0aChwYXRoVG9UaWxlbWFwSlNPTikgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRvbmx5X2ltYWdlTG9hZGluZ1F1ZXVlLmVucXVldWUoe2tleToga2V5LCBwYXRoOiBwYXRoLCBpc0RlcGVuZGVuY3k6IHRydWV9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoaXMgaW1hZ2UgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSB0aWxlbWFwXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5hZGREZXBlbmRlbmN5KG5ldyBSZXNvdXJjZVJlZmVyZW5jZShrZXksIFJlc291cmNlVHlwZS5JTUFHRSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHJlc291cmNlIHJlZmVyZW5jZSB0byB0aGUgbGlzdCBvZiByZXNvdXJjZSB0byB1bmxvYWRcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzVG9VbmxvYWQucHVzaChyZXNvdXJjZSk7XG5cbiAgICAgICAgICAgIC8vIEZpbmlzaCBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmZpbmlzaExvYWRpbmdUaWxlbWFwKGNhbGxiYWNrSWZMYXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluaXNoIGxvYWRpbmcgYSB0aWxlbWFwLiBDYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgdGhpcyBpcyB0aGUgbGFzdCB0aWxlbWFwIGJlaW5nIGxvYWRlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGlzIGlzIHRoZSBsYXN0IHRpbGVtYXAgdG8gbG9hZFxuICAgICAqL1xuICAgIHByaXZhdGUgZmluaXNoTG9hZGluZ1RpbGVtYXAoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfdGlsZW1hcHNMb2FkZWQgKz0gMTtcblxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X3RpbGVtYXBzTG9hZGVkID09PSB0aGlzLmxvYWRvbmx5X3RpbGVtYXBzVG9Mb2FkKXtcbiAgICAgICAgICAgIC8vIFdlJ3JlIGRvbmUgbG9hZGluZyB0aWxlbWFwc1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIGFsbCBzcHJpdGVzaGVldHMgY3VycmVudGx5IGluIHRoZSBzcHJpdGVzaGVldCBsb2FkaW5nIHF1ZXVlXG4gICAgICogQHBhcmFtIG9uRmluaXNoTG9hZGluZyBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBzcHJpdGVzaGVldHMgYXJlIGRvbmUgbG9hZGluZ1xuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZFNwcml0ZXNoZWV0c0Zyb21RdWV1ZShvbkZpbmlzaExvYWRpbmc6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfc3ByaXRlc2hlZXRzVG9Mb2FkID0gdGhpcy5sb2Fkb25seV9zcHJpdGVzaGVldExvYWRpbmdRdWV1ZS5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfc3ByaXRlc2hlZXRzTG9hZGVkID0gMDtcblxuICAgICAgICAvLyBJZiBubyBpdGVtcyB0byBsb2FkLCB3ZSdyZSBmaW5pc2hlZFxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0c1RvTG9hZCA9PT0gMCl7XG4gICAgICAgICAgICBvbkZpbmlzaExvYWRpbmcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKHRoaXMubG9hZG9ubHlfc3ByaXRlc2hlZXRMb2FkaW5nUXVldWUuaGFzSXRlbXMoKSl7XG4gICAgICAgICAgICBsZXQgc3ByaXRlc2hlZXQgPSB0aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0TG9hZGluZ1F1ZXVlLmRlcXVldWUoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZXNoZWV0KHNwcml0ZXNoZWV0LmtleSwgc3ByaXRlc2hlZXQucGF0aCwgb25GaW5pc2hMb2FkaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIGEgc2luZ3VsYXIgc3ByaXRlc2hlZXQgXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBzcHJpdGVzaGVldCB0byBsb2FkXG4gICAgICogQHBhcmFtIHBhdGhUb1Nwcml0ZXNoZWV0SlNPTiBUaGUgcGF0aCB0byB0aGUgc3ByaXRlc2hlZXQgSlNPTiBmaWxlXG4gICAgICogQHBhcmFtIGNhbGxiYWNrSWZMYXN0IFRoZSBmdW5jdGlvbiB0byBjYWxsIGlmIHRoaXMgaXMgdGhlIGxhc3Qgc3ByaXRlc2hlZXRcbiAgICAgKi9cbiAgICBwcml2YXRlIGxvYWRTcHJpdGVzaGVldChrZXk6IHN0cmluZywgcGF0aFRvU3ByaXRlc2hlZXRKU09OOiBzdHJpbmcsIGNhbGxiYWNrSWZMYXN0OiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRUZXh0RmlsZShwYXRoVG9TcHJpdGVzaGVldEpTT04sIChmaWxlVGV4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3ByaXRlc2hlZXQgPSA8U3ByaXRlc2hlZXQ+SlNPTi5wYXJzZShmaWxlVGV4dCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFdlIGNhbiBwYXJzZSB0aGUgb2JqZWN0IGxhdGVyIC0gaXQncyBtdWNoIGZhc3RlciB0aGFuIGxvYWRpbmdcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc2hlZXRzLmFkZChrZXksIHNwcml0ZXNoZWV0KTtcblxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gbmV3IFJlc291cmNlUmVmZXJlbmNlKGtleSwgUmVzb3VyY2VUeXBlLlNQUklURVNIRUVUKTtcblxuICAgICAgICAgICAgLy8gR3JhYiB0aGUgaW1hZ2Ugd2UgbmVlZCB0byBsb2FkIGFuZCBhZGQgaXQgdG8gdGhlIGltYWdlbG9hZGluZyBxdWV1ZVxuICAgICAgICAgICAgbGV0IHBhdGggPSBTdHJpbmdVdGlscy5nZXRQYXRoRnJvbUZpbGVQYXRoKHBhdGhUb1Nwcml0ZXNoZWV0SlNPTikgKyBzcHJpdGVzaGVldC5zcHJpdGVTaGVldEltYWdlO1xuICAgICAgICAgICAgdGhpcy5sb2Fkb25seV9pbWFnZUxvYWRpbmdRdWV1ZS5lbnF1ZXVlKHtrZXk6IHNwcml0ZXNoZWV0Lm5hbWUsIHBhdGg6IHBhdGgsIGlzRGVwZW5kZW5jeTogdHJ1ZX0pO1xuXG4gICAgICAgICAgICByZXNvdXJjZS5hZGREZXBlbmRlbmN5KG5ldyBSZXNvdXJjZVJlZmVyZW5jZShzcHJpdGVzaGVldC5uYW1lLCBSZXNvdXJjZVR5cGUuSU1BR0UpKTtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzVG9VbmxvYWQucHVzaChyZXNvdXJjZSk7XG5cbiAgICAgICAgICAgIC8vIEZpbmlzaCBsb2FkaW5nXG4gICAgICAgICAgICB0aGlzLmZpbmlzaExvYWRpbmdTcHJpdGVzaGVldChjYWxsYmFja0lmTGFzdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmlzaCBsb2FkaW5nIGEgc3ByaXRlc2hlZXQuIENhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiB0aGlzIGlzIHRoZSBsYXN0IHNwcml0ZXNoZWV0IGJlaW5nIGxvYWRlZFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGlzIGlzIHRoZSBsYXN0IHNwcml0ZXNoZWV0IHRvIGxvYWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGZpbmlzaExvYWRpbmdTcHJpdGVzaGVldChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9zcHJpdGVzaGVldHNMb2FkZWQgKz0gMTtcblxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0c0xvYWRlZCA9PT0gdGhpcy5sb2Fkb25seV9zcHJpdGVzaGVldHNUb0xvYWQpe1xuICAgICAgICAgICAgLy8gV2UncmUgZG9uZSBsb2FkaW5nIHNwcml0ZXNoZWV0c1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIGFsbCBpbWFnZXMgY3VycmVudGx5IGluIHRoZSBpbWFnZSBsb2FkaW5nIHF1ZXVlXG4gICAgICogQHBhcmFtIG9uRmluaXNoTG9hZGluZyBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGltYWdlcyB0byBsb2FkXG4gICAgICovXG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzRnJvbVF1ZXVlKG9uRmluaXNoTG9hZGluZzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9pbWFnZXNUb0xvYWQgPSB0aGlzLmxvYWRvbmx5X2ltYWdlTG9hZGluZ1F1ZXVlLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9pbWFnZXNMb2FkZWQgPSAwO1xuXG4gICAgICAgIC8vIElmIG5vIGl0ZW1zIHRvIGxvYWQsIHdlJ3JlIGZpbmlzaGVkXG4gICAgICAgIGlmKHRoaXMubG9hZG9ubHlfaW1hZ2VzVG9Mb2FkID09PSAwKXtcbiAgICAgICAgICAgIG9uRmluaXNoTG9hZGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUodGhpcy5sb2Fkb25seV9pbWFnZUxvYWRpbmdRdWV1ZS5oYXNJdGVtcygpKXtcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IHRoaXMubG9hZG9ubHlfaW1hZ2VMb2FkaW5nUXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoaW1hZ2Uua2V5LCBpbWFnZS5wYXRoLCBpbWFnZS5pc0RlcGVuZGVuY3ksIG9uRmluaXNoTG9hZGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHNpbmd1bGFyIGltYWdlXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBpbWFnZSB0byBsb2FkXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGhlIGltYWdlIHRvIGxvYWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tJZkxhc3QgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgaWYgdGhpcyBpcyB0aGUgbGFzdCBpbWFnZVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkSW1hZ2Uoa2V5OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaXNEZXBlbmRlbmN5OiBib29sZWFuLCBjYWxsYmFja0lmTGFzdDogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIHRvIGxvYWRlZCBpbWFnZXNcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLmFkZChrZXksIGltYWdlKTtcblxuICAgICAgICAgICAgLy8gSWYgbm90IGEgZGVwZW5kZW5jeSwgcHVzaCBpdCB0byB0aGUgdW5sb2FkIGxpc3QuIE90aGVyd2lzZSBpdCdzIG1hbmFnZWQgYnkgc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGlmKCFpc0RlcGVuZGVuY3kpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzVG9VbmxvYWQucHVzaChuZXcgUmVzb3VyY2VSZWZlcmVuY2Uoa2V5LCBSZXNvdXJjZVR5cGUuSU1BR0UpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgV2ViR0wgaXMgYWN0aXZlLCBjcmVhdGUgYSB0ZXh0dXJlXG4gICAgICAgICAgICBpZih0aGlzLmdsX1dlYkdMQWN0aXZlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVdlYkdMVGV4dHVyZShrZXksIGltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmluaXNoIGltYWdlIGxvYWRcbiAgICAgICAgICAgIHRoaXMuZmluaXNoTG9hZGluZ0ltYWdlKGNhbGxiYWNrSWZMYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlLnNyYyA9IHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluaXNoIGxvYWRpbmcgYW4gaW1hZ2UuIElmIHRoaXMgaXMgdGhlIGxhc3QgaW1hZ2UsIGl0IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGlzIGlzIHRoZSBsYXN0IGltYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBmaW5pc2hMb2FkaW5nSW1hZ2UoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfaW1hZ2VzTG9hZGVkICs9IDE7XG5cbiAgICAgICAgaWYodGhpcy5sb2Fkb25seV9pbWFnZXNMb2FkZWQgPT09IHRoaXMubG9hZG9ubHlfaW1hZ2VzVG9Mb2FkICl7XG4gICAgICAgICAgICAvLyBXZSdyZSBkb25lIGxvYWRpbmcgaW1hZ2VzXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYWxsIGF1ZGlvIGN1cnJlbnRseSBpbiB0aGUgdGlsZW1hcCBsb2FkaW5nIHF1ZXVlXG4gICAgICogQHBhcmFtIG9uRmluaXNoTG9hZGluZyBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRpbGVtYXBzIGFyZSBkb25lIGxvYWRpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGxvYWRBdWRpb0Zyb21RdWV1ZShvbkZpbmlzaExvYWRpbmc6IEZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9hdWRpb1RvTG9hZCA9IHRoaXMubG9hZG9ubHlfYXVkaW9Mb2FkaW5nUXVldWUuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2F1ZGlvTG9hZGVkID0gMDtcblxuICAgICAgICAvLyBJZiBubyBpdGVtcyB0byBsb2FkLCB3ZSdyZSBmaW5pc2hlZFxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X2F1ZGlvVG9Mb2FkID09PSAwKXtcbiAgICAgICAgICAgIG9uRmluaXNoTG9hZGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUodGhpcy5sb2Fkb25seV9hdWRpb0xvYWRpbmdRdWV1ZS5oYXNJdGVtcygpKXtcbiAgICAgICAgICAgIGxldCBhdWRpbyA9IHRoaXMubG9hZG9ubHlfYXVkaW9Mb2FkaW5nUXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkQXVkaW8oYXVkaW8ua2V5LCBhdWRpby5wYXRoLCBvbkZpbmlzaExvYWRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBhIHNpbmd1bGFyIGF1ZGlvIGZpbGVcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gdGhlIGF1ZGlvIGZpbGUgdG8gbG9hZFxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhdWRpbyBmaWxlIHRvIGxvYWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tJZkxhc3QgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgaWYgdGhpcyBpcyB0aGUgbGFzdCBhdWRpbyBmaWxlIHRvIGxvYWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGxvYWRBdWRpbyhrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nLCBjYWxsYmFja0lmTGFzdDogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgbGV0IGF1ZGlvQ3R4ID0gQXVkaW9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXVkaW9Db250ZXh0KCk7XG5cbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgYXVkaW9DdHguZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIChidWZmZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdG8gbGlzdCBvZiBhdWRpbyBidWZmZXJzXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0J1ZmZlcnMuYWRkKGtleSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlc1RvVW5sb2FkLnB1c2gobmV3IFJlc291cmNlUmVmZXJlbmNlKGtleSwgUmVzb3VyY2VUeXBlLkFVRElPKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBGaW5pc2ggbG9hZGluZyBzb3VuZFxuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoTG9hZGluZ0F1ZGlvKGNhbGxiYWNrSWZMYXN0KTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT57XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJFcnJvciBsb2FkaW5nIHNvdW5kXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5pc2ggbG9hZGluZyBhbiBhdWRpbyBmaWxlLiBDYWxscyB0aGUgY2FsbGJhY2sgZnVuY3RvbiBpZiB0aGlzIGlzIHRoZSBsYXN0IGF1ZGlvIHNhbXBsZSBiZWluZyBsb2FkZWQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBjYWxsIGlmIHRoaXMgaXMgdGhlIGxhc3QgYXVkaW8gZmlsZSB0byBsb2FkXG4gICAgICovXG4gICAgcHJpdmF0ZSBmaW5pc2hMb2FkaW5nQXVkaW8oY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfYXVkaW9Mb2FkZWQgKz0gMTtcblxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X2F1ZGlvTG9hZGVkID09PSB0aGlzLmxvYWRvbmx5X2F1ZGlvVG9Mb2FkKXtcbiAgICAgICAgICAgIC8vIFdlJ3JlIGRvbmUgbG9hZGluZyBhdWRpb1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIGFsbCBvYmplY3RzIGN1cnJlbnRseSBpbiB0aGUgb2JqZWN0IGxvYWRpbmcgcXVldWVcbiAgICAgKiBAcGFyYW0gb25GaW5pc2hMb2FkaW5nIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlcmUgYXJlIG5vIG1vcmUgb2JqZWN0cyB0byBsb2FkXG4gICAgICovXG4gICAgcHJpdmF0ZSBsb2FkT2JqZWN0c0Zyb21RdWV1ZShvbkZpbmlzaExvYWRpbmc6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfanNvblRvTG9hZCA9IHRoaXMubG9hZG9ubHlfanNvbkxvYWRpbmdRdWV1ZS5nZXRTaXplKCk7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfanNvbkxvYWRlZCA9IDA7XG5cbiAgICAgICAgLy8gSWYgbm8gaXRlbXMgdG8gbG9hZCwgd2UncmUgZmluaXNoZWRcbiAgICAgICAgaWYodGhpcy5sb2Fkb25seV9qc29uVG9Mb2FkID09PSAwKXtcbiAgICAgICAgICAgIG9uRmluaXNoTG9hZGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUodGhpcy5sb2Fkb25seV9qc29uTG9hZGluZ1F1ZXVlLmhhc0l0ZW1zKCkpe1xuICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMubG9hZG9ubHlfanNvbkxvYWRpbmdRdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRPYmplY3Qob2JqLmtleSwgb2JqLnBhdGgsIG9uRmluaXNoTG9hZGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHNpbmd1bGFyIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgb2JqZWN0IHRvIGxvYWRcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgb2JqZWN0IHRvIGxvYWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tJZkxhc3QgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgaWYgdGhpcyBpcyB0aGUgbGFzdCBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZE9iamVjdChrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nLCBjYWxsYmFja0lmTGFzdDogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkVGV4dEZpbGUocGF0aCwgKGZpbGVUZXh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGZpbGVUZXh0KTtcbiAgICAgICAgICAgIHRoaXMuanNvbk9iamVjdHMuYWRkKGtleSwgb2JqKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUb1VubG9hZC5wdXNoKG5ldyBSZXNvdXJjZVJlZmVyZW5jZShrZXksIFJlc291cmNlVHlwZS5KU09OKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZmluaXNoTG9hZGluZ09iamVjdChjYWxsYmFja0lmTGFzdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmlzaCBsb2FkaW5nIGFuIG9iamVjdC4gSWYgdGhpcyBpcyB0aGUgbGFzdCBvYmplY3QsIGl0IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY2FsbCBpZiB0aGlzIGlzIHRoZSBsYXN0IG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZmluaXNoTG9hZGluZ09iamVjdChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2Fkb25seV9qc29uTG9hZGVkICs9IDE7XG5cbiAgICAgICAgaWYodGhpcy5sb2Fkb25seV9qc29uTG9hZGVkID09PSB0aGlzLmxvYWRvbmx5X2pzb25Ub0xvYWQpe1xuICAgICAgICAgICAgLy8gV2UncmUgZG9uZSBsb2FkaW5nIG9iamVjdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiAjIyMjIyMjIyMjIFdFQkdMIFNQRUNJRklDIEZVTkNUSU9OUyAjIyMjIyMjIyMjICovXG5cbiAgICBwdWJsaWMgZ2V0VGV4dHVyZShrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdsX1RleHR1cmVzLmdldChrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaGFkZXJQcm9ncmFtKGtleTogc3RyaW5nKTogV2ViR0xQcm9ncmFtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xfU2hhZGVyUHJvZ3JhbXMuZ2V0KGtleSkucHJvZ3JhbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QnVmZmVyKGtleTogc3RyaW5nKTogV2ViR0xCdWZmZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nbF9CdWZmZXJzLmdldChrZXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlV2ViR0xUZXh0dXJlKGltYWdlS2V5OiBzdHJpbmcsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIC8vIEdldCB0aGUgdGV4dHVyZSBJRFxuICAgICAgICBjb25zdCB0ZXh0dXJlSUQgPSB0aGlzLmdldFRleHR1cmVJRCh0aGlzLmdsX05leHRUZXh0dXJlSUQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdGV4dHVyZVxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgICAgICAgLy8gU2V0IHVwIHRoZSB0ZXh0dXJlXG4gICAgICAgIC8vIEVuYWJsZSB0ZXh0dXJlMFxuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGV4dHVyZUlEKTtcblxuICAgICAgICAvLyBCaW5kIG91ciB0ZXh0dXJlIHRvIHRleHR1cmUgMFxuICAgICAgICB0aGlzLmdsLmJpbmRUZXh0dXJlKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB0ZXh0dXJlIHBhcmFtZXRlcnNcbiAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX1dSQVBfUywgdGhpcy5nbC5DTEFNUF9UT19FREdFKTtcbiAgICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX1dSQVBfVCwgdGhpcy5nbC5DTEFNUF9UT19FREdFKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHRleHR1cmUgaW1hZ2VcbiAgICAgICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlJHQkEsIHRoaXMuZ2wuVU5TSUdORURfQllURSwgaW1hZ2UpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgdGV4dHVyZSB0byBvdXIgbWFwIHdpdGggdGhlIHNhbWUga2V5IGFzIHRoZSBpbWFnZVxuICAgICAgICB0aGlzLmdsX1RleHR1cmVzLmFkZChpbWFnZUtleSwgdGhpcy5nbF9OZXh0VGV4dHVyZUlEKTtcblxuICAgICAgICAvLyBJbmNyZW1lbnQgdGhlIGtleVxuICAgICAgICB0aGlzLmdsX05leHRUZXh0dXJlSUQgKz0gMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRleHR1cmVJRChpZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gU3RhcnQgd2l0aCA5IGNhc2VzIC0gdGhpcyBjYW4gYmUgZXhwYW5kZWQgaWYgbmVlZGVkLCBidXQgZm9yIHRoZSBiZXN0IHBlcmZvcm1hbmNlLFxuICAgICAgICAvLyBUZXh0dXJlcyBzaG91bGQgYmUgc3RpdGNoZWQgaW50byBhbiBhdGxhc1xuICAgICAgICBzd2l0Y2goaWQpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gdGhpcy5nbC5URVhUVVJFMDtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHRoaXMuZ2wuVEVYVFVSRTE7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiB0aGlzLmdsLlRFWFRVUkUyO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gdGhpcy5nbC5URVhUVVJFMztcbiAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIHRoaXMuZ2wuVEVYVFVSRTQ7XG4gICAgICAgICAgICBjYXNlIDU6IHJldHVybiB0aGlzLmdsLlRFWFRVUkU1O1xuICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gdGhpcy5nbC5URVhUVVJFNjtcbiAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIHRoaXMuZ2wuVEVYVFVSRTc7XG4gICAgICAgICAgICBjYXNlIDg6IHJldHVybiB0aGlzLmdsLlRFWFRVUkU4O1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHRoaXMuZ2wuVEVYVFVSRTk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQnVmZmVyKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuZ2xfV2ViR0xBY3RpdmUpe1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2xfQnVmZmVycy5hZGQoa2V5LCBidWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5xdWV1ZXMgbG9hZGluZyBvZiBhIG5ldyBzaGFkZXIgcHJvZ3JhbVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgc2hhZGVyIHByb2dyYW1cbiAgICAgKiBAcGFyYW0gdlNoYWRlckZpbGVwYXRoIFxuICAgICAqIEBwYXJhbSBmU2hhZGVyRmlsZXBhdGggXG4gICAgICovXG4gICAgcHVibGljIHNoYWRlcihrZXk6IHN0cmluZywgdlNoYWRlckZpbGVwYXRoOiBzdHJpbmcsIGZTaGFkZXJGaWxlcGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBzcGxpdFBhdGggPSB2U2hhZGVyRmlsZXBhdGguc3BsaXQoXCIuXCIpO1xuICAgICAgICBsZXQgZW5kID0gc3BsaXRQYXRoW3NwbGl0UGF0aC5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZihlbmQgIT09IFwidnNoYWRlclwiKXtcbiAgICAgICAgICAgIHRocm93IGAke3ZTaGFkZXJGaWxlcGF0aH0gaXMgbm90IGEgdmFsaWQgdmVydGV4IHNoYWRlciAtIG11c3QgZW5kIGluIFwiLnZzaGFkZXJgO1xuICAgICAgICB9XG5cbiAgICAgICAgc3BsaXRQYXRoID0gZlNoYWRlckZpbGVwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgZW5kID0gc3BsaXRQYXRoW3NwbGl0UGF0aC5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZihlbmQgIT09IFwiZnNoYWRlclwiKXtcbiAgICAgICAgICAgIHRocm93IGAke2ZTaGFkZXJGaWxlcGF0aH0gaXMgbm90IGEgdmFsaWQgdmVydGV4IHNoYWRlciAtIG11c3QgZW5kIGluIFwiLmZzaGFkZXJgO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhdGhzID0gbmV3IEtleVBhdGhfU2hhZGVyKCk7XG4gICAgICAgIHBhdGhzLmtleSA9IGtleTtcbiAgICAgICAgcGF0aHMudnBhdGggPSB2U2hhZGVyRmlsZXBhdGg7XG4gICAgICAgIHBhdGhzLmZwYXRoID0gZlNoYWRlckZpbGVwYXRoO1xuXG4gICAgICAgIHRoaXMubG9hZG9ubHlfZ2xfU2hhZGVyTG9hZGluZ1F1ZXVlLmVucXVldWUocGF0aHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSByZXNvdXJjZSBtYW5hZ2VyIHRvIGtlZXAgdGhpcyByZXNvdXJjZVxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSBvZiB0aGUgcmVzb3VyY2VcbiAgICAgKi9cbiAgICAgcHVibGljIGtlZXBTaGFkZXIoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZWVwUmVzb3VyY2Uoa2V5LCBSZXNvdXJjZVR5cGUuSU1BR0UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2xfTG9hZFNoYWRlcnNGcm9tUXVldWUob25GaW5pc2hMb2FkaW5nOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zVG9Mb2FkID0gdGhpcy5sb2Fkb25seV9nbF9TaGFkZXJMb2FkaW5nUXVldWUuZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zTG9hZGVkID0gMDtcblxuICAgICAgICAvLyBJZiB3ZWJHTCBpc24nYWN0aXZlIG9yIHRoZXJlIGFyZSBubyBpdGVtcyB0byBsb2FkLCB3ZSdyZSBmaW5pc2hlZFxuICAgICAgICBpZighdGhpcy5nbF9XZWJHTEFjdGl2ZSB8fCB0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zVG9Mb2FkID09PSAwKXtcbiAgICAgICAgICAgIG9uRmluaXNoTG9hZGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUodGhpcy5sb2Fkb25seV9nbF9TaGFkZXJMb2FkaW5nUXVldWUuaGFzSXRlbXMoKSl7XG4gICAgICAgICAgICBsZXQgc2hhZGVyID0gdGhpcy5sb2Fkb25seV9nbF9TaGFkZXJMb2FkaW5nUXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgdGhpcy5nbF9Mb2FkU2hhZGVyKHNoYWRlci5rZXksIHNoYWRlci52cGF0aCwgc2hhZGVyLmZwYXRoLCBvbkZpbmlzaExvYWRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnbF9Mb2FkU2hhZGVyKGtleTogc3RyaW5nLCB2cGF0aDogc3RyaW5nLCBmcGF0aDogc3RyaW5nLCBjYWxsYmFja0lmTGFzdDogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkVGV4dEZpbGUodnBhdGgsICh2RmlsZVRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdlNoYWRlciA9IHZGaWxlVGV4dDtcblxuICAgICAgICAgICAgdGhpcy5sb2FkVGV4dEZpbGUoZnBhdGgsIChmRmlsZVRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZTaGFkZXIgPSBmRmlsZVRleHRcblxuICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgdGhlIHByb2dyYW0gYW5kIHNoYWRlcnNcbiAgICAgICAgICAgICAgICBjb25zdCBbc2hhZGVyUHJvZ3JhbSwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcl0gPSB0aGlzLmNyZWF0ZVNoYWRlclByb2dyYW0odlNoYWRlciwgZlNoYWRlcik7XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSB3cmFwcGVyIHR5cGVcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmFtV3JhcHBlciA9IG5ldyBXZWJHTFByb2dyYW1UeXBlKCk7XG4gICAgICAgICAgICAgICAgcHJvZ3JhbVdyYXBwZXIucHJvZ3JhbSA9IHNoYWRlclByb2dyYW07XG4gICAgICAgICAgICAgICAgcHJvZ3JhbVdyYXBwZXIudmVydGV4U2hhZGVyID0gdmVydGV4U2hhZGVyO1xuICAgICAgICAgICAgICAgIHByb2dyYW1XcmFwcGVyLmZyYWdtZW50U2hhZGVyID0gZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdG8gb3VyIG1hcFxuICAgICAgICAgICAgICAgIHRoaXMuZ2xfU2hhZGVyUHJvZ3JhbXMuYWRkKGtleSwgcHJvZ3JhbVdyYXBwZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUb1VubG9hZC5wdXNoKG5ldyBSZXNvdXJjZVJlZmVyZW5jZShrZXksIFJlc291cmNlVHlwZS5TSEFERVIpKTtcblxuICAgICAgICAgICAgICAgIC8vIEZpbmlzaCBsb2FkaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5nbF9GaW5pc2hMb2FkaW5nU2hhZGVyKGNhbGxiYWNrSWZMYXN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdsX0ZpbmlzaExvYWRpbmdTaGFkZXIoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZG9ubHlfZ2xfU2hhZGVyUHJvZ3JhbXNMb2FkZWQgKz0gMTtcblxuICAgICAgICBpZih0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zTG9hZGVkID09PSB0aGlzLmxvYWRvbmx5X2dsX1NoYWRlclByb2dyYW1zVG9Mb2FkKXtcbiAgICAgICAgICAgIC8vIFdlJ3JlIGRvbmUgbG9hZGluZyBzaGFkZXJzXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTaGFkZXJQcm9ncmFtKHZTaGFkZXJTb3VyY2U6IHN0cmluZywgZlNoYWRlclNvdXJjZTogc3RyaW5nKXtcbiAgICAgICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5sb2FkVmVydGV4U2hhZGVyKHZTaGFkZXJTb3VyY2UpO1xuICAgICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMubG9hZEZyYWdtZW50U2hhZGVyKGZTaGFkZXJTb3VyY2UpO1xuICAgIFxuICAgICAgICBpZih2ZXJ0ZXhTaGFkZXIgPT09IG51bGwgfHwgZnJhZ21lbnRTaGFkZXIgPT09IG51bGwpe1xuICAgICAgICAgICAgLy8gV2UgaGFkIGEgcHJvYmxlbSBpbnRpYWxpemluZyAtIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBDcmVhdGUgYSBzaGFkZXIgcHJvZ3JhbVxuICAgICAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGlmKCFwcm9ncmFtKSB7XG4gICAgICAgICAgICAvLyBFcnJvciBjcmVhdGluZ1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGNyZWF0ZSBwcm9ncmFtXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gQXR0YWNoIG91ciB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlclxuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgXG4gICAgICAgIC8vIExpbmtcbiAgICAgICAgdGhpcy5nbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgICAgaWYoIXRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCB0aGlzLmdsLkxJTktfU1RBVFVTKSl7XG4gICAgICAgICAgICAvLyBFcnJvciBsaW5raW5nXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSk7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gbGluayBwcm9ncmFtOiBcIiArIGVycm9yKTtcbiAgICBcbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICAgICAgdGhpcy5nbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gV2Ugc3VjY2Vzc2Z1bGx5IGNyZWF0ZSBhIHByb2dyYW1cbiAgICAgICAgcmV0dXJuIFtwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyXTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBsb2FkVmVydGV4U2hhZGVyKHNoYWRlclNvdXJjZTogc3RyaW5nKTogV2ViR0xTaGFkZXJ7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggc2hhZGVyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSLCBzaGFkZXJTb3VyY2UpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGxvYWRGcmFnbWVudFNoYWRlcihzaGFkZXJTb3VyY2U6IHN0cmluZyk6IFdlYkdMU2hhZGVye1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZnJhZ21lbnQgc2hhZGVyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIHNoYWRlclNvdXJjZSk7XHRcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBsb2FkU2hhZGVyKHR5cGU6IG51bWJlciwgc2hhZGVyU291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlcntcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgXG4gICAgICAgIC8vIElmIHdlIGNvdWxkbid0IGNyZWF0ZSB0aGUgc2hhZGVyLCBlcnJvclxuICAgICAgICBpZihzaGFkZXIgPT09IG51bGwpe1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGNyZWF0ZSBzaGFkZXJcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBBZGQgdGhlIHNvdXJjZSB0byB0aGUgc2hhZGVyIGFuZCBjb21waWxlXG4gICAgICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU291cmNlKTtcbiAgICAgICAgdGhpcy5nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSB3ZXJlIG5vIGVycm9ycyBkdXJpbmcgdGhpcyBwcm9jZXNzXG4gICAgICAgIGlmKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKXtcbiAgICAgICAgICAgIC8vIE5vdCBjb21waWxlZCAtIGVycm9yXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGNvbXBpbGUgc2hhZGVyOiBcIiArIGVycm9yKTtcbiAgICBcbiAgICAgICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgICAgICB0aGlzLmdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gU3VjZXNzLCBzbyByZXR1cm4gdGhlIHNoYWRlclxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH1cblxuICAgIC8qICMjIyMjIyMjIyMgR0VORVJBTCBMT0FESU5HIEZVTkNUSU9OUyAjIyMjIyMjIyMjICovXG5cbiAgICBwcml2YXRlIGxvYWRUZXh0RmlsZSh0ZXh0RmlsZVBhdGg6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIGxldCB4b2JqOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4b2JqLm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICB4b2JqLm9wZW4oJ0dFVCcsIHRleHRGaWxlUGF0aCwgdHJ1ZSk7XG4gICAgICAgIHhvYmoub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCh4b2JqLnJlYWR5U3RhdGUgPT0gNCkgJiYgKHhvYmouc3RhdHVzID09IDIwMCkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4b2JqLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhvYmouc2VuZChudWxsKTtcbiAgICB9XG5cbiAgICAvKiAjIyMjIyMjIyMjIExPQURJTkcgQkFSIElORk8gIyMjIyMjIyMjIyAqL1xuXG4gICAgcHJpdmF0ZSBnZXRMb2FkUGVyY2VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMubG9hZG9ubHlfdGlsZW1hcHNMb2FkZWQvdGhpcy5sb2Fkb25seV90aWxlbWFwc1RvTG9hZFxuICAgICAgICAgICAgKyB0aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0c0xvYWRlZC90aGlzLmxvYWRvbmx5X3Nwcml0ZXNoZWV0c1RvTG9hZFxuICAgICAgICAgICAgKyB0aGlzLmxvYWRvbmx5X2ltYWdlc0xvYWRlZC90aGlzLmxvYWRvbmx5X2ltYWdlc1RvTG9hZFxuICAgICAgICAgICAgKyB0aGlzLmxvYWRvbmx5X2F1ZGlvTG9hZGVkL3RoaXMubG9hZG9ubHlfYXVkaW9Ub0xvYWQpXG4gICAgICAgICAgICAvIHRoaXMubG9hZG9ubHlfdHlwZXNUb0xvYWQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKGRlbHRhVDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMubG9hZGluZyl7XG4gICAgICAgICAgICBpZih0aGlzLm9uTG9hZFByb2dyZXNzKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZFByb2dyZXNzKHRoaXMuZ2V0TG9hZFBlcmNlbnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmp1c3RMb2FkZWQpe1xuICAgICAgICAgICAgdGhpcy5qdXN0TG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZih0aGlzLm9uTG9hZENvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRpbmcgYSByZWZlcmVuY2UgdG8gYSByZXNvdXJjZS5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgdGhlIGV4ZW1wdGlvbiBsaXN0IHRvIGFzc3VyZSBhc3NldHMgYW5kIHRoZWlyIGRlcGVuZGVuY2llcyBkb24ndCBnZXRcbiAqIGRlc3Ryb3llZCBpZiB0aGV5IGFyZSBzdGlsbCBuZWVkZWQuXG4gKi9cbmNsYXNzIFJlc291cmNlUmVmZXJlbmNlIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICByZXNvdXJjZVR5cGU6IFJlc291cmNlVHlwZTtcbiAgICBkZXBlbmRlbmNpZXM6IEFycmF5PFJlc291cmNlUmVmZXJlbmNlPjtcblxuICAgIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nLCByZXNvdXJjZVR5cGU6IFJlc291cmNlVHlwZSl7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnJlc291cmNlVHlwZSA9IHJlc291cmNlVHlwZTtcbiAgICAgICAgdGhpcy4gZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG4gICAgYWRkRGVwZW5kZW5jeShyZXNvdXJjZTogUmVzb3VyY2VSZWZlcmVuY2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXMucHVzaChyZXNvdXJjZSk7XG4gICAgfVxufVxuXG5cbmVudW0gUmVzb3VyY2VUeXBlIHtcbiAgICBJTUFHRSA9IFwiSU1BR0VcIixcbiAgICBUSUxFTUFQID0gXCJUSUxFTUFQXCIsXG4gICAgU1BSSVRFU0hFRVQgPSBcIlNQUklURVNIRUVUXCIsXG4gICAgQVVESU8gPSBcIkFVRElPXCIsXG4gICAgSlNPTiA9IFwiSlNPTlwiLFxuICAgIFNIQURFUiA9IFwiU0hBREVSXCJcbn1cblxuLyoqXG4gKiBBIHBhaXIgcmVwcmVzZW50aW5nIGEga2V5IGFuZCB0aGUgcGF0aCBvZiB0aGUgcmVzb3VyY2UgdG8gbG9hZFxuICovXG5jbGFzcyBLZXlQYXRoUGFpciB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGlzRGVwZW5kZW5jeT86IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuY2xhc3MgS2V5UGF0aF9TaGFkZXIge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHZwYXRoOiBzdHJpbmc7XG4gICAgZnBhdGg6IHN0cmluZztcbn0iLCJpbXBvcnQgU2NlbmUgZnJvbSBcIi4vU2NlbmVcIjtcbmltcG9ydCBNYXRoVXRpbHMgZnJvbSBcIi4uL1V0aWxzL01hdGhVdGlsc1wiO1xuaW1wb3J0IEdhbWVOb2RlIGZyb20gXCIuLi9Ob2Rlcy9HYW1lTm9kZVwiO1xuXG5cbi8qKlxuICogQSBsYXllciBpbiB0aGUgc2NlbmUuIExheWVycyBhcmUgdXNlZCBmb3Igc29ydGluZyBAcmVmZXJlbmNlW0dhbWVOb2RlXXMgYnkgZGVwdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcbiAgICAvKiogVGhlIHNjZW5lIHRoaXMgbGF5ZXIgYmVsb25ncyB0byAqL1xuICAgIHByb3RlY3RlZCBzY2VuZTogU2NlbmU7XG5cbiAgICAvKiogVGhlIG5hbWUgb2YgdGhpcyBsYXllciAqL1xuICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGlzIGxheWVyIGlzIHBhdXNlZCBvciBub3QgKi9cbiAgICBwcm90ZWN0ZWQgcGF1c2VkOiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhpcyBsYXllciBpcyBoaWRkZW4gZnJvbSBiZWluZyByZW5kZXJlZCBvciBub3QgKi9cbiAgICBwcm90ZWN0ZWQgaGlkZGVuOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBnbG9iYWwgYWxwaGEgbGV2ZWwgb2YgdGhpcyBsYXllciAqL1xuICAgIHByb3RlY3RlZCBhbHBoYTogbnVtYmVyO1xuXG4gICAgLyoqIEFuIGFycmF5IG9mIHRoZSBHYW1lTm9kZXMgdGhhdCBiZWxvbmcgdG8gdGhpcyBsYXllciAqL1xuICAgIHByb3RlY3RlZCBpdGVtczogQXJyYXk8R2FtZU5vZGU+O1xuXG4gICAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgbGF5ZXIgc2hvdWxkIGJlIHlzb3J0ZWQgKi9cbiAgICBwcm90ZWN0ZWQgeVNvcnQ6IGJvb2xlYW47XG5cbiAgICAvKiogVGhlIGRlcHRoIG9mIHRoaXMgbGF5ZXIgY29tcGFyZWQgdG8gb3RoZXIgbGF5ZXJzICovXG4gICAgcHJvdGVjdGVkIGRlcHRoOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGxheWVyLiBUbyBkbyB0aGlzIGluIGEgZ2FtZSwgdXNlIHRoZSBhZGRMYXllcigpIG1ldGhvZCBpbiBAcmVmcmVuY2VbU2NlbmVdXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBhZGQgdGhlIGxheWVyIHRvXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGxheWVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2NlbmU6IFNjZW5lLCBuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICB0aGlzLml0ZW1zID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMueVNvcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXB0aCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmVpdmVzIHRoZSBuYW1lIG9mIHRoZSBsYXllclxuICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBsYXllclxuICAgICAqL1xuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXVzZXMvVW5wYXVzZXMgdGhlIGxheWVyLiBBZmZlY3RzIGFsbCBlbGVtZW50cyBpbiB0aGlzIGxheWVyXG4gICAgICogQHBhcmFtIHBhdXNlVmFsdWUgVHJ1ZSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIHBhdXNlZCwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgc2V0UGF1c2VkKHBhdXNlVmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBwYXVzZVZhbHVlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBsYXllciBpcyBwYXVzZWRcbiAgICAgKi9cbiAgICBpc1BhdXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF1c2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIGxheWVyXG4gICAgICogQHBhcmFtIGFscGhhIFRoZSBuZXcgb3BhY2l0eSB2YWx1ZSBpbiB0aGUgcmFuZ2UgWzAsIDFdXG4gICAgICovXG4gICAgc2V0QWxwaGEoYWxwaGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmFscGhhID0gTWF0aFV0aWxzLmNsYW1wKGFscGhhLCAwLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSBsYXllclxuICAgICAqIEByZXR1cm5zIFRoZSBvcGFjaXR5XG4gICAgICovXG4gICAgZ2V0QWxwaGEoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGF5ZXIncyBoaWRkZW4gdmFsdWUuIElmIGhpZGRlbiwgYSBsYXllciB3aWxsIG5vdCBiZSByZW5kZXJlZCwgYnV0IHdpbGwgc3RpbGwgdXBkYXRlXG4gICAgICogQHBhcmFtIGhpZGRlbiBUaGUgaGlkZGVuIHZhbHVlIG9mIHRoZSBsYXllclxuICAgICAqL1xuICAgIHNldEhpZGRlbihoaWRkZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBoaWRkZW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaGlkZWVuIHZhbHVlIG9mIHRoZSBseWFlclxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHNjZW5lIGlzIGhpZGRlbiwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgaXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGRlbjtcbiAgICB9XG5cbiAgICAvKiogUGF1c2VzIHRoaXMgc2NlbmUgYW5kIGhpZGVzIGl0ICovXG4gICAgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIFVucGF1c2VzIHRoaXMgbGF5ZXIgYW5kIG1ha2VzIGl0IHZpc2libGUgKi9cbiAgICBlbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIG9yIG5vdCB0aGUgc2NlbmUgd2lsbCB5U29ydCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIHlTb3J0aW5nIG1lYW5zIHRoYXQgQ2FudmFzTm9kZXMgb24gdGhpcyBsYXllciB3aWxsIGhhdmUgdGhlaXIgZGVwdGggc29ydGVkIGRlcGVuZGluZyBvbiB0aGVpciB5LXZhbHVlLlxuICAgICAqIFRoaXMgbWVhbnMgdGhhdCBpZiBhbiBvYmplY3QgaXMgXCJoaWdoZXJcIiBpbiB0aGUgc2NlbmUsIGl0IHdpbGwgc29ydCBiZWhpbmQgb2JqZWN0cyB0aGF0IGFyZSBcImxvd2VyXCIuXG4gICAgICogVGhpcyBpcyB1c2VmdWwgZm9yIDMvNCB2aWV3IGdhbWVzLCBvciBzaW1pbGFyIHNpdHVhdGlvbnMsIHdoZXJlIHlvdSBzb21ldGltZXMgd2FudCB0byBiZSBpbiBmcm9udCBvZiBvYmplY3RzLFxuICAgICAqIGFuZCBvdGhlciB0aW1lcyB3YW50IHRvIGJlIGJlaGluZCB0aGUgc2FtZSBvYmplY3RzLlxuICAgICAqIEBwYXJhbSB5U29ydCBUcnVlIGlmIHlTb3J0aW5nIHNob3VsZCBiZSBhY3RpdmUsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIHNldFlTb3J0KHlTb3J0OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMueVNvcnQgPSB5U29ydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB5U29ydCBzdGF0dXMgb2YgdGhlIHNjZW5lXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB5U29ydGluZyBpcyBvY2N1cnJpbmcsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGdldFlTb3J0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy55U29ydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkZXB0aCBvZiB0aGUgbGF5ZXIgY29tcGFyZWQgdG8gb3RoZXIgbGF5ZXJzLiBBIGxhcmdlciBudW1iZXIgbWVhbnMgdGhlIGxheWVyIHdpbGwgYmUgY2xvc2VyIHRvIHRoZSBzY3JlZW4uXG4gICAgICogQHBhcmFtIGRlcHRoIFRoZSBkZXB0aCBvZiB0aGUgbGF5ZXIuXG4gICAgICovXG4gICAgc2V0RGVwdGgoZGVwdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRlcHRoID0gZGVwdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXB0aCBvZiB0aGUgbGF5ZXIuXG4gICAgICogQHJldHVybnMgVGhlIGRlcHRoXG4gICAgICovXG4gICAgZ2V0RGVwdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVwdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5vZGUgdG8gdGhpcyBsYXllclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGFkZCB0byB0aGlzIGxheWVyLlxuICAgICAqL1xuICAgIGFkZE5vZGUobm9kZTogR2FtZU5vZGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5vZGUpO1xuICAgICAgICBub2RlLnNldExheWVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBub2RlIGZyb20gdGhpcyBsYXllclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIG5vZGUgd2FzIHJlbW92ZWQsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHJlbW92ZU5vZGUobm9kZTogR2FtZU5vZGUpOiB2b2lkIHtcbiAgICAgICAgLy8gRmluZCBhbmQgcmVtb3ZlIHRoZSBub2RlXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZihub2RlKTtcblxuICAgICAgICBpZihpbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgbm9kZS5zZXRMYXllcih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmVpdmVzIGFsbCBHYW1lTm9kZXMgZnJvbSB0aGlzIGxheWVyXG4gICAgICogQHJldHVybnMgYW4gQXJyYXkgdGhhdCBjb250YWlucyBhbGwgb2YgdGhlIEdhbWVOb2RlcyBpbiB0aGlzIGxheWVyLlxuICAgICAqL1xuICAgIGdldEl0ZW1zKCk6IEFycmF5PEdhbWVOb2RlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH1cbn0iLCJpbXBvcnQgTGF5ZXIgZnJvbSBcIi4uL0xheWVyXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vU2NlbmVcIjtcblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgYSBMYXllciB0aGF0IGhhcyBhIHBhcmFsbGF4IHZhbHVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbGxheExheWVyIGV4dGVuZHMgTGF5ZXIge1xuXHQvKiogVGhlIHZhbHVlIG9mIHRoZSBwYXJhbGxheCBvZiB0aGUgTGF5ZXIgKi9cblx0cGFyYWxsYXg6IFZlYzI7XG5cdFxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBQYXJhbGxheExheWVyLlxuXHQgKiBVc2UgYWRkUGFyYWxsYXhMYXllcigpIGluIEByZWZlcmVuY2VbU2NlbmVdIHRvIGFkZCBhIGxheWVyIG9mIHRoaXMgdHlwZSB0byB5b3VyIGdhbWUuXG5cdCAqIEBwYXJhbSBzY2VuZSBUaGUgU2NlbmUgdG8gYWRkIHRoaXMgUGFyYWxsYXhMYXllciB0b1xuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgUGFyYWxsYXhMYXllclxuXHQgKiBAcGFyYW0gcGFyYWxsYXggVGhlIHBhcmFsbGF4IGxldmVsXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzY2VuZTogU2NlbmUsIG5hbWU6IHN0cmluZywgcGFyYWxsYXg6IFZlYzIpe1xuXHRcdHN1cGVyKHNjZW5lLCBuYW1lKTtcblx0XHR0aGlzLnBhcmFsbGF4ID0gcGFyYWxsYXg7XG5cdH1cbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vU2NlbmVcIjtcbmltcG9ydCBQYXJhbGxheExheWVyIGZyb20gXCIuL1BhcmFsbGF4TGF5ZXJcIjtcblxuLyoqXG4gKiBBIExheWVyIHN0cmljdGx5IHRvIGJlIHVzZWQgZm9yIG1hbmFnaW5nIFVJRWxlbWVudHMuXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGEgTGF5ZXIgdGhhdCBhbHdheXMgc3RheXMgaW4gdGhlIHNhbWUgcGxhY2UsXG4gKiBhbmQgdGh1cyByZW5kZXJzIHRoaW5ncyBsaWtlIGEgSFVEIG9yIGFuIGludmVudG9yeSB3aXRob3V0IHRha2luZyBpbnRvIGNvbnNpZGVyYXRpb24gdGhlIFxccmVmZXJlbmNlW1ZpZXdwb3J0XSBzY3JvbGwuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTGF5ZXIgZXh0ZW5kcyBQYXJhbGxheExheWVyIHtcblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVUlMYXllci5cblx0ICogVXNlIGFkZFVJTGF5ZXIoKSBpbiBAcmVmZXJlbmNlW1NjZW5lXSB0byBhZGQgYSBsYXllciBvZiB0aGlzIHR5cGUgdG8geW91ciBnYW1lLlxuXHQgKiBAcGFyYW0gc2NlbmUgVGhlIFNjZW5lIHRvIGFkZCB0aGlzIFVJTGF5ZXIgdG9cblx0ICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIFVJTGF5ZXJcblx0ICovXG5cdGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSwgbmFtZTogc3RyaW5nKXtcblx0XHRzdXBlcihzY2VuZSwgbmFtZSwgVmVjMi5aRVJPKTtcblx0fVxufSIsImltcG9ydCBTY2VuZSBmcm9tIFwiLi9TY2VuZVwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vUmVzb3VyY2VNYW5hZ2VyL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuLi9TY2VuZUdyYXBoL1ZpZXdwb3J0XCI7XG5pbXBvcnQgUmVuZGVyaW5nTWFuYWdlciBmcm9tIFwiLi4vUmVuZGVyaW5nL1JlbmRlcmluZ01hbmFnZXJcIjtcbmltcG9ydCBNZW1vcnlVdGlscyBmcm9tIFwiLi4vVXRpbHMvTWVtb3J5VXRpbHNcIjtcbmltcG9ydCBSZWNlaXZlciBmcm9tIFwiLi4vRXZlbnRzL1JlY2VpdmVyXCI7XG5pbXBvcnQgeyBHYW1lRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0V2ZW50cy9HYW1lRXZlbnRUeXBlXCI7XG5cbi8qKlxuICogVGhlIFNjZW5lTWFuYWdlciBhY3RzIGFzIGFuIGludGVyZmFjZSB0byBjcmVhdGUgU2NlbmVzLCBhbmQgaGFuZGxlcyB0aGUgbGlmZWN5Y2xlIG1ldGhvZHMgb2YgU2NlbmVzLlxuICogSXQgZ2l2ZXMgU2NlbmVzIGFjY2VzcyB0byBpbmZvcm1hdGlvbiB0aGV5IG5lZWQgZnJvbSB0aGUgQHJlZmVyZW5jZVtHYW1lXSBjbGFzcyB3aGlsZSBrZWVwaW5nIGEgbGF5ZXIgb2Ygc2VwYXJhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIHtcblx0LyoqIFRoZSBjdXJyZW50IFNjZW5lIG9mIHRoZSBnYW1lICovXG5cdHByb3RlY3RlZCBjdXJyZW50U2NlbmU6IFNjZW5lO1xuXG5cdC8qKiBUaGUgVmlld3BvcnQgb2YgdGhlIGdhbWUgKi9cblx0cHJvdGVjdGVkIHZpZXdwb3J0OiBWaWV3cG9ydDtcblxuXHQvKiogQSByZWZlcmVuY2UgdG8gdGhlIFJlc291cmNlTWFuYWdlciAqL1xuXHRwcm90ZWN0ZWQgcmVzb3VyY2VNYW5hZ2VyOiBSZXNvdXJjZU1hbmFnZXI7XG5cblx0LyoqIEEgY291bnRlciB0byBrZWVwIHRyYWNrIG9mIGdhbWUgaWRzICovXG5cdHByb3RlY3RlZCBpZENvdW50ZXI6IG51bWJlcjtcblxuXHQvKiogVGhlIFJlbmRlcmluZ01hbmFnZXIgb2YgdGhlIGdhbWUgKi9cblx0cHJvdGVjdGVkIHJlbmRlcmluZ01hbmFnZXI6IFJlbmRlcmluZ01hbmFnZXI7XG5cblx0LyoqIEZvciBjb25zaXN0ZW5jeSwgb25seSBjaGFuZ2Ugc2NlbmVzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHVwZGF0ZSBjeWNsZSAqL1xuXHRwcm90ZWN0ZWQgcGVuZGluZ1NjZW5lOiBTY2VuZTtcblx0cHJvdGVjdGVkIHBlbmRpbmdTY2VuZUluaXQ6IFJlY29yZDxzdHJpbmcsIGFueT47XG5cblx0cHJvdGVjdGVkIHJlY2VpdmVyOiBSZWNlaXZlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBTY2VuZU1hbmFnZXJcblx0ICogQHBhcmFtIHZpZXdwb3J0IFRoZSBWaWV3cG9ydCBvZiB0aGUgZ2FtZVxuXHQgKiBAcGFyYW0gZ2FtZSBUaGUgR2FtZSBpbnN0YW5jZVxuXHQgKiBAcGFyYW0gcmVuZGVyaW5nTWFuYWdlciBUaGUgUmVuZGVyaW5nTWFuYWdlciBvZiB0aGUgZ2FtZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iodmlld3BvcnQ6IFZpZXdwb3J0LCByZW5kZXJpbmdNYW5hZ2VyOiBSZW5kZXJpbmdNYW5hZ2VyKXtcblx0XHR0aGlzLnJlc291cmNlTWFuYWdlciA9IFJlc291cmNlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXHRcdHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydDtcblx0XHR0aGlzLnJlbmRlcmluZ01hbmFnZXIgPSByZW5kZXJpbmdNYW5hZ2VyO1xuXHRcdHRoaXMuaWRDb3VudGVyID0gMDtcblx0XHR0aGlzLnBlbmRpbmdTY2VuZSA9IG51bGw7XG5cblx0XHR0aGlzLnJlY2VpdmVyID0gbmV3IFJlY2VpdmVyKCk7XG5cdFx0dGhpcy5yZWNlaXZlci5zdWJzY3JpYmUoR2FtZUV2ZW50VHlwZS5DSEFOR0VfU0NFTkUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIHNjZW5lIGFzIHRoZSBtYWluIHNjZW5lLlxuXHQgKiBVc2UgdGhpcyBtZXRob2QgaWYgeW91J3ZlIGNyZWF0ZWQgYSBzdWJjbGFzcyBvZiBTY2VuZSwgYW5kIHlvdSB3YW50IHRvIGFkZCBpdCBhcyB0aGUgbWFpbiBTY2VuZS5cblx0ICogQHBhcmFtIGNvbnN0ciBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHNjZW5lIHRvIGFkZFxuXHQgKiBAcGFyYW0gaW5pdCBBbiBvYmplY3QgdG8gcGFzcyB0byB0aGUgaW5pdCBmdW5jdGlvbiBvZiB0aGUgbmV3IHNjZW5lXG5cdCAqL1xuXHRwdWJsaWMgY2hhbmdlVG9TY2VuZTxUIGV4dGVuZHMgU2NlbmU+KGNvbnN0cjogbmV3ICguLi5hcmdzOiBhbnkpID0+IFQsIGluaXQ/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuXHRcdGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgdGhlIG5ldyBzY2VuZSAtIGNoYW5nZSBpcyBwZW5kaW5nIHVudGlsIG5leHQgdXBkYXRlXCIpO1xuXHRcdHRoaXMucGVuZGluZ1NjZW5lID0gbmV3IGNvbnN0cih0aGlzLnZpZXdwb3J0LCB0aGlzLCB0aGlzLnJlbmRlcmluZ01hbmFnZXIsIG9wdGlvbnMpO1xuXHRcdHRoaXMucGVuZGluZ1NjZW5lSW5pdCA9IGluaXQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZG9TY2VuZUNoYW5nZSgpe1xuXHRcdGNvbnNvbGUubG9nKFwiUGVyZm9ybWluZyBzY2VuZSBjaGFuZ2VcIik7XG5cdFx0dGhpcy52aWV3cG9ydC5zZXRDZW50ZXIodGhpcy52aWV3cG9ydC5nZXRIYWxmU2l6ZSgpLngsIHRoaXMudmlld3BvcnQuZ2V0SGFsZlNpemUoKS55KTtcblx0XHRcblx0XHRpZih0aGlzLmN1cnJlbnRTY2VuZSl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlVubG9hZGluZyBvbGQgc2NlbmVcIilcblx0XHRcdHRoaXMuY3VycmVudFNjZW5lLnVubG9hZFNjZW5lKCk7XG5cblx0XHRcdGNvbnNvbGUubG9nKFwiRGVzdHJveWluZyBvbGQgc2NlbmVcIik7XG5cdFx0XHR0aGlzLmN1cnJlbnRTY2VuZS5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2coXCJVbmxvYWRpbmcgb2xkIHJlc291cmNlcy4uLlwiKTtcblx0XHR0aGlzLnJlc291cmNlTWFuYWdlci51bmxvYWRBbGxSZXNvdXJjZXMoKTtcblxuXHRcdC8vIE1ha2UgdGhlIHBlbmRpbmcgc2NlbmUgdGhlIGN1cnJlbnQgb25lXG5cdFx0dGhpcy5jdXJyZW50U2NlbmUgPSB0aGlzLnBlbmRpbmdTY2VuZTtcblxuXHRcdC8vIE1ha2UgdGhlIHBlbmRpbmcgc2NlbmUgbnVsbFxuXHRcdHRoaXMucGVuZGluZ1NjZW5lID0gbnVsbDtcblxuXHRcdC8vIEluaXQgdGhlIHNjZW5lXG5cdFx0dGhpcy5jdXJyZW50U2NlbmUuaW5pdFNjZW5lKHRoaXMucGVuZGluZ1NjZW5lSW5pdCk7XG5cblx0XHQvLyBFbnF1ZXVlIGFsbCBzY2VuZSBhc3NldCBsb2Fkc1xuXHRcdHRoaXMuY3VycmVudFNjZW5lLmxvYWRTY2VuZSgpO1xuXG5cdFx0Ly8gTG9hZCBhbGwgYXNzZXRzXG5cdFx0Y29uc29sZS5sb2coXCJTdGFydGluZyBTY2VuZSBMb2FkXCIpO1xuXHRcdHRoaXMucmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXNvdXJjZXNGcm9tUXVldWUoKCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJTdGFydGluZyBTY2VuZVwiKTtcblx0XHRcdHRoaXMuY3VycmVudFNjZW5lLnN0YXJ0U2NlbmUoKTtcblx0XHRcdHRoaXMuY3VycmVudFNjZW5lLnNldFJ1bm5pbmcodHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJlbmRlcmluZ01hbmFnZXIuc2V0U2NlbmUodGhpcy5jdXJyZW50U2NlbmUpO1xuXHR9XG5cdFxuXHQvKipcblx0ICogR2VuZXJhdGVzIGEgdW5pcXVlIElEXG5cdCAqIEByZXR1cm5zIEEgbmV3IElEXG5cdCAqL1xuXHRwdWJsaWMgZ2VuZXJhdGVJZCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmlkQ291bnRlcisrO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbmRlcnMgdGhlIGN1cnJlbnQgU2NlbmVcblx0ICovXG5cdHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XG5cdFx0aWYodGhpcy5jdXJyZW50U2NlbmUpe1xuXHRcdFx0dGhpcy5jdXJyZW50U2NlbmUucmVuZGVyKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGN1cnJlbnQgU2NlbmVcblx0ICogQHBhcmFtIGRlbHRhVCBUaGUgdGltZXN0ZXAgb2YgdGhlIFNjZW5lXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlKGRlbHRhVDogbnVtYmVyKXtcblx0XHR3aGlsZSAodGhpcy5yZWNlaXZlci5oYXNOZXh0RXZlbnQoKSkge1xuXHRcdFx0bGV0IGV2ID0gdGhpcy5yZWNlaXZlci5nZXROZXh0RXZlbnQoKTtcblx0XHRcdGlmIChldi50eXBlID09PSBHYW1lRXZlbnRUeXBlLkNIQU5HRV9TQ0VORSkgdGhpcy5jaGFuZ2VUb1NjZW5lKGV2LmRhdGEuZ2V0KFwic2NlbmVcIiksIGV2LmRhdGEuZ2V0KFwiaW5pdFwiKSk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5wZW5kaW5nU2NlbmUgIT09IG51bGwpe1xuXHRcdFx0dGhpcy5kb1NjZW5lQ2hhbmdlKCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5jdXJyZW50U2NlbmUgJiYgdGhpcy5jdXJyZW50U2NlbmUuaXNSdW5uaW5nKCkpe1xuXHRcdFx0dGhpcy5jdXJyZW50U2NlbmUudXBkYXRlKGRlbHRhVCk7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IFZlYzIgZnJvbSBcIi4uL0RhdGFUeXBlcy9WZWMyXCI7XG5pbXBvcnQgR2FtZU5vZGUgZnJvbSBcIi4uL05vZGVzL0dhbWVOb2RlXCI7XG5pbXBvcnQgQ2FudmFzTm9kZSBmcm9tIFwiLi4vTm9kZXMvQ2FudmFzTm9kZVwiO1xuaW1wb3J0IE1hdGhVdGlscyBmcm9tIFwiLi4vVXRpbHMvTWF0aFV0aWxzXCI7XG5pbXBvcnQgUXVldWUgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9RdWV1ZVwiO1xuaW1wb3J0IEFBQkIgZnJvbSBcIi4uL0RhdGFUeXBlcy9TaGFwZXMvQUFCQlwiO1xuaW1wb3J0IElucHV0IGZyb20gXCIuLi9JbnB1dC9JbnB1dFwiO1xuaW1wb3J0IFBhcmFsbGF4TGF5ZXIgZnJvbSBcIi4uL1NjZW5lL0xheWVycy9QYXJhbGxheExheWVyXCI7XG5pbXBvcnQgVUlMYXllciBmcm9tIFwiLi4vU2NlbmUvTGF5ZXJzL1VJTGF5ZXJcIjtcblxuLyoqXG4gKiBUaGUgdmlld3BvcnQgb2YgdGhlIGdhbWUuIENvcnJlc3BvbmRzIHRvIHRoZSB2aXNpYmxlIHdpbmRvdyBkaXNwbGF5ZWQgaW4gdGhlIGJyb3dzZXIuXG4gKiBUaGUgdmlld3BvcnQga2VlcHMgdHJhY2sgb2YgaXRzIHBvc2l0aW9uIGluIHRoZSBnYW1lIHdvcmxkLCBhbmQgY2FuIGFjdCBhcyBhIGNhbWVyYSB0byBmb2xsb3cgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld3BvcnQge1xuICAgIC8qKiBUaGUgQUFCQiB0aGF0IGNvbnRhaW5zIHRoZSBwb3NpdGlvbiBhbmQgc2l6ZSBvZiB0aGUgdmlld3BvcnQgdmlldyAqL1xuICAgIHB1YmxpYyB2aWV3OiBBQUJCO1xuICAgIC8qKiBUaGUgYm91bmRhcnkgZm9yIHRoZSB2aWV3cG9ydC4gVGhpcyByZXByZXNlbnRzIHRoZSBsaW1pdHMgdG8gd2hlcmUgdGhlIHZpZXdwb3J0IGNhbiBnbyAqL1xuICAgIHByaXZhdGUgYm91bmRhcnk6IEFBQkI7XG4gICAgLyoqIFRoZSBHYW1lTm9kZSB0aGUgVmlld3BvcnQgaXMgZm9sbG93aW5nICovXG4gICAgcHJpdmF0ZSBmb2xsb3dpbmc6IEdhbWVOb2RlO1xuICAgIC8qKiBUaGUgcG9zaXRpb24gdGhlIEdhbWVOb2RlIGlzIGZvY3VzaW5nIG9uLiBUaGlzIGlzIG92ZXJyaWRkZW4gaWYgXCJmb2xsb3dpbmdcIiBpcyBzZXQuICovXG4gICAgcHJpdmF0ZSBmb2N1czogVmVjMjtcblxuICAgIC8qKiBBIHF1ZXVlIG9mIHByZXZpb3VzIHBvc2l0aW9ucyBvZiB3aGF0IHRoaXMgdmlld3BvcnQgaXMgZm9sbG93aW5nLiBVc2VkIGZvciBzbW9vdGhpbmcgdmlld3BvcnQgbW92ZW1lbnQgKi9cbiAgICBwdWJsaWMgbGFzdFBvc2l0aW9uczogUXVldWU8VmVjMj47XG5cbiAgICAvKiogVGhlIG51bWJlciBvZiBwcmV2aW91cyBwb3NpdGlvbnMgdGhpcyB2aWV3cG9ydCB0cmFja3MgKi9cbiAgICBwcml2YXRlIHNtb290aGluZ0ZhY3RvcjogbnVtYmVyO1xuXG4gICAgLyoqIEEgYm9vbGVhbiB0aGEgcmVwcmVzZW50cyB3aGV0aGVyIHRoZSBwbGF5ZXIgY2FuIHpvb20gYnkgc2Nyb2xsaW5nIHdpdGggdGhlIG1vdXNlIHdoZWVsICovXG4gICAgcHJpdmF0ZSBzY3JvbGxab29tRW5hYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgYW1vdW50IHRoYXQgaXMgem9vbWVkIGluIG9yIG91dC4gKi9cbiAgICBwcml2YXRlIFpPT01fRkFDVE9SOiBudW1iZXIgPSAxLjI7XG5cbiAgICAvKiogVGhlIHNpemUgb2YgdGhlIGNhbnZhcyAqL1xuICAgIHByaXZhdGUgY2FudmFzU2l6ZTogVmVjMjtcblxuICAgIGNvbnN0cnVjdG9yKGNhbnZhc1NpemU6IFZlYzIsIHpvb21MZXZlbDogbnVtYmVyKXtcbiAgICAgICAgbGV0IHBvc3Rpb24gPSBuZXcgVmVjMigyNSw0NTApXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBBQUJCKHBvc3Rpb24pO1xuICAgICAgICB0aGlzLmJvdW5kYXJ5ID0gbmV3IEFBQkIoVmVjMi5aRVJPLCBWZWMyLlpFUk8pO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbnMgPSBuZXcgUXVldWUoKTtcbiAgICAgICAgdGhpcy5zbW9vdGhpbmdGYWN0b3IgPSAxMDtcbiAgICAgICAgdGhpcy5zY3JvbGxab29tRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBWZWMyLlpFUk87XG4gICAgICAgIHRoaXMuZm9jdXMgPSBWZWMyLlpFUk87XG5cbiAgICAgICAgLy8gU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXNcbiAgICAgICAgdGhpcy5zZXRDYW52YXNTaXplKGNhbnZhc1NpemUpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgc2l6ZSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgdGhpcy5zZXRTaXplKGNhbnZhc1NpemUpO1xuICAgICAgICB0aGlzLnNldFpvb21MZXZlbCh6b29tTGV2ZWwpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgY2VudGVyIChhbmQgbWFrZSB0aGUgdmlld3BvcnQgc3RheSB0aGVyZSlcbiAgICAgICAgdGhpcy5zZXRDZW50ZXIodGhpcy52aWV3LmhhbGZTaXplLmNsb25lKCkpO1xuICAgICAgICB0aGlzLnNldEZvY3VzKHRoaXMudmlldy5oYWxmU2l6ZS5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICAvKiogRW5hYmxlcyB0aGUgdmlld3BvcnQgdG8gem9vbSBpbiBhbmQgb3V0ICovXG4gICAgZW5hYmxlWm9vbSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JvbGxab29tRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMgVGhlIGNlbnRlciBvZiB0aGUgdmlld3BvcnQgYXMgYSBWZWMyXG4gICAgICovXG4gICAgZ2V0Q2VudGVyKCk6IFZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmNlbnRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IFZlYzIgd2l0aCB0aGUgb3JpZ2luIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEByZXR1cm5zIFRoZSB0b3AgbGVmdCBjb3JuZGVyIG9mIHRoZSBWaWVwb3J0IGFzIGEgVmVjMlxuICAgICAqL1xuICAgIGdldE9yaWdpbigpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMudmlldy5sZWZ0LCB0aGlzLnZpZXcudG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZWdpb24gdmlzaWJsZSB0byB0aGlzIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMgVGhlIEFBQkIgY29udGFpbmluZyB0aGUgcmVnaW9uIHZpc2libGUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICovXG4gICAgZ2V0VmlldygpOiBBQUJCIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB2ZWNPclggVGhlIG5ldyBwb3NpdGlvbiBvciB0aGUgeC1jb29yZGluYXRlIG9mIHRoZSBuZXcgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBuZXcgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRDZW50ZXIodmVjT3JYOiBWZWMyIHwgbnVtYmVyLCB5OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3M6IFZlYzI7XG5cdFx0aWYodmVjT3JYIGluc3RhbmNlb2YgVmVjMil7XG4gICAgICAgICAgICBwb3MgPSB2ZWNPclg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MgPSBuZXcgVmVjMih2ZWNPclgsIHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3LmNlbnRlciA9IHBvcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSB2aWV3cG9ydCBhcyBhIFZlYzJcbiAgICAgKiBAcmV0dXJucyBUaGUgaGFsZi1zaXplIG9mIHRoZSB2aWV3cG9ydCBhcyBhIFZlYzJcbiAgICAgKi9cbiAgICBnZXRIYWxmU2l6ZSgpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5nZXRIYWxmU2l6ZSgpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzaXplIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB2ZWNPclggVGhlIG5ldyB3aWR0aCBvZiB0aGUgdmlld3BvcnQgb3IgdGhlIG5ldyBzaXplIGFzIGEgVmVjMlxuICAgICAqIEBwYXJhbSB5IFRoZSBuZXcgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydFxuICAgICAqL1xuICAgIHNldFNpemUodmVjT3JYOiBWZWMyIHwgbnVtYmVyLCB5OiBudW1iZXIgPSBudWxsKTogdm9pZCB7XG5cdFx0aWYodmVjT3JYIGluc3RhbmNlb2YgVmVjMil7XG5cdFx0XHR0aGlzLnZpZXcuc2V0SGFsZlNpemUodmVjT3JYLnNjYWxlZCgxLzIpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52aWV3LnNldEhhbGZTaXplKG5ldyBWZWMyKHZlY09yWC8yLCB5LzIpKTtcblx0XHR9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaGFsZi1zaXplIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB2ZWNPclggVGhlIG5ldyBoYWxmLXdpZHRoIG9mIHRoZSB2aWV3cG9ydCBvciB0aGUgbmV3IGhhbGYtc2l6ZSBhcyBhIFZlYzJcbiAgICAgKiBAcGFyYW0geSBUaGUgbmV3IGhlaWdodCBvZiB0aGUgdmlld3BvcnRcbiAgICAgKi9cbiAgICBzZXRIYWxmU2l6ZSh2ZWNPclg6IFZlYzIgfCBudW1iZXIsIHk6IG51bWJlciA9IG51bGwpOiB2b2lkIHtcblx0XHRpZih2ZWNPclggaW5zdGFuY2VvZiBWZWMyKXtcblx0XHRcdHRoaXMudmlldy5zZXRIYWxmU2l6ZSh2ZWNPclguY2xvbmUoKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudmlldy5zZXRIYWxmU2l6ZShuZXcgVmVjMih2ZWNPclgsIHkpKTtcblx0XHR9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdmlld3BvcnQgd2l0aCB0aGUgc2l6ZSBvZiB0aGUgY3VycmVudCBDYW52YXNcbiAgICAgKiBAcGFyYW0gdmVjT3JYIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzLCBvciB0aGUgY2FudmFzIHNpemUgYXMgYSBWZWMyXG4gICAgICogQHBhcmFtIHkgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgc2V0Q2FudmFzU2l6ZSh2ZWNPclg6IFZlYzIgfCBudW1iZXIsIHk6IG51bWJlciA9IG51bGwpOiB2b2lkIHtcblx0XHRpZih2ZWNPclggaW5zdGFuY2VvZiBWZWMyKXtcblx0XHRcdHRoaXMuY2FudmFzU2l6ZSA9IHZlY09yWC5jbG9uZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNhbnZhc1NpemUgPSBuZXcgVmVjMih2ZWNPclgsIHkpO1xuXHRcdH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB6b29tIFRoZSB6b29tIGxldmVsXG4gICAgICovXG4gICAgc2V0Wm9vbUxldmVsKHpvb206IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXcuaGFsZlNpemUuY29weSh0aGlzLmNhbnZhc1NpemUuc2NhbGVkKDEvem9vbS8yKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcmV0dXJucyBUaGUgem9vbSBsZXZlbFxuICAgICAqL1xuICAgIGdldFpvb21MZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXNTaXplLngvdGhpcy52aWV3Lmh3LzJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzbW9vdGhpbmcgZmFjdG9yIGZvciB0aGUgdmlld3BvcnQgbW92ZW1lbnQuXG4gICAgICogQHBhcmFtIHNtb290aGluZ0ZhY3RvciBUaGUgc21vb3RoaW5nIGZhY3RvciBmb3IgdGhlIHZpZXdwb3J0XG4gICAgICovXG4gICAgc2V0U21vb3RoaW5nRmFjdG9yKHNtb290aGluZ0ZhY3RvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmKHNtb290aGluZ0ZhY3RvciA8IDEpIHNtb290aGluZ0ZhY3RvciA9IDE7XG4gICAgICAgIHRoaXMuc21vb3RoaW5nRmFjdG9yID0gc21vb3RoaW5nRmFjdG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRlbGxzIHRoZSB2aWV3cG9ydCB0byBmb2N1cyBvbiBhIHBvaW50LiBPdmVyaWRkZW4gYnkgXCJmb2xsb3dpbmdcIi5cbiAgICAgKiBAcGFyYW0gZm9jdXMgVGhlIHBvaW50IHRoZSAgdmlld3BvcnQgc2hvdWxkIGZvY3VzIG9uXG4gICAgICovXG4gICAgc2V0Rm9jdXMoZm9jdXM6IFZlYzIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1cy5jb3B5KGZvY3VzKTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBDYW52YXNOb2RlIGlzIGluc2lkZSBvZiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG5vZGUgaXMgY3VycmVudGx5IHZpc2libGUgaW4gdGhlIHZpZXdwb3J0LCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICBpbmNsdWRlcyhub2RlOiBDYW52YXNOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwYXJhbGxheCA9IG5vZGUuZ2V0TGF5ZXIoKSBpbnN0YW5jZW9mIFBhcmFsbGF4TGF5ZXIgfHwgbm9kZS5nZXRMYXllcigpIGluc3RhbmNlb2YgVUlMYXllciA/ICg8UGFyYWxsYXhMYXllcj5ub2RlLmdldExheWVyKCkpLnBhcmFsbGF4IDogbmV3IFZlYzIoMSwgMSk7XG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLnZpZXcuY2VudGVyLmNsb25lKCk7XG4gICAgICAgIHRoaXMudmlldy5jZW50ZXIubXVsdChwYXJhbGxheCk7XG4gICAgICAgIGxldCBvdmVybGFwcyA9IHRoaXMudmlldy5vdmVybGFwcyhub2RlLmJvdW5kYXJ5KTtcbiAgICAgICAgdGhpcy52aWV3LmNlbnRlciA9IGNlbnRlclxuICAgICAgICByZXR1cm4gb3ZlcmxhcHM7XG4gICAgfVxuXG5cdC8vIFRPRE86IFB1dCBzb21lIGVycm9yIGhhbmRsaW5nIG9uIHRoaXMgZm9yIHRyeWluZyB0byBtYWtlIHRoZSBib3VuZHMgdG9vIHNtYWxsIGZvciB0aGUgdmlld3BvcnRcbiAgICAvLyBUT0RPOiBUaGlzIHNob3VsZCBwcm9iYWJseSBiZSBkb25lIGF1dG9tYXRpY2FsbHksIG9yIHNob3VsZCBjb25zaWRlciB0aGUgYXNwZWN0IHJhdGlvIG9yIHNvbWV0aGluZ1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGJvdW5kcyBvZiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gbG93ZXJYIFRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHBhcmFtIGxvd2VyWSBUaGUgdG9wIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHBhcmFtIHVwcGVyWCBUaGUgcmlnaHQgZWRnZSBvZiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gdXBwZXJZIFRoZSBib3R0b20gZWRnZSBvZiB0aGUgdmlld3BvcnRcbiAgICAgKi9cbiAgICBzZXRCb3VuZHMobG93ZXJYOiBudW1iZXIsIGxvd2VyWTogbnVtYmVyLCB1cHBlclg6IG51bWJlciwgdXBwZXJZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGh3aWR0aCA9ICh1cHBlclggLSBsb3dlclgpLzI7XG4gICAgICAgIGxldCBoaGVpZ2h0ID0gKHVwcGVyWSAtIGxvd2VyWSkvMjtcbiAgICAgICAgbGV0IHggPSBsb3dlclggKyBod2lkdGg7XG4gICAgICAgIGxldCB5ID0gbG93ZXJZICsgaGhlaWdodDtcbiAgICAgICAgdGhpcy5ib3VuZGFyeS5jZW50ZXIuc2V0KHgsIHkpO1xuICAgICAgICB0aGlzLmJvdW5kYXJ5LmhhbGZTaXplLnNldChod2lkdGgsIGhoZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgdGhlIHZpZXdwb3J0IGZvbGxvdyB0aGUgc3BlY2lmaWVkIEdhbWVOb2RlXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIEdhbWVOb2RlIHRvIGZvbGxvd1xuICAgICAqL1xuICAgIGZvbGxvdyhub2RlOiBHYW1lTm9kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IG5vZGU7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5sYXN0UG9zaXRpb25zLmdldFNpemUoKSA+IHRoaXMuc21vb3RoaW5nRmFjdG9yKXtcbiAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9ucy5kZXF1ZXVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEdldCB0aGUgYXZlcmFnZSBvZiB0aGUgbGFzdCAxMCBwb3NpdGlvbnNcbiAgICAgICAgbGV0IHBvcyA9IFZlYzIuWkVSTztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb25zLmZvckVhY2gocG9zaXRpb24gPT4gcG9zLmFkZChwb3NpdGlvbikpO1xuICAgICAgICBwb3Muc2NhbGUoMS90aGlzLmxhc3RQb3NpdGlvbnMuZ2V0U2l6ZSgpKTtcblxuICAgICAgICAvLyBTZXQgdGhpcyBwb3NpdGlvbiBlaXRoZXIgdG8gdGhlIG9iamVjdCBvciB0byBpdHMgYm91bmRzXG4gICAgICAgIHBvcy54ID0gTWF0aFV0aWxzLmNsYW1wKHBvcy54LCB0aGlzLmJvdW5kYXJ5LmxlZnQgKyB0aGlzLnZpZXcuaHcsIHRoaXMuYm91bmRhcnkucmlnaHQgLSB0aGlzLnZpZXcuaHcpO1xuICAgICAgICBwb3MueSA9IE1hdGhVdGlscy5jbGFtcChwb3MueSwgdGhpcy5ib3VuZGFyeS50b3AgKyB0aGlzLnZpZXcuaGgsIHRoaXMuYm91bmRhcnkuYm90dG9tIC0gdGhpcy52aWV3LmhoKTtcblxuICAgICAgICAvLyBBc3N1cmUgdGhlcmUgYXJlIG5vIGxpbmVzIGluIHRoZSB0aWxlbWFwXG4gICAgICAgIHBvcy54ID0gTWF0aC5mbG9vcihwb3MueCk7XG4gICAgICAgIHBvcy55ID0gTWF0aC5mbG9vcihwb3MueSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnZpZXcuY2VudGVyLmNvcHkocG9zKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZGVsdGFUOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgem9vbSBpcyBlbmFibGVkXG4gICAgICAgIGlmKHRoaXMuc2Nyb2xsWm9vbUVuYWJsZWQpe1xuICAgICAgICAgICAgaWYoSW5wdXQuZGlkSnVzdFNjcm9sbCgpKXtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNpemUgPSB0aGlzLnZpZXcuZ2V0SGFsZlNpemUoKS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGlmKElucHV0LmdldFNjcm9sbERpcmVjdGlvbigpIDwgMCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIFpvb20gaW5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNpemUuc2NhbGUoMS90aGlzLlpPT01fRkFDVE9SKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBab29tIG91dFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2l6ZS5zY2FsZSh0aGlzLlpPT01fRkFDVE9SKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjdXJyZW50U2l6ZS54ID4gdGhpcy5ib3VuZGFyeS5odyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmYWN0b3IgPSB0aGlzLmJvdW5kYXJ5Lmh3L2N1cnJlbnRTaXplLng7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaXplLnggPSB0aGlzLmJvdW5kYXJ5Lmh3O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2l6ZS55ICo9IGZhY3RvcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjdXJyZW50U2l6ZS55ID4gdGhpcy5ib3VuZGFyeS5oaCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmYWN0b3IgPSB0aGlzLmJvdW5kYXJ5LmhoL2N1cnJlbnRTaXplLnk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaXplLnkgPSB0aGlzLmJvdW5kYXJ5LmhoO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2l6ZS54ICo9IGZhY3RvcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuc2V0SGFsZlNpemUoY3VycmVudFNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdmlld3BvcnQgaXMgZm9sbG93aW5nIGFuIG9iamVjdFxuICAgICAgICBpZih0aGlzLmZvbGxvd2luZyl7XG4gICAgICAgICAgICAvLyBVcGRhdGUgb3VyIGxpc3Qgb2YgcHJldmlvdXMgcG9zaXRpb25zXG4gICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbnMuZW5xdWV1ZSh0aGlzLmZvbGxvd2luZy5wb3NpdGlvbi5jbG9uZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9ucy5lbnF1ZXVlKHRoaXMuZm9jdXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxufSIsImltcG9ydCBNYXAgZnJvbSBcIi4uL0RhdGFUeXBlcy9Db2xsZWN0aW9ucy9NYXBcIjtcbmltcG9ydCBSZWNlaXZlciBmcm9tIFwiLi4vRXZlbnRzL1JlY2VpdmVyXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi9SZXNvdXJjZU1hbmFnZXIvUmVzb3VyY2VNYW5hZ2VyXCI7XG5pbXBvcnQgeyBHYW1lRXZlbnRUeXBlIH0gZnJvbSBcIi4uL0V2ZW50cy9HYW1lRXZlbnRUeXBlXCI7XG5cbi8qKlxuICogTWFuYWdlcyBhbnkgc291bmRzIG9yIG11c2ljIG5lZWRlZCBmb3IgdGhlIGdhbWUuXG4gKiBUaHJvdWdoIHRoZSBFdmVudFF1ZXVlLCBleHBvc2VzIGludGVyZmFjZSB0byBwbGF5IHNvdW5kcyBzbyBHYW1lTm9kZXMgY2FuIGFjdGl2YXRlIHNvdW5kcyB3aXRob3V0XG4gKiBuZWVkaW5nIGRpcmVjdCByZWZlcmVuY2VzIHRvIHRoZSBhdWRpbyBzeXN0ZW1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9NYW5hZ2VyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQXVkaW9NYW5hZ2VyO1xuXG4gICAgLyoqIFRoZSBldmVudCByZWNlaXZlciBvZiB0aGlzIEF1ZGlvTWFuYWdlciAqL1xuICAgIHByaXZhdGUgcmVjZWl2ZXI6IFJlY2VpdmVyO1xuXG4gICAgLyoqIEEgTWFwIG9mIHRoZSBuYW1lcyBvZiBjdXJyZW50bHkgcGxheWluZyAob3IgcGF1c2VkKSBzb3VuZHMgdG8gdGhlaXIgQXVkaW9CdWZmZXJzICovXG4gICAgcHJpdmF0ZSBjdXJyZW50U291bmRzOiBNYXA8QXVkaW9CdWZmZXJTb3VyY2VOb2RlPjtcblxuICAgIHByaXZhdGUgYXVkaW9DdHg6IEF1ZGlvQ29udGV4dDtcblxuICAgIHByaXZhdGUgZ2Fpbk5vZGVzOiBBcnJheTxHYWluTm9kZT47XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuaW5pdEF1ZGlvKCk7XG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSBuZXcgUmVjZWl2ZXIoKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlci5zdWJzY3JpYmUoW1xuICAgICAgICAgICAgR2FtZUV2ZW50VHlwZS5QTEFZX1NPVU5ELFxuICAgICAgICAgICAgR2FtZUV2ZW50VHlwZS5TVE9QX1NPVU5ELFxuICAgICAgICAgICAgR2FtZUV2ZW50VHlwZS5QTEFZX01VU0lDLFxuICAgICAgICAgICAgR2FtZUV2ZW50VHlwZS5QTEFZX1NGWCxcbiAgICAgICAgICAgIEdhbWVFdmVudFR5cGUuTVVURV9DSEFOTkVMLFxuICAgICAgICAgICAgR2FtZUV2ZW50VHlwZS5VTk1VVEVfQ0hBTk5FTFxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U291bmRzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMuZ2Fpbk5vZGVzID0gbmV3IEFycmF5PEdhaW5Ob2RlPihNQVhfQVVESU9fQ0hBTk5FTFMpO1xuICAgICAgICB0aGlzLmluaXRHYWluTm9kZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluc3RhbmNlIG9mIHRoZSBBdWRpb01hbmFnZXIgY2xhc3Mgb3IgY3JlYXRlIGEgbmV3IG9uZSBpZiBub25lIGV4aXN0c1xuICAgICAqIEByZXR1cm5zIFRoZSBBdWRpb01hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEF1ZGlvTWFuYWdlciB7XG4gICAgICAgIGlmKCF0aGlzLmluc3RhbmNlKXtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQXVkaW9NYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHdlYkF1ZGlvIGNvbnRleHRcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRBdWRpbygpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0Oy8vIHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7IFxuICAgICAgICAgICAgdGhpcy5hdWRpb0N0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV2ViIEF1ZGlvIEFQSSBzdWNjZXNzZnVsbHkgbG9hZGVkJyk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdXZWIgQXVkaW8gQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJyk7IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0R2Fpbk5vZGVzKCk6IHZvaWQge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgTUFYX0FVRElPX0NIQU5ORUxTOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5nYWluTm9kZXNbaV0gPSB0aGlzLmF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgYXVkaW8gY29udGV4dFxuICAgICAqIEByZXR1cm5zIFRoZSBBdWRpb0NvbnRleHRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QXVkaW9Db250ZXh0KCk6IEF1ZGlvQ29udGV4dCB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1ZGlvQ3R4O1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIEFjY29yZGluZyB0byB0aGUgTUROLCBjcmVhdGUgYSBuZXcgc291bmQgZm9yIGV2ZXJ5IGNhbGw6XG5cbiAgICAgICAgQW4gQXVkaW9CdWZmZXJTb3VyY2VOb2RlIGNhbiBvbmx5IGJlIHBsYXllZCBvbmNlOyBhZnRlciBlYWNoIGNhbGwgdG8gc3RhcnQoKSwgeW91IGhhdmUgdG8gY3JlYXRlIGEgbmV3IG5vZGVcbiAgICAgICAgaWYgeW91IHdhbnQgdG8gcGxheSB0aGUgc2FtZSBzb3VuZCBhZ2Fpbi4gRm9ydHVuYXRlbHksIHRoZXNlIG5vZGVzIGFyZSB2ZXJ5IGluZXhwZW5zaXZlIHRvIGNyZWF0ZSwgYW5kIHRoZVxuICAgICAgICBhY3R1YWwgQXVkaW9CdWZmZXJzIGNhbiBiZSByZXVzZWQgZm9yIG11bHRpcGxlIHBsYXlzIG9mIHRoZSBzb3VuZC4gSW5kZWVkLCB5b3UgY2FuIHVzZSB0aGVzZSBub2RlcyBpbiBhXG4gICAgICAgIFwiZmlyZSBhbmQgZm9yZ2V0XCIgbWFubmVyOiBjcmVhdGUgdGhlIG5vZGUsIGNhbGwgc3RhcnQoKSB0byBiZWdpbiBwbGF5aW5nIHRoZSBzb3VuZCwgYW5kIGRvbid0IGV2ZW4gYm90aGVyIHRvXG4gICAgICAgIGhvbGQgYSByZWZlcmVuY2UgdG8gaXQuIEl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBnYXJiYWdlLWNvbGxlY3RlZCBhdCBhbiBhcHByb3ByaWF0ZSB0aW1lLCB3aGljaCB3b24ndCBiZVxuICAgICAgICB1bnRpbCBzb21ldGltZSBhZnRlciB0aGUgc291bmQgaGFzIGZpbmlzaGVkIHBsYXlpbmcuXG4gICAgKi9cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvdW5kIGZyb20gdGhlIGtleSBvZiBhIGxvYWRlZCBhdWRpbyBmaWxlXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IG9mIHRoZSBsb2FkZWQgYXVkaW8gZmlsZSB0byBjcmVhdGUgYSBuZXcgc291bmQgZm9yXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgQXVkaW9CdWZmZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlU291bmQoa2V5OiBzdHJpbmcsIGhvbGRSZWZlcmVuY2U6IGJvb2xlYW4sIGNoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGUsIG9wdGlvbnM6IE1hcDxhbnk+KTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlIHtcbiAgICAgICAgLy8gR2V0IGF1ZGlvIGJ1ZmZlclxuICAgICAgICBsZXQgYnVmZmVyID0gUmVzb3VyY2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXVkaW8oa2V5KTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBzb3VuZCBzb3VyY2VcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuYXVkaW9DdHguY3JlYXRlQnVmZmVyU291cmNlKCk7IFxuICAgICAgXG4gICAgICAgIC8vIFRlbGwgdGhlIHNvdXJjZSB3aGljaCBzb3VuZCB0byBwbGF5XG4gICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7ICAgICAgICAgICAgICAgXG4gICAgICBcbiAgICAgICAgLy8gQWRkIGFueSBhZGRpdGlvbmFsIG5vZGVzXG4gICAgICAgIGNvbnN0IG5vZGVzOiBBcnJheTxBdWRpb05vZGU+ID0gW3NvdXJjZV07XG5cbiAgICAgICAgLy8gRG8gYW55IGFkZGl0aW9uYWwgbm9kZXMgaGVyZT9cbiAgICAgICAgLy8gT2YgY291cnNlLCB0aGVyZSBhcmVuJ3QgYW55IHN1cHBvcnRlZCB5ZXQuLi5cblxuICAgICAgICAvLyBBZGQgdGhlIGdhaW4gbm9kZSBmb3IgdGhpcyBjaGFubmVsXG4gICAgICAgIG5vZGVzLnB1c2godGhpcy5nYWluTm9kZXNbY2hhbm5lbF0pO1xuXG4gICAgICAgIC8vIENvbm5lY3QgYW55IG5vZGVzIGFsb25nIHRoZSBwYXRoXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBub2Rlc1tpLTFdLmNvbm5lY3Qobm9kZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29ubmVjdCB0aGUgc291cmNlIHRvIHRoZSBjb250ZXh0J3MgZGVzdGluYXRpb25cbiAgICAgICAgbm9kZXNbbm9kZXMubGVuZ3RoIC0gMV0uY29ubmVjdCh0aGlzLmF1ZGlvQ3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxheSB0aGUgc291bmQgc3BlY2lmaWVkIGJ5IHRoZSBrZXlcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgb2YgdGhlIHNvdW5kIHRvIHBsYXlcbiAgICAgKiBAcGFyYW0gbG9vcCBBIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90IHRvIGxvb3AgdGhlIHNvdW5kXG4gICAgICogQHBhcmFtIGhvbGRSZWZlcmVuY2UgQSBib29sZWFuIGZvciB3aGV0aGVyIG9yIG5vdCB3ZSB3YW50IHRvIGhvbGQgb24gdG8gYSByZWZlcmVuY2Ugb2YgdGhlIGF1ZGlvIG5vZGUuIFRoaXMgaXMgZ29vZCBmb3IgcGxheWluZyBtdXNpYyBvbiBhIGxvb3AgdGhhdCB3aWxsIGV2ZW50dWFsbHkgbmVlZCB0byBiZSBzdG9wcGVkLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBwbGF5U291bmQoa2V5OiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIGhvbGRSZWZlcmVuY2U6IGJvb2xlYW4sIGNoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGUsIG9wdGlvbnM6IE1hcDxhbnk+KTogdm9pZCB7XG4gICAgICAgIGxldCBzb3VuZCA9IHRoaXMuY3JlYXRlU291bmQoa2V5LCBob2xkUmVmZXJlbmNlLCBjaGFubmVsLCBvcHRpb25zKTtcblxuICAgICAgICBpZihsb29wKXtcbiAgICAgICAgICAgIHNvdW5kLmxvb3AgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGEgcmVmZXJlbmNlIG9mIHRoZSBuZXcgc291bmQgdG8gYSBtYXAuIFRoaXMgd2lsbCBhbGxvdyB1cyB0byBzdG9wIGEgbG9vcGluZyBvciBsb25nIHNvdW5kIGF0IGEgbGF0ZXIgdGltZVxuICAgICAgICBpZihob2xkUmVmZXJlbmNlKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNvdW5kcy5hZGQoa2V5LCBzb3VuZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNvdW5kLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0aGUgc291bmQgc3BlY2lmaWVkIGJ5IHRoZSBrZXlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RvcFNvdW5kKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBzb3VuZCA9IHRoaXMuY3VycmVudFNvdW5kcy5nZXQoa2V5KTtcbiAgICAgICAgaWYoc291bmQpe1xuICAgICAgICAgICAgc291bmQuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U291bmRzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG11dGVDaGFubmVsKGNoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGUpe1xuICAgICAgICB0aGlzLmdhaW5Ob2Rlc1tjaGFubmVsXS5nYWluLnNldFZhbHVlQXRUaW1lKDAsIHRoaXMuYXVkaW9DdHguY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1bm11dGVDaGFubmVsKGNoYW5uZWw6IEF1ZGlvQ2hhbm5lbFR5cGUpe1xuICAgICAgICB0aGlzLmdhaW5Ob2Rlc1tjaGFubmVsXS5nYWluLnNldFZhbHVlQXRUaW1lKDEsIHRoaXMuYXVkaW9DdHguY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZvbHVtZSBvZiBhIGNoYW5uZWwgdXNpbmcgdGhlIEdhaW5Ob2RlIGZvciB0aGF0IGNoYW5uZWwuIEZvciBtb3JlXG4gICAgICogaW5mb3JtYXRpb24gb24gR2Fpbk5vZGVzLCBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0dhaW5Ob2RlXG4gICAgICogQHBhcmFtIGNoYW5uZWwgVGhlIGF1ZGlvIGNoYW5uZWwgdG8gc2V0IHRoZSB2b2x1bWUgZm9yXG4gICAgICogQHBhcmFtIHZvbHVtZSBUaGUgdm9sdW1lIG9mIHRoZSBjaGFubmVsLiAwIGlzIG11dGVkLiBWYWx1ZXMgYmVsb3cgemVybyB3aWxsIGJlIHNldCB0byB6ZXJvLlxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRWb2x1bWUoY2hhbm5lbDogQXVkaW9DaGFubmVsVHlwZSwgdm9sdW1lOiBudW1iZXIpe1xuICAgICAgICBpZih2b2x1bWUgPCAwKXtcbiAgICAgICAgICAgIHZvbHVtZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbSA9IEF1ZGlvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBhbS5nYWluTm9kZXNbY2hhbm5lbF0uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2b2x1bWUsIGFtLmF1ZGlvQ3R4LmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBHYWluTm9kZSBmb3IgdGhpcyBjaGFubmVsLlxuICAgICAqIExlYXJuIG1vcmUgYWJvdXQgR2Fpbk5vZGVzIGhlcmUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0dhaW5Ob2RlXG4gICAgICogRE9OJ1QgVVNFIFRISVMgVU5MRVNTIFlPVSBLTk9XIFdIQVQgWU9VJ1JFIERPSU5HXG4gICAgICogQHBhcmFtIGNoYW5uZWwgVGhlIGNoYW5uZWxcbiAgICAgKiBAcmV0dXJucyBUaGUgR2Fpbk5vZGUgZm9yIHRoZSBzcGVjaWZpZWQgY2hhbm5lbFxuICAgICAqL1xuICAgIGdldENoYW5uZWxHYWluTm9kZShjaGFubmVsOiBBdWRpb0NoYW5uZWxUeXBlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGVzW2NoYW5uZWxdO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGFUOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gUGxheSBlYWNoIGF1ZGlvIGNsaXAgcmVxdWVzdGVkXG4gICAgICAgIC8vIFRPRE8gLSBBZGQgbG9naWMgdG8gbWVyZ2Ugc291bmRzIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBvZiB0aGUgc2FtZSBrZXlcbiAgICAgICAgd2hpbGUodGhpcy5yZWNlaXZlci5oYXNOZXh0RXZlbnQoKSl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB0aGlzLnJlY2VpdmVyLmdldE5leHRFdmVudCgpO1xuICAgICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5QTEFZX1NPVU5EIHx8IGV2ZW50LnR5cGUgPT09IEdhbWVFdmVudFR5cGUuUExBWV9NVVNJQyB8fCBldmVudC50eXBlID09PSBHYW1lRXZlbnRUeXBlLlBMQVlfU0ZYKXtcbiAgICAgICAgICAgICAgICBsZXQgc291bmRLZXkgPSBldmVudC5kYXRhLmdldChcImtleVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbG9vcCA9IGV2ZW50LmRhdGEuZ2V0KFwibG9vcFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaG9sZFJlZmVyZW5jZSA9IGV2ZW50LmRhdGEuZ2V0KFwiaG9sZFJlZmVyZW5jZVwiKTtcblxuICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gQXVkaW9DaGFubmVsVHlwZS5ERUZBVUxUO1xuXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5QTEFZX01VU0lDKXtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbCA9IEF1ZGlvQ2hhbm5lbFR5cGUuTVVTSUM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKEdhbWVFdmVudFR5cGUuUExBWV9TRlgpe1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsID0gQXVkaW9DaGFubmVsVHlwZS5TRlg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGV2ZW50LmRhdGEuaGFzKFwiY2hhbm5lbFwiKSl7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwgPSBldmVudC5kYXRhLmdldChcImNoYW5uZWxcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoc291bmRLZXksIGxvb3AsIGhvbGRSZWZlcmVuY2UsIGNoYW5uZWwsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihldmVudC50eXBlID09PSBHYW1lRXZlbnRUeXBlLlNUT1BfU09VTkQpe1xuICAgICAgICAgICAgICAgIGxldCBzb3VuZEtleSA9IGV2ZW50LmRhdGEuZ2V0KFwia2V5XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFNvdW5kKHNvdW5kS2V5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5NVVRFX0NIQU5ORUwpe1xuICAgICAgICAgICAgICAgIHRoaXMubXV0ZUNoYW5uZWwoZXZlbnQuZGF0YS5nZXQoXCJjaGFubmVsXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gR2FtZUV2ZW50VHlwZS5VTk1VVEVfQ0hBTk5FTCl7XG4gICAgICAgICAgICAgICAgdGhpcy51bm11dGVDaGFubmVsKGV2ZW50LmRhdGEuZ2V0KFwiY2hhbm5lbFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIEF1ZGlvQ2hhbm5lbFR5cGUge1xuICAgIERFRkFVTFQgPSAwLFxuICAgIFNGWCA9IDEsXG4gICAgTVVTSUMgPSAyLFxuICAgIENVU1RPTV8xID0gMyxcbiAgICBDVVNUT01fMiA9IDQsXG4gICAgQ1VTVE9NXzMgPSA1LFxuICAgIENVU1RPTV80ID0gNixcbiAgICBDVVNUT01fNSA9IDcsXG4gICAgQ1VTVE9NXzYgPSA4LFxuICAgIENVU1RPTV83ID0gOSxcbiAgICBDVVNUT01fOCA9IDEwLFxuICAgIENVU1RPTV85ID0gMTEsXG59XG5cbmV4cG9ydCBjb25zdCBNQVhfQVVESU9fQ0hBTk5FTFMgPSAxMjsiLCJpbXBvcnQgTWF0aFV0aWxzIGZyb20gXCIuL01hdGhVdGlsc1wiO1xuXG4vLyBUT0RPOiBUaGlzIHNob3VsZCBiZSBtb3ZlZCB0byB0aGUgZGF0YXR5cGVzIGZvbGRlclxuLyoqXG4gKiBBIENvbG9yIHV0aWwgY2xhc3MgdGhhdCBrZWVwcyB0cmFjayBvZiBjb2xvcnMgbGlrZSBhIHZlY3RvciwgYnV0IGNhbiBiZSBjb252ZXJ0ZWQgaW50byBhIHN0cmluZyBmb3JtYXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3Ige1xuXHQvKiogVGhlIHJlZCB2YWx1ZSAqL1xuXHRwdWJsaWMgcjogbnVtYmVyO1xuXHQvKiogVGhlIGdyZWVuIHZhbHVlICovXG5cdHB1YmxpYyBnOiBudW1iZXI7XG5cdC8qKiBUaGUgYmx1ZSB2YWx1ZSAqL1xuXHRwdWJsaWMgYjogbnVtYmVyO1xuXHQvKiogVGhlIGFscGhhIHZhbHVlICovXG5cdHB1YmxpYyBhOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgY29sb3Jcblx0ICogQHBhcmFtIHIgUmVkXG5cdCAqIEBwYXJhbSBnIEdyZWVuXG5cdCAqIEBwYXJhbSBiIEJsdWVcblx0ICogQHBhcmFtIGEgQWxwaGFcblx0ICovXG5cdGNvbnN0cnVjdG9yKHI6IG51bWJlciA9IDAsIGc6IG51bWJlciA9IDAsIGI6IG51bWJlciA9IDAsIGE6IG51bWJlciA9IDEpe1xuICAgICAgICB0aGlzLnIgPSByO1xuICAgICAgICB0aGlzLmcgPSBnO1xuICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgICB0aGlzLmEgPSBhO1xuXHR9XG5cblx0LyoqXHRcblx0ICogVHJhbnNwYXJlbnQgY29sb3Jcblx0ICogQHJldHVybnMgcmdiYSgwLCAwLCAwLCAwKVxuXHQgKi9cblx0c3RhdGljIGdldCBUUkFOU1BBUkVOVCgpOiBDb2xvciB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAwKTtcblx0fVxuXHRzdGF0aWMgZ2V0IEZPR19PRl9XQVJfVFJBTlNQQVJFTlQoKTogQ29sb3Ige1xuXHRcdHJldHVybiBuZXcgQ29sb3IoMCwgMCwgMCwgMC4wMSk7XG5cdH1cblx0c3RhdGljIGdldCBGT0dfT0ZfV0FSX0JMQUNLKCk6IENvbG9yIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKDAsIDAsIDAsIDAuOTkpO1xuXHR9XG5cdC8qKlx0XG5cdCAqIFJlZCBjb2xvclxuXHQgKiBAcmV0dXJucyByZ2IoMjU1LCAwLCAwKVxuXHQgKi9cblx0c3RhdGljIGdldCBSRUQoKTogQ29sb3Ige1xuXHRcdHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAwLCAxKTtcblx0fVxuXG5cdC8qKlx0XG5cdCAqIEdyZWVuIGNvbG9yXG5cdCAqIEByZXR1cm5zIHJnYigwLCAyNTUsIDApXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IEdSRUVOKCk6IENvbG9yIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKDAsIDI1NSwgMCwgMSk7XG5cdH1cblxuXHQvKipcdFxuXHQgKiBCbHVlIGNvbG9yXG5cdCAqIEByZXR1cm5zIHJnYigwLCAwLCAyNTUpXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IEJMVUUoKTogQ29sb3Ige1xuXHRcdHJldHVybiBuZXcgQ29sb3IoMCwgMCwgMjU1LCAxKTtcblx0fVxuXG5cdC8qKlx0XG5cdCAqIFllbGxvdyBjb2xvclxuXHQgKiBAcmV0dXJucyByZ2IoMjU1LCAyNTUsIDApXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IFlFTExPVygpOiBDb2xvciB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcigyNTUsIDI1NSwgMCwgMSk7XG5cdH1cblxuXHQvKipcdFxuXHQgKiBNYWdlbnRhIGNvbG9yXG5cdCAqIEByZXR1cm5zIHJnYigyNTUsIDAsIDI1NSlcblx0ICovXG5cdHN0YXRpYyBnZXQgTUFHRU5UQSgpOiBDb2xvciB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcigyNTUsIDAsIDI1NSwgMSk7XG5cdH1cblxuXHQvKipcdFxuXHQgKiBDeWFuIGNvbG9yXG5cdCAqIEByZXR1cm5zIHJnYigwLCAyNTUsIDI1NSlcblx0ICovXG5cdHN0YXRpYyBnZXQgQ1lBTigpOiBDb2xvciB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDI1NSwgMSk7XG5cdH1cblxuXHQvKipcdFxuXHQgKiBXaGl0ZSBjb2xvclxuXHQgKiBAcmV0dXJucyByZ2IoMjU1LCAyNTUsIDI1NSlcblx0ICovXG5cdHN0YXRpYyBnZXQgV0hJVEUoKTogQ29sb3Ige1xuXHRcdHJldHVybiBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgMSk7XG5cdH0gXG5cblx0LyoqXHRcblx0ICogQmxhY2sgY29sb3Jcblx0ICogQHJldHVybnMgcmdiKDAsIDAsIDApXG5cdCAqL1xuXHRzdGF0aWMgZ2V0IEJMQUNLKCk6IENvbG9yIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKDAsIDAsIDAsIDEpO1xuXHR9XG5cblx0LyoqXHRcblx0ICogT3JhbmdlIGNvbG9yXG5cdCAqIEByZXR1cm5zIHJnYigyNTUsIDEwMCwgMClcblx0ICovXG5cdHN0YXRpYyBnZXQgT1JBTkdFKCk6IENvbG9yIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKDI1NSwgMTAwLCAwLCAxKTtcblx0fVxuXHRzdGF0aWMgZ2V0IFBVUlBMRSgpOiBDb2xvcntcblx0XHRyZXR1cm4gbmV3IENvbG9yKDExMiwgOTAsIDI0OCwgMSk7XG5cdH1cblx0LyoqXG5cdCAqIFNldHMgdGhlIGNvbG9yIHRvIHRoZSB2YWx1ZXMgcHJvdmlkZWRcblx0ICogQHBhcmFtIHIgUmVkXG5cdCAqIEBwYXJhbSBnIEdyZWVuXG5cdCAqIEBwYXJhbSBiIEJsdWVcblx0ICogQHBhcmFtIGEgQWxwaGFcblx0ICovXG5cdHNldChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIgPSAxKTogdm9pZCB7XG5cdFx0dGhpcy5yID0gcjtcblx0XHR0aGlzLmcgPSBnO1xuXHRcdHRoaXMuYiA9IGI7XG5cdFx0dGhpcy5hID0gYTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IGNvbG9yIHNsaWdodGx5IGxpZ2h0ZXIgdGhhbiB0aGUgY3VycmVudCBjb2xvclxuXHQgKiBAcmV0dXJucyBBIG5ldyBsaWdodGVyIENvbG9yXG5cdCAqL1xuXHRsaWdodGVuKCk6IENvbG9yIHtcblx0XHRyZXR1cm4gbmV3IENvbG9yKE1hdGhVdGlscy5jbGFtcCh0aGlzLnIgKyA0MCwgMCwgMjU1KSwgTWF0aFV0aWxzLmNsYW1wKHRoaXMuZyArIDQwLCAwLCAyNTUpLCBNYXRoVXRpbHMuY2xhbXAodGhpcy5iICsgNDAsIDAsIDI1NSksIE1hdGhVdGlscy5jbGFtcCh0aGlzLmEgKyAxMCwgMCwgMjU1KSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBjb2xvciBzbGlnaHRseSBkYXJrZXIgdGhhbiB0aGUgY3VycmVudCBjb2xvclxuXHQgKiBAcmV0dXJucyBBIG5ldyBkYXJrZXIgQ29sb3Jcblx0ICovXG5cdGRhcmtlbigpOiBDb2xvciB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcihNYXRoVXRpbHMuY2xhbXAodGhpcy5yIC0gNDAsIDAsIDI1NSksIE1hdGhVdGlscy5jbGFtcCh0aGlzLmcgLSA0MCwgMCwgMjU1KSwgTWF0aFV0aWxzLmNsYW1wKHRoaXMuYiAtIDQwLCAwLCAyNTUpLCBNYXRoVXRpbHMuY2xhbXAodGhpcy5hICsgMTAsIDAsIDI1NSkpO1xuXHR9XG5cdFxuXHQvKipcblx0ICogUmV0dXJucyB0aGlzIGNvbG9yIGFzIGFuIGFycmF5XG5cdCAqIEByZXR1cm5zIFtyLCBnLCBiLCBhXVxuXHQgKi9cblx0dG9BcnJheSgpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG5cdFx0cmV0dXJuIFt0aGlzLnIsIHRoaXMuZywgdGhpcy5iLCB0aGlzLmFdO1xuXHR9XG5cdGlzRXF1YWwoY29sb3I6Q29sb3IpOmJvb2xlYW57XG5cdFx0aWYoY29sb3IuYSA9PSB0aGlzLmEgJiYgY29sb3IuciA9PSB0aGlzLnIgJiYgY29sb3IuZyA9PSB0aGlzLmcgJiYgY29sb3IuYiA9PSB0aGlzLmIgKVxuICAgICBcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBmYWxzZTtcblx0fVxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY29sb3IgYXMgYSBzdHJpbmcgb2YgdGhlIGZvcm0gI1JSR0dCQlxuXHQgKiBAcmV0dXJucyAjUlJHR0JCXG5cdCAqL1xuXHR0b1N0cmluZygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBcIiNcIiArIE1hdGhVdGlscy50b0hleCh0aGlzLnIsIDIpICsgTWF0aFV0aWxzLnRvSGV4KHRoaXMuZywgMikgKyBNYXRoVXRpbHMudG9IZXgodGhpcy5iLCAyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjb2xvciBhcyBhIHN0cmluZyBvZiB0aGUgZm9ybSByZ2IociwgZywgYilcblx0ICogQHJldHVybnMgcmdiKHIsIGcsIGIpXG5cdCAqL1xuXHR0b1N0cmluZ1JHQigpOiBzdHJpbmcge1xuXHRcdHJldHVybiBcInJnYihcIiArIHRoaXMuci50b1N0cmluZygpICsgXCIsIFwiICsgdGhpcy5nLnRvU3RyaW5nKCkgKyBcIiwgXCIgKyB0aGlzLmIudG9TdHJpbmcoKSArIFwiKVwiO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGNvbG9yIGFzIGEgc3RyaW5nIG9mIHRoZSBmb3JtIHJnYmEociwgZywgYiwgYSlcblx0ICogQHJldHVybnMgcmdiYShyLCBnLCBiLCBhKVxuXHQgKi9cblx0dG9TdHJpbmdSR0JBKCk6IHN0cmluZyB7XG5cdFx0aWYodGhpcy5hID09PSAwKXtcblx0XHRcdHJldHVybiB0aGlzLnRvU3RyaW5nUkdCKCk7XG5cdFx0fVxuXHRcdHJldHVybiBcInJnYmEoXCIgKyB0aGlzLnIudG9TdHJpbmcoKSArIFwiLCBcIiArIHRoaXMuZy50b1N0cmluZygpICsgXCIsIFwiICsgdGhpcy5iLnRvU3RyaW5nKCkgKyBcIiwgXCIgKyB0aGlzLmEudG9TdHJpbmcoKSArXCIpXCJcblx0fVxuXG5cdC8qKlxuXHQgKiBUdXJucyB0aGlzIGNvbG9yIGludG8gYSBmbG9hdDMyQXJyYXkgYW5kIGNoYW5nZXMgY29sb3IgcmFuZ2UgdG8gWzAuMCwgMS4wXVxuXHQgKiBAcmV0dXJucyBhIEZsb2F0MzJBcnJheSBjb250YWluaW5nIHRoZSBjb2xvclxuXHQgKi9cblx0dG9XZWJHTCgpOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcblx0XHRcdHRoaXMuci8yNTUsXG5cdFx0XHR0aGlzLmcvMjU1LFxuXHRcdFx0dGhpcy5iLzI1NSxcblx0XHRcdHRoaXMuYVxuXHRcdF0pO1xuXHR9XG5cblx0c3RhdGljIGZyb21TdHJpbmdIZXgoc3RyOiBzdHJpbmcpOiBDb2xvciB7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGlmKHN0ci5jaGFyQXQoMCkgPT0gXCIjXCIpIGkrPSAxO1xuXHRcdGxldCByID0gTWF0aFV0aWxzLmZyb21IZXgoc3RyLnN1YnN0cmluZyhpLCBpKzIpKTtcblx0XHRsZXQgZyA9IE1hdGhVdGlscy5mcm9tSGV4KHN0ci5zdWJzdHJpbmcoaSsyLCBpKzQpKTtcblx0XHRsZXQgYiA9IE1hdGhVdGlscy5mcm9tSGV4KHN0ci5zdWJzdHJpbmcoaSs0LCBpKzYpKTtcblx0XHRyZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIpO1xuXHR9XG59IiwiLy8gQGlnbm9yZVBhZ2VcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWFzZUZ1bmN0aW9ucyB7XG5cbiAgICBzdGF0aWMgZWFzZUluT3V0U2luZSh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gLShNYXRoLmNvcyhNYXRoLlBJICogeCkgLSAxKSAvIDI7XG4gICAgfVxuXG4gICAgc3RhdGljIGVhc2VPdXRJblNpbmUoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHggPCAwLjUgPyAtTWF0aC5jb3MoTWF0aC5QSSooeCArIDAuNSkpLzIgOiAtTWF0aC5jb3MoTWF0aC5QSSooeCAtIDAuNSkpLzIgKyAxO1xuICAgIH1cblxuICAgIHN0YXRpYyBlYXNlT3V0U2luZSh4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zaW4oKHggKiBNYXRoLlBJKSAvIDIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlYXNlSW5TaW5lKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAxIC0gTWF0aC5jb3MoKHggKiBNYXRoLlBJKSAvIDIpOyBcbiAgICB9XG5cbiAgICBzdGF0aWMgZWFzZUluT3V0UXVpbnQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHggPCAwLjUgPyAxNiAqIHggKiB4ICogeCAqIHggKiB4IDogMSAtIE1hdGgucG93KC0yICogeCArIDIsIDUpIC8gMjsgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGVhc2VJbk91dFF1YWQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHggPCAwLjUgPyAyICogeCAqIHggOiAxIC0gTWF0aC5wb3coLTIgKiB4ICsgMiwgMikgLyAyO1xuICAgIH1cblxuICAgIHN0YXRpYyBlYXNlT3V0SW5RdWFkKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB4IDwgMC41ID8gdGhpcy5lYXNlT3V0SW5fT3V0UG93KHgsIDIpIDogdGhpcy5lYXNlT3V0SW5fSW5Qb3coeCwgMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZWFzZU91dEluX091dFBvdyh4OiBudW1iZXIsIHBvdzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGgucG93KC0yICogeCArIDEsIHBvdykgLyAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVhc2VPdXRJbl9JblBvdyh4OiBudW1iZXIsIHBvdzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDAuNSArIE1hdGgucG93KDIgKiB4IC0gMSwgcG93KSAvIDI7XG4gICAgfVxufVxuXG5leHBvcnQgZW51bSBFYXNlRnVuY3Rpb25UeXBlIHtcbiAgICAvLyBTSU5FXG4gICAgSU5fT1VUX1NJTkUgPSBcImVhc2VJbk91dFNpbmVcIixcbiAgICBPVVRfSU5fU0lORSA9IFwiZWFzZU91dEluU2luZVwiLFxuICAgIElOX1NJTkUgPSBcImVhc2VJblNpbmVcIixcbiAgICBPVVRfU0lORSA9IFwiZWFzZU91dFNpbmVcIixcblxuICAgIC8vIFFVQURcbiAgICBJTl9PVVRfUVVBRCA9IFwiZWFzZUluT3V0UXVhZFwiLFxuICAgIE9VVF9JTl9RVUFEID0gXCJlYXNlT3V0SW5RdWFkXCIsXG5cbiAgICAvLyBRVUlOVFxuICAgIElOX09VVF9RVUlOVCA9IFwiZWFzZUluT3V0UXVpbnRcIlxufSIsImltcG9ydCBWZWMyIGZyb20gXCIuLi9EYXRhVHlwZXMvVmVjMlwiO1xuXG4vKiogQSBjbGFzcyBjb250YWluaW5nIHNvbWUgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIG1hdGggb3BlcmF0aW9ucyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0aFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzaWduIG9mIHRoZSB2YWx1ZSBwcm92aWRlZFxuICAgICAqIEBwYXJhbSB4IFRoZSB2YWx1ZSB0byBleHRyYWN0IHRoZSBzaWduIGZyb21cbiAgICAgKiBAcmV0dXJucyAtMSBpZiB0aGUgbnVtYmVyIGlzIGxlc3MgdGhhbiAwLCAxIG90aGVyd2lzZVxuICAgICAqL1xuICAgIHN0YXRpYyBzaWduKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB4IDwgMCA/IC0xIDogMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHggaXMgYmV0d2VlbiBhIGFuZCBiXG4gICAgICogQHBhcmFtIGEgVGhlIG1pbiBib3VuZFxuICAgICAqIEBwYXJhbSBiIFRoZSBtYXggYm91bmRcbiAgICAgKiBAcGFyYW0geCBUaGUgdmFsdWUgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gZXhjbHVzaXZlIFdoZXRoZXIgb3Igbm90IGEgYW5kIGIgYXJlIGV4Y2x1c2l2ZSBib3VuZHNcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHggaXMgYmV0d2VlbiBhIGFuZCBiLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYmV0d2VlbihhOiBudW1iZXIsIGI6IG51bWJlciwgeDogbnVtYmVyLCBleGNsdXNpdmU/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKGV4Y2x1c2l2ZSl7XG4gICAgICAgICAgICByZXR1cm4gKGEgPCB4KSAmJiAoeCA8IGIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChhIDw9IHgpICYmICh4IDw9IGIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xhbXBzIHRoZSB2YWx1ZSB4IHRvIHRoZSByYW5nZSBbbWluLCBtYXhdLCByb3VuZGluZyB1cCBvciBkb3duIGlmIG5lZWRlZFxuICAgICAqIEBwYXJhbSB4IFRoZSB2YWx1ZSB0byBiZSBjbGFtcGVkXG4gICAgICogQHBhcmFtIG1pbiBUaGUgbWluIG9mIHRoZSByYW5nZVxuICAgICAqIEBwYXJhbSBtYXggVGhlIG1heCBvZiB0aGUgcmFuZ2VcbiAgICAgKiBAcmV0dXJucyB4LCBpZiBpdCBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4LCBvciBtaW4vbWF4IGlmIGl0IGV4Y2VlZHMgdGhlaXIgYm91bmRzXG4gICAgICovXG4gICAgc3RhdGljIGNsYW1wKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYoeCA8IG1pbikgcmV0dXJuIG1pbjtcbiAgICAgICAgaWYoeCA+IG1heCkgcmV0dXJuIG1heDtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xhbXBzIHRoZSB2YWx1ZSB4IHRvIHRoZSByYW5nZSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgKiBAcGFyYW0geCBUaGUgdmFsdWUgdG8gYmUgY2xhbXBlZFxuICAgICAqIEByZXR1cm5zIHgsIGlmIGl0IGlzIGJldHdlZW4gMCBhbmQgMSwgb3IgMC8xIGlmIGl0IGV4Y2VlZHMgdGhlaXIgYm91bmRzXG4gICAgICovXG4gICAgc3RhdGljIGNsYW1wMDEoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlscy5jbGFtcCh4LCAwLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgdGhlIGxvd2VyIGVuZCBvZiB0aGUgdmFsdWUgb2YgeCB0byB0aGUgcmFuZ2UgdG8gbWluXG4gICAgICogQHBhcmFtIHggVGhlIHZhbHVlIHRvIGJlIGNsYW1wZWRcbiAgICAgKiBAcGFyYW0gbWluIFRoZSBtaW5pbXVtIGFsbG93ZWQgdmFsdWUgb2YgeFxuICAgICAqIEByZXR1cm5zIHgsIGlmIGl0IGlzIGdyZWF0ZXIgdGhhbiBtaW4sIG90aGVyd2lzZSBtaW5cbiAgICAgKi9cbiAgICBzdGF0aWMgY2xhbXBMb3coeDogbnVtYmVyLCBtaW46IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB4IDwgbWluID8gbWluIDogeDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgdGhlIGxvd2VyIGVuZCBvZiB0aGUgdmFsdWUgb2YgeCB0byB6ZXJvXG4gICAgICogQHBhcmFtIHggVGhlIHZhbHVlIHRvIGJlIGNsYW1wZWRcbiAgICAgKiBAcmV0dXJucyB4LCBpZiBpdCBpcyBncmVhdGVyIHRoYW4gMCwgb3RoZXJ3aXNlIDBcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xhbXBMb3cwKHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoVXRpbHMuY2xhbXBMb3coeCwgMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsYW1wTWFnbml0dWRlKHY6IFZlYzIsIG06IG51bWJlcik6IFZlYzIge1xuICAgICAgICBpZih2Lm1hZ1NxKCkgPiBtKm0pe1xuICAgICAgICAgICAgcmV0dXJuIHYuc2NhbGVUbyhtKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhbmdlUmFuZ2UoeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIG5ld01pbjogbnVtYmVyLCBuZXdNYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlcnAobmV3TWluLCBuZXdNYXgsIHRoaXMuaW52TGVycChtaW4sIG1heCwgeCkpO1xuICAgIH1cblxuICAgIC8qKlxuXHQgKiBMaW5lYXIgSW50ZXJwb2xhdGlvblxuXHQgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgZm9yIHRoZSBpbnRlcnBvbGF0aW9uIGJvdW5kXG5cdCAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgdmFsdWUgZm9yIHRoZSBpbnRlcnBvbGF0aW9uIGJvdW5kXG5cdCAqIEBwYXJhbSB0IFRoZSB0aW1lIHdlIGFyZSBpbnRlcnBvbGF0aW5nIHRvXG4gICAgICogQHJldHVybnMgVGhlIHZhbHVlIGJldHdlZW4gYSBhbmQgYiBhdCB0aW1lIHRcblx0ICovXG5cdHN0YXRpYyBsZXJwKGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gYSArIHQgKiAoYiAtIGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludmVyc2UgTGluZWFyIEludGVycG9sYXRpb24uIEZpbmRzIHRoZSB0aW1lIGF0IHdoaWNoIGEgdmFsdWUgYmV0d2VlbiBhIGFuZCBiIHdvdWxkIG9jY3VyXG4gICAgICogQHBhcmFtIGEgVGhlIGZpcnN0IHZhbHVlIGZvciB0aGUgaW50ZXJwb2xhdGlvbiBib3VuZFxuICAgICAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgdmFsdWUgZm9yIHRoZSBpbnRlcnBvbGF0aW9uIGJvdW5kXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBjdXJyZW50IHZhbHVlXG4gICAgICogQHJldHVybnMgVGhlIHRpbWUgYXQgd2hpY2ggdGhlIGN1cnJlbnQgdmFsdWUgb2NjdXJzIGJldHdlZW4gYSBhbmQgYlxuICAgICAqL1xuICAgIHN0YXRpYyBpbnZMZXJwKGE6IG51bWJlciwgYjogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKXtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAtIGEpLyhiIC0gYSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEN1dHMgb2ZmIGRlY2ltYWwgcG9pbnRzIG9mIGEgbnVtYmVyIGFmdGVyIGEgc3BlY2lmaWVkIHBsYWNlXG4gICAgICogQHBhcmFtIG51bSBUaGUgbnVtYmVyIHRvIGZsb29yXG4gICAgICogQHBhcmFtIHBsYWNlIFRoZSBsYXN0IGRlY2ltYWwgcGxhY2Ugb2YgdGhlIG5ldyBudW1iZXJcbiAgICAgKiBAcmV0dXJucyBUaGUgZmxvb3JlZCBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgZmxvb3JUb1BsYWNlKG51bTogbnVtYmVyLCBwbGFjZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYocGxhY2UgPT09IDApe1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmYWN0b3IgPSAxMDtcbiAgICAgICAgd2hpbGUocGxhY2UgPiAxKXtcbiAgICAgICAgICAgIGZhY3RvciAhPSAxMDtcbiAgICAgICAgICAgIHBsYWNlLS07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW0qZmFjdG9yKS9mYWN0b3I7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbnVtYmVyIGZyb20gYSBoZXggc3RyaW5nXG4gICAgICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGhleCBudW1iZXJcbiAgICAgKiBAcmV0dXJucyB0aGUgbnVtYmVyIGluIGRlY2ltYWwgcmVwcmVzZW50ZWQgYnkgdGhlIGhleCBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUhleChzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChzdHIsIDE2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgYXMgYSBoZXhhZGVjaW1hbFxuICAgICAqIEBwYXJhbSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0IHRvIGhleFxuICAgICAqIEBwYXJhbSBtaW5MZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcmV0dXJuZWQgaGV4IHN0cmluZyAoYWRkcyB6ZXJvIHBhZGRpbmcgaWYgbmVlZGVkKVxuICAgICAqIEByZXR1cm5zIFRoZSBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlciBhcyBhIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0hleChudW06IG51bWJlciwgbWluTGVuZ3RoOiBudW1iZXIgPSBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGZhY3RvciA9IDE7XG4gICAgICAgIHdoaWxlKGZhY3RvcioxNiA8IG51bSl7XG4gICAgICAgICAgICBmYWN0b3IgKj0gMTY7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhleFN0ciA9IFwiXCI7XG4gICAgICAgIHdoaWxlKGZhY3RvciA+PSAxKXtcbiAgICAgICAgICAgIGxldCBkaWdpdCA9IE1hdGguZmxvb3IobnVtL2ZhY3Rvcik7XG4gICAgICAgICAgICBoZXhTdHIgKz0gTWF0aFV0aWxzLnRvSGV4RGlnaXQoZGlnaXQpO1xuICAgICAgICAgICAgbnVtIC09IGRpZ2l0ICogZmFjdG9yO1xuICAgICAgICAgICAgZmFjdG9yIC89IDE2O1xuXHRcdH1cblx0XHRcblx0XHRpZihtaW5MZW5ndGggIT09IG51bGwpe1xuXHRcdFx0d2hpbGUoaGV4U3RyLmxlbmd0aCA8IG1pbkxlbmd0aCl7XG5cdFx0XHRcdGhleFN0ciA9IFwiMFwiICsgaGV4U3RyO1xuXHRcdFx0fVxuXHRcdH1cblxuICAgICAgICByZXR1cm4gaGV4U3RyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgZGlnaXQgdG8gaGV4YWRlY2ltYWwuIEluIHRoaXMgY2FzZSwgYSBkaWdpdCBpcyBiZXR3ZWVuIDAgYW5kIDE1IGluY2x1c2l2ZVxuICAgICAqIEBwYXJhbSBudW0gVGhlIGRpZ2l0IHRvIGNvbnZlcnQgdG8gaGV4YWRlY2ltYWxcbiAgICAgKiBAcmV0dXJucyBUaGUgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkaWdpdCBhcyBhIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0hleERpZ2l0KG51bTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYobnVtIDwgMTApe1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBudW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIG51bSAtIDEwKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgVmVjMiBmcm9tIFwiLi4vRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi9Db2xvclwiO1xuaW1wb3J0IE1hdGhVdGlscyBmcm9tIFwiLi9NYXRoVXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyaW5nVXRpbHMge1xuXHRzdGF0aWMgdG9XZWJHTENvb3Jkcyhwb2ludDogVmVjMiwgb3JpZ2luOiBWZWMyLCB3b3JsZFNpemU6IFZlYzIpOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcblx0XHRcdE1hdGhVdGlscy5jaGFuZ2VSYW5nZShwb2ludC54LCBvcmlnaW4ueCwgb3JpZ2luLnggKyB3b3JsZFNpemUueCwgLTEsIDEpLFxuXHRcdFx0TWF0aFV0aWxzLmNoYW5nZVJhbmdlKHBvaW50LnksIG9yaWdpbi55LCBvcmlnaW4ueSArIHdvcmxkU2l6ZS55LCAxLCAtMSlcblx0XHRdKTtcblx0fVxuXG5cdHN0YXRpYyB0b1dlYkdMU2NhbGUoc2l6ZTogVmVjMiwgd29ybGRTaXplOiBWZWMyKTogRmxvYXQzMkFycmF5IHtcblx0XHRyZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG5cdFx0XHQyKnNpemUueC93b3JsZFNpemUueCxcblx0XHRcdDIqc2l6ZS55L3dvcmxkU2l6ZS55LFxuXHRcdF0pO1xuXHR9XG5cblx0c3RhdGljIHRvV2ViR0xDb2xvcihjb2xvcjogQ29sb3IpOiBGbG9hdDMyQXJyYXkge1xuXHRcdHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcblx0XHRcdE1hdGhVdGlscy5jaGFuZ2VSYW5nZShjb2xvci5yLCAwLCAyNTUsIDAsIDEpLFxuXHRcdFx0TWF0aFV0aWxzLmNoYW5nZVJhbmdlKGNvbG9yLmcsIDAsIDI1NSwgMCwgMSksXG5cdFx0XHRNYXRoVXRpbHMuY2hhbmdlUmFuZ2UoY29sb3IuYiwgMCwgMjU1LCAwLCAxKSxcblx0XHRcdGNvbG9yLmFcblx0XHRdKTtcblx0fVxufSIsIi8qKiBTb21lIHV0aWxpdHkgZnVuY3Rpb25zIGZvciBkZWFsaW5nIHdpdGggc3RyaW5ncyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEV4dHJhY3RzIHRoZSBwYXRoIGZyb20gYSBmaWxlcGF0aCB0aGF0IGluY2x1ZGVzIHRoZSBmaWxlXG4gICAgICogQHBhcmFtIGZpbGVQYXRoIHRoZSBmaWxlcGF0aCB0byBleHRyYWN0IHRoZSBwYXRoIGZyb21cbiAgICAgKiBAcmV0dXJucyBUaGUgcGF0aCBwb3J0aW9uIG9mIHRoZSBmaWxlcGF0aCBwcm92aWRlZFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQYXRoRnJvbUZpbGVQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3BsaXRQYXRoID0gZmlsZVBhdGguc3BsaXQoXCIvXCIpO1xuICAgICAgICBzcGxpdFBhdGgucG9wKCk7XG4gICAgICAgIHNwbGl0UGF0aC5wdXNoKFwiXCIpO1xuICAgICAgICByZXR1cm4gc3BsaXRQYXRoLmpvaW4oXCIvXCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgU3RhdGVNYWNoaW5lQUkgZnJvbSBcIi4uLy4uLy4uL1dvbGZpZTJEL0FJL1N0YXRlTWFjaGluZUFJXCI7XG5pbXBvcnQgVmVjMiBmcm9tIFwiLi4vLi4vLi4vV29sZmllMkQvRGF0YVR5cGVzL1ZlYzJcIjtcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi4vLi4vLi4vV29sZmllMkQvSW5wdXQvSW5wdXRcIjtcbmltcG9ydCBBbmltYXRlZFNwcml0ZSBmcm9tIFwiLi4vLi4vLi4vV29sZmllMkQvTm9kZXMvU3ByaXRlcy9BbmltYXRlZFNwcml0ZVwiO1xuXG4vKipcbiAqIFN0cmluZ3MgdXNlZCBpbiB0aGUga2V5IGJpbmRpbmcgZm9yIHRoZSBwbGF5ZXJcbiAqL1xuZXhwb3J0IGVudW0gUGxheWVySW5wdXQge1xuICAgIE1PVkVfVVAgPSBcIk1PVkVfVVBcIixcbiAgICBNT1ZFX0RPV04gPSBcIk1PVkVfRE9XTlwiLFxuICAgIE1PVkVfTEVGVCA9IFwiTU9WRV9MRUZUXCIsXG4gICAgTU9WRV9SSUdIVCA9IFwiTU9WRV9SSUdIVFwiLFxuICAgIEFUVEFDS0lORyA9IFwiQVRUQUNLSU5HXCIsXG4gICAgU0hJRUxESU5HID0gXCJTSElFTERJTkdcIixcbiAgICBVTFRJTUFURSA9IFwiVUxUSU1BVEVcIixcbiAgICBQSUNLVVBfSVRFTSA9IFwiUElDS1VQX0lURU1cIixcbiAgICBEUk9QX0lURU0gPSBcIkRST1BfSVRFTVwiLFxuICAgXG59XG5leHBvcnQgZW51bSBVc2VJdGVtSW5wdXQge1xuICAgIFVTRV9JVEVNMSA9IFwiVVNFX0lURU0xXCIsXG4gICAgVVNFX0lURU0yID0gXCJVU0VfSVRFTTJcIixcbiAgICBVU0VfSVRFTTMgPSBcIlVTRV9JVEVNM1wiLFxuICAgIFVTRV9JVEVNNCA9IFwiVVNFX0lURU00XCIsXG4gICAgVVNFX0lURU01ID0gXCJVU0VfSVRFTTVcIixcbiAgfVxuZXhwb3J0IGNvbnN0IFBsYXllckFuaW1hdGlvbnMgPSB7XG4gICAgSURMRSA6IFwiSURMRVwiLFxuICAgIEFUVEFDS0lORzogXCJBVFRBQ0tJTkdcIixcbiAgICBNT1ZJTkcgOiBcIk1PVklOR1wiLFxuICAgIFNISUVMRElORzogXCJTSElFTERJTkdcIlxufSBhcyBjb25zdFxuXG4vKipcbiAqIFRoZSBQbGF5ZXJDb250cm9sbGVyIGNsYXNzIGhhbmRsZXMgcHJvY2Vzc2luZyB0aGUgaW5wdXQgcmVjaWV2ZWQgZnJvbSB0aGUgdXNlciBhbmQgZXhwb3NlcyAgXG4gKiBhIHNldCBvZiBtZXRob2RzIHRvIG1ha2UgZGVhbGluZyB3aXRoIHRoZSB1c2VyIGlucHV0IGEgYml0IHNpbXBsZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckNvbnRyb2xsZXJ7XG5cbiAgICAvKiogVGhlIEdhbWVOb2RlIHRoYXQgb3ducyB0aGUgQUkgKi9cbiAgICBwcm90ZWN0ZWQgb3duZXI6IEFuaW1hdGVkU3ByaXRlO1xuXG4gICAgY29uc3RydWN0b3Iob3duZXI6IEFuaW1hdGVkU3ByaXRlKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkaXJlY3Rpb24gdGhlIHBsYXllciBzaG91bGQgbW92ZSBiYXNlZCBvbiBpbnB1dCBmcm9tIHRoZSBrZXlib2FyZC4gXG4gICAgICogQHJldHVybnMgYSBWZWMyIGluZGljYXRpbmcgdGhlIGRpcmVjdGlvbiB0aGUgcGxheWVyIHNob3VsZCBtb3ZlLiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG1vdmVEaXIoKTogVmVjMiB7IFxuICAgICAgICBsZXQgZGlyOiBWZWMyID0gVmVjMi5aRVJPO1xuICAgICAgICBkaXIueSA9IChJbnB1dC5pc1ByZXNzZWQoUGxheWVySW5wdXQuTU9WRV9VUCkgPyAtMSA6IDApICsgKElucHV0LmlzUHJlc3NlZChQbGF5ZXJJbnB1dC5NT1ZFX0RPV04pID8gMSA6IDApO1xuXHRcdGRpci54ID0gKElucHV0LmlzUHJlc3NlZChQbGF5ZXJJbnB1dC5NT1ZFX0xFRlQpID8gLTEgOiAwKSArIChJbnB1dC5pc1ByZXNzZWQoUGxheWVySW5wdXQuTU9WRV9SSUdIVCkgPyAxIDogMCk7XG4gICAgICAgIHJldHVybiBkaXIubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIEdldHMgdGhlIGRpcmVjdGlvbiB0aGUgcGxheWVyIHNob3VsZCBiZSBmYWNpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uIG9mIHRoZVxuICAgICAqIG1vdXNlIGFyb3VuZCB0aGUgcGxheWVyXG4gICAgICogQHJldHVybiBhIFZlYzIgcmVwcmVzZW50aW5nIHRoZSBkaXJlY3Rpb24gdGhlIHBsYXllciBzaG91bGQgZmFjZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGZhY2VEaXIoKTogVmVjMiB7IHJldHVybiB0aGlzLm93bmVyLnBvc2l0aW9uLmRpclRvKElucHV0LmdldEdsb2JhbE1vdXNlUG9zaXRpb24oKSk7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJvdGF0aW9uIG9mIHRoZSBwbGF5ZXJzIHNwcml0ZSBiYXNlZCBvbiB0aGUgZGlyZWN0aW9uIHRoZSBwbGF5ZXJcbiAgICAgKiBzaG91bGQgYmUgZmFjaW5nLlxuICAgICAqIEByZXR1cm4gYSBudW1iZXIgcmVwcmVzZW50aW5nIGhvdyBtdWNoIHRoZSBwbGF5ZXIgc2hvdWxkIGJlIHJvdGF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvdGF0aW9uKCk6IG51bWJlciB7IHJldHVybiBWZWMyLlVQLmFuZ2xlVG9DQ1codGhpcy5mYWNlRGlyKTsgfVxuXG4gICAgLyoqIFxuICAgICAqIENoZWNrcyBpZiB0aGUgcGxheWVyIGlzIGF0dGVtcHRpbmcgdG8gdXNlIGEgaGVsZCBpdGVtIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJuIHRydWUgaWYgdGhlIHBsYXllciBpcyBhdHRlbXB0aW5nIHRvIHVzZSBhIGhlbGQgaXRlbTsgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgcHVibGljIGdldCB1c2VJdGVtKCk6IGJvb2xlYW4geyByZXR1cm4gSW5wdXQuaXNNb3VzZUp1c3RQcmVzc2VkKCk7IH1cblxuICAgIC8qKiBcbiAgICAgKiBDaGVja3MgaWYgdGhlIHBsYXllciBpcyBhdHRlbXB0aW5nIHRvIHBpY2sgdXAgYW4gaXRlbSBvciBub3QuXG4gICAgICogQHJldHVybiB0cnVlIGlmIHRoZSBwbGF5ZXIgaXMgYXR0ZW1wdGluZyB0byBwaWNrIHVwIGFuIGl0ZW07IGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHBpY2tpbmdVcCgpOiBib29sZWFuIHsgcmV0dXJuIElucHV0LmlzSnVzdFByZXNzZWQoUGxheWVySW5wdXQuUElDS1VQX0lURU0pOyB9XG5cbiAgICBwdWJsaWMgZ2V0IGF0dGFja2luZygpOiBib29sZWFuIHsgcmV0dXJuIElucHV0LmlzSnVzdFByZXNzZWQoUGxheWVySW5wdXQuQVRUQUNLSU5HKTsgfVxuXG4gICAgcHVibGljIGdldCBzaGllbGRpbmcoKTogYm9vbGVhbiB7IHJldHVybiBJbnB1dC5pc0p1c3RQcmVzc2VkKFBsYXllcklucHV0LlNISUVMRElORyk7IH1cblxuICAgIHB1YmxpYyBnZXQgdWx0aW1hdGUoKTogYm9vbGVhbiB7IHJldHVybiBJbnB1dC5pc0p1c3RQcmVzc2VkKFBsYXllcklucHV0LlVMVElNQVRFKTsgfVxuXG4gICAgLyoqIFxuICAgICAqIENoZWNrcyBpZiB0aGUgcGxheWVyIGlzIGF0dGVtcHRpbmcgdG8gZHJvcCB0aGVpciBoZWxkIGl0ZW0gb3Igbm90LlxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgcGxheWVyIGlzIGF0dGVtcHRpbmcgdG8gZHJvcCB0aGVpciBoZWxkIGl0ZW07IGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGRyb3BwaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gSW5wdXQuaXNKdXN0UHJlc3NlZChQbGF5ZXJJbnB1dC5EUk9QX0lURU0pOyB9XG5cblxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuL1dvbGZpZTJEL0xvb3AvR2FtZVwiO1xuaW1wb3J0IE1haW5NZW51IGZyb20gXCIuL2RlbW9HYW1lL1NjZW5lcy9NYWluTWVudVNjZW5lXCI7XG5pbXBvcnQgeyBQbGF5ZXJJbnB1dCB9IGZyb20gXCIuL2RlbW9HYW1lL0FJL1BsYXllci9QbGF5ZXJDb250cm9sbGVyXCI7XG5pbXBvcnQgZGVmYXVsdF9zY2VuZSBmcm9tIFwiLi9kZWZhdWx0X3NjZW5lXCI7XG4vLyBpbXBvcnQgTWFpbkhXNFNjZW5lIGZyb20gXCIuL2RlbW9HYW1lL1NjZW5lcy9NYWluSFc0U2NlbmVcIjtcbmltcG9ydCBJbnRyb0xldmVsU2NlbmUgZnJvbSBcIi4vZGVtb0dhbWUvU2NlbmVzL0ludHJvTGV2ZWxTY2VuZVwiO1xuaW1wb3J0IFN0YXJ0U2NlbmUgZnJvbSBcIi4vZGVtb0dhbWUvU2NlbmVzL1N0YXJ0U2NlbmVcIjtcbmltcG9ydCBDb250cm9sU2NlbmUgZnJvbSBcIi4vZGVtb0dhbWUvU2NlbmVzL0NvbnRyb2xTY2VuZVwiO1xuaW1wb3J0IEhlbHBTY2VuZSBmcm9tIFwiLi9kZW1vR2FtZS9TY2VuZXMvSGVscFNjZW5lXCI7XG5pbXBvcnQgU2VsZWN0TGV2ZWxNZW51U2NlbmUgZnJvbSBcIi4vZGVtb0dhbWUvU2NlbmVzL1NlbGVjdExldmVsTWVudVNjZW5lXCI7XG5pbXBvcnQgQnViYmxlU2hhZGVyVHlwZSBmcm9tIFwiLi9kZW1vR2FtZS9TaGFkZXJzL0J1YmJsZVNoYWRlclR5cGVcIjtcbmltcG9ydCBMYXNlclNoYWRlclR5cGUgZnJvbSBcIi4vZGVtb0dhbWUvU2hhZGVycy9MYXNlclNoYWRlclR5cGVcIjtcbmltcG9ydCBSZWdpc3RyeU1hbmFnZXIgZnJvbSBcIi4vV29sZmllMkQvUmVnaXN0cnkvUmVnaXN0cnlNYW5hZ2VyXCI7XG5pbXBvcnQgeyBVc2VJdGVtSW5wdXQgfSBmcm9tIFwiLi9kZW1vR2FtZS9BSS9QbGF5ZXIvUGxheWVyQ29udHJvbGxlclwiO1xuaW1wb3J0IENoZWF0Q29kZU1lbnVTY2VuZSBmcm9tIFwiLi9kZW1vR2FtZS9TY2VuZXMvQ2hlYXRDb2RlTWVudVNjZW5lXCI7XG4vLyBUaGUgbWFpbiBmdW5jdGlvbiBpcyB5b3VyIGVudHJ5cG9pbnQgaW50byBXb2xmaWUyRC4gU3BlY2lmeSB5b3VyIGZpcnN0IHNjZW5lIGFuZCBhbnkgb3B0aW9ucyBoZXJlLlxuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgLy8gUnVuIGFueSB0ZXN0c1xuICAgIHJ1blRlc3RzKCk7XG5cbiAgICAvLyBTZXQgdXAgb3B0aW9ucyBmb3Igb3VyIGdhbWVcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgY2FudmFzU2l6ZTogeyB4OiAxMDI0LCB5OiAxMDI0IH0sICAgICAgICAgIC8vIFRoZSBzaXplIG9mIHRoZSBnYW1lXG4gICAgICAgIGNsZWFyQ29sb3I6IHsgcjogMC4xLCBnOiAwLjEsIGI6IDAuMSB9LCAgIC8vIFRoZSBjb2xvciB0aGUgZ2FtZSBjbGVhcnMgdG9cbiAgICAgICAgaW5wdXRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6IFBsYXllcklucHV0Lk1PVkVfVVAsIGtleXM6IFtcIndcIl0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogUGxheWVySW5wdXQuTU9WRV9ET1dOLCBrZXlzOiBbXCJzXCJdIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFBsYXllcklucHV0Lk1PVkVfTEVGVCwga2V5czogW1wiYVwiXSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBQbGF5ZXJJbnB1dC5NT1ZFX1JJR0hULCBrZXlzOiBbXCJkXCJdIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFBsYXllcklucHV0LlBJQ0tVUF9JVEVNLCBrZXlzOiBbXCJlXCJdIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFBsYXllcklucHV0LkRST1BfSVRFTSwga2V5czogW1wicVwiXSB9LFxuICAgICAgICAgICAgeyBuYW1lOiBQbGF5ZXJJbnB1dC5BVFRBQ0tJTkcsIGtleXM6IFtcImpcIl0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogUGxheWVySW5wdXQuU0hJRUxESU5HLCBrZXlzOiBbXCJrXCJdIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFBsYXllcklucHV0LlVMVElNQVRFLCBrZXlzOiBbXCJ1XCJdIH0sXG4gICAgICAgICAgICB7IG5hbWU6IFwic2xvdDJcIiwga2V5czogW1wiMlwiXSB9LFxuICAgICAgICBdLFxuICAgICAgICAvLyB1c2VXZWJHTDogdHJ1ZSwgICBcbiAgICAgICAgdXNlV2ViR0w6IGZhbHNlLCAgICAgICAgICAgICAgICAgIC8vIFRlbGwgdGhlIGdhbWUgd2Ugd2FudCB0byB1c2Ugd2ViZ2xcbiAgICAgICAgc2hvd0RlYnVnOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgIC8vIFdoZXRoZXIgdG8gc2hvdyBkZWJ1ZyBtZXNzYWdlcy4gWW91IGNhbiBjaGFuZ2UgdGhpcyB0byB0cnVlIGlmIHlvdSB3YW50XG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIGN1c3RvbSByZWdpc3RyaWVzXG4gICAgLy8gUmVnaXN0cnlNYW5hZ2VyLnNoYWRlcnMucmVnaXN0ZXJBbmRQcmVsb2FkSXRlbShcbiAgICAvLyAgICAgQnViYmxlU2hhZGVyVHlwZS5LRVksICAgLy8gVGhlIGtleSBvZiB0aGUgc2hhZGVyIHByb2dyYW1cbiAgICAvLyAgICAgQnViYmxlU2hhZGVyVHlwZSwgICAgICAgICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgc2hhZGVyIHByb2dyYW1cbiAgICAvLyAgICAgQnViYmxlU2hhZGVyVHlwZS5WU0hBREVSLCAgIC8vIFRoZSBwYXRoIHRvIHRoZSB2ZXJ0ZXggc2hhZGVyXG4gICAgLy8gICAgIEJ1YmJsZVNoYWRlclR5cGUuRlNIQURFUik7ICAvLyB0aGUgcGF0aCB0byB0aGUgZnJhZ21lbnQgc2hhZGVyKi9cblxuICAgIC8vIFJlZ2lzdHJ5TWFuYWdlci5zaGFkZXJzLnJlZ2lzdGVyQW5kUHJlbG9hZEl0ZW0oXG4gICAgLy8gICAgIExhc2VyU2hhZGVyVHlwZS5LRVksXG4gICAgLy8gICAgIExhc2VyU2hhZGVyVHlwZSxcbiAgICAvLyAgICAgTGFzZXJTaGFkZXJUeXBlLlZTSEFERVIsXG4gICAgLy8gICAgIExhc2VyU2hhZGVyVHlwZS5GU0hBREVSXG4gICAgLy8gKTtcbiAgICAvLyBDcmVhdGUgYSBnYW1lIHdpdGggdGhlIG9wdGlvbnMgc3BlY2lmaWVkXG4gICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKG9wdGlvbnMpO1xuICAgIC8vIFN0YXJ0IG91ciBnYW1lXG4gICAgLy8gZ2FtZS5zdGFydChJbnRyb0xldmVsU2NlbmUsIHt9KTtcbiAgICAvLyBnYW1lLnN0YXJ0KEhlbHBTY2VuZSwge30pO1xuICAgIC8vIGdhbWUuc3RhcnQoQ29udHJvbFNjZW5lLHt9KTtcbiAgICAvLyBnYW1lLnN0YXJ0KFN0YXJ0U2NlbmUsIHt9KTtcbiAgICAvLyBnYW1lLnN0YXJ0KENoZWF0Q29kZU1lbnVTY2VuZSx7fSk7XG4gICAgLy8gZ2FtZS5zdGFydChTZWxlY3RMZXZlbE1lbnVTY2VuZSx7fSk7XG4gICAgLy8gZ2FtZS5zdGFydChNYWluTWVudSwge30pO1xufSkoKTtcblxuZnVuY3Rpb24gcnVuVGVzdHMoKSB7IH07Il19
