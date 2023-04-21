// baseLayer (base layer, where tilemap, item, player, level end locates)

// fog of  war layer (make the screen black )

// container layer (container for next layer, to serve as a background for the actual menu  )
 
// PAUSE_MENU layer (display the pause menu selection )

// TEXT_MENU layer(display help and controls)

// UI layer(display the player and game status )


export enum GameLayers {
    BEFORE_BASE = "BEFORE_BASE",
    BASE = "BASE",
    FOG_OF_WAR = "FOG_OF_WAR",
    PAUSE_MENU_CONTAINER = "PAUSE_MENU_CONTAINER",
    PAUSE_MENU = "PAUSE_MENU",
    CONTROL_TEXT_MENU_CONTAINER = "CONTROL_TEXT_MENU_CONTAINER",
    CONTROL_TEXT_MENU = "CONTROL_TEXT_MENU",
    HELP_TEXT_MENU_CONTAINER = "HELP_TEXT_MENU_CONTAINER",
    HELP_TEXT_MENU = "HELP_TEXT_MENU",
    UI = "UI",
} 