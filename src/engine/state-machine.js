import Event, {EventTypes} from "./../objects/event.js";
import Prop from "./../objects/prop.js";
import Scene from "./../objects/scene.js";

import StateExecutor from "./state-executor.js";
import Parser from "./parser.js";

/**
 * Statemachine could pass callbacks to the parser for the parser to call when it executes the effects,
 * but still leaving control in the state-machine's hands on how that plays out
 * 
 * Variable function that searches for the variable
 * 
 */

class StateMachine {
    constructor(adventure) {
        let stateExecutor = new StateExecutor(adventure);
        this.parser = new Parser(stateExecutor);

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
         * 1. Check player for relevant actions
         * 2. Check props on the player for actions
         * 3. Check scene the player is in for actions
         * 4. Check players on the scene the player is in for actions
         * 5. props on the scene the player is in for actions
         * 6. recursively check for objects on objects at each of the above steps
         */

        let executableInputEvents = [];
        let executableGeneralEvents = [];

        let messages = [];
        let broadcasts = [];

        function filterEvents(events) {
            let executableInputEvents = [];
            let executableGeneralEvents = [];

            for (let e of events) {
                let conditionsAreMet = this.parser.parse(e.conditions, message.input);
                if (conditionsAreMet) {
                    if (e.type = EventTypes.INPUT) {
                        executableInputEvents.push(e);
                    } else {
                        executableGeneralEvents.push(e);
                    }
                }
            }

            return {
                input: executableInputEvents,
                general: executableGeneralEvents
            }
        }

        // 1. Check player for relevant actions
        

        // 6. Execute the events
        // 7. Lastly, build a message list of what happened for the current player, and another for the other players
        for (let event of executableInputEvents) {
            for (let effect of event) {
                let response = this.parser.parse(effect, message.input);
                if (response.message) {
                    messages.push(response.message);
                } else if (response.broadcast) {
                    broadcasts.push(response.broadcast);
                }
            }
        }

        for (let event of executableGeneralEvents) {
            let response = this.parser.parse(event, message.input);
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