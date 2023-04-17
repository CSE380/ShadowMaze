// baseLayer (base layer, where tilemap, item, player, level end locates)

// fog of  war layer (make the screen black )

// container layer (container for next layer, to serve as a background for the pause menu)
 
// PAUSE_MENU layer (display the pause menu selection )

// UI layer(display the player and game status )


export enum GameLayers {
    BEFORE_BASE = "BEFORE_BASE",
    BASE = "BASE",
    FOG_OF_WAR = "FOG_OF_WAR",
    CONTAINER = "CONTAINER",
    PAUSE_MENU = "PAUSE_MENU",
    UI = "UI",
} 