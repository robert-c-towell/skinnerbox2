import Event, {EventTypes} from "./../objects/event.js";
import Prop from "./../objects/prop.js";
import Scene from "./../objects/scene.js";

import Parser from "./parser.js";
import Executor from "./executor.js";
import Evaluator from "./evaluator.js";

/**
 * Statemachine could pass callbacks to the evaluator for the evaluator to call when it executes the effects,
 * but still leaving control in the state-machine's hands on how that plays out
 * 
 * Variable function that searches for the variable
 * 
 */

class StateMachine {
    constructor(adventure) {
        this.executor = new Executor(adventure);
        this.evaluator = new Evaluator(executor);
        this.parser = new Parser(adventure, this.evaluator, this.executor);
        this.adventure = adventure;
    }

    /**
     * @param {*} message - { player, input }
     * @returns 
     */
    process(message) {
        if (!message || typeof message !== "object") {
            throw new Error("Property message is required and must be an object");
        }

        /**
         * 2. Pass input to the parser
         * 3. Parser will use the Evaluator to handle non-string input
         * 4. Parser uses Executor to make the changes
         * 5. Parser passes control back to the state machine
         * 6. Check any events that trigger, use Evaluator and Executor
         */

        let messages = [];
        let broadcasts = [];

        // 2. Pass input to the parser
        let parser = new Parser(this.adventure, this.evaluator);
        let parsedResponse = parser.parse(message.input, message.playerName);

        message.push(parsedResponse.message);
        if (parsedResponse.broadcast) {
            message.push(parsedResponse.broadcast);
        }

        let updatedAdventure = this.executor.getAdventure();

        // 6. Check any events

        // let executableEvents = [];

        // for (let e of events) {
        //     let conditionsAreMet = this.evaluator.evaluate(e.conditions);
        //     if (conditionsAreMet) {
        //         executableEvents.push(e);
        //     }
        // }

        // for (let event of executableInputEvents) {
        //     for (let effect of event) {
        //         let response = this.evaluator.evaluate(effect, message.input);
        //         if (response.message) {
        //             messages.push(response.message);
        //         } else if (response.broadcast) {
        //             broadcasts.push(response.broadcast);
        //         }
        //     }
        // }

        return [
            {
                playerName: message.playerName,
                messages: messages
            }
        ];
    }
};

export {StateMachine as default};