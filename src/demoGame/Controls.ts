/**
 * A set of controls for the HW4 keybinding
 */
export const HW3Controls = {
    ATTACKING: "ATTACKING", 
    SHIELDING: "SHEILDING"
} as const;

const length = 6;
function createItemButtonArray (){
    const array = [];
    for(let i = 1;i<length;i++){
        array.push(i.toString());
    }
    return array;
};

export const ItemButtonArray=createItemButtonArray();