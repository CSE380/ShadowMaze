const helpText="The prince’s goal is to make it out of the maze alive! He has a sword and shield to help him do so, as well as an ultimate ability in the form of a flying sword slash. Using the attack button will swing his sword at the prince’s enemies in front of him, dealing damage. To use his shield, hold down the shield button to absorb incoming damage. Be careful though, the shield will go on cool-down if it takes too much damage. You can also parry attacks by pressing the shield button right when an attack will hit you. This will rebound ranged attacks, and stun melee enemies."
const controlText="W - Move Up\nA - Move Left\nS - Move Down\nD - Move Right\nJ - Attack\nK - Shield\nU - Sword Slash\nEsc - Pause and Menu";
function buildControlText(): Array<string> {
    const lines = controlText.split('\n');
    // const keyValuesArray = lines.map(line => line.split(' - ')[0]);
    return lines;
}
function buildHelpText(): Array<string> {
    const paragraph = helpText
    const MAX_LINE_LENGTH = 70;
    const lines = paragraph.split(" ");
    let currentLine = "";
    const result = lines.reduce((acc, word) => {
      if (currentLine.length + word.length + 1 > MAX_LINE_LENGTH) {
        acc.push(currentLine.trim());
        currentLine = "";
      }
      currentLine += `${word} `;
      return acc;
    }, []); 
    result.push(currentLine.trim());
    return result;
}
export const controlTextArray = buildControlText();
export const helpTextArray =buildHelpText();

