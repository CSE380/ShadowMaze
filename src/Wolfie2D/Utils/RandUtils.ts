import MathUtils from "./MathUtils";
import Color from "./Color";
import Perlin from "./Rand/Perlin";
import Vec2 from "../DataTypes/Vec2";
import RANDOM from 'seed-random';

class Noise {
    p: Perlin = new Perlin();

    perlin(x: number, y: number, z?: number): number {
        return this.p.perlin(x, y, z);
    }
}

/** A class that has some random generator utils */
export default class RandUtils {

    private static _seed: string | undefined;
    private static _rand: () => number;

    /**
     * The random function for Wolfie2D. The random() method generates a random number using 
     * the function exported seed-random. This function does the exact same thing that 
     * Math.random() does, except it allows us to use a seed.
     * 
     * @returns a random number from the function _rand() that generates random numbers based
     * on the seed, _seed.
     */
    static random(): number {
        if (RandUtils._rand === undefined || RandUtils._rand === null) {
            RandUtils._rand = RANDOM(RandUtils.seed);
        }
        return RandUtils._rand();
    }

    static randomSeed(): string {
        return Math.random().toString();
    }

    /** 
     * Gets the seed used by the random number generator. If the seed is null or undefined,
     * a seed is generated using RandUtils.randomSeed().
     * @returns the seed
     */
    static get seed(): string {
        if (RandUtils._seed === undefined || RandUtils._seed === null) {
            RandUtils._seed = RandUtils.randomSeed();
        }
        return RandUtils._seed;
    }

    /** 
     * Sets the seed used by the random number generator. Sets the _rand function used
     * by random() to a new function, seeded with the given seed.
     * @param seed the seed used by the random number generator
     */
    static set seed(seed: string) {
        RandUtils._seed = seed;
        RandUtils._rand = RANDOM(seed);
    }

    /**
     * Generates a random integer in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns A random int in the range [min, max)
     */
    static randInt(min: number, max: number): number {
        return Math.floor(RandUtils.random() * (max - min) + min);
    }

    /**
     * Generates a random float in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns A random float in the range [min, max)
     */
    static randFloat(min: number, max: number): number {
        return RandUtils.random() * (max - min) + min;
    }

    /**
     * Generates a random hexadecimal number in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns a random hex number in the range [min, max) as a string
     */
    static randHex(min: number, max: number): string {
        return MathUtils.toHex(RandUtils.randInt(min, max));
    }

    /**
     * Generates a random color
     * @returns A random Color
     */
    static randColor(): Color {
        let r = RandUtils.randInt(0, 256);
        let g = RandUtils.randInt(0, 256);
        let b = RandUtils.randInt(0, 256);
        return new Color(r, g, b);
    }
    static randVec(minX: number, maxX: number, minY: number, maxY: number): Vec2 {
        return new Vec2(this.randFloat(minX, maxX), this.randFloat(minY, maxY));
    }
    static randOustideViewportX(offset: number, viewportSize: number): number {
        return RandUtils.random() < 0.5 ?
            RandUtils.randFloat(-offset, 0) :
            RandUtils.randFloat(viewportSize, viewportSize + offset);
    }

    public static randOutsideViewportVec(padding: number, viewportSize: number): Vec2 {
        const side = RandUtils.randInt(0, 6);
        let x: number, y: number;
        switch (side) {
            case 0: // left
                x = RandUtils.randFloat(-padding, 0);
                y = RandUtils.randFloat(-padding, viewportSize + padding);
                break;
            case 1: // right
                x = RandUtils.randFloat(viewportSize, viewportSize + padding);
                y = RandUtils.randFloat(-padding, viewportSize + padding);
                break;
            case 2: // top
                x = RandUtils.randFloat(0, viewportSize);
                y = RandUtils.randFloat(-padding, 0);
                break;
            case 3: // bottom
                x = RandUtils.randFloat(0, viewportSize);
                y = RandUtils.randFloat(viewportSize, viewportSize + padding);
                break;
            default:
                x = RandUtils.randFloat(0, viewportSize);
                y = RandUtils.randFloat(0, viewportSize);
        }
        return new Vec2(x, y);
    }


    /** A noise generator */
    static noise: Noise = new Noise();

}