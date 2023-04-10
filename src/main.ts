import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./demoGame/Scenes/MainMenuScene";
import { PlayerInput } from "./demoGame/AI/Player/PlayerController";
import default_scene from "./default_scene";
import AStarDemoScene from "./demoGame/Scenes/AstarDemoScene";
// import MainHW4Scene from "./demoGame/Scenes/MainHW4Scene";
import introLevelScene from "./demoGame/Scenes/introLevelScene";
import StartScene from "./demoGame/Scenes/StartScene";
import ControlScene from "./demoGame/Scenes/ControlScene";
import HelpScene from "./demoGame/Scenes/HelpScene";
import SelectLevelMenuScene from "./demoGame/Scenes/SelectLevelMenuScene";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){
    // Run any tests
    runTests();

    // Set up options for our game
    let options = {
        canvasSize: {x: 1024, y: 1024},          // The size of the game
        clearColor: {r: 0.1, g: 0.1, b: 0.1},   // The color the game clears to
        inputs: [
            {name: PlayerInput.MOVE_UP, keys: ["w"]},
            {name: PlayerInput.MOVE_DOWN, keys: ["s"]},
            {name: PlayerInput.MOVE_LEFT, keys: ["a"]},
            {name: PlayerInput.MOVE_RIGHT, keys: ["d"]},
            {name: PlayerInput.PICKUP_ITEM, keys: ["e"]},
            {name: PlayerInput.DROP_ITEM, keys: ["q"]},
            {name: PlayerInput.ATTACKING, keys: ["j"]},
            {name: PlayerInput.SHIELDING, keys: ["k"]},
            {name: PlayerInput.ULTIMATE, keys: ["u"]},
            {name: "slot1", keys: ["1"]},
            {name: "slot2", keys: ["2"]},
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                      // Whether to show debug messages. You can change this to true if you want
    }

    // Set up custom registries

    // Create a game with the options specified
    const game = new Game(options);
    // Start our game
    game.start(introLevelScene, {});
    // game.start(HelpScene, {});
    // game.start(ControlScene,{});
})();

function runTests(){};