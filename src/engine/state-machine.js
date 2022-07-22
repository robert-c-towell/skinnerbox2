import Event, {EventTypes} from "./../objects/event.js";
import Inventory from "./../objects/inventory.js";
import Item from "./../objects/item.js";
import Location from "./../objects/location.js";

import ActionExecutor from "./action-executor.js";
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
        let actionExecutor = new ActionExecutor(adventure);
        this.parser = new Parser(actionExecutor);

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
         * 1. Check input events on items in the player's inventory
         * 2. Check input events in the player's location
         * 3. Check input events on items in the location's inventory
         * 4. Check input events globally
         * 5. Check non-input events in the same order
         * 6. Execute the events
         * 7. Lastly, build a message list of what happened for the current player, and another for the other players
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

        // 1. Check input events on items in the player's inventory
        let playerInventory = this.adventure.players.find(p => p.name === message.player).inventory;
        for (let i of playerInventory) {
            let {inputEvents, generalEvents} = filterEvents(i.events);
            executableInputEvents.concat(inputEvents);
            executableGeneralEvents.concat(inputEvents);
        }

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