import Evaluator from "./evaluator.js";
import ExecutorInterface from "./executor-interface.js";
// TODO: Import an interface instead.

let controlCommands = {
    help: "help",
    quit: "quit",
    save: "save",
}

let ExecutionMethods = {
    move_prop: "move_prop",
    set_prop_state: "set_prop_state"
}

// TODO: instead of passing entire adventure in, just pass the local props?
class Parser {
    constructor(adventure, evaluator, executor) {
        if (!adventure || adventure && typeof adventure !== "object") {
            throw new Error(`Parameter adventure is required and must be an object. Got ${typeof adventure}: ${adventure} instead.`)
        }
        if (!evaluator || evaluator && !(evaluator instanceof Evaluator)) {
            throw new Error(`Parameter evaluator is required and must be an Evaluator. Got ${typeof evaluator}: ${evaluator} instead.`)
        }
        if (!executor || executor && !(executor instanceof ExecutorInterface)) {
            throw new Error(`Parameter executor is required and must be an ExecutorInterface. Got ${typeof executor}: ${executor} instead.`)
        }
        this.adventure = adventure;
        this.evaluator = evaluator;
        this.executor = executor;
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

        let words = instruction.split(/ +/);

        /**
         * 1. check system command
         * 2. check author command
         * 3. find noun, look for verb
         * 4. execute appropriate case
         */

        if (words.length === 1) {
            throw new Error(`Not yet impliemented.`);
        } else if (words.length === 2) {
            /**
             * look at the nouns' action
             * find the first case who's condition is met
             * create a function that translates the effects into function calls to the executor
             * pass that function back to the state machine
             */

            let [verb, noun] = words;
            let localProps = getLocalProps(this.adventure, playerName);
            let validProps = getValidProps(localProps, noun, verb);

            if (validProps.length === 0) {
                return {
                    message: `There is no ${noun} to ${verb}.`
                }
            } else if (validProps.length > 1) {
                return {
                    message: `Which ${noun}?`
                }
            }

            let prop = validProps[0];
            let firstCase = null;
            for (let c of prop.cases) {
                if (this.evaluator.evaluate(c.if)) {
                    firstCase = c;
                    break;
                }
            }

            // executing all the changes should be its own function
            for (let k of Object.keys(firstCase.then).filter(k => k != "message" && k != "broadcast")) {
                switch (k) {
                    case ExecutionMethods.move_prop:
                        for (let e of firstCase.then[k]) {
                            let propName = this.evaluator.evaluate(e.prop_name);
                            let targetName = this.evaluator.evaluate(e.target_name);
                            this.executor.moveProp(propName, targetName);
                        }
                        break;
                    case ExecutionMethods.set_prop_state:
                        for (let e of firstCase.then[k]) {
                            let propName = this.evaluator.evaluate(e.prop_name);
                            let state = this.evaluator.evaluate(e.state);
                            this.executor.setPropState(propName, state);
                        }
                        break;
                    default:
                        break;
                }
            }

            let returnObject = {
                message: firstCase.then.message,
                broadcast: firstCase.then.broadcast
            }
            return returnObject;
        } else {
            return {
                message: `You can't do that.`
            }
        }
    }
};

function getLocalProps(adventure, playerName) {
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

function getValidProps(relevantProps, noun, verb) {
    return relevantProps.find((p) => {
        return p.name === noun && p.actions.contains(verb);
    }) || [];
}

export { Parser as default };