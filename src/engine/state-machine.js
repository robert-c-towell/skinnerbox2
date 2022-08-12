import Event, {EventTypes} from "./../objects/event.js";
import Prop from "./../objects/prop.js";
import Scene from "./../objects/scene.js";

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
        let executor = new Executor(adventure);
        this.evaluator = new Evaluator(executor);

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
         * 1. Statemachine receive input from the user
         * 2. Pass input to the parser
         * 3. Parser will use the Evaluator to handle non-string input
         * 4. Parser uses Executor to make the changes
         * 5. Parser passes control back to the state machine
         * 6. Check any events that trigger, use Evaluator and Executor
         */

        let executableInputEvents = [];
        let executableGeneralEvents = [];

        let messages = [];
        let broadcasts = [];

        function filterEvents(events) {
            let executableEvents = [];

            for (let e of events) {
                let conditionsAreMet = this.evaluator.evaluate(e.conditions);
                if (conditionsAreMet) {
                    executableEvents.push(e);
                }
            }

            return executableEvents;
        }

        // 1. Check player for relevant actions
        

        // 6. Execute the events
        // 7. Lastly, build a message list of what happened for the current player, and another for the other players
        for (let event of executableInputEvents) {
            for (let effect of event) {
                let response = this.evaluator.evaluate(effect, message.input);
                if (response.message) {
                    messages.push(response.message);
                } else if (response.broadcast) {
                    broadcasts.push(response.broadcast);
                }
            }
        }

        for (let event of executableGeneralEvents) {
            let response = this.evaluator.evaluate(event, message.input);
            if (response.message) {
                messages.push(response.message);
            } else if (response.broadcast) {
                broadcasts.push(response.broadcast);
            }
        }

        return [
            {
                id: "a",
                messages: messages
            },
            {
                id: "b",
                messages: broadcasts
            }
        ];
    }
};

export {StateMachine as default};