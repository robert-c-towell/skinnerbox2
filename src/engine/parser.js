import Evaluator from "./evaluator.js";
// TODO: Import an interface instead.

let controlCommands = {
    help: "help",
    quit: "quit",
    save: "save",
}

class Parser {
    constructor(adventure, evaluator) {
        if (!adventure || adventure && typeof adventure !== "object") {
            throw new Error(`Parameter adventure is required and must be an object. Got ${typeof adventure}: ${adventure} instead.`)
        }
        if (!evaluator || evaluator && !(evaluator instanceof Evaluator)) {
            throw new Error(`Parameter evaluator is required and must be an Evaluator. Got ${typeof evaluator}: ${evaluator} instead.`)
        }
        this.adventure = adventure;
        this.evaluator = evaluator;
    }

    /**
     * 
     * @param {string} instruction - the command the player types
     * @param {string} playerName - the player's name
     * @returns 
     */
    parse(instruction, playerName) {
        if (!instruction || typeof instruction !== "string") {
            throw new Error(`Parameter instruction is required and must be a string. Got ${typeof instruction}: ${instruction} instead.`);
        } else if (!playerName || typeof playerName !== "string") {
            throw new Error(`Parameter playerName is required and must be a string. Got ${typeof playerName}: ${playerName} instead.`);
        }

        let words = instruction.split(" ");

        /**
         * 1. check system command
         * 2. check author command
         * 3. find noun, look for verb
         * 4. execute appropriate case
         */

        if (words.length === 1) {

        } else if (words.length === 2) {
            let [verb, noun] = words;
            let relevantProps = getRelevantProps(this.adventure, playerName);
            let validNouns = getValidNouns(relevantProps, noun, verb);

            if (validNouns.length === 0) {
                return {
                    message: `There is no ${noun} to ${verb}.`
                }
            } else if (validNouns.length > 1) {
                return {
                    message: `Which ${noun}?`
                }
            }
            
            /**
             * look at the noun's action
             * find the first case who's condition is met
             * create a function that translates the effects into function calls to the executor
             * pass that function back to the state machine
             */

            let func = new Function([], );
            return {
                message: "",
                execution: func
            }
        } else {
            return {
                message: `You can't do that.`
            }
        }
    }
};

function getRelevantProps(adventure, playerName) {
    let player = adventure.players.find(p => p.name === playerName);
    if (!player) {
        throw new Error(`Player ${playername} not in player list`);
    }

    let relevantProps = [];
    /**
     * player
     * props on player
     * props on props
     * props on scene player is in
     * other players in the scene with the player
     * scenes the scene is in and any of their props
     * other players in those scenes
     * etc.
     */

    return relevantProps;
}

function getValidNouns(relevantProps, noun, verb) {
    return relevantProps.find((p) => {
        return p.name === noun && p.actions.contains(verb);
    });
}

export { Parser as default };